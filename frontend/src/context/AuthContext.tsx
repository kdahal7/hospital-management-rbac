import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { AuthUser, Role } from '../types/auth'

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  hasRole: (role: Role) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const loadUserFromStorage = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUserFromStorage)

  const login = useCallback((authUser: AuthUser) => {
    localStorage.setItem('jwt', authUser.jwt)
    localStorage.setItem('user', JSON.stringify(authUser))
    setUser(authUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const hasRole = useCallback(
    (role: Role) => user?.roles.includes(role) ?? false,
    [user]
  )

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
