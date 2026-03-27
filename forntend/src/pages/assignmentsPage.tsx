import { SectionCards } from "@/components/section-cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, useSearchParams } from "react-router-dom"




import subjectData from "./sampleDatas/subjectCardData.json";




export default function AssignmentPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedSubject = searchParams.get("subject") || "All Subjects"
  const selectedTopic = searchParams.get("topic") || "Mixed Topics"

  return (
    <div className="flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Mission Board</CardTitle>
            <CardDescription>
              Complete active missions, earn points, and improve your mastery.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-50 text-blue-600">Subject: {selectedSubject}</Badge>
            <Badge className="bg-orange-50 text-orange-500">Topic: {selectedTopic}</Badge>
            <Button className="rounded-full px-4" onClick={() => navigate(`/assignments-list/${selectedSubject}`)}>Open Tasks</Button>
            <Button variant="outline" className="rounded-full px-4" onClick={() => navigate("/student-textbooks")}>Change Topic</Button>
            <Badge className="bg-blue-50 text-blue-600">5 active tasks</Badge>
            <Badge className="bg-orange-50 text-orange-500">2 due soon</Badge>
          </CardContent>
        </Card>
      </div>

      <SectionCards  subjectData={subjectData} to="assignments-list"/>

    </div>  
            
  )
}
