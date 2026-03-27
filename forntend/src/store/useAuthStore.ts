import { create } from "zustand"
import { toast } from "sonner"

interface User {
  _id: string
  email: string
  fullName: string
  role: "teacher" | "student" | "admin"
  gradeLevel?: number
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  message:string | null
}

function getStoredUser(): User | null {
  const storedUser = localStorage.getItem("user")

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem("user")
    return null
  }
}

function inferRoleFromEmail(email: string): User["role"] {
  const loweredEmail = email.toLowerCase()

  if (loweredEmail.includes("admin")) {
    return "admin"
  }

  if (loweredEmail.includes("teacher") || loweredEmail.includes("instructor")) {
    return "teacher"
  }

  return "student"
}

function inferGradeLevelFromEmail(email: string): number {
  const loweredEmail = email.toLowerCase()

  if (loweredEmail.includes("grade12") || loweredEmail.includes("g12")) {
    return 12
  }

  if (loweredEmail.includes("grade11") || loweredEmail.includes("g11")) {
    return 11
  }

  if (loweredEmail.includes("grade10") || loweredEmail.includes("g10")) {
    return 10
  }

  return 9
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  message:null,

  login: async (email, password) => {
    set({ loading: true, error: null })

    if (!email.trim()) {
      const message = "Email is required"
      set({ loading: false, error: message })
      toast.error(message)
      return false
    }

    if (!password.trim()) {
      const message = "Password is required"
      set({ loading: false, error: message })
      toast.error(message)
      return false
    }

    // Frontend-only auth mode: allows UI development without backend dependency.
    const role = inferRoleFromEmail(email)
    const namePart = email.split("@")[0]?.replace(/[._-]/g, " ") || "Frontend User"
    const fullName = namePart
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    const user: User = {
      _id: `mock-${Date.now()}`,
      email,
      fullName,
      role,
      gradeLevel: role === "student" ? inferGradeLevelFromEmail(email) : undefined,
    }
    const token = `mock-token-${role}`
    const message = `Logged in as ${role} (frontend mode)`

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    set({
      token,
      user,
      loading: false,
      message,
      error: null,
    })

    toast.success(message)
    return true
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, token: null, error: null, message: null })
    toast.success("Logged out")
  },
}))