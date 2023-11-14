import React from "react";
import AuthButton from "@/components/AuthButton";

export default async function AlumniPage() {
  return (
    <div>
      <h1>alumniPage</h1>
      <AuthButton />
      <form action="/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
