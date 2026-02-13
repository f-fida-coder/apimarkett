"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

const codeExamples: Record<string, string> = {
  JavaScript: `const response = await fetch(
  "https://api.apiflow.dev/v1/ai/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      prompt: "Explain quantum computing",
      max_tokens: 256,
    }),
  }
);

const data = await response.json();
console.log(data.choices[0].text);`,
  Python: `import requests

response = requests.post(
    "https://api.apiflow.dev/v1/ai/completions",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "model": "gpt-4",
        "prompt": "Explain quantum computing",
        "max_tokens": 256,
    },
)

data = response.json()
print(data["choices"][0]["text"])`,
  cURL: `curl -X POST https://api.apiflow.dev/v1/ai/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "prompt": "Explain quantum computing",
    "max_tokens": 256
  }'`,
}

const languages = Object.keys(codeExamples)

export function CodePreviewSection() {
  const [activeTab, setActiveTab] = useState("JavaScript")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left Text */}
          <div>
            <p className="text-sm font-medium text-primary mb-3">Integration</p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Integrate in minutes, not days
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              Copy-paste ready code snippets in your favorite language. Our SDKs handle authentication, retries, and error handling so you can focus on building your product.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {["Auto-generated SDKs in 8+ languages", "Built-in retry logic and error handling", "Type-safe clients with full IntelliSense"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Code Block */}
          <div className="rounded-2xl border border-border bg-foreground overflow-hidden shadow-xl">
            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-border/10 px-4 py-2">
              <div className="flex gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      activeTab === lang
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground/70 hover:text-primary-foreground/70"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary-foreground/70 transition-colors"
                aria-label="Copy code"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Code Content */}
            <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
              <code className="font-mono text-primary-foreground/80">{codeExamples[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
