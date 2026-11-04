import { Cormorant_Garamond, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import StickyWhatsAppButton from "@/components/buttons/StickyWhatsAppButton";
import "./globals.css";
import "./wellness-theme.css";
import "./souls-animated.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Souls Life Wellbeing Center | Healing Minds • Empowering Lives",
  description:
    "Professional counselling and psychological support for individuals, families, and communities. Medical Social Work, Psychology, Child Development, and Wellbeing in Wandoor, Malappuram, Kerala.",
  icons: {
    icon: "/images/logo-transparent.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${plusJakartaSans.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=plein@400&f[]=britney@400&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF8F1] text-[#243746] antialiased selection:bg-[#E8F0E7] selection:text-[#164E3B]">
        {children}
        <StickyWhatsAppButton />
      </body>
    </html>
  );
}
