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
import { isLeapYear } from "date-fns";

export const animeRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      animeSchema.extend({ cover: z.string().min(1, "A capa é necessária.") }),
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        cover,
        status,
        title,
        synopsis,
        authors,
        genres,
        streamingAt,
        streamingUrl,
      } = input;

      const coverBuffer = Buffer.from(cover.split(",")[1]!, "base64");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resizedCover = await resizeImage(coverBuffer, 480, 720);
      const oneMega = 1024 ** 2;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (resizedCover.byteLength > oneMega)
        throw new TRPCError({ code: "PAYLOAD_TOO_LARGE" });

      const id = nanoid(10);
      const utRes = await utapi.uploadFiles(
        new File([new Blob([resizedCover])], `${id}.avif`),
      );
      if (!utRes.data) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return ctx.db.anime.create({
        data: {
          id,
          cover: utRes.data.key,
          status: status.trim(),
          title: title.trim(),
          synopsis: synopsis.trim(),
          authors,
          genres,
          streamingAt: streamingAt.trim(),
          streamingUrl: streamingUrl.trim(),
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.anime.findMany();
  }),
  getAllNames: publicProcedure.query(async ({ ctx }) => {
    const animes = await ctx.db.anime.findMany();
    return animes.map((anime) => anime.title);
  }),
  getAnimeOfTheDay: publicProcedure
    .input(z.number().min(0).max(366))
    .query(async ({ ctx, input }) => {
      const seed = input / (isLeapYear(new Date()) ? 366 : 365);
      return ctx.db.$queryRaw<[Anime]>`
      SELECT *, setseed(${seed})::Text
      FROM "Anime"
      ORDER BY random()      
      LIMIT 1
`;
    }),
});
