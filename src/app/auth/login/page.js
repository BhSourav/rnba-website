import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="max-w-md w-full"><div className="bg-white rounded-2xl shadow-xl p-8 text-center">Loading...</div></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
