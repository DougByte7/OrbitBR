import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={cn(
            "bg-background min-h-screen bg-origin-padding font-sans antialiased",
            fontSans.variable,
          )}
        >
          <div className="pointer-events-none fixed left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 rotate-12 grid-cols-[repeat(5,468px)] gap-16 overflow-hidden opacity-[0.02]">
            <div className="h-[698px] w-[468px] bg-[url('/background/1.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/2.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/3.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/4.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/5.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/6.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/7.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/8.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/9.png')]" />
            <div className="h-[698px] w-[468px] bg-[url('/background/10.png')]" />
          </div>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
