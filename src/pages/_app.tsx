import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { StyleProvider } from "@ant-design/cssinjs";

type ComponentWithLayout = {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ComponentWithLayout).getLayout || ((page) => page);
  return (
    <StyleProvider hashPriority="high">
      {getLayout(<Component {...pageProps} />)}
    </StyleProvider>
  );
}
