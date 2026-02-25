
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Mic, ArrowUp } from "lucide-react"

export function CopilotInput() {
  const [value, setValue] = useState("")

  const handleSend = () => {
    if (!value.trim()) return
    console.log(value)
    setValue("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="
          rounded-2xl
          border
          bg-background
          shadow-sm
          transition-all
          focus-within:ring-2
          focus-within:ring-ring
          p-4
        "
      >
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything"
          rows={2}
          className="
            resize-none
            border-0
            shadow-none
            focus-visible:ring-0
            text-sm
            p-0
          "
        />

        <div className="flex items-center justify-between mt-3">
          
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          {/* Send Button */}
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