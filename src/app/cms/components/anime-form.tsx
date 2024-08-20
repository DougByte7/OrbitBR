"use client";
import React from "react";
import {
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
import type { z } from "zod";
import type { Anime } from "@prisma/client";
import { modals } from "@mantine/modals";
import { api } from "@/trpc/react";
import { genres, status } from "@/constants/animes";

type AnimeEditModalProps =
  | {
      anime?: never;
      useSaveMutation: typeof api.anime.create.useMutation;
    }
  | {
      anime: Anime;
      useSaveMutation: typeof api.anime.update.useMutation;
    };
export default function AnimeForm({
  anime,
  useSaveMutation,
}: AnimeEditModalProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      cover: anime?.cover ?? ("" as File | string),
      title: anime?.title ?? "",
      status: anime?.status ?? "",
      synopsis: anime?.synopsis ?? "",
      streamingUrl: (anime?.streamingUrl ?? []) as unknown as [
        string,
        ...string[],
      ],
      genres: (anime?.genres ?? []) as unknown as [string, ...string[]],
      authors: (anime?.authors ?? []) as unknown as [string, ...string[]],
      tips: (anime?.tips ?? []) as unknown as [string, ...string[]],
    },
    validate: zodResolver(animeSchema),
  });

  const apiUtils = api.useUtils();
  const { mutate, isPending } = useSaveMutation({
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
    const { cover } = values;
    if (typeof cover === "string") {
      // @ts-expect-error this mutation may be Create Or Update, Update NEED the ID
      mutate({ ...values, cover, id: anime.id });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const cover = (e.target?.result as string) ?? "";
      if (anime) {
        // @ts-expect-error this mutation may be Create Or Update, Update NEED the ID
        mutate({ ...values, cover, id: anime.id });
      } else {
        // @ts-expect-error this mutation may be Create Or Update, Update NEED the ID
        mutate({ ...values, cover });
      }
    };
    reader.readAsDataURL(cover);
  };

  return (
    <form
      className="grid grid-cols-3 items-center gap-4"
      onSubmit={form.onSubmit(handleSave)}
    >
      <TextInput
        className="col-span-3"
        label="Titulo"
        {...form.getInputProps("title")}
      />
      <Radio.Group
        className="col-span-2"
        label="Status"
        {...form.getInputProps("status")}
      >
        <Group align="center">
          {status.map((op) => (
            <Radio key={op.value} label={op.label} value={op.value} />
          ))}
        </Group>
      </Radio.Group>

      <TagsInput label="Autores" {...form.getInputProps("authors")} />
      <Textarea
        className="col-span-3"
        autosize
        label="Sinopse"
        {...form.getInputProps("synopsis")}
      />
      <TagsInput
        className="col-span-2"
        label="Gêneros"
        data={genres}
        {...form.getInputProps("genres")}
      />
      <TagsInput label="Dicas" {...form.getInputProps("tips")} />

      <TagsInput
        className="col-span-3"
        label="Urls dos streaming"
        type="url"
        {...form.getInputProps("streamingUrl")}
      />

      <FileInput
        className="col-span-3"
        label="Capa"
        description={ACCEPTED_IMAGE_TYPES.join()}
        placeholder="Selecione um arquivo"
        accept={ACCEPTED_IMAGE_TYPES.join()}
        {...form.getInputProps("cover")}
      />

      <Button disabled={isPending} className="col-span-3">
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
