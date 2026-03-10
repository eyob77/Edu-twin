import { create } from "zustand"
import { api } from "@/lib/axios"
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
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  message:string | null
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  message:null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      console.log("hi login")

      const response = await api.post("/users/login", {
        email,
        password,
      })
      console.log(response)
      

      const { token, user ,message } = response.data;
      console.log(user)

      // Save to localStorage
      localStorage.setItem("token", token)
      localStorage

      set({
        token,
        user,
        loading: false,
      });

      toast(message)


    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      })
    }
  },

  logout: async() => {
    console.log("hi")
    const response = await api.post("/users/logout");
    const {message} = response.data;
    toast(message);
    localStorage.removeItem("token");
    set({ user: null, token: null })
  },
}))