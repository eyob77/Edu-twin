import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuizSession() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Example Progress calculation
  const progress = ((currentQuestion + 1) / 5) * 100;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Side: Question Content */}
      <div className="w-full lg:w-1/2 flex flex-col border-r bg-white">
        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">Q {currentQuestion + 1}/5</Badge>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Time Remaining</span>
              <div className="flex items-center gap-2 text-red-600 font-mono font-bold">
                <Clock className="w-4 h-4" /> 24:59
              </div>
            </div>
          </div>
          <Progress value={progress} className="w-32 h-2" />
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-xl mx-auto space-y-8">
            <h2 className="text-2xl font-semibold leading-tight text-slate-900">
              Adjust the focal length of the convex lens to 10cm. If an object is placed at 20cm, what is the nature of the image?
            </h2>

            <RadioGroup defaultValue="option-two" className="space-y-3">
              {["Virtual and Upright", "Real and Inverted", "No image is formed", "Real and Upright"].map((option, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={`q-${i}`} />
                  <Label htmlFor={`q-${i}`} className="flex-1 cursor-pointer font-medium">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between items-center bg-white">
          <Button variant="outline" onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost">Flag for Review</Button>
            <Button onClick={() => setCurrentQuestion(prev => Math.min(4, prev + 1))}>
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side: Interactive Simulation & AI Tutor */}
      <div className="hidden lg:flex flex-col w-1/2 bg-slate-900">
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center justify-between text-white mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Interactive Lab
            </h3>
            <Badge variant="secondary" className="bg-white/10 text-white border-none">Optics Engine v1.2</Badge>
          </div>
          
          {/* Placeholder for your HTML5 Canvas Simulation */}
          <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
             <div className="text-white/20 font-mono text-sm uppercase tracking-[0.2em]">Canvas Simulation Rendering...</div>
             {/* <canvas id="optics-canvas" className="absolute inset-0 w-full h-full" /> */}
          </div>
        </div>

       
      </div>
    </div>
  );
}