
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // 👈 Import the AuthProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lighthouse | Outreaches",
  description: "Shop your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        font-sans antialiased 
        bg-background text-foreground
        selection:bg-purple-600 selection:text-white
        leading-relaxed tracking-tight
      `}
      >
        <AuthProvider> {/* 👈 Wrap children inside AuthProvider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

