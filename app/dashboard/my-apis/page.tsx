"use client"

import Link from "next/link"
import { Zap, ExternalLink, Key, ArrowUpRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { popularApis } from "@/lib/data"

const subscriptions = popularApis.slice(0, 6).map((api, i) => ({
  ...api,
  plan: i < 2 ? "Pro" : i < 4 ? "Starter" : "Free",
  usagePercent: Math.floor(Math.random() * 60 + 20),
  quotaUsed: Math.floor(Math.random() * 40000 + 5000),
  quotaTotal: i < 2 ? 500000 : i < 4 ? 50000 : 1000,
}))

export default function MyApisPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My APIs</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your active API subscriptions.</p>
        </div>
        <Link href="/marketplace">
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Zap className="h-3.5 w-3.5" />
            Browse More APIs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((api) => (
          <div key={api.id} className="rounded-xl border border-border bg-card p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{api.name}</h3>
                  <p className="text-xs text-muted-foreground">{api.provider}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {api.plan}
              </Badge>
            </div>

            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Usage this month</span>
                <span>{api.quotaUsed.toLocaleString()} / {api.quotaTotal.toLocaleString()}</span>
              </div>
              <Progress value={api.usagePercent} className="h-1.5" />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <Link href={`/apis/${api.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                  <BookOpen className="h-3 w-3" />
                  Docs
                </Button>
              </Link>
              <Link href="/dashboard/keys" className="flex-1">
                <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                  <Key className="h-3 w-3" />
                  Keys
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <ArrowUpRight className="h-3 w-3" />
                Upgrade
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
