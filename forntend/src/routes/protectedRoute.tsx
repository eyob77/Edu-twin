import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("teacher" | "student" | "admin")[]
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, token } = useAuthStore()

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />
  }

  // Role restriction
  if (allowedRoles && user && allowedRoles.includes(user.role)) {
    return <>{children}</>
  }
  return <Navigate to="/unauthorized" />

}