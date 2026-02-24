import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartRadarDots } from "@/components/chart-radar-dots"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// import data from "./data.json"

export default function StudentPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
          {/* router here */}
            <div className="flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 h-[80%]">

              <div className="flex gap-2 px-4">
                <div className="lg:px-6 w-[80%]">
                  <ChartAreaInteractive />
                </div>
                <ChartRadarDots/>
              </div>

              <SectionCards />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
