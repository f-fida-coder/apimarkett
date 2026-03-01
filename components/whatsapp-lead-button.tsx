"use client"

import { useMemo, useState } from "react"
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const WHATSAPP_CHAT_URL = "https://wa.me/447402440753"
const WHATSAPP_ADD_CONTACT_URL = "https://wa.me/qr/CWSD3YRP4STCO1"

type CountryOption = {
  iso: string
  name: string
  dialCode: string
}

type FormState = {
  fullName: string
  email: string
  countryIso: string
  country: string
  dialingCode: string
  phoneNumber: string
  company: string
  role: string
  monthlyBudget: string
  timeline: string
  projectUseCase: string
}

function buildCountryOptions(): CountryOption[] {
  const displayNames =
    typeof Intl !== "undefined" && typeof Intl.DisplayNames !== "undefined"
      ? new Intl.DisplayNames(["en"], { type: "region" })
      : null

  return getCountries()
    .map((iso) => {
      const name = displayNames?.of(iso) || iso
      const dialCode = `+${getCountryCallingCode(iso)}`
      return { iso, name, dialCode }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

const COUNTRY_OPTIONS = buildCountryOptions()
const DEFAULT_COUNTRY = COUNTRY_OPTIONS.find((item) => item.iso === "GB") || COUNTRY_OPTIONS[0]

const DIAL_CODE_OPTIONS = Array.from(
  new Map(
    COUNTRY_OPTIONS.map((country) => [country.dialCode, country])
  ).values()
).sort((a, b) => a.dialCode.localeCompare(b.dialCode))

export function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.1 4.9A9.9 9.9 0 0 0 3.5 16.7L2 22l5.5-1.5a9.9 9.9 0 0 0 4.7 1.2h.1A9.9 9.9 0 0 0 19.1 4.9Zm-6.8 15.1h-.1a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.3.9.9-3.2-.2-.3a8.2 8.2 0 1 1 7.2 3.9Zm4.5-6.2c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.8c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3.2-.3c.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4 0-.1-.5-1.2-.6-1.6-.1-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.7-.8 1.7s.8 2 1 2.1c.1.1 1.6 2.5 3.8 3.5.5.2.9.4 1.2.5.5.1 1 .1 1.3.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
    </svg>
  )
}

type WhatsAppLeadButtonProps = {
  label: string
  intent: string
  context?: string
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WhatsAppLeadButton({
  label,
  intent,
  context,
  className,
  variant = "default",
  size = "default",
}: WhatsAppLeadButtonProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    countryIso: DEFAULT_COUNTRY.iso,
    country: DEFAULT_COUNTRY.name,
    dialingCode: DEFAULT_COUNTRY.dialCode,
    phoneNumber: "",
    company: "",
    role: "",
    monthlyBudget: "",
    timeline: "",
    projectUseCase: "",
  })

  const fieldErrors = useMemo(() => {
    const errors: Partial<Record<keyof FormState, string>> = {}

    if (form.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters."
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address."
    }

    if (!form.countryIso) {
      errors.countryIso = "Please select a country."
    }

    if (!/^\+\d{1,4}$/.test(form.dialingCode)) {
      errors.dialingCode = "Country code must be like +44 or +92."
    }

    if (!/^[0-9]{6,15}$/.test(form.phoneNumber.trim())) {
      errors.phoneNumber = "Phone number must be 6-15 digits."
    } else {
      const fullPhone = `${form.dialingCode}${form.phoneNumber.trim()}`
      if (!isValidPhoneNumber(fullPhone)) {
        errors.phoneNumber = "Phone number is not valid for this country code."
      }
    }

    if (form.projectUseCase.trim().length < 10) {
      errors.projectUseCase = "Please provide at least 10 characters for use case."
    }

    return errors
  }, [form])

  const hasErrors = Object.keys(fieldErrors).length > 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (hasErrors) {
      setError("Please fix form validation errors before continuing.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          context: context || "",
          ...form,
          sourcePage: window.location.pathname,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save lead")
      }

      const result = (await response.json()) as { id?: string }

      const message = [
        "Hello APIFlow, I want to buy/get API access.",
        `Intent: ${intent}`,
        context ? `API/Plan: ${context}` : null,
        `Lead ID: ${result.id || "N/A"}`,
        `Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Country: ${form.country}`,
        `Country ISO: ${form.countryIso}`,
        `Phone: ${form.dialingCode} ${form.phoneNumber}`,
        form.company ? `Company: ${form.company}` : null,
        form.role ? `Role: ${form.role}` : null,
        form.monthlyBudget ? `Monthly Budget: ${form.monthlyBudget}` : null,
        form.timeline ? `Timeline: ${form.timeline}` : null,
        `Project/Use case: ${form.projectUseCase}`,
        "",
        "Please guide me with next steps.",
      ]
        .filter(Boolean)
        .join("\n")

      const url = `${WHATSAPP_CHAT_URL}?text=${encodeURIComponent(message)}`
      window.open(url, "_blank", "noopener,noreferrer")
      setOpen(false)
    } catch {
      setError("We could not save your form right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className={className} variant={variant} size={size}>
          <WhatsAppIcon className="h-4 w-4" />
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fill Form Before WhatsApp Contact</DialogTitle>
          <DialogDescription>
            Share full details. We save this lead and then open WhatsApp for direct contact.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="wa-full-name" className="text-sm font-medium text-foreground">Full Name</label>
            <input
              id="wa-full-name"
              required
              minLength={2}
              maxLength={80}
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter your full name"
            />
            {fieldErrors.fullName && <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="wa-email" className="text-sm font-medium text-foreground">Email</label>
            <input
              id="wa-email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="you@example.com"
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="wa-country" className="text-sm font-medium text-foreground">Country</label>
            <select
              id="wa-country"
              required
              value={form.countryIso}
              onChange={(e) => {
                const selected = COUNTRY_OPTIONS.find((country) => country.iso === e.target.value)
                if (!selected) return
                setForm((prev) => ({
                  ...prev,
                  countryIso: selected.iso,
                  country: selected.name,
                  dialingCode: selected.dialCode,
                }))
              }}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country.iso} value={country.iso}>
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
            {fieldErrors.countryIso && <p className="mt-1 text-xs text-red-600">{fieldErrors.countryIso}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="wa-dial-code" className="text-sm font-medium text-foreground">Country Code</label>
              <select
                id="wa-dial-code"
                required
                value={form.dialingCode}
                onChange={(e) => setForm((prev) => ({ ...prev, dialingCode: e.target.value }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {DIAL_CODE_OPTIONS.map((item) => (
                  <option key={item.dialCode} value={item.dialCode}>
                    {item.dialCode}
                  </option>
                ))}
              </select>
              {fieldErrors.dialingCode && <p className="mt-1 text-xs text-red-600">{fieldErrors.dialingCode}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="wa-phone" className="text-sm font-medium text-foreground">Phone Number</label>
              <input
                id="wa-phone"
                required
                inputMode="numeric"
                pattern="[0-9]{6,15}"
                value={form.phoneNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value.replace(/\D/g, "") }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="7402440753"
              />
              {fieldErrors.phoneNumber && <p className="mt-1 text-xs text-red-600">{fieldErrors.phoneNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="wa-company" className="text-sm font-medium text-foreground">Company</label>
              <input
                id="wa-company"
                maxLength={120}
                value={form.company}
                onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Your company name"
              />
            </div>
            <div>
              <label htmlFor="wa-role" className="text-sm font-medium text-foreground">Role</label>
              <input
                id="wa-role"
                maxLength={120}
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Founder, Developer, CTO"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="wa-budget" className="text-sm font-medium text-foreground">Monthly Budget</label>
              <select
                id="wa-budget"
                value={form.monthlyBudget}
                onChange={(e) => setForm((prev) => ({ ...prev, monthlyBudget: e.target.value }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select budget</option>
                <option value="Under $100">Under $100</option>
                <option value="$100 - $500">$100 - $500</option>
                <option value="$500 - $2,000">$500 - $2,000</option>
                <option value="$2,000+">$2,000+</option>
              </select>
            </div>
            <div>
              <label htmlFor="wa-timeline" className="text-sm font-medium text-foreground">Timeline</label>
              <select
                id="wa-timeline"
                value={form.timeline}
                onChange={(e) => setForm((prev) => ({ ...prev, timeline: e.target.value }))}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select timeline</option>
                <option value="Immediately">Immediately</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Planning stage">Planning stage</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="wa-project" className="text-sm font-medium text-foreground">Project / Use case</label>
            <textarea
              id="wa-project"
              required
              minLength={10}
              maxLength={1200}
              rows={3}
              value={form.projectUseCase}
              onChange={(e) => setForm((prev) => ({ ...prev, projectUseCase: e.target.value }))}
              className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Describe what you need from the API"
            />
            {fieldErrors.projectUseCase && <p className="mt-1 text-xs text-red-600">{fieldErrors.projectUseCase}</p>}
          </div>

          <a
            href={WHATSAPP_ADD_CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            Add me as a contact on WhatsApp
          </a>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <WhatsAppIcon className="h-4 w-4" />}
              {submitting ? "Saving..." : "Save & Continue to WhatsApp"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
