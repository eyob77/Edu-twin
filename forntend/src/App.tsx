// import LoginPage from "./pages/loginPage"

import { Route, Routes } from "react-router-dom"
import StudentPage from "./pages/studentPage"
import TeacherPage from "./pages/teacherPage"
import SubjectTableOfContent from "./pages/subject-table-of-content"
import SidebarProviderComponent from "./components/sidebarProvider"
import StudentStudyPage from "./pages/studentStudyPage"




function App() {

  return (
    <div className="h-full w-full">
      <Routes>
          {/* make student dash bored reponsive */}
          <Route element={<SidebarProviderComponent />}>

            <Route path="/student-dashbored" element={<StudentPage />} />
            <Route path="/student-table-content" element={<SubjectTableOfContent />} />
            <Route path="/student-study" element={<StudentStudyPage />} />


            <Route path="/teacher-dashbored" element={<TeacherPage />} />
          </Route>


      </Routes>
    </div>
  )
}

export default App
