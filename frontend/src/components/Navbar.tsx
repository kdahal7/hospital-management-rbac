import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        Auth RBAC App
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-indigo-200">
              {user.roles.join(', ')} — {String(user.userId)}
            </span>
            <Link to="/dashboard" className="hover:text-indigo-200 text-sm">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 text-sm font-medium px-3 py-1 rounded hover:bg-indigo-50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-200 text-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-indigo-600 text-sm font-medium px-3 py-1 rounded hover:bg-indigo-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
