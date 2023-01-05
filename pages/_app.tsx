import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PlayerContextProvider } from "../context/PlayerContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlayerContextProvider>
  );
}
