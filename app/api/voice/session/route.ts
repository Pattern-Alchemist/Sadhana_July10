import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { voiceSessions, guruMemory } from '@/lib/db/schema'
import { generateGuruResponse, detectEmotionalState, generateSpeech } from '@/lib/voice-system'

export async function POST(request: NextRequest) {
  try {
    // Get user ID from request (demo - in production use proper auth)
    const userId = 'user-demo-001'
    const body = await request.json()
    const { transcription, sessionType = 'guru_chat', contextData } = body

    if (!transcription || transcription.trim().length === 0) {
      return NextResponse.json({ error: 'Transcription required' }, { status: 400 })
    }

    // Detect emotional state
    const emotionalState = detectEmotionalState(transcription)

    // Fetch user's guru memory for context
    const { guruMemory } = await import('@/lib/db/schema')
    const { eq } = await import('drizzle-orm')
    const memories = await db.select().from(guruMemory).where(
      eq(guruMemory.userId, userId)
    ).limit(5)

    const context = {
      userId,
      learningHistory: memories
        .filter((m) => m.memoryType === 'learning_history')
        .slice(-3)
        .map((m) => m.memoryContent || ''),
      emotionalState,
      preferences: {
        voiceProfile: 'compassionate_guide',
      },
    }

    // Generate Guru response
    const guruResponse = await generateGuruResponse(transcription, context)

    // Generate speech response
    let voiceOutputUrl = ''
    try {
      const audioBuffer = await generateSpeech(guruResponse, 'compassionate_guide')
      // In production, upload to storage service (e.g., Vercel Blob)
      voiceOutputUrl = 'https://placeholder.audio.url'
    } catch (error) {
      console.error('[v0] TTS generation failed:', error)
      voiceOutputUrl = 'https://placeholder.audio.url'
    }

    // Store voice session
    const result = await db.insert(voiceSessions).values({
      userId,
      sessionType,
      transcription,
      guruResponse,
      voiceOutputUrl,
      emotionalState,
      contextData,
      durationSeconds: 30,
      createdAt: new Date(),
    }).returning()

    // Update guru memory
    if (emotionalState !== 'neutral') {
      await db.insert(guruMemory).values({
        userId,
        memoryType: 'context',
        memoryContent: `Emotional state: ${emotionalState}. Context: ${transcription.substring(0, 100)}...`,
        importanceScore: 7,
        lastAccessedAt: new Date(),
        createdAt: new Date(),
      })
    }

    return NextResponse.json({
      sessionId: result[0]?.id,
      guruResponse,
      voiceOutputUrl,
      emotionalState,
    })
  } catch (error) {
    console.error('[v0] Voice session error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
