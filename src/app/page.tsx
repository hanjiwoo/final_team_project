import Best from "@/components/home/Best";
import MainBanner from "@/components/home/MainBanner";
import NowLocationBtn from "@/components/home/NowLocationBtn";
import SearchForm from "@/components/home/SearchForm";
import ShopList from "@/components/home/ShopList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[95vh] bg-blue-200 gap-10">
      <MainBanner />
      <SearchForm />
      <ShopList />
      <Best />
    </div>
  );
}
