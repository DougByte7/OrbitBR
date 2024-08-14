import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AnimeList from "./components/anime-list";
import NewAnime from "./components/new-anime-button";
import Image from "next/image";
import {
  ActionIcon,
  Autocomplete,
  Select,
  Stack,
  TagsInput,
} from "@mantine/core";
import TopBar from "@/components/top-bar";
import Link from "next/link";
import { api } from "@/trpc/server";
import { genres, status, streamings } from "@/constants/animes";
import { FilterIcon } from "lucide-react";

export default async function CMS({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}) {
  const user = await currentUser();

  return (
    <main>
      <TopBar>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>Entrar</SignInButton>
        </SignedOut>
      </TopBar>

      {user?.privateMetadata.admin === true ? (
        <div className="grid gap-4 pt-6">
          <AnimeFilters params={searchParams} />
          <AnimeList />
        </div>
      ) : (
        // No one should ever see this, but just in case
        <Stack className="p-4" align="center">
          <Image
            src="/images/shrek.jpg"
            alt={"shrek smith"}
            width={500}
            height={500}
          />
          <div className="text-center">
            <div className="text-white">Tu não divia estar aqui não parça!</div>
            <Link className="text-blue-500" href="/">
              Voltar a área segura.
            </Link>
          </div>
        </Stack>
      )}
    </main>
  );
}

interface AnimeFilterProps {
  params?: Record<string, string | undefined>;
}
async function AnimeFilters({ params }: AnimeFilterProps) {
  const animeNames = await api.anime.getAllNames();

  return (
    <form className="mx-auto flex w-full max-w-[1200px] justify-center gap-3">
      <NewAnime />

      <Autocomplete
        name="title"
        defaultValue={params?.title}
        className="w-72"
        placeholder="Titulo"
        data={animeNames}
        limit={5}
      />
      <TagsInput
        name="authors"
        defaultValue={params?.authors ? params?.authors?.split(",") : undefined}
        placeholder="Autores"
      />
      <TagsInput
        name="genres"
        defaultValue={params?.genres ? params?.genres?.split(",") : undefined}
        className="col-span-2"
        placeholder="Gêneros"
        data={genres}
      />
      <Select
        clearable
        name="status"
        defaultValue={params?.status}
        placeholder="Status"
        data={status}
      />
      <Autocomplete
        name="streamingAt"
        defaultValue={params?.streamingAt}
        placeholder="Streaming"
        data={streamings}
      />
      <ActionIcon type="submit" size="lg">
        <FilterIcon />
      </ActionIcon>
    </form>
  );
}
