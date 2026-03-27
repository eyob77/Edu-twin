import { 
  Card, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  BookOpen, 
  ArrowLeft, 
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  Lightbulb,
  MessageSquare,
  TrendingUp
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

// This would typically come from your backend or state
const mockResults = {
  title: "Light & Optics: Refraction",
  instructor: "Dr. Birhanu",
  score: 85,
  timeTaken: "24:12",
  totalQuestions: 15,
  questions: [
    {
      id: 1,
      status: "correct",
      text: "When light passes from air into a glass block, what happens to its speed?",
      userAnswer: "It decreases",
      correctAnswer: "It decreases",
      explanation: "Light travels slower in denser mediums like glass (n ≈ 1.5) compared to air (n ≈ 1.0)."
    },
    {
      id: 2,
      status: "incorrect",
      text: "Which phenomenon is responsible for the formation of a rainbow?",
      userAnswer: "Reflection only",
      correctAnswer: "Dispersion and Internal Reflection",
      explanation: "A rainbow is formed by dispersion, refraction, and internal reflection of light in water droplets."
    }
  ]
};

export default function ReviewResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSubject = searchParams.get("subject") || "Physics";
  const quizId = searchParams.get("quizId") || "previous-attempt";

  return (
    <div className="p-6 w-full max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-foreground font-bold text-xs "
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Exit Review
        </Button>
        <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 font-mono uppercase tracking-tighter">
                Attempt #1
            </Badge>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 font-bold uppercase text-[10px] tracking-widest">
                Passed
            </Badge>
        </div>
      </div>

      <Card className="flex flex-col border rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT COLUMN: Question Review List (8 Columns) */}
          <div className="lg:col-span-8 p-8 border-r border-slate-100 overflow-y-auto max-h-[85vh]">
            <div className="space-y-1 mb-8">
              <CardTitle className="text-4xl font-black tracking-tight text-slate-900">
                Past Quiz Analytics
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {selectedSubject} • {quizId} • Review your answers and analytics from this past attempt.
              </CardDescription>
            </div>

            <div className="space-y-6">
              {mockResults.questions.map((q, idx) => (
                <div key={q.id} className={`p-6 border rounded-lg transition-all ${q.status === 'correct' ? 'bg-white border-slate-100' : 'bg-red-50/10 border-red-100'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <Badge className={`uppercase text-[10px] tracking-widest ${q.status === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border-none`}>
                      {q.status}
                    </Badge>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4">{q.text}</h3>

                  <div className="space-y-3 mb-6">
                    {/* User Answer */}
                    <div className={`p-3 rounded-lg flex items-center gap-3 text-sm font-medium ${q.status === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800 opacity-70 line-through'}`}>
                      {q.status === 'correct' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {q.userAnswer}
                    </div>

                    {/* Correct Answer (if user was wrong) */}
                    {q.status === 'incorrect' && (
                      <div className="p-3 bg-green-50 text-green-800 rounded-lg border flex items-center gap-3 text-sm font-bold border border-green-200">
                        <CheckCircle2 className="w-4 h-4" /> {q.correctAnswer}
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg flex gap-3 items-start border border-slate-100">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Explanation</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed italic">{q.explanation}</p>
                    </div>
                  </div>

                  {q.status === 'incorrect' && (
                    <Button variant="ghost" className="mt-4 h-8 text-primary font-bold text-[10px] uppercase tracking-widest gap-2 hover:bg-primary/5">
                        <MessageSquare className="w-3.5 h-3.5" /> Ask AI Tutor
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Performance Sidebar (4 Columns) */}
          <div className="lg:col-span-4 bg-slate-50/50 p-8 border-l border-slate-100">
             <div className="sticky top-0 space-y-8">
                
                {/* Score Section */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Your Mastery</p>
                        <h2 className="text-7xl font-black text-primary tracking-tighter">{mockResults.score}%</h2>
                    </div>
                    <Progress value={mockResults.score} className="h-3 rounded-full bg-white shadow-inner" />
                </div>

                <Separator />

                {/* Grid Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border rounded-xl p-4">
                        <Clock className="w-4 h-4 text-primary mb-2" />
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Time</p>
                        <p className="text-lg font-black">{mockResults.timeTaken}</p>
                    </div>
                    <div className="bg-white border rounded-xl p-4">
                        <TrendingUp className="w-4 h-4 text-primary mb-2" />
                        <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Percentile</p>
                        <p className="text-lg font-black">Top 18%</p>
                    </div>
                </div>

                <div className="space-y-2 rounded-xl border border-blue-100 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Analytics Summary</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Strongest area</span>
                    <span className="font-semibold text-slate-900">Concept recall</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Needs review</span>
                    <span className="font-semibold text-slate-900">Applied reasoning</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Accuracy trend</span>
                    <span className="font-semibold text-emerald-600">+6% vs last attempt</span>
                  </div>
                </div>

                {/* Detail List */}
                <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2 underline underline-offset-4 decoration-slate-200"><FileText className="w-3.5 h-3.5"/> Instructor</span>
                      <span className="font-bold">{mockResults.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2 underline underline-offset-4 decoration-slate-200"><BookOpen className="w-3.5 h-3.5"/> Total Items</span>
                      <span className="font-bold">{mockResults.totalQuestions} Questions</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground flex items-center gap-2 underline underline-offset-4 decoration-slate-200"><ShieldCheck className="w-3.5 h-3.5"/> Security</span>
                      <span className="font-bold text-green-600">Verified</span>
                    </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">Instructor Note</p>
                    <p className="text-[12px] leading-relaxed text-slate-600 italic">
                        "Strong understanding of refraction. Review the internal reflection formulas before the final exam."
                    </p>
                </div>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
}