import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewProvider from "./NewProvider";
import cheerio from "cheerio";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모두의 음식점 | 모-음",
  description: "여인준, 이아름, 이상욱, 한지우",
  icons: {
    icon: "/Favicon_32_32.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
