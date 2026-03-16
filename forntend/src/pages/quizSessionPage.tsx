import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  PlayCircle,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from "lucide-react";

const questions = [
  { id: 1, type: "multiple-choice", text: "What is the refractive index of water?", options: ["1.00", "1.33", "1.50", "2.42"] },
  { id: 2, type: "true-false", text: "Light travels faster in glass than in a vacuum." },
  { id: 3, type: "short-answer", text: "Explain why a straw looks broken in a glass of water.", placeholder: "Enter your explanation..." },
];

export default function QuizSession() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flags, setFlags] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const toggleFlag = (index: number) => {
    setFlags(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [currentIdx]: val });
  };

  return (
    <div className="flex h-screen w-full bg-slate-50/50 overflow-hidden font-sans">
      {/* MAIN WORKSPACE (Full Width Card-Style) */}
      <main className="flex-2 flex flex-col min-w-0 bg-slate-50/50">
        
        {/* Workspace Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Physics Assessment</h1>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">
              Unit 2: Light & Optics
            </p>
          </div>
          <div className="flex items-center gap-4">
             <Badge variant="secondary" className="font-mono text-[10px] uppercase">
               Mode: Exam
             </Badge>
             <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <Clock className="w-4 h-4" /> 24:59
             </div>
          </div>
          <Button variant="outline" size="sm" className="font-bold text-xs uppercase tracking-widest border-2">
             Finish & Submit
          </Button>
        </header>

        {/* Dynamic Question Card */}
        <div className="flex-1 overflow-y-auto p-12 flex justify-center">
          <Card className="w-full max-w-4xl h-fit border shadow-sm rounded-xl overflow-hidden"> {/* Reduced border to 1px */}
  <CardHeader className="bg-white border-b py-5 px-6"> {/* Reduced padding from pb-8 */}
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-2 items-center">
        <Badge className="bg-slate-100 text-slate-600 border-none uppercase text-[9px] tracking-widest px-2 py-0">
          {currentQuestion.type.replace('-', ' ')}
        </Badge>
        {flags.includes(currentIdx) && (
          <Badge variant="destructive" className="uppercase text-[9px] tracking-widest px-2 py-0">
            Flagged
          </Badge>
        )}
      </div>
      <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-tighter">
        <BookOpen className="w-3 h-3" /> Question {currentIdx + 1} of {questions.length}
      </span>
    </div>
    
    <CardTitle className="text-xl font-bold tracking-tight text-slate-900 leading-snug">
      {currentQuestion.text}
    </CardTitle>
  </CardHeader>

            <CardContent className="p-6 bg-white"> {/* Reduced from p-10 */}
  <div className="min-h-[180px]"> {/* Reduced from 250px */}
    
    {/* Multiple Choice - Tighter Padding & Grid */}
    {currentQuestion.type === "multiple-choice" && (
      <RadioGroup value={answers[currentIdx]} onValueChange={handleAnswer} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentQuestion.options?.map((opt) => (
          <Label key={opt} className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:border-primary has-[:checked]:bg-primary/[0.02] transition-all">
            <RadioGroupItem value={opt} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[currentIdx] === opt ? 'border-primary' : 'border-slate-200'}`}>
              {answers[currentIdx] === opt && <div className="w-2 h-2 bg-primary rounded-full" />}
            </div>
            <span className="text-sm font-medium">{opt}</span> {/* Smaller text */}
          </Label>
        ))}
      </RadioGroup>
    )}

    {/* True/False - Scaled down height and font */}
    {currentQuestion.type === "true-false" && (
  <div className="flex gap-3 max-w-md mx-auto"> {/* Added max-width and center for better balance */}
    {["True", "False"].map((val) => (
      <Button
        key={val}
        variant={answers[currentIdx] === val ? "default" : "outline"}
        className={`flex-1 h-14 text-sm font-black rounded-lg uppercase tracking-widest transition-all
          ${answers[currentIdx] === val 
            ? "shadow-md shadow-primary/20" 
            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}
        `}
        onClick={() => handleAnswer(val)}
      >
        {val}
      </Button>
    ))}
  </div>
)}

    {/* Short Answer - Slimmer Input and Alert */}
    {currentQuestion.type === "short-answer" && (
  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="relative">
      <textarea
        className="w-full min-h-[120px] p-4 text-sm bg-slate-50/30 border border-slate-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none"
        placeholder={currentQuestion.placeholder || "Type your detailed explanation here..."}
        value={answers[currentIdx] || ""}
        onChange={(e) => handleAnswer(e.target.value)}
      />
      
      {/* Character count or subtle focus indicator */}
      <div className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
        {(answers[currentIdx] || "").length} Characters
      </div>
    </div>

    {/* Minimalist AI Status */}
    <div className="flex items-center gap-2 px-1 text-slate-400">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/40"></span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-tight">
        AI Analysis Active <span className="mx-1 opacity-30">|</span> 
        <span className="font-medium lowercase italic opacity-70"> conceptual accuracy mode</span>
      </p>
    </div>
  </div>
)}
  </div>
</CardContent>
           <CardFooter className="bg-slate-50/30 p-4 flex justify-between items-center border-t"> {/* Reduced p-6 to p-4 */}
  <Button 
    variant="ghost" 
    size="sm"
    className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-white"
    disabled={currentIdx === 0}
    onClick={() => setCurrentIdx(prev => prev - 1)}
  >
    <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
  </Button>

  <div className="flex gap-2">
    <Button 
      variant="outline"
      size="sm"
      className={`h-9 px-4 rounded-md font-bold text-[10px] uppercase tracking-wider ${
        flags.includes(currentIdx) ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" : "bg-white"
      }`}
      onClick={() => toggleFlag(currentIdx)}
    >
      <Flag className={`w-3 h-3 mr-1.5 ${flags.includes(currentIdx) ? "fill-current" : ""}`} /> 
      {flags.includes(currentIdx) ? "Flagged" : "Flag"}
    </Button>
    
    <Button 
      size="sm"
      className="h-9 px-5 rounded-md font-bold text-[10px] uppercase tracking-wider gap-1.5 shadow-sm"
      onClick={() => {
        if(currentIdx < questions.length - 1) setCurrentIdx(prev => prev + 1);
      }}
    >
      {currentIdx === questions.length - 1 ? "Review Session" : "Next"}
      <ChevronRight className="w-3.5 h-3.5" />
    </Button>
  </div>
</CardFooter>
          </Card>
        </div>
      </main>
      
      {/* SIDEBAR NAVIGATION (Matching Dashboard Card List style) */}
      <aside className="w-64 border-r bg-white flex flex-col shadow-sm shrink-0"> {/* Reduced width */}
  <div className="p-4 border-t bg-slate-50/30">
    <div className="space-y-2">
       <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-slate-500">
          <span>Progress</span>
          <span>{answeredCount}/{questions.length}</span>
       </div>
       <Progress value={progress} className="h-1" /> {/* Thinner progress bar */}
    </div>
  </div>
  
  <Tabs 
    orientation="vertical" 
    value={currentIdx.toString()} 
    onValueChange={(v) => setCurrentIdx(parseInt(v))}
    className="flex-1 flex flex-col overflow-y-auto"
  >
    <TabsList className="flex flex-col w-full h-auto bg-transparent p-3 gap-1"> {/* Reduced padding and gap */}
      {questions.map((_, i) => (
        <TabsTrigger
          key={i}
          value={i.toString()}
          className={`
            relative w-full h-10 flex items-center justify-start px-3 rounded-md transition-all border text-[11px]
            /* Active State: Clean focus without heavy background */
            data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary
            /* Base State */
            ${answers[i] ? 'border-slate-100 bg-slate-50/30 text-slate-900' : 'border-transparent text-muted-foreground'}
          `}
        >
          <div className="flex items-center gap-2.5 w-full">
            <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold border 
              ${answers[i] ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200'}`}>
              {i + 1}
            </div>
            
            <span className="font-bold uppercase tracking-tight">Q{i+1}</span>

            <div className="ml-auto flex items-center gap-1.5">
              {flags.includes(i) && <Flag className="w-2.5 h-2.5 text-red-500 fill-current" />}
              {answers[i] && <CheckCircle2 className="w-2.5 h-2.5 text-primary" />}
            </div>
          </div>
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
</aside>

      
    </div>
  );
}