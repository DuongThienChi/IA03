import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Welcome
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Simple registration experience
        </h1>
        <p className="max-w-2xl text-slate-600">
          Sign up to create an account or explore the login flow.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/signup"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Create your account
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-md border border-blue-100 px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
}
