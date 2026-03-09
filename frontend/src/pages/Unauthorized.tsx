import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-400 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">
          You don't have permission to view this page.
        </p>
        <Link
          to="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
