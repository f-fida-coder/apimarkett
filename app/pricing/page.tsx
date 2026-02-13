"use client"

import { useState } from "react"
import { Check, X, HelpCircle, ArrowRight, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pricingTiers } from "@/lib/data"
import { cn } from "@/lib/utils"

const comparisonFeatures = [
  { category: "Usage", features: [
    { name: "API Calls / Month", values: ["1,000", "50,000", "500,000", "Unlimited"] },
    { name: "API Integrations", values: ["5", "25", "Unlimited", "Unlimited"] },
    { name: "Rate Limit", values: ["10 req/sec", "100 req/sec", "Custom", "Custom"] },
  ]},
  { category: "Features", features: [
    { name: "API Playground", values: [true, true, true, true] },
    { name: "Webhook Support", values: [false, true, true, true] },
    { name: "Custom API Keys", values: [false, true, true, true] },
    { name: "Team Collaboration", values: [false, false, "5 seats", "Unlimited"] },
    { name: "Real-time Analytics", values: [false, false, true, true] },
    { name: "Custom Rate Limits", values: [false, false, true, true] },
  ]},
  { category: "Support", features: [
    { name: "Community Support", values: [true, true, true, true] },
    { name: "Email Support", values: [false, "24h SLA", "4h SLA", "1h SLA"] },
    { name: "Dedicated Account Manager", values: [false, false, false, true] },
    { name: "SLA", values: ["-", "-", "99.9%", "99.99%"] },
    { name: "On-premise Deployment", values: [false, false, false, true] },
  ]},
]

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate any charges.",
  },
  {
    q: "What happens if I exceed my API call limit?",
    a: "You'll receive alerts as you approach your limit. If you exceed it, requests will still work but at a reduced rate. You can upgrade your plan to increase limits.",
  },
  {
    q: "Do you offer a free trial for paid plans?",
    a: "Yes, both Starter and Pro plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "How does billing work for teams?",
    a: "Team plans are billed per workspace. The Pro plan includes 5 seats, and additional seats can be added for $15/seat/month.",
  },
  {
    q: "Can I get a refund?",
    a: "We offer a 30-day money-back guarantee on all paid plans. Contact our support team for assistance.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground sm:text-5xl text-balance">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  !annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all flex items-center gap-2",
                  annual ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Annual
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">Save 20%</Badge>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-24">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-2xl border p-8 flex flex-col",
                  tier.popular
                    ? "border-primary bg-primary/[0.02] shadow-lg scale-[1.02]"
                    : "border-border bg-card"
                )}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                    Most Popular
                  </Badge>
                )}

                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.tagline}</p>

                <div className="mt-6 mb-6">
                  {tier.price.monthly !== null ? (
                    <>
                      <span className="text-4xl font-bold text-foreground">
                        ${annual ? tier.price.annual : tier.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      {annual && tier.price.annual !== tier.price.monthly && tier.price.monthly > 0 && (
                        <p className="text-xs text-muted-foreground mt-1 line-through">
                          ${tier.price.monthly}/month
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-foreground">Custom</span>
                  )}
                </div>

                <ul className="flex flex-col gap-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {tier.limitations.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                      <Minus className="h-4 w-4 shrink-0 mt-0.5" />
                      {l}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-8 rounded-xl w-full",
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : ""
                  )}
                  variant={tier.popular ? "default" : "outline"}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Compare all features</h2>
            <div className="rounded-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-5 bg-muted/50">
                <div className="p-4 text-sm font-medium text-muted-foreground">Feature</div>
                {pricingTiers.map((tier) => (
                  <div key={tier.name} className={cn("p-4 text-sm font-semibold text-center", tier.popular && "bg-primary/5 text-primary")}>
                    {tier.name}
                  </div>
                ))}
              </div>

              {comparisonFeatures.map((group) => (
                <div key={group.category}>
                  <div className="grid grid-cols-5 bg-muted/30">
                    <div className="col-span-5 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {group.category}
                    </div>
                  </div>
                  {group.features.map((feature) => (
                    <div key={feature.name} className="grid grid-cols-5 border-t border-border">
                      <div className="p-4 text-sm text-muted-foreground">{feature.name}</div>
                      {feature.values.map((val, i) => (
                        <div key={i} className={cn("p-4 text-center text-sm", pricingTiers[i]?.popular && "bg-primary/[0.02]")}>
                          {val === true ? (
                            <Check className="h-4 w-4 text-primary mx-auto" />
                          ) : val === false ? (
                            <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                          ) : (
                            <span className="text-foreground">{val}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Frequently asked questions</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-medium text-foreground">{faq.q}</span>
                    <span className={cn(
                      "text-muted-foreground transition-transform duration-200 shrink-0 ml-4",
                      expandedFaq === i && "rotate-45"
                    )}>
                      +
                    </span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="rounded-2xl bg-muted/50 border border-border p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground">Need a custom solution?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Enterprise plans include dedicated support, custom contracts, SLAs, and on-premise deployment options.
            </p>
            <Button size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
              Talk to Sales
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
