import { create } from "zustand";

import { RouterOutputs } from "~/utils/api";
import { defaultLetterColors } from "~/constants/letters";

type Guess = RouterOutputs["wordle"]["checkGuess"];

interface Store {
	guesses: Guess[];
	currentGuess: string[];
	letters: { [key: string]: 0 | 1 | 2 | 3 };
	gameIsOver: boolean;
	addGuess: (newGuess: Guess) => void;
	addLetter: (ltr: string) => void;
	deleteLetter: () => void;
	resetCurrentGuess: () => void;
	setGameOver: () => void;
}

export const useStore = create<Store>((set) => ({
	guesses: [],
	currentGuess: [],
	letters: defaultLetterColors,
	gameIsOver: false,
	setGameOver: () => set(() => ({ gameIsOver: true })),
	addGuess: (newGuess) =>
		set((state) => {
			const newLetters = {};
			newGuess.guessData.forEach((c) => {
				newLetters[c.char] = Math.max(state.letters[c.char], c.color);
			});

			return {
				guesses: [...state.guesses, newGuess],
				letters: { ...state.letters, ...newLetters },
			};
		}),
	addLetter: (ltr) =>
		set((state) => ({ currentGuess: [...state.currentGuess, ltr] })),
	deleteLetter: () =>
		set((state) => ({
			currentGuess: state.currentGuess.slice(0, state.currentGuess.length - 1),
		})),
	resetCurrentGuess: () => set((state) => ({ currentGuess: [] })),
}));
