import { SectionCards } from "@/components/section-cards"




import subjectData from "./sampleDatas/subjectCardData.json";




export default function AssignmentPage() {
  return (
    <div className="flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 h-[80%]">

      <SectionCards  subjectData={subjectData} to="assignments-list"/>

    </div>  
            
  )
}
