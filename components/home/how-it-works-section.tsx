import { UserPlus, Grid3X3, Code2 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description: "Sign up in seconds with your email or social account. No credit card required to get started.",
  },
  {
    icon: Grid3X3,
    step: "02",
    title: "Choose Your APIs",
    description: "Browse our marketplace, test endpoints in the playground, and subscribe to the APIs you need.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Integrate & Deploy",
    description: "Copy ready-made code snippets, use our SDKs, and start making API calls in production.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3">How It Works</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Get started in three simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-border hidden md:block" />
              )}

              <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border shadow-sm">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step.replace("0", "")}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
