import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "creyo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Head>
          <title>Creyo</title>
        </Head>
        {children}
      </body>
    </html>
  );
}