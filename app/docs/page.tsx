import { BookOpen, Code2, KeyRound, LifeBuoy, MessageCircle, Send, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const sections = [
  {
    title: "Authentication",
    icon: KeyRound,
    summary: "Use your API key with Bearer auth on every request.",
    points: [
      "Header: Authorization: Bearer YOUR_API_KEY",
      "Never expose secret keys in frontend code",
      "Rotate keys from Dashboard > API Keys",
    ],
  },
  {
    title: "Rate Limits",
    icon: ShieldCheck,
    summary: "Each plan has request limits and burst controls.",
    points: [
      "Free: 10 req/sec",
      "Starter: 100 req/sec",
      "Pro/Enterprise: custom limits",
    ],
  },
  {
    title: "SDK & Examples",
    icon: Code2,
    summary: "Quick starts for JavaScript, Python, PHP, and cURL.",
    points: [
      "Copy-ready request snippets",
      "Error handling examples",
      "Pagination and webhooks setup",
    ],
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-28 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-0">Documentation</Badge>
            <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-5xl text-balance">
              APIFlow Developer Docs
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate APIs faster: auth, endpoints, examples, limits, and support channels.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {sections.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <BookOpen className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">Need integration help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact APIFlow directly for onboarding, troubleshooting, or enterprise integration support.
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm">
              <a
                href="https://wa.me/923464901531"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp: +92 346 4901531
              </a>
              <a
                href="https://wa.me/qr/CWSD3YRP4STCO1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Add me as a contact on WhatsApp
              </a>
              <a
                href="https://t.me/Apiflowagency"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
                Telegram: t.me/Apiflowagency
              </a>
              <a href="mailto:apiflowagency@gmail.com" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <LifeBuoy className="h-4 w-4" />
                Gmail: apiflowagency@gmail.com
              </a>
              <a href="mailto:numericfida786@gmail.com" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <LifeBuoy className="h-4 w-4" />
                Gmail: numericfida786@gmail.com
              </a>
            </div>
            <Link href="/marketplace">
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                View Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
