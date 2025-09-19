'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, BarChart3, Edit3, Calendar, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'main', label: 'メイン', icon: FileText, href: '/' },
    { id: 'logs', label: 'ログ', icon: Calendar, href: '/logs' },
    { id: 'edit', label: '編集', icon: Edit3, href: '/edit' },
    { id: 'graphs', label: 'グラフ', icon: BarChart3, href: '/graphs' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Call API route to clear the cookie
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.push('/login');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="w-64 bg-stone-50 border-r border-stone-200 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Logger</h1>
          <p className="text-stone-600 text-sm">レポート管理システム</p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${pathname === href ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          ログアウト
        </button>
      </div>
    </div>
  );
}
