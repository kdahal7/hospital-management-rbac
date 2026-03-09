export type Role = 'USER' | 'ADMIN' | 'PATIENT' | 'DOCTOR'

export interface AuthUser {
  userId: number
  jwt: string
  roles: Role[]
}

export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  username: string
  password: string
  name: string
  roles: Role[]
}

export interface LoginResponse {
  jwt: string
  userId: number
  roles: Role[]
}

export interface SignupResponse {
  id: number
  username: string
}

export interface UserInfo {
  id: number
  username: string
  roles: Role[]
}
