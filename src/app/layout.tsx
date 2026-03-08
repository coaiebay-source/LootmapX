import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LootMapX | Online Auctions with Local Pickup",
    description: "Find local auctions near you. Real-time bidding, AI-powered search, and hyper-local relevance.",
    keywords: "auctions, local auctions, estate sales, liquidation, bidding, Bakersfield auctions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-[#050505] antialiased`}>
                {children}
            </body>
        </html>
    );
}
