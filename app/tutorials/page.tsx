import { StaticPageLayout } from "@/components/static-page-layout"

export default function TutorialsPage() {
  return (
    <StaticPageLayout
      title="Tutorials"
      subtitle="Hands-on guides for common API integration workflows."
      sections={[
        {
          title: "Popular Tutorials",
          content: [
            "Build AI chat integrations with token tracking and retry logic.",
            "Implement payment webhooks and signature verification for secure events.",
          ],
        },
        {
          title: "Advanced Workflows",
          content: [
            "Create rate-limit aware API clients with queueing and backoff.",
            "Use analytics data to optimize endpoint usage and reduce operational cost.",
          ],
        },
      ]}
    />
  )
}
