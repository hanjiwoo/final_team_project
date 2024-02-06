import { StaticImageData } from "next/image";

export type typeOfShop = {
  가격1: number;
  가격2: number;
  가격3: number;
  메뉴1: string;
  메뉴2: string;
  메뉴3: string;
  시군: string;
  시도: string;
  업소명: string;
  업종: string;
  연락처: string;
  주소: string;
};

export type typeOfThumbs = {
  isLogin?: boolean;
  uid?: string;
  name?: string;
  id: string;
  shopId?: string;
};
export type typeOfShare = {
  address: string;
  category: string;
  id: string;
  phone: string;
  url: string;
  shopName: string;
  x: string;
  y: string;
};

export type assessment = {
  title: string;
  one: string;
  two: string;
  three: string;
  four: string;
  type: string;
};

export type typeOfHoogi = {
  맛?: string;
  가격?: string;
  위생?: string;
  displayName?: string;
  서비스?: string;
  id?: string;
  uid?: string;
  shopId?: string | string[] | undefined;
};

export interface Post {
  category?: string;
  uid?: string;
  id: string;
  title?: string;
  profile?: string;
  content?: string;
  nickname?: string;
  createdAt?: number;
  photos?: string[];
}

export type Daetgle = {
  profile?: string;
  uid?: string;
  nickName?: string;
  content?: string;
  postId?: string;
  id: string;
  createdAt?: number;
};

export type typeOfHeart = {
  isLogin?: boolean;
  uid?: string;
  name?: string;
  id: string;
  postId?: string;
};

export type SessionUser = {
  name: string;
  email: string;
  image: string;
};
