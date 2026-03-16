import { 
  ArrowLeft, 
  FileQuestion, 
  HelpCircle, 
  Image as ImageIcon, 
  StickyNote, 
  ChevronRight,
  FileUp,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const AssignmentContentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 lg:p-14">
      <div className="max-w-350 mx-auto space-y-8">
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="group text-muted-foreground hover:text-primary transition-colors pl-0 w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Assignment Details
          </Button>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right mr-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
              <p className="text-sm font-bold text-amber-500">In Progress</p>
            </div>
          </div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main Content: Problems */}
          <div className="lg:col-span-3 space-y-10">
            <header className="space-y-4">
              <div className="bg-primary/10 h-16 w-16 rounded-3xl flex items-center justify-center shadow-inner mb-6">
                <FileQuestion className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Assignment #04: <span className="text-primary italic">Dynamics in Action</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Please provide detailed steps for each calculation. You may use the AI Assistant for conceptual hints. Remember to define your coordinate systems clearly.
              </p>
            </header>

            <div className="space-y-8">
              <ProblemSection number="01" title="The Inclined Plane" points="20">
                A block of mass <code className="bg-slate-100 dark:bg-zinc-800 px-1 rounded">m = 5.0 kg</code> is released from rest at the top of a 
                frictionless incline of angle <code className="bg-slate-100 dark:bg-zinc-800 px-1 rounded">θ = 30°</code>. 
                Calculate the acceleration and the time to reach the bottom (Length = 10m).
              </ProblemSection>

              <ProblemSection number="02" title="Circular Motion & Tension" points="30">
                A 2.0 kg object is tied to a string of length 0.5 m and whirled at a 
                constant speed of 4.0 m/s. Find the magnitude of the tension in the string.
              </ProblemSection>
            </div>
            <section className="pt-12 border-t border-slate-200 dark:border-zinc-800">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-dashed border-slate-200 dark:border-zinc-800 p-12 text-center space-y-6 hover:border-primary/50 transition-colors group">
              <div className="h-20 w-20 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                <FileUp className="h-10 w-10 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to submit?</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Upload your solution as a PDF, DOCX, or high-quality image. Max file size: 25MB.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button variant="outline" size="lg" className="rounded-lg px-8 font-bold border-2">
                  Browse Files
                </Button>
                <Button size="lg" className="rounded-lg px-10 font-bold shadow-xl shadow-primary/20">
                  Submit Assignment
                </Button>
              </div>
              
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold pt-4 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-500" /> Auto-saved at 12:45 PM
              </p>
            </div>
          </section>
          <footer className="h-20" />
          </div>

          {/* Sidebar: Metadata & Quick Actions */}
          <aside className="space-y-6">

            <div className="p-2 space-y-2">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-4">Navigation</h4>
               {["Problem 01", "Problem 02", "Problem 03"].map((item, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-white dark:hover:bg-zinc-900 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-zinc-800">
                   <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">{item}</span>
                   <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                 </button>
               ))}
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
};

/* --- SHARED SUB-COMPONENTS --- */

const ProblemSection = ({ number, title, points, children }: any) => (
  <Card className="group border shadow-sm bg-white dark:bg-zinc-900 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
    <CardHeader className="p-8 pb-4">
      <div className="flex justify-between items-start mb-4">
        <Badge className="bg-primary text-white border-none px-4 py-1 font-black rounded-lg text-[10px] uppercase tracking-widest">
          Problem {number}
        </Badge>
        <span className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
          {points} Points
        </span>
      </div>
      <CardTitle className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </CardTitle>
    </CardHeader>
    
    <CardContent className="p-8 pt-0 space-y-8">
      <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium italic border-l-2 border-slate-100 dark:border-zinc-800 pl-6">
        {children}
      </div>
      
      <div className="pt-6 border-t border-slate-50 dark:border-zinc-800/50 flex flex-wrap items-center gap-3">
         <Button variant="secondary" size="sm" className="rounded-normal font-bold text-[11px] px-5 py-5 transition-all hover:bg-slate-200 dark:hover:bg-zinc-800 gap-2">
           <ImageIcon className="h-4 w-4" /> View Diagram
         </Button>
         <Button variant="outline" size="sm" className="rounded-normal font-bold text-[11px] px-5 py-5 hover:border-primary transition-all gap-2 bg-transparent">
           <StickyNote className="h-4 w-4" /> Add Note
         </Button>
         <div className="flex-1 min-w-5" />
         <Button variant="ghost" size="sm" className="rounded-xl font-bold text-[11px] px-5 py-5 text-primary hover:bg-primary/5 gap-2">
           <HelpCircle className="h-4 w-4" /> Ask AI Hint
         </Button>
      </div>
    </CardContent>
  </Card>
);

export default AssignmentContentPage;