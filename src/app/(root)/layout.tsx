import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Created by Zach Osetskyi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
