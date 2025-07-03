import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import NavBarContainer from "@/components/navbar/NavBarContainer";
import { ToastContainer } from 'react-toastify';
import { CartProvider } from "@/context/CartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppit - Home",
  description: "Shoppit is a sleek and modern e-commerce website where you can browse, shop, and securely checkout with ease. Whether you're looking for the latest trends or everyday essentials, Shoppit makes online shopping seamless and enjoyable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <NavBarContainer />
          <ToastContainer />
          {children}
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
