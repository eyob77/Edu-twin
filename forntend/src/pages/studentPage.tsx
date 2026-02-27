import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartRadarDots } from "@/components/chart-radar-dots"
import { SectionCards } from "@/components/section-cards"


// import data from "./data.json"

import data from "./sampleDatas/subjectCardData.json";
import chartData from "./sampleDatas/chartData.json";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },

} satisfies ChartConfig

const chartDataConfig = {
  xAxis: "date",
  area: ["timeSpent"],
};
export default function StudentPage() {
  return (
    <div className="flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 h-[80%]">
      
      <div className="flex gap-4 w-full lg:px-6">
        <div className=" w-[75.5%] h-full">
          <ChartAreaInteractive chartConfig={chartConfig} chartData={chartData} chartDataConfig={chartDataConfig}/>
        </div>
        <div className="hidden lg:block w-[24.5%] h-full">

          <ChartRadarDots/>
        </div>
      </div>

      <SectionCards  data={data}/>

    </div>  
            
  )
}
