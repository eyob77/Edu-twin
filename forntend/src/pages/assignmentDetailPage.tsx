import { ArrowLeft, ArrowRight, Clock, Target, User, FileText, AlertCircle, Download, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const AssignmentDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 lg:p-14">
      <div className="max-w-350 mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="group text-muted-foreground hover:text-primary transition-colors pl-0">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Assignments
        </Button>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-wider px-3">Unit 4: Dynamics</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm font-medium text-muted-foreground">Physics 101</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Newtonian Mechanics <br />Problem Set
              </h1>
            </header>

            <Card className="border-none shadow-sm bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl italic font-serif">
                  <FileText className="h-5 w-5 text-primary not-italic" /> Assignment Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 text-slate-600 dark:text-slate-400 space-y-6">
                <p className="text-lg leading-relaxed">
                  This problem set focuses on the application of Newton's three laws of motion in various physical scenarios. You will calculate force vectors, determine acceleration, and analyze tension in pulleys.
                </p>
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-primary space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 italic">
                    <AlertCircle className="h-4 w-4 text-primary not-italic" /> Required Materials
                  </h4>
                  <p className="text-sm">Please ensure you have your scientific calculator and a way to sketch free-body diagrams.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-slate-50/30 dark:bg-zinc-800/20 px-8 py-6">
                <Button variant="outline" className="gap-2 bg-white dark:bg-zinc-900 rounded-xl">
                  <Download className="h-4 w-4" /> Download Reference Sheet
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary/10 shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-zinc-900">
              <div className="h-2 bg-primary w-full" />
              <CardHeader className="p-6">
                <CardTitle className="text-lg">Submission Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <div className="space-y-4">
                  <DetailRow icon={<Target className="h-4 w-4" />} label="Total Points" value="100 pts" />
                  <DetailRow icon={<Clock className="h-4 w-4" />} label="Deadline" value="Oct 24, 2026" />
                  <DetailRow icon={<User className="h-4 w-4" />} label="Instructor" value="Dr. Aris Thorne" />
                </div>
                <Separator />
                <Button size="lg" className="w-full py-7 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl" onClick={() => navigate('/assignments-content')}>
                  Start Assignment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-[11px] text-center text-muted-foreground italic">Progress is saved automatically upon starting.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 dark:bg-zinc-900 text-white border-none rounded-3xl overflow-hidden">
              <CardHeader className="p-6"><CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Grading Rubric</CardTitle></CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <RubricItem label="Mathematical Accuracy" points="60" />
                <RubricItem label="Free-Body Diagrams" points="20" />
                <RubricItem label="Clarity & Logic" points="20" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-3 text-muted-foreground">{icon} <span>{label}</span></div>
    <span className="font-bold">{value}</span>
  </div>
);

const RubricItem = ({ label, points }: any) => (
  <div className="flex justify-between items-center group cursor-default text-sm">
    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> <span>{label}</span></div>
    <span className="font-bold text-primary">{points} pts</span>
  </div>
);

export default AssignmentDetailPage