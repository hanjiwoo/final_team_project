import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewProvider from "./NewProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "최강의 2조",
  description: "여인준,이아름,이상욱,한지우",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NewProvider>
          <Header />

          {children}

          <Footer />
        </NewProvider>
      </body>
    </html>
  );
}
