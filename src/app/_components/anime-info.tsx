import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Anime } from "@prisma/client";

interface AnimeInfoProps {
  anime: Anime;
}
export default function AnimeInfo({ anime }: AnimeInfoProps) {
  const textSize = 490;
  const text = anime.synopsis.slice(0, textSize);
  const hiddenText = anime.synopsis.slice(textSize);

  return (
    <div className="flex gap-10">
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

        <Collapsible>
          <p className="max-w-[438px] text-sm text-muted">
            {text}
            {!!hiddenText && (
              <>
                <CollapsibleContent>{hiddenText}</CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <span>
                    ...{" "}
                    <span className="font-medium text-success">
                      Ver&nbsp;mais
                    </span>
                  </span>
                </CollapsibleTrigger>
              </>
            )}
          </p>
        </Collapsible>

        <Badge className="w-fit" variant="secondary">
          {anime.status}
        </Badge>

        <div className="mt-4">
          <div className="mb-3 text-xs">Disponível em:</div>
          <a href={anime.streamingUrl} target="_blank">
            <Image
              className="rounded-[2px]"
              src={`/images/logo_${anime.streamingAt.toLowerCase()}.png`}
              alt={`Logo ${anime.streamingAt}`}
              width={138}
              height={27}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
