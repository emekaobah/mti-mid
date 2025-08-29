import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFCTA Trade Intelligence Dashboard",
  description: "Ministry of Trade and Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased`}>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
