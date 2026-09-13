import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "600", "700"], 
  variable: "--font-roboto",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Realtime Authentication",
  description: "Building realtime authentication with expertise in react and next js using better auth",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.className} h-full flex flex-col`}>
      <body className="bg-gray-950">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
