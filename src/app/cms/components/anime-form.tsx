"use client";
import React from "react";
import {
  Autocomplete,
  Fieldset,
  FileInput,
  Group,
  Loader,
  Radio,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "mantine-form-zod-resolver";
import { ACCEPTED_IMAGE_TYPES, animeSchema } from "../schemas/anime-schema";
import { api } from "@/trpc/react";
import type { z } from "zod";
import type { Anime } from "@prisma/client";

interface AnimeEditModalProps {
  anime?: Anime;
  onSave: (values: z.infer<typeof animeSchema>) => void;
}
export default function AnimeForm({ anime, onSave }: AnimeEditModalProps) {
  const { isPending } = api.anime.create.useMutation({});

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      cover: null as File | null,
      title: anime?.title ?? "",
      status: anime?.status ?? "",
      synopsis: anime?.synopsis ?? "",
      streamingAt: anime?.streamingAt ?? "",
      streamingUrl: anime?.streamingUrl ?? "",
      genres: (anime?.genres ?? []) as unknown as [string, ...string[]],
      authors: (anime?.authors ?? []) as unknown as [string, ...string[]],
    },
    validate: zodResolver(animeSchema),
  });

  return (
    <form
      className="grid grid-cols-2 items-center gap-4"
      onSubmit={form.onSubmit(onSave)}
    >
      <TextInput
        className="col-span-2"
        label="Titulo"
        {...form.getInputProps("title")}
      />
      <Radio.Group label="Status" {...form.getInputProps("status")}>
        <Group align="center">
          {[
            { label: "Concluído", value: "complete" },
            { label: "Em andamento", value: "ongoing" },
            { label: "Não estreado", value: "unreleased" },
          ].map((op) => (
            <Radio key={op.value} label={op.label} value={op.value} />
          ))}
        </Group>
      </Radio.Group>

      <TagsInput label="Autores" {...form.getInputProps("authors")} />
      <TagsInput
        className="col-span-2"
        label="Gêneros"
        data={genres}
        {...form.getInputProps("genres")}
      />
      <Textarea
        className="col-span-2"
        autosize
        label="Sinopse"
        {...form.getInputProps("synopsis")}
      />

      <Fieldset legend="Streaming">
        <Autocomplete
          label="Nome"
          data={streamings}
          {...form.getInputProps("streamingAt")}
        />
        <TextInput
          label="Url"
          type="url"
          {...form.getInputProps("streamingUrl")}
        />
      </Fieldset>

      <FileInput
        label="Capa"
        placeholder="Selecione um arquivo"
        accept={ACCEPTED_IMAGE_TYPES.join()}
        {...form.getInputProps("cover")}
      />

      <Button disabled={isPending} className="col-span-2">
        {isPending ? (
          <Loader color="white" />
        ) : (
          <>
            <SaveIcon /> Salvar
          </>
        )}
      </Button>
    </form>
  );
}

const streamings = ["Crunchyroll", "Netflix", "Prime Video"];

const genres = [
  "Aventura",
  "Ação",
  "Boys Love",
  "Comédia",
  "Cyberpunk",
  "Drama",
  "Ecchi",
  "Esportes",
  "Fantasia",
  "Ficção Científica",
  "Girls Love",
  "Gourmet",
  "Horror",
  "Mistério",
  "Romance",
  "Sobrenatural",
  "Suspense",
  "Vida Cotidiana",
];
