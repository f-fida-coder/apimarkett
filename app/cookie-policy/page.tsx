import { StaticPageLayout } from "@/components/static-page-layout"

export default function CookiePolicyPage() {
  return (
    <StaticPageLayout
      title="Cookie Policy"
      subtitle="How cookies and similar technologies are used on APIFlow."
      sections={[
        {
          title: "Cookie Categories",
          content: [
            "Essential cookies are used for authentication, session continuity, and security controls.",
            "Analytics cookies help us understand usage trends and improve navigation and performance.",
          ],
        },
        {
          title: "Managing Preferences",
          content: [
            "You can manage cookies from your browser settings, including blocking or deleting saved cookies.",
            "Disabling essential cookies may limit parts of platform functionality.",
          ],
        },
      ]}
    />
  )
}
