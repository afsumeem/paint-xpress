import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>PaintXpress</title>
        <meta
          name="description"
          content="A Paint Service website made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>home page</h2>
    </>
  );
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
