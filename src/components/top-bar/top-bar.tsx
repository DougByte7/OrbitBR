import Image from "next/image";
import { Button } from "@/components/ui/button";
import Countdown from "./components/countdown";
import { IconBrandDiscordFilled } from "@tabler/icons-react";
import { HandHeart } from "lucide-react";

export default async function TopBar() {
  return (
    <header className="bg-[rgba(19, 18, 20, 0.50)] border-border/5 sticky top-0 z-10 flex h-[4.375rem] w-full items-center justify-center border-b">
      <div className="flex w-full max-w-[1320px] gap-12">
        <Image src="/favicon.svg" alt="Orbit BR Logo" width={36} height={36} />

        <div className="flex gap-4">
          <Button variant="outline">
            <IconBrandDiscordFilled size={20} color="#C9C6DD" /> Discord
          </Button>

          <Button
            className="bg-[rgba(255, 208, 44, 0.04)] gap-3 border-[rgba(255,208,44,0.25)] text-[#FFD02C] hover:border-[#FFD02C]"
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
