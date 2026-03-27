import { IconBell, IconLock, IconServer, IconShieldCog } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const settingsCards = [
  {
    title: "Security policy",
    description: "Enforce MFA for admins and session timeout rules.",
    icon: IconLock,
  },
  {
    title: "Platform notifications",
    description: "Configure maintenance and alert broadcasts.",
    icon: IconBell,
  },
  {
    title: "Infrastructure",
    description: "Monitor service health and failover strategy.",
    icon: IconServer,
  },
]

export default function AdminSystemSettingsPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShieldCog className="size-5 text-blue-600" />
              System settings
            </CardTitle>
            <CardDescription>Manage admin-level controls for the whole platform.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {settingsCards.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 inline-flex rounded-full bg-blue-50 p-2 text-blue-600">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  <Button className="mt-3" size="sm" variant="outline">Configure</Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
