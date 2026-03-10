import { ChevronRight, Calendar, FileText, Clock, LayoutGrid, ListFilter, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

export default function AssignmentListPage(){
  const assignments = [
    { id: 1, title: "Newtonian Mechanics Problem Set", dueDate: "Oct 24, 2026", status: "Pending", type: "Problem Set", points: 100 },
    { id: 2, title: "Electromagnetism Lab Report", dueDate: "Oct 20, 2026", status: "Submitted", type: "Lab", points: 50 },
    { id: 3, title: "Thermodynamics Quiz", dueDate: "Oct 15, 2026", status: "Graded", type: "Quiz", points: 20 },
    { id: 4, title: "Quantum Mechanics Essay", dueDate: "Nov 02, 2026", status: "Pending", type: "Essay", points: 150 },
    { id: 5, title: "Optics Lab Experiment", dueDate: "Nov 10, 2026", status: "Pending", type: "Lab", points: 80 },
    { id: 6, title: "Astrophysics Midterm", dueDate: "Oct 30, 2026", status: "Graded", type: "Exam", points: 200 }
  ];

  const pendingAssignments = assignments.filter(a => a.status === "Pending");
  const completedAssignments = assignments.filter(a => a.status !== "Pending");

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 lg:p-14 space-y-10">
      <div className="max-w-350 mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8">
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Subjects
            </Button>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Physics Assignments</h1>
            <p className="text-lg text-muted-foreground italic">Course Instructor: Dr. Aris Thorne</p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Course Progress</p>
              <p className="text-xs text-muted-foreground">8 of 12 assignments finished</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent flex items-center justify-center font-bold text-sm text-primary">
              85%
            </div>
          </div>
        </div>

        {/* Tabs System */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-8">
            <TabsList className="h-12 p-1 bg-slate-200/60 dark:bg-zinc-800 backdrop-blur-sm rounded-xl">
              <TabsTrigger value="all" className="px-8 text-sm font-medium rounded-lg">All Tasks ({assignments.length})</TabsTrigger>
              <TabsTrigger value="pending" className="px-8 text-sm font-medium rounded-lg">Pending ({pendingAssignments.length})</TabsTrigger>
              <TabsTrigger value="completed" className="px-8 text-sm font-medium rounded-lg">Completed ({completedAssignments.length})</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
              <Button variant="outline" size="sm" className="bg-white dark:bg-zinc-900 rounded-lg">
                <ListFilter className="mr-2 h-4 w-4" /> Sort
              </Button>
              <Button variant="outline" size="sm" className="bg-white dark:bg-zinc-900 rounded-lg">
                <LayoutGrid className="mr-2 h-4 w-4" /> Layout
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0 outline-none">
            <AssignmentGrid data={assignments} />
          </TabsContent>
          <TabsContent value="pending" className="mt-0 outline-none">
            <AssignmentGrid data={pendingAssignments} />
          </TabsContent>
          <TabsContent value="completed" className="mt-0 outline-none">
            <AssignmentGrid data={completedAssignments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const AssignmentGrid = ({ data }: { data: any[] }) => {
  const navigate = useNavigate();
  if (data.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-3xl bg-white/50 dark:bg-zinc-900/50">
      <FileText className="h-12 w-12 mb-4 opacity-20" />
      <p>No assignments found in this category.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {data.map((assignment) => (
        <Card key={assignment.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FileText className="h-6 w-6" />
              </div>
              <StatusBadge status={assignment.status} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate("/assignments-detail")}>
                {assignment.title}
              </CardTitle>
              <Badge variant="secondary" className="mt-3 font-normal bg-slate-100 dark:bg-zinc-800">{assignment.type}</Badge>
            </div>
            <div className="pt-6 border-t flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium"><Calendar className="h-3.5 w-3.5 text-primary" /> {assignment.dueDate}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium"><Clock className="h-3.5 w-3.5 text-primary" /> {assignment.points} Points</div>
              </div>
              <Button variant="outline" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all" onClick={() => navigate("/assignments-detail")}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
    Submitted: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
    Graded: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
  };
  return <Badge variant="outline" className={`${styles[status]} px-3 py-1 font-semibold rounded-lg`}>{status}</Badge>;
};