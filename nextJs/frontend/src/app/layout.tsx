import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppToast from "@/components/common/AppToast";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import RouteGuard from "@/components/common/RouteGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Organization Web - Learn & Earn Online",
  description: "Your trusted platform for learning, organization management, and career development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans transition-colors duration-300">
        <RouteGuard>
          <AppToast />
          {children}
          <ScrollToTopButton />
        </RouteGuard>
      </body>
    </html>
  );
}
