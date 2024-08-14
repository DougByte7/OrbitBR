"use client";
import React from "react";
import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ActionIcon,
  Card,
  Group,
  Indicator,
  Loader,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { RiDeleteBinLine } from "@remixicon/react";
import type { Anime } from "@prisma/client";
import AnimeForm from "./anime-form";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { status } from "@/constants/animes";

export default function AnimeList() {
  const params = useSearchParams();

  const { data, isLoading } = api.anime.getAll.useQuery({
    status: params.get("status")
      ? (params.get("status") as "unreleased" | "ongoing" | "complete")
      : undefined,
    title: params.get("title") ? params.get("title")! : undefined,
    authors: params.get("authors")
      ? params.get("authors")?.split(",")
      : undefined,
    genres: params.get("genres") ? params.get("genres")?.split(",") : undefined,
    streamingAt: params.get("streamingAt")
      ? params.get("streamingAt")?.split(",")
      : undefined,
  });

  if (!data || isLoading)
    return (
      <Group justify="center">
        <Loader />
      </Group>
    );

  return <List animes={data} />;
}

interface ListProps {
  animes: Anime[];
}
function List({ animes }: ListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(animes.length / 5),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 450,
    overscan: 3,
  });
  const items = rowVirtualizer.getVirtualItems();

  return (
    <>
      <div ref={parentRef} className="h-[calc(100vh-70px)] overflow-auto">
        <div
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualItem.measureElement}
              >
                <div className="mx-auto mb-6 grid max-w-[1200px] grid-cols-5 justify-center gap-6">
                  {animes
                    ?.slice(virtualItem.index * 5, virtualItem.index * 5 + 5)
                    .map((anime) => <CardAnime key={anime.id} anime={anime} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface WithAnimeProp {
  anime: Anime;
}
function CardAnime({ anime }: WithAnimeProp) {
  const apiUtils = api.useUtils();

  const { mutate: deleteAnime } = api.anime.delete.useMutation({
    onSuccess() {
      modals.closeAll();
      void apiUtils.anime.getAll.invalidate();
    },
    onError(error) {
      console.error(error);
      alert(
        "Erro ao tentar deletar o anime, abra o console para mais informações",
      );
    },
  });

  const handleDelete = (title: string) => () =>
    modals.openConfirmModal({
      title: "Deseja deletar: " + title,
      children: <Text size="sm">O anime sera deletado permanentemente.</Text>,
      labels: { confirm: "Confirmar", cancel: "Cancelar" },
      centered: true,
      onConfirm: () => deleteAnime(anime.id),
    });

  const handleEdit = (anime: WithAnimeProp["anime"]) => () =>
    modals.open({
      size: "850px",
      title: anime.title,
      children: (
        <AnimeForm
          anime={anime}
          useSaveMutation={api.anime.update.useMutation}
        />
      ),
      centered: true,
    });

  return (
    <Indicator
      className="[&_.mantine-Indicator-indicator]:-translate-x-1/2 [&_.mantine-Indicator-indicator]:-rotate-90"
      label={status.find((s) => s.value === anime.status)?.label}
      position="middle-start"
      size={16}
      color={
        anime.status === "complete"
          ? "green"
          : anime.status === "ongoing"
            ? "yellow"
            : anime.status === "canceled"
              ? "red"
              : "blue"
      }
    >
      <Card
        className="relative h-full !border-border/10 !bg-background !p-0"
        shadow="sm"
        radius="md"
        withBorder
      >
        <ActionIcon
          className="!absolute right-2 top-2"
          color="red"
          onClick={handleDelete(anime.title)}
        >
          <RiDeleteBinLine size={18} />
        </ActionIcon>
        <Image
          src={`https://utfs.io/f/${anime.cover}`}
          className="rounded-[2px]"
          alt="Capa do anime"
          width={231}
          height={343}
        />
        <UnstyledButton
          className="absolute bottom-0 left-1/2 w-full -translate-x-1/2"
          onClick={handleEdit(anime)}
        >
          <div className="flex items-center justify-center border-t-2 border-success bg-primary p-1">
            <Text className="text-center !text-white" fw={700}>
              {anime.title}
            </Text>
          </div>
        </UnstyledButton>
      </Card>
    </Indicator>
  );
}
