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
import QuizPage from "./pages/quizPage"
import QuizDashboard from "./pages/quizListPage"
import AssessmentGateway from "./pages/quizContentPage"
import QuizSession from "./pages/quizSessionPage"
import ReviewResults from "./pages/quizResultReview"
import TeacherQuizPage from "./pages/teacherQuizPage"
import TeacherAssignmentsPage from "./pages/teacherAssignmentsPage"
import TeacherLeaderboardPage from "./pages/teacherLeaderboardPage"
import TeacherAssessmentsPage from "./pages/teacherAssessmentsPage"
import TeacherContentEditorPage from "./pages/teacherContentEditorPage"
import StudentCanvasLabPage from "./pages/studentCanvasLabPage"
import StudentTextbooksPage from "./pages/studentTextbooksPage"
import StudentPracticeHubPage from "./pages/studentPracticeHubPage"
import StudentLeaderboardPage from "./pages/studentLeaderboardPage"
import AdminPage from "./pages/adminPage"
import AdminUsersPage from "./pages/adminUsersPage"
import AdminContentReviewPage from "./pages/adminContentReviewPage"
import AdminSystemSettingsPage from "./pages/adminSystemSettingsPage"




function App() {

  return (
    <div className="app-shell w-full">
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
            <Route path="/student-study/:subject/:chapter/:topic" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentStudyPage />
              </ProtectedRoute>
            } />
            <Route path="/student-textbooks" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentTextbooksPage />
              </ProtectedRoute>
            } />
            <Route path="/student-canvas-lab" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentCanvasLabPage />
              </ProtectedRoute>
            } />
            <Route path="/student-practice-hub" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentPracticeHubPage />
              </ProtectedRoute>
            } />
            
            <Route path="/student-quiz" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <QuizPage/>
              </ProtectedRoute>
            } />
            <Route path="/quiz-list/:subject" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <QuizDashboard/>
              </ProtectedRoute>
            } />
            <Route path="/quiz-session" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <QuizSession/>
              </ProtectedRoute>
            } />
            <Route path="/quiz-review" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <ReviewResults/>
              </ProtectedRoute>
            } />
            <Route path="/quiz-content" element={
              <ProtectedRoute allowedRoles={["student"]}>

                <AssessmentGateway/>
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
                <StudentLeaderboardPage />
              </ProtectedRoute>
              } />


            <Route path="/teacher-dashbored" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherPage />
              </ProtectedRoute>
              } />
            <Route path="/teacher-quiz" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherQuizPage />
              </ProtectedRoute>
              } />
            <Route path="/teacher-quiz/create" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherContentEditorPage kind="quiz" />
              </ProtectedRoute>
              } />
            <Route path="/teacher-assessments" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherAssessmentsPage />
              </ProtectedRoute>
              } />
            <Route path="/teacher-assessments/create" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherContentEditorPage kind="assessment" />
              </ProtectedRoute>
              } />
            <Route path="/teacher-assignments" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherAssignmentsPage />
              </ProtectedRoute>
              } />
            <Route path="/teacher-assignments/create" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherContentEditorPage kind="assignment" />
              </ProtectedRoute>
              } />
            <Route path="/teacher-leaderboard" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherLeaderboardPage />
              </ProtectedRoute>
              } />
            <Route path="/admin-dashbored" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
              } />
            <Route path="/admin-users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsersPage />
              </ProtectedRoute>
              } />
            <Route path="/admin-content-review" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminContentReviewPage />
              </ProtectedRoute>
              } />
            <Route path="/admin-system-settings" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSystemSettingsPage />
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
