import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeFirebaseApp } from '@/lib/firebase/firebase'


initializeFirebaseApp()
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
