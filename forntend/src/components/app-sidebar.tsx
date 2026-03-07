import * as React from "react"
import {
  IconBrain,
  IconChartBar,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
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
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react";

const data = {
 
  navMain: [
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
    
  ],
 
  navSecondary: [
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

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
              <Link to="/student-dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
