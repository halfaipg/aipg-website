import { Inter } from "next/font/google";
// import TopBar from "@/components/TopBar";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Power Grid - Democratizing Open Source Generative AI",
  description: "'Revolutionizing the AI landscape with open access to blockchain-validated and incentivized generative AI models, fostering adoption, innovation, creativity, and community-driven growth.",
  // description: "Empowering the architects of tomorrow with the fAreedom of shared AI",
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
