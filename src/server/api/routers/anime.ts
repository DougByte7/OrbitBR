import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { animeSchema } from "@/app/cms/schemas/anime-schema";
import { nanoid } from "@/lib/nanoid";
import { utapi } from "@/server/uploadthing";
import { TRPCError } from "@trpc/server";
import { resizeImage } from "@/lib/resizeImage";
import { z } from "zod";
import type { Anime } from "@prisma/client";

const idSize = 10;
const backendAnimeSchema = animeSchema.extend({
  cover: z.string().min(1, "A capa é necessária."),
});
export const animeRouter = createTRPCRouter({
  create: privateProcedure
    .input(backendAnimeSchema)
    .mutation(
      async ({
        ctx,
        input: {
          cover,
          status,
          title,
          synopsis,
          authors,
          genres,
          streamingAt,
          streamingUrl,
        },
      }) => {
        const id = nanoid(idSize);
        const coverKey = await uploadAnimeCover(cover, id);

        return ctx.db.anime.create({
          data: {
            id,
            cover: coverKey,
            status: status.trim(),
            title: title.trim(),
            synopsis: synopsis.trim(),
            authors,
            genres,
            streamingAt: streamingAt.trim(),
            streamingUrl: streamingUrl.trim(),
          },
        });
      },
    ),
  update: privateProcedure
    .input(backendAnimeSchema.extend({ id: z.string().length(idSize) }))
    .mutation(
      async ({
        ctx,
        input: {
          id,
          cover,
          status,
          title,
          synopsis,
          authors,
          genres,
          streamingAt,
          streamingUrl,
        },
      }) => {
        let coverKey = cover;
        if (!cover.endsWith(".png")) {
          const currentCover = await ctx.db.anime.findFirstOrThrow({
            where: { id },
          });
          const res = await utapi.deleteFiles(currentCover.cover);
          if (!res.success)
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
          coverKey = await uploadAnimeCover(cover, id);
        }

        return ctx.db.anime.update({
          where: { id },
          data: {
            cover: coverKey,
            status: status.trim(),
            title: title.trim(),
            synopsis: synopsis.trim(),
            authors,
            genres,
            streamingAt: streamingAt.trim(),
            streamingUrl: streamingUrl.trim(),
          },
        });
      },
    ),
  delete: privateProcedure
    .input(z.string().length(idSize))
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.db.anime.delete({ where: { id: input } });
      await utapi.deleteFiles(deleted.cover);
    }),
  getAll: publicProcedure
    .input(
      z
        .object({
          status: z.enum(["unreleased", "ongoing", "complete"]).optional(),
          title: z.string().optional(),
          authors: z.string().array().optional(),
          genres: z.string().array().optional(),
          streamingAt: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const { status, title, authors, genres, streamingAt } = input ?? {};
      return ctx.db.anime.findMany({
        where: {
          status: status ? { equals: status } : undefined,
          title: title ? { contains: title } : undefined,
          authors: authors ? { hasSome: authors } : undefined,
          genres: genres ? { hasEvery: genres } : undefined,
          streamingAt: streamingAt ? { contains: streamingAt } : undefined,
        },
      });
    }),
  getAllNames: publicProcedure.query(async ({ ctx }) => {
    const animes = await ctx.db.anime.findMany();
    return animes.map((anime) => anime.title);
  }),
  getAnimeOfTheDay: publicProcedure
    .input(z.number().min(0).max(366))
    .query(async ({ ctx, input }) => {
      const seed = input / 366;

      await ctx.db.$executeRaw`SELECT setseed(${seed})`;
      const animeOfTheDay = await ctx.db.$queryRaw<[Anime]>`
       SELECT * 
       FROM "Anime"
       ORDER BY random() 
       LIMIT 1`;

      return animeOfTheDay[0];
    }),
});

async function uploadAnimeCover(cover: string, id: string) {
  const coverBuffer = Buffer.from(cover.split(",")[1]!, "base64");
  const resizedCover = await resizeImage(coverBuffer, 480, 720);
  const oneMega = 1024 ** 2;
  if (resizedCover.byteLength > oneMega)
    throw new TRPCError({ code: "PAYLOAD_TOO_LARGE" });

  const utRes = await utapi.uploadFiles(
    new File([new Blob([resizedCover])], `${id}.png`),
  );
  if (!utRes.data) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  return utRes.data.key;
}
