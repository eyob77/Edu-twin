import { IconArrowUp, IconCrown, IconFlame, IconMedal, IconTrophy } from "@tabler/icons-react"

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
  { rank: 1, student: "Liya Bekele", grade: "11", score: 97, streak: 12, trend: "+4" },
  { rank: 2, student: "Mikael Worku", grade: "11", score: 95, streak: 10, trend: "+3" },
  { rank: 3, student: "Nardos Taye", grade: "10", score: 92, streak: 9, trend: "+2" },
  { rank: 4, student: "Henok Assefa", grade: "10", score: 89, streak: 7, trend: "+1" },
  { rank: 5, student: "Ruth Solomon", grade: "9", score: 86, streak: 6, trend: "+1" },
  { rank: 6, student: "Noah Habte", grade: "9", score: 82, streak: 4, trend: "+1" },
]

export default function StudentLeaderboardPage() {
  const myRank = 8
  const myScore = 78
  const myStreak = 5

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCrown className="size-5 text-orange-500" />
              My rank
            </CardTitle>
            <CardDescription>Your current leaderboard position</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">#{myRank}</p>
            <p className="mt-1 text-sm text-slate-500">Top 15% of active learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrophy className="size-5 text-blue-600" />
              Performance score
            </CardTitle>
            <CardDescription>Based on quiz and assignment quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">{myScore}%</p>
            <Progress value={myScore} className="h-2.5" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconFlame className="size-5 text-orange-500" />
              Learning streak
            </CardTitle>
            <CardDescription>Consecutive active learning days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{myStreak} days</p>
            <p className="mt-1 text-sm text-slate-500">Keep going to unlock bonus points.</p>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconMedal className="size-5 text-orange-500" />
              Grade leaderboard
            </CardTitle>
            <CardDescription>
              Weekly standings for your cohort.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow key={entry.student}>
                    <TableCell className="font-semibold text-slate-900">#{entry.rank}</TableCell>
                    <TableCell className="font-medium text-slate-900">{entry.student}</TableCell>
                    <TableCell>{entry.grade}</TableCell>
                    <TableCell>{entry.score}%</TableCell>
                    <TableCell>{entry.streak} days</TableCell>
                    <TableCell className="text-emerald-600">
                      <span className="inline-flex items-center gap-1">
                        <IconArrowUp className="size-4" />
                        {entry.trend}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={entry.rank <= 3 ? "bg-orange-50 text-orange-500" : "bg-blue-50 text-blue-600"}>
                        {entry.rank <= 3 ? "Champion" : "Climber"}
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
