import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import EventsOverview from "@/components/EventsOverview";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <h1 className="text-4xl">Log in</h1>
        <SignInForm />
        <Link href="/signup">Create account</Link>
      </main>
    );
  }

  return (
    <main>
      <TopNav />
      <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
        <EventsOverview />
      </div>
    </main>
  );
}
