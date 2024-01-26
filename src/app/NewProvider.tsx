"use client";
import React, { PropsWithChildren } from "react";
import store from "../redux/config/configStore";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function NewProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <ToastContainer />
        <>{children}</>
      </Provider>
    </QueryClientProvider>
  );
}
