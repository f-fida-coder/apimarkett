"use client"

import { useState } from "react"
import Link from "next/link"
import { use } from "react"
import {
  Star, Users, Clock, Shield, ArrowLeft, Check, Copy, ExternalLink,
  Zap, Activity, Globe, ChevronRight, Play, BookOpen, CreditCard,
  MessageSquare, BarChart3, Code2, Lock, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { popularApis } from "@/lib/data"

const endpoints = [
  { method: "POST", path: "/v1/chat/completions", description: "Create a chat completion" },
  { method: "POST", path: "/v1/completions", description: "Create a text completion" },
  { method: "POST", path: "/v1/embeddings", description: "Create embeddings" },
  { method: "GET", path: "/v1/models", description: "List available models" },
  { method: "POST", path: "/v1/images/generations", description: "Generate images from text" },
  { method: "POST", path: "/v1/audio/transcriptions", description: "Transcribe audio to text" },
]

const reviews = [
  { user: "Alex M.", rating: 5, date: "2 weeks ago", comment: "Incredibly fast and reliable. The documentation is top-notch and the response quality keeps improving.", helpful: 24 },
  { user: "Priya S.", rating: 5, date: "1 month ago", comment: "Best AI API on the market. Integration took less than 30 minutes. The streaming support is fantastic.", helpful: 18 },
  { user: "James T.", rating: 4, date: "1 month ago", comment: "Great API overall. Only minor issue is occasional rate limiting during peak hours. Support was helpful in resolving.", helpful: 12 },
  { user: "Lisa K.", rating: 5, date: "2 months ago", comment: "We migrated our entire AI pipeline to this API. 60% cost reduction and better quality outputs. Highly recommended.", helpful: 31 },
]

const codeExample = `const response = await fetch(
  "https://api.apiflow.dev/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, world!" }
      ],
      temperature: 0.7,
    }),
  }
);

const data = await response.json();
console.log(data.choices[0].message.content);`

const sampleResponse = `{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1708900000,
  "model": "gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 9,
    "total_tokens": 29
  }
}`

export default function ApiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [copied, setCopied] = useState(false)
  const [activeEndpoint, setActiveEndpoint] = useState(0)

  const api = popularApis.find((a) => a.id === id) || popularApis[0]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/marketplace" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Marketplace
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{api.name}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-10">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/[0.08] shrink-0">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{api.name}</h1>
                  {api.featured && (
                    <Badge className="bg-primary/10 text-primary border-0">Featured</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">by {api.provider}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {api.rating} ({reviews.length} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {(api.users / 1000).toFixed(1)}k users
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-green-500" />
                    {api.uptime} uptime
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" size="lg" className="rounded-xl">
                <BookOpen className="h-4 w-4 mr-2" />
                View Docs
              </Button>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                Subscribe - Free
              </Button>
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
            {[
              { label: "Avg. Latency", value: api.latency, icon: Clock },
              { label: "Uptime", value: api.uptime, icon: Activity },
              { label: "Active Users", value: `${(api.users / 1000).toFixed(1)}k`, icon: Users },
              { label: "Security", value: "SOC 2", icon: Shield },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <metric.icon className="h-3.5 w-3.5" />
                  <span className="text-xs">{metric.label}</span>
                </div>
                <p className="text-lg font-semibold text-card-foreground">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto gap-8">
              {["Overview", "Documentation", "Pricing", "Reviews"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground px-0 pb-3"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About this API</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {api.description} This API provides state-of-the-art capabilities with enterprise-grade reliability, comprehensive documentation, and flexible pricing. Trusted by thousands of developers and businesses worldwide for production workloads.
                  </p>

                  <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
                    {[
                      "Streaming responses for real-time output",
                      "Function calling and tool use",
                      "Multi-modal input support",
                      "Fine-tuning capabilities",
                      "Batch processing support",
                      "Comprehensive error handling",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">Endpoints</h3>
                  <div className="rounded-xl border border-border overflow-hidden">
                    {endpoints.map((ep, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                      >
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono shrink-0 ${
                            ep.method === "GET"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-blue-200 bg-blue-50 text-blue-700"
                          }`}
                        >
                          {ep.method}
                        </Badge>
                        <code className="text-sm font-mono text-foreground">{ep.path}</code>
                        <span className="text-sm text-muted-foreground ml-auto hidden sm:inline">{ep.description}</span>
                      </div>
                    ))}
                  </div>

                  {/* Code Example */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Quick Start</h3>
                  <div className="rounded-xl border border-border bg-foreground overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border/10">
                      <span className="text-xs text-muted-foreground/60 font-mono">JavaScript</span>
                      <button
                        onClick={() => handleCopy(codeExample)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary-foreground/70 transition-colors"
                      >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto">
                      <code className="font-mono text-primary-foreground/80">{codeExample}</code>
                    </pre>
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                    <h3 className="font-semibold text-card-foreground mb-4">Quick Info</h3>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Category", value: api.category },
                        { label: "Authentication", value: "API Key" },
                        { label: "Protocol", value: "REST / HTTPS" },
                        { label: "Rate Limit", value: "1,000 req/min" },
                        { label: "Starting Price", value: api.pricing },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-card-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium text-card-foreground mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {api.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                      Get API Key
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="documentation" className="mt-8">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                {/* Docs Sidebar */}
                <div className="lg:col-span-1">
                  <nav className="sticky top-24">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Navigation</h3>
                    <div className="flex flex-col gap-1">
                      {["Getting Started", "Authentication", "Chat Completions", "Embeddings", "Models", "Error Codes"].map((item, i) => (
                        <button
                          key={item}
                          className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                            i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>

                {/* Docs Content */}
                <div className="lg:col-span-3">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This guide will walk you through making your first API call. You can be up and running in less than 5 minutes.
                  </p>

                  <div className="rounded-xl border border-border bg-muted/30 p-6 mb-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      All API requests require an API key passed in the Authorization header.
                    </p>
                    <div className="rounded-lg bg-foreground p-3">
                      <code className="text-sm font-mono text-primary-foreground/80">
                        {'Authorization: Bearer YOUR_API_KEY'}
                      </code>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">Sample Response</h3>
                  <div className="rounded-xl border border-border bg-foreground overflow-hidden">
                    <div className="px-4 py-2 border-b border-border/10">
                      <span className="text-xs text-muted-foreground/60 font-mono">200 OK</span>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto">
                      <code className="font-mono text-primary-foreground/80">{sampleResponse}</code>
                    </pre>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Error Codes</h3>
                  <div className="rounded-xl border border-border overflow-hidden">
                    {[
                      { code: "400", message: "Bad Request - Invalid parameters" },
                      { code: "401", message: "Unauthorized - Invalid API key" },
                      { code: "429", message: "Rate Limit Exceeded - Too many requests" },
                      { code: "500", message: "Internal Server Error - Try again later" },
                    ].map((err) => (
                      <div key={err.code} className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-b-0">
                        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 text-xs font-mono shrink-0">
                          {err.code}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{err.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { tier: "Free", price: "$0", period: "/month", calls: "1,000 calls/mo", features: ["Basic models", "5 req/min", "Community support"] },
                  { tier: "Pro", price: "$49", period: "/month", calls: "100,000 calls/mo", features: ["All models", "100 req/min", "Priority support", "Streaming", "Fine-tuning"], popular: true },
                  { tier: "Enterprise", price: "Custom", period: "", calls: "Unlimited", features: ["All models", "Custom rate limits", "Dedicated support", "SLA", "On-premise option"] },
                ].map((plan) => (
                  <div
                    key={plan.tier}
                    className={`rounded-2xl border p-8 ${
                      plan.popular
                        ? "border-primary bg-primary/[0.02] shadow-md relative"
                        : "border-border bg-card"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    <h3 className="text-lg font-semibold text-foreground">{plan.tier}</h3>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.calls}</p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-8 rounded-xl ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.tier === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Rating Overview */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="text-center mb-6">
                    <p className="text-5xl font-bold text-foreground">{api.rating}</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(api.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{reviews.length} reviews</p>
                  </div>

                  {/* Rating Bars */}
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = reviews.filter((r) => r.rating === stars).length
                    const pct = (count / reviews.length) * 100
                    return (
                      <div key={stars} className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground w-3">{stars}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {reviews.map((review, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {review.user.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{review.user}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <button className="hover:text-foreground transition-colors">Helpful ({review.helpful})</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
