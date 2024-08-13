"use client";
import React from "react";
import {
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconBrandFacebook,
} from "@tabler/icons-react";
import {
  useGameTimesPlayed,
  useGameTotalVictories,
  useGameVictoryStreak,
} from "../state";

export default function GameResult() {
  const timesPlayed = useGameTimesPlayed();
  const totalVictories = useGameTotalVictories();
  const victoryStreak = useGameVictoryStreak();

  return (
    <>
      <div className="my-12 flex w-full gap-3">
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">{timesPlayed}</div>
          <div className="text-sm text-muted">Jogos</div>
        </div>
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">
            {parseFloat(((totalVictories / timesPlayed) * 100).toFixed(2))}%
          </div>
          <div className="text-sm text-muted">De vitórias</div>
        </div>
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">🔥{victoryStreak}</div>
          <div className="text-sm text-muted">Sequência de vitórias</div>
        </div>
      </div>

      <div className="flex w-48 flex-col items-center gap-4">
        <div className="text-center">
          Compartilhe o resultado nas suas redes sociais!
        </div>
        <div className="flex gap-4">
          <IconBrandInstagram />
          <IconBrandTwitterFilled />
          <IconBrandFacebook />
        </div>
      </div>
    </>
  );
}
