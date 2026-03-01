import { StaticPageLayout } from "@/components/static-page-layout"

export default function SdksPage() {
  return (
    <StaticPageLayout
      title="SDKs"
      subtitle="Official and community-supported SDK resources."
      sections={[
        {
          title: "Supported Languages",
          content: [
            "JavaScript/TypeScript, Python, PHP, and cURL starter kits.",
            "Unified auth, retries, and pagination helpers across SDK patterns.",
          ],
        },
        {
          title: "Integration Guidance",
          content: [
            "Standardized error handling and response typing recommendations.",
            "Versioning and migration guidance for long-term API reliability.",
          ],
        },
      ]}
    />
  )
}
