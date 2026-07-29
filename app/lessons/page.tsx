'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-sm text-amber-400 hover:text-amber-300">
            ← Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">Voice Lessons</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-8 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-amber-400/50" />
          <p className="text-slate-400">Upload a book to generate voice-guided lessons</p>
          <Link href="/books" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
            Upload a Book →
          </Link>
        </div>
      </div>
    </div>
  )
}
