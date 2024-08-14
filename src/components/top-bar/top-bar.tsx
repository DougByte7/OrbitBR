"use client";
import { Button } from "@/components/ui/button";
import Countdown from "./components/countdown";
import {
  RiHandHeartLine,
  RiDiscordFill,
  RiCloseFill,
  RiMenuFill,
} from "@remixicon/react";
import type { ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

interface TopBarProps {
  children?: ReactNode;
}
export default function TopBar({ children }: TopBarProps) {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <header className="sticky top-0 z-10 flex h-[4.375rem] w-full flex-col items-center justify-center gap-3 border-b border-border/5 bg-[rgba(19,18,20,0.50)] py-4 backdrop-blur-2xl">
      <div className="flex w-full max-w-[1320px] justify-between gap-3 sm:gap-12">
        <Button className="gap-3 sm:hidden" variant="outline" onClick={toggle}>
          {open ? (
            <RiCloseFill size={20} color="#C9C6DD" />
          ) : (
            <RiMenuFill size={20} color="#C9C6DD" />
          )}
        </Button>

        <div className="hidden gap-3 sm:flex">
          <MenuButtons />
        </div>

        <Countdown />
        {children}
      </div>
      {open && (
        <div className="absolute top-full grid w-full gap-3 border-b border-border/5 bg-[rgba(19,18,20,0.50)] pb-3 backdrop-blur-2xl sm:hidden">
          <MenuButtons />
        </div>
      )}
    </header>
  );
}

function MenuButtons() {
  return (
    <>
      <Button className="w-min" variant="outline" asChild>
        <a href="https://discord.gg/HbBFEj5PJ6" target="_blank">
          <RiDiscordFill size={20} color="#C9C6DD" /> Discord
        </a>
      </Button>

      <div className="w-full border-b border-border/5 sm:hidden" />

      <Button
        className="w-min gap-3 border-[rgba(255,208,44,0.25)] bg-[#1E1B17] text-[#FFD02C] hover:border-[#FFD02C]"
        variant="outline"
        asChild
      >
        <a href="https://apoia.se/orbitstt" target="_blank">
          <RiHandHeartLine size={20} /> Seja um apoiador
        </a>
      </Button>
    </>
  );
}
