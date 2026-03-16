import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Lightbulb, MessageSquare } from "lucide-react";

export default function ReviewResults() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Review Answers</h1>
          <p className="text-muted-foreground mt-1 text-lg">Light & Optics: Refraction & Lenses</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-muted-foreground uppercase">Score</p>
          <p className="text-4xl font-black text-primary">80%</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Correct Answer Example */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge className="bg-green-100 text-green-700 border-none">Correct</Badge>
              <span className="text-xs text-muted-foreground">Question 1</span>
            </div>
            <CardTitle className="text-lg mt-2">When light passes from air into a glass block, what happens to its speed?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 text-green-800 rounded-lg font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> It decreases
            </div>
            <div className="flex gap-3 text-sm bg-slate-50 p-4 rounded-lg border">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
              <p><span className="font-bold">Explanation:</span> Light travels slower in denser mediums like glass (n ≈ 1.5) compared to air (n ≈ 1.0).</p>
            </div>
          </CardContent>
        </Card>

        {/* Incorrect Answer Example */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge variant="destructive" className="bg-red-100 text-red-700 border-none">Incorrect</Badge>
              <span className="text-xs text-muted-foreground">Question 2</span>
            </div>
            <CardTitle className="text-lg mt-2">Which phenomenon is responsible for the formation of a rainbow?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
               <div className="p-3 bg-red-50 text-red-800 rounded-lg font-medium flex items-center gap-2 line-through opacity-70">
                <XCircle className="w-4 h-4" /> Reflection only
              </div>
              <div className="p-3 bg-green-50 text-green-800 rounded-lg font-medium flex items-center gap-2 border border-green-200">
                <CheckCircle2 className="w-4 h-4" /> Dispersion and Internal Reflection
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" className="text-blue-600 gap-2 border-blue-200 bg-blue-50/50">
                    <MessageSquare className="w-4 h-4" /> Ask AI Tutor to explain why
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}