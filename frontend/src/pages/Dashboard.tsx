import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { getUserDashboard, getAdminDashboard, getPublicInfo } from '../api/auth'

export default function Dashboard() {
  const { user, hasRole } = useAuth()

  const publicQuery = useQuery({
    queryKey: ['public-info'],
    queryFn: getPublicInfo,
  })

  const userQuery = useQuery({
    queryKey: ['user-dashboard'],
    queryFn: getUserDashboard,
    enabled: hasRole('USER') || hasRole('PATIENT') || hasRole('ADMIN'),
  })

  const adminQuery = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: getAdminDashboard,
    enabled: hasRole('ADMIN'),
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Logged in as user #{user?.userId} with role(s):{' '}
            <span className="font-semibold text-indigo-600">{user?.roles.join(', ')}</span>
          </p>
        </div>

        {/* Public Content - visible to all */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-400">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Public Content</h2>
          {publicQuery.isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
          {publicQuery.isSuccess && (
            <p className="text-gray-600 text-sm">{publicQuery.data.message}</p>
          )}
          {publicQuery.isError && (
            <p className="text-red-500 text-sm">Failed to load public content.</p>
          )}
        </div>

        {/* User Content - USER, PATIENT, ADMIN */}
        {(hasRole('USER') || hasRole('PATIENT') || hasRole('ADMIN')) && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">User Content</h2>
            {userQuery.isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
            {userQuery.isSuccess && (
              <div className="space-y-2 text-sm text-gray-600">
                <p>{userQuery.data.message}</p>
                <p className="text-gray-500">{userQuery.data.content}</p>
              </div>
            )}
            {userQuery.isError && (
              <p className="text-red-500 text-sm">Failed to load user content.</p>
            )}
          </div>
        )}

        {/* Admin Content - ADMIN only */}
        {hasRole('ADMIN') && (
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-400">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Admin Content</h2>
            {adminQuery.isLoading && <p className="text-gray-400 text-sm">Loading...</p>}
            {adminQuery.isSuccess && (
              <div className="space-y-2 text-sm text-gray-600">
                <p>{adminQuery.data.message}</p>
                <p className="text-gray-500">{adminQuery.data.adminContent}</p>
              </div>
            )}
            {adminQuery.isError && (
              <p className="text-red-500 text-sm">Failed to load admin content.</p>
            )}
          </div>
        )}

        {/* Info card when role is USER (no admin section) */}
        {!hasRole('ADMIN') && (
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-500 border border-gray-200">
            Admin content is not available for your role.
          </div>
        )}
      </div>
    </div>
  )
}
