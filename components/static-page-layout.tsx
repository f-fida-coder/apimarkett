import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type Section = {
  title: string
  content: string[]
}

type StaticPageLayoutProps = {
  title: string
  subtitle: string
  sections: Section[]
}

export function StaticPageLayout({ title, subtitle, sections }: StaticPageLayoutProps) {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="pt-28 pb-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
          </header>

          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
