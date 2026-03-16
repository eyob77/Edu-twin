import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  BookOpen, 
  Calendar, 
  AlertCircle, 
  ArrowLeft, 
  PlayCircle,
  BarChart3,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Using the data structure from your sample
import quizData from "./sampleDatas/quiz.json";

export default function AssessmentGateway() {
  const navigate = useNavigate();
  const isCompleted = quizData.config.isCompleted;
  const score = 85; // Placeholder for actual user score

  return (
    <div className="p-8 max-w-3xl mx-auto flex flex-col justify-center min-h-[80vh]">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-foreground mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Assessments
        </Button>
      </div>

      <Card className="flex flex-col border rounded-lg shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant={isCompleted ? "secondary" : "default"} className="border">
              {isCompleted ? "Completed" : "Action Required"}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Deadline: Oct 25, 2026
            </span>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">{quizData.title}</CardTitle>
          <CardDescription className="text-base">
            Instructor: {quizData.instructor}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isCompleted ? (
            /* --- VIEW SCORE PATH --- */
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="p-6 bg-slate-50 border rounded-xl flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Final Score</p>
                <h2 className="text-5xl font-bold text-primary mt-1">{score}%</h2>
                
                <div className="w-full max-w-xs mt-6 space-y-2">
                  <Progress value={score} className="h-2" />
                  <p className="text-xs text-muted-foreground italic">
                    Successfully submitted via EdTwin
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* --- TAKE QUIZ PATH --- */
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Duration</p>
                    <p className="font-semibold">{quizData.config.durationMinutes} mins</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Structure</p>
                    <p className="font-semibold">{quizData.questions.length} Questions</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 border rounded-lg bg-amber-50/50 border-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  Once started, the timer cannot be paused. Please ensure your 
                  connection is stable to allow the AI agent to sync your progress.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <Separator className="mb-6 mx-6 w-auto" />

        <CardFooter className="pb-8 px-6">
          <Button 
            className="w-full gap-2 h-12 text-lg shadow-sm" 
            variant={isCompleted ? "outline" : "default"}
            onClick={() => {
                if(!isCompleted) navigate("/quiz-session");
                else navigate("/quiz-review");
            }}
          >
            {isCompleted ? (
              <>
                <BarChart3 className="w-5 h-5" /> Review Results
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" /> Start Assessment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}