"use client";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import Image from "next/image";
import { useState } from "react";
import { useGameActions, useGameLifes } from "../state";
import { nanoid } from "@/lib/nanoid";
import type { Anime } from "@prisma/client";

type GuessedAnime = Pick<Anime, "title" | "authors" | "cover">;
export interface GuessesProps {
  todayAnime: Anime;
  animeList: GuessedAnime[];
}
export default function Guesses({ todayAnime, animeList }: GuessesProps) {
  const [wrongGuesses, setWrongGuess] = useState<
    Array<GuessedAnime & { id: string }>
  >([]);
  const [currentGuess, setCurrentGuess] = useState<GuessedAnime | undefined>();
  const { gameWin, loseLife } = useGameActions();
  const lifes = useGameLifes();

  const handleGuess = () => {
    if (!currentGuess) return;

    if (todayAnime.title === currentGuess.title) {
      gameWin();
      return;
    }

    loseLife();
    setWrongGuess((prev) => {
      return [{ ...currentGuess, id: nanoid(5) }, ...prev];
    });
  };

  const handleSetGuess = (selected?: string) => {
    setCurrentGuess(animeList.find((a) => a.title === selected));
  };

  return (
    <div className="grid gap-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <Combobox
          placeholder="Qual anime está buscando?"
          options={animeList.map((a) => a.title)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
          onChange={handleSetGuess as any}
        />

        <Button disabled={!currentGuess} onClick={handleGuess}>
          <WandSparkles size={20} />
          <span className="hidden sm:inline">Adivinhar</span>
        </Button>
      </div>
      <div className="grid gap-3 pb-32">
        <p className="my-4 text-center text-sm">
          Você tem {lifes} tentativas restantes
        </p>
        {wrongGuesses.map((guess) => {
          return (
            <div
              key={guess.id}
              className="flex w-full gap-3 rounded-[2px] border-l-4 border-[#FF3434] bg-error px-4 py-2"
            >
              <Image
                className="rounded-[2px]"
                src={`https://utfs.io/f/${guess.cover}`}
                alt={`Capa do anime: ${guess.title}`}
                width={34}
                height={46}
              />
              <div>
                <div>{guess.title}</div>
                <div className="text-sm text-muted">
                  {guess.authors.join(", ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
