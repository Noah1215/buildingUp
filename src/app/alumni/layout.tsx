import { getUser, getUserRole } from "@/app/supabase-server";
import { redirect, notFound } from "next/navigation";
import AuthButton from "@/components/SignOutButton";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout");

  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();

  if (userRole !== "alumni") {
    return notFound();
  }

  return (
    <>
      <header>
        <AuthButton />
      </header>
      {children}
    </>
  );
}
