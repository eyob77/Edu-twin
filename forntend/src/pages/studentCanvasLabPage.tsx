import { useEffect, useMemo, useRef, useState } from "react"
import { IconCube, IconPencil, IconRefresh, IconRotate2 } from "@tabler/icons-react"
import { useSearchParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/useAuthStore"
import { getBooksForGrade } from "./sampleDatas/gradeTextbooks"

function projectPoint(x: number, y: number, z: number, angle: number, size: number) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  const rx = x * cos - z * sin
  const rz = x * sin + z * cos

  const perspective = 220 / (220 + rz)
  return {
    x: rx * perspective * size,
    y: y * perspective * size,
  }
}

export default function StudentCanvasLabPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedSubject = searchParams.get("subject") || "General"
  const selectedTopic = searchParams.get("topic") || "Concept Model"
  const gradeLevel = useAuthStore((state) => state.user?.gradeLevel) || 9
  const books = getBooksForGrade(gradeLevel)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mode, setMode] = useState<"2d" | "3d">("2d")
  const [amplitude, setAmplitude] = useState(60)
  const [frequency, setFrequency] = useState(2)
  const [rotation, setRotation] = useState(0.8)

  const points3d = useMemo(
    () => [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ],
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    let animationFrame = 0
    let time = 0

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = "#f8fbff"
      ctx.fillRect(0, 0, width, height)

      if (mode === "2d") {
        ctx.strokeStyle = "#0B5FFF"
        ctx.lineWidth = 3
        ctx.beginPath()
        for (let x = 0; x <= width; x += 1) {
          const ratio = x / width
          const y = height / 2 + Math.sin(ratio * Math.PI * frequency * 2 + time) * amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      } else {
        const centerX = width / 2
        const centerY = height / 2

        const projected = points3d.map(([x, y, z]) => {
          const point = projectPoint(x, y, z, rotation + time * 0.01, 95)
          return [centerX + point.x, centerY + point.y] as const
        })

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
        ]

        ctx.strokeStyle = "#0B5FFF"
        ctx.lineWidth = 2.2

        edges.forEach(([a, b]) => {
          ctx.beginPath()
          ctx.moveTo(projected[a][0], projected[a][1])
          ctx.lineTo(projected[b][0], projected[b][1])
          ctx.stroke()
        })
      }

      time += 0.04
      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animationFrame)
  }, [amplitude, frequency, mode, points3d, rotation])

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Canvas Topic Lab</CardTitle>
            <CardDescription>
              Interact with 2D and 3D models to understand subject concepts visually.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge className="bg-blue-50 text-blue-600">Subject: {selectedSubject}</Badge>
            <Badge className="bg-orange-50 text-orange-500">Topic: {selectedTopic}</Badge>
            <Button
              className="rounded-full px-4"
              variant={mode === "2d" ? "default" : "outline"}
              onClick={() => setMode("2d")}
            >
              <IconPencil className="size-4" />
              2D Canvas
            </Button>
            <Button
              className="rounded-full px-4"
              variant={mode === "3d" ? "default" : "outline"}
              onClick={() => setMode("3d")}
            >
              <IconCube className="size-4" />
              3D Model
            </Button>
            <Button variant="outline" className="rounded-full px-4" onClick={() => setRotation((prev) => prev + 0.35)}>
              <IconRotate2 className="size-4" />
              Rotate
            </Button>
            <Button variant="outline" className="rounded-full px-4" onClick={() => { setAmplitude(60); setFrequency(2); setRotation(0.8) }}>
              <IconRefresh className="size-4" />
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-[1.2fr_0.8fr] lg:px-6">
        <Card>
          <CardContent className="p-4">
            <canvas
              ref={canvasRef}
              width={920}
              height={440}
              className="h-[52vh] w-full rounded-2xl border border-blue-100 bg-[#f8fbff]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Canvas Models by Chapter</CardTitle>
            <CardDescription>
              Choose a topic model, then tune interaction controls.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-64 space-y-3 overflow-y-auto rounded-2xl border border-blue-100 p-3">
              {books.map((book) => (
                <div key={book.subject}>
                  <p className="text-sm font-semibold text-slate-900">{book.subject}</p>
                  <div className="mt-2 space-y-2">
                    {book.chapters.map((chapter) => (
                      <div key={chapter.id} className="rounded-xl bg-slate-50 p-2">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{chapter.title}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {chapter.topics.map((topic) => (
                            <Button
                              key={topic.id}
                              size="sm"
                              variant="outline"
                              className="rounded-full text-xs"
                              onClick={() => {
                                const newParams = new URLSearchParams(searchParams)
                                newParams.set("subject", book.subject)
                                newParams.set("topic", topic.title)
                                setSearchParams(newParams)
                              }}
                            >
                              {topic.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Wave amplitude</span>
                <Badge className="bg-blue-50 text-blue-600">{amplitude}</Badge>
              </div>
              <Input
                type="range"
                min={20}
                max={120}
                value={amplitude}
                onChange={(event) => setAmplitude(Number(event.target.value))}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Wave frequency</span>
                <Badge className="bg-blue-50 text-blue-600">{frequency}</Badge>
              </div>
              <Input
                type="range"
                min={1}
                max={6}
                value={frequency}
                onChange={(event) => setFrequency(Number(event.target.value))}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">3D rotation base</span>
                <Badge className="bg-orange-50 text-orange-500">{rotation.toFixed(2)}</Badge>
              </div>
              <Input
                type="range"
                min={0}
                max={3}
                step={0.1}
                value={rotation}
                onChange={(event) => setRotation(Number(event.target.value))}
              />
            </div>

            <div className="rounded-2xl border border-blue-100 bg-slate-50 p-4 text-sm text-slate-600">
              Tip: use 2D mode for understanding motion and 3D mode for structure/geometry concepts.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
