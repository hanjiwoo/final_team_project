import Best from "@/components/home/Best";
import GoodPrice from "@/components/home/GoodPrice";
import MainBanner from "@/components/home/MainBanner";
import SearchForm from "@/components/home/SearchForm";
import ShopList from "@/components/home/ShopList";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[100%] bg-[#fffbeb] gap-10">
      <MainBanner />
      <SearchForm />
      <ShopList />
      <Best />
      <GoodPrice />
    </div>
  );
}
