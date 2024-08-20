"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { modals } from "@mantine/modals";
import AnimeForm from "./anime-form";

export default function NewAnime() {
  const handleNew = () =>
    modals.open({
      size: "850px",
      title: "Nove anime",
      children: <AnimeForm useSaveMutation={api.anime.create.useMutation} />,
      centered: true,
      closeOnClickOutside: false,
    });
  return (
    <Button type="button" size="sm" onClick={handleNew}>
      <PlusIcon />
      Novo
    </Button>
  );
}
