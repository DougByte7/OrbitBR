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
  title: "Orbit",
  description: "Adivinhe o anime do dia!",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen bg-origin-padding pb-32 font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
        <div className="pointer-events-none fixed left-1/2 top-1/2 -z-10 grid -translate-x-1/2 -translate-y-1/2 rotate-12 grid-cols-[repeat(5,468px)] gap-16 overflow-hidden opacity-[0.02]">
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
      </body>
    </html>
  );
}
