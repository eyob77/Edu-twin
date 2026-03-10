import { 
  ArrowLeft, 
  UploadCloud, 
  FileQuestion,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const AssignmentContentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-zinc-950 overflow-hidden font-sans justify-center">
      
      

      <main className="w-[90%] flex flex-col overflow-hidden bg-slate-50/30 dark:bg-zinc-950 gap-6 ">
        <div className="flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10 shrink-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="pl-0 hover:bg-transparent text-muted-foreground group transition-colors"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Assignment Details
              </Button>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter">
                  Score Weight: 15%
                </Badge>
                <Button size="sm" className="h-9 px-4 shadow-lg shadow-primary/20">
                  <UploadCloud className="mr-2 h-4 w-4" /> Submit Work
                </Button>
              </div>
            </div>
            <div className="space-y-4 text-center border-b pb-12 border-slate-200 dark:border-zinc-800">
              <div className="bg-primary/10 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FileQuestion className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Assignment #04</h2>
              <p className="text-muted-foreground italic text-sm max-w-md mx-auto">
                Please provide detailed steps for each calculation. You may use the AI Assistant for conceptual hints.
              </p>
            </div>

            {/* Problem 1 */}
            <ProblemSection number="01" title="The Inclined Plane" points="20">
              A block of mass m = 5.0 kg is released from rest at the top of a 
              frictionless incline of angle θ = 30°. 
              Calculate the acceleration and the time to reach the bottom (Length = 10m).
            </ProblemSection>
            

            {/* Problem 2 */}
            <ProblemSection number="02" title="Circular Motion & Tension" points="30">
              A 2.0 kg object is tied to a string of length 0.5 m and whirled at a 
              constant speed of 4.0 m/s. Find the magnitude of the tension in the string.
            </ProblemSection>

     
        
      </main>
    </div>
  );
};

/* --- SHARED SUB-COMPONENTS --- */

const ProblemSection = ({ number, title, points, children }: any) => (
  <div className="group space-y-6 p-8 rounded-[32px] bg-white dark:bg-zinc-900 border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500 shadow-sm">
    <div className="flex justify-between items-start">
      <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 font-black rounded-xl text-xs uppercase tracking-widest shadow-sm">
        Problem {number}
      </Badge>
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2 py-1 bg-slate-50 dark:bg-zinc-800 rounded-lg">
        {points} Points
      </span>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        {title}
      </h3>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-[17px] font-medium italic">
        {children}
      </div>
    </div>
    
    <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap gap-3">
       <Button variant="secondary" size="sm" className="rounded-xl font-bold text-[10px] px-5 py-5 transition-colors hover:bg-slate-200 dark:hover:bg-zinc-800">
         View Diagram
       </Button>
       <Button variant="outline" size="sm" className="rounded-xl font-bold text-[10px] px-5 py-5 hover:border-primary transition-colors">
         Add Note
       </Button>
       <Button variant="ghost" size="sm" className="rounded-xl font-bold text-[10px] px-5 py-5 text-primary hover:bg-primary/5 ml-auto">
         Ask AI Hint
       </Button>
    </div>
  </div>
);


export default AssignmentContentPage;