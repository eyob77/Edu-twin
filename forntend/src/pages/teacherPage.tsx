import {
  IconAlertTriangle,
  IconArrowUpRight,
  IconBook2,
  IconChecks,
  IconClockHour4,
  IconClipboardCheck,
  IconChartHistogram,
  IconFileUpload,
  IconSchool,
  IconSparkles,
  IconTrendingUp,
  IconUserHeart,
  IconUsersGroup,
} from "@tabler/icons-react"
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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const overviewMetrics = [
  {
    title: "Active students",
    value: "148",
    detail: "+12 from last week",
    accentClass: "bg-blue-50 text-blue-600",
    icon: IconUsersGroup,
  },
  {
    title: "Average score",
    value: "83.4%",
    detail: "Across active classes this week",
    accentClass: "bg-emerald-50 text-emerald-600",
    icon: IconChecks,
  },
  {
    title: "At-risk learners",
    value: "09",
    detail: "Need intervention this week",
    accentClass: "bg-orange-50 text-orange-500",
    icon: IconAlertTriangle,
  },
  {
    title: "Pending grading",
    value: "26",
    detail: "Submissions waiting review",
    accentClass: "bg-slate-100 text-slate-700",
    icon: IconBook2,
  },
]

const classHealth = [
  {
    name: "Grade 10A Mathematics",
    students: 32,
    mastery: 84,
    avgScore: 81,
    completion: 88,
    alerts: 2,
  },
  {
    name: "Grade 10B Physics",
    students: 29,
    mastery: 77,
    avgScore: 75,
    completion: 81,
    alerts: 4,
  },
  {
    name: "Grade 11 STEM Advisory",
    students: 27,
    mastery: 89,
    avgScore: 86,
    completion: 91,
    alerts: 1,
  },
]

const interventionQueue = [
  {
    name: "Selam Tesfaye",
    issue: "3 missing assignments in Algebra",
    urgency: "High",
    action: "Assign targeted practice plan",
  },
  {
    name: "Noah Bekele",
    issue: "Practice completion dropped to 62%",
    urgency: "High",
    action: "Assign counselor follow-up",
  },
  {
    name: "Ruth Demissie",
    issue: "Quiz trend declined for 2 weeks",
    urgency: "Medium",
    action: "Move to tutoring group",
  },
]

const upcomingTasks = [
  {
    title: "Midterm quiz review",
    meta: "18 submissions due for grading",
    due: "Today, 4:30 PM",
  },
  {
    title: "Intervention plan update",
    meta: "Refresh support plans for at-risk learners",
    due: "Tomorrow, 9:00 AM",
  },
  {
    title: "Content revision audit",
    meta: "Update 6 low-score quiz items",
    due: "Friday, 11:00 AM",
  },
]

const roster = [
  {
    name: "Hanna Alemu",
    className: "10A",
    mastery: "89%",
    recentQuiz: "18/20",
    trend: "Up",
    average: "91%",
    status: "On Track",
  },
  {
    name: "Dawit Mulu",
    className: "10A",
    mastery: "76%",
    recentQuiz: "14/20",
    trend: "Flat",
    average: "87%",
    status: "Needs Support",
  },
  {
    name: "Mahi Derese",
    className: "10B",
    mastery: "62%",
    recentQuiz: "11/20",
    trend: "Down",
    average: "79%",
    status: "At Risk",
  },
  {
    name: "Samuel Hailu",
    className: "11S",
    mastery: "92%",
    recentQuiz: "19/20",
    trend: "Up",
    average: "94%",
    status: "On Track",
  },
  {
    name: "Betelhem Yonas",
    className: "11S",
    mastery: "74%",
    recentQuiz: "13/20",
    trend: "Down",
    average: "84%",
    status: "Needs Support",
  },
]

const publishingItems = [
  {
    title: "Create or edit quiz",
    detail: "Draft questions, set attempts, and apply time limits.",
  },
  {
    title: "Publish assessments",
    detail: "Set due dates and assign target classes or specific students.",
  },
  {
    title: "Manage assignments",
    detail: "Schedule release windows and update instructions before publishing.",
  },
]

const reviewFlow = [
  {
    title: "Review submissions",
    detail: "Open attempts, compare responses, and verify completion.",
  },
  {
    title: "Score and feedback",
    detail: "Grade each submission and provide clear rubric-based notes.",
  },
  {
    title: "Mark pending reviews",
    detail: "Track ungraded items and prioritize urgent deadlines.",
  },
]

function getStatusBadgeClass(status: string) {
  if (status === "On Track") {
    return "bg-emerald-50 text-emerald-600"
  }

  if (status === "At Risk") {
    return "bg-orange-50 text-orange-500"
  }

  return "bg-blue-50 text-blue-600"
}

function getUrgencyBadgeClass(urgency: string) {
  if (urgency === "High") {
    return "bg-orange-50 text-orange-500"
  }

  return "bg-blue-50 text-blue-600"
}

export default function TeacherPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <Badge className="bg-blue-50 text-blue-600">
                <IconSchool />
                Teacher workspace
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Teacher portal dashboard
                </h2>
                <p className="max-w-xl text-sm text-slate-600 sm:text-base">
                  Class performance overview, student progress snapshots, at-risk indicators,
                  publishing tools, review workflow, and activity tracking in one place.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full px-5" onClick={() => navigate("/teacher-quiz/create") }>
                <IconFileUpload />
                Publish content
              </Button>
              <Button variant="outline" className="rounded-full px-5" onClick={() => navigate("/teacher-assignments") }>
                <IconClipboardCheck />
                Open review queue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-4 lg:px-6">
        {overviewMetrics.map((metric) => (
          <Card key={metric.title} className="gap-4 py-5">
            <CardContent className="flex items-start justify-between px-5">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                <p className="text-sm text-slate-500">{metric.detail}</p>
              </div>
              <div className={`rounded-2xl p-3 ${metric.accentClass}`}>
                <metric.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 xl:grid-cols-[1.4fr_0.95fr] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Student academic status page</CardTitle>
            <CardDescription>
              Per-student mastery, recent quiz outcomes, and trend indicators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Mastery</TableHead>
                  <TableHead>Recent quiz</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roster.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.mastery}</TableCell>
                    <TableCell>{student.recentQuiz}</TableCell>
                    <TableCell>
                      <Badge className={student.trend === "Down" ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-600"}>
                        {student.trend}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.average}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervention queue</CardTitle>
              <CardDescription>
                Students who need immediate teacher action based on risk signals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {interventionQueue.map((entry) => (
                <div
                  key={entry.name}
                  className="rounded-2xl border border-blue-100 bg-slate-50/80 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{entry.name}</p>
                      <p className="text-sm text-slate-500">{entry.issue}</p>
                    </div>
                    <Badge className={getUrgencyBadgeClass(entry.urgency)}>{entry.urgency}</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
                    <span>{entry.action}</span>
                    <Button variant="outline" size="sm" className="rounded-full" onClick={() => toast.success(`Opened case for ${entry.name}`)}>
                      Open case
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming teacher tasks</CardTitle>
              <CardDescription>
                Keep grading, communication, and compliance work moving on schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.title} className="flex items-start gap-3 rounded-2xl border border-blue-100 p-4">
                  <div className="rounded-2xl bg-orange-50 p-2 text-orange-500">
                    <IconClockHour4 className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">{task.title}</p>
                      <IconArrowUpRight className="size-4 text-slate-400" />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{task.meta}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 xl:grid-cols-[1.05fr_0.95fr] lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Class health overview</CardTitle>
            <CardDescription>
              Compare mastery, average score, and assignment completion by classroom.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {classHealth.map((classroom) => (
              <div key={classroom.name} className="space-y-3 rounded-2xl border border-blue-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{classroom.name}</p>
                    <p className="text-sm text-slate-500">{classroom.students} enrolled learners</p>
                  </div>
                  <Badge className={classroom.alerts > 2 ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-600"}>
                    {classroom.alerts} alerts
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Mastery level</span>
                      <span className="font-medium text-slate-800">{classroom.mastery}%</span>
                    </div>
                    <Progress value={classroom.mastery} className="h-2.5" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Average score</span>
                      <span className="font-medium text-slate-800">{classroom.avgScore}%</span>
                    </div>
                    <Progress value={classroom.avgScore} className="h-2.5 bg-emerald-100 [&>[data-slot=progress-indicator]]:bg-emerald-500" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">Assignment completion</span>
                      <span className="font-medium text-slate-800">{classroom.completion}%</span>
                    </div>
                    <Progress value={classroom.completion} className="h-2.5 bg-orange-100 [&>[data-slot=progress-indicator]]:bg-orange-400" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity tracking</CardTitle>
            <CardDescription>
              Completion rates, average scores, and pending reviews.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-orange-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Completion trend</p>
                  <p className="mt-2 text-4xl font-bold text-slate-900">+8.4%</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <IconTrendingUp className="size-4 text-blue-600" />
                    More students are submitting on time this week.
                  </p>
                </div>
                <div className="rounded-full bg-white/90 p-3 text-blue-600 shadow-sm">
                  <IconUserHeart className="size-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-100 p-4">
                <p className="text-sm text-slate-500">Pending reviews</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">26</p>
                <p className="mt-1 text-sm text-slate-500">Submissions waiting for scoring</p>
              </div>
              <div className="rounded-2xl border border-blue-100 p-4">
                <p className="text-sm text-slate-500">Students above goal</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">81%</p>
                <p className="mt-1 text-sm text-slate-500">Reached the weekly practice target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 xl:grid-cols-2 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Content publishing</CardTitle>
            <CardDescription>
              Create, edit, and publish quizzes, assessments, and assignments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {publishingItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-blue-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <IconSparkles className="size-4 text-blue-600" />
                  <p className="font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-slate-500">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission review</CardTitle>
            <CardDescription>
              Review attempts, score submissions, and run feedback workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewFlow.map((item) => (
              <div key={item.title} className="rounded-2xl border border-blue-100 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <IconChartHistogram className="size-4 text-orange-500" />
                  <p className="font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-slate-500">{item.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
