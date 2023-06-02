import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/events");
  }

  return (
    <main className="flex flex-col py-[100px] mt-[135px] mx-auto max-w-modal min-h-screen p-24">
      <h1 className="text-h1 mb-5">Sign up</h1>
      <SignUpForm />
      <Link href="/" className="text-end mt-5 text-label text-slate-gray">Already got an account? Click here to sign in</Link>
    </main>
  );
}
