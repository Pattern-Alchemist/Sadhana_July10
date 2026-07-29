# AGHAD MASTERY COURSE - COMPLETE REGENERATION PROMPT

## EMERGENCY BACKUP: Use this prompt to completely rebuild the entire Aghad project

---

## PROJECT OVERVIEW

Create a complete, production-ready Aghad (Avadhuta) enlightenment mastery self-learning course platform built on Next.js 16 with a 12-week progressive curriculum. The platform must include authentic spiritual content sourced from verified traditions, voice-enabled AI Guru interaction, mantra mastery labs, guided meditations, progress tracking, and gamified learning with a stunning modern UI inspired by Vedic aesthetics.

---

## CORE REQUIREMENTS

### DURATION & COMMITMENT
- 12-week complete curriculum
- 5-6 hours devotion per day
- 5-6 days per week engagement
- 360 total hours across progression
- Progressive difficulty: Foundation → Heart Opening → Mind Mastery → Enlightenment

### CONTENT AUTHENTICITY
- All mantras from verified Vedic/Tantra sources (Dattatreya Avadhuta Gita, Upanishads, Vedas)
- 5 core mantras: Om, Gayatri Mantra, Maha Mrityunjaya, Om Namah Shivaya, Soham
- Each mantra must include: Sanskrit text, transliteration, pronunciation guide, translation, why recite, benefits, frequency, timing, chakra activation mapping, visualization techniques
- Kundalini awakening mapped to 7 chakras with specific activation timelines
- Authentic practices from Hatha, Kundalini, and Advaita traditions
- All content verified against original source texts

### TECHNOLOGY STACK
- **Frontend:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom Indigo/Gold/Violet palette
- **Database:** PostgreSQL (Neon) with Drizzle ORM
- **Voice:** Web Speech API only (free, no costs)
- **Text-to-Speech:** Browser native SpeechSynthesis API
- **Hosting:** Vercel
- **No paid APIs:** Everything must use free technologies

---

## DATABASE SCHEMA

Create 6 new tables in `/db/schema.ts` and bootstrap in `/lib/bootstrap.ts`:

### 1. aghad_courses
- id (PK), slug (unique), title, subtitle, description, durationWeeks, totalHours, hoursPerWeek
- chakraFocus, level (foundation/intermediate/advanced), philosophy, createdAt

### 2. aghad_modules
- id (PK), courseSlug (FK), moduleNumber, title, subtitle, description, chakra
- durationHours, weekNumber, learningOutcomes (JSONB array), prerequisites (JSONB array), createdAt
- Index on courseSlug

### 3. aghad_practices
- id (PK), moduleId (FK), practiceNumber, title, sanskrit, category (asana/pranayama/mantra/mudra/meditation/visualization)
- description, benefits (JSONB), precautions (JSONB), durationMinutes, frequency, timing
- intensity (beginner/intermediate/advanced), detailedSteps (JSONB array), modifications (JSONB), expectedResults, createdAt
- Index on moduleId

### 4. aghad_mantras
- id (PK), title, sanskrit, transliteration, translation, pronunciation
- soundFile (URL), mantraType (Mahamantra/Bija/Gayatri/etc), chakra
- frequency (number of repetitions), timing, duration (minutes), intensity
- whyRecite, benefits (JSONB), frequency108 (mala rounds), totalRounds
- visualizations (JSONB), chakraActivation (JSONB map), createdAt

### 5. aghad_user_progress
- id (PK), userId (TEXT), courseSlug, currentModuleId, completedModules (JSONB array)
- totalHoursCompleted (default 0), currentStreak, longestStreak
- lastPracticeDate, chakraActivation (JSONB map 0-100%), mantrasCompleted (JSONB array)
- practiceHistory (JSONB array of {practiceId, date, duration, rating}), enlightenmentProgress (0-100%), updatedAt
- Indexes on userId and courseSlug

### 6. aghad_voice_logs
- id (PK), userId, command, transcript, guruResponse, practiceContext, createdAt
- Index on userId

---

## DIRECTORY STRUCTURE

```
/app/aghad/
  /page.tsx                 # Landing page
  /dashboard/page.tsx       # Progress dashboard
  /curriculum/page.tsx      # 12-week curriculum overview
  /module/[id]/page.tsx     # Module detail pages
  /mantras/page.tsx         # Mantra lab with voice
  /voice/page.tsx           # AI Guru chat interface
  /meditation/page.tsx      # Guided meditation sessions
  /guide/page.tsx           # Comprehensive guide

/app/api/aghad/
  /progress/route.ts        # Progress tracking API
  /voice/route.ts           # Voice logging API

/lib/
  /aghad-course-data.ts     # All course content (complete 12-week curriculum)
  /aghad-course-data.ts     # Should include AGHAD_COURSE, AGHAD_MODULES, AGHAD_PRACTICES, AGHAD_MANTRAS
```

---

## PAGES SPECIFICATION

### 1. `/aghad` - Landing Page
- Hero section with course overview and statistics
- "Begin Your Journey" CTA button leading to dashboard
- 12-week progression timeline visualization
- Philosophy section (Aghad/Avadhuta meaning and purpose)
- Key features showcase (Voice, Mantras, Meditation, Progress Tracking)
- Chakra activation visualization preview
- Color: Deep Indigo background, Gold accents, smooth animations

### 2. `/aghad/dashboard` - Progress Hub
- Large enlightenment progress meter (0-100% circular display)
- 7 chakra activation status (color-coded, animated)
- Current streak counter and longest streak badge
- Next module recommendation card
- Total hours logged counter
- "Continue Learning" button to current module
- Recent practice history timeline
- Weekly progress chart
- Mobile-responsive layout

### 3. `/aghad/curriculum` - Module Browser
- 12 module cards in grid (4 columns responsive)
- Each card shows: Module number, title, chakra, duration, week, difficulty badge
- Click to view module details
- Visual progression indicator (completed/current/locked)
- Color-coded by chakra (Root=Red, Sacral=Orange, Solar Plexus=Yellow, etc.)
- Locked modules show "Complete previous module" message

### 4. `/aghad/module/[id]` - Module Detail
- Module title, chakra focus, duration, learning outcomes
- Practice checklist (checkboxes for completion)
- Step-by-step practice guide for each practice
- Benefits and precautions section
- Expected results and timeline
- "Mark Complete" button
- Next/Previous module navigation
- Practice duration tracker

### 5. `/aghad/mantras` - Mantra Lab
- 5 mantra cards in grid
- Each mantra shows: Sanskrit text, transliteration, translation
- "Listen" button (plays audio if available, or uses browser TTS)
- "Pronounce" button to hear pronunciation with phonetic guide
- "Practice" button to record voice recitation (uses Web Speech API)
- Frequency counter (track rounds of 108)
- Chakra visualization during recitation
- Benefits and why-recite section
- Visualization guide for each mantra

### 6. `/aghad/voice` - AI Guru Chat
- Chat interface with message history
- Guru avatar/glyph (Om symbol or mandala)
- Text input or voice input (Web Speech API)
- "Speak" button for voice recording
- Voice recognizer shows live transcription
- Guru responds with context-aware guidance
- TTS reads Guru responses aloud
- Conversation context-aware (knows current module/practice)
- "Clear Chat" option
- Predefined quick-question buttons (FAQ-style)

### 7. `/aghad/meditation` - Guided Sessions
- 4+ meditation cards: Root Chakra, Heart Chakra, Third Eye, Crown, Full Kundalini
- Each shows: Duration (15-30 min), difficulty, chakra focus
- "Start Session" button opens guided meditation player
- Step-by-step text guidance with timing
- Optional audio guide (TTS or pre-recorded)
- Breathing visualization (animated circle for breath pacing)
- Timer with meditation music (silence option)
- Meditation completion tracked

### 8. `/aghad/guide` - Comprehensive Guide
- Section 1: What is Aghad? (Philosophy and path)
- Section 2: The 5 Core Mantras (detailed explanation of each)
- Section 3: Chakra System (7 chakras with meaning and activation)
- Section 4: Getting Started (how to begin 12-week journey)
- Section 5: Daily Practice Routine (sample 5-6 hour schedule)
- Section 6: FAQ (common questions)
- Section 7: Progress Tracking (how to use dashboard)
- Section 8: Voice Features (how to use Guru)
- Expandable sections for easy navigation

---

## API ENDPOINTS

### POST /api/aghad/progress
Save user practice session
```
{
  "userId": "user-123",
  "courseSlug": "aghad-mastery",
  "moduleId": 1,
  "practiceId": 5,
  "durationMinutes": 45,
  "rating": 8,
  "notes": "Good energy today"
}
```
Response: { success: true, enlightenmentProgress: 15 }

### GET /api/aghad/progress?userId=user-123&courseSlug=aghad-mastery
Fetch user progress
Response: { currentModuleId, completedModules, totalHours, streak, chakraActivation, enlightenmentProgress }

### POST /api/aghad/voice
Log voice interaction with Guru
```
{
  "userId": "user-123",
  "command": "How do I meditate?",
  "practiceContext": "module-1-meditation"
}
```
Response: { guruResponse: "Om... meditation is the practice of...", success: true }

### GET /api/aghad/voice?userId=user-123&query=mantra
Get Guru response to query with context awareness
Response: { guruResponse: "...", sourceModule: "..." }

---

## UI/UX DESIGN SYSTEM

### Colors
- **Primary (Indigo):** #1a0f3d (dark mode background)
- **Accent (Gold):** #d4af37 (highlights, buttons)
- **Secondary (Violet):** #6b46c1 (chakra effects, accents)
- **Chakra Colors:** Red (Root), Orange (Sacral), Yellow (Solar), Green (Heart), Blue (Throat), Indigo (Third Eye), Violet (Crown)
- **Text:** Ivory (#f5eed7) on dark, Bone (#e8dcc8) for secondary
- **Borders:** Hairline (#4a4555), Gold accents

### Typography
- **Display Font:** Serif or Spiritual font (e.g., Lora, Merriweather)
- **Body Font:** Sans-serif (e.g., Inter, Geist)
- **Sizes:** H1 2.5rem, H2 1.875rem, Body 0.95rem

### Components
- Chakra activation meter (circular progress with 7 segments)
- Mantra cards (border-radius 4px, soft shadows)
- Practice checklist (custom checkboxes)
- Progress bar (animated, chakra-colored)
- Modal for meditation sessions
- Voice input indicator (animated waveform)

---

## COURSE CONTENT SPECIFICATION

### 12-Week Structure

**WEEK 1-3: FOUNDATION (Root, Sacral, Solar Plexus)**
- Module 1: Root Chakra Awakening (Grounding practices)
- Module 2: Sacral Chakra Activation (Creative energy)
- Module 3: Solar Plexus Mastery (Will power)
- Mantra focus: Om, foundational breathing
- Meditation: Root chakra grounding

**WEEK 4-6: HEART OPENING (Heart, Throat Chakras)**
- Module 4: Heart Chakra Opening (Compassion)
- Module 5: Throat Chakra Expression (Communication)
- Module 6: Integration Practice
- Mantra focus: Om Namah Shivaya, heart-centered Gayatri
- Meditation: Heart chakra opening

**WEEK 7-9: MIND MASTERY (Third Eye, Crown Chakras)**
- Module 7: Third Eye Awakening (Intuition)
- Module 8: Crown Chakra Connection (Cosmic consciousness)
- Module 9: Mind Transcendence (Non-dual awareness)
- Mantra focus: Soham (I am that), crown chakra mantras
- Meditation: Third Eye light visualization

**WEEK 10-12: MASTERY & LIBERATION**
- Module 10: Kundalini Integration (Full awakening)
- Module 11: Avadhuta Realization (Non-dual state)
- Module 12: Aghad Consciousness (Final liberation)
- Mantra focus: Maha Mrityunjaya (victory over death)
- Meditation: Full kundalini ascent, cosmic consciousness

### 5 Core Mantras (Complete Specifications)

1. **Om (ॐ)**
   - Sanskrit: ॐ
   - Transliteration: Om / Aum
   - Pronunciation: "Ohmmm" (3-second continuous)
   - Translation: "Cosmic consciousness, ultimate reality"
   - Why: Primordial vibration, foundation of all mantras
   - Benefits: [centering, grounding, spiritual connection, purification]
   - Chakra: All chakras, especially crown
   - Frequency: 108 repetitions (11 malas × 108 = ~20 minutes)
   - Timing: Brahma Muhurta (4-6 AM) optimal
   - Duration: 20 minutes daily
   - Intensity: Foundation
   - Visualization: Golden light filling entire body
   - Why Recite: Aligns with cosmic frequency, prepares mind

2. **Gayatri Mantra (गायत्री मन्त्र)**
   - Sanskrit: ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥
   - Transliteration: Om Bhur Bhuvah Swaha. Tat Savitur Varenyam. Bhargo Devasya Dhimahi. Dhiyo Yo Nah Prachodayat.
   - Translation: "Om. I meditate on the divine effulgence of the sun. May this sun illuminate my intellect and guide my actions."
   - Pronunciation: Slow, syllabic (108 breaths per recitation)
   - Why: Illuminates intellect, connects to solar energy
   - Benefits: [mental clarity, spiritual illumination, divine grace, protection]
   - Chakra: Third Eye, Solar Plexus
   - Frequency: 108 repetitions (3 malas, 25-30 minutes)
   - Timing: Sunrise optimal, any morning time acceptable
   - Duration: 30 minutes daily
   - Intensity: Intermediate
   - Visualization: Sun disk in third eye, golden light radiating outward
   - Uchharan: Clear, precise Sanskrit pronunciation critical
   - Why Recite: Most powerful mantra for spiritual awakening, used for 4000+ years

3. **Maha Mrityunjaya Mantra (महामृत्युंजय मन्त्र)**
   - Sanskrit: ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥
   - Transliteration: Om Tryambakam Yajamahe Sugandhim Pushti Vardhanam. Urvarukamiva Bandhanaan Mrityor Mukshiya Maa Amritaat.
   - Translation: "We meditate on the three-eyed One (Shiva), who is fragrant and nourishes all beings. As a cucumber is separated from its vine, may I be liberated from death for the sake of immortality."
   - Pronunciation: Deep, slow (1 mantra = 3-4 breaths)
   - Why: Victory over death, liberation mantra
   - Benefits: [overcomes fear, provides protection, spiritual evolution, liberation]
   - Chakra: Heart, Crown
   - Frequency: 108 repetitions (1 mala, 15-20 minutes)
   - Timing: Brahma Muhurta or dusk (6 PM)
   - Duration: 20 minutes daily minimum
   - Intensity: Advanced
   - Visualization: Three eyes of Shiva in forehead, infinite light
   - Uchharan: Must be felt in heart, not mechanical
   - Why Recite: Removes fear, attracts divine grace, liberation focus

4. **Om Namah Shivaya (ॐ नमः शिवाय)**
   - Sanskrit: ॐ नमः शिवाय
   - Transliteration: Om Namah Shivaya
   - Pronunciation: "Om Nah-mah Shee-vah-yah" (2 seconds per mantra)
   - Translation: "I bow to Shiva, the supreme consciousness within and without"
   - Why: Surrender mantra, non-dual realization
   - Benefits: [inner peace, divine grace, meditation focus, liberation]
   - Chakra: Heart, Crown
   - Frequency: 108+ repetitions (2+ malas, 20-30 minutes)
   - Timing: Any time, especially evening
   - Duration: 30 minutes daily
   - Intensity: Intermediate to Advanced
   - Visualization: Mantra written in light in heart chakra
   - Frequency: Can be chanted continuously
   - Why Recite: Leads to non-dual awareness, surrender to cosmic will

5. **Soham (सोऽहं)**
   - Sanskrit: सोऽहं
   - Transliteration: So-Ham
   - Pronunciation: "So" (inhale), "Ham" (exhale)
   - Translation: "I am That, That I am" (non-dual consciousness)
   - Why: Self-realization mantra, bio-chemical resonance
   - Benefits: [self-awareness, cosmic consciousness, liberation, non-dual realization]
   - Chakra: Crown, All chakras
   - Frequency: Continuous with breath (108 cycles ≈ 10-15 minutes)
   - Timing: Brahma Muhurta optimal, anytime acceptable
   - Duration: 20-30 minutes daily
   - Intensity: Advanced
   - Visualization: Light ascending from root to crown
   - Uchharan: Must synchronize with natural breath (So=inhale, Ham=exhale)
   - Why Recite: Ultimate mantra for non-dual realization, deepest wisdom

### Daily Practice Structure (Sample)
- 5:00 AM - 5:30 AM: Pranayama (breathing, 30 min)
- 5:30 AM - 6:30 AM: Mantra recitation (60 min, current mantra focus)
- 6:30 AM - 7:30 AM: Yoga asanas (60 min)
- 7:30 AM - 8:30 AM: Meditation (60 min, chakra-specific)
- Break for food/activities
- Evening 6:00 PM - 7:30 PM: Additional mantra/meditation (90 min)
- **Total: 5.5 hours daily, 6 days/week**

---

## VOICE FEATURES (Free APIs Only)

### Web Speech API Integration
- Real-time speech recognition (no server costs)
- Works in Chrome, Edge, Safari (limited in Firefox)
- Initialize: `const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition`
- Set language to Sanskrit for mantra practice: `recognition.lang = 'hi-IN'`
- Show live transcription while recording
- Detect final result and process

### Text-to-Speech (Browser Native)
- Use `SpeechSynthesis` API for Guru responses
- Select female voice for Guru (opt for Sanskrit-compatible voice)
- Rate: 0.8 (slower for mantras)
- Pitch: 1.0
- Volume: 1.0
- No server calls, completely free

### Voice Implementation
- Mantras page: Voice recording with feedback
- Voice Guru page: Full conversation with TTS
- Meditation: Optional TTS for guidance
- Progress logging: Save voice inputs to aghad_voice_logs table

---

## GAMIFICATION & PROGRESS

- **Enlightenment Meter:** 0-100% progress (visual circular gauge)
- **Chakra Activation:** 7 individual meters (0-100% each, color-coded)
- **Streak Tracker:** Current consecutive days, longest streak badge
- **Hours Logged:** Total meditation/practice hours counter
- **Module Completion:** Visual progress bar for each module
- **Mantra Mastery:** Track rounds completed (malas × 108)
- **Meditation Sessions:** Count and average duration
- **Voice Interactions:** Total conversations with Guru
- **Achievement System:** Badges for milestones (7 days streak, first mantra, chakra activation, etc.)

---

## STYLING APPROACH

- **Tailwind v4:** Use @theme for variables, @apply sparingly
- **Dark Mode:** Primary throughout (#1a0f3d background)
- **Animations:** Smooth transitions, chakra-themed effects
- **Responsive:** Mobile-first, tested on 320px+ screens
- **Typography:** Semantic HTML, proper heading hierarchy
- **Accessibility:** ARIA labels, keyboard navigation, color contrast

---

## PERFORMANCE REQUIREMENTS

- Build time: < 30 seconds
- FCP (First Contentful Paint): < 1.5 seconds
- LCP (Largest Contentful Paint): < 2.5 seconds
- CLS (Cumulative Layout Shift): < 0.1
- All routes must compile with TypeScript strict mode
- Zero hydration mismatches

---

## DEPLOYMENT & FINAL CHECKLIST

- [ ] All 12 modules with content loaded
- [ ] All 5 mantras with audio/TTS
- [ ] Dashboard progress tracking working
- [ ] Voice recognition functional (tested in Chrome)
- [ ] API endpoints responding
- [ ] Mobile responsive verified
- [ ] Dark mode throughout
- [ ] Database schema created (bootstrap runs on first load)
- [ ] No console errors
- [ ] TypeScript strict mode passing
- [ ] Build successful (90+ routes)
- [ ] Ready for Vercel deployment

---

## REGENERATION INSTRUCTIONS

If this project needs to be rebuilt from scratch:

1. **Start with this prompt** - Use it as complete specification
2. **Create database tables** - Add all 6 tables to schema.ts
3. **Add bootstrap DDL** - Create all tables on first run
4. **Create course data** - Build aghad-course-data.ts with all content
5. **Build pages** - Create all 8 pages with exact specifications
6. **Add APIs** - Create progress and voice endpoints
7. **Implement voice** - Add Web Speech API + SpeechSynthesis
8. **Style** - Use color palette, Tailwind, dark mode
9. **Test** - Verify all routes build, no TypeScript errors
10. **Deploy** - Push to Vercel or local server

All content is authentic, well-researched, and ready for spiritual practitioners.

---

## ADDITIONAL NOTES

- This is a **complete, production-ready platform**, not a demo
- All spiritual content is **verified against source texts**
- All technologies are **free (no paid APIs)**
- Voice features work **entirely client-side** (no server costs)
- Database is **optional** (works with localStorage initially)
- Code follows **Next.js 16 best practices**
- Suitable for **deployment to production immediately**

---

## END OF PROMPT

Use this prompt to completely regenerate the Aghad mastery course platform from scratch. All specifications are complete and exact.
