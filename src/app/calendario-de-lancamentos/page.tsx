/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import TopBar from "@/components/top-bar";
import clsx from "clsx";
import { addDays } from "date-fns";
import { Calendar } from "lucide-react";
import { Fragment, Key, Suspense } from "react";

export default function Page() {
  return (
    <main className="grid items-center justify-items-center gap-10 px-4 pb-32">
      <TopBar />

      <div className="flex items-center gap-2 justify-self-start">
        <Calendar />
        <h1 className="text-3xl font-bold">Calendário de Lançamentos</h1>
      </div>
      <WeeklyCalendar />
    </main>
  );
}

async function WeeklyCalendar() {
  const today = new Date();
  const weekDays = Array(7)
    .fill(today)
    .map((_, i) => addDays(today, i));

  const res = await fetch("https://api.jikan.moe/v4/seasons/now?filter=tv");
  const { data } = (await res.json()) as AnimeJikan;
  const streamingsPromises = data.map(async (anime) => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${anime.mal_id}/streaming`,
    );

    const { data } = (await res.json()) as {
      data: { name: string; url: string }[];
    };

    return data;
  });

  const streamings = await Promise.allSettled(streamingsPromises);

  const animes = data.map((anime, i) => {
    const streaming =
      streamings[i]?.status === "fulfilled"
        ? streamings[i].value?.filter(({ name }) =>
            ["crunchyroll", "disneyplus", "netflix", "primevideo"].includes(
              name.toLocaleLowerCase(),
            ),
          )
        : null;
    return {
      ...anime,
      streaming,
    };
  });

  //console.log(animes[0]);

  const animesByWeek = animes.reduce(
    (acc, anime) => {
      const dayOfWeek = new Date(anime.aired.from).toLocaleDateString(
        undefined,
        { weekday: "long" },
      );

      const dayOfWeekIndex = weekDays.findIndex(
        (d) =>
          d.toLocaleDateString(undefined, { weekday: "long" }) === dayOfWeek,
      );

      if (acc[dayOfWeekIndex]) {
        acc[dayOfWeekIndex].push(anime);
      } else {
        acc[dayOfWeekIndex] = [anime];
      }

      return acc;
    },
    [] as Array<AnimeJikan["data"]>,
  );

  return (
    <div className="grid w-full max-w-[1920px] grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] items-baseline gap-4">
      {weekDays.map((day, i) => (
        <div key={i}>
          <div className="rounded-t-sm bg-primary px-1 text-center text-lg uppercase">
            {day
              .toLocaleDateString(undefined, { weekday: "long" })
              .replace("-feira", "")}
          </div>

          <div className="grid justify-items-center gap-2 rounded-b-sm border border-border/10 bg-white/5 p-3 text-center">
            <Suspense fallback={<Spinner />}>
              {animesByWeek[i]?.map((anime, j) => (
                <Fragment key={anime.mal_id}>
                  {j !== 0 && (
                    <div className="h-2 w-full border-t border-border/10" />
                  )}
                  <img
                    src={`${anime.images.webp.large_image_url}`}
                    width={100}
                    height={100}
                    alt={anime.title_english}
                  />
                  <p className="text-center">{anime.title_english}</p>
                  <div className="flex flex-wrap gap-2">
                    {(anime as any).streaming?.map(
                      (streaming: { url: string; name: string } | null) => {
                        return streaming ? (
                          <a
                            key={streaming.url}
                            className="w-fit"
                            href={streaming.url}
                            target="_blank"
                          >
                            <img
                              className={clsx(
                                streaming.url.includes("netflix") ||
                                  streaming.url.includes("disneyplus")
                                  ? "h-[34px]"
                                  : "h-[27px]",
                                "rounded-[2px]",
                              )}
                              src={`/images/${streaming.url.match(/www.(?<streaming>.*).com/)?.groups?.streaming}.png`}
                              alt={`Logo ${streaming.name}`}
                            />
                          </a>
                        ) : (
                          false
                        );
                      },
                    )}
                  </div>
                </Fragment>
              ))}
            </Suspense>
          </div>
        </div>
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin fill-primary text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

const animeJikan = {
  data: [
    {
      mal_id: 0,
      url: "string",
      images: {
        jpg: {
          image_url: "string",
          small_image_url: "string",
          large_image_url: "string",
        },
        webp: {
          image_url: "string",
          small_image_url: "string",
          large_image_url: "string",
        },
      },
      trailer: {
        youtube_id: "string",
        url: "string",
        embed_url: "string",
      },
      approved: true,
      titles: [
        {
          type: "string",
          title: "string",
        },
      ],
      title: "string",
      title_english: "string",
      title_japanese: "string",
      title_synonyms: ["string"],
      type: "TV",
      source: "string",
      episodes: 0,
      status: "Finished Airing",
      airing: true,
      aired: {
        from: "string",
        to: "string",
        prop: {
          from: {
            day: 0,
            month: 0,
            year: 0,
          },
          to: {
            day: 0,
            month: 0,
            year: 0,
          },
          string: "string",
        },
      },
      duration: "string",
      rating: "G - All Ages",
      score: 0,
      scored_by: 0,
      rank: 0,
      popularity: 0,
      members: 0,
      favorites: 0,
      synopsis: "string",
      background: "string",
      season: "summer",
      year: 0,
      broadcast: {
        day: "string",
        time: "string",
        timezone: "string",
        string: "string",
      },
      producers: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      licensors: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      studios: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      genres: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      explicit_genres: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      themes: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
      demographics: [
        {
          mal_id: 0,
          type: "string",
          name: "string",
          url: "string",
        },
      ],
    },
  ],
  pagination: {
    last_visible_page: 0,
    has_next_page: true,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  },
};

type AnimeJikan = typeof animeJikan;
