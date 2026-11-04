import "./wellness-theme.css";
import "./souls-animated.css";
import Navbar from "@/components/layout/NavBar";
import InteractiveBackground from "@/components/interactive/InteractiveBackground";
import FlyingButterflies from "@/components/interactive/FlyingButterflies";
import HeroAttractive from "@/components/attractive/HeroAttractive";
import ServicesAttractive from "@/components/attractive/ServicesAttractive";
import ProcessAttractive from "@/components/attractive/ProcessAttractive";
import WhyChooseNature from "@/components/nature/WhyChooseNature";
import RelaxationNature from "@/components/nature/RelaxationNature";
import CommunityNature from "@/components/nature/CommunityNature";
import FinalCtaNature from "@/components/nature/FinalCtaNature";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="wellness-page-wrap relative">
      {/* 1. Interactive Cursor-Tracking & Ambient Aurora Animation */}
      <InteractiveBackground />

      {/* 1b. Colorful Floating Butterflies across the Homepage */}
      <FlyingButterflies />

      {/* 2. Clean Sticky Navigation Bar */}
      <Navbar />

      <main className="relative z-10">
        {/* 3. Hero Section: Clean Split-Layout with Logo Signature Colors & HD Photography */}
        <HeroAttractive />

        {/* 4. Services Section: Care That Meets You Where You Are (9 Services Grid) */}
        <ServicesAttractive />

        {/* 5. Counseling Process: A Simple and Supportive Journey (6 Steps Sequence) */}
        <ProcessAttractive />

        {/* 6. Why Choose Souls Life: Editorial Benefits & Sanctuary Interior */}
        <WhyChooseNature />

        {/* 7. Relaxation & Emotional Connection: 4-7-8 Mindful Breathing Banner */}
        <RelaxationNature />

        {/* 8. Community Impact: Grassroots Programs Across Kerala */}
        <CommunityNature />

        {/* 9. Final Call-to-Action & Emergency Helplines */}
        <FinalCtaNature />
      </main>

      {/* 10. Premium Twilight Dark Footer */}
      <Footer />
    </div>
  );
}
