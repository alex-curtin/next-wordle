import { toast } from "react-hot-toast";

import { letters } from "../constants/letters";
import DeleteIcon from "./icons/delete-icon";
import { useStore } from "../store";
import { postGuess } from "~/lib/api";
import { letterKeys } from "../constants/letters";
import { api } from "~/utils/api";

type ButtonProps = {
	onClick: () => void;
	color: number;
};

const colorClasses = [
	"bg-neutral-500",
	"bg-neutral-700",
	"bg-yellow-500",
	"bg-green-600",
];

const Button = ({ children, onClick, color = 0 }: ButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`${colorClasses[color]} py-4 px-4 rounded-md`}
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
		letters,
		resetCurrentGuess,
	} = useStore((state) => state);
	const { data: guessResult, refetch } = api.wordle.checkGuess.useQuery(
		{
			guess: currentGuess.join(""),
		},
		{ enabled: currentGuess.length === 5 },
	);

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
			await refetch();
			if (guessResult?.isVailidGuess) {
				addGuess(guessResult);
				resetCurrentGuess();
			} else {
				toast("Not in word list", { duration: 500 });
			}
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
