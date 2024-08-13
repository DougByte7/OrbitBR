/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Anime } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";

interface AnimeInfoProps {
  anime: Anime;
}
export default function AnimeInfo({ anime }: AnimeInfoProps) {
  const textSize = 490;
  const text = anime.synopsis.slice(0, textSize);
  const hiddenText = anime.synopsis.slice(textSize);

  return (
    <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
      <div className="relative">
        <Badge
          className="absolute -left-[32px] top-6 before:absolute before:left-[1px] before:top-[calc(100%+1px)] before:h-0 before:w-0 before:border-b-[12px] before:border-l-[26px] before:border-y-transparent before:border-l-success"
          size="lg"
        >
          {anime.title}
        </Badge>
        <Image
          className="rounded-[2px]"
          src={`https://utfs.io/f/${anime.cover}`}
          alt="Capa do anime"
          width={257}
          height={382}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl">{anime.title}</h2>

        <div className="flex gap-3">
          {anime.genres.map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </div>

        <Synopsis text={text} hiddenText={hiddenText} />

        <Badge className="w-fit" variant="secondary">
          {anime.status}
        </Badge>

        <div className="mt-4 grid items-start gap-3">
          <div className="text-xs">Disponível em:</div>
          <div className="flex max-w-[300px] flex-wrap items-center gap-3 sm:max-w-[438px]">
            {anime.streamingUrl.map((url) => (
              <a key={url} className="w-fit" href={url} target="_blank">
                <img
                  className="h-[27px rounded-[2px]"
                  src={`/images/${url.match(/www.(?<streaming>.*).com/)!.groups!.streaming!}.png`}
                  alt={`Logo ${anime.streamingAt}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SynopsisProps {
  text: string;
  hiddenText: string;
}
function Synopsis({ text, hiddenText }: SynopsisProps) {
  const [open, { toggle }] = useDisclosure(false);

  return (
    <Collapsible open={open} onOpenChange={toggle}>
      <p className="max-w-[300px] text-sm text-muted sm:max-w-[438px]">
        {text}
        {!!hiddenText && (
          <>
            <CollapsibleContent className="inline">
              {hiddenText}
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              {open ? (
                <span className="font-medium text-success">
                  {" "}
                  Ver&nbsp;menos
                </span>
              ) : (
                <span>
                  ...{" "}
                  <span className="font-medium text-success">
                    Ver&nbsp;mais
                  </span>
                </span>
              )}
            </CollapsibleTrigger>
          </>
        )}
      </p>
    </Collapsible>
  );
}
