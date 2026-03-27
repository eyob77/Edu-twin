
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Clock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const assessments = [
  {
    id: "1",
    subject: "Physics",
    title: "Unit 2: Newton's Laws of Motion",
    teacher: "Dr. Smith",
    status: "Active",
    duration: "45 mins",
    deadline: "Oct 25, 2026",
    questions: 20,
    type: "Teacher-Hosted",
  },
  {
    id: "2",
    subject: "Physics",
    title: "Electromagnetism Fundamentals",
    teacher: "Prof. Tsegaye",
    status: "Completed",
    score: 85,
    deadline: "Oct 20, 2026",
    questions: 15,
    type: "Teacher-Hosted",
  },
  {
    id: "3",
    subject: "Physics",
    title: "Light & Optics Simulation Quiz",
    teacher: "Dr. Smith",
    status: "Upcoming",
    duration: "30 mins",
    deadline: "Oct 30, 2026",
    questions: 10,
    type: "Simulation-Based",
  },
  {
    id: "4",
    subject: "Math",
    title: "Algebra: Linear Equations Sprint",
    teacher: "Ms. Helen",
    status: "Active",
    duration: "35 mins",
    deadline: "Oct 27, 2026",
    questions: 18,
    type: "Teacher-Hosted",
  },
  {
    id: "5",
    subject: "Math",
    title: "Geometry Checkpoint",
    teacher: "Ms. Helen",
    status: "Completed",
    score: 91,
    deadline: "Oct 19, 2026",
    questions: 14,
    type: "Teacher-Hosted",
  },
  {
    id: "6",
    subject: "Biology",
    title: "Cell Structure Challenge",
    teacher: "Mr. Dawit",
    status: "Active",
    duration: "25 mins",
    deadline: "Oct 26, 2026",
    questions: 12,
    type: "Teacher-Hosted",
  },
  {
    id: "7",
    subject: "Chemistry",
    title: "Periodic Trends Basics",
    teacher: "Mrs. Selam",
    status: "Completed",
    score: 78,
    deadline: "Oct 18, 2026",
    questions: 10,
    type: "Teacher-Hosted",
  },
];

export default function QuizDashboard() {
  const navigate = useNavigate();
  const { subject } = useParams();
  const selectedSubject = decodeURIComponent(subject || "All Subjects");

  const filteredAssessments = selectedSubject === "All Subjects"
    ? assessments
    : assessments.filter((assessment) => assessment.subject.toLowerCase() === selectedSubject.toLowerCase());

  const startQuiz = (assessmentId: string, assessmentSubject: string) => {
    navigate(`/quiz-session?quizId=${assessmentId}&subject=${encodeURIComponent(assessmentSubject)}`);
  };

  const viewQuizAnalytics = (assessmentId: string, assessmentSubject: string) => {
    navigate(`/quiz-review?quizId=${assessmentId}&subject=${encodeURIComponent(assessmentSubject)}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{selectedSubject} Quizzes</h1>
        <p className="text-muted-foreground mt-2">
          Choose a quiz under this subject, then start the attempt or open past analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.id} className="flex flex-col border rounded-lg hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={assessment.status === "Active" ? "default" : "secondary"} className="border">
                  {assessment.status}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {assessment.deadline}
                </span>
              </div>
              <CardTitle className="text-xl">{assessment.title}</CardTitle>
              <CardDescription>Instructor: {assessment.teacher} • {assessment.subject}</CardDescription>
            </CardHeader>

            <CardContent className="grow">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {assessment.duration || "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> {assessment.questions} Questions
                  </div>
                </div>

                {assessment.status === "Completed" ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Final Score</span>
                      <span className="font-bold">{assessment.score}%</span>
                    </div>
                    <Progress value={assessment.score} className="h-2" />
                  </div>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    {assessment.type} assessment via EdTwin.
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button 
                className="w-full gap-2" 
                variant={assessment.status === "Completed" ? "outline" : "default"}
                disabled={assessment.status === "Upcoming"}
                onClick={() => {
                  if (assessment.status === "Completed") {
                    viewQuizAnalytics(assessment.id, assessment.subject);
                    return;
                  }

                  startQuiz(assessment.id, assessment.subject);
                }}
              >
                {assessment.status === "Completed" ? "View Analytics" : "Start Quiz"}
                {assessment.status !== "Completed" && <PlayCircle className="w-4 h-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/40 p-6 text-sm text-slate-600">
          No quizzes found for {selectedSubject} yet. Try another subject.
        </div>
      )}
    </div>
  );
}