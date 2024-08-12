import { api } from "@/trpc/server";
import TopBar from "@/components/top-bar";
import Game from "./_components/game";
import { addDays } from "date-fns";

export const revalidate = 60;

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
  const todayAnime = await api.anime.getAnimeOfTheDay(dayOfTheYear);
  const animeList = await api.anime.getAll();

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-4">
      <TopBar />

      <Game
        todayAnime={todayAnime}
        animeList={animeList.map(({ title, authors, cover }) => ({
          title,
          authors,
          cover,
        }))}
      />
    </main>
  );
}
