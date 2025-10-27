import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { registerUser, type RegisterPayload, type RegisterResponse } from '../api/user';

export function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = useForm<RegisterPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending, error } = useMutation<
    RegisterResponse,
    unknown,
    RegisterPayload
  >({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      setSuccessMessage(`Account created for ${data.user.email}`);
      form.reset({ email: variables.email, password: '' });
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSuccessMessage(null);
    await mutateAsync(values);
  });

  const apiErrorMessage = (() => {
    if (!error) return null;
    if (isAxiosError<{ message?: string | string[] }>(error)) {
      const message = error.response?.data?.message;
      if (Array.isArray(message)) {
        return message.join(' ');
      }
      if (typeof message === 'string') {
        return message;
      }
      return 'Registration failed. Please try again.';
    }
    return 'Something went wrong. Please try again.';
  })();

  return (
    <section className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-slate-900">Create your account</h2>
        <p className="text-sm text-slate-600">
          Register with your email address. Passwords are securely hashed in the backend.
        </p>
      </header>

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...form.register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-300"
        >
          {isPending ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      {apiErrorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiErrorMessage}
        </div>
      )}

      {successMessage && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}
    </section>
  );
}
