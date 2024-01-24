import { createClient } from "@/lib/supabase/client";
import { EventType } from "./mentor/event/eventType";

export async function getUser() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserRole() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id)
      .single()
      .throwOnError();
    return userRole?.role;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getEventsList() {
  const supabase = createClient();

  try {
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) {
      throw error;
    }

    if (events) {
      const eventsWithParticipants = await Promise.all(
        events.map(async (event) => {
          const { data: participants, error: participantsError } =
            await supabase
              .from("event_participants")
              .select("event_id, user_id")
              .eq("event_id", event.id);

          if (participantsError) {
            console.error(
              "Error fetching participants for event:",
              event.id,
              participantsError
            );
            return { ...event, registeredUsersCount: 0 };
          }

          return { ...event, registeredUsersCount: participants.length };
        })
      );

      return eventsWithParticipants;
    }

    return null;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function toggleEventRegistration(
  eventId: string,
  userId: string,
  updateEventList: (newEvents: EventType[] | null) => void
) {
  try {
    const supabase = createClient();

    const existingRegistration = await supabase
      .from("event_participants")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingRegistration.data) {
      await supabase
        .from("event_participants")
        .delete()
        .eq("id", existingRegistration.data.id);
    } else {
      await supabase.from("event_participants").insert([
        {
          event_id: eventId,
          user_id: userId,
        },
      ]);
    }
    const updatedEvents = await getEventsList();
    updateEventList(updatedEvents);
  } catch (error) {
    console.error("Error toggling event registration:", error);
    throw error;
  }
}

export const checkRegistrationStatus = async (
  eventId: string,
  userId: string
): Promise<boolean> => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("event_participants")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error checking registration status:", error);
      return false;
    }

    return data ? true : false;
  } catch (error) {
    console.error("Error checking registration status:", error);
    return false;
  }
};
