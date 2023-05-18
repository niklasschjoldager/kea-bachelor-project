import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function getData(accessToken: string) {
  const res = await fetch("http://127.0.0.1:8000/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Protected() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const data = await getData(session.user["access_token"]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl">
        Protected page, you are logged in as {session.user?.name}
      </h1>
      <h2>Hentet fra /users/me: {data.email}</h2>
    </main>
  );
}
