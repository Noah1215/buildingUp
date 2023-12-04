import { notFound, redirect } from "next/navigation";
import { getUser, getUserRole } from "@/app/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();

  if (userRole !== "alumni") {
    return notFound();
  }

  return <div>{children}</div>;
}
