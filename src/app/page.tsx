import { api } from "@/trpc/server";
import TopBar from "@/components/top-bar";
import Game from "./_components/game";
import { status } from "@/constants/animes";

export const revalidate = 0;

export default async function Home() {
  const todayAnime = await api.anime.getAnimeOfTheDay();
  const animeList = await api.anime.getAll();
  todayAnime!.status =
    status.find((s) => s.value === todayAnime!.status)?.label ??
    todayAnime!.status;

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-4">
      <TopBar />

      <Game
        todayAnime={todayAnime!}
        animeList={animeList.map(({ title, authors, cover }) => ({
          title,
          authors,
          cover,
        }))}
      />
    </main>
  );
}
