"use client";
import React, { PropsWithChildren } from "react";
import store from "../redux/config/configStore";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  }
});

type Props = {
  children: React.ReactNode;
};

export default function NewProvider({ children }: PropsWithChildren) {
  const [supabaseClient] = useState(() => createClientComponentClient());
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <ToastContainer />
          <>{children}</>
        </SessionContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}
