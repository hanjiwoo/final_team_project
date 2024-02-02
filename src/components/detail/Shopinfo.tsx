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

export default function Shopinfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const shop = useSelector((state: any) => state.detailShop);
  // console.log(shop, "이거 샵이양");
  // const dispatch = useDispatch();
  // console.log(shops);

  // useEffect(() => {
  //   const detailshop = shops.find((shop: typeOfShop) => {
  //     return shop.연락처 === id;
  //   });

  //   dispatch(getShop(detailshop));
  // }, []);
  // console.log(detailshop);
  useEffect(() => {
    if (window && localStorage.getItem("upso")) {
      const filteredshop = {
        가격1: localStorage.getItem("money1"),
        가격2: localStorage.getItem("money2") === "null" ? "" : localStorage.getItem("money2"),
        가격3: localStorage.getItem("money3") === "null" ? "" : localStorage.getItem("money3"),
        메뉴1: localStorage.getItem("menu1"),
        메뉴2: localStorage.getItem("menu2") === "null" ? "" : localStorage.getItem("menu2"),
        메뉴3: localStorage.getItem("menu3") === "null" ? "" : localStorage.getItem("menu3"),
        시군: localStorage.getItem("sigoon"),
        시도: localStorage.getItem("sido"),
        업소명: localStorage.getItem("upso"),
        업종: localStorage.getItem("upzong"),
        연락처: localStorage.getItem("phoneNum"),
        주소: localStorage.getItem("addr")
      };

      dispatch(getShop(filteredshop));
    }
  }, []);

  return (
    // <div className="bg-blue-100 w-[720px] h-[280px] flex-col justify-start items-start gap-8 inline-flex">
    //   <div className=" justify-between items-center inline-flex">
    //     <h1 className=" text-neutral-800 text-3xl font-semibold ">
    //       {shop.업소명}
    //     </h1>
    //     <div className="w-8 h-8 px-[4.67px] py-1.5 justify-center items-center flex" />
    //   </div>
    //   <div className=" h-[216px] flex-col justify-start items-start gap-4 flex">
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
    <div className="w-full flex-col items-center justify-center gap-[32px] mt-[60px] max-sm:mt-[32px]">
      <div className="justify-between items-center flex mb-[32px] w-full">
        <div className="text-neutral-800 text-[24px] font-semibold leading-[32px]">{shop.업소명}</div>
        {/* <Image
					src={beforeHeart}
					alt="likeButtn"
					className="w-[32px] h-[32px]"
				/> */}
        <div className=" cursor-pointer">
          <Ddabong type="normal" shopId={id} />
        </div>
      </div>
      <div className=" flex-col w-full justify-center gap-4 flex">
        <div className="items-center gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image className="w-6 h-6" src={spoon} alt="숟가락"></Image>
            <div className=" text-neutral-800 text-base font-semibold">업종</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop.업종}</div>
        </div>
        <div className="items-center gap-[16px] flex max-sm:items-start">
          <div className="items-center gap-2 flex justify-center">
            <Image className="w-6 h-6" src={place} alt="위치"></Image>
            <div className=" text-neutral-800 text-base font-semibold max-sm:w-[35px]">위치</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop.주소}</div>
        </div>
        <div className="items-center gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image className="w-6 h-6" src={phone} alt="번호"></Image>
            <div className="text-neutral-800 text-base font-semibold">전화번호</div>
          </div>
          <div className=" text-zinc-600 text-base font-medium">{shop.연락처}</div>
        </div>
        <div className="items-start gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image className="w-6 h-6" src={menu} alt="메뉴"></Image>
            <div className="text-neutral-800 text-base font-semibold">주요메뉴</div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 ">
            <div className="flex gap-2 ">
              <div className="text-zinc-600 text-base font-medium">{shop.메뉴1}</div>
              <div className="text-zinc-600 text-base font-medium">{shop.가격1}</div>
            </div>
            <div className="flex gap-2 ">
              <div className="text-zinc-600 text-base font-medium">{shop.메뉴2}</div>
              <div className="text-zinc-600 text-base font-medium">{shop.가격2}</div>
            </div>
          </div>
        </div>
        <div className="items-start gap-[16px] flex">
          <div className="items-center gap-2 flex justify-center">
            <Image className="w-6 h-6" src={inquiry} alt="문의하기"></Image>
            <div className="text-neutral-800 text-base font-semibold">문의하기</div>
          </div>
          <div className="text-orange-400 text-base font-medium">폐업신고 및 가격변동</div>
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
//       className={` text-zinc-600 text-base font-medium leading-normal`}
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
//     <div className="bg-blue-100 w-[720px] h-[420px] flex-col justify-start items-start gap-8  pt-[60px] pb-[40px]">
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
