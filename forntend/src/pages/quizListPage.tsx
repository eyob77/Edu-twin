
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
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    id: "1",
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
    title: "Light & Optics Simulation Quiz",
    teacher: "Dr. Smith",
    status: "Upcoming",
    duration: "30 mins",
    deadline: "Oct 30, 2026",
    questions: 10,
    type: "Simulation-Based",
  },
];

export default function QuizDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Physics Assessments</h1>
        <p className="text-muted-foreground mt-2">
          Select an assessment assigned by your teacher to begin.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
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
              <CardDescription>Instructor: {assessment.teacher}</CardDescription>
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
                onClick={()=>{navigate("/quiz-content")}}
              >
                {assessment.status === "Completed" ? "View Results" : "Start Quiz"}
                {assessment.status !== "Completed" && <PlayCircle className="w-4 h-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}