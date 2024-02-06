// import { createClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";
// export const initSupabase = () => {
//   //   const cookieStore = cookies();

//   const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
//   const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

//   return createClient(supabaseUrl, supabaseKey);
// }
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || ""
    })
    // ...add more providers here
  ]
};
export default NextAuth(authOptions);
