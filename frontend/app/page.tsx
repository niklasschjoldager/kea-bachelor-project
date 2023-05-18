import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInForm from "./components/SignInForm";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/events");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl">Log in</h1>
      <SignInForm />
    </main>
  );
}
