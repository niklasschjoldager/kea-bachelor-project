import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Protected() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl">
        {session
          ? `Protected page, you are logged in as ${session.user?.name}!`
          : "Not logged in"}
      </h1>
    </main>
  );
}
