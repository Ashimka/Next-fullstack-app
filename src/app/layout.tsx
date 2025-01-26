import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Online STORE | Super Store",
  description: "Интернет магазин",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${roboto.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
