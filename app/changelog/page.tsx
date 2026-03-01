import { StaticPageLayout } from "@/components/static-page-layout"

export default function ChangelogPage() {
  return (
    <StaticPageLayout
      title="Changelog"
      subtitle="Track product updates, fixes, and platform improvements."
      sections={[
        {
          title: "Latest Updates",
          content: [
            "Added WhatsApp lead workflow for Buy/Get API actions with pre-contact form capture.",
            "Introduced MongoDB lead persistence and improved form validation for global users.",
          ],
        },
        {
          title: "Platform Improvements",
          content: [
            "Expanded API category coverage and richer marketplace data across homepage and dashboard.",
            "Added missing content pages to remove dead links and improve site trust and navigation.",
          ],
        },
      ]}
    />
  )
}
