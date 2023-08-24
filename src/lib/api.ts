import axios from "axios";

export const postGuess = async (guess: string) => {
	const { data } = await axios.post("/api/wordle", { guess });

	return data;
};
