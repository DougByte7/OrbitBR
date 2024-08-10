import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AnimeList from "./components/anime-list";
import NewAnime from "./components/new-anime-button";
import Image from "next/image";
import { Autocomplete, Stack } from "@mantine/core";
import TopBar from "@/components/top-bar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function CMS({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}) {
  const user = await currentUser();
  if (!user?.privateMetadata.admin) redirect("/");

  return (
    <main>
      <SignedIn>
        <TopBar>
          <UserButton />
        </TopBar>

        {user.privateMetadata.admin ? (
          <div className="grid gap-4 py-6">
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
              <div className="text-white">
                Tu não divia estar aqui não parça!
              </div>
              <Link className="text-blue-500" href="/">
                Voltar a área segura.
              </Link>
            </div>
          </Stack>
        )}
      </SignedIn>
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
      <Autocomplete
        name="title"
        defaultValue={params?.title}
        className="w-72"
        placeholder="Titulo"
        data={animeNames}
        limit={5}
      />

      <NewAnime />
    </form>
  );
}
