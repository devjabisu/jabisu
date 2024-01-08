import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import SideNav from "@/components/side-nav";
import "@/styles/main.css";
import React from "react";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Develop Helper Demo",
  description: "A simple helper to enhance your development experience",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <div className="flex">
          <SideNav />
          <div className="pl-3 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
