export interface ContentType {
  head?: string; // 썸네일 이미지
  date: string; // 작성 날짜
  context: string; // 포스트 미리보기 요약글
  href?: string; // 링크
  headline: string; // 제목
  tags: string[]; // 태그 목록
}
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio, { Element } from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    dummy: "hello",
  });
}
