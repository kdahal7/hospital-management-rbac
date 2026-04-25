import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import type { LoginRequest } from '../types/auth'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login({ userId: data.userId, jwt: data.jwt, roles: data.roles })
      navigate('/dashboard')
    },
  })

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data)
  }

  const errorMessage = mutation.isError
    ? getApiErrorMessage(mutation.error, 'Invalid email or password. Please try again.')
    : ''

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>

        {mutation.isError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('username', { required: 'Email is required' })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {mutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
