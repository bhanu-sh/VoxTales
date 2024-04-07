import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "@/contexts/authContext";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Footer from './components/footer/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoxTales",
  description: "Voice Operated Storytelling Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Toaster position="bottom-center" />
          <AuthProvider>
            <Navbar />
            <div className="flex-grow px-12">
            <EdgeStoreProvider >{children}</EdgeStoreProvider>
            </div>
          </AuthProvider>
          <div className=" min-w-full ">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
