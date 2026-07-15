import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard - DANZ Rental',
  description: 'Admin Dashboard for DANZ Rental',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex flex-col font-sans">
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="font-black text-xl tracking-tight">
            DANZ <span className="text-primary">Admin</span>
          </Link>
          <Link href="/" className="text-sm font-semibold hover:text-primary transition-colors text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            Back to Website
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
