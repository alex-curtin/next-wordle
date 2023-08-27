import { useEffect, type ReactNode } from "react";
import { toast } from "react-hot-toast";

import DeleteIcon from "./icons/delete-icon";
import { useStore } from "../store";
import { postGuess } from "~/lib/api";
import { letterKeys } from "../constants/letters";
import { api } from "~/utils/api";

type ButtonProps = {
	onClick: () => void;
	color?: number;
	children: ReactNode;
};

const colorClasses = [
	"bg-neutral-500",
	"bg-neutral-700",
	"bg-yellow-500",
	"bg-green-600",
];

const Button = ({ children, onClick, color = 0 }: ButtonProps) => {
	const { gameIsOver } = useStore();

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${colorClasses[color]} py-4 px-4 rounded-md`}
			disabled={gameIsOver}
		>
			{children}
		</button>
	);
};

const Keyboard = () => {
	const [row1, row2, row3] = letterKeys;
	const {
		currentGuess,
		addLetter,
		deleteLetter,
		addGuess,
		guesses,
		gameIsOver,
		letters,
		resetCurrentGuess,
		setGameOver,
	} = useStore();
	const {
		data: guessResult,
		refetch: checkGuess,
		isRefetching: isCheckingGuess,
	} = api.wordle.checkGuess.useQuery(
		{
			guess: currentGuess.join(""),
		},
		{ enabled: false },
	);
	const {
		data: correctAnswer,
		refetch: fetchAnswer,
		isRefetching: isFetchingAnswer,
	} = api.wordle.revealAnswer.useQuery(null, { enabled: false });

	useEffect(() => {
		if (guessResult) {
			if (!guessResult.isVailidGuess) {
				toast("Not in word list", { duration: 1000 });
				return;
			}

			addGuess(guessResult);
			resetCurrentGuess();

			if (guessResult.isCorrect) {
				setGameOver();
				toast(
					`Congratulations, you guessed it in ${guesses.length + 1} turn${
						guesses.length + 1 === 1 ? "" : "s"
					}`,
				);
			}

			if (guesses.length === 5 && !guessResult.isCorrect) {
				setGameOver();
				fetchAnswer();
			}
		}
	}, [guessResult]);

	useEffect(() => {
		if (correctAnswer) {
			toast(`The correct answer is ${correctAnswer.answer}!`, {
				duration: Infinity,
			});
		}
	}, [correctAnswer]);

	const onClickLetter = (ltr: string) => {
		if (currentGuess.length < 5) {
			addLetter(ltr);
		}
	};

	const onClickDelete = () => {
		if (currentGuess.length) {
			deleteLetter();
		}
	};

	const onClickEnter = async () => {
		if (currentGuess.length === 5) {
			checkGuess();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-1 justify-center">
				{row1.map((ltr) => (
					<Button
						key={ltr}
						onClick={() => onClickLetter(ltr)}
						color={letters[ltr] || 0}
					>
						{ltr.toUpperCase()}
					</Button>
				))}
			</div>
			<div className="flex gap-1 justify-center">
				{row2.map((ltr) => (
					<Button
						key={ltr}
						onClick={() => onClickLetter(ltr)}
						color={letters[ltr] || 0}
					>
						{ltr.toUpperCase()}
					</Button>
				))}
			</div>
			<div className="flex gap-1 justify-center">
				<Button onClick={onClickEnter}>ENTER</Button>
				{row3.map((ltr) => (
					<Button
						key={ltr}
						onClick={() => onClickLetter(ltr)}
						color={letters[ltr] || 0}
					>
						{ltr.toUpperCase()}
					</Button>
				))}
				<Button onClick={onClickDelete}>
					<DeleteIcon />
				</Button>
			</div>
		</div>
	);
};

export default Keyboard;
