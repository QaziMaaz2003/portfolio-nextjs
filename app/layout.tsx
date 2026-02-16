import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qazi Maaz Ahmed",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and Performance Optimization. Building fast, modern web applications.",
  icons: {
    icon: [
      { url: '/LOGOO.png', sizes: '32x32', type: 'image/png' },
      { url: '/LOGOO.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: { url: '/LOGOO.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
