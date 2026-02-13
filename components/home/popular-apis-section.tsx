import Link from "next/link"
import { Star, Users, ArrowRight, Zap, Clock, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { popularApis } from "@/lib/data"

export function PopularApisSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-primary mb-3">Popular APIs</p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Most loved by developers
            </h2>
            <p className="mt-3 text-muted-foreground">
              Battle-tested APIs trusted by thousands of production applications.
            </p>
          </div>
          <Link href="/marketplace" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Browse all APIs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularApis.slice(0, 4).map((api) => (
            <Link
              key={api.id}
              href={`/apis/${api.id}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              {api.featured && (
                <Badge className="absolute top-4 right-4 bg-primary/10 text-primary border-0 text-xs">
                  Featured
                </Badge>
              )}

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.08] mb-4">
                <Zap className="h-5 w-5 text-primary" />
              </div>

              {/* Info */}
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {api.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{api.provider}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {api.description}
              </p>

              {/* Metrics */}
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {api.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {(api.users / 1000).toFixed(1)}k
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {api.latency}
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{api.pricing}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {popularApis.slice(4, 8).map((api) => (
            <Link
              key={api.id}
              href={`/apis/${api.id}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
                  {api.name}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {api.rating}
                  </span>
                  <span>{api.pricing}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
