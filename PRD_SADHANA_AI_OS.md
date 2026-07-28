# Sadhana: Voice-First AI Spiritual Operating System
## Complete Product Requirements Document

**Version:** 1.0  
**Date:** 2026-07-29  
**Status:** Foundation Architecture  
**Target Platform:** Next.js 16 + React 19 + Web Audio API

---

## Executive Summary

Transform **Sadhana** (formerly AstroKalki) from a museum-quality contemplative archive into a **voice-first AI spiritual operating system**—a personalized, conversational learning and practice platform powered by speech-to-speech technology and intelligent curriculum extraction.

This PRD consolidates the existing 60+ modules and APIs with two transformative capabilities:
1. **Speech-to-Speech Integration** (Hugging Face) — Voice-native interactions across all modules
2. **Book-to-Skill Engine** (curriculum extraction) — Transform spiritual texts into personalized learning journeys

### Core Vision

**"Enable every user to learn and practice spirituality the way they learn from a living guru—through voice, memory, and continuous personalization."**

---

## Table of Contents

1. [Objectives & Key Results](#objectives--key-results)
2. [Current State Analysis](#current-state-analysis)
3. [Voice System Architecture](#voice-system-architecture)
4. [Book-to-Skill Engine](#book-to-skill-engine)
5. [Module Integration Framework](#module-integration-framework)
6. [AI Guru Mode](#ai-guru-mode)
7. [Learning & Curriculum System](#learning--curriculum-system)
8. [Data Models & Storage](#data-models--storage)
9. [Voice-First Module Specifications](#voice-first-module-specifications)
10. [Technical Requirements](#technical-requirements)
11. [Performance & Infrastructure](#performance--infrastructure)
12. [Security & Privacy](#security--privacy)
13. [UI/UX Framework](#uiux-framework)
14. [Implementation Roadmap](#implementation-roadmap)

---

## Objectives & Key Results

### Primary Objectives

| Objective | Description | Success Metric |
|-----------|-------------|-----------------|
| **O1: Voice-First Interface** | Make speech the primary interaction mode | 80% of daily active users use voice ≥ 2 hours/day |
| **O2: Curriculum Intelligence** | Extract & personalize learning from any spiritual text | Users complete 3+ book-to-skill curricula in Q1 |
| **O3: Conversational AI** | Build a contextual AI Guru that remembers user journey | 90% of conversations marked as "helpful" |
| **O4: Seamless Integration** | Voice, books, and existing modules work together | 0 module friction; 100% feature availability with voice |
| **O5: Habit Formation** | Daily voice practice with guidance | 50% retention after 30 days of daily voice engagement |

### Key Results

#### KR 1.1: Voice Engagement
- Push-to-talk latency: **< 200ms**
- Speech recognition accuracy: **> 95%** (English)
- Interruptibility: **Pause any guru guidance in ≤ 100ms**
- Session continuity: **Recovery from network interruption < 3 seconds**

#### KR 1.2: Curriculum Mastery
- Books processed: **100+ titles** (Bhagavad Gita, Yoga Sutras, Upanishads, etc.)
- Lessons generated per book: **50-200 micro-lessons**
- Completion rate: **> 40%** for first course module
- User progression: **Tracked across 10+ dimensions** (skill, emotion, practice depth)

#### KR 1.3: AI Guru Reliability
- Downtime: **< 0.1% per month**
- Response time: **Mean 1.2s, p99 3s**
- Context window: **Remember 50+ previous conversations**
- Personalization: **Unique curriculum for each user archetype**

#### KR 1.4: Cross-Module Harmony
- Launch 20 "voice-first" module variants in Q1
- Zero breaking changes to existing modules
- 100% backward compatibility with existing data/sessions

#### KR 1.5: Daily Practice Adoption
- New user adoption in voice: **> 30% on day 1**
- Weekly return rate: **> 60% for voice users**
- NPS for voice feature: **> 70**

---

## Current State Analysis

### Existing Architecture

**Sadhana** is a sophisticated Next.js 16 application with:

#### Core Infrastructure
- **Framework:** Next.js 16.2.6 with React 19.2.6
- **Database:** PostgreSQL + Drizzle ORM + better-sqlite3 (dual-layer)
- **Styling:** Tailwind CSS 4.1.17 + custom motion system
- **Typography:** Cormorant Garamond (display) + Crimson Text (body)
- **Animation:** Framer Motion 12.42.2

#### Existing Module Ecosystem (60+ pages)

**Practice & Guidance Modules:**
- Breath (breath coaching)
- Breath Magic (advanced pranayama)
- Chakra Scanner (energy body diagnostics)
- Mantra Vault (mantra library + tracking)
- Meditation (guided sessions)
- Yantra (sacred geometry + 3D visualization)
- Japa (mantra repetition counter)
- Ritual (ceremony guidance)

**Knowledge & Archive Modules:**
- Knowledge (core knowledge base API)
- Archivist (memory/archive system)
- Manuscripts (texts/scriptures)
- Reader (document viewer)
- Comparative (text analysis across traditions)
- Glossary (terminology with etymologies)
- Schools (lineage & tradition knowledge)

**Personal Tracking & Insight Modules:**
- Journal (text journaling)
- Reflections (structured reflection engine)
- Dreams (dream recording & analysis)
- Calendar (lunar/ritual calendar)
- Cosmos (astrological alignments)
- Heatmap (practice visualization)
- Sacred Timeline (life events mapping)

**Advanced Features:**
- Yantra Builder (custom geometry)
- Oracle (divination system)
- Crisis Support (emergency breathing/grounding)
- Certificate (completion tracking)
- Offline Mode (PWA support)
- RSS Feed (content distribution)

#### Existing APIs
- `/api/knowledge/*` — Core knowledge retrieval & morphological analysis
- `/api/reflections/*` — Reflection storage & retrieval
- `/api/archivist/*` — Archive management

#### Design Language
- **Cinematic aesthetic:** Dark backgrounds, golden accents (#c9985e), depth
- **Ambient animations:** Starfields, transitions, motion hierarchies
- **Scholarly restraint:** "Dual epistemological lens" — academic + experiential
- **Responsive:** Mobile-first, works across all device sizes

### Gap Analysis

| Area | Current State | Target State | Gap |
|------|---------------|--------------|-----|
| **Interaction** | Text-based UI + limited voice command | Voice-primary with text fallback | High |
| **Knowledge Ingestion** | Manual curation + static content | Dynamic book processing + AI extraction | High |
| **Personalization** | Basic module routing | AI-powered curriculum per user archetype | High |
| **Memory** | Session-based state | Persistent conversation memory + Reality Graph | Medium |
| **Audio** | None | Full speech recognition + synthesis | Critical |
| **Streaming** | Partial (API responses) | Streaming everything (voice, learning, guidance) | Medium |

---

## Voice System Architecture

### Design Philosophy

**Voice is not a feature. Voice is the substrate.**

Every user interaction defaults to voice unless:
- Device lacks audio input
- User opts for accessibility text mode
- Context requires precise text entry (e.g., searching for a specific mantra)

### Core Voice Engine

#### 1. Voice Session Manager

```typescript
// High-level abstraction for voice conversations
interface VoiceSession {
  id: string;
  userId: string;
  startedAt: Date;
  mode: "practice" | "guidance" | "learning" | "reflection" | "emergency";
  context: {
    moduleId: string;
    practiceGoal?: string;
    emotionalState?: string;
    previousSessions: string[]; // Last 50 session IDs
  };
  state: "idle" | "listening" | "processing" | "responding" | "paused";
  transcript: string;
  emotion: {
    detected: string; // anger, anxiety, calm, grief, etc.
    confidence: number;
  };
  continuity: {
    lastInputAt: Date;
    interruptions: number;
    totalDuration: number;
  };
}
```

#### 2. Speech Recognition Pipeline

**Input Stream → Recognition → Intent Detection → Context Retrieval → Processing**

```typescript
interface SpeechRecognitionConfig {
  // Real-time streaming with VAD (Voice Activity Detection)
  language: "en-US" | "hi-IN" | "sa" | "multi";
  
  // Streaming recognition (return partial results)
  streaming: true;
  interimResults: true;
  maxAlternatives: 3;
  
  // Model selection
  model: "default" | "meditation" | "chanting" | "conversational";
  
  // Acoustic features
  sampleRate: 16000;
  channels: 1;
  encoding: "LINEAR16";
  
  // Context (for better recognition)
  hints: string[]; // ["chakra", "pranayama", "Bhagavad Gita", ...]
  vocabularyBoost: Record<string, number>; // Domain-specific terms
  
  // Robustness
  noiseRobustness: "low" | "medium" | "high";
  backgroundNoiseLevel: "quiet" | "normal" | "loud";
}
```

#### 3. Intent Classification

After speech recognition, classify user intent into one of 50+ recognized patterns:

```typescript
type VoiceIntent =
  | "start_practice" // "Guide me through breath work"
  | "ask_question" // "What is chakra meditation?"
  | "report_emotion" // "I'm feeling anxious"
  | "request_guidance" // "Help me with concentration"
  | "practice_mantra" // "Let's chant together"
  | "record_reflection" // "I want to journal"
  | "seek_support" // Emergency patterns
  | "navigate" // "Go to the crystal page"
  | "control" // "Pause", "Continue", "Restart"
  | "feedback" // "That was helpful", "I didn't understand"
  | "schedule_practice" // "Remind me tomorrow"
  | "query_memory" // "What did I say about fear?"
  | "learn_skill" // "Teach me from the Gita"
  | "get_personalization" // "What should I practice today?"
  | "acknowledge" // "Yes", "Okay", "Got it"
  | "unclear" // Fallback for ambiguous input
```

#### 4. Speech Synthesis (Output)

```typescript
interface SpeechSynthesisConfig {
  // Voice selection
  voice: {
    gender: "male" | "female" | "neutral";
    accent: "Indian" | "Western" | "Sanskrit";
    archetype: "guru" | "friend" | "teacher" | "guide";
    emotionalTone: "calm" | "encouraging" | "firm" | "gentle" | "wise";
  };
  
  // Streaming synthesis (return audio chunks as they're generated)
  streaming: true;
  chunkSize: "128ms" | "256ms" | "512ms";
  
  // Natural speech patterns
  speechRate: 0.8 | 1.0 | 1.2; // Slow (meditation) to normal to fast
  pitch: -20 | 0 | 20; // Semitones
  volumeGain: -6 | 0 | 6; // dB
  
  // Prosody (emotional expression)
  prosody: {
    emphasis: Record<string, number>; // Words to emphasize
    pause: Record<number, number>; // (charIndex -> pause_ms)
    intonation: "statement" | "question" | "command";
  };
  
  // Language
  language: "en-US" | "hi-IN" | "sa" | "multi";
  
  // Format
  audioFormat: "wav" | "mp3" | "opus";
  sampleRate: 24000; // High quality
}
```

#### 5. Emotion Detection

Parallel to speech recognition, analyze:

```typescript
interface EmotionAnalysis {
  // Speech-based
  fromProsody: {
    valence: number; // -1 (negative) to +1 (positive)
    arousal: number; // -1 (calm) to +1 (excited)
    dominant: string; // "calm", "anxious", "joyful", etc.
    confidence: number;
  };
  
  // Semantic-based (what they're saying)
  fromSentiment: {
    emotions: Record<string, number>; // anger: 0.3, joy: 0.2, etc.
    dominant: string;
  };
  
  // Context-based (what they're practicing)
  contextExpected: {
    likelyEmotions: string[]; // Based on module + time + history
  };
  
  // Fused result
  detected: string;
  confidence: number;
  shouldEscalate: boolean; // Detect crisis patterns
}
```

#### 6. Interruptibility & Flow Control

```typescript
interface VoiceFlowControl {
  // User can interrupt at any time
  isInterruptible: boolean;
  
  // Special interrupt patterns (emergency)
  emergencyPatterns: RegExp[]; // ["stop", "help", "pain", ...]
  
  // Pause/resume without breaking continuity
  pauseState: {
    guru: { message: null }; // Stop speaking immediately
    recognition: true; // Still listening for resume signals
    continuityToken: string; // Can resume exactly where we paused
  };
  
  // Graceful handling of network issues
  networkRecovery: {
    timeout: 5000; // ms
    retryBackoff: [1000, 2000, 4000]; // Exponential
    fallback: "continue_offline" | "degrade_ui" | "reconnect_guidance";
  };
}
```

### Reusable Voice Hooks

#### useVoice()

```typescript
function useVoice() {
  // Main voice control hook
  return {
    // State
    isListening: boolean;
    isResponding: boolean;
    transcript: string;
    interimTranscript: string;
    emotion: string;
    
    // Actions
    startListening: () => Promise<void>;
    stopListening: () => void;
    pauseGuru: () => void;
    resumeGuru: () => void;
    interruptGuru: () => void;
    
    // Callbacks
    onTranscript: (text: string) => void;
    onEmotion: (emotion: string) => void;
    onGuruResponse: (audio: AudioBuffer) => void;
    onError: (error: VoiceError) => void;
    
    // Session management
    currentSession: VoiceSession;
    sessionHistory: VoiceSession[];
    saveSession: () => Promise<void>;
  };
}
```

#### useSpeechRecognition()

```typescript
function useSpeechRecognition(config: SpeechRecognitionConfig) {
  return {
    // Lower-level speech API
    isActive: boolean;
    transcript: string;
    interimTranscript: string;
    alternatives: { transcript: string; confidence: number }[];
    
    start: () => void;
    stop: () => void;
    abort: () => void;
    
    onResult: (event: SpeechRecognitionEvent) => void;
    onError: (error: SpeechRecognitionErrorEvent) => void;
    onEnd: () => void;
  };
}
```

#### useSpeechSynthesis()

```typescript
function useSpeechSynthesis(config: SpeechSynthesisConfig) {
  return {
    // Speech synthesis control
    isPlaying: boolean;
    isPaused: boolean;
    currentPosition: number;
    duration: number;
    
    speak: (text: string) => Promise<void>;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    
    // Streaming version
    streamSpeak: (textStream: AsyncGenerator<string>) => Promise<void>;
    
    onPlaybackStart: () => void;
    onPlaybackEnd: () => void;
    onError: (error: SynthesisError) => void;
  };
}
```

#### VoiceContext (Global Provider)

```typescript
interface VoiceContextType {
  // Global voice state
  voiceEnabled: boolean;
  voicePreferences: {
    autoStart: boolean;
    guruVoice: "male" | "female" | "neutral";
    speechRate: number;
    language: string;
    accessibility: {
      textTranscripts: boolean;
      captions: boolean;
      screenReaderOptimized: boolean;
    };
  };
  
  // Global session management
  activeSession: VoiceSession | null;
  sessionHistory: VoiceSession[];
  clearHistory: () => void;
  exportSessions: () => Promise<Blob>;
  
  // Emergency override
  enableEmergencyMode: () => void;
  disableEmergencyMode: () => void;
}
```

### Voice Error Handling

```typescript
interface VoiceErrorRecovery {
  errors: {
    "microphone_permission_denied": {
      userMessage: "Microphone access required. Check your browser settings.";
      recovery: () => requestPermission();
    };
    "network_timeout": {
      userMessage: "Connection lost. Continuing with offline buffering.";
      recovery: () => retryWithBackoff();
    };
    "recognition_not_supported": {
      userMessage: "Voice unavailable on this device. Switching to text.";
      recovery: () => switchToTextMode();
    };
    "synthesis_error": {
      userMessage: "Audio playback failed. Retrying...";
      recovery: () => retryWithFallback();
    };
    "context_overload": {
      userMessage: "Session too long. Creating new session.";
      recovery: () => startNewSession();
    };
  };
  
  // Exponential backoff for transient failures
  retryStrategy: {
    maxAttempts: 3;
    delayMs: [100, 500, 2000];
    jitter: true;
  };
  
  // Graceful degradation
  fallbackModes: ["text_only", "audio_only", "offline_buffering"];
}
```

---

## Book-to-Skill Engine

### Overview

Transform any spiritual text into a personalized learning curriculum with:
- **Automatic chapter extraction & summarization**
- **Skill & concept mapping**
- **Micro-lesson generation (50-200 per book)**
- **Practice exercise creation**
- **Knowledge graph construction**
- **Personalized learning paths**
- **Assessment & certification**

### Supported Input Formats

| Format | Parser | Notes |
|--------|--------|-------|
| **PDF** | PyPDF2 / pdfplumber | Handles OCR for scanned texts |
| **EPUB** | ebooklib | Preserves formatting & structure |
| **TXT** | Native | Plain text with chapter markers |
| **Markdown** | markdown2 | Structured content |
| **HTML** | BeautifulSoup | Web-scraped texts |
| **DOC/DOCX** | python-docx | Microsoft Word documents |

### Processing Pipeline

```
Upload Document
       ↓
Metadata Extraction (Title, Author, Language)
       ↓
Chunking & Segmentation
       ↓
Content Classification (Concept vs Narrative)
       ↓
Concept Extraction & Mapping
       ↓
Skill Decomposition (What can be learned?)
       ↓
Micro-Lesson Generation
       ↓
Exercise & Quiz Generation
       ↓
Prerequisite Mapping
       ↓
Knowledge Graph Construction
       ↓
Personalization Engine (per user)
       ↓
Curriculum Sequencing
       ↓
Assessment Framework
       ↓
Storage in Knowledge System
```

### Data Models

#### BookMetadata

```typescript
interface BookMetadata {
  id: string; // UUID
  userId: string; // Who uploaded
  title: string;
  author: string;
  language: string;
  tradition: "Advaita" | "Bhakti" | "Tantra" | "Yoga" | "Buddhism" | "Taoism" | "other";
  uploadedAt: Date;
  fileUrl: string; // Stored reference
  fileSize: number;
  pages: number;
  estimatedReadingHours: number;
  
  // Content classification
  primaryTopics: string[]; // ["meditation", "karma", "consciousness"]
  difficulty: "beginner" | "intermediate" | "advanced" | "scholarly";
  prerequisites: string[]; // Other books or concepts
  
  // Processing status
  processingStatus: "queued" | "processing" | "completed" | "failed";
  processingProgress: number; // 0-100
  processedAt?: Date;
  extractedChapters: number;
  extractedConcepts: number;
  generatedLessons: number;
}
```

#### Chapter

```typescript
interface Chapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  content: string;
  summary: string; // AI-generated
  duration: number; // minutes to read
  
  // Structured extraction
  concepts: Concept[];
  skills: Skill[];
  practices: Practice[];
  reflectionPrompts: string[];
  
  // Learning metadata
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: Chapter[];
  nextChapter?: Chapter;
}
```

#### Concept

```typescript
interface Concept {
  id: string;
  name: string;
  definition: string; // 1-2 sentences
  etymology?: string;
  synonyms: string[];
  relatedConcepts: Concept[];
  tradition: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  
  // Knowledge graph
  incomingRelations: { concept: Concept; type: "prerequisite" | "related" | "opposite" }[];
  outgoingRelations: { concept: Concept; type: "prerequisite" | "related" | "opposite" }[];
  
  // Instances in text
  appearances: { chapter: string; context: string }[];
}
```

#### Skill

```typescript
interface Skill {
  id: string;
  name: string;
  description: string;
  category: "meditation" | "breath" | "mantra" | "visualization" | "philosophy" | "practice";
  proficiencyLevels: {
    beginner: LessonMilestone;
    intermediate: LessonMilestone;
    advanced: LessonMilestone;
  };
  
  // Learning path
  prerequisites: Skill[];
  relatedSkills: Skill[];
  nextSkills: Skill[];
  
  // Measurement
  assessmentCriteria: string[];
  practiceDuration: { min: number; max: number; unit: "minutes" };
  
  // Certification
  certificationAvailable: boolean;
}
```

#### MicroLesson

```typescript
interface MicroLesson {
  id: string;
  bookId: string;
  concept: Concept;
  skill: Skill;
  
  // Content
  title: string;
  narrative: string; // 2-3 minutes reading
  keyPoints: string[];
  voiceNarration: { text: string; audio?: AudioBlob };
  
  // Media
  illustrations?: string[]; // Generated images
  diagram?: SVGContent;
  references: { text: string; location: string }[]; // Page references
  
  // Learning design
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: MicroLesson[];
  
  // Engagement
  learningObjectives: string[];
  keyTakeaway: string;
  relevantPractice: Practice;
}
```

#### Practice

```typescript
interface Practice {
  id: string;
  type: "meditation" | "breath" | "mantra" | "visualization" | "contemplation" | "journaling";
  title: string;
  description: string;
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  
  // Guided version (AI-narrated)
  guidedAudio?: AudioBlob;
  guidedTranscript: string;
  
  // Instructions
  steps: {
    stepNumber: number;
    instruction: string;
    duration?: number;
    focusPoint: string;
    affirmation?: string;
  }[];
  
  // Outcomes
  expectedOutcomes: string[];
  counterindications: string[]; // When NOT to do this
  
  // Integration
  relatedConcepts: Concept[];
  relatedSkills: Skill[];
}
```

#### SkillGraph

```typescript
interface SkillGraph {
  userId: string;
  bookId: string;
  nodes: Skill[];
  edges: {
    from: Skill;
    to: Skill;
    type: "prerequisite" | "builds_on" | "complements";
    strength: number; // 0-1
  }[];
  
  // User's position in graph
  masteredSkills: Skill[];
  inProgressSkills: Skill[];
  availableNext: Skill[];
  blockedSkills: Skill[]; // Prerequisites not met
  
  // Learning velocity
  averageTimePerSkill: number; // minutes
  completionRate: number; // 0-1
}
```

#### Curriculum

```typescript
interface Curriculum {
  id: string;
  userId: string;
  bookId: string;
  title: string;
  description: string;
  
  // Personalization parameters
  userArchetype: "beginner" | "practitioner" | "scholar" | "teacher";
  availableTime: "5min" | "15min" | "30min" | "60min" | "flexible";
  learningStyle: "visual" | "auditory" | "kinesthetic" | "reading-writing" | "mixed";
  interests: string[]; // Specific topics within the book
  
  // Generated curriculum
  modules: {
    moduleNumber: number;
    title: string;
    duration: number;
    lessons: MicroLesson[];
    practice: Practice;
    reflection: {
      prompt: string;
      expectedDuration: number;
    };
    assessment: {
      type: "quiz" | "reflection" | "practice_demonstration";
      questions: AssessmentQuestion[];
    };
  }[];
  
  // Progress tracking
  progress: {
    completedModules: number;
    totalModules: number;
    completionDate?: Date;
    certificateEarned?: boolean;
  };
}
```

#### AssessmentQuestion

```typescript
interface AssessmentQuestion {
  id: string;
  type: "multiple_choice" | "short_answer" | "voice_response" | "practice_demo";
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string;
  rubric?: string; // For open-ended evaluation
  difficulty: "beginner" | "intermediate" | "advanced";
}
```

### Processing Algorithms

#### 1. Intelligent Chunking

```python
def chunk_document(document, strategy="semantic"):
    """
    Split document into semantically meaningful chunks (200-500 tokens).
    Strategies:
    - "semantic": Use embeddings to identify natural break points
    - "structural": Follow document hierarchy (chapters, sections)
    - "hierarchical": Combine both
    """
    pass

def identify_chapters(document):
    """
    Detect chapter boundaries using:
    - Heading patterns (# Chapter, ## Section, etc.)
    - Content flow analysis
    - Page breaks
    - Table of contents
    """
    pass
```

#### 2. Concept Extraction

```python
def extract_concepts(text):
    """
    1. NER (Named Entity Recognition) for proper nouns
    2. KeyBERT/TF-IDF for concepts
    3. Dependency parsing for relationships
    4. Context window extraction (3-5 sentences around each concept)
    """
    pass

def build_knowledge_graph(concepts):
    """
    Connect concepts using:
    - Semantic similarity (embeddings)
    - Syntactic relationships (hypernyms, meronyms)
    - Document co-occurrence
    - Manual hierarchy (if provided)
    """
    pass
```

#### 3. Skill Decomposition

```python
def extract_skills(text, concepts):
    """
    For each concept, identify learnable skills:
    - Meditation techniques
    - Breath practices
    - Philosophical understanding
    - Practical applications
    
    Use prompting:
    "This passage discusses {concept}. What specific skills could a student learn?"
    """
    pass

def create_skill_graph(skills):
    """
    Analyze prerequisite relationships:
    - Skill A must precede Skill B if:
      - B's explanation references A
      - Domain logic requires A first
      - Difficulty progression suggests it
    """
    pass
```

#### 4. Micro-Lesson Generation

```python
def generate_micro_lesson(concept, skill, context):
    """
    For each concept/skill pair:
    1. Extract relevant passages (3-5 from document)
    2. Summarize into 2-3 minute read
    3. Generate voice narration
    4. Create visual aids (diagrams, illustrations)
    5. Design reflection prompt
    6. Build practice exercise
    7. Add contextual links to related concepts
    """
    pass

def generate_voice_narration(text, speaker="guru"):
    """
    Convert lesson text to natural speech:
    - Use speaker voice profile (calm, wise, etc.)
    - Add prosody (emphasis, pacing, pauses)
    - Optimize for learning (slower, clearer)
    - Stream audio generation
    """
    pass
```

#### 5. Personalization Engine

```python
def generate_personalized_curriculum(book, user):
    """
    Input: book_content, user_profile
    
    Factors:
    1. Available time (5 min/day to 1 hour/day)
    2. Learning style (visual, auditory, kinesthetic, reading)
    3. Prior knowledge (user's skill graph)
    4. Interests (topics they care about)
    5. Practice frequency (daily, weekly, etc.)
    
    Output: Curriculum object with:
    - Module sequencing
    - Content depth (beginner/intermediate/advanced)
    - Practice intensity
    - Assessment frequency
    - Estimated completion date
    """
    pass
```

#### 6. Assessment Framework

```python
def generate_assessment(lesson, skill):
    """
    Create multi-modal assessment:
    1. Knowledge check (3-5 questions)
    2. Reflection prompt (user writes/speaks)
    3. Practice demonstration (user performs skill)
    4. Concept application (user relates to own life)
    
    Scoring:
    - MCQ: Binary
    - Reflection: Rubric-based (1-5 scale)
    - Practice: Teacher/AI evaluation
    """
    pass

def evaluate_voice_response(user_speech, expected_answer):
    """
    For voice-based assessments:
    1. Transcribe speech
    2. Extract semantic meaning
    3. Compare with expected answer using embeddings
    4. Return score (0-1) + feedback
    """
    pass
```

### Integration with Existing Systems

#### Knowledge API Extension

```typescript
// New endpoints
GET /api/knowledge/books/
POST /api/knowledge/books/upload
GET /api/knowledge/books/{bookId}/curriculum
GET /api/knowledge/books/{bookId}/lessons
GET /api/knowledge/skills/
GET /api/knowledge/concepts/
POST /api/knowledge/curriculum/{curriculumId}/progress
```

#### Archivist Integration

```typescript
// Store all processed books, lessons, and progress
POST /api/archivist/books/{bookId}
POST /api/archivist/progress/{userId}/{bookId}
GET /api/archivist/user-library
```

#### Certificate System

```typescript
interface CurriculumCertificate {
  id: string;
  userId: string;
  bookId: string;
  issuedAt: Date;
  skills: Skill[];
  practiceHours: number;
  shareable: boolean;
  verificationUrl: string;
}
```

---

## Module Integration Framework

### Vision: Voice-Native Module Variants

Every existing module gets a **voice-first companion**:

| Existing Module | Voice-First Variant | Integration Pattern |
|-----------------|-------------------|---------------------|
| Breath | Voice Breath Coach | AI narrates pace, user responds |
| Chakra Scanner | Voice Chakra Dialogue | AI asks, user describes sensations |
| Meditation | Guided Voice Meditation | Full speech synthesis + user presence |
| Mantra Vault | Voice Mantra Coach | AI listens to pronunciation, corrects |
| Journal | Voice Journal / Karma Diary | User speaks, AI transcribes + analyzes |
| Dreams | Voice Dream Interpreter | User speaks dream, AI analyzes in real-time |
| Reflections | Spoken Reflection | User speaks reflection, stored as voice + transcript |
| Calendar | Voice Calendar Assistant | "What practices should I do today?" |
| Oracle | Voice Oracle Reading | AI reads cards, interprets aloud |
| Crisis Support | Crisis Voice Guide | Emergency breathing + emotional support via voice |

### Integration Patterns

#### Pattern 1: Narrated Experience

**Modules:** Breath, Meditation, Mantra Coaching

```
User Action → AI Narration → Real-time Feedback → Completion
     ↓              ↓               ↓                  ↓
"Guide me"  → Guides via voice → Corrects pace → "Well done"
```

**Implementation:**
- Speech synthesis narrates steps
- Speech recognition detects user actions (breathing, sounds)
- Real-time adjustment based on pacing

#### Pattern 2: Dialogue-Based Guidance

**Modules:** Chakra Scanner, Dream Interpretation, Emotional Support

```
AI Question → User Voice Response → AI Interpretation → Guidance
      ↓              ↓                    ↓                 ↓
"Where is     "In my      → Emotion/location     → "Let's work with
 pain?"       chest"         extraction          that area"
```

**Implementation:**
- AI asks guided questions
- User responds by voice
- Semantic analysis of response
- Dynamic follow-up based on content

#### Pattern 3: Transcription + Storage

**Modules:** Journal, Reflections, Dreams

```
User Speech → Transcription → Analysis → Storage → Search/Recall
     ↓            ↓             ↓          ↓          ↓
"I felt    → [transcript]  → Emotions  → DB    → "Show me when
 sad"                        extracted       I talked about
                                             sadness"
```

**Implementation:**
- Real-time streaming transcription
- Named entity extraction (people, places, emotions)
- Vector embeddings for semantic search
- Timeline visualization

#### Pattern 4: Skill-Based Coaching

**Modules:** Mantra Chanting, Yantra Visualization, Ritual Performance

```
User Attempts → AI Evaluates → Feedback → Correction → Mastery
        ↓            ↓            ↓           ↓           ↓
 [Speech/     Pattern       "Good       Adjust      Tracked
  action]     matching      pace, but   timing"     in skill
              + comparison  pronunciation?"       graph
```

**Implementation:**
- Record user's attempt (audio/video)
- Compare with ideal using embeddings + spectral analysis
- Provide specific, actionable feedback
- Track skill progression in Skill Graph

#### Pattern 5: Contextual Navigation

**Modules:** All modules

```
User Intent → Voice Command → Module Routing → Context Preservation
      ↓            ↓              ↓                    ↓
"Show me    → Intent: navigate  → Route to     → Preserve previous
 breath"      + query: "breath"    Breath module   conversation state
```

**Implementation:**
- Parse natural language commands
- Route to appropriate module
- Maintain conversation context across modules
- Enable cross-module practices

---

## AI Guru Mode

### Overview

The **AI Guru** is an advanced conversational AI that:
- Speaks naturally like a spiritual teacher
- Remembers every conversation with the user
- Adapts teaching style to user's level and needs
- Generates personalized guidance
- Teaches lessons from uploaded books
- Guides practices in real-time
- Evaluates student understanding
- Builds a personal relationship over time

### Core Behaviors

#### 1. Initial Assessment

```
Welcome interaction to establish:
- User's experience level (beginner/practitioner/scholar)
- Primary interests (meditation, philosophy, service, etc.)
- Available practice time
- Learning style preference
- Current emotional/life situation
```

#### 2. Personalized Teaching

```
For each interaction:
- Retrieve user's learning history & skill graph
- Identify optimal next concept/skill
- Adapt explanation depth & style
- Use examples from user's own experiences
- Remember previous questions & confusion points
```

#### 3. Practice Guidance

```
During practice:
- Narrate instructions clearly
- Monitor for indicators of success/struggle
- Provide real-time corrections
- Adjust pacing based on detected pace
- Offer encouragement & grounding techniques
```

#### 4. Evaluation & Feedback

```
After practice:
- Ask the user to reflect
- Evaluate spoken answers using semantics
- Identify areas for improvement
- Celebrate progress
- Suggest next steps
```

#### 5. Long-term Growth Tracking

```
Over weeks/months:
- Chart emotional evolution
- Identify patterns in practice quality
- Recommend curriculum adjustments
- Build personalized milestones
- Generate periodic progress reports
```

### Guru Voice Profiles

```typescript
interface GuruVoiceProfile {
  name: string;
  archetype: "wise_elder" | "compassionate_guide" | "rigorous_teacher" | "encouraging_friend";
  voiceCharacteristics: {
    gender: "male" | "female" | "neutral";
    accent: "Indian" | "Western" | "Sanskrit-influenced";
    pace: "slow" | "moderate" | "natural";
    pitch: number; // Semitones
    warmth: number; // 0-1 scale (emotional warmth in voice)
  };
  
  // Teaching style
  teachingApproach: {
    explanation_depth: "beginner" | "intermediate" | "advanced";
    use_stories: boolean;
    use_examples_from_user_life: boolean;
    directness: "very_gentle" | "balanced" | "direct";
    use_silence: boolean; // Contemplative pauses
    use_questions: boolean; // Socratic method
  };
  
  // Catchphrases & speech patterns
  openings: string[];
  closings: string[];
  encouragements: string[];
  clarifications: string[];
  transitions: string[];
}
```

### Guru Prompt System

The AI Guru uses a sophisticated system prompt that includes:

```
You are [GuruName], a spiritual guide with deep knowledge of:
- Vedantic philosophy
- Yogic practices
- Meditation techniques
- Mantra recitation
- Tantric wisdom
- Comparative spirituality

Your student's profile:
- Level: [User's level]
- Interests: [User's interests]
- Practice history: [Recent practices]
- Emotional state: [Detected from latest sessions]

Current context:
- Module: [Current module]
- Practice duration: [How long they've been practicing]
- Recent challenges: [Identified struggles]

Teaching principles:
1. Meet them where they are
2. Use their own examples
3. Never overwhelm with information
4. Ask questions to deepen understanding
5. Celebrate progress, however small
6. Adapt based on feedback

Remember to:
- Reference their previous conversations
- Use their preferred learning style
- Speak in calm, supportive tone
- Maintain continuity across sessions
```

### Guru Knowledge Base

The AI Guru has access to:

1. **Uploaded Books** — Full text of all user-uploaded spiritual texts
2. **Knowledge Graph** — Interconnected concepts, skills, practices
3. **User Memory** — All conversations, reflections, dreams, journal entries
4. **Skill Graphs** — User's progress across all domains
5. **Best Practices** — Curated guidance for each practice type
6. **Comparative Wisdom** — Cross-tradition perspectives

---

## Learning & Curriculum System

### Personalization Architecture

#### User Archetypes

```typescript
type UserArchetype = 
  | "seeker" // Just beginning the path, exploring
  | "dedicated_practitioner" // Regular practice, established routine
  | "scholar" // Intellectually driven, philosophical
  | "devotional" // Emotionally driven, relationship-based
  | "service_oriented" // Action-driven, karma yoga focus
  | "crisis_seeking_support" // Emergency state, needs grounding
```

#### Personalization Factors

```typescript
interface PersonalizationFactors {
  // Engagement
  availableTimePerDay: "5min" | "15min" | "30min" | "60min" | "flexible";
  practiceFrequency: "daily" | "3-4x/week" | "weekly" | "occasional";
  preferredTime: "morning" | "afternoon" | "evening" | "flexible";
  
  // Learning
  learningStyle: "visual" | "auditory" | "kinesthetic" | "reading-writing";
  intellectualDepth: "beginner" | "intermediate" | "advanced" | "scholarly";
  
  // Emotional/Spiritual
  emotionalState: "calm" | "anxious" | "grieving" | "joyful" | "confused";
  spiritualMaturity: "seeker" | "practitioner" | "adept" | "teacher";
  primaryMotivation: "peace" | "growth" | "knowledge" | "devotion" | "service";
  
  // Context
  lifeStage: "student" | "professional" | "parent" | "retired" | "transition";
  challenges: string[]; // "anxiety", "insomnia", "relationship", etc.
  
  // Previous Learning
  priorKnowledge: { topic: string; level: "beginner" | "intermediate" | "advanced" }[];
  learningVelocity: number; // Lessons/week completed (tracked)
  completionRate: number; // % of started courses finished
  
  // Preferences
  languagePreference: string;
  voicePreference: GuruVoiceProfile;
  interfacePreference: "voice_only" | "voice_primary" | "balanced" | "text_primary";
}
```

#### Adaptive Learning Algorithm

```python
def generate_personalized_curriculum(user: User, book: Book):
    """
    Generate custom learning path based on user profile
    """
    # Step 1: Assess user's current skill level
    user_skills = analyze_user_skill_graph(user)
    
    # Step 2: Identify prerequisite concepts user needs
    prerequisites = identify_prerequisites(user_skills, book)
    
    # Step 3: Filter book content for user's interests
    relevant_lessons = filter_by_interests(
        book.lessons, 
        user.interests,
        relevance_threshold=0.7
    )
    
    # Step 4: Sequence lessons by:
    # - Prerequisites first
    # - Difficulty progression
    # - User's available time
    # - Optimal learning velocity
    sequenced = sequence_lessons(
        relevant_lessons,
        user.learning_velocity,
        user.available_time_per_day,
        user.learning_style
    )
    
    # Step 5: Build curriculum with personalized pacing
    curriculum = Curriculum(
        modules=[
            create_module(
                lesson=lesson,
                practice_duration=adapt_duration(user),
                reflection_type=adapt_reflection_style(user),
                assessment_type=adapt_assessment(user),
                narration_voice=user.voice_preference
            )
            for lesson in sequenced
        ],
        estimated_completion_date=estimate_completion(
            len(sequenced),
            user.learning_velocity,
            user.practice_frequency
        ),
        difficulty_curve=generate_difficulty_curve(user)
    )
    
    return curriculum

def adapt_pacing(user: User) -> float:
    """Adjust content pacing based on velocity"""
    base_pacing = 1.0
    if user.learning_velocity > 2.5: # Lessons/week
        return 1.2 # Increase content density
    elif user.learning_velocity < 0.5:
        return 0.8 # Reduce content, more repetition
    return base_pacing

def generate_difficulty_curve(user: User) -> List[float]:
    """Create natural progression in difficulty"""
    # Most users learn best with:
    # 1. Easy intro (build confidence)
    # 2. Gradual increase (maintain engagement)
    # 3. Peak challenge (stretch zone)
    # 4. Consolidation (mastery)
    
    num_modules = estimated_modules(user)
    curve = []
    
    for i in range(num_modules):
        progress = i / num_modules
        if progress < 0.2:
            difficulty = 0.4 + progress * 1.0 # Intro: 0.4 → 0.6
        elif progress < 0.7:
            difficulty = 0.6 + (progress - 0.2) * 0.44 # Ramp: 0.6 → 1.0
        else:
            difficulty = 0.9 + (progress - 0.7) * 0.33 # Consolidate: 1.0 → 1.1
        
        curve.append(min(difficulty, 1.0))
    
    return curve
```

### Learning Objectives & Outcomes

```typescript
interface ModuleOutcomes {
  // Knowledge
  conceptsToLearn: string[];
  keyInsights: string[];
  
  // Skills
  skillsToPractice: Skill[];
  proficiencyTarget: "awareness" | "competence" | "mastery";
  
  // Experience
  practicesIncluded: Practice[];
  meditationMinutesIncluded: number;
  
  // Assessment
  assessmentMethod: "quiz" | "reflection" | "practice_demo" | "mixed";
  passingCriteria: "80% quiz" | "Guru approval" | "Completion";
  
  // Habits
  habitsBuilt: string[]; // e.g., "daily meditation", "mantra recitation"
  commitmentRequired: string; // e.g., "5 min/day for 30 days"
}
```

---

## Data Models & Storage

### Database Schema Overview

```
Users
├── BasicInfo (name, email, language)
├── Profile (archetype, interests, available_time)
├── SkillGraph (user's progress across skills)
└── VoiceSessions (conversation history)

Books
├── Metadata (title, author, tradition, difficulty)
├── Content (text, chapters, sections)
├── ProcessingStatus (queued, processing, complete)
└── Extracted (chapters, concepts, skills, lessons)

Chapters
├── Metadata (number, title, duration)
├── Content (full text)
├── Concepts (extracted concepts)
├── Skills (taught skills)
└── Practices (recommended practices)

Concepts
├── Definition & Etymology
├── Relationships (prerequisites, related, opposite)
├── Appearances (chapters, context)
└── KnowledgeGraph (edges to other concepts)

Skills
├── Definition & Category
├── Prerequisites & Related Skills
├── Proficiency Levels (beginner/intermediate/advanced)
└── UserProgress (per user)

MicroLessons
├── Content (narrative, keypoints)
├── VoiceNarration (text + audio)
├── Media (illustrations, diagrams)
├── References (page citations)
└── Assessments (quiz, reflection, practice)

Practices
├── Instructions (steps, timings)
├── GuidedAudio (AI-narrated version)
├── Outcomes & Counterindications
└── UserAttempts (recorded + scored)

Curricula
├── Metadata (user, book, personalization factors)
├── Modules (lessons + practice + assessment)
├── Progress (completed, in progress)
└── Certificate (if completed)

VoiceSessions
├── Metadata (user, module, mode, datetime)
├── Transcript (full conversation)
├── Emotion (detected emotions over time)
├── IntentSequence (parsed intents)
└── AudioLog (stored voice files)

Journals & Reflections
├── Text/Voice (user's entry)
├── Transcription (if voice)
├── Analysis (entities, emotions, themes)
├── Timeline (for visualization)
└── Search Index (vector embeddings)
```

### Key Schema Extensions

```sql
-- New tables for Book-to-Skill system

CREATE TABLE books (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  author TEXT,
  language VARCHAR(10),
  tradition VARCHAR(50),
  difficulty VARCHAR(20),
  file_url TEXT,
  upload_date TIMESTAMP,
  processing_status VARCHAR(20),
  processing_progress FLOAT,
  extracted_chapters INT,
  extracted_concepts INT,
  generated_lessons INT
);

CREATE TABLE concepts (
  id UUID PRIMARY KEY,
  book_id UUID REFERENCES books(id),
  name TEXT,
  definition TEXT,
  etymology TEXT,
  difficulty VARCHAR(20),
  tradition VARCHAR(50)
);

CREATE TABLE skill_relations (
  prerequisite_skill_id UUID REFERENCES skills(id),
  dependent_skill_id UUID REFERENCES skills(id),
  strength FLOAT,
  PRIMARY KEY (prerequisite_skill_id, dependent_skill_id)
);

CREATE TABLE curricula (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  book_id UUID REFERENCES books(id),
  user_archetype VARCHAR(50),
  available_time VARCHAR(20),
  learning_style VARCHAR(50),
  completion_percentage FLOAT,
  estimated_completion_date DATE,
  completed_at TIMESTAMP
);

CREATE TABLE voice_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  module_id VARCHAR(100),
  mode VARCHAR(30),
  transcript TEXT,
  emotion_detected TEXT,
  emotion_confidence FLOAT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  duration_minutes INT,
  audio_stored BOOLEAN,
  audio_url TEXT
);

-- Full-text search for transcripts
CREATE INDEX transcript_search ON voice_sessions USING gin(to_tsvector('english', transcript));

-- Vector search for semantic similarity
CREATE TABLE voice_session_embeddings (
  session_id UUID REFERENCES voice_sessions(id),
  embedding vector(1536), -- OpenAI embeddings
  PRIMARY KEY (session_id)
);

CREATE INDEX voice_embeddings_search ON voice_session_embeddings USING ivfflat (embedding vector_cosine_ops);
```

---

## Voice-First Module Specifications

### 1. Voice Breath Coach

**Current:** Breath (animations + timer)  
**Voice-First:** AI guides breathing with real-time feedback

#### Flow

```
1. User: "Guide me through a breathing exercise"
   → AI: "Let's do a 4-7-8 breath. Set your intention..."

2. AI narrates: "Inhale for 4 counts..."
   → User breathes in (AI detects via ambient sound/motion)

3. AI: "Hold for 7..."
   → Silence (AI listens for micro-sounds)

4. AI: "Exhale slowly for 8..."
   → User exhales

5. Repeat 4 cycles
   → AI: "Wonderful. How do you feel now?"
   
6. User responds
   → AI analyzes & provides feedback
```

#### Implementation

```typescript
interface VoiceBreathCoach {
  // Configuration
  breathingPattern: "4-7-8" | "box" | "alternate_nostril" | "ujjayi" | "bhastrika";
  cycles: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  
  // Guidance
  narration: {
    voiceProfile: GuruVoiceProfile;
    speechRate: 0.8; // Slow for meditation
    emphasizeKeyWords: ["inhale", "hold", "exhale"];
  };
  
  // Monitoring
  detection: {
    soundAmplitude: boolean; // Detect breathing sounds
    motionTracking?: boolean; // Via device accelerometer
    heartRateIfAvailable?: boolean; // Smartwatch integration
  };
  
  // Feedback
  correction: {
    ifTooFast: "You're breathing a bit quickly. Let's slow down...";
    ifTooSlow: "Good. Deep breathing. Continue...";
    ifUneven: "Try to make your exhales as long as your inhales...";
  };
}
```

### 2. Voice Chakra Scanner

**Current:** Chakra Scanner (questionnaire + visualization)  
**Voice-First:** Natural dialogue about energy sensations

#### Flow

```
1. AI: "Let's explore your energy today. Where in your body do you feel energy right now?"

2. User: "In my chest, it feels tight"
   → AI parses location + sensation

3. AI: "The chest houses the heart center. Tell me more about this tightness."

4. User: "It's like sadness is stuck there"
   → AI detects emotion (sadness) + location (heart/Anahata)

5. AI: "Often when grief sits here, we find it eases with gentle breath. 
   Let's do a heart-opening practice..."

6. Guides practice → Checks in afterward
   → Stores in user's Chakra profile
```

#### Implementation

```typescript
interface VoiceChakraScanner {
  // Dialogue flow
  questions: {
    initial: "Where in your body do you feel energy, sensation, or tightness?";
    follow_up: (location: string, sensation: string) => string;
    emotional: "What emotion, if any, seems connected to this?";
    intensity: "On a scale of 1-10, how intense is this sensation?";
  };
  
  // Chakra mapping
  anatomyToChakra: {
    head: "Sahasrara";
    forehead: "Ajna";
    throat: "Vishuddha";
    heart: "Anahata";
    solar_plexus: "Manipura";
    belly: "Svadhisthana";
    base_spine: "Muladhara";
  };
  
  // Response to location + emotion
  recommendedPractices: (chakra: string, emotion: string) => Practice[];
  
  // Storage
  scanResult: {
    timestamp: Date;
    chakraPrimary: string;
    sensation: string;
    emotionDetected: string;
    intensity: 1-10;
    followUpPractice: Practice;
  };
}
```

### 3. Voice Journal / Karma Diary

**Current:** Journal (text entry)  
**Voice-First:** Stream-of-consciousness voice journaling

#### Flow

```
1. User starts voice journal
   → AI: "Share what's on your heart..."

2. User speaks freely for 5-10 minutes
   → Audio streaming → Real-time transcription
   → Background emotion detection

3. AI listens silently (respectful presence)
   → Occasionally: "I'm here, continue..."
   → Detects when user naturally pauses

4. After user finishes
   → AI: "Thank you for sharing. I heard themes of [joy, grief, confusion]"
   → Offers reflection: "These feelings often teach us about..."

5. AI extracts:
   - Key themes
   - Named entities (people, places, events)
   - Emotions (valence + specific emotion)
   - Actionable insights
   - Relevant practices

6. Stores:
   - Original audio
   - Transcription
   - Analysis
   - Vector embeddings (for semantic search)
```

#### Implementation

```typescript
interface VoiceJournal {
  // Session management
  startSession: () => Promise<VoiceSession>;
  
  // Capture
  isRecording: boolean;
  transcript: string;
  interimTranscript: string;
  
  // Analysis
  parallelAnalysis: {
    emotionTimeline: { timestamp: number; emotion: string; valence: number }[];
    entities: {
      people: string[];
      places: string[];
      events: string[];
    };
    themes: string[];
  };
  
  // Storage
  saveEntry: () => Promise<JournalEntry>;
  
  // Retrieval
  search: (query: string) => Promise<JournalEntry[]>;
  searchByEmotion: (emotion: string) => Promise<JournalEntry[]>;
  showTimeline: () => EmotionalTimeline;
}

interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  audioBlob: Blob;
  audioUrl: string;
  transcript: string;
  analysis: {
    themes: string[];
    entities: { people: string[]; places: string[]; events: string[] };
    emotions: { emotion: string; confidence: number; timestamp: number }[];
    summary: string;
    keyInsights: string[];
  };
  embedding: number[]; // Vector for semantic search
}
```

### 4. Voice Dream Interpreter

**Current:** Dreams (form entry)  
**Voice-First:** Natural storytelling + real-time analysis

#### Flow

```
1. User: "I want to explore a dream I had"
   → AI: "Tell me the dream, in any order. Include colors, emotions, sensations..."

2. User tells dream (naturally, without pressure)
   → Real-time extraction of:
     - Characters
     - Settings
     - Objects
     - Emotional arc
     - Sensations

3. AI listens, occasionally asks:
   "What did that symbol feel like?"
   "Where were you in this moment?"
   "How did the dream end?"

4. After full story
   → AI: "I heard themes of [transformation, loss, power]"
   → Connects to user's current life: "These often appear when we're..."

5. Offer interpretation:
   "In many traditions, water represents the emotional/subconscious...
   The fact that you were swimming might suggest integration..."

6. Personalize based on user:
   - Their previous dreams (patterns)
   - Current life situation
   - Spiritual practice
   - Psychological state

7. Store:
   - Audio
   - Transcript
   - Extracted symbols
   - Interpretation
   - Links to previous dreams (if pattern matches)
```

#### Implementation

```typescript
interface VoiceDreamInterpreter {
  // Dream capture
  startDreamCapture: () => void;
  recordDream: () => Promise<DreamEntry>;
  
  // Analysis
  extractSymbols: (transcript: string) => string[];
  extractEmotions: (transcript: string, audio: AudioBlob) => EmotionTimeline;
  findPatterns: (newDream: DreamEntry, previousDreams: DreamEntry[]) => Pattern[];
  
  // Interpretation
  generateInterpretation: (dream: DreamEntry, userContext: User) => string;
  
  // Storage & Retrieval
  saveDream: (entry: DreamEntry) => Promise<void>;
  findRecurringSymbols: (userId: string) => Record<string, number>;
  showDreamTimeline: (userId: string) => DreamTimeline;
  
  // Knowledge base
  symbolDatabase: {
    symbol: string;
    traditions: Record<string, string>; // "water" -> { Jungian: "...", Hindu: "..." }
    commonMeanings: string[];
  }[];
}

interface DreamEntry {
  id: string;
  userId: string;
  date: Date;
  audioBlob: Blob;
  transcript: string;
  analysis: {
    symbols: { symbol: string; frequency: number }[];
    emotions: EmotionTimeline;
    emotionalArc: "tragic" | "comedic" | "mysterious" | "powerful";
    setting: string;
    characters: string[];
  };
  interpretation: {
    symbolAnalysis: string;
    psychologicalInsight: string;
    spiritualMeaning: string;
    personalConnection: string;
    recommendedReflection: string;
  };
  relatedToCurrentLife: string; // AI's assessment of relevance
  links: {
    toPreviousDream: DreamEntry[]; // Similar dreams
    toUserSituation: string[]; // Recent events/emotions
  };
}
```

### 5. Crisis Voice Guide

**Current:** Crisis (emergency resource page)  
**Voice-First:** Immediate calm support through speech

#### Flow

```
Detection (auto-trigger on emotional crisis patterns):
User triggers crisis mode (button) OR AI detects crisis language
  → Immediate: "I'm here. You're safe. Let's ground together."

Immediate grounding (2-3 minutes):
  AI: "Feel your feet on the ground. Let's breathe together."
  Guides 4-4-4 breathing
  User present + responsive to voice

Emotional check-in:
  AI: "What do you need right now? Safety? Calm? Connection?"
  User responds
  AI: Adapts guidance

Escalation pathway (if needed):
  "Would it help to call a crisis line? Let me have that ready."
  → Provides resources alongside AI support

Follow-up:
  Stores crisis event
  Offers follow-up check-in
  Recommends practices for stabilization
```

#### Implementation

```typescript
interface CrisisVoiceGuide {
  // Detection
  crisisPatterns: RegExp[];
  emotionThreshold: number; // When emotion is > threshold
  escalationTrigger: () => boolean;
  
  // Immediate response
  groundingTechniques: {
    breathingPattern: "4-4-4";
    bodyAwareness: "feet_grounding";
    affirmations: string[];
  };
  
  // Escalation
  resources: {
    suicideHotline: string;
    crisisText: string;
    emergencyServices: string;
    localMentalHealth: string;
  };
  
  // Duration tracking
  timeInCrisis: number;
  interventionStartTime: Date;
  userResponsiveness: "high" | "medium" | "low";
  
  // Post-crisis
  storeCrisisEvent: (entry: CrisisEntry) => Promise<void>;
  scheduledCheckIn: (hours: number) => Promise<void>;
  recommendStabilizingPractices: () => Practice[];
}

interface CrisisEntry {
  id: string;
  userId: string;
  timestamp: Date;
  triggerDetected: string;
  guideAudioBlob: Blob;
  userResponse: string;
  escalated: boolean;
  resourcesProvided: string[];
  durationMinutes: number;
  followUpScheduled: Date;
}
```

### 6. Guided Mantra Practice

**Current:** Mantra Vault (library + counter)  
**Voice-First:** AI-guided chanting with real-time feedback

#### Flow

```
1. User selects mantra (e.g., "Om Namah Shivaya")
   AI: "Let's chant together. I'll guide the pace..."

2. AI chants first syllable
   User repeats: "Om"
   → Audio analysis: checks pitch, rhythm, clarity

3. AI provides feedback:
   "Good - try to round your lips more for the 'O' sound"
   Or: "Beautiful pronunciation!"

4. Continue through full mantra (5-10 repetitions)
   → Track:
     - Accuracy of each syllable
     - Progression (improve over repetitions?)
     - Student's energy/presence

5. After practice:
   AI: "How do you feel in your body?"
   User responds
   
6. Store:
   - Audio recording
   - Pronunciation accuracy
   - Energy detected
   - User's feedback
   - Practice streak tracking
```

#### Implementation

```typescript
interface GuidedMantraPractice {
  // Mantra selection & preparation
  mantra: {
    text: string;
    transliteration: string;
    pronunciation: AudioBlob;
    meaning: string;
    syllables: string[];
  };
  
  // Guidance
  narration: GuruVoiceProfile;
  pacePerCycle: number; // seconds per full repetition
  numberOfCycles: number;
  
  // Real-time analysis
  analyzePronunciation: (
    userAudio: AudioBlob,
    expectedAudio: AudioBlob
  ) => {
    syllableAccuracy: { syllable: string; accuracy: 0-1 }[];
    rhythmAccuracy: 0-1;
    pitchRangeMatch: 0-1;
    overallScore: 0-1;
    feedback: string;
  };
  
  // Progress tracking
  recordPractice: (attempt: MantraPracticeAttempt) => void;
  showProgressionGraph: () => ProgressGraph;
  
  // Personalization
  recommendNextMantra: () => Mantra;
  suggestIntensification: () => MantraModification;
}

interface MantraPracticeAttempt {
  timestamp: Date;
  mantra: string;
  userAudioBlob: Blob;
  cyclesCompleted: number;
  overallAccuracy: 0-1;
  syllableAccuracies: Record<string, 0-1>;
  rhythmAccuracy: 0-1;
  energyDetected: string;
  userFeedback: string;
}
```

---

## Technical Requirements

### Frontend Stack

```
Runtime: Node.js 22+
Framework: Next.js 16.2.6
React: 19.2.6
Language: TypeScript 5.9+

CSS & Styling:
  - Tailwind CSS 4.1.17
  - Custom motion system (Framer Motion 12.42.2)
  - CSS-in-JS for dynamic theming

Audio Processing:
  - Web Audio API (native)
  - Streaming transcription client library
  - Real-time audio visualization

State Management:
  - React Server Components (RSC) for data
  - Context API for UI state
  - SWR for client-side data fetching
  - Zustand (if complex client state)

UI Components:
  - shadcn/ui (existing patterns)
  - Radix UI primitives
  - Custom spiritual-themed components

Performance:
  - Code splitting by module
  - Progressive enhancement (voice optional)
  - Service Worker for offline PWA
  - Image optimization (Next.js Image)
  - Font optimization (Cormorant, Crimson)
```

### Backend Stack

```
Runtime: Node.js 22 (Vercel)
Framework: Next.js 16.2.6 (API Routes + Server Actions)
Language: TypeScript 5.9+

Database:
  - PostgreSQL (primary, Neon or self-hosted)
  - Drizzle ORM 0.45.2
  - Vector extension for embeddings (pgvector)

Message Queue:
  - Upstash Redis or self-hosted Redis
  - For async book processing jobs
  - For background indexing

Storage:
  - Vercel Blob (for uploaded books, audio)
  - Or S3-compatible (AWS S3, Minio, etc.)

External APIs:
  - Hugging Face Inference API (speech-to-speech)
  - OpenAI API (embeddings, LLM reasoning)
  - Google Cloud Speech-to-Text (fallback)
  - ElevenLabs (voice synthesis, alternative)

Search & Indexing:
  - PostgreSQL full-text search
  - Vector search (pgvector with pgvector-py)
  - Elasticsearch (if scale requires)

File Processing:
  - PyPDF2, pdfplumber (PDF)
  - ebooklib (EPUB)
  - python-docx (DOCX)
  - markdown2 (Markdown)
  - BeautifulSoup (HTML)

Authentication:
  - NextAuth.js v5 with Credentials provider
  - Or existing auth system (preserve)
  - Session management via JWT + httpOnly cookies

Monitoring & Logging:
  - Vercel Analytics
  - Sentry for error tracking
  - Custom logging middleware
  - Audio stream metrics
```

### AI/ML Requirements

```
Core Models:
  1. Speech Recognition
     - Whisper (OpenAI) or
     - Google Cloud Speech-to-Text
     - For: Transcribing user voice

  2. Speech Synthesis
     - Hugging Face (transformers)
     - ElevenLabs API
     - Google Cloud Text-to-Speech
     - For: Guru voice narration

  3. Intent Classification
     - Fine-tuned Intent model
     - Or: GPT-4 with system prompt
     - For: Understanding "what does user want?"

  4. Emotion Detection
     - OpenAI embeddings + similarity
     - Or: Specialized emotion model
     - For: Detecting emotional state from speech + text

  5. Text Embedding (Semantic Search)
     - OpenAI text-embedding-3-large
     - Or: Open-source (BGE, ONNX)
     - For: Finding similar reflections, dreams, etc.

  6. Large Language Model (AI Guru)
     - GPT-4 or Claude 3.5 (Sonnet/Haiku)
     - For: Conversational guidance, teaching, evaluation

  7. Book Processing (NLP)
     - spaCy (NER, dependency parsing)
     - TextRank (summarization)
     - BART (abstractive summarization)
     - For: Extracting concepts, skills, lessons

  8. Knowledge Graph Construction
     - Custom embeddings + similarity
     - LLM-based relationship inference
     - For: Building interconnected concept maps

Inference Strategy:
  - Use Hugging Face Inference API (hosted)
  - Or self-host with vLLM + A100 GPU
  - Stream responses where possible
  - Cache frequent queries
```

### API Design

#### Voice System Endpoints

```typescript
// Voice session management
POST /api/voice/sessions
  Body: { moduleId: string; mode: "practice" | "guidance" | "learning" }
  Response: { sessionId: string; context: VoiceContext }

GET /api/voice/sessions/{sessionId}
  Response: VoiceSession

PATCH /api/voice/sessions/{sessionId}
  Body: { state: VoiceState; transcript?: string; emotion?: string }

DELETE /api/voice/sessions/{sessionId}

// Speech recognition (streaming)
POST /api/voice/transcribe
  Body: FormData { audio: AudioBlob }
  Response: { transcript: string; partial: boolean; emotion?: string }

// Speech synthesis (streaming)
POST /api/voice/synthesize
  Body: { text: string; voice: GuruVoiceProfile; streaming: boolean }
  Response: Stream<AudioChunk>

// Intent detection
POST /api/voice/intent
  Body: { transcript: string; context: string }
  Response: { intent: VoiceIntent; confidence: number; parameters: Record<string, any> }

// Emotion detection
POST /api/voice/emotion
  Body: { audio?: AudioBlob; transcript?: string; context?: string }
  Response: { emotion: string; valence: number; arousal: number; confidence: number }

// Session retrieval
GET /api/voice/sessions/user/{userId}
  Query: { limit: number; offset: number; moduleId?: string }
  Response: VoiceSession[]
```

#### Book-to-Skill Endpoints

```typescript
// Book management
POST /api/knowledge/books/upload
  Body: FormData { file: File; title: string; author: string; tradition: string }
  Response: { bookId: string; processingStatus: "queued" }

GET /api/knowledge/books/{bookId}
  Response: BookMetadata

GET /api/knowledge/books/{bookId}/progress
  Response: { processingProgress: 0-100; status: string }

// Curriculum generation
POST /api/knowledge/curriculum/generate
  Body: { bookId: string; userArchetype: string; availableTime: string; learningStyle: string }
  Response: { curriculumId: string; estimatedModules: number; estimatedHours: number }

GET /api/knowledge/curriculum/{curriculumId}
  Response: Curriculum

PATCH /api/knowledge/curriculum/{curriculumId}/progress
  Body: { completedModuleIndex: number; userReflection?: string }
  Response: { progressPercentage: number; nextModule: Module }

// Lessons & skills
GET /api/knowledge/lessons
  Query: { bookId: string; skillId?: string; difficulty?: string }
  Response: MicroLesson[]

GET /api/knowledge/skills
  Query: { bookId?: string; userId?: string }
  Response: Skill[]

// Assessment
POST /api/knowledge/assessment/submit
  Body: { assessmentId: string; answer: string | AudioBlob }
  Response: { score: 0-1; feedback: string; passedCriteria: boolean }

// Certification
GET /api/knowledge/certificate/{curriculumId}
  Response: Certificate (PDF or URL)
```

#### Guru AI Endpoints

```typescript
// Conversational API
POST /api/guru/chat
  Body: { sessionId: string; message: string | AudioBlob; mode: string }
  Response: Stream<GuruResponse>

interface GuruResponse {
  type: "text" | "audio" | "narrated_text";
  content: string;
  audio?: AudioBlob;
  suggestedNextQuestions?: string[];
  recommendedPractice?: Practice;
}

// Context & memory
GET /api/guru/context/{userId}
  Response: { userArchetype: string; recentPractices: Practice[]; emotionalState: string }

POST /api/guru/remember
  Body: { userId: string; fact: string; importance: 0-1 }
  Response: { stored: boolean }

// Personalization
POST /api/guru/adapt
  Body: { userId: string; feedback: string }
  Response: { adjustments: Adjustments }
```

### Performance Requirements

```
Frontend Performance:
  - First Contentful Paint (FCP): < 1.5s
  - Largest Contentful Paint (LCP): < 2.5s
  - Cumulative Layout Shift (CLS): < 0.1
  - Interaction to Next Paint (INP): < 200ms
  - Core Web Vitals: All green

Audio Performance:
  - Microphone access time: < 500ms
  - First transcript arrival: < 1s
  - Interim transcripts: Every 200ms
  - Speech synthesis start: < 500ms
  - Audio latency end-to-end: < 3s

Backend Performance:
  - API response time (p95): < 500ms
  - Voice session creation: < 200ms
  - Book processing: < 2s per 10KB
  - LLM inference: < 3s (streamed)
  - Database query (p99): < 100ms

Scalability:
  - Support 10,000 concurrent voice sessions
  - Process 100+ books/day
  - Serve 1M+ monthly active users
  - Maintain < 100ms latency at 100x traffic
```

---

## Security & Privacy

### Authentication & Authorization

```typescript
interface SecurityModel {
  authentication: {
    method: "OAuth2" | "Email/Password" | "Passkey";
    sessionDuration: "7 days"; // With refresh
    mfaRequired: boolean; // For voice access
  };
  
  authorization: {
    userId: string; // All queries scoped to user
    moduleAccess: "all" | "limited"; // Role-based
    dataSharing: "private" | "community_opt_in";
  };
  
  audioData: {
    encryption: "AES-256 at rest";
    transitEncryption: "TLS 1.3";
    retention: "30 days" | "user_configured";
    deletion: "Automatic after retention";
    userDelete: "Immediate";
  };
  
  transcripts: {
    storage: "Encrypted database";
    userAccess: "Full access via search";
    deletion: "On user request";
    retention: "Configurable";
  };
}
```

### Privacy Controls

```typescript
interface PrivacySettings {
  // Data collection
  collectEmotionData: boolean;
  collectLocationData: boolean; // If available
  collectHealthData: boolean; // Smartwatch integration
  collectBehavioralData: boolean; // What features used
  
  // Data sharing
  shareWithAI: boolean; // Allow OpenAI training? (opt-in)
  shareWithResearch: boolean; // Academic research
  shareWithTherapist: boolean; // Medical export
  
  // Voice specifics
  recordAudio: boolean;
  recordTranscripts: boolean;
  audioRetention: "7 days" | "30 days" | "90 days" | "1 year" | "forever";
  
  // Export & portability
  exportData: () => Promise<Blob>; // Full data as JSON/ZIP
  requestDeletion: () => Promise<void>; // GDPR right to be forgotten
}
```

### Content Moderation

```typescript
interface ModerationSystem {
  // Harmful content detection
  filters: {
    selfHarm: boolean;
    violence: boolean;
    abuse: boolean;
    spam: boolean;
  };
  
  // Crisis detection
  crisisPatterns: RegExp[];
  emergencyEscalation: {
    threshold: 0.8; // Confidence score
    notifyEmergencyServices: boolean; // If enabled by user
    autoRecommendCrisisResources: true;
  };
  
  // Data sanitization
  removePersonalData: boolean; // PII removal
  anonymizeAtScale: boolean; // For aggregate analytics
}
```

---

## UI/UX Framework

### Design System

#### Voice Interaction Patterns

```
Pattern 1: Push-to-Talk Button
  ├─ Visual state: Listening, Processing, Speaking
  ├─ Haptic feedback: On activation, transcription start, response start
  ├─ Fallback: Text input if speech unavailable
  └─ Accessibility: Screen reader announces state

Pattern 2: Streaming Transcript Display
  ├─ Interim (gray, ephemeral): "guidin..."
  ├─ Final (white, persistent): "Guiding your breath"
  ├─ Emotion indicator: Color shift based on detected emotion
  └─ Edit: User can select/correct words

Pattern 3: Audio Visualization
  ├─ Waveform (real-time amplitude)
  ├─ Frequency spectrum (if applicable)
  ├─ Energy indicator (0-100%)
  ├─ Silence detection indicator
  └─ Theme-aware colors

Pattern 4: Guru Response Display
  ├─ Streaming text appears word-by-word
  ├─ Audio plays simultaneously
  ├─ User can pause, replay, or skip ahead
  ├─ Suggested follow-up questions appear after response
  └─ Related practices suggested on side

Pattern 5: Session Timeline
  ├─ Vertical timeline of user/guru exchanges
  ├─ Click to replay any segment
  ├─ Mark important moments ("bookmark")
  ├─ Search across sessions
  └─ Emotional arc visualization overlay
```

#### Color Palette

```
Primary (Spiritual Gold):   #c9985e
Accent (Deep Indigo):       #2c1a4a
Background (Deep):          #0a0a0a
Surface (Charcoal):         #1a1a1a
Text (Cream):               #f5f0e8
Success (Emerald):          #2d7d5c
Warning (Saffron):          #d4a574
Error (Crimson):            #c84c4c
Calm (Serene Blue):         #3b5998
```

#### Typography

```
Display (Headings):
  Font: Cormorant Garamond
  Weights: 400 (regular), 600 (bold), 700 (extra bold)
  Sizes: 48px (h1), 36px (h2), 28px (h3), 24px (h4)
  Line-height: 1.2

Body (Content & UI):
  Font: Crimson Text
  Weights: 400 (regular), 600 (semibold)
  Sizes: 16px (base), 14px (small), 18px (large)
  Line-height: 1.6 (relaxed reading)

Code/Mono (Transcripts):
  Font: JetBrains Mono
  Size: 14px
  Line-height: 1.4
```

#### Spacing System

```
4px (1x), 8px (2x), 12px (3x), 16px (4x), 24px (6x), 32px (8x), 48px (12x), 64px (16x)

Padding: 16px (default), 24px (generous), 8px (tight)
Margin: 24px (between sections), 16px (between elements)
Gap: 12px (between grid items), 8px (inline)
```

#### Motion & Animation

```
Transitions (Framer Motion):
  Fast (100ms): Hover states, button interactions
  Medium (300ms): Modal opens, panel slides, state changes
  Slow (600ms): Page transitions, complex animations

Easing:
  easeInOut (smooth, natural): Most transitions
  easeOut (quick deceleration): Element entrances
  easeIn (gradual acceleration): Element exits

Entrance animations:
  Fade-in + slight scale
  Stagger children (50ms offset)
  From 80% opacity

Exit animations:
  Fade-out + slight scale
  Reverse of entrance
```

### Page Layouts

#### Voice Dashboard (Homepage)

```
┌─────────────────────────────────────────┐
│ ✓ AstroKalki: Voice Mode Active         │
├─────────────────────────────────────────┤
│                                         │
│        [  🎤 Speak to Guruji  ]        │
│                                         │
│    "What would you like to practice?"   │
│                                         │
├─────────────────────────────────────────┤
│ Recent Practices:                       │
│ • Meditation (3 days ago)               │
│ • Breath work (today)                   │
│ • Dream Journal (2 days ago)            │
├─────────────────────────────────────────┤
│ Today's Recommendation:                 │
│ 🧘 Heart Opening Meditation (15 min)    │
│                                         │
├─────────────────────────────────────────┤
│ Modules: Breath | Chakra | Mantra | ... │
└─────────────────────────────────────────┘
```

#### Voice Session Page (Ongoing)

```
┌────────────────────────────────────────────────┐
│ ◀ Back  |  Breath Session  |  ⋮ Menu           │
├────────────────────────────────────────────────┤
│                                                │
│         📊 [═══════════════════]  Processing... │
│                                                │
│     You: "Guide me through a deep breath"      │
│     [Listening... 2s] [Processing]             │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│     Guru: "Close your eyes. Breathe in slowly │
│     for 4 counts... feel your belly expand..." │
│                                                │
│     [══════════════════════ 12s / 45s]         │
│     [⏸ Pause] [🔁 Replay] [⏩ Skip]             │
│                                                │
├────────────────────────────────────────────────┤
│ Emotion detected: 🧘 Calm (confidence: 94%)    │
│ Duration: 8 min 22 sec                         │
│                                                │
│                 [🎤 Respond] [⏹ End Session]    │
└────────────────────────────────────────────────┘
```

#### Book Upload & Curriculum Page

```
┌─────────────────────────────────────────┐
│ My Books & Lessons                      │
├─────────────────────────────────────────┤
│                                         │
│ 📤 [Upload New Book]                    │
│                                         │
│ Recent Books:                           │
│ ┌─────────────────────────────────────┐ │
│ │ 📖 Bhagavad Gita                    │ │
│ │ Processing... [████░░░░░░] 45%     │ │
│ │ 267 lessons extracted, 42 to go... │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📖 Yoga Sutras (Completed)          │ │
│ │ ✓ 156 lessons | Start Learning ▶   │ │
│ │ [Your Curriculum]                   │ │
│ │ Lesson 3 of 42: "On Steadiness"    │ │
│ │ 40% Complete | 15 min remaining     │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-6)

#### Week 1-2: Voice Engine MVP
- [ ] Web Audio API integration
- [ ] Microphone permission handling
- [ ] Simple speech-to-text (Whisper API)
- [ ] Basic speech-to-speech (ElevenLabs)
- [ ] VoiceContext provider + useVoice hook
- [ ] Push-to-talk button UI
- [ ] Error recovery (network, permission)

#### Week 3-4: Book Upload System
- [ ] File upload infrastructure (Vercel Blob)
- [ ] Document parsing (PDF, EPUB, TXT)
- [ ] Background job queue (Redis)
- [ ] Metadata extraction
- [ ] Chapter segmentation

#### Week 5-6: Guru AI Baseline
- [ ] GPT-4 integration for conversational guidance
- [ ] System prompt development
- [ ] Context window management
- [ ] Streaming responses
- [ ] Basic memory (session history)

**Deliverable:** Users can speak natural language, receive guru responses via audio, upload a book (processing queued)

---

### Phase 2: Intelligence (Weeks 7-12)

#### Week 7-8: Concept Extraction & Knowledge Graph
- [ ] NER pipeline (spaCy + custom)
- [ ] Concept extraction from books
- [ ] Relationship inference (prerequisites, related)
- [ ] Knowledge graph database schema
- [ ] Graph visualization

#### Week 9-10: Skill Decomposition & Lesson Generation
- [ ] Skill extraction algorithm
- [ ] Skill graph construction
- [ ] Micro-lesson generation (prompt-based)
- [ ] Exercise generation
- [ ] Quiz generation

#### Week 11-12: Personalization Engine
- [ ] User archetype detection
- [ ] Curriculum sequencing algorithm
- [ ] Adaptive difficulty adjustment
- [ ] Learning velocity tracking

**Deliverable:** Upload book → AI generates 50+ lessons → Personalized curriculum per user archetype

---

### Phase 3: Module Integration (Weeks 13-18)

#### Week 13-14: Voice Breath Coach
- [ ] Real-time breathing detection (optional: wearable integration)
- [ ] Narrated breath guidance
- [ ] Pace correction feedback
- [ ] Progress tracking

#### Week 15-16: Voice Journal / Karma Diary
- [ ] Streaming voice-to-text
- [ ] Real-time emotion detection
- [ ] Entity extraction (NER: people, places, events)
- [ ] Semantic search (embeddings)
- [ ] Timeline visualization

#### Week 17-18: Chakra Scanner + Dream Interpreter
- [ ] Dialogue-based chakra assessment
- [ ] Dream storytelling capture
- [ ] Symbol extraction & interpretation database
- [ ] Pattern matching across dreams
- [ ] Integration with user's emotional timeline

**Deliverable:** 3+ modules fully voice-native with real-time feedback

---

### Phase 4: Advanced AI (Weeks 19-24)

#### Week 19-20: Guru Memory & Long-term Learning
- [ ] Conversation history persistence
- [ ] Reality Graph (user's life/growth model)
- [ ] Long-context window optimization
- [ ] Personalized prompting based on history
- [ ] Emotional evolution tracking

#### Week 21-22: Crisis Support & Escalation
- [ ] Crisis pattern detection (realtime)
- [ ] Emergency response flows
- [ ] Resource integration (hotline, text lines)
- [ ] Post-crisis follow-up
- [ ] Escalation testing & safety verification

#### Week 23-24: Multi-modal Interactions
- [ ] Vision integration (if camera available)
- [ ] Wearable device sync (heart rate, etc.)
- [ ] Contextual guidance (time of day, location, etc.)
- [ ] Cross-module conversations (seamless handoff)

**Deliverable:** Fully functioning AI Spiritual Operating System with crisis support, memory, and multi-modal guidance

---

### Phase 5: Scale & Optimization (Weeks 25-30)

#### Week 25-26: Performance & Caching
- [ ] Audio stream caching
- [ ] LLM response caching (semantic hash)
- [ ] Database query optimization
- [ ] CDN for voice models
- [ ] Web Workers for audio processing

#### Week 27-28: Analytics & Insights
- [ ] User engagement metrics
- [ ] Practice completion rates
- [ ] Emotional state tracking
- [ ] Guru effectiveness evaluation
- [ ] Curriculum success rates

#### Week 29-30: Testing, QA, & Refinement
- [ ] Load testing (10K concurrent sessions)
- [ ] Audio quality testing (various devices)
- [ ] Accessibility testing (WCAG 2.1 AAA)
- [ ] Privacy audit
- [ ] Security testing (penetration, data leakage)

**Deliverable:** Production-ready, scalable system with telemetry and ongoing optimization

---

### Success Metrics by Phase

| Phase | Key Metrics |
|-------|-------------|
| **1** | Voice latency < 500ms, 95% transcription accuracy, zero crashes |
| **2** | 100 books processable, 10K+ lessons generated, curriculum personalization works |
| **3** | 5+ modules voice-native, 80% module feature parity with text versions |
| **4** | Crisis escalation tested & working, guru memory retention > 95%, NPS > 70 |
| **5** | Support 10K concurrent sessions, 99.9% uptime, < 100ms latency at scale |

---

## Conclusion

**Sadhana** transforms from a contemplative archive into a **voice-first AI spiritual operating system**—a personalized, conversational learning and practice platform powered by cutting-edge AI.

By integrating speech-to-speech (HuggingFace) and book-to-skill extraction (curriculum generation), every spiritual text becomes a **living curriculum**, every conversation becomes a **relationship with an AI guru**, and every practice becomes **personalized guidance at scale**.

This PRD provides the complete blueprint for building this transformative system while maintaining the existing beauty, scholarship, and depth of the Sadhana platform.

**The vision: Enable every human to learn and practice spirituality the way they learn from a living guru—through voice, memory, and continuous personalization.**

---

## Appendices

### A. Glossary of Terms

- **Guru**: An AI teacher that guides spiritual practice through conversation
- **Sadhana**: Spiritual discipline/practice (also, the platform name)
- **Chakra**: Energy center in the body
- **Mantra**: Sacred sound or phrase
- **Mudra**: Hand gesture
- **Pranayama**: Breath work/control
- **Yantra**: Sacred geometric diagram
- **Archivist**: System for storing and retrieving memories
- **Microlesson**: Short, focused learning unit (2-5 min)
- **Skill Graph**: Interconnected visualization of learnable skills
- **Voice Session**: One conversation/practice with the AI
- **Reality Graph**: User's personal growth & life event model
- **Book-to-Skill**: Process of converting books into curriculum
- **Guru Mode**: AI in full teacher/guide capacity

### B. Technology Stack Summary

**Frontend:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion  
**Backend:** Node.js, PostgreSQL, Drizzle ORM, Vercel  
**Audio:** Web Audio API, Whisper (OpenAI), ElevenLabs, HuggingFace  
**AI:** GPT-4, OpenAI Embeddings, spaCy, TextRank  
**Storage:** Vercel Blob, PostgreSQL, pgvector (embeddings)  
**Search:** PostgreSQL full-text + vector similarity  

### C. References & Inspiration

- Hugging Face speech-to-speech: https://github.com/huggingface/speech-to-speech
- Book-to-Skill: https://github.com/virgiliojr94/book-to-skill
- Existing Sadhana Modules & Architecture (60+ pages, comprehensive)
- Web Audio API Specifications: https://www.w3.org/TR/webaudio/
- Next.js 16 Documentation: https://nextjs.org/docs
- Vercel Deployment Platform

---

**END OF PRD**

---

**Document Prepared:** July 29, 2026  
**For:** Sadhana Project Team  
**Status:** Ready for Implementation
