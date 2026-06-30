import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"], // Pesos permitidos: 400 (regular) y 500 (medium). Nunca usar 600 ni 700
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500"], // Peso 500 permitido para títulos display
});

export const metadata: Metadata = {
  title: "Hospitales MAC · Red Nacional de Salud",
  description: "Red nacional de hospitales privados de alta especialidad. Alta especialidad médica accesible en tu ciudad. 25 unidades en México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-mac-carbon antialiased bg-white">
        <TopBar />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
