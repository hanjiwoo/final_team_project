import KakaoProvider from "next-auth/providers/kakao";
import NextAuth, { AuthOptions } from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";
// import KakaoProvider from "next-auth/providers/kakao";

// const authOptions = {
//   providers: [
//     KakaoProvider({
//       clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? ""
//     })
//   ]
//   // 다른 옵션들...
// };

// export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
