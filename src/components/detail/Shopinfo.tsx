"use client";
import React, { useEffect } from "react";
import Image from "next/image";
// import { typeOfShop } from "@/app/assets/types/types";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "@/redux/modules/detailShopSlice";
import MapTest from "./MapTest";
import spoon from "../../app/assets/images/icon/spoon_fork.png";
import place from "../../app/assets/images/icon/place.png";
import phone from "../../app/assets/images/icon/phone.png";
import menu from "../../app/assets/images/icon/menu.png";
import inquiry from "../../app/assets/images/icon/inquiry.png";
import beforeHeart from "../../app/assets/images/icon/heart_off.png";
import Ddabong from "../home/Ddabong";
import { useQuery } from "@tanstack/react-query";
import { typeOfShop } from "@/app/assets/types/types";
import { getGoodShop } from "../home/QueryFn";
import { getAllShops } from "@/redux/modules/allShops";
import { RootState } from "@/redux/config/configStore";

export default function Shopinfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  // const shop = useSelector((state: RootState) => state.detailShop);

  const { data: shops, isLoading } = useQuery({
    queryKey: ["allshops"],
    queryFn: () => {
      return getGoodShop().then((res: typeOfShop[]) => {
        const filteredRes = res.filter((shop) => {
          return (
            shop.업종.slice(0, 2) !== "기타" &&
            shop.업종.slice(0, 2) !== "이미" &&
            shop.업종.slice(0, 2) !== "목욕" &&
            shop.업종.slice(0, 2) !== "세탁"
          );
        });
        dispatch(getAllShops(filteredRes));
        return filteredRes;
      });
    }
  });
  const shop = shops?.find((shop) => {
    return shop.연락처 === id;
  });
  useEffect(() => {
    if (shop) {
      dispatch(getShop(shop));
    }
  }, [shop]);
  // useEffect(() => {
  //   if (window && localStorage.getItem("upso")) {
  //     const filteredshop = {
  //       가격1: localStorage.getItem("money1"),
  //       가격2:
  //         localStorage.getItem("money2") === "null"
  //           ? ""
  //           : localStorage.getItem("money2"),
  //       가격3:
  //         localStorage.getItem("money3") === "null"
  //           ? ""
  //           : localStorage.getItem("money3"),
  //       메뉴1: localStorage.getItem("menu1"),
  //       메뉴2:
  //         localStorage.getItem("menu2") === "null"
  //           ? ""
  //           : localStorage.getItem("menu2"),
  //       메뉴3:
  //         localStorage.getItem("menu3") === "null"
  //           ? ""
  //           : localStorage.getItem("menu3"),
  //       시군: localStorage.getItem("sigoon"),
  //       시도: localStorage.getItem("sido"),
  //       업소명: localStorage.getItem("upso"),
  //       업종: localStorage.getItem("upzong"),
  //       연락처: localStorage.getItem("phoneNum"),
  //       주소: localStorage.getItem("addr"),
  //     };

  //     dispatch(getShop(filteredshop));
  //   }
  // }, []);

  return (
    // <div className="bg-blue-100 w-[720px] h-[280px] flex-col justify-start items-start gap-8 inline-flex">
    //   <div className="self-stretch justify-between items-center inline-flex">
    //     <h1 className="text-center text-neutral-800 text-3xl font-semibold ">
    //       {shop.업소명}
    //     </h1>
    //     <div className="w-8 h-8 px-[4.67px] py-1.5 justify-center items-center flex" />
    //   </div>
    //   <div className="self-stretch h-[216px] flex-col justify-start items-start gap-4 flex">
    //     <div>업종 {shop.업종}</div>
    //     <div>위치 {shop.주소}</div>
    //     <div>전화번호 {shop.연락처}</div>
    //     <div className="flex">
    //       주요메뉴
    //       <section className="flex flex-col">
    //         <div>
    //           {shop.메뉴1}
    //           {shop.가격1}
    //         </div>
    //         <div>
    //           {shop.메뉴2}
    //           {shop.가격2}
    //         </div>
    //         <div>
    //           {shop.메뉴3}
    //           {shop.가격3}
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    <div className="w-full flex-col items-center gap-8 mt-[60px]">
      <div className="self-stretch justify-between items-center inline-flex mb-[32px] w-full cursor-pointer">
        <div className="text-center text-neutral-800 text-3xl font-semibold leading-[32px]">{shop?.업소명}</div>
        {/* <Image
					src={beforeHeart}
					alt="likeButtn"
					className="w-[32px] h-[32px]"
				/> */}
        <Ddabong type="normal" shopId={id} />
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-4 flex">
        <div className="justify-start items-start gap-6 inline-flex">
          <div className="h-6 justify-start items-center gap-2 flex">
            <Image className="w-6 h-6 p-1 justify-center items-start gap-1 flex" src={spoon} alt="숟가락"></Image>
            <div className="text-center text-neutral-800 text-base font-semibold leading-normal">업종</div>
          </div>
          <div className="text-center text-zinc-600 text-base font-medium leading-normal">{shop?.업종}</div>
        </div>
        <div className="self-stretch justify-start items-start gap-[24px] inline-flex">
          <div className="h-6 justify-start items-center gap-2 flex">
            <Image className="w-6 h-6 p-1 justify-center items-start gap-1 flex" src={place} alt="위치"></Image>
            <div className="text-center text-neutral-800 text-base font-semibold leading-normal">위치</div>
          </div>
          <div className="w-[400px] self-stretch text-zinc-600 text-base font-medium leading-normal">{shop?.주소}</div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <Image className="w-6 h-6 p-1 justify-center items-start gap-1 flex" src={phone} alt="번호"></Image>
            <div className="text-center text-neutral-800 text-base font-semibold leading-normal">전화번호</div>
          </div>
          <div className="w-[263px] self-stretch text-zinc-600 text-base font-medium leading-normal">
            {shop?.연락처}
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <Image className="w-6 h-6 p-1 justify-center items-start gap-1 flex" src={menu} alt="메뉴"></Image>
            <div className="text-center text-neutral-800 text-base font-semibold leading-normal">주요메뉴</div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="text-zinc-600 text-base font-medium leading-normal">{shop?.메뉴1}</div>
              <div className="text-zinc-600 text-base font-medium leading-normal">{shop?.가격1}</div>
            </div>
            <div className="self-stretch justify-start items-start gap-2 inline-flex">
              <div className="text-zinc-600 text-base font-medium leading-normal">{shop?.메뉴2}</div>
              <div className="text-zinc-600 text-base font-medium leading-normal">{shop?.가격2}</div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-6 inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <Image className="w-6 h-6 p-1 justify-center items-start gap-1 flex" src={inquiry} alt="문의하기"></Image>
            <div className="text-center text-neutral-800 text-base font-semibold leading-normal">문의하기</div>
          </div>
          <div className="text-orange-400 text-base font-semibold leading-normal">폐업신고 및 가격변동</div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect } from "react";
// import Image, { ImageProps } from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { getShop } from "@/redux/modules/detailShopSlice";
// import spoon from "../../app/assets/images/icon/spoon_fork.png";
// import place from "../../app/assets/images/icon/place.png";
// import phone from "../../app/assets/images/icon/phone.png";
// import menu from "../../app/assets/images/icon/menu.png";
// import inquiry from "../../app/assets/images/icon/inquiry.png";

// interface IconTextRowProps {
//   icon: ImageProps;
//   label: string;
//   text: React.ReactNode;
//   width: string;
// }

// const IconTextRow: React.FC<IconTextRowProps> = ({
//   icon,
//   label,
//   text,
//   width,
// }) => (
//   <div className={`flex gap-${width} items-start`}>
//     <div className="h-6 justify-start items-center gap-2 flex">
//       <Image {...icon} alt={label} />
//       <div className="ml-2 text-neutral-800 text-base font-semibold leading-normal">
//         {label}
//       </div>
//     </div>
//     <div
//       className={`self-stretch text-zinc-600 text-base font-medium leading-normal`}
//     >
//       {text}
//     </div>
//   </div>
// );

// const MenuRow = ({ menu, price }: { menu: string; price: string }) => (
//   <div className="flex items-center gap-2">
//     <div className="text-zinc-600 font-medium">{menu}</div>
//     <div className="text-zinc-600 font-medium">{price}</div>
//   </div>
// );

// const createMenuSection = (menus: { menu: string; price: string }[]) => (
//   <div className="flex flex-col gap-2">
//     {menus.map((menu, index) => (
//       <MenuRow key={index} menu={menu.menu} price={menu.price} />
//     ))}
//   </div>
// );

// const ShopInfo = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const shop = useSelector((state: any) => state.detailShop);

//   useEffect(() => {
//     if (window && localStorage.getItem("upso")) {
//       const filteredshop = {
//         가격1: localStorage.getItem("money1"),
//         가격2:
//           localStorage.getItem("money2") === "null"
//             ? ""
//             : localStorage.getItem("money2"),
//         가격3:
//           localStorage.getItem("money3") === "null"
//             ? ""
//             : localStorage.getItem("money3"),
//         메뉴1: localStorage.getItem("menu1"),
//         메뉴2:
//           localStorage.getItem("menu2") === "null"
//             ? ""
//             : localStorage.getItem("menu2"),
//         메뉴3:
//           localStorage.getItem("menu3") === "null"
//             ? ""
//             : localStorage.getItem("menu3"),
//         시군: localStorage.getItem("sigoon"),
//         시도: localStorage.getItem("sido"),
//         업소명: localStorage.getItem("upso"),
//         업종: localStorage.getItem("upzong"),
//         연락처: localStorage.getItem("phoneNum"),
//         주소: localStorage.getItem("addr"),
//       };

//       dispatch(getShop(filteredshop));
//     }
//   }, []);

//   return (
//     <div className="bg-blue-100 w-[720px] h-[420px] flex-col justify-start items-start gap-8 inline-flex pt-[60px] pb-[40px]">
//       <div className="flex justify-between items-center">
//         <div className="text-3xl font-semibold text-neutral-800 leading-loose">
//           {shop.업소명}
//         </div>
//         <div className="w-8 h-8 px-[4.67px] py-1.5"></div>
//       </div>
//       <div className="flex flex-col gap-4">
//         <IconTextRow
//           icon={{ src: spoon, alt: "숟가락" }}
//           label="업종"
//           text={shop.업종}
//           width="0"
//         />
//         <IconTextRow
//           icon={{ src: place, alt: "위치" }}
//           label="위치"
//           text={shop.주소}
//           width="0"
//         />
//         <IconTextRow
//           icon={{ src: phone, alt: "전화번호" }}
//           label="전화번호"
//           text={shop.연락처}
//           width="0"
//         />
//         <IconTextRow
//           icon={{ src: menu, alt: "주요메뉴" }}
//           label="주요메뉴"
//           text={createMenuSection([
//             { menu: shop.메뉴1, price: shop.가격1 },
//             { menu: shop.메뉴2, price: shop.가격2 },
//           ])}
//           width="0"
//         />
//         <IconTextRow
//           icon={{ src: inquiry, alt: "문의하기" }}
//           label="문의하기"
//           text="폐업신고 및 가격변동"
//           width="0"
//         />
//       </div>
//     </div>
//   );
// };

// export default ShopInfo;
