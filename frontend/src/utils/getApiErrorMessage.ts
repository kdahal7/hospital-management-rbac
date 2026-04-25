import axios from 'axios'

type ApiErrorPayload = {
  error?: string
  message?: string
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  if (!error.response) {
    return 'Cannot reach the backend API. Check VITE_API_BASE_URL and CORS settings.'
  }

  const payload = error.response.data as ApiErrorPayload | string | undefined

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (payload.error && payload.error.trim()) {
      return payload.error
    }

    if (payload.message && payload.message.trim()) {
      return payload.message
    }
  }

  return `${fallback} (HTTP ${error.response.status})`
}