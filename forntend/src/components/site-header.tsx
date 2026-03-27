import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import { IconSparkles } from "@tabler/icons-react"

export function SiteHeader() {
  const role = useAuthStore((state) => state.user?.role)

  return (
    <header className="site-header flex h-(--header-height) shrink-0 items-center gap-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-3 px-4 py-2 lg:gap-4 lg:px-6 lg:py-3">
        <SidebarTrigger
          className="-ml-1"
          aria-label="Toggle sidebar navigation"
          title="Open or close navigation"
        />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="min-w-0">
          {role === "student" && (
            <Badge className="mb-1 bg-orange-100/90 text-orange-500">Daily Streak +7</Badge>
          )}
          <h1 className="truncate text-lg font-bold text-slate-800 sm:text-xl">Learning Pulse</h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {role === "student" && (
            <div className="hero-ring-widget relative">
              <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
                <circle cx="36" cy="36" r="28" fill="none" stroke="#EAF2FF" strokeWidth="8" />
                <circle
                  cx="36"
                  cy="36"
                  r="28"
                  fill="none"
                  stroke="#0B5FFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="117 175"
                  transform="rotate(-90 36 36)"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="28"
                  fill="none"
                  stroke="#FF9600"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="46 175"
                  transform="rotate(25 36 36)"
                />
              </svg>
              <span className="hero-ring-widget__value">67%</span>
            </div>
          )}
          <Button
            className="cta-circle-btn text-white"
            size="icon-lg"
            aria-label="Boost progress"
            title="Boost progress"
          >
            <IconSparkles className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
