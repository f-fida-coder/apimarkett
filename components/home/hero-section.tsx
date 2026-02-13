"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, Sparkles, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/[0.08] px-4 py-1.5 text-sm font-medium text-primary mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          Trusted by 50,000+ developers worldwide
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
          Build Faster with{" "}
          <span className="text-primary">1,000+ Premium APIs</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
          From AI to payments, access enterprise-grade APIs with simple pricing and world-class documentation. One platform, infinite possibilities.
        </p>

        {/* Search Bar */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search APIs... (e.g., payments, AI, maps)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-32 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Link href={`/marketplace${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
              <Button
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              >
                Search
              </Button>
            </Link>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/marketplace">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl px-6">
              Browse APIs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="gap-2 rounded-xl px-6">
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Enterprise-grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span>99.99% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}
