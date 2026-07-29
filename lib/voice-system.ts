'use server'

import { generateText, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export interface VoiceConfig {
  language?: string
  voiceProfile?: 'wise_elder' | 'compassionate_guide' | 'rigorous_teacher'
  emotionalTone?: string
}

export interface GuruContext {
  userId: string
  learningHistory: string[]
  currentLesson?: string
  emotionalState?: string
  preferences?: Record<string, any>
}

// Text-to-speech using OpenAI
export async function generateSpeech(
  text: string,
  voiceProfile: VoiceConfig['voiceProfile'] = 'compassionate_guide'
): Promise<Buffer> {
  const voiceMap = {
    wise_elder: 'onyx',
    compassionate_guide: 'nova',
    rigorous_teacher: 'echo',
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        input: text,
        voice: voiceMap[voiceProfile],
        speed: 0.95,
      }),
    })

    if (!response.ok) {
      throw new Error(`TTS failed: ${response.statusText}`)
    }

    return Buffer.from(await response.arrayBuffer())
  } catch (error) {
    console.error('[v0] Speech generation error:', error)
    throw error
  }
}

// AI Guru response generation with context
export async function generateGuruResponse(
  userInput: string,
  context: GuruContext,
  voiceConfig: VoiceConfig = {}
): Promise<string> {
  const systemPrompt = buildGuruSystemPrompt(context, voiceConfig)

  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userInput,
        },
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error('[v0] Guru response generation error:', error)
    throw error
  }
}

// Stream Guru responses for real-time interaction
export async function streamGuruResponse(
  userInput: string,
  context: GuruContext,
  voiceConfig: VoiceConfig = {}
) {
  const systemPrompt = buildGuruSystemPrompt(context, voiceConfig)

  return streamText({
    model: openai('gpt-4-turbo'),
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userInput,
      },
    ],
    temperature: 0.7,
  })
}

// Build context-aware system prompt for Guru
function buildGuruSystemPrompt(
  context: GuruContext,
  config: VoiceConfig
): string {
  const voiceGuidance = {
    wise_elder:
      'You are an ancient, wise spiritual guide with 50+ years of practice. Speak with calm wisdom, use Sanskrit terms naturally, and share deep philosophical insights.',
    compassionate_guide:
      'You are a warm, compassionate spiritual teacher. Respond with empathy, encouragement, and practical guidance. Adapt to the student\'s emotional state.',
    rigorous_teacher:
      'You are a rigorous, intellectually precise spiritual instructor. Provide detailed explanations, challenge assumptions, and expect depth in practice.',
  }

  const tone = voiceGuidance[config.voiceProfile || 'compassionate_guide']

  let learningContext = ''
  if (context.learningHistory && context.learningHistory.length > 0) {
    learningContext = `\n\nStudent's Learning Journey: ${context.learningHistory.slice(-3).join(' → ')}`
  }

  return `You are the AI Guru in the Sadhana spiritual operating system. Your role is to teach, guide, and support the student's spiritual journey.

${tone}

Key Principles:
1. Personalize responses based on the student's level and emotional state
2. Use Sanskrit terms with gentle explanation
3. Connect teachings to practical daily life
4. Offer specific practices when appropriate
5. Create a sense of continuity in the teaching relationship
6. Remember and reference previous conversations

${context.emotionalState ? `\nStudent's Current State: ${context.emotionalState}` : ''}
${learningContext}

Respond conversationally, as if you're speaking to this student. Keep responses concise for voice delivery (under 100 words ideally).`
}

// Detect emotional state from transcription
export function detectEmotionalState(transcription: string): string {
  const emotionalKeywords = {
    anxious: ['worried', 'anxious', 'stressed', 'overwhelmed', 'panic', 'afraid'],
    sad: ['sad', 'depressed', 'hopeless', 'down', 'miserable', 'grief'],
    joyful: ['happy', 'joyful', 'excited', 'blessed', 'grateful', 'peaceful'],
    confused: ['confused', 'lost', 'unclear', 'don\'t understand', 'struggling'],
    peaceful: ['calm', 'peaceful', 'centered', 'present', 'meditative', 'serene'],
  }

  const lowerText = transcription.toLowerCase()
  for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
    if (keywords.some((kw) => lowerText.includes(kw))) {
      return emotion
    }
  }

  return 'neutral'
}

// Confidence scoring for voice input
export function scoreConfidence(transcription: string, alternatives?: string[]): number {
  if (!transcription || transcription.length < 2) return 0
  if (transcription.split(' ').length < 2) return 0.5
  return Math.min(0.95, 0.5 + (transcription.length / 500) * 0.45)
}
