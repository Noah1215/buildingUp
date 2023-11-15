import { getUser, getUserRole } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();

  if (userRole !== "admin") {
    return notFound();
  }

  return <>{children}</>;
}
