"use client"

import { useState } from "react"
import { Key, Plus, Copy, Check, RotateCcw, Trash2, Eye, EyeOff, Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiKeys } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ApiKeysPage() {
  const [copied, setCopied] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Keys</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your API keys for authentication.</p>
        </div>
        <Button
          size="sm"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Generate New Key
        </Button>
      </div>

      {/* Security Notice */}
      <div className="rounded-xl border border-border bg-primary/[0.03] p-4 mb-6 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Keep your API keys secure</p>
          <p className="text-xs text-muted-foreground mt-1">
            Never share your API keys in public repositories or client-side code. Use environment variables to store keys securely.
          </p>
        </div>
      </div>

      {/* Keys Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Key</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">Created</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Last Used</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{key.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm font-mono text-muted-foreground">{key.prefix}</code>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">{key.created}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">{key.lastUsed}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      key.status === "active"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    )}
                  >
                    {key.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleCopy(key.id, key.prefix)}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                      title="Copy key"
                      aria-label="Copy key"
                    >
                      {copied === key.id ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    {key.status === "active" && (
                      <>
                        <button
                          className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                          title="Regenerate"
                          aria-label="Regenerate key"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="p-1.5 text-muted-foreground hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="Revoke"
                          aria-label="Revoke key"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Key Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-foreground">Generate New API Key</h2>
            <p className="text-sm text-muted-foreground mt-1">Create a new API key for your application.</p>

            <div className="mt-6">
              <label htmlFor="keyName" className="text-sm font-medium text-foreground">Key Name</label>
              <input
                id="keyName"
                type="text"
                placeholder="e.g., Production, Staging"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setShowModal(false)}>
                Generate Key
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
