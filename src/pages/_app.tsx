import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import "./animation.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Toaster position="top-center" />
			<Component {...pageProps} />
		</>
	);
};

export default api.withTRPC(App);
