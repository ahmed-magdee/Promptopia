import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promtopia",
  description: "Discover & share AI prompts",
};

// The Main Component Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {/* The Nav Bar */}
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
