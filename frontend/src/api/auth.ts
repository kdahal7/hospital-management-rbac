import api from './axios'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data)
  return response.data
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>('/auth/signup', data)
  return response.data
}

export const getPublicInfo = async () => {
  const response = await api.get('/public/welcome')
  return response.data
}

export const getUserDashboard = async () => {
  const response = await api.get('/user/dashboard')
  return response.data
}

export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard')
  return response.data
}
