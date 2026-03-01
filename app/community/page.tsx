import { StaticPageLayout } from "@/components/static-page-layout"

export default function CommunityPage() {
  return (
    <StaticPageLayout
      title="Community"
      subtitle="Connect with developers building on APIFlow."
      sections={[
        {
          title: "Discussion Channels",
          content: [
            "Join Telegram to discuss implementations and share integration patterns.",
            "Use community channels for troubleshooting and best-practice feedback.",
          ],
        },
        {
          title: "Contributions",
          content: [
            "Share SDK examples, quick-start snippets, and tooling templates.",
            "Report issues and suggest roadmap improvements based on production use.",
          ],
        },
      ]}
    />
  )
}
