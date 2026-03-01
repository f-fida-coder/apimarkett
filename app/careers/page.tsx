import { StaticPageLayout } from "@/components/static-page-layout"

export default function CareersPage() {
  return (
    <StaticPageLayout
      title="Careers"
      subtitle="Build developer-first API infrastructure with a product-focused team."
      sections={[
        {
          title: "How We Work",
          content: [
            "We value practical execution, clear communication, and measurable outcomes.",
            "Engineering decisions are guided by reliability, customer impact, and long-term maintainability.",
          ],
        },
        {
          title: "Open Roles",
          content: [
            "Backend/API Engineering, Frontend Platform, Developer Relations, and Support Operations.",
            "For role inquiries, reach out through the Contact page with your profile and experience summary.",
          ],
        },
      ]}
    />
  )
}
