import Link from "next/link"
import {
  Brain,
  CreditCard,
  BarChart3,
  MessageSquare,
  MapPin,
  Cloud,
  TrendingUp,
  Share2,
  Shield,
  HardDrive,
  ArrowRight,
  Gamepad2,
  BrainCircuit,
  Bot,
  Landmark,
  ShieldAlert,
} from "lucide-react"
import { apiCategories } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = {
  Brain,
  CreditCard,
  BarChart3,
  MessageSquare,
  MapPin,
  Cloud,
  TrendingUp,
  Share2,
  Shield,
  HardDrive,
  Gamepad2,
  BrainCircuit,
  Bot,
  Landmark,
  ShieldAlert,
}

export function CategoriesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-primary mb-3">Categories</p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Browse by category
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore APIs across every domain and use case.
            </p>
          </div>
          <Link href="/marketplace" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {apiCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Brain
            return (
              <Link
                key={cat.slug}
                href={`/marketplace?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-200 hover:shadow-md hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] group-hover:bg-primary/[0.12] transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{cat.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.count} APIs</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
