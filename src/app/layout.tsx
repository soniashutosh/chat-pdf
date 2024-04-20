import Providers from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHAT-PDF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <head>
            <link rel="icon" type="image/x-icon" href="/vercel.svg"></link>
          </head>
          <body className={inter.className}>{children}</body>
          {/* Fix the hydration error coming up becuase of this toaster component as it refreshes the page and content before and after is not matching... */}
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
