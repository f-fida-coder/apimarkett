import { StaticPageLayout } from "@/components/static-page-layout"

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="How APIFlow collects, uses, stores, and protects your information."
      sections={[
        {
          title: "Information We Collect",
          content: [
            "We collect account details (name, email), usage analytics, API request metadata, and support communication data.",
            "For WhatsApp lead forms, we collect contact and project details you submit, including country, phone, and use case context.",
          ],
        },
        {
          title: "How We Use Information",
          content: [
            "To provide platform access, billing operations, security monitoring, customer support, and service improvement.",
            "Lead submissions are used for onboarding, sales follow-up, and support prioritization.",
          ],
        },
        {
          title: "Data Sharing",
          content: [
            "We do not sell personal data. We may share limited data with service providers required for hosting, analytics, and communications.",
            "Data may be disclosed when required by law, regulation, or legitimate security investigations.",
          ],
        },
        {
          title: "Data Retention & Security",
          content: [
            "We retain data for operational, legal, and contractual needs. Retention duration varies by data type and account status.",
            "We apply access controls, transport encryption, and monitoring to reduce unauthorized access risk.",
          ],
        },
        {
          title: "Your Choices",
          content: [
            "You can request updates or deletion of personal data, subject to legal and operational retention requirements.",
            "For privacy requests, contact apiflowagency@gmail.com or numericfida786@gmail.com.",
          ],
        },
      ]}
    />
  )
}
