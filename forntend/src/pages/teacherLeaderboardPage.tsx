import { IconAward, IconChartBar, IconSparkles, IconTrophy } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
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

const leaderboardData = [
  { rank: 1, student: "Hanna Alemu", className: "10A", score: 96, completion: 98 },
  { rank: 2, student: "Samuel Hailu", className: "11S", score: 94, completion: 97 },
  { rank: 3, student: "Dawit Mulu", className: "10A", score: 88, completion: 92 },
  { rank: 4, student: "Betelhem Yonas", className: "11S", score: 85, completion: 89 },
  { rank: 5, student: "Mahi Derese", className: "10B", score: 79, completion: 84 },
]

export default function TeacherLeaderboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrophy className="size-5 text-orange-500" />
              Top class average
            </CardTitle>
            <CardDescription>Best performing class this week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">10A</p>
            <p className="text-sm text-slate-500">Average score 91%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconChartBar className="size-5 text-blue-600" />
              Completion rate
            </CardTitle>
            <CardDescription>Assignment and quiz completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">88%</p>
            <Progress value={88} className="h-2.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconSparkles className="size-5 text-blue-600" />
              Active streak groups
            </CardTitle>
            <CardDescription>Guidance cohorts with score improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">4</p>
            <p className="text-sm text-slate-500">Improved for 3+ consecutive weeks</p>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAward className="size-5 text-orange-500" />
              Student leaderboard
            </CardTitle>
            <CardDescription>
              Ranked by weighted performance from quizzes and assignments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Average score</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((student) => (
                  <TableRow key={student.student}>
                    <TableCell className="font-semibold text-slate-900">#{student.rank}</TableCell>
                    <TableCell className="font-medium text-slate-900">{student.student}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.score}%</TableCell>
                    <TableCell>{student.completion}%</TableCell>
                    <TableCell>
                      <Badge className={student.rank <= 3 ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-600"}>
                        {student.rank <= 3 ? "Top Performer" : "Rising"}
                      </Badge>
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
