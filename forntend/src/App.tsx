// import LoginPage from "./pages/loginPage"

import { Route, Routes } from "react-router-dom"
import StudentPage from "./pages/studentPage"
import TeacherPage from "./pages/teacherPage"
import SubjectTableOfContent from "./pages/subject-table-of-content"
import SidebarProviderComponent from "./components/sidebarProvider"
import StudentStudyPage from "./pages/studentStudyPage"
import AssignmentPage from "./pages/assignmentsPage"
import LoginPage from "./pages/loginPage"
import { Toaster } from "./components/ui/sonner"
import { ProtectedRoute } from "./routes/protectedRoute"
import NotFoundPage from "./routes/notFound"
import AssignmentListPage from "./pages/assignmentListPage"
import AssignmentDetailPage from "./pages/assignmentDetailPage"
import AssignmentContentPage from "./pages/assignmentContentPage"




function App() {

  return (
    <div className="h-screen w-full">
      <Toaster />
      <Routes>
          {/* make student dash bored reponsive */}
          <Route element={<SidebarProviderComponent />}>

            <Route path="/student-dashboard" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentPage />
              </ProtectedRoute>
            } />

            <Route path="/student-table-content/:subject" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <SubjectTableOfContent />
              </ProtectedRoute>
            } />

            <Route path="/student-study/:content" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentStudyPage />
              </ProtectedRoute>
            } />
            
            <Route path="/student-quiz" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <p>hi quiz</p>
              </ProtectedRoute>
            } />

            <Route path="/student-assignments" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <AssignmentPage/>
              </ProtectedRoute>
              } />

            <Route path="/assignments-list/:subject" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AssignmentListPage/>
              </ProtectedRoute>
              } />
            <Route path="/assignments-detail" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AssignmentDetailPage/>
              </ProtectedRoute>
              } />
            <Route path="/assignments-content" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AssignmentContentPage/>
              </ProtectedRoute>
              } />


            <Route path="/student-leaderboard" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <p>hi leaderboared</p>
              </ProtectedRoute>
              } />


            <Route path="/teacher-dashbored" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherPage />
              </ProtectedRoute>
              } />
            <Route path="/admin-dashbored" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <p>admin dashbored</p>
              </ProtectedRoute>
              } />
          </Route>

          <Route path="/unauthorized" element={<p>unauthorized</p>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage/>}/>


      </Routes>
    </div>
  )
}

export default App
