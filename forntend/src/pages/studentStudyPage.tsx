import { CopilotInput } from "@/components/chatInput";

export default function StudentStudyPage() {
  return (
    // Top-level container: Fixed to screen height, no global scroll
    <div className="flex flex-col h-[calc(100vh-65px)]  w-full overflow-hidden bg-gray-100">
      

      {/* 2. THE MAIN AREA (Fills remaining height) */}
      <div className="flex-1 flex overflow-hidden"> 
        {/* We use a flex row here instead of a grid for better control, 
            but grid-cols-4 works too if you prefer */}
        <div className="grid grid-cols-4 w-full h-full">
          
          {/* LEFT: Scrollable A4 Container */}
          <div className="col-span-3 h-full overflow-y-auto border-r border-gray-200">
            <A4Page />
          </div>

          {/* RIGHT: Fixed Sidebar */}
          <div className="col-span-1 h-full flex flex-col bg-white">
            
            {/* Top Sidebar Area (Scrollable if messages/content get long) */}
            <div className="flex-1 overflow-y-auto p-4 border-b">
              <p className="text-xs uppercase text-gray-400 font-bold mb-4">Chat</p>
              {/* Content goes here */}
            </div>

            {/* Bottom Input (Stay put and Responsive) */}
            <div className="p-4 bg-white shrink-0">
              <CopilotInput />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function A4Page() {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="bg-white w-[210mm] min-h-[297mm] p-[25mm] shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold">A4 Document</h1>
        <p className="mt-4 text-gray-600">
          This container now accounts for the header height. 
          Only this document area will scroll.
        </p>
      </div>
    </div>
  );
}