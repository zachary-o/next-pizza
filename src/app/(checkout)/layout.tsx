import { Container, Header } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Cart",
  description: "Created by Zach Osetskyi",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header className="border-gray-200" hasSearch={false} hasCart={false} />
        {children}
      </Container>
    </main>
  );
}
