import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/StoreProvider";

import { ReactQueryClientProvider } from "@/utils/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercor Users",
  description: "Your favourite way to hire.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <StoreProvider>
        <Layout>{children}</Layout>
      </StoreProvider>
    </ReactQueryClientProvider>
  );
};

export default RootLayout;
