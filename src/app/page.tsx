import { HydrateClient } from "@/trpc/server";
import TopBar from "@/components/top-bar";
import Image from "next/image";
import animeDB from "public/anime-db.json";
import { Button } from "@/components/ui/button";
import { WandSparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  const wrongGuesses = animeDB.slice(0, 3);

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-10 px-4">
        <TopBar />

        <Image
          className="rounded-[2px] blur-sm"
          src={animeDB[day - 1]!.image}
          alt="Capa do anime"
          width={257}
          height={382}
        />

        <div className="grid gap-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <Input
              className="max-w-72"
              leftSection={<Search size={20} />}
              placeholder="Qual anime está buscando?"
            />
            <Button>
              <WandSparkles size={20} />{" "}
              <span className="hidden sm:inline">Adivinhar</span>
            </Button>
          </div>
          <div className="grid gap-3">
            <p className="my-4 text-center text-sm">
              Você tem 2 tentativas restantes
            </p>
            {wrongGuesses.map((guess) => {
              return (
                <div
                  key={guess._id}
                  className="bg-error flex w-full gap-3 rounded-[2px] border-l-4 border-[#FF3434] px-4 py-2"
                >
                  <Image
                    className="rounded-[2px]"
                    src={guess.image}
                    alt={`Capa do anime: ${guess.title}`}
                    width={34}
                    height={46}
                  />
                  <div>
                    <div className="font-bold">{guess.title}</div>
                    <div className="text-sm">{guess.genres.join(", ")}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
