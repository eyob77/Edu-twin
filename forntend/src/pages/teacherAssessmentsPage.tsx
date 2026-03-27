import { IconCalendarEvent, IconChecklist, IconFilePlus, IconSend } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialAssessments = [
  {
    title: "Quarter 2 Mastery Check",
    target: "10A, 10B",
    dueDate: "Mar 29, 2026",
    status: "Draft",
    responses: "0 / 61",
  },
  {
    title: "Physics Concept Assessment",
    target: "10B",
    dueDate: "Mar 25, 2026",
    status: "Published",
    responses: "21 / 29",
  },
  {
    title: "STEM Critical Thinking Evaluation",
    target: "11S",
    dueDate: "Apr 01, 2026",
    status: "Scheduled",
    responses: "0 / 27",
  },
]

export default function TeacherAssessmentsPage() {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState(initialAssessments)

  const publishSelected = () => {
    setAssessments((prev) =>
      prev.map((item) =>
        item.status === "Draft" || item.status === "Scheduled"
          ? { ...item, status: "Published" }
          : item
      )
    )
    toast.success("Assessments published")
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment publishing workspace</CardTitle>
            <CardDescription>
              Create and publish assessments with due dates and class/student targeting.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="rounded-full px-5" onClick={() => navigate("/teacher-assessments/create")}>
              <IconFilePlus />
              Create assessment
            </Button>
            <Button variant="outline" className="rounded-full px-5" onClick={() => toast.info("Set due dates from the edit form") }>
              <IconCalendarEvent />
              Set due dates
            </Button>
            <Button variant="outline" className="rounded-full px-5" onClick={publishSelected}>
              <IconSend />
              Publish selected
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment list</CardTitle>
            <CardDescription>
              Manage draft, scheduled, and published assessments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell className="font-medium text-slate-900">{item.title}</TableCell>
                    <TableCell>{item.target}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "Published"
                            ? "bg-blue-50 text-blue-600"
                            : item.status === "Scheduled"
                              ? "bg-orange-50 text-orange-500"
                              : "bg-slate-100 text-slate-700"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.responses}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => navigate("/teacher-assessments/create")}
                      >
                        <IconChecklist />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
