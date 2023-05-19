import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/events");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl">Sign up</h1>
      <SignUpForm />
      <Link href="/">Already got an account? Sign in</Link>
    </main>
  );
}
