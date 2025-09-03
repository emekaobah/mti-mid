import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import Footer from "@/components/footer";
import QueryProvider from "@/lib/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthModalProvider } from "@/contexts/auth-modal-context";

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
        <QueryProvider>
          <AuthModalProvider>
            <SiteHeader />
            {children}
            <Toaster richColors />
          </AuthModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
