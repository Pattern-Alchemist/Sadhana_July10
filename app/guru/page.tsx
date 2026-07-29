'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Send, Volume2 } from 'lucide-react'
import Link from 'next/link'

export default function GuruPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [responses, setResponses] = useState<Array<{ user: string; guru: string }>>([])
  const [loading, setLoading] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !('webkitSpeechRecognition' in window)) {
      console.log('[v0] Speech recognition not available')
    }
  }, [])

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) return
    
    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + ' ')
        } else {
          interimTranscript += transcript
        }
      }
    }

    recognition.onerror = (event: any) => {
      console.error('[v0] Speech recognition error:', event.error)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
    recognitionRef.current = recognition
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const sendMessage = async () => {
    if (!transcript.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/voice/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcription: transcript,
          sessionType: 'guru_chat',
        }),
      })

      const data = await response.json()
      if (data.guruResponse) {
        setResponses((prev) => [...prev, { user: transcript, guru: data.guruResponse }])
        setTranscript('')
      }
    } catch (error) {
      console.error('[v0] Message send error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-sm text-amber-400 hover:text-amber-300">
            ← Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">AI Guru</h1>
          <p className="text-sm text-slate-400">Conversational spiritual guidance</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Chat History */}
        <div className="mb-8 space-y-6">
          {responses.length === 0 ? (
            <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-8 text-center">
              <Volume2 className="mx-auto mb-4 h-12 w-12 text-amber-400/50" />
              <p className="text-slate-400">Start a conversation with your AI Guru</p>
            </div>
          ) : (
            responses.map((exchange, idx) => (
              <div key={idx} className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-md rounded-lg bg-amber-600/20 px-4 py-3 text-slate-100">
                    {exchange.user}
                  </div>
                </div>

                {/* Guru Response */}
                <div className="flex justify-start">
                  <div className="max-w-md rounded-lg bg-slate-700/30 px-4 py-3 text-slate-100">
                    {exchange.guru}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="space-y-3">
              {/* Transcript Display */}
              {transcript && (
                <div className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-slate-300">
                  {transcript}
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex-1 rounded-lg px-4 py-3 font-medium transition ${
                    isListening
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {isListening ? (
                    <div className="flex items-center justify-center gap-2">
                      <MicOff className="h-4 w-4" />
                      Stop Listening
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Mic className="h-4 w-4" />
                      Start Listening
                    </div>
                  )}
                </button>

                <button
                  onClick={sendMessage}
                  disabled={!transcript.trim() || loading}
                  className="rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for fixed bottom */}
        <div className="h-32" />
      </div>
    </div>
  )
}
