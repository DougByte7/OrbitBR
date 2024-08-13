import { Button } from "@/components/ui/button";
import Countdown from "./components/countdown";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { HandHeart } from "lucide-react";
import type { ReactNode } from "react";

interface TopBarProps {
  children?: ReactNode;
}
export default async function TopBar({ children }: TopBarProps) {
  return (
    <header className="top-0 z-10 flex w-full items-center justify-center border-b border-border/5 bg-[rgba(19,18,20,0.50)] py-4 backdrop-blur-2xl sm:sticky sm:h-[4.375rem] sm:py-0">
      <div className="flex w-full max-w-[1320px] flex-wrap justify-between gap-3 sm:gap-12">
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href="https://discord.gg/HbBFEj5PJ6" target="_blank">
              <IconBrandDiscordFilled size={20} color="#C9C6DD" />{" "}
              <span className="hidden sm:inline-flex">Discord</span>
            </a>
          </Button>

          <Button
            className="gap-3 border-[rgba(255,208,44,0.25)] bg-[#1E1B17] text-[#FFD02C] hover:border-[#FFD02C]"
            variant="outline"
            asChild
          >
            <a href="https://apoia.se/orbitstt" target="_blank">
              <HandHeart size={20} /> Seja um apoiador
            </a>
          </Button>
        </div>

        <Countdown />
        {children}
      </div>
    </header>
  );
}
