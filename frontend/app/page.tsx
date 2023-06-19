import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInForm from "@/components/forms/SignInForm";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/events");
  }

  return (
    <main className="mx-auto mt-[135px] flex min-h-screen max-w-modal flex-col p-24 py-[100px]">
      <h1 className="mb-5 text-h1">Sign in</h1>
      <SignInForm />
      <Link href="/signup" className="mt-5 text-end text-label text-slate-gray">
        Not a member yet? Click here to create an account
      </Link>
    </main>
  );
}
