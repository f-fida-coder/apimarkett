import Link from "next/link"
import { Mail, Send, Zap } from "lucide-react"

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.1 4.9A9.9 9.9 0 0 0 3.5 16.7L2 22l5.5-1.5a9.9 9.9 0 0 0 4.7 1.2h.1A9.9 9.9 0 0 0 19.1 4.9Zm-6.8 15.1h-.1a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.3.9.9-3.2-.2-.3a8.2 8.2 0 1 1 7.2 3.9Zm4.5-6.2c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.8c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.5-1.2-.6-1.6-.1-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.7-.8 1.7s.8 2 1 2.1c.1.1 1.6 2.5 3.8 3.5.5.2.9.4 1.2.5.5.1 1 .1 1.3.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
    </svg>
  )
}

const footerLinks = {
  Product: [
    { label: "API Marketplace", href: "/marketplace" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "API Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Getting Started", href: "/docs" },
    { label: "Tutorials", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
    { label: "SDKs", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "SLA", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">APIFlow</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The premier marketplace for premium APIs. Build faster, scale smarter.
            </p>
            <div className="mt-5 space-y-2 text-xs text-muted-foreground">
              <a
                href="tel:+923464901531"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp: +92 346 4901531
              </a>
              <a
                href="mailto:apiflowagency@gmail.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                Gmail: apiflowagency@gmail.com
              </a>
              <a
                href="mailto:numericfida786@gmail.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                Gmail: numericfida786@gmail.com
              </a>
              <a
                href="https://t.me/Apiflowagency"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Telegram: t.me/Apiflowagency
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 APIFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/923464901531"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://wa.me/qr/CWSD3YRP4STCO1"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Add Me on WhatsApp
            </a>
            <a
              href="https://t.me/Apiflowagency"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Telegram
            </a>
            <a
              href="mailto:apiflowagency@gmail.com"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Gmail
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
