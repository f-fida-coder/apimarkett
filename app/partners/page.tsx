import { StaticPageLayout } from "@/components/static-page-layout"

export default function PartnersPage() {
  return (
    <StaticPageLayout
      title="Partners"
      subtitle="Partnership programs for API providers, resellers, and integration experts."
      sections={[
        {
          title: "Partner Types",
          content: [
            "API providers seeking distribution and developer reach.",
            "Implementation partners delivering integrations for shared customers.",
          ],
        },
        {
          title: "What We Offer",
          content: [
            "Joint go-to-market support, technical onboarding, and visibility in marketplace listings.",
            "Operational alignment on quality standards, support paths, and integration reliability.",
          ],
        },
      ]}
    />
  )
}
