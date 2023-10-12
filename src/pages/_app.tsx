import "@/styles/globals.css";
import type { AppProps } from "next/app";

type ComponentWithLayout = {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ComponentWithLayout).getLayout || ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
