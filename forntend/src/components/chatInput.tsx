import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Mic, ArrowUp, X, Brain } from "lucide-react"

export function CopilotInput() {
  const [value, setValue] = useState("")
  const [contextEnabled, setContextEnabled] = useState(false)
  const [model, setModel] = useState("GPT-4o")

  const handleSend = () => {
    if (!value.trim()) return

    console.log({
      message: value,
      context: contextEnabled,
      model,
    })

    setValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full h-full max-w-2xl">
      <div className="rounded-sm border bg-background shadow-sm p-4 space-y-3">

        {/* Top Controls (Model + Context) */}
        <div className="flex items-center justify-between">

          {/* Model Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Brain className="h-4 w-4" />
                {model}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setModel("GPT-4o")}>
                GPT-4o
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModel("GPT-4.1")}>
                GPT-4.1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModel("Claude 3.5")}>
                Claude 3.5
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Context Toggle */}
          <div className="flex items-center gap-2">
            {contextEnabled && (
              <Badge
                variant="secondary"
                className="flex items-center gap-2"
              >
                Current File Context
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setContextEnabled(false)}
                />
              </Badge>
            )}

            {!contextEnabled && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setContextEnabled(true)}
              >
                + Add Context
              </Button>
            )}
          </div>
        </div>
        {/* Textarea */}
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Copilot..."
          rows={2}
          className="resize-none border-0 shadow-none focus-visible:ring-0 text-sm p-0"
        />

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">

          {/* Left Icons */}
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Plus className="h-4 w-4" />
            </Button>

            <Button size="icon" variant="ghost" className="rounded-full">
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          {/* Send */}
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!value.trim()}
            className="rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}