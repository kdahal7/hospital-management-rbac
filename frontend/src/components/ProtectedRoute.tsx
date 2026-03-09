import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Role } from '../types/auth'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  requiredRole?: Role
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, hasRole } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && !hasRole(requiredRole) && !hasRole('ADMIN')) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
