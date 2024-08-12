import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

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
          "h-screen overflow-hidden bg-background bg-origin-padding font-sans antialiased",
          "before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[200%] before:w-[200%] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-12 before:bg-[url('/background.png')] before:bg-cover before:bg-repeat before:opacity-[0.02]",
          fontSans.variable,
        )}
      >
        <div className="h-screen overflow-auto">
          <Analytics />
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </ThemeProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
