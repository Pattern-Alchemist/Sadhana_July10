import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { db } from './db'
import { concepts, skills, microLessons, curricula } from './db/schema'

export interface BookProcessingResult {
  bookId: number
  totalConcepts: number
  totalSkills: number
  totalLessons: number
  estimatedHours: number
}

// Extract and decompose concepts from book text
export async function extractConcepts(
  bookId: number,
  extractedText: string
): Promise<number[]> {
  const conceptIds: number[] = []

  // Chunk the text into manageable pieces
  const chunks = chunkText(extractedText, 2000)

  for (const chunk of chunks) {
    try {
      const { text: conceptsJson } = await generateText({
        model: openai('gpt-4-turbo'),
        prompt: `Extract 3-5 key spiritual concepts from this text. For each concept provide:
        - concept_name (concise title)
        - definition (2-3 sentences)
        - sanskrit_term (if applicable)
        - difficulty_level (beginner, intermediate, advanced)

        Return as JSON array.

        Text: ${chunk}`,
        temperature: 0.5,
        maxTokens: 500,
      })

      const parsedConcepts = parseJSON(conceptsJson)
      if (Array.isArray(parsedConcepts)) {
        for (const concept of parsedConcepts) {
          try {
            const result = await db.insert(concepts).values({
              bookId,
              conceptName: concept.concept_name || 'Unknown',
              definition: concept.definition,
              sanskritTerm: concept.sanskrit_term,
              contextPassages: [chunk.substring(0, 500)],
              difficultyLevel: concept.difficulty_level || 'intermediate',
              relatedConcepts: [],
              createdAt: new Date(),
            }).returning({ id: concepts.id })

            if (result[0]) conceptIds.push(result[0].id)
          } catch (error) {
            console.error('[v0] Failed to insert concept:', error)
          }
        }
      }
    } catch (error) {
      console.error('[v0] Concept extraction error:', error)
    }
  }

  return conceptIds
}

// Decompose concepts into learnable skills
export async function decomposeSkills(
  bookId: number,
  conceptIds: number[]
): Promise<number[]> {
  const skillIds: number[] = []

  const { inArray } = await import('drizzle-orm')
  const conceptData = await db.select().from(concepts).where(
    inArray(concepts.id, conceptIds)
  )

  try {
    const { text: skillsJson } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `Given these spiritual concepts, decompose them into practical, teachable skills:
        ${conceptData.map((c) => `- ${c.conceptName}: ${c.definition}`).join('\n')}

        For each skill, provide:
        - skill_name (action-oriented)
        - description
        - learning_objectives (array, 3-5 items)
        - estimated_hours
        - difficulty_level
        - prerequisite_skills (indices of other skills in this list)

        Return as JSON array.`,
      temperature: 0.6,
      maxTokens: 800,
    })

    const parsedSkills = parseJSON(skillsJson)
    if (Array.isArray(parsedSkills)) {
      for (const skill of parsedSkills) {
        try {
          const result = await db.insert(skills).values({
            bookId: parseInt(bookId.toString()),
            skillName: skill.skill_name || 'Untitled Skill',
            description: skill.description,
            learningObjectives: skill.learning_objectives ? Array.isArray(skill.learning_objectives) ? skill.learning_objectives : [skill.learning_objectives] : [],
            prerequisiteSkills: skill.prerequisite_skills ? Array.isArray(skill.prerequisite_skills) ? skill.prerequisite_skills : [skill.prerequisite_skills] : [],
            estimatedHours: skill.estimated_hours ? parseFloat(skill.estimated_hours.toString()) : 5,
            difficultyLevel: skill.difficulty_level || 'intermediate',
            practiceRecommendations: 'Practice daily for best results.',
          }).returning({ id: skills.id })

          if (result[0]) skillIds.push(result[0].id)
        } catch (error) {
          console.error('[v0] Failed to insert skill:', error)
        }
      }
    }
  } catch (error) {
    console.error('[v0] Skill decomposition error:', error)
  }

  return skillIds
}

// Generate micro-lessons for each skill
export async function generateMicroLessons(
  skillId: number,
  skillName: string,
  skillDescription: string
): Promise<number[]> {
  const lessonIds: number[] = []

  try {
    const { text: lessonsJson } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `Create 3 micro-lessons for this skill:
        Skill: ${skillName}
        Description: ${skillDescription}

        For each lesson (beginner-friendly, 5-15 min duration):
        - lesson_number (1, 2, 3)
        - title
        - content (brief explanation)
        - voice_script (conversational, spoken word format)
        - practice_exercise (simple practice to do)
        - duration_minutes (5-15)
        - key_takeaways (array, 2-3 items)

        Return as JSON array.`,
      temperature: 0.7,
      maxTokens: 1200,
    })

    const parsedLessons = parseJSON(lessonsJson)
    if (Array.isArray(parsedLessons)) {
      for (const lesson of parsedLessons) {
        try {
          const result = await db.insert(microLessons).values({
            skillId,
            lessonNumber: lesson.lesson_number || 1,
            title: lesson.title || 'Lesson',
            content: lesson.content,
            voiceScript: lesson.voice_script,
            practiceExercise: lesson.practice_exercise,
            durationMinutes: lesson.duration_minutes || 10,
            keyTakeaways: lesson.key_takeaways || [],
            createdAt: new Date(),
          }).returning({ id: microLessons.id })

          if (result[0]) lessonIds.push(result[0].id)
        } catch (error) {
          console.error('[v0] Failed to insert lesson:', error)
        }
      }
    }
  } catch (error) {
    console.error('[v0] Micro-lesson generation error:', error)
  }

  return lessonIds
}

// Generate personalized curriculum
export async function generatePersonalizedCurriculum(
  userId: string,
  bookId: number,
  skillIds: number[],
  preferences: {
    level?: 'beginner' | 'intermediate' | 'advanced'
    learningStyle?: string
    pace?: 'slow' | 'normal' | 'accelerated'
  } = {}
): Promise<number> {
  const level = preferences.level || 'intermediate'
  const pace = preferences.pace || 'normal'
  const learningStyle = preferences.learningStyle || 'auditory'

    const { inArray } = await import('drizzle-orm')
    const skillData = await db.select().from(skills).where(
      inArray(skills.id, skillIds)
    )

  const paceMultiplier = { slow: 1.5, normal: 1, accelerated: 0.7 }[pace]
  const totalHours = (
    skillData.reduce((sum, s) => sum + parseFloat(s.estimatedHours?.toString() || '5'), 0) *
    paceMultiplier
  ).toFixed(1)

  try {
    const result = await db.insert(curricula).values({
      userId,
      bookId,
      curriculumName: `${skillData[0]?.skillName || 'Spiritual'} Journey`,
      skillIds: skillIds,
      learningPath: skillIds.map((id) => `skill_${id}`),
      estimatedTotalHours: parseFloat(totalHours),
      personalizationLevel: level,
      learningStyle: learningStyle,
      pace: pace,
      createdAt: new Date(),
    }).returning({ id: curricula.id })

    return result[0]?.id || 0
  } catch (error) {
    console.error('[v0] Curriculum generation error:', error)
    return 0
  }
}

// Process entire book
export async function processBook(
  bookId: number,
  extractedText: string,
  userId: string
): Promise<BookProcessingResult> {
  console.log('[v0] Starting book processing...')

  // Step 1: Extract concepts
  const conceptIds = await extractConcepts(bookId, extractedText)
  console.log(`[v0] Extracted ${conceptIds.length} concepts`)

  // Step 2: Decompose skills
  const skillIds = await decomposeSkills(bookId, conceptIds)
  console.log(`[v0] Decomposed ${skillIds.length} skills`)

  // Step 3: Generate micro-lessons
  let totalLessons = 0
  for (const skillId of skillIds) {
    const { eq } = await import('drizzle-orm')
    const skillData = await db.select().from(skills).where(eq(skills.id, skillId)).limit(1)
    if (skillData[0]) {
      const lessonIds = await generateMicroLessons(skillId, skillData[0].skillName, skillData[0].description || '')
      totalLessons += lessonIds.length
    }
  }
  console.log(`[v0] Generated ${totalLessons} micro-lessons`)

  // Step 4: Generate curriculum
  const curriculumId = await generatePersonalizedCurriculum(userId, bookId, skillIds)
  console.log(`[v0] Generated curriculum ${curriculumId}`)

  const { inArray } = await import('drizzle-orm')
  const skillsForCalculation = await db.select().from(skills).where(
    inArray(skills.id, skillIds)
  )
  const totalSkillHours = skillsForCalculation.reduce((sum, s) => sum + parseFloat(s.estimatedHours?.toString() || '0'), 0)

  return {
    bookId,
    totalConcepts: conceptIds.length,
    totalSkills: skillIds.length,
    totalLessons,
    estimatedHours: totalSkillHours,
  }
}

// Helper: Chunk text intelligently
function chunkText(text: string, chunkSize: number = 2000): string[] {
  const chunks: string[] = []
  let currentChunk = ''

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      if (currentChunk) chunks.push(currentChunk)
      currentChunk = sentence
    } else {
      currentChunk += sentence
    }
  }

  if (currentChunk) chunks.push(currentChunk)
  return chunks
}

// Helper: Safely parse JSON
function parseJSON(jsonString: string): any {
  try {
    const jsonMatch = jsonString.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error('[v0] JSON parse error:', error)
    return []
  }
}
