// import LoginPage from "./pages/loginPage"

import { Route, Routes } from "react-router-dom"
import StudentPage from "./pages/studentPage"
import TeacherPage from "./pages/teacherPage"
import SubjectTableOfContent from "./pages/subject-table-of-content"




function App() {

  return (
    <div className="h-full w-full">
      <Routes>
          {/* make student dash bored reponsive */}
          <Route path="/student-dashbored" element={<StudentPage />} />
          <Route path="/teacher-dashbored" element={<TeacherPage />} />
          <Route path="/student-table-content" element={<SubjectTableOfContent />} />


      </Routes>
    </div>
  )
}

export default App
