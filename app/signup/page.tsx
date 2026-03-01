import Link from "next/link"
import { Mail, MessageCircle, Send, UserPlus } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-28 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                  <p className="text-sm text-muted-foreground">Start with free API calls and scale as you grow.</p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
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
                    placeholder="Create password"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Create Account
                </Button>
              </form>

              <p className="mt-4 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </section>

            <aside className="rounded-2xl border border-border bg-muted/30 p-7 sm:p-9">
              <h2 className="text-xl font-semibold text-foreground">Account setup support</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact APIFlow if you want onboarding assistance or a custom setup.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <a href="https://wa.me/923464901531" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: +92 346 4901531
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
