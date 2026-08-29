import { Inter } from "next/font/google";
// import TopBar from "@/components/TopBar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Power Grid - Community-Powered AI Generation",
  description: "Transform supported GPUs into a community-powered generation layer for text, images, video, audio, agents, and workflows. GPU owners earn rewards for recorded work.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "AI Power Grid - Community-Powered AI Generation",
    description: "Transform supported GPUs into a community-powered generation layer for text, images, video, audio, agents, and workflows. GPU owners earn rewards for recorded work.",
    url: "https://aipowergrid.io",
    siteName: "AI Power Grid",
    images: [
      {
        url: "https://aipowergrid.io/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Power Grid - Community-Powered AI Generation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Power Grid - Community-Powered AI Generation",
    description: "Transform supported GPUs into a community-powered generation layer for text, images, video, audio, agents, and workflows. GPU owners earn rewards for recorded work.",
    images: ["https://aipowergrid.io/opengraph-image.jpg"],
    creator: "@AIPowerGrid",
  },
};
export const revalidate = 30;
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href="https://aipowergrid.io/llms.txt"
          title="AI Power Grid agent index"
        />
        <link
          rel="help"
          type="text/markdown"
          href="https://aipowergrid.io/.well-known/skills/grid/SKILL.md"
          title="AI Power Grid agent skill"
        />
      </head>
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
