import { 
  Card, 
  CardDescription, 
  CardTitle, 
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
  FileText,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import quizData from "./sampleDatas/quiz.json";

export default function AssessmentGateway() {
  const navigate = useNavigate();
  const isCompleted = quizData.config.isCompleted;
  const score = 85; 

  return (
    <div className="p-8 w-full mx-auto animate-in fade-in duration-700">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Assessments
        </Button>
        <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-tighter">
          System ID: {quizData.quizId}
        </Badge>
      </div>

      <Card className="flex flex-col border rounded-lg shadow-md overflow-hidden bg-white">
        {/* Decorative Header Bar */}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT COLUMN: Main Info (8 Columns) */}
          <div className="lg:col-span-8 p-8 border-r border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <Badge variant={isCompleted ? "secondary" : "default"} className="mb-2">
                  {isCompleted ? "Completed" : "Action Required"}
                </Badge>
                <CardTitle className="text-4xl font-black tracking-tight text-slate-900">
                  {quizData.title}
                </CardTitle>
                <CardDescription className="text-lg font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Instructor: {quizData.instructor}
                </CardDescription>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="grow">
              {isCompleted ? (
                /* --- FULL WIDTH VIEW SCORE --- */
                <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Your Performance</p>
                      <h2 className="text-7xl font-black text-primary tracking-tighter">{score}%</h2>
                    </div>
                    <div className="text-right hidden sm:block">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 text-sm">
                        Passing Grade: 70%
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="flex items-center gap-2 text-muted-foreground">
                         <BarChart3 className="w-4 h-4" /> Mastery Level
                      </span>
                      <span>{score}/100</span>
                    </div>
                    <Progress value={score} className="h-3 rounded-full bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    {[
                      { label: "Time Taken", val: "24:12", icon: Clock },
                      { label: "Questions", val: quizData.questions.length, icon: BookOpen },
                      { label: "Status", val: "Passed", icon: ShieldCheck }
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 border rounded-xl p-4 flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">{item.label}</p>
                          <p className="font-bold">{item.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* --- FULL WIDTH TAKE QUIZ --- */
                <div className="space-y-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 border-2 rounded-2xl flex items-center gap-5">
                         <div className="p-3 bg-white rounded-xl shadow-sm"><Clock className="w-8 h-8 text-primary" /></div>
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Allocated Time</p>
                            <p className="text-2xl font-black">{quizData.config.durationMinutes} Minutes</p>
                         </div>
                      </div>
                      <div className="p-6 border-2 border-slate-50 rounded-2xl bg-slate-50/30 flex items-center gap-5">
                         <div className="p-3 bg-white rounded-xl shadow-sm"><BookOpen className="w-8 h-8 text-primary" /></div>
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">Assessment Items</p>
                            <p className="text-2xl font-black">{quizData.questions.length} Questions</p>
                         </div>
                      </div>
                   </div>

                   <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex gap-5 items-start">
                      <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                      <div className="space-y-2">
                        <h4 className="font-bold text-amber-900 uppercase text-xs tracking-widest">Academic Integrity & Sync</h4>
                        <p className="text-sm text-amber-800 leading-relaxed">
                          By starting this assessment, you agree to the proctoring rules. The AI agent will monitor interaction patterns to ensure a fair environment. **No pauses allowed.**
                        </p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Action & Sidebar (4 Columns) */}
          <div className="lg:col-span-4 bg-slate-50/50 p-8 flex flex-col justify-between border-l border-slate-100">
             <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Calendar className="w-4 h-4" /> Schedule Detail
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Due Date</span>
                      <span className="font-bold">Oct 25, 2026</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-bold">Teacher-Hosted</span>
                   </div>
                   <Separator />
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "Ensure your HTML5 Canvas environment is initialized before beginning the simulation portions of this test."
                </p>
             </div>

             <Button 
                className="w-full gap-3 h-16 text-xl font-black shadow-lg transition-all active:scale-[0.97] mt-8" 
                variant={isCompleted ? "outline" : "default"}
                onClick={() => isCompleted ? navigate("/quiz-review") : navigate("/quiz-session")}
              >
                {isCompleted ? (
                  <><BarChart3 className="w-6 h-6" /> Review Result</>
                ) : (
                  <><PlayCircle className="w-6 h-6" /> Start Quiz</>
                )}
              </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}