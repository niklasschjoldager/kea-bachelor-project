"use client";

import { signOut } from "next-auth/react";

function LogOutButton() {
  return (
    <button
      className="px-4 py-2 text-white bg-red-600 border rounded-full"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export default LogOutButton;
