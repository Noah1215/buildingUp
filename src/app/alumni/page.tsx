"use client";
import React from "react";

import { createBrowserClient } from "@supabase/ssr";

const alumniPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <div>
      <h1>alumniPage</h1>
      <form action="/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
};

export default alumniPage;
