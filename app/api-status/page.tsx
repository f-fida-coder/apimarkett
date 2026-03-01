import { StaticPageLayout } from "@/components/static-page-layout"

export default function ApiStatusPage() {
  return (
    <StaticPageLayout
      title="API Status"
      subtitle="Real-time service health and incident transparency for APIFlow integrations."
      sections={[
        {
          title: "Current Service Health",
          content: [
            "Core platform systems are operational with normal response times for authentication, billing, and dashboard access.",
            "API availability targets remain aligned with our published SLA commitments for paid plans.",
          ],
        },
        {
          title: "Incident Response",
          content: [
            "We monitor endpoint latency, error rates, and upstream dependencies continuously.",
            "If incidents occur, we publish updates with impact scope, affected regions, and estimated resolution times.",
          ],
        },
      ]}
    />
  )
}
