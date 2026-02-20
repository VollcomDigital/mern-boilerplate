import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useRegister } from '../hooks/useAuth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register.mutate({ name, email, password });
  };

  const errorMessage =
    register.error && axios.isAxiosError(register.error)
      ? (register.error.response?.data?.error ?? 'Registration failed')
      : register.error?.message;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Start building with the MERN stack</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            autoComplete="new-password"
          />

          <Button type="submit" isLoading={register.isPending} className="w-full">
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
