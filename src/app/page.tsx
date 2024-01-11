import Best from "@/components/home/Best";
import MainBanner from "@/components/home/MainBanner";
import NowLocationBtn from "@/components/home/NowLocationBtn";
import SearchForm from "@/components/home/SearchForm";
import ShopList_map from "@/components/home/ShopList_map";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[100%] bg-[#fffbeb] gap-10">
      <MainBanner />
      <SearchForm />

      <ShopList_map />

      <Best />
    </div>
  );
}
