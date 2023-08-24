import { wordList } from "./word-list";

export const getWordOfTheDay: string = () => {
	const date = new Date();
	const day = date.getDate();
	return wordList[day - 1];
};
