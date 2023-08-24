import { useStore } from "../store";

const colorClasses = ["", "bg-neutral-600", "bg-yellow-500", "bg-green-600"];

const Square = ({
	letter,
	colorClass = "",
}: { letter: string; colorClass: string }) => {
	return (
		<div
			className={`w-14 h-14 border border-neutral-600 flex items-center justify-center font-bold text-3xl ${colorClass}`}
		>
			{letter?.toUpperCase()}
		</div>
	);
};

const Board = () => {
	const { currentGuess, guesses } = useStore((state) => state);

	return (
		<div>
			{guesses.map((guess, i) => {
				return (
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={i} className="flex gap-1 mb-1">
						{guess.guessData.map((ltr, i) => {
							return (
								<Square
									letter={ltr.char}
									colorClass={colorClasses[ltr.color]}
									// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={i}
								/>
							);
						})}
					</div>
				);
			})}
			{Array.from({ length: 6 - guesses.length }).map((_, i) => (
				// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div className="flex gap-1 mb-1" key={i}>
					{Array.from({ length: 5 }).map((_, j) => (
						// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Square key={j} letter={i === 0 ? currentGuess[j] : ""} />
					))}
				</div>
			))}
		</div>
	);
};

export default Board;