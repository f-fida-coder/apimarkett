"use client"

import { CreditCard, Download, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const invoices = [
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$156.42", status: "pending" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$142.87", status: "paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$138.20", status: "paid" },
  { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$121.50", status: "paid" },
  { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$99.99", status: "paid" },
]

export default function BillingPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing & Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your subscription, payment methods, and invoices.</p>
        </div>
      </div>

      {/* Current Plan */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-card-foreground">Current Plan</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Pro Plan - Billed Monthly</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-0">Active</Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-lg font-semibold text-foreground">$99/month</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Renewal Date</p>
              <p className="text-lg font-semibold text-foreground">Mar 1, 2026</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">API Calls Used</p>
              <p className="text-lg font-semibold text-foreground">247,893 / 500,000</p>
            </div>
          </div>

          <Progress value={49.6} className="h-2 mt-4" />
          <p className="text-xs text-muted-foreground mt-2">49.6% of monthly quota used</p>

          <div className="flex items-center gap-3 mt-6">
            <Button variant="outline" size="sm">Change Plan</Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel Subscription</Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-card-foreground mb-4">Payment Method</h3>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3 mb-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2027</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">Update Payment Method</Button>
        </div>
      </div>

      {/* Usage Estimate */}
      <div className="rounded-xl border border-border bg-primary/[0.03] p-5 mb-6 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Estimated current month charges: $156.42</p>
          <p className="text-xs text-muted-foreground mt-1">
            Based on your current usage pattern. Final charges will be calculated at the end of the billing cycle.
          </p>
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="font-semibold text-card-foreground">Invoice History</h3>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Invoice</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{inv.id}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{inv.date}</td>
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{inv.amount}</td>
                  <td className="px-6 py-3">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        inv.status === "paid"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {inv.status === "paid" ? (
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Paid</span>
                      ) : (
                        "Pending"
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
