import { Zap, Shield, BarChart3, CreditCard, BookOpen, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant API Access",
    description: "Get up and running in minutes with our streamlined onboarding. No complex setup required.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption, IP whitelisting, and advanced access controls.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor API usage, response times, and error rates with our comprehensive dashboard.",
  },
  {
    icon: CreditCard,
    title: "Pay-as-you-go",
    description: "Only pay for what you use. No upfront commitments with transparent per-request pricing.",
  },
  {
    icon: BookOpen,
    title: "World-class Docs",
    description: "Interactive documentation with code examples in 8+ languages and live API playground.",
  },
  {
    icon: Clock,
    title: "99.99% Uptime SLA",
    description: "Built on globally distributed infrastructure with automatic failover and redundancy.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">Why APIFlow</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Everything you need to build at scale
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            One platform to discover, integrate, and manage all the APIs your applications need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08]">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
