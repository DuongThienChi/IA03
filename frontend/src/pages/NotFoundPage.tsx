import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="mx-auto w-full max-w-xl space-y-4 text-center">
      <h2 className="text-3xl font-semibold text-slate-900">Page not found</h2>
      <p className="text-slate-600">We couldn&apos;t find what you were looking for.</p>
      <div className="flex justify-center">
        <Link
          to="/"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
