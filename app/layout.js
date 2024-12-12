import Head from "next/head";
import "./globals.css";
import { UserProvider } from "../context/UserContext";  // Import UserContext

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
        
        {/* Wrap the entire app with UserProvider */}
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
