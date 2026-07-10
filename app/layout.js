import { Inter } from "next/font/google";
// import TopBar from "@/components/TopBar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Power Grid - Decentralized AI Generation Network",
  description: "Transform idle GPUs into a permissionless AI generation layer for text, images, video, agents, and workflows. GPU owners earn rewards for real user jobs.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "AI Power Grid - Decentralized AI Generation Network",
    description: "Transform idle GPUs into a permissionless AI generation layer for text, images, video, agents, and workflows. GPU owners earn rewards for real user jobs.",
    url: "https://aipowergrid.io",
    siteName: "AI Power Grid",
    images: [
      {
        url: "https://aipowergrid.io/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Power Grid - Decentralized AI Generation Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Power Grid - Decentralized AI Generation Network",
    description: "Transform idle GPUs into a permissionless AI generation layer for text, images, video, agents, and workflows. GPU owners earn rewards for real user jobs.",
    images: ["https://aipowergrid.io/opengraph-image.jpg"],
    creator: "@AIPowerGrid",
  },
};
export const revalidate = 30;
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* <TopBar /> */}
          <Navbar />
          {children}
          <Footer />
          
        </Providers>
      </body>
    </html>
  );
}
