'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Aperture, Ghost, PartyPopper } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [FunnyIconComponent, setFunnyIconComponent] = useState<typeof Rocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const icons = [Rocket, Aperture, Ghost, PartyPopper];
    setFunnyIconComponent(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, rememberMe }),
      });

      router.push('/'); // Redirect to main page on successful login
    } catch (err: unknown) {
      console.error("Login error: ", err);
      let errorMessage = 'ログインに失敗しました。もう一度お試しください。';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-10 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          {FunnyIconComponent && <FunnyIconComponent size={64} className="text-amber-500 animate-bounce" />}
        </div>
        <h2 className="text-4xl font-extrabold text-stone-800 mb-4 font-mono">ログイン！</h2>
        <p className="text-stone-600 mb-8 text-lg">
          魔法の言葉と秘密の呪文で、冒険の始まり！
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">メールアドレス</label>
            <input
              type="email"
              id="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all duration-200 text-stone-700 placeholder-stone-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">パスワード</label>
            <input
              type="password"
              id="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all duration-200 text-stone-700 placeholder-stone-400"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-stone-900">
              ログイン状態を維持する
            </label>
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors duration-200 shadow-md text-lg transform hover:scale-105"
          >
            冒険へ出発！
          </button>
        </form>

        <p className="text-stone-500 text-sm mt-8">
          {/* Removed fixed credentials hint as we are now using Firebase Auth */}
        </p>
      </div>
    </div>
  );
}
