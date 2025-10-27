import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="text-lg font-semibold text-blue-600">
            IA03 Auth
          </NavLink>
          <nav className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-700 hover:bg-blue-600/20'
                }`
              }
            >
              Sign Up
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-4xl flex-1 flex-col px-4 py-10">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} IA03 Registration Demo.
        </div>
      </footer>
    </div>
  );
}
