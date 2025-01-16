import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Image from "next/image";
import ModalProvider from "@/providers/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to paulse",
  description: "Paulse - your one-stop Ecommerce CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={"relative w-full bg-gray-100", `${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Image
       src="/background.jpeg"
       alt="Lamburghini image"
       width={30}
       height={30}
       quality={100}
       priority
       className="w-full h-full fixed bg-center object-cover"
       />
        <main className="absolute inset-0 bg-pink-500 bg-opacity-10">
          <ModalProvider />
        {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
