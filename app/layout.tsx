import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const larkenFont = localFont({
  src: [
    {
      path: "./fonts/Larken/LarkenThin.ttf",
      weight: "100", // Thin
      style: "normal",
    },
    {
      path: "./fonts/Larken/LarkenLight.ttf",
      weight: "300", // Light
      style: "normal",
    },
    {
      path: "./fonts/Larken/LarkenRegular.ttf",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "./fonts/Larken/LarkenMedium.ttf",
      weight: "500", // Semibold
      style: "normal",
    },
    {
      path: "./fonts/Larken/LarkenBold.ttf",
      weight: "700", // Bold
      style: "normal",
    },
    {
      path: "./fonts/Larken/LarkenBlack.ttf",
      weight: "900", // Black
      style: "normal",
    },
  ],
  variable: "--font-larken",
});

const einaFont = localFont({
  src: [
    {
      path: "./fonts/Eina/Eina02-Light.ttf",
      weight: "100", // Thin
      style: "normal",
    },
    {
      path: "./fonts/Eina/Eina02-Light.ttf",
      weight: "300", // Light
      style: "normal",
    },
    {
      path: "./fonts/Eina/Eina02-Regular.ttf",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "./fonts/Eina/Eina02-SemiBold.ttf",
      weight: "500", // Semibold
      style: "normal",
    },
    {
      path: "./fonts/Eina/Eina02-Bold.ttf",
      weight: "700", // Bold
      style: "normal",
    },
    {
      path: "./fonts/Eina/Eina02-Bold.ttf",
      weight: "900", // Black
      style: "normal",
    },
  ],
  variable: "--font-eina",
});

export const metadata: Metadata = {
  title: "PhoneLyne",
  description: "Stay Connected Everywhere You Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${einaFont.variable} ${larkenFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
