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
  title: "모두의 음식점 | 모음",
  description: `모두의 음식점과 마음이 모인 곳 "모음"이에요`,
  icons: {
    icon: "/Favicon_32_32.png"
  },
  openGraph: {
    images: ["/OG_image.jpg"]
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
