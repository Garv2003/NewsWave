import { z } from "zod";
import bcrypt from "bcrypt";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { user } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })).mutation(async ({ ctx, input }) => {
        try {
            const ExistUser = await ctx.db.select().from(user).where(eq(user.email, input.email));

            if (!ExistUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User not found",
                });
            }

            const isPasswordValid = await bcrypt.compare(input.password, ExistUser.password);

            if (!isPasswordValid) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid password",
                });
            }

            return user;
        }
        catch (err) {
            console.error(err);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    }),

    register: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })).mutation(async ({ ctx, input }) => {
        try {

            const ExistUser = await ctx.db.select().from(user).where(eq(user.email, input.email));

            if (ExistUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, 12);

            const newUser = await ctx.db.insert(user).values({
                email: input.email,
                password: hashedPassword,
            });

            return newUser;
        }
        catch (err) {
            console.error(err);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    })
});
