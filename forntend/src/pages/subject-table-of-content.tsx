import { ChartRadialText } from "@/components/chart-radial-text"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";

import items from "./sampleDatas/tableOfContent.json";

// const items = [
//   {
//     value: "billing",
//     trigger: "How does billing work?",
//     content:
//       "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members.",
//   },
//   {
//     value: "security",
//     trigger: "Is my data secure?",
//     content:
//       "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols.",
//   },
//   {
//     value: "integration",
//     trigger: "What integrations do you support?",
//     content:
//       "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
//   },
//   {
//     value: "integration2",
//     trigger: "What integrations do you support?2",
//     content:
//       "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
//   },
//   {
//     value: "integration3",
//     trigger: "What integrations do you support?3",
//     content:[

//       {
//         subaValue:"integration3.1",
//         subTrigger:"What integrations do you support?3.1",
//         suContent:"We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks."
//       },
//       {
//         subaValue:"integration4.1",
//         subTrigger:"What integrations do you support?4.1",
//         suContent:"We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks."
//       },
//     ]
//   },
//   {
//     value: "integration4",
//     trigger: "What integrations do you support?4",
//     content:
//       "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
//   },
//   {
//     value: "integration5",
//     trigger: "What integrations do you support?5",
//     content:
//       "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
//   },
 
// ]
interface AccordionNode {
  value: string;
  title: string;
  content?: string;
  children?: AccordionNode[];
}

interface RecursiveAccordionProps {
  items: AccordionNode[];
  level?: number;
}




export default function SubjectTableOfContent() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <h1 className="text-xl font-bold tracking-tight md:text-xl">
            Subject
          </h1>
       
        </div>
        <div className="flex w-full h-full  justify-center mt-20 ">
          <div className="w-full  max-h-[70vh] overflow-y-auto overflow-x-hidden p-4">
          {/* coll */}
            <RecursiveAccordion items={items} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="w-full h-full flex items-center justify-center">

        <ChartRadialText/>  
        </div>
      </div>
    </div>
  )
}






export function RecursiveAccordion({
  items,
  level = 0,
}: RecursiveAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full pl-4">
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={`border-b last:border-b-0 pl-${level * 4}`}
        >

        {item.children && item.children.length > 0 ? (
          <>
            <AccordionTrigger>
              <span className={`font-medium ${level === 0 ?'':'text-sm'} ${level === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{item.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <RecursiveAccordion
                items={item.children}
                level={level + 1}
              />
            </AccordionContent>
          </>
     
            ):
            item.content && (
              <div className="w-full h-full py-2 flex items-center">

              <p className="text-sm text-muted-foreground mb-2">
                <Link to={`/student-study/${item.content}`} className="text-primary hover:underline">
                  {item.content}
                </Link>
              </p>
              </div>
            )
          
          }
        </AccordionItem>
      ))}
    </Accordion>
  );
}



