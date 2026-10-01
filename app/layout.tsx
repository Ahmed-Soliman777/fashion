import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from 'react-hot-toast';

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata: Metadata = {
  title: "Fashion",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
