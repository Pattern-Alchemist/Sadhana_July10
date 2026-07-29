'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mic, Upload, Book, Brain, Heart, Wand2, Settings } from 'lucide-react'

export function SadhanaAIOSDashboard() {
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [userMessage, setUserMessage] = useState('')

  const features = [
    {
      icon: Mic,
      title: 'AI Guru',
      description: 'Conversational spiritual guidance via voice',
      href: '/guru',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Upload,
      title: 'Book Upload',
      description: 'Transform spiritual books into personalized curricula',
      href: '/books',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Brain,
      title: 'Voice Lessons',
      description: 'Learn through voice-guided micro-lessons',
      href: '/lessons',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Heart,
      title: 'Karma Diary',
      description: 'Voice journal your spiritual journey',
      href: '/karma-diary',
      color: 'from-rose-500 to-red-600',
    },
    {
      icon: Wand2,
      title: 'Breath Coach',
      description: 'AI-guided breathing practices',
      href: '/breath',
      color: 'from-teal-500 to-green-600',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Customize your Sadhana experience',
      href: '/settings',
      color: 'from-slate-500 to-gray-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-400">Sadhana</h1>
              <p className="text-sm text-slate-400">AI-Powered Spiritual Operating System</p>
            </div>
            <Link
              href="/settings"
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-700"
            >
              Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-700/50 bg-gradient-to-b from-amber-900/10 to-transparent px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-slate-100 sm:text-5xl">
            Learn Spirituality Like From A Living Guru
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Voice-first AI spirituality platform combining ancient wisdom with modern personalization.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-100">Core Features</h3>
          <p className="mt-2 text-slate-400">Access your spiritual practice tools</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 transition hover:border-slate-600 hover:bg-slate-800"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition group-hover:opacity-10`}
                />
                <div className="relative">
                  <Icon className="mb-4 h-8 w-8 text-amber-400" />
                  <h3 className="text-lg font-semibold text-slate-100">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
                  <p className="mt-4 text-xs text-amber-400/70">Explore →</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
              <div className="text-3xl font-bold text-amber-400">0</div>
              <p className="mt-1 text-sm text-slate-400">Active Sessions</p>
            </div>
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
              <div className="text-3xl font-bold text-amber-400">0</div>
              <p className="mt-1 text-sm text-slate-400">Books Processed</p>
            </div>
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
              <div className="text-3xl font-bold text-amber-400">0</div>
              <p className="mt-1 text-sm text-slate-400">Skills Learned</p>
            </div>
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
              <div className="text-3xl font-bold text-amber-400">0</div>
              <p className="mt-1 text-sm text-slate-400">Practice Streak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-950/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm text-slate-500">
            © 2026 Sadhana AI OS · Powered by voice, memory, and personalization
          </p>
        </div>
      </footer>
    </div>
  )
}
