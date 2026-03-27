import { useMemo, useState } from "react"
import { IconSearch, IconSparkles, IconX } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "react-router-dom"

type ChatMessage = {
  id: number
  role: "student" | "copilot"
  content: string
}

function generateTutorResponse(question: string, contexts: string[]) {
  const loweredQuestion = question.toLowerCase()
  const contextSummary = contexts.length
    ? `I used your selected context: ${contexts.slice(0, 2).join(" | ")}.`
    : "No context was selected, so this is a general explanation."

  if (loweredQuestion.includes("formula") || loweredQuestion.includes("equation")) {
    return `${contextSummary} Start by identifying known values, write the core formula, then isolate the unknown variable step by step.`
  }

  if (loweredQuestion.includes("difference") || loweredQuestion.includes("compare")) {
    return `${contextSummary} Compare them by purpose, key properties, and one real-world example for each concept.`
  }

  if (loweredQuestion.includes("summary") || loweredQuestion.includes("explain")) {
    return `${contextSummary} In short: the topic is about understanding rules, applying them consistently, and checking your reasoning with examples.`
  }

  return `${contextSummary} Good question. Break it into smaller parts, solve each part, then connect them to the main topic.`
}

export default function StudentStudyPage() {
  const { content, subject, chapter, topic } = useParams()
  const resolvedTopic = useMemo(() => {
    if (topic) {
      return topic
    }

    return content || "general-topic"
  }, [content, topic])

  const normalizedTopic = useMemo(() => resolvedTopic.replace(/-/g, " "), [resolvedTopic])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "copilot",
      content: "Highlight any sentence in the textbook, then ask me for explanation, summary, or examples.",
    },
  ])
  const [question, setQuestion] = useState("")
  const [extraContext, setExtraContext] = useState("")
  const [contexts, setContexts] = useState<string[]>([])

  const addSelectedContext = () => {
    const selectedText = window.getSelection()?.toString().trim()
    if (!selectedText || selectedText.length < 8) {
      return
    }

    setContexts((prev) => {
      if (prev.includes(selectedText)) {
        return prev
      }

      return [selectedText, ...prev].slice(0, 6)
    })
  }

  const addManualContext = () => {
    if (!extraContext.trim()) {
      return
    }

    setContexts((prev) => [extraContext.trim(), ...prev].slice(0, 6))
    setExtraContext("")
  }

  const removeContext = (contextValue: string) => {
    setContexts((prev) => prev.filter((item) => item !== contextValue))
  }

  const askCopilot = () => {
    if (!question.trim()) {
      return
    }

    const studentMessage: ChatMessage = {
      id: Date.now(),
      role: "student",
      content: question,
    }

    const tutorMessage: ChatMessage = {
      id: Date.now() + 1,
      role: "copilot",
      content: generateTutorResponse(question, contexts),
    }

    setMessages((prev) => [...prev, studentMessage, tutorMessage])
    setQuestion("")
  }

  return (
    <div className="h-[calc(100vh-65px)] overflow-hidden px-4 py-4 lg:px-6">
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="h-full overflow-hidden rounded-3xl border border-blue-100 bg-white/85 shadow-sm">
          <div className="flex items-center justify-between border-b border-blue-100 px-5 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Textbook Reader</p>
              <h2 className="text-xl font-bold text-slate-900 capitalize">{normalizedTopic}</h2>
              <div className="mt-1 flex flex-wrap gap-2">
                {subject && <Badge className="bg-blue-50 text-blue-600">Subject: {subject}</Badge>}
                {chapter && <Badge className="bg-orange-50 text-orange-500">Chapter: {chapter}</Badge>}
              </div>
            </div>
            <Button variant="outline" className="rounded-full" onClick={addSelectedContext}>
              <IconSearch className="size-4" />
              Add highlight to context
            </Button>
          </div>
          <div className="h-[calc(100%-84px)] overflow-y-auto p-6" onMouseUp={addSelectedContext}>
            <article className="prose prose-slate max-w-none text-slate-700">
              <h3>Core Idea</h3>
              <p>
                A strong learner does not just memorize facts. They connect definitions, examples,
                and problem-solving patterns. When you read this page, identify key terms and why
                each term matters in practical situations.
              </p>
              <h3>How To Study This Topic</h3>
              <p>
                Start with the concept map: definition, formula or rule, and one worked example.
                Then answer a question in your own words. If you get stuck, highlight the sentence
                and ask the coach to explain it with a simpler analogy.
              </p>
              <h3>Practice Pattern</h3>
              <p>
                1) Understand the question. 2) Choose the right principle. 3) Solve step-by-step.
                4) Validate your final answer. Repeat this loop daily to build long-term mastery.
              </p>
              <h3>Reflection Prompt</h3>
              <p>
                Write one thing you understand now, one confusing part, and one question to ask.
                This improves retention and makes support sessions highly effective.
              </p>
            </article>
          </div>
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white/88 shadow-sm">
          <div className="border-b border-blue-100 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Study Copilot</p>
            <h3 className="text-lg font-semibold text-slate-900">Ask about this topic</h3>
          </div>

          <div className="max-h-34 overflow-y-auto border-b border-blue-100 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {contexts.length === 0 && <p className="text-sm text-slate-500">No context added yet</p>}
              {contexts.map((context) => (
                <Badge key={context} className="max-w-full gap-1 bg-blue-50 text-blue-600">
                  <span className="truncate">{context}</span>
                  <IconX className="size-3 cursor-pointer" onClick={() => removeContext(context)} />
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={extraContext}
                onChange={(event) => setExtraContext(event.target.value)}
                placeholder="Add custom context"
              />
              <Button variant="outline" onClick={addManualContext}>Add</Button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl p-3 text-sm ${
                  message.role === "student"
                    ? "ml-8 bg-blue-600 text-white"
                    : "mr-8 bg-slate-100 text-slate-700"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="border-t border-blue-100 px-4 py-3">
            <Textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask anything about the highlighted topic..."
              className="min-h-18"
            />
            <Button className="mt-2 w-full rounded-full" onClick={askCopilot}>
              <IconSparkles className="size-4" />
              Ask Study Copilot
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}