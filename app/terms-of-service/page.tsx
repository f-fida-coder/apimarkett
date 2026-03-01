import { StaticPageLayout } from "@/components/static-page-layout"

export default function TermsOfServicePage() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      subtitle="Rules and obligations for using APIFlow services."
      sections={[
        {
          title: "Acceptable Use",
          content: [
            "You must use the platform lawfully and avoid misuse, abuse, scraping violations, or unauthorized access attempts.",
            "You are responsible for activity performed using your API keys and account credentials.",
          ],
        },
        {
          title: "Billing & Plans",
          content: [
            "Paid plans renew based on selected billing cycles unless canceled before renewal.",
            "Usage-based charges, limits, and overage behavior are defined per plan and may vary by provider APIs.",
          ],
        },
        {
          title: "Service Availability",
          content: [
            "We aim for high availability but cannot guarantee uninterrupted service in all circumstances.",
            "Maintenance windows, provider dependencies, and force majeure events may affect service behavior.",
          ],
        },
      ]}
    />
  )
}
