import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedInventory from "@/components/FeaturedInventory";
import WhyChooseUs from "@/components/WhyChooseUs";
import FinanceCalculator from "@/components/FinanceCalculator";
import Founders from "@/components/Founders";
import ReviewsSection from "@/components/ReviewsSection";
import SellCTA from "@/components/SellCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedInventory />
        <WhyChooseUs />
        <FinanceCalculator />
        <Founders />
        <ReviewsSection />
        <SellCTA />
      </main>
      <Footer />
    </>
  );
}
