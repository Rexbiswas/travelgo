import HeroSection from '@/components/hero/HeroSection';
import BenefitsStrip from '@/components/sections/BenefitsStrip';
import WhyTravelGo from '@/components/sections/WhyTravelGo';
import PopularOffers from '@/components/sections/PopularOffers';
import StatisticsStrip from '@/components/sections/StatisticsStrip';

export const metadata = {
  title: 'TravelGo — One Platform for All Your Travel',
  description: 'Book Bus, Train & Flight Tickets in Real Time — Smart, Flexible, and Rewarding.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8FC]">
      {/* SECTION 2 & 3: Hero Banner with Overlapping Booking Search Panel */}
      <HeroSection />

      {/* SECTION 4: Trust / Benefits Strip */}
      <BenefitsStrip />

      {/* SECTION 5: Why TravelGo is Different (6 Pastel Cards) */}
      <WhyTravelGo />

      {/* SECTION 6 & 7: Popular Offers & Mobile Application Promotion */}
      <PopularOffers />

      {/* SECTION 8: Statistics Strip */}
      <StatisticsStrip />
    </div>
  );
}
