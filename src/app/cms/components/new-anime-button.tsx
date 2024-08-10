"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { modals } from "@mantine/modals";
import type { animeSchema } from "../schemas/anime-schema";
import AnimeForm from "./anime-form";
import type { z } from "zod";

export default function NewAnime() {
  const apiUtils = api.useUtils();

  const { mutate } = api.anime.create.useMutation({
    onSuccess() {
      modals.closeAll();
      void apiUtils.anime.getAll.invalidate();
    },
    onError(error) {
      console.error(error);
      alert(
        "Erro ao tentar salvar o anime, abra o console para mais informações",
      );
    },
  });
  const handleSave = (values: z.infer<typeof animeSchema>) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const cover = (e.target?.result as string) ?? "";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mutate({ ...values, cover });
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    reader.readAsDataURL(values.cover as File);
  };

  const handleNew = () =>
    modals.open({
      size: "850px",
      title: "Nove anime",
      children: <AnimeForm onSave={handleSave} />,
      centered: true,
    });
  return (
    <Button type="button" className="ml-auto" size="sm" onClick={handleNew}>
      <PlusIcon />
      Novo
    </Button>
  );
}
