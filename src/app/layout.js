import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import LiveActivityTicker from "@/components/LiveActivityTicker";
import Toast from "@/components/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "TravelGo - Explore The World | Real-Time Travel Booking & Deals",
  description: "Find your perfect destination, 5-star luxury hotels, curated tour packages, and live weather telemetry with TravelGo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <BookingProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <BookingModal />
            <LiveActivityTicker />
            <Toast />
          </SmoothScroll>
        </BookingProvider>
      </body>
    </html>
  );
}

