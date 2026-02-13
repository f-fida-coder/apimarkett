"use client"

import { useState } from "react"
import { User, Lock, Bell, Code2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    usageAlerts: true,
    weeklyReport: true,
    newApis: false,
    maintenance: true,
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto gap-6 mb-8">
          {[
            { value: "profile", label: "Profile", icon: User },
            { value: "security", label: "Security", icon: Lock },
            { value: "notifications", label: "Notifications", icon: Bell },
            { value: "preferences", label: "Preferences", icon: Code2 },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground px-0 pb-3 gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-semibold text-card-foreground mb-6">Profile Information</h3>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  JD
                </div>
                <div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-3.5 w-3.5" />
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    defaultValue="John"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    defaultValue="Doe"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">Company</label>
                  <input
                    id="company"
                    type="text"
                    defaultValue="Acme Inc."
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h3 className="font-semibold text-card-foreground mb-4">Change Password</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="currentPassword" className="text-sm font-medium text-foreground">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="text-sm font-medium text-foreground">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Update Password
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-card-foreground">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground mb-6">Email Notifications</h3>
              <div className="flex flex-col gap-6">
                {[
                  { key: "usageAlerts" as const, label: "Usage Alerts", desc: "Get notified when approaching API call limits." },
                  { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive a weekly summary of your API usage." },
                  { key: "newApis" as const, label: "New APIs", desc: "Get notified about new APIs in categories you follow." },
                  { key: "maintenance" as const, label: "Maintenance Updates", desc: "Receive notifications about scheduled maintenance." },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-foreground">{item.label}</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground mb-6">API Preferences</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="defaultLang" className="text-sm font-medium text-foreground">Default Code Language</label>
                  <select
                    id="defaultLang"
                    defaultValue="javascript"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                    <option value="go">Go</option>
                    <option value="curl">cURL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="text-sm font-medium text-foreground">Timezone</label>
                  <select
                    id="timezone"
                    defaultValue="utc"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="utc">UTC</option>
                    <option value="est">Eastern Time (EST)</option>
                    <option value="pst">Pacific Time (PST)</option>
                    <option value="cet">Central European (CET)</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
