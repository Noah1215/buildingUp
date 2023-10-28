"use client";
import React from "react";

import { createBrowserClient } from "@supabase/ssr";

const alumniPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      <h1>alumniPage</h1>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
};

export default alumniPage;
