import { IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

export function SectionCards({
  subjectData,
  to,
  linkType = "path",
  queryKey = "subject",
}: any) {

  const createLink = (title: string) => {
    if (linkType === "query") {
      return `/${to}?${queryKey}=${encodeURIComponent(title)}`
    }

    return `/${to}/${title}`
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {subjectData?.map((item:any,index:number) => (
        <Link to={createLink(item.title)} key={index}>
          <Card className="@container/card gap-4 py-5 transition-transform duration-200 hover:-translate-y-0.5" >
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg font-semibold text-slate-900 @[250px]/card:text-xl">
                {item.title}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="bg-blue-50 text-blue-600">
                  <IconTrendingUp />
                  Active
                </Badge>
              </CardAction>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-blue-100">
              <img src={item.image} alt={item.title} className="h-28 w-full object-cover"/>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
            <div className="text-sm text-slate-500">
              {item.description}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Tap to open</p>
          </CardFooter>
        </Card>
      </Link>
      ))}
    </div>
  )
}
