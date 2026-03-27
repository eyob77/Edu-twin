import { IconCalendarEvent, IconClipboardText, IconFilePlus, IconSend } from "@tabler/icons-react"
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

const assignments = [
  {
    title: "Linear Equation Problem Set",
    target: "10A, 10B",
    dueDate: "Mar 27, 2026",
    status: "Published",
    submitted: "34 / 61",
    pendingReview: 12,
  },
  {
    title: "Physics Lab Reflection",
    target: "10B",
    dueDate: "Mar 24, 2026",
    status: "Published",
    submitted: "19 / 29",
    pendingReview: 8,
  },
  {
    title: "STEM Research Brief",
    target: "11S",
    dueDate: "Mar 30, 2026",
    status: "Draft",
    submitted: "0 / 27",
    pendingReview: 0,
  },
]

export default function TeacherAssignmentsPage() {
  const navigate = useNavigate()
  const [assignmentItems, setAssignmentItems] = useState(assignments)

  const publishNow = () => {
    setAssignmentItems((prev) =>
      prev.map((item) => (item.status === "Draft" ? { ...item, status: "Published" } : item))
    )
    toast.success("Assignments published")
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignment publishing</CardTitle>
            <CardDescription>
              Create, edit, assign due dates, and target classes or specific students.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="rounded-full px-5" onClick={() => navigate("/teacher-assignments/create") }>
              <IconFilePlus />
              Create assignment
            </Button>
            <Button variant="outline" className="rounded-full px-5" onClick={() => toast.info("Update due dates from edit form") }>
              <IconCalendarEvent />
              Update due date
            </Button>
            <Button variant="outline" className="rounded-full px-5" onClick={publishNow}>
              <IconSend />
              Publish now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Submission review workflow</CardTitle>
            <CardDescription>
              Review submissions, score attempts, and give feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Pending review</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignmentItems.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell className="font-medium text-slate-900">{item.title}</TableCell>
                    <TableCell>{item.target}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={item.status === "Published" ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-700"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.submitted}</TableCell>
                    <TableCell>{item.pendingReview}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="rounded-full" onClick={() => toast.success(`Opened review for ${item.title}`)}>
                        <IconClipboardText />
                        Review
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
