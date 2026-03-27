import { useMemo, useState } from "react"
import { IconDeviceFloppy, IconPlus, IconTrash, IconUpload } from "@tabler/icons-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContentKind = "quiz" | "assignment" | "assessment"

type EditableItem = {
  id: number
  title: string
  detail: string
  points: number
}

type TeacherContentEditorPageProps = {
  kind: ContentKind
}

function getLabels(kind: ContentKind) {
  if (kind === "quiz") {
    return {
      title: "Quiz creation form",
      subtitle: "Create and edit quiz content with target classes and due date.",
      itemTitle: "Question",
      itemDetail: "Expected answer / explanation",
      targetDefault: "10A, 10B",
    }
  }

  if (kind === "assignment") {
    return {
      title: "Assignment creation form",
      subtitle: "Build assignment tasks with grading criteria and publishing options.",
      itemTitle: "Task",
      itemDetail: "Instructions / rubric criteria",
      targetDefault: "10A",
    }
  }

  return {
    title: "Assessment creation form",
    subtitle: "Prepare structured assessments and assign to selected students/classes.",
    itemTitle: "Assessment item",
    itemDetail: "Prompt / evaluation notes",
    targetDefault: "11S",
  }
}

export default function TeacherContentEditorPage({ kind }: TeacherContentEditorPageProps) {
  const labels = useMemo(() => getLabels(kind), [kind])
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    target: labels.targetDefault,
    dueDate: "",
    totalPoints: "100",
  })

  const [items, setItems] = useState<EditableItem[]>([
    {
      id: 1,
      title: "",
      detail: "",
      points: 10,
    },
  ])

  const setItemField = (id: number, field: keyof EditableItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        detail: "",
        points: 10,
      },
    ])
  }

  const removeItem = (id: number) => {
    setItems((prev) => {
      if (prev.length === 1) {
        toast.error("At least one item is required")
        return prev
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  const saveContent = (status: "draft" | "published") => {
    if (!form.title.trim()) {
      toast.error("Please enter a title")
      return
    }

    const hasEmptyItem = items.some((item) => !item.title.trim())
    if (hasEmptyItem) {
      toast.error("Each item needs a title")
      return
    }

    const key = `teacher-${kind}-items`
    const stored = localStorage.getItem(key)
    const existing = stored ? (JSON.parse(stored) as unknown[]) : []

    const payload = {
      id: Date.now(),
      ...form,
      status,
      items,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(key, JSON.stringify([payload, ...existing]))

    toast.success(status === "published" ? "Published successfully" : "Saved as draft")
    navigate(
      kind === "quiz"
        ? "/teacher-quiz"
        : kind === "assignment"
          ? "/teacher-assignments"
          : "/teacher-assessments"
    )
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>{labels.title}</CardTitle>
            <CardDescription>{labels.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Title</p>
                <Input
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder={`Enter ${kind} title`}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Target classes / students</p>
                <Input
                  value={form.target}
                  onChange={(event) => setForm((prev) => ({ ...prev, target: event.target.value }))}
                  placeholder="Ex: 10A, 10B or student IDs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Due date</p>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Total points</p>
                <Input
                  type="number"
                  value={form.totalPoints}
                  onChange={(event) => setForm((prev) => ({ ...prev, totalPoints: event.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Description</p>
              <Textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="Write clear instructions and grading notes"
                className="min-h-26"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Editable format</CardTitle>
            <CardDescription>
              Add, update, and remove {labels.itemTitle.toLowerCase()} entries before publishing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="space-y-3 rounded-2xl border border-blue-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">
                    {labels.itemTitle} {index + 1}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <IconTrash />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_100px]">
                  <Input
                    value={item.title}
                    onChange={(event) => setItemField(item.id, "title", event.target.value)}
                    placeholder={`${labels.itemTitle} title`}
                  />
                  <Input
                    type="number"
                    value={item.points}
                    onChange={(event) => setItemField(item.id, "points", Number(event.target.value))}
                    placeholder="Points"
                  />
                </div>

                <Textarea
                  value={item.detail}
                  onChange={(event) => setItemField(item.id, "detail", event.target.value)}
                  placeholder={labels.itemDetail}
                />
              </div>
            ))}

            <Button variant="outline" className="rounded-full" onClick={addItem}>
              <IconPlus />
              Add {labels.itemTitle.toLowerCase()}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardContent className="flex flex-wrap justify-end gap-3 px-6 py-5">
            <Button variant="outline" className="rounded-full px-5" onClick={() => saveContent("draft")}>
              <IconDeviceFloppy />
              Save draft
            </Button>
            <Button className="rounded-full px-5" onClick={() => saveContent("published")}>
              <IconUpload />
              Publish
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
