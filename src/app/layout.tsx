import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import RadioBar from "./components/RadioBar";
import localfont from "next/font/local";

export const metadata: Metadata = {
  title: "dublab BCN",
  description: "Generated by create next app",
};

const favorit = localfont({
  src: "./fonts/Favorit_Regular.ttf",
  variable: "--font-favorit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${favorit.variable} font-favorit antialiased`}>
        <RadioBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
