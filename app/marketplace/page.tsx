"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search, Filter, Grid3X3, List, Star, Users, Clock, ArrowRight,
  Zap, ChevronDown, X, SlidersHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { popularApis, apiCategories } from "@/lib/data"
import { cn } from "@/lib/utils"

const pricingFilters = ["All", "Free", "Freemium", "Paid"]
const sortOptions = ["Popularity", "Rating", "Newest", "Price: Low to High"]

// Extend API list for the browse page
const allApis = [
  ...popularApis,
  {
    id: "weather-api",
    name: "OpenWeather API",
    provider: "OpenWeather",
    description: "Current weather, forecasts, and historical data for any location worldwide.",
    category: "Weather",
    rating: 4.4,
    users: 34200,
    latency: "67ms",
    uptime: "99.95%",
    pricing: "Free tier available",
    tags: ["Weather", "Forecast", "Climate"],
    featured: false,
  },
  {
    id: "auth0-identity",
    name: "Auth0 Identity",
    provider: "Okta",
    description: "Universal authentication and authorization platform for web, mobile, and IoT.",
    category: "Authentication",
    rating: 4.7,
    users: 27800,
    latency: "110ms",
    uptime: "99.99%",
    pricing: "From $23/month",
    tags: ["Auth", "SSO", "Identity"],
    featured: true,
  },
  {
    id: "algolia-search",
    name: "Algolia Search",
    provider: "Algolia",
    description: "Lightning-fast, typo-tolerant search API with AI-powered relevance.",
    category: "Data & Analytics",
    rating: 4.8,
    users: 19500,
    latency: "12ms",
    uptime: "99.99%",
    pricing: "Free tier available",
    tags: ["Search", "AI", "Indexing"],
    featured: false,
  },
  {
    id: "deepl-translate",
    name: "DeepL Translate",
    provider: "DeepL",
    description: "Neural machine translation API supporting 30+ languages with exceptional quality.",
    category: "AI & Machine Learning",
    rating: 4.9,
    users: 22100,
    latency: "190ms",
    uptime: "99.97%",
    pricing: "From $0.02/char",
    tags: ["Translation", "NLP", "AI"],
    featured: true,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPricing, setSelectedPricing] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Popularity")
  const [showFilters, setShowFilters] = useState(false)

  const filteredApis = useMemo(() => {
    let result = allApis

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (api) =>
          api.name.toLowerCase().includes(q) ||
          api.description.toLowerCase().includes(q) ||
          api.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (selectedCategory) {
      result = result.filter((api) => api.category === selectedCategory)
    }

    if (selectedPricing !== "All") {
      if (selectedPricing === "Free") {
        result = result.filter((api) => api.pricing.toLowerCase().includes("free"))
      } else if (selectedPricing === "Paid") {
        result = result.filter((api) => !api.pricing.toLowerCase().includes("free"))
      }
    }

    return result
  }, [searchQuery, selectedCategory, selectedPricing])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedPricing("All")
  }

  const hasFilters = searchQuery || selectedCategory || selectedPricing !== "All"

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">API Marketplace</h1>
            <p className="mt-2 text-muted-foreground">
              Discover and integrate {allApis.length}+ premium APIs for your applications.
            </p>
          </div>

          {/* Search & Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search APIs by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 sm:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn("p-2 transition-colors", viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={cn(
              "w-60 shrink-0 hidden sm:block",
              showFilters && "!block fixed inset-0 z-40 bg-background p-4 sm:relative sm:inset-auto sm:z-auto sm:bg-transparent sm:p-0"
            )}>
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Filters</h3>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-primary hover:text-primary/80">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Category</h4>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                        !selectedCategory ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      All Categories
                    </button>
                    {apiCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={cn(
                          "text-left text-sm px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between",
                          selectedCategory === cat.name ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Pricing</h4>
                  <div className="flex flex-col gap-1">
                    {pricingFilters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedPricing(filter)}
                        className={cn(
                          "text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                          selectedPricing === filter ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredApis.length} API{filteredApis.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* Active Filters */}
              {hasFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCategory(null)}>
                      {selectedCategory}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {selectedPricing !== "All" && (
                    <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedPricing("All")}>
                      {selectedPricing}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredApis.map((api) => (
                    <Link
                      key={api.id}
                      href={`/apis/${api.id}`}
                      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08]">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        {api.featured && (
                          <Badge className="bg-primary/10 text-primary border-0 text-xs">Featured</Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {api.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{api.provider}</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {api.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {api.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

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

                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">{api.pricing}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="flex flex-col gap-3">
                  {filteredApis.map((api) => (
                    <Link
                      key={api.id}
                      href={`/apis/${api.id}`}
                      className="group flex items-center gap-5 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/20"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08]">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                            {api.name}
                          </h3>
                          {api.featured && (
                            <Badge className="bg-primary/10 text-primary border-0 text-xs">Featured</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{api.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {api.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {(api.users / 1000).toFixed(1)}k users
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {api.latency}
                          </span>
                          <span>{api.category}</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                        <span className="text-sm font-medium text-foreground">{api.pricing}</span>
                        <span className="text-xs text-muted-foreground">{api.uptime} uptime</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {filteredApis.length === 0 && (
                <div className="text-center py-20">
                  <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground">No APIs found</h3>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
