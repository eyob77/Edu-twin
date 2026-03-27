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

const quizzes = [
  {
    title: "Algebra Foundations - Week 6",
    classTarget: "10A, 10B",
    dueDate: "Mar 26, 2026",
    status: "Draft",
    attempts: "0 / 58",
  },
  {
    title: "Kinematics Quick Check",
    classTarget: "10B",
    dueDate: "Mar 24, 2026",
    status: "Published",
    attempts: "23 / 29",
  },
  {
    title: "STEM Logic Assessment",
    classTarget: "11S",
    dueDate: "Mar 28, 2026",
    status: "Scheduled",
    attempts: "0 / 27",
  },
]

export default function TeacherQuizPage() {
  const navigate = useNavigate()
  const [quizItems, setQuizItems] = useState(quizzes)

  const publishSelected = () => {
    setQuizItems((prev) =>
      prev.map((item) =>
        item.status === "Draft" || item.status === "Scheduled"
          ? { ...item, status: "Published" }
          : item
      )
    )
    toast.success("Quiz items published")
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz publishing workspace</CardTitle>
            <CardDescription>
              Create, edit, and publish quizzes with due dates and target classes/students.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="rounded-full px-5" onClick={() => navigate("/teacher-quiz/create") }>
              <IconFilePlus />
              Create quiz
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
            <CardTitle>Quiz list</CardTitle>
            <CardDescription>
              Manage draft, scheduled, and published quizzes in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizItems.map((quiz) => (
                  <TableRow key={quiz.title}>
                    <TableCell className="font-medium text-slate-900">{quiz.title}</TableCell>
                    <TableCell>{quiz.classTarget}</TableCell>
                    <TableCell>{quiz.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={quiz.status === "Published" ? "bg-blue-50 text-blue-600" : quiz.status === "Scheduled" ? "bg-orange-50 text-orange-500" : "bg-slate-100 text-slate-700"}>
                        {quiz.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{quiz.attempts}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate("/teacher-quiz/create") }>
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
