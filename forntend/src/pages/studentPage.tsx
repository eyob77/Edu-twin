import { SectionCards } from "@/components/section-cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import subjectData from "./sampleDatas/subjectCardData.json";
export default function StudentPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="rounded-3xl border border-blue-100 bg-white/80 px-5 py-5 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-500">Keep your momentum with focused learning today.</p>
            </div>
            <Badge className="bg-blue-50 text-blue-600">Weekly progress +8.4%</Badge>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button className="rounded-full px-4" onClick={() => navigate("/student-textbooks")}>
              Open Textbook Coach
            </Button>
            <Button variant="outline" className="rounded-full px-4" onClick={() => navigate("/student-canvas-lab") }>
              Open Canvas Lab
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Study streak</p>
              <p className="mt-1 text-lg font-bold text-slate-900">7 days</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Quizzes done</p>
              <p className="mt-1 text-lg font-bold text-slate-900">14</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Assignments</p>
              <p className="mt-1 text-lg font-bold text-slate-900">5 pending</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Average score</p>
              <p className="mt-1 text-lg font-bold text-slate-900">83%</p>
            </div>
          </div>
        </div>
      </div>

      <SectionCards
        subjectData={subjectData}
        to={"student-textbooks"}
        linkType={"query"}
      />

    </div>  
            
  )
}
