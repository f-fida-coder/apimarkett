import { StaticPageLayout } from "@/components/static-page-layout"

export default function SlaPage() {
  return (
    <StaticPageLayout
      title="Service Level Agreement (SLA)"
      subtitle="Service reliability commitments and support response targets."
      sections={[
        {
          title: "Availability Targets",
          content: [
            "Pro plan target: 99.9% monthly availability.",
            "Enterprise plan target: 99.99% monthly availability with custom contractual options.",
          ],
        },
        {
          title: "Support Response",
          content: [
            "Starter support: up to 24 hours for standard issues.",
            "Pro support: priority responses, typically within 4 hours. Enterprise support includes custom escalation paths.",
          ],
        },
      ]}
    />
  )
}
