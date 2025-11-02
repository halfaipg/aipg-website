import { Inter } from "next/font/google";
// import TopBar from "@/components/TopBar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Power Grid - Decentralized AI Infrastructure Network",
  description: "Transform idle GPUs into a permissionless AI utility. AIPG democratizes access to frontier AI models through a community-powered network where GPU owners earn rewards for real inference work.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: '/favicon-96x96.png',
  },
  openGraph: {
    title: "AI Power Grid - Decentralized AI Infrastructure Network",
    description: "Transform idle GPUs into a permissionless AI utility. AIPG democratizes access to frontier AI models through a community-powered network where GPU owners earn rewards for real inference work.",
    url: "https://aipowergrid.io",
    siteName: "AI Power Grid",
    images: [
      {
        url: "/AIPGsimplelogo.png",
        width: 200,
        height: 200,
        alt: "AI Power Grid Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Power Grid - Decentralized AI Infrastructure Network",
    description: "Transform idle GPUs into a permissionless AI utility. AIPG democratizes access to frontier AI models through a community-powered network where GPU owners earn rewards for real inference work.",
    images: ["/AIPGsimplelogo.png"],
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
