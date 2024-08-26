import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { post } from "~/server/db/schema";
import type { NewsProps } from "~/types";
import { env } from "~/env";
import { eq } from 'drizzle-orm';

export const newsRouter = createTRPCRouter({
  news: publicProcedure.query(async () => {
    try {
      const news = await fetch(`https://newsapi.org/v2/everything?q=general&apiKey=${env.NEWS_API_KEY}`);
      const newsJson = await news.json() as NewsProps;
      return newsJson;
    }
    catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      author: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string(),
      urlToImage: z.string(),
      publishedAt: z.string(),
      content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {

        const postExist = await ctx.db.select().from(post).where(eq(post.url, input.url));

        if (postExist) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Post already exists",
          });
        }

        await ctx.db.insert(post).values({
          createdById: ctx.session?.user.id,
          name: input.name,
          author: input.author,
          title: input.title,
          description: input.description,
          url: input.url,
          urlToImage: input.urlToImage,
          publishedAt: input.publishedAt,
          content: input.content,
        })
      }
      catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getPost: protectedProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.select().from(post).where(eq(post.createdById, ctx.session?.user.id));
      return posts ?? null;
    }
    catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});

