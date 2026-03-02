import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import type { ChartConfig } from "@/components/ui/chart";
import data from "./data.json"

import chartData from "./sampleDatas/chartData.json";

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

export default function TeacherPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive chartConfig={chartConfig} chartData={chartData} chartDataConfig={chartDataConfig}/>
        </div>
        <DataTable data={data} />
    </div>
  )
}
