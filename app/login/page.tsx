import Link from "next/link"
import { LockKeyhole, Mail, MessageCircle, Send } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-28 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <LockKeyhole className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
                  <p className="text-sm text-muted-foreground">Access your APIFlow dashboard and API keys.</p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
              </form>

              <p className="mt-4 text-sm text-muted-foreground">
                No account yet?{" "}
                <Link href="/signup" className="text-primary hover:text-primary/80">
                  Create one
                </Link>
              </p>
            </section>

            <aside className="rounded-2xl border border-border bg-muted/30 p-7 sm:p-9">
              <h2 className="text-xl font-semibold text-foreground">Need instant help?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                If login or account access is blocked, contact APIFlow support directly.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <a href="https://wa.me/447402440753" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: +44 7402 440753
                </a>
                <a href="https://wa.me/qr/CWSD3YRP4STCO1" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Add me as a contact on WhatsApp
                </a>
                <a href="https://t.me/Apiflowagency" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Send className="h-4 w-4" />
                  Telegram: t.me/Apiflowagency
                </a>
                <a href="mailto:apiflowagency@gmail.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  Gmail: apiflowagency@gmail.com
                </a>
                <a href="mailto:numericfida786@gmail.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  Gmail: numericfida786@gmail.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
