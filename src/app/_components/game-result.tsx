"use client";
import React from "react";
import {
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconBrandFacebook,
} from "@tabler/icons-react";

export default function GameResult() {
  const userData = JSON.parse(
    localStorage.getItem("user:data") ??
      '{"played":1,"victories":0,"sequence":0,"lastPlayed":0}',
  ) as {
    played: number;
    victories: number;
    sequence: number;
    lastPlayed: number;
  };

  return (
    <>
      <div className="my-12 flex w-full gap-3">
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">{userData.played}</div>
          <div className="text-sm text-muted">Jogos</div>
        </div>
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">
            {parseFloat(
              ((userData.victories / userData.played) * 100).toFixed(2),
            )}
            %
          </div>
          <div className="text-sm text-muted">De vitórias</div>
        </div>
        <div className="w-1/3 rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-3 text-2xl font-bold">🔥{userData.sequence}</div>
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
