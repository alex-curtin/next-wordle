import Board from "~/components/board";
import Keyboard from "~/components/keyboard";

const Home = () => {
	return (
		<main className="w-full min-h-screen flex flex-col items-center gap-4 bg-neutral-900 text-white">
			<Board />
			<Keyboard />
		</main>
	);
};

export default Home;
