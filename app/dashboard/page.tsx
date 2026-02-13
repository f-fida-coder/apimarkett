"use client"

import Link from "next/link"
import {
  Activity, TrendingUp, CreditCard, Clock, Zap, ArrowRight,
  ArrowUpRight, BarChart3, Key, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { dashboardStats, recentLogs, popularApis } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts"

const miniChartData = [
  { name: "W1", value: 12400 },
  { name: "W2", value: 18300 },
  { name: "W3", value: 15200 },
  { name: "W4", value: 21400 },
  { name: "W5", value: 24100 },
  { name: "W6", value: 19800 },
  { name: "W7", value: 28700 },
]

const statCards = [
  {
    label: "Total API Calls",
    value: dashboardStats.totalCalls.toLocaleString(),
    change: "+12.4%",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Active APIs",
    value: dashboardStats.activeApis.toString(),
    change: "+2",
    trend: "up",
    icon: Zap,
  },
  {
    label: "Current Spend",
    value: `$${dashboardStats.currentSpend.toFixed(2)}`,
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
  },
  {
    label: "Avg. Latency",
    value: `${dashboardStats.avgLatency}ms`,
    change: "-5.1%",
    trend: "down",
    icon: Clock,
  },
]

export default function DashboardOverview() {
  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back. Here is your API usage overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/marketplace">
            <Button variant="outline" size="sm" className="gap-2">
              <Zap className="h-3.5 w-3.5" />
              Browse APIs
            </Button>
          </Link>
          <Link href="/dashboard/keys">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Key className="h-3.5 w-3.5" />
              Generate Key
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            <p className={cn(
              "text-xs mt-1 flex items-center gap-1",
              stat.trend === "up" && stat.label !== "Avg. Latency" ? "text-green-600" : stat.label === "Avg. Latency" ? "text-green-600" : "text-muted-foreground"
            )}>
              <ArrowUpRight className="h-3 w-3" />
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Chart & Subscriptions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-card-foreground">API Calls This Month</h3>
            <span className="text-xs text-muted-foreground">Last 7 weeks</span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miniChartData}>
                <defs>
                  <linearGradient id="callsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(221, 83%, 53%)"
                  strokeWidth={2}
                  fill="url(#callsFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active APIs */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Active APIs</h3>
            <Link href="/dashboard/my-apis" className="text-xs text-primary hover:text-primary/80 transition-colors">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {popularApis.slice(0, 4).map((api) => (
              <div key={api.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.08] shrink-0">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{api.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={Math.random() * 70 + 20} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground shrink-0">{Math.floor(Math.random() * 70 + 20)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 className="font-semibold text-card-foreground">Recent Activity</h3>
          <Link href="/dashboard/analytics" className="text-xs text-primary hover:text-primary/80 transition-colors">
            View all logs
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Timestamp</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">API</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Endpoint</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Latency</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.slice(0, 5).map((log, i) => (
                <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 text-sm text-muted-foreground font-mono text-xs">{log.timestamp}</td>
                  <td className="px-6 py-3 text-sm text-foreground">{log.api}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground font-mono text-xs">{log.endpoint}</td>
                  <td className="px-6 py-3">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      log.status < 300
                        ? "bg-green-50 text-green-700"
                        : log.status < 500
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    )}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
