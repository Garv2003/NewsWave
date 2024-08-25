import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const newsRouter = createTRPCRouter({
  news: publicProcedure.query(async () => {
    const news = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=0eae13d16f9e432883c96d192a16f11d");
    const newsJson = await news.json();
    return newsJson;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        url: input.url,
        createdById: ctx.session.user.id,
      });
    }),

  getPost: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});
