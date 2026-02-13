"use client"

import { Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usageData, apiByUsage, recentLogs } from "@/lib/data"
import { cn } from "@/lib/utils"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts"

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
  "hsl(270, 76%, 53%)",
  "hsl(220, 13%, 71%)",
]

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usage & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your API usage, performance, and costs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-3.5 w-3.5" />
            Last 12 months
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* API Calls Over Time */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-card-foreground mb-1">API Calls Over Time</h3>
          <p className="text-xs text-muted-foreground mb-6">Monthly API call volume</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="calls" stroke="hsl(221, 83%, 53%)" strokeWidth={2} fill="url(#callsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Rate */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-card-foreground mb-1">Error Rate</h3>
          <p className="text-xs text-muted-foreground mb-6">Monthly error count</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="errors" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Usage by API + Logs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        {/* Pie Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-card-foreground mb-1">Usage by API</h3>
          <p className="text-xs text-muted-foreground mb-6">Distribution of API calls</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={apiByUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="calls"
                >
                  {apiByUsage.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {apiByUsage.map((api, i) => (
              <div key={api.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground text-xs">{api.name}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{api.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Logs */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-6 pb-0">
            <h3 className="font-semibold text-card-foreground mb-1">Request Logs</h3>
            <p className="text-xs text-muted-foreground">Recent API requests and responses</p>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Time</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">API</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Endpoint</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Latency</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {log.timestamp.split(" ")[1]}
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground whitespace-nowrap">{log.api}</td>
                    <td className="px-6 py-3 text-xs font-mono text-muted-foreground">{log.endpoint}</td>
                    <td className="px-6 py-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          log.status < 300
                            ? "border-green-200 bg-green-50 text-green-700"
                            : log.status < 500
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        )}
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{log.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
