import { Inter } from "next/font/google";
// import TopBar from "@/components/TopBar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/context/Providers";
import { socialMetadata } from "./socialMetadata.mjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  ...socialMetadata("home"),
  icons: {
    icon: [{ url: '/aipg-favicon-v2.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48' }],
    shortcut: '/aipg-favicon-v2.ico',
    apple: '/favicon.png?v=2',
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
