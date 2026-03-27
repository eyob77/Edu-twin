import * as React from "react"
import {
  IconShield,
  IconAward,
  IconBrain,
  IconBook2,
  IconChartBar,
  IconClipboardCheck,
  IconChecklist,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconFileCheck,
  IconSparkles,
  IconTargetArrow,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react"


import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react";

const studentNavMain = [
  {
    title: "Textbook",
    url: "/student-textbooks",
    icon: IconBook2,
  },
  {
    title: "Canvas Lab",
    url: "/student-canvas-lab",
    icon: IconSparkles,
  },
  {
    title: "Practice Hub",
    url: "/student-practice-hub",
    icon: IconTargetArrow,
  },
  {
    title: "Quiz",
    url: "/student-quiz",
    icon: IconBrain,
  },
  {
    title: "Assignments",
    url: "/student-assignments",
    icon: IconFolder,
  },
  {
    title: "Leaderboard",
    url: "/student-leaderboard",
    icon: IconChartBar,
  },
]

const teacherNavMain = [
  {
    title: "Quiz",
    url: "/teacher-quiz",
    icon: IconBrain,
  },
  {
    title: "Assessments",
    url: "/teacher-assessments",
    icon: IconClipboardCheck,
  },
  {
    title: "Assignments",
    url: "/teacher-assignments",
    icon: IconChecklist,
  },
  {
    title: "Leaderboard",
    url: "/teacher-leaderboard",
    icon: IconAward,
  },
]

const adminNavMain = [
  {
    title: "Users",
    url: "/admin-users",
    icon: IconUsers,
  },
  {
    title: "Content Review",
    url: "/admin-content-review",
    icon: IconFileCheck,
  },
  {
    title: "System Settings",
    url: "/admin-system-settings",
    icon: IconShield,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = useAuthStore((state) => state.user?.role)

  const navMain = role === "teacher" ? teacherNavMain : role === "admin" ? adminNavMain : studentNavMain
  const dashboardUrl = role === "teacher" ? "/teacher-dashbored" : role === "admin" ? "/admin-dashbored" : "/student-dashboard"

  const {setOpen} = useSidebar();
  const {pathname} = useLocation();

 useEffect(() => {
  if (pathname.includes("student-table-content")) {
    setOpen(false);
  }else{
    setOpen(true)
  }
}, [pathname]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to={dashboardUrl}>
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">EduTwin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} dashboardUrl={dashboardUrl} dashboardTitle="Dashboard" />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
