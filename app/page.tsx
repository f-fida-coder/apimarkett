import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { PopularApisSection } from "@/components/home/popular-apis-section"
import { StatsSection } from "@/components/home/stats-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CodePreviewSection } from "@/components/home/code-preview-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CategoriesSection />
      <PopularApisSection />
      <HowItWorksSection />
      <CodePreviewSection />
      <TestimonialsSection />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}
