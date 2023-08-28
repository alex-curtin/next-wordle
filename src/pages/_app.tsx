import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Libre_Franklin } from "next/font/google";

import { api } from "~/utils/api";
import "./animation.css";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<div className={libreFranklin.className}>
			<Toaster position="top-center" />
			<Component {...pageProps} />
		</div>
	);
};

export default api.withTRPC(App);
