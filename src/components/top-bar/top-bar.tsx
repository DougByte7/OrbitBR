import Image from "next/image";
import { Button } from "@/components/ui/button";
import Countdown from "./components/countdown";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { HandHeart } from "lucide-react";

export default async function TopBar() {
  return (
    <header className="bg-[rgba(19,18,20,0.50)] top-0 z-10 flex w-full items-center justify-center border-b border-border/5 py-4 sm:sticky sm:h-[4.375rem] sm:py-0">
      <div className="flex w-full max-w-[1320px] flex-wrap justify-between gap-3 sm:gap-12">
        <Image src="/favicon.svg" alt="Orbit BR Logo" width={36} height={36} />

        <div className="flex gap-3">
          <Button variant="outline">
            <IconBrandDiscordFilled size={20} color="#C9C6DD" />{" "}
            <span className="hidden sm:inline-flex">Discord</span>
          </Button>

          <Button
            className="gap-3 border-[rgba(255,208,44,0.25)] bg-[#1E1B17] text-[#FFD02C] hover:border-[#FFD02C]"
            variant="outline"
          >
            <HandHeart size={20} /> Seja um apoiador
          </Button>
        </div>

        <Countdown />
      </div>
    </header>
  );
}
