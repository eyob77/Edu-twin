import { IconChecks, IconClock, IconShieldCheck, IconUsers } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUsers className="size-5 text-blue-600" />
              Total users
            </CardTitle>
            <CardDescription>Students, teachers, and admins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">2,184</p>
            <p className="text-sm text-slate-500">+78 in the last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconChecks className="size-5 text-emerald-600" />
              Active sessions
            </CardTitle>
            <CardDescription>Current signed-in users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">643</p>
            <p className="text-sm text-slate-500">Peak today: 911</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShieldCheck className="size-5 text-orange-500" />
              Security health
            </CardTitle>
            <CardDescription>System security monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">96%</p>
            <Progress value={96} className="h-2.5" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconClock className="size-5 text-blue-600" />
              Avg response
            </CardTitle>
            <CardDescription>Core API response time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">182 ms</p>
            <p className="text-sm text-slate-500">-12 ms from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin overview</CardTitle>
            <CardDescription>
              Use the admin sidebar to manage users, review created content, and update system-level settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                User management is available in the Users section.
              </div>
              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-3">
                Content approvals and flags are grouped in Content Review.
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                Platform controls are available in System Settings.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
