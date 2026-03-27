import { useEffect, useMemo, useState } from "react"
import { IconBook2, IconChecklist, IconSparkles } from "@tabler/icons-react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAuthStore } from "@/store/useAuthStore"
import { getBooksForGrade } from "./sampleDatas/gradeTextbooks"

export default function StudentTextbooksPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const gradeLevel = useAuthStore((state) => state.user?.gradeLevel) || 9

  const books = getBooksForGrade(gradeLevel)
  const requestedSubject = searchParams.get("subject")
  const [selectedSubject, setSelectedSubject] = useState(requestedSubject || books[0]?.subject || "")

  useEffect(() => {
    if (!books.length) {
      return
    }

    const validSubject = books.some((book) => book.subject === requestedSubject)
    if (requestedSubject && validSubject) {
      setSelectedSubject(requestedSubject)
      return
    }

    if (!requestedSubject) {
      return
    }

    setSelectedSubject(books[0].subject)
  }, [books, requestedSubject])

  const activeBook = useMemo(
    () => books.find((book) => book.subject === selectedSubject) || books[0],
    [books, selectedSubject]
  )

  const totalTopics = useMemo(
    () => activeBook?.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0) || 0,
    [activeBook]
  )

  const selectSubject = (subject: string) => {
    setSelectedSubject(subject)
    const params = new URLSearchParams(searchParams)
    params.set("subject", subject)
    setSearchParams(params)
  }

  return (
    <div className="grid min-h-[calc(100vh-65px)] gap-4 p-4 lg:grid-cols-[0.5fr_1.1fr_0.7fr] lg:p-6">
      <div className="flex min-h-0 flex-col gap-4 rounded-3xl border border-blue-100 bg-white/90 p-4 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Grade {gradeLevel}</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">Textbook Sidebar</h2>
        </div>
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {books.map((book) => (
            <Button
              key={book.subject}
              variant={selectedSubject === book.subject ? "default" : "ghost"}
              className="w-full justify-start rounded-xl"
              onClick={() => selectSubject(book.subject)}
            >
              <IconBook2 className="size-4" />
              {book.subject}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-4 rounded-3xl border border-blue-100 bg-white/88 p-5 shadow-sm lg:p-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Table Of Content</p>
          <h1 className="text-2xl font-bold text-slate-900">{activeBook?.subject}</h1>
          <p className="text-sm text-slate-500">Open chapters and choose a topic to start reading.</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-blue-100 bg-slate-50/70 p-4">
          <Accordion type="multiple" className="w-full">
            {activeBook?.chapters.map((chapter) => (
              <AccordionItem key={chapter.id} value={chapter.id}>
                <AccordionTrigger>
                  <span className="font-semibold text-slate-900">{chapter.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pl-2">
                    {chapter.topics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant="ghost"
                        className="w-full justify-start rounded-xl text-left text-slate-700 hover:bg-blue-50"
                        onClick={() => navigate(`/student-study/${activeBook.subject}/${chapter.title}/${topic.title}`)}
                      >
                        {topic.title}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="hidden min-h-0 flex-col gap-4 rounded-3xl border border-blue-100 bg-linear-to-b from-blue-50 via-white to-orange-50 p-5 shadow-sm lg:flex">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Active Subject</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{activeBook?.subject}</h2>
          <p className="mt-1 text-sm text-slate-500">Enhanced table-of-content view with chapter and topic focus.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-blue-100 bg-white/90 p-3">
            <p className="text-xs text-slate-500">Chapters</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{activeBook?.chapters.length || 0}</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white/90 p-3">
            <p className="text-xs text-slate-500">Topics</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalTopics}</p>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-blue-100 bg-white/90 p-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <IconSparkles className="size-4 text-blue-600" />
            Better study flow
          </div>
          <p>Open one topic at a time, ask study copilot questions, then move to canvas models from the separate Canvas Lab page.</p>
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <IconChecklist className="size-4 text-orange-500" />
            Suggested routine
          </div>
          <p>Read chapter topic, ask one clarifying question, then solve one related quiz or assignment.</p>
          <Button
            className="mt-2 w-full rounded-full"
            onClick={() => navigate(`/student-practice-hub?subject=${encodeURIComponent(activeBook?.subject || "")}`)}
          >
            <IconSparkles className="size-4" />
            Open Practice Hub
          </Button>
        </div>
      </div>
    </div>
  )
}
