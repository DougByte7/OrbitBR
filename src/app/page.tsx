import { HydrateClient } from "@/trpc/server";
import TopBar from "@/components/top-bar";
import animeDB from "public/anime-db.json";
import Game from "./_components/game";
import { addDays } from "date-fns";
import type { Anime } from "./_components/guesses";

export default async function Home() {
  const now = new Date();
  const start = new Date(
    now.getHours() >= 12 ? addDays(now, 1).getFullYear() : now.getFullYear(),
    0,
    0,
    12,
  );
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfTheYear = Math.floor(diff / oneDay);
  const todayAnime = (animeDB as Anime[])[dayOfTheYear]!;

  const animeList = Array.from(
    new Set((animeDB as Anime[]).map((a) => a.title.toLocaleLowerCase())),
  );

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-10 px-4">
        <TopBar />

        <Game todayAnime={todayAnime} animeList={animeList} />
      </main>
    </HydrateClient>
  );
}
