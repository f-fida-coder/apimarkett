import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to start building?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80 leading-relaxed">
              Join 50,000+ developers who build faster with APIFlow. Start free and scale as you grow.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 rounded-xl px-6"
                >
                  Start Building Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl px-6"
                >
                  Explore APIs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
