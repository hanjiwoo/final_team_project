import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
export const initSupabase = () => {
  //   const cookieStore = cookies();

  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient(supabaseUrl, supabaseKey);
};
