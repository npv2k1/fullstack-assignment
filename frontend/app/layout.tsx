"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { Toaster } from "sonner";
import Sidebar from "@/components/Sidebar/Sidebar";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="w-screen h-screen flex flex-row p-6">
            <Sidebar></Sidebar>
            {children}
          </div>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
