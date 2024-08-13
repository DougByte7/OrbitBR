import { db } from "@/server/db";
import type { Anime } from "@prisma/client";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const currentResults =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    (await db.todayGameResults.findFirst()) ?? undefined;

  let [animeOfTheDay] = await db.$queryRaw<[Anime]>`
     SELECT * 
     FROM "Anime"
     ORDER BY random() 
     LIMIT 1`;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  while (animeOfTheDay.id === currentResults?.animeId) {
    [animeOfTheDay] = await db.$queryRaw<[Anime]>`
     SELECT * 
     FROM "Anime"
     ORDER BY random() 
     LIMIT 1`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await db.todayGameResults.update({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      animeId: currentResults?.animeId ?? undefined,
    },
    data: {
      animeId: animeOfTheDay.id,
    },
  });

  return Response.json({ success: true });
}
