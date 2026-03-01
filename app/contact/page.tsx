import { StaticPageLayout } from "@/components/static-page-layout"

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="Contact"
      subtitle="Reach APIFlow support and sales through your preferred channel."
      sections={[
        {
          title: "Direct Channels",
          content: [
            "WhatsApp: +44 7402 440753",
            "Telegram: t.me/Apiflowagency",
            "Email: apiflowagency@gmail.com and numericfida786@gmail.com",
          ],
        },
        {
          title: "Response Scope",
          content: [
            "Integration support, pricing questions, custom plans, and onboarding guidance.",
            "Please include your use case, expected scale, and required APIs for faster response.",
          ],
        },
      ]}
    />
  )
}
