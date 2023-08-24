import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter } from "./trpc";
import { wordleRouter } from "./routers/wordle";

export const appRouter = createTRPCRouter({
	wordle: wordleRouter,
});

export type AppRouter = typeof appRouter;
