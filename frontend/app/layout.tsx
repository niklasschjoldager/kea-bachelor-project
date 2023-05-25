import { NextAuthProvider } from "@/app/providers";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata = {
  title: "Eventel - Where events happen.",
  description: "Where events happen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heebo.className} bg-ghost-white`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
