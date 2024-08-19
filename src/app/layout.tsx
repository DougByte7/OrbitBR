import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { HydrateClient } from "@/trpc/server";
import { CSPostHogProvider } from "@/providers/posthog-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Orbit",
  description:
    "A Orbit começa como um minigame envolvente, onde você tenta adivinhar o anime do dia. Nosso objetivo é evoluir continuamente o projeto, adicionando novos modos de jogo, sistemas de avaliação, perfis personalizados e muito mais. Fique ligado para não perder nenhuma novidade!",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={cn(
            "relative min-h-screen bg-background bg-origin-padding font-sans antialiased",
            "before:absolute before:inset-0 before:-z-10 before:bg-[url('/background.webp')] before:bg-cover before:bg-repeat before:opacity-[0.02]",
            fontSans.variable,
          )}
        >
          <Analytics />
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TRPCReactProvider>
                <HydrateClient>{children}</HydrateClient>
              </TRPCReactProvider>
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
