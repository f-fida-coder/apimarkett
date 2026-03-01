import { StaticPageLayout } from "@/components/static-page-layout"

export default function BlogPage() {
  return (
    <StaticPageLayout
      title="Blog"
      subtitle="Engineering notes, integration patterns, and API business insights."
      sections={[
        {
          title: "What We Publish",
          content: [
            "Architecture breakdowns for high-volume API systems.",
            "Security and compliance best practices for modern API products.",
          ],
        },
        {
          title: "Who It Is For",
          content: [
            "Developers shipping API-powered products.",
            "Technical founders and product teams evaluating third-party API stacks.",
          ],
        },
      ]}
    />
  )
}
