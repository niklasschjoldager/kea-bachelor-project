import TopNav from "@/components/common/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <TopNav />
      <div className="mx-auto max-w-lg px-4 py-[100px]">{children}</div>
    </main>
  );
}
