"use client";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import store from "../store/store";
import { MyContextProvider } from "@/ContextApi/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const DynamicProvider = dynamic(
  () => import("react-redux").then((mod) => mod.Provider),
  { ssr: true }
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ChromTech</title>
        <meta name="description" content="|| One Step to your door" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DynamicProvider store={store}>
          <MyContextProvider>
            {children}
          </MyContextProvider>
        </DynamicProvider>
      </body>
    </html>
  );
}
