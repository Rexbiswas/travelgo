import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import TopHotels from "@/components/TopHotels";
import PhotoGallery from "@/components/PhotoGallery";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Overlapping Search Bar */}
      <Hero />

      {/* 2. Popular Destinations Section */}
      <PopularDestinations limit={5} showAllLink={true} />

      {/* 3. Top Hotels Section */}
      <TopHotels limit={4} showAllLink={true} />

      {/* 4. Photo Gallery Section */}
      <PhotoGallery />

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}
