"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Key, BarChart3, CreditCard, Settings,
  Zap, ChevronLeft, ChevronRight, Menu, X, Package, MessageCircle, Send, Mail
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My APIs", href: "/dashboard/my-apis", icon: Package },
  { label: "API Keys", href: "/dashboard/keys", icon: Key },
  { label: "Usage & Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">APIFlow</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="mx-auto">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <div className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? link.label : undefined}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-border">
          {!collapsed && (
            <div className="mb-3 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="text-foreground font-medium mb-2">Support</p>
              <a href="https://wa.me/447402440753" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors mb-1">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a href="https://t.me/Apiflowagency" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors mb-1">
                <Send className="h-3.5 w-3.5" />
                Telegram
              </a>
              <a href="mailto:apiflowagency@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5" />
                Gmail
              </a>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 mx-auto" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 z-50 h-14 items-center justify-between border-b border-border bg-card px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">APIFlow</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-14 bottom-0 w-60 bg-card border-r border-border" onClick={(e) => e.stopPropagation()}>
            <nav className="px-3 py-4">
              <div className="flex flex-col gap-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <link.icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        <div className="p-6 md:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
