import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartRadarDots } from "@/components/chart-radar-dots"
import { SectionCards } from "@/components/section-cards"


// import data from "./data.json"

export default function StudentPage() {
  return (
    <div className="flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 h-[80%]">
      
      <div className="flex gap-2 px-4">
        <div className="lg:px-6 w-[80%]">
          <ChartAreaInteractive />
        </div>
        <ChartRadarDots/>
      </div>

      <SectionCards />

    </div>  
            
  )
}
