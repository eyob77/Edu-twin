import { useMemo, useState } from "react"
import { IconSparkles } from "@tabler/icons-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "react-router-dom"

type QuestionType = "mcq" | "short" | "true-false" | "fill-blank"

type GeneratedQuestion = {
  id: number
  type: QuestionType
  question: string
  options?: string[]
  answer: string
}

const questionTemplates = {
  mcq: [
    (topic: string, i: number) => ({
      question: `Which statement best explains ${topic} in scenario ${i + 1}?`,
      options: [
        `Core principle of ${topic}`,
        `Unrelated explanation`,
        `Opposite of ${topic}`,
        `Incomplete definition`,
      ],
      answer: `Core principle of ${topic}`,
    }),
  ],
  short: [
    (topic: string, i: number) => ({
      question: `In 2-3 sentences, explain ${topic} with one real example (${i + 1}).`,
      options: undefined,
      answer: `A strong answer defines ${topic}, explains why it matters, and includes one practical example.`,
    }),
  ],
  "true-false": [
    (topic: string, i: number) => ({
      question: `True or False: The main rule of ${topic} always applies in context ${i + 1}.`,
      options: undefined,
      answer: "True",
    }),
  ],
  "fill-blank": [
    (topic: string, i: number) => ({
      question: `Fill in the blank: The key concept in ${topic} is ________ (${i + 1}).`,
      options: undefined,
      answer: `${topic} core principle`,
    }),
  ],
} satisfies Record<QuestionType, Array<(topic: string, i: number) => { question: string; options?: string[]; answer: string }>>

export default function StudentPracticeHubPage() {
  const [searchParams] = useSearchParams()
  const presetSubject = searchParams.get("subject")

  const [topic, setTopic] = useState(presetSubject || "")
  const [questionType, setQuestionType] = useState<QuestionType>("mcq")
  const [questionCount, setQuestionCount] = useState(5)
  const [difficulty, setDifficulty] = useState("medium")
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([])
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([])

  const estimatedTime = useMemo(() => {
    const perQuestion = questionType === "short" ? 3 : 1
    return questionCount * perQuestion
  }, [questionCount, questionType])

  const generateQuestions = () => {
    if (!topic.trim()) {
      return
    }

    const template = questionTemplates[questionType][0]

    const questions = Array.from({ length: questionCount }, (_, index) => {
      const generated = template(topic, index)
      return {
        id: index + 1,
        type: questionType,
        question: generated.question,
        options: generated.options,
        answer: generated.answer,
      }
    })

    setGeneratedQuestions(questions)
    setRevealedAnswers([])
  }

  const toggleAnswer = (id: number) => {
    setRevealedAnswers((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Hub</CardTitle>
            <CardDescription>
              Generate AI-style practice questions by topic, type, and quantity.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2 xl:col-span-2">
              <p className="text-sm font-medium text-slate-700">Topic</p>
              <Input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Ex: Cell organelles, Newton laws, Trigonometry"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Question type</p>
              <Select value={questionType} onValueChange={(value) => setQuestionType(value as QuestionType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="short">Short Answer</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Number of questions</p>
              <Input
                type="number"
                min={1}
                max={20}
                value={questionCount}
                onChange={(event) => setQuestionCount(Math.max(1, Math.min(20, Number(event.target.value) || 1)))}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Difficulty</p>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="xl:col-span-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-50 text-blue-600">Est. time: {estimatedTime} min</Badge>
              <Badge className="bg-orange-50 text-orange-500">Level: {difficulty}</Badge>
              <Badge className="bg-slate-100 text-slate-700">Type: {questionType}</Badge>
            </div>

            <div className="xl:col-span-1 flex items-end justify-end">
              <Button className="w-full rounded-full xl:w-auto" onClick={generateQuestions}>
                <IconSparkles className="size-4" />
                Generate Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Questions</CardTitle>
            <CardDescription>
              Interactive practice set based on your selected topic and settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {generatedQuestions.length === 0 && (
              <p className="rounded-2xl border border-blue-100 bg-slate-50 p-4 text-sm text-slate-500">
                No questions generated yet. Enter a topic and click Generate Questions.
              </p>
            )}

            {generatedQuestions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-blue-100 p-4">
                <p className="font-semibold text-slate-900">Q{item.id}. {item.question}</p>

                {item.options && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {item.options.map((option) => (
                      <Button key={option} variant="outline" className="justify-start rounded-xl text-left">
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => toggleAnswer(item.id)}>
                    {revealedAnswers.includes(item.id) ? "Hide Answer" : "Show Answer"}
                  </Button>
                  {revealedAnswers.includes(item.id) && (
                    <Badge className="bg-emerald-50 text-emerald-600">Answer: {item.answer}</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
