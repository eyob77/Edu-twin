import { IconAlertTriangle, IconChecks, IconFileCheck, IconX } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const reviewQueue = [
  { id: "QZ-2401", type: "Quiz", title: "Quadratic Equations Challenge", owner: "Marta T.", flagged: false },
  { id: "AS-7812", type: "Assignment", title: "Newton Laws Lab Report", owner: "Daniel W.", flagged: true },
  { id: "AX-1130", type: "Assessment", title: "Photosynthesis Checkpoint", owner: "Saron M.", flagged: false },
]

export default function AdminContentReviewPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFileCheck className="size-5 text-blue-600" />
              Content review queue
            </CardTitle>
            <CardDescription>Approve or reject newly created teacher content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewQueue.map((item) => (
              <div key={item.id} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.type} • {item.id} • Created by {item.owner}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.flagged && (
                      <Badge className="bg-orange-50 text-orange-500">
                        <IconAlertTriangle className="size-4" />
                        Flagged
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">
                      <IconX className="size-4" />
                      Reject
                    </Button>
                    <Button size="sm">
                      <IconChecks className="size-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
