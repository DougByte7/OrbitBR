"use client";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import animeDB from "public/anime-db.json";
import Image from "next/image";
import { useState } from "react";
import { useGameActions } from "../state";

export type Anime = (typeof animeDB)[number];
export interface GuessesProps {
  todayAnime: Anime;
  animeList: string[];
}
export default function Guesses({ todayAnime, animeList }: GuessesProps) {
  const [wrongGuesses, setWrongGuess] = useState<Anime[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string | undefined>("");
  const { showResult } = useGameActions();
  console.log(wrongGuesses);

  const handleGuess = () => {
    const guessedAnime = animeDB.find(
      (a) =>
        a.title.toLocaleLowerCase() === currentGuess?.toLocaleLowerCase() ||
        a.alternativeTitles.some(
          (title) =>
            title.toLocaleLowerCase() === currentGuess?.toLocaleLowerCase(),
        ),
    );

    if (!guessedAnime) return;

    const userData = JSON.parse(
      localStorage.getItem("user:data") ??
        '{"played":1,"victories":0,"sequence":0}',
    ) as { played: number; victories: number; sequence: number };
    userData.played += 1;

    if (todayAnime.title === guessedAnime.title) {
      userData.victories += 1;
      userData.sequence += 1;

      localStorage.setItem("user:data", JSON.stringify(userData));
      showResult();
      return;
    }

    if (wrongGuesses.length === 4) {
      localStorage.setItem("user:data", JSON.stringify(userData));
      showResult();
      return;
    }

    setWrongGuess((prev) => {
      return [guessedAnime, ...prev];
    });
  };

  return (
    <div className="grid gap-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <Combobox
          placeholder="Qual anime está buscando?"
          options={animeList}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
          onChange={setCurrentGuess as any}
        />

        <Button disabled={!currentGuess} onClick={handleGuess}>
          <WandSparkles size={20} />
          <span className="hidden sm:inline">Adivinhar</span>
        </Button>
      </div>
      <div className="grid gap-3">
        <p className="my-4 text-center text-sm">
          Você tem {5 - wrongGuesses.length} tentativas restantes
        </p>
        {wrongGuesses.map((guess) => {
          return (
            <div
              key={guess._id}
              className="flex w-full gap-3 rounded-[2px] border-l-4 border-[#FF3434] bg-error px-4 py-2"
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
  );
}
