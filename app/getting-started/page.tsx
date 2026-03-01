import { StaticPageLayout } from "@/components/static-page-layout"

export default function GettingStartedPage() {
  return (
    <StaticPageLayout
      title="Getting Started"
      subtitle="Start integrating APIs in a few practical steps."
      sections={[
        {
          title: "Step 1: Create Account",
          content: [
            "Sign up and verify your email to access dashboard, keys, and API subscriptions.",
            "Choose a plan based on expected request volume and support needs.",
          ],
        },
        {
          title: "Step 2: Generate API Key",
          content: [
            "Create environment-specific keys for development, staging, and production.",
            "Store keys securely using server-side environment variables, never in client code.",
          ],
        },
        {
          title: "Step 3: Make First Request",
          content: [
            "Use examples from docs to test a simple endpoint call and verify response format.",
            "Monitor analytics and logs in dashboard to track usage, errors, and latency.",
          ],
        },
      ]}
    />
  )
}
