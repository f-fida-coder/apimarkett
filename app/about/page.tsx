import { StaticPageLayout } from "@/components/static-page-layout"

export default function AboutPage() {
  return (
    <StaticPageLayout
      title="About APIFlow"
      subtitle="A marketplace focused on reliable APIs, clear pricing, and practical developer experience."
      sections={[
        {
          title: "Mission",
          content: [
            "Help teams discover, evaluate, and integrate APIs faster with lower risk.",
            "Make API adoption predictable through transparent quality, uptime, and support expectations.",
          ],
        },
        {
          title: "Approach",
          content: [
            "Prioritize integration speed, documentation quality, and operational reliability.",
            "Support customers directly through WhatsApp, Telegram, and email for faster onboarding.",
          ],
        },
      ]}
    />
  )
}
