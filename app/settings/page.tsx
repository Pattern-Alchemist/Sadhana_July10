'use client'

import { useState } from 'react'
import { Settings, Volume2, User } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [voiceProfile, setVoiceProfile] = useState('compassionate_guide')
  const [learningStyle, setLearningStyle] = useState('auditory')
  const [pace, setPace] = useState('normal')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-sm text-amber-400 hover:text-amber-300">
            ← Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-sm text-slate-400">Customize your Sadhana experience</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* AI Guru Profile */}
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-slate-100">AI Guru Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Voice Profile</label>
                <select
                  value={voiceProfile}
                  onChange={(e) => setVoiceProfile(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-100"
                >
                  <option value="wise_elder">Wise Elder - Deep wisdom & philosophy</option>
                  <option value="compassionate_guide">Compassionate Guide - Empathetic & supportive</option>
                  <option value="rigorous_teacher">Rigorous Teacher - Intellectually precise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-6">
            <div className="mb-6 flex items-center gap-3">
              <User className="h-6 w-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-slate-100">Learning Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Learning Style</label>
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-100"
                >
                  <option value="auditory">Auditory - Learning through listening</option>
                  <option value="visual">Visual - Learning through seeing</option>
                  <option value="kinesthetic">Kinesthetic - Learning through doing</option>
                  <option value="reading">Reading - Learning through text</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Learning Pace</label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-slate-100"
                >
                  <option value="slow">Slow - More time per concept</option>
                  <option value="normal">Normal - Balanced pace</option>
                  <option value="accelerated">Accelerated - Move quickly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
