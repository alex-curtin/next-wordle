import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { getWordOfTheDay } from "~/server/utils/get-word";

const WORDS_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const wordleRouter = createTRPCRouter({
	checkGuess: publicProcedure
		.input(
			z.object({
				guess: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const { guess } = input;

			const { status } = await fetch(`${WORDS_API_URL}${guess}`);
			if (status !== 200) {
				return {
					isVailidGuess: false,
					guess,
					isCorrect: false,
					guessData: [],
				};
			}

			const answer = getWordOfTheDay();
			const isCorrect = answer === guess;

			const tempAnswer = answer.split("");
			const guessData = guess
				.split("")
				.map((char, i) => {
					let color = 1;
					if (char === tempAnswer[i]) {
						color = 3;
						tempAnswer[i] = "_";
					}
					return {
						color,
						char,
					};
				})
				.map((charObj, i) => {
					if (charObj.color === 3) return charObj;
					let color = 1;
					if (tempAnswer.includes(charObj.char)) {
						color = 2;
						const replaceIndex = tempAnswer.findIndex(
							(c) => c === charObj.char,
						);
						tempAnswer[replaceIndex] = "_";
					}
					return {
						...charObj,
						color,
					};
				});

			return {
				guess,
				isCorrect,
				guessData,
				isVailidGuess: true,
			};
		}),

	revealAnswer: publicProcedure.query(async () => {
		const answer = getWordOfTheDay();
		return {
			answer,
		};
	}),
});
