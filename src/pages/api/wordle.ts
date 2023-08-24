export default function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "invalid request" });
	}

	const { guess } = req.body;
	const answer = "trace";
	if (guess === answer) {
		return res.status(200).json({ guess, was_correct: true });
	}
	const charData = guess.split("").map((char, i) => ({
		char,
		inWord: answer.includes(char),
		correctPosition: char === answer[i],
	}));

	return res
		.status(200)
		.json({ guess, was_correct: false, character_data: charData });
}
