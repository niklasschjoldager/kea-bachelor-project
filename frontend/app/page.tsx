import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInForm from "@/components/forms/SignInForm";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/events");
  }

  return (
    <main className="flex flex-col py-[100px] mt-[135px] mx-auto max-w-modal min-h-screen p-24">
      <h1 className="text-h1 mb-5">Sign in</h1>
      <SignInForm />
      <Link href="/signup" className="text-end text-label mt-5 text-slate-gray">Not a member yet? Click here to create an account</Link>
    </main>
  );
}
