import { pgTable, text, timestamp, boolean, serial, integer, jsonb, numeric, index } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// Sadhana AI OS Tables

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  author: text('author'),
  fileUrl: text('fileUrl'),
  fileSize: integer('fileSize'),
  processingStatus: text('processingStatus').default('pending'),
  totalPages: integer('totalPages'),
  extractedText: text('extractedText'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const concepts = pgTable('concepts', {
  id: serial('id').primaryKey(),
  bookId: integer('bookId').notNull().references(() => books.id, { onDelete: 'cascade' }),
  conceptName: text('conceptName').notNull(),
  definition: text('definition'),
  sanskritTerm: text('sanskritTerm'),
  contextPassages: text('contextPassages').array(),
  difficultyLevel: text('difficultyLevel'),
  relatedConcepts: integer('relatedConcepts').array(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  bookId: integer('bookId').notNull().references(() => books.id, { onDelete: 'cascade' }),
  skillName: text('skillName').notNull(),
  description: text('description'),
  learningObjectives: text('learningObjectives').array(),
  prerequisiteSkills: integer('prerequisiteSkills').array(),
  estimatedHours: numeric('estimatedHours'),
  difficultyLevel: text('difficultyLevel'),
  practiceRecommendations: text('practiceRecommendations'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const microLessons = pgTable('micro_lessons', {
  id: serial('id').primaryKey(),
  skillId: integer('skillId').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  lessonNumber: integer('lessonNumber'),
  title: text('title').notNull(),
  content: text('content'),
  voiceScript: text('voiceScript'),
  practiceExercise: text('practiceExercise'),
  durationMinutes: integer('durationMinutes'),
  keyTakeaways: text('keyTakeaways').array(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const voiceSessions = pgTable('voice_sessions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  sessionType: text('sessionType'),
  audioInputUrl: text('audioInputUrl'),
  transcription: text('transcription'),
  guruResponse: text('guruResponse'),
  voiceOutputUrl: text('voiceOutputUrl'),
  contextData: jsonb('contextData'),
  emotionalState: text('emotionalState'),
  durationSeconds: integer('durationSeconds'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const curricula = pgTable('curricula', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  bookId: integer('bookId').notNull().references(() => books.id, { onDelete: 'cascade' }),
  curriculumName: text('curriculumName').notNull(),
  skillIds: integer('skillIds').array().notNull(),
  learningPath: text('learningPath').array(),
  estimatedTotalHours: numeric('estimatedTotalHours'),
  personalizationLevel: text('personalizationLevel'),
  learningStyle: text('learningStyle'),
  pace: text('pace'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  completedAt: timestamp('completedAt'),
})

export const guruMemory = pgTable('guru_memory', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  memoryType: text('memoryType'),
  memoryContent: text('memoryContent'),
  importanceScore: integer('importanceScore'),
  lastAccessedAt: timestamp('lastAccessedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
