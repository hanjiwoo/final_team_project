export const getGoodShop = async () => {
  const resp = await fetch(
    `https://api.odcloud.kr/api/3045247/v1/uddi:00389e44-9981-41c5-81b9-c31008cd0210?page=1&perPage=6500&serviceKey=${process.env.NEXT_PUBLIC_URL}`
  );
  const data = await resp.json();
  return data.data;
};
