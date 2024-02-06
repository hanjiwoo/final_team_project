import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewProvider from "./NewProvider";
import cheerio from "cheerio";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import SessionProvider from "./NewProvider2";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Thin.woff",
      weight: "100"
    },
    {
      path: "../../public/fonts/Pretendard-ExtraLight.woff",
      weight: "200"
    },
    {
      path: "../../public/fonts/Pretendard-Light.woff",
      weight: "300"
    },
    {
      path: "../../public/fonts/Pretendard-Regular.woff",
      weight: "400"
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff",
      weight: "500"
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff",
      weight: "600"
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff",
      weight: "700"
    },
    {
      path: "../../public/fonts/Pretendard-ExtraBold.woff",
      weight: "800"
    },
    {
      path: "../../public/fonts/Pretendard-Black.woff",
      weight: "900"
    }
  ],
  display: "swap"
});

export const metadata: Metadata = {
  title: "모두의 음식점 | 모음",
  description: `모두의 음식점과 마음이 모인 곳 "모음"이에요`,
  icons: {
    icon: "/Favicon_32_32.png"
  },
  openGraph: {
    images: ["/OG_image.jpg"]
  },
  metadataBase: new URL("https://mo-eum.vercel.app")
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko" className={myFont.className}>
      <body>
        <NewProvider>
          <SessionProvider session={session}>
            <Header />

            {children}

            <Footer />
          </SessionProvider>
        </NewProvider>
      </body>
    </html>
  );
}
