/**
 * Archive content — the curated seed corpus.
 * Scholarly framing throughout: textual/historical claims are separated
 * from modern interpretation. Mantras are presented as documented heritage,
 * not as medical or guaranteed outcomes.
 */

export interface PreSadhnaStep {
  title: string;
  duration: string;
  detail: string;
}

export interface ProcedureStep {
  title: string;
  detail: string;
  substeps?: string[];
  caution?: string;
}

export interface YantraInfo {
  name: string;
  description: string;
  symbolism: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiddhiSeed {
  slug: string;
  name: string;
  sanskrit: string;
  category: string;
  tradition: string;
  level: string;
  durationHours: number;
  days: number;
  authenticityScore: number;
  summary: string;
  description: string;
  primaryMantra: string;
  benefits: string[];
  warnings: string[];
  lineage: string;
  preSadhna: PreSadhnaStep[];
  procedure: ProcedureStep[];
  yantra?: YantraInfo;
  faq: FaqItem[];
}

export const SIDDHI_SEED: SiddhiSeed[] = [
  {
    slug: "pranava-japa",
    name: "Pranava Japa",
    sanskrit: "प्रणव जप — Oṃkāra Repetition",
    category: "Mantra",
    tradition: "Vedānta / Upaniṣadic",
    level: "Foundation",
    durationHours: 12,
    days: 21,
    authenticityScore: 97,
    summary:
      "The contemplative repetition of Oṃ, the primal sound (pranava) held in the Upaniṣads to be the sonic signature of the Absolute.",
    description:
      "Pranava Japa is among the most ancient and universally attested contemplative practices of the Indic world. The syllable Oṃ is not treated as a mere word but as an acoustic map of consciousness: the Māṇḍūkya Upaniṣad parses its three phonemes (A-U-M) into the three states of waking, dream, and deep sleep, with the ensuing silence as a fourth — turīya. The practitioner sounds or mentally intones the syllable, allowing the resonance to attenuate into stillness. Across the Vedas, Yoga Sūtras, and later bhakti literature, this is the archetypal seed of sonic practice.",
    primaryMantra: "ॐ  (A — U — M — silence)",
    benefits: [
      "Anchors attention on a single, self-arising sound",
      "Demonstrates the dissolution of verbal thought into silence",
      "Provides a stable entry point for seated meditation",
      "Carries uninterrupted lineage continuity for over 2,500 years",
    ],
    warnings: [
      "Avoid strained vocalization that fatigues the throat",
      "Not a substitute for treatment of anxiety or depression",
    ],
    lineage:
      "Vedic recitational tradition → Upaniṣadic seers → Patañjali (Yoga Sūtras I.27–28) → living monastic and householder lineages.",
    preSadhna: [
      {
        title: "Posture & Stillness",
        duration: "4 min",
        detail:
          "Sit upright on a firm surface, spine lengthened, hands resting open. Let the body settle until it ceases to demand attention.",
      },
      {
        title: "Nāḍī Śuddhi (Alternate-Nostril Breath)",
        duration: "5 min",
        detail:
          "Balance the breath between the two nostrils to steady the autonomic state before sounding.",
      },
      {
        title: "Intention (Saṅkalpa)",
        duration: "2 min",
        detail:
          "Silently affirm the frame: this is a study of sound and stillness, not a pursuit of experience.",
      },
    ],
    procedure: [
      {
        title: "Audible Sounding",
        detail:
          "Intone Oṃ aloud several times, prolonging each phoneme: a deep open A, a rolling U, a closing M that hums into the crown.",
        substeps: [
          "Let A rise from the navel",
          "Let U resonate across the chest",
          "Let M settle into the head as a hum",
        ],
      },
      {
        title: "Upāṁśu (Whispered)",
        detail:
          "Reduce to a barely audible breath-whisper, the lips moving but little sound escaping.",
      },
      {
        title: "Mānasika (Mental)",
        detail:
          "Reproduce the syllable only in the mind, feeling its shape without voicing. Attend to the silence that follows each repetition.",
        caution:
          "If the mind becomes drowsy, return briefly to audible sounding.",
      },
      {
        title: "Dissolution into Turīya",
        detail:
          "Let the repetitions naturally space out and dissolve into the post-syllabic silence — the 'fourth' state of the Māṇḍūkya.",
      },
    ],
    faq: [
      {
        q: "Is Oṃ a religious symbol or a contemplative instrument?",
        a: "Both, depending on context. For the scholar it is a documented phoneme with a defined semantic range across the Upaniṣads; for the practitioner it functions as an attentional anchor.",
      },
      {
        q: "How many repetitions are prescribed?",
        a: "Tradition commonly cites 108 (a mālā) but texts emphasize the qualitative dissolution into silence over numerical targets.",
      },
    ],
  },
  {
    slug: "gayatri-mantra",
    name: "Gāyatrī Mantra",
    sanskrit: "गायत्री मन्त्र — Savitṛ Invocation",
    category: "Mantra",
    tradition: "Vedic (Ṛgveda)",
    level: "Foundation",
    durationHours: 20,
    days: 40,
    authenticityScore: 96,
    summary:
      "A verse from the Ṛgveda (III.62.10) invoking the radiant principle (Savitṛ) to illuminate the intellect — among the most widely transmitted invocations in the tradition.",
    description:
      "The Gāyatrī is a gāyatrī-meter verse addressed to Savitṛ, the impelling radiance of the sun, petitioning it to 'inspire our contemplation' (dhimahi). Historically restricted in many periods to initiated dvijas, its recitation is now widespread. The verse is dense: it yokes cosmology (the three worlds), devotion (the divine radiance), and epistemology (the illumination of intellect). The accompanying gāyatrī-meter (24 syllables) is itself considered a rhythmic instrument.",
    primaryMantra:
      "tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt",
    benefits: [
      "A condensed model of Vedic devotional-philosophical expression",
      "Trains metrical recitation and breath-linked pacing",
      "A living example of how a single verse shapes a tradition for 3,000+ years",
    ],
    warnings: [
      "Some lineages regard the mantra as requiring transmission (dīkṣā); study the range of views before practice",
      "Recitation is a contemplative act, not a guarantee of any worldly result",
    ],
    lineage:
      "Ṛṣi Viśvāmitra (seer of the verse) → Vedic ritual schools → modern universalist teachers.",
    preSadhna: [
      { title: "Dawn or Dusk Orientation", duration: "3 min", detail: "Traditionally recited at the junctures (sandhyā) of dawn and dusk; orient toward the rising light if possible." },
      { title: "Ācamana & Centering", duration: "3 min", detail: "A sip of water and a settling breath mark the boundary from ordinary activity." },
      { title: "Invocation of the Meter", duration: "2 min", detail: "Acknowledge the gāyatrī meter as the 'container' of the verse." },
    ],
    procedure: [
      { title: "The Preface (Vyāhṛti)", detail: "Begin with the cosmic utterances 'bhūr bhuvaḥ svaḥ' — earth, atmosphere, heaven.", substeps: ["bhūḥ", "bhuvaḥ", "svaḥ"] },
      { title: "Measured Recitation", detail: "Sound the verse in its 24-syllable meter, attending to each accent and breath group.", caution: "Meter, not speed, is the discipline." },
      { title: "Contemplation of Savitṛ", detail: "Hold the image of an impelling radiance as the sense of 'that which awakens intelligence.'" },
      { title: "Closing", detail: "Conclude with the seed 'oṃ' and a moment of silence." },
    ],
    faq: [
      { q: "Why is this mantra considered so central?", a: "Its compression — cosmology, devotion, and epistemology in 24 syllables — and its unbroken transmission made it a touchstone of daily Vedic practice (sandhyāvandana)." },
      { q: "Is it freely available to all?", a: "Historically it was restricted; contemporary teachers vary. The Archive records this range rather than legislating it." },
    ],
  },
  {
    slug: "nadi-shuddhi",
    name: "Nāḍī Śuddhi",
    sanskrit: "नाडी शुद्धि — Channel Purification Breath",
    category: "Prāṇāyāma",
    tradition: "Haṭha / Rāja Yoga",
    level: "Foundation",
    durationHours: 8,
    days: 14,
    authenticityScore: 94,
    summary:
      "Alternate-nostril breathing (anuloma-viloma) used to balance the lunar (iḍā) and solar (piṅgalā) vital currents before deeper practice.",
    description:
      "Nāḍī Śuddhi is the preparatory breath discipline of haṭha yoga, described in the Śiva Saṃhitā, Gheraṇḍa Saṃhitā, and Haṭha Yoga Pradīpikā. The technique alternates the active nostril using the right thumb and ring finger, equalizing inhalation and exhalation. The yogic model holds that this 'purifies' the subtle channels; modern physiology frames it as a structured breath that demonstrably steadies the autonomic nervous system. Both frames are presented here without conflating them.",
    primaryMantra: "(silence of measured breath — optional soft Oṃ on retention)",
    benefits: [
      "A portable, evidence-adjacent method for steadying breath and attention",
      "A documented bridge between somatic practice and meditative concentration",
      "Foundation for all subsequent prāṇāyāma",
    ],
    warnings: [
      "Never force retention; stop if dizzy or strained",
      "Avoid during acute respiratory illness",
      "Pregnant practitioners should use gentle, unrestrained pacing",
    ],
    lineage:
      "Haṭha corpus (Śiva/Gheraṇḍa Saṃhitā, HYP) → modern yoga revival (Kuvalayananda, Krishnamacharya lineage).",
    preSadhna: [
      { title: "Empty Stomach", duration: "—", detail: "Practice on an empty or light stomach, ideally in the morning." },
      { title: "Seated Alignment", duration: "3 min", detail: "Spine erect, chin slightly lowered (jālandhara), shoulders relaxed." },
    ],
    procedure: [
      { title: "Right Nostril Inhale", detail: "Close the left nostril with the ring finger; inhale slowly through the right." },
      { title: "Hold (mild)", detail: "A brief, comfortable pause at the top — never strained.", caution: "Skip retention if new to breath work." },
      { title: "Left Exhale", detail: "Release the left, close the right with the thumb, exhale through the left." },
      { title: "Left Inhale → Right Exhale", detail: "Complete the cycle: inhale left, exhale right. This is one round." },
      { title: "Equalize Ratio", detail: "Aim for equal inhale/exhale counts (e.g., 4:0:4, then 4:4:4 if comfortable)." },
    ],
    faq: [
      { q: "Does it 'purify channels' in a literal sense?", a: "The traditional model speaks of subtle channels (nāḍī). Neuroscience describes autonomic balancing. The Archive presents both without asserting one collapses into the other." },
      { q: "How many rounds?", a: "Texts cite gradual increase; 5–10 rounds is a sound beginning. Quality governs, not quantity." },
    ],
  },
  {
    slug: "trataka",
    name: "Trāṭaka",
    sanskrit: "त्राटक — Steady Gazing",
    category: "Dhāraṇā",
    tradition: "Haṭha / Rāja Yoga",
    level: "Intermediate",
    durationHours: 15,
    days: 30,
    authenticityScore: 92,
    summary:
      "Fixed-gaze concentration, classically upon a candle flame, listed among the six purification acts (ṣaṭkarma) and as a gateway to inner vision.",
    description:
      "Trāṭaka is described in the Gheraṇḍa Saṃhitā (I.54) and Haṭha Yoga Pradīpikā (II.32). The practitioner fixes an unwavering gaze on an external object — most commonly a flame — until the eyes water, then closes them and concentrates on the after-image (antar trāṭaka). It is presented both as a purification (śatkarma) and as a bridge into dhāraṇā (concentration). The technique is unusually concrete, making it a favored pedagogic example of how a physical act becomes contemplative.",
    primaryMantra: "(silent fixation; optional internal Oṃ on the after-image)",
    benefits: [
      "Trains sustained single-pointed attention",
      "Demonstrates the transition from outer object to inner image",
      "A clear, teachable model of concentration (dhāraṇā)",
    ],
    warnings: [
      "Practice candle trāṭaka with a stable flame on a fire-safe surface",
      "Limit to one session daily; over-practice can strain the eyes",
      "Discontinue if the eyes become painful rather than merely watery",
    ],
    lineage:
      "Haṭha corpus → Śāṇḍilya / Gheraṇḍa lineages → modern yoga schools.",
    preSadhna: [
      { title: "Darkened, Calm Space", duration: "3 min", detail: "A dim room reduces peripheral distraction; ensure the flame is at eye level, an arm's length away." },
      { title: "Breath Settling", duration: "4 min", detail: "A few rounds of nāḍī śuddhi to steady the body." },
    ],
    procedure: [
      { title: "Outer Gaze (Bahir)", detail: "Gaze at the flame without blinking until the eyes water naturally.", caution: "Keep the gaze soft, not glaring." },
      { title: "The Tear", detail: "Tradition regards the watering itself as the purification; do not suppress it. Continue until the eyes water of their own accord." },
      { title: "Inner Gaze (Antar)", detail: "Close the eyes and observe the after-image at the brow or heart." },
      { title: "Dissolution", detail: "Let the after-image fade into open awareness, then rest." },
    ],
    yantra: {
      name: "Bindu on a Disc",
      description: "A simple black dot (bindu) on white, or a lit flame before a dark field.",
      symbolism: "The bindu is the point of concentration from which all form is said to emanate.",
    },
    faq: [
      { q: "Is trāṭaka safe for the eyes?", a: "When done gently with breaks and proper conditions, yes. It is not a substitute for eye care; anyone with eye conditions should consult a clinician." },
      { q: "Why the candle specifically?", a: "A single-pointed, steady light is easiest to hold without wavering; a yantra or a dot serves equally in many lineages." },
    ],
  },
  {
    slug: "ajapa-japa",
    name: "Ajapa-Japa",
    sanskrit: "अजपाजप — The Spontaneous Breath-Mantra",
    category: "Mantra",
    tradition: "Nāth / Tantra",
    level: "Intermediate",
    durationHours: 30,
    days: 40,
    authenticityScore: 90,
    summary:
      "The recognition that the breath itself sounds 'haṃ-saḥ' (So'haṃ) some 21,600 times a day — japa performed without effort of repetition.",
    description:
      "In the Nāth and tantric streams, attention is drawn to the natural sound of respiration: the in-breath resembles 'sa' (or 'so') and the out-breath 'ham' — spelling so'haṃ ('I am That'). Since this occurs automatically and continuously, it is termed a-japa, 'not-repeated' repetition. The Vijñāna Bhairava, a seminal Kashmir Śaiva text, lists awareness of the breath's entry and exit among its 112 contemplative means. The practice is the meeting point of mantra, breath, and non-dual recognition.",
    primaryMantra: "so'haṃ  ·  haṃsaḥ  (I am That)",
    benefits: [
      "Weaves mantra into the autonomic rhythm of breath",
      "A direct doorway to non-dual contemplation (Vijñāna Bhairava)",
      "Requires no external object or aid",
    ],
    warnings: [
      "Do not impose the sound forcefully; the method is recognition, not production",
      "Remain seated and grounded; profound stillness can arise suddenly",
    ],
    lineage:
      "Kashmir Śaiva & Nāth streams → the Vijñāna Bhairava Tantra → modern non-dual teachers.",
    preSadhna: [
      { title: "Settle into Natural Breath", duration: "5 min", detail: "Do not alter the breath; merely observe its tidal movement." },
      { title: "Soften the Throat", duration: "2 min", detail: "A faint, unforced whisper of air in the throat helps reveal the sound." },
    ],
    procedure: [
      { title: "Attend to the In-Breath", detail: "Listen for the faint 'sa/so' as the breath enters; feel it descend." },
      { title: "Attend to the Out-Breath", detail: "Listen for the faint 'ham' as the breath rises and leaves." },
      { title: "Rest as the Witness", detail: "Let the mantra chant itself; you are the listener, not the chanter." },
      { title: "Recognize 'So'haṃ'", detail: "The aggregate reveals so'haṃ — 'I am That' — without effort." },
    ],
    faq: [
      { q: "Is the breath really saying a word?", a: "The tradition reads the phonetic feel of respiration as a self-existing mantra. Whether one hears it as sound or feels it as motion, the contemplative function is identical." },
      { q: "Why 21,600 times?", a: "Classical physiology estimated ~15 breaths/minute × 1440 minutes ≈ 21,600 daily; the number became symbolic of ceaseless, automatic japa." },
    ],
  },
  {
    slug: "sri-yantra-dhyana",
    name: "Śrī Cakra Contemplation",
    sanskrit: "श्री चक्र — The Great Yantra",
    category: "Yantra",
    tradition: "Śrī Vidyā",
    level: "Advanced",
    durationHours: 40,
    days: 108,
    authenticityScore: 91,
    summary:
      "Meditative absorption upon the Śrī Yantra — nine interlocking triangles converging on a single point (bindu), the supreme geometric instrument of Śrī Vidyā.",
    description:
      "The Śrī Cakra is a maṇḍala of nine interpenetrating triangles: four upward (Śiva) and five downward (Śakti), generating 43 subsidiary triangles encircled by lotuses of eight and sixteen petals, within three concentric walls (trailokya-mohana). Contemplation proceeds from the outer wall inward to the bindu, mirroring the creation and re-absorption of the cosmos. In Śrī Vidyā it is treated as the body of the Goddess herself. The Archive presents the geometry and its symbolism as documented heritage of a living tradition.",
    primaryMantra: "śrīṃ  (the bīja of the goddess, in its proper context)",
    benefits: [
      "A masterpiece of symbolic geometry spanning over a millennium",
      "Trains sustained, layered visual concentration",
      "Encodes a complete cosmology of emanation and return",
    ],
    warnings: [
      "Within Śrī Vidyā, full ritual use is held to require initiation (dīkṣā); contemplative study of the geometry is open",
      "Regard commercial 'activation' claims skeptically",
    ],
    lineage:
      "Śrī Vidyā → Dakṣiṇāmūrti / Hayagrīva lineage → Bhāskararāya → living Śrī Vidyā ācāryas.",
    preSadhna: [
      { title: "Purification of Space", duration: "5 min", detail: "A clean, undisturbed setting; the yantra placed at eye level." },
      { title: "Breath & Intention", duration: "5 min", detail: "Settle the breath and frame the session as study of form and the formless." },
    ],
    procedure: [
      { title: "Bhūpura (Outer Gate)", detail: "Begin at the three outer walls — the field of ordinary, three-level existence." },
      { title: "The Sixteen-Petal Lotus", detail: "Move inward through the rings of petals, each representing a faculty to be released." },
      { title: "The Nine Triangles", detail: "Trace the interlocking triangles — Śiva (upward) and Śakti (downward) — toward their convergence." },
      { title: "The Bindu", detail: "Rest at the central point: the unity from which all form emanates and into which it returns." },
    ],
    yantra: {
      name: "Navayoni Śrī Cakra",
      description: "Nine interlocking triangles within lotus rings and a triple enclosure.",
      symbolism: "The bindu is the unmanifest source; the triangles are the play of consciousness and its power.",
    },
    faq: [
      { q: "Can anyone contemplate it?", a: "Studying and contemplating the geometry is widely accessible. Formal ritual empowerment (navāvaraṇa pūjā) belongs to initiated practitioners." },
      { q: "Is it 'magic'?", a: "It is a contemplative technology of attention encoded in geometry. The Archive declines to endorse supernatural claims." },
    ],
  },
  {
    slug: "mahamrityunjaya",
    name: "Maha Mṛtyuṅjaya Mantra",
    sanskrit: "महामृत्युंजय — The Great Death-Conquering Verse",
    category: "Mantra",
    tradition: "Vedic (Ṛgveda)",
    level: "Intermediate",
    durationHours: 18,
    days: 41,
    authenticityScore: 95,
    summary:
      "A Ṛgvedic verse (VII.59.12) addressed to Tryambaka (the three-eyed one), petitioning liberation from mortality 'as a cucumber from its vine.'",
    description:
      "The Mṛtyuṅjaya mantra is a ṛc from the Ṛgveda, addressed to the three-eyed Rudra-Śiva. Its central image — release 'like a cucumber severed from its bondage to the vine' rather than torn from the stalk — is a study in how a single simile carries a theology of conscious, gentle liberation rather than violent severance. It is among the most widely recited verses for healing and at the hour of death across the tradition.",
    primaryMantra:
      "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt",
    benefits: [
      "A rare Vedic verse explicitly thematizing the manner of release",
      "A touchstone recited at life's thresholds across millennia",
      "Rich in metaphor available to sustained study",
    ],
    warnings: [
      "Not a medical treatment; never framed as a substitute for care",
      "Some traditions treat it as best received through transmission",
    ],
    lineage: "Ṛṣi Vasiṣṭha (seer of the verse) → Vedic schools → universal recitation.",
    preSadhna: [
      { title: "Invocation", duration: "3 min", detail: "A simple frame acknowledging the verse as heritage of contemplation on mortality." },
      { title: "Steadying Breath", duration: "4 min", detail: "Equal breathing to settle before the verse." },
    ],
    procedure: [
      { title: "Recite the Verse", detail: "Sound the verse with attention to its meaning rather than rapid count." },
      { title: "Hold the Simile", detail: "Contemplate the cucumber image — gentle severance, not violent uprooting." },
      { title: "Rest in Silence", detail: "After repetitions, sit with the sense of release the image conveys." },
    ],
    faq: [
      { q: "What does 'cucumber from its vine' mean?", a: "The simile distinguishes a ripe, willing release from a premature tearing-away — a metaphor for conscious, complete ending." },
      { q: "Is it meant to prevent death?", a: "The framing is contemplative: liberation from the fear and bondage of mortality, not a literal postponement of biological death." },
    ],
  },
  {
    slug: "yoga-nidra",
    name: "Yoga Nidrā",
    sanskrit: "योग निद्रा — Conscious Sleep",
    category: "Meditation",
    tradition: "Tantra / Haṭha",
    level: "Intermediate",
    durationHours: 16,
    days: 28,
    authenticityScore: 89,
    summary:
      "The state of 'conscious sleep' — the body resting while awareness remains luminous and unbroken, rooted in tantric and Upaniṣadic sources.",
    description:
      "Yoga Nidrā is the liminal state between waking and sleep in which the body approaches deep rest while the mind retains a thread of conscious witness. Classical roots appear in the Māṇḍūkya Upaniṣad (prājña / the deep-sleep witness) and tantric accounts of the goddess Yoga Nidrā. Modern systematic protocols — most influentially those of Satyananda Saraswati (Bihar School) — structure the descent through body-sensing, breath, and counter-image (saṅkalpa). The Archive distinguishes the classical state from the modern guided format.",
    primaryMantra: "I am awake, though the body sleeps.  (the witness-sentence)",
    benefits: [
      "A documented method for deep physiological rest",
      "Trains access to the hypnagogic threshold with retained awareness",
      "A bridge between relaxation practice and meditative absorption",
    ],
    warnings: [
      "Practitioners with trauma or dissociative conditions should use gentle, shortened sessions",
      "Do not use while operating machinery or driving",
    ],
    lineage:
      "Tantric roots → Māṇḍūkya framework → modern Bihar School systematization.",
    preSadhna: [
      { title: "Śavāsana (Corpse Posture)", duration: "3 min", detail: "Lie flat, arms and legs apart, eyes closed, fully supported." },
      { title: "The Saṅkalpa", duration: "2 min", detail: "Choose a short, present-tense intention repeated at the threshold of practice." },
    ],
    procedure: [
      { title: "Rotation of Awareness", detail: "Move attention briskly through named points of the body, not lingering.", substeps: ["Right hand → arm → shoulder", "Left side mirror", "Torso, legs, face"] },
      { title: "Breath Awareness", detail: "Count breaths backward from 27 (or 54), re-starting if a count is lost." },
      { title: "Opposites", detail: "Briefly evoke paired sensations (heavy/light, cold/warm) to deepen the threshold state." },
      { title: "Rest as Witness", detail: "Release technique; remain as the awareness in which sensations float." },
      { title: "Return", detail: "Slowly re-affirm the saṅkalpa and return to the body, moving gently." },
    ],
    faq: [
      { q: "Is it just a nap?", a: "No — the defining feature is retained, witnessing awareness across the sleep threshold. Falling fully asleep is regarded as a missed state, not the goal." },
      { q: "How long is a session?", a: "Classical guidance ranges 20–45 minutes. Shorter sessions suit new practitioners and those with dissociation history." },
    ],
  },
  {
    slug: "bija-mantra",
    name: "Bīja Mantra",
    sanskrit: "बीज मन्त्र — Seed Sounds of the Cakras",
    category: "Mantra",
    tradition: "Tantra",
    level: "Intermediate",
    durationHours: 14,
    days: 21,
    authenticityScore: 88,
    summary:
      "The seed-syllables (laṃ, vaṃ, raṃ, yaṃ, haṃ, oṃ) associated with the six contemplative centers — sonic 'seeds' held to condense an entire principle into a single phoneme.",
    description:
      "In tantric physiology, each of the principal cakras carries a bīja (seed) mantra: laṃ (earth, mūlādhāra), vaṃ (water, svādhiṣṭhāna), raṃ (fire, maṇipūra), yaṃ (air, anāhata), haṃ (ether, viśuddha), and oṃ (the ājñā). The principle of the bīja is compression: an entire cosmological element and its psychological correlate are said to be packed into a single resonant sound. Whether one regards the mapping as literal or symbolic, the bījas are a powerful object of study in how sound and imagery are linked in the tradition.",
    primaryMantra: "laṃ · vaṃ · raṃ · yaṃ · haṃ · oṃ",
    benefits: [
      "A compact system linking sound, element, and image",
      "Trains resonance at different bodily loci",
      "A foundation for yantra and cakra visualization",
    ],
    warnings: [
      "Some lineages hold the bījas to require transmission for ritual use",
      "Symbolic contemplation is widely open; ritual claims are not endorsed here",
    ],
    lineage: "Tantric cakra literature (Ṣaṭ-cakra-nirūpaṇa) → Śrī Vidyā & haṭha schools.",
    preSadhna: [
      { title: "Seated Posture", duration: "3 min", detail: "Sit erect with a feeling of the spine as a central axis." },
      { title: "Breath Settling", duration: "4 min", detail: "Equal breathing to prepare resonance." },
    ],
    procedure: [
      { title: "Mūlādhāra — laṃ", detail: "Sound 'laṃ' with attention at the base of the spine; feel the density of earth." },
      { title: "Svādhiṣṭhāna — vaṃ", detail: "Sound 'vaṃ' below the navel; sense the flow of water." },
      { title: "Maṇipūra — raṃ", detail: "Sound 'raṃ' at the navel; sense the warmth of fire." },
      { title: "Anāhata — yaṃ", detail: "Sound 'yaṃ' at the heart; sense the expansion of air." },
      { title: "Viśuddha — haṃ", detail: "Sound 'haṃ' at the throat; sense the openness of space." },
      { title: "Ājñā — oṃ", detail: "Sound 'oṃ' at the brow; rest in the unity beyond the elements." },
    ],
    faq: [
      { q: "Are the bījas 'sacred words'?", a: "They are phonemes the tradition treats as condensed carriers of elemental and psychological meaning. Their power, if any, is a matter of the practitioner's frame and study." },
      { q: "Do they 'open the cakras'?", a: "Tradition speaks of awakening subtle centers; the Archive records this as the tradition's account, not as a verified physiological event." },
    ],
  },
  {
    slug: "soham-dhyana",
    name: "So'haṃ Dhyāna",
    sanskrit: "सोऽहं — 'I Am That' Non-dual Contemplation",
    category: "Meditation",
    tradition: "Vedānta / Nāth",
    level: "Foundation",
    durationHours: 20,
    days: 30,
    authenticityScore: 90,
    summary:
      "Contemplative abidance in the recognition 'so'haṃ' — 'I am That' — the non-dual identity of the individual self (jīva) and the absolute (brahman).",
    description:
      "Drawing on the great dicta (mahāvākya) of the Upaniṣads — especially 'sa ahaṃ asmī' — the So'haṃ contemplation rests attention on the implicit identity between the witnessing self and the universal reality. Rather than producing an experience, the practice is one of recognition: noticing what is already the case beneath the noise of thought. It is the contemplative heart of the advaita and Nāth streams.",
    primaryMantra: "so'haṃ  ·  śivo'ham  ·  ahaṃ brahmāsmi",
    benefits: [
      "A direct entry into non-dual framing without complex technique",
      "Distinguishes attention from its objects",
      "Connects breath (ajapa) to pure recognition",
    ],
    warnings: [
      "Do not construe the recognition as a grandiose self-image",
      "Remain ordinary; the frame is humility disguised as simplicity",
    ],
    lineage: "Upaniṣadic seers → Advaita Vedānta (Śaṅkara) → Nāth streams → modern non-dual teachers.",
    preSadhna: [
      { title: "Settle", duration: "5 min", detail: "Sit and let thought settle of its own accord, without effort." },
      { title: "Locate the Witness", duration: "3 min", detail: "Notice the silent awareness in which thoughts appear and vanish." },
    ],
    procedure: [
      { title: "In-breath: 'sa'", detail: "On inhalation, the implicit 'I' (ahaṃ)." },
      { title: "Out-breath: 'haṃ' / 'That'", detail: "On exhalation, the implicit 'That' (tat) — 'I am That.'" },
      { title: "Abide as Awareness", detail: "Drop even the breath-link and rest as the open awareness that was always here." },
    ],
    faq: [
      { q: "Isn't 'I am That' an inflated claim?", a: "In its contemplative sense it points away from the personal self toward the impersonal awareness in which it appears — the opposite of inflation." },
      { q: "How does it relate to ajapa-japa?", a: "Ajapa is the method of noticing the breath's sound; So'haṃ is the recognition that sound discloses. They are two faces of one practice." },
    ],
  },
  {
    slug: "kumbhaka",
    name: "Kumbhaka",
    sanskrit: "कुम्भक — Breath Retention",
    category: "Prāṇāyāma",
    tradition: "Haṭha / Rāja Yoga",
    level: "Intermediate",
    durationHours: 18,
    days: 30,
    authenticityScore: 91,
    summary:
      "The deliberate, measured retention of breath (antar/sahita) described in the Yoga Sūtras as the means by which 'the veil over illumination is thinned.'",
    description:
      "Kumbhaka is the retention phase of prāṇāyāma — a pause (inner, after inhale; outer, after exhale) cultivated with increasing steadiness. Patañjali's Yoga Sūtras (II.49–52) present regulated breath-retention as the factor that 'makes the mind fit for dhāraṇā' and thins the obscuration of innate luminosity. The Haṭha texts catalog many ratios (1:4:2 etc.). The Archive emphasizes gentle progression and the invariable traditional caution against strain.",
    primaryMantra: "(silent retention; the natural Oṃ of the held breath)",
    benefits: [
      "A documented bridge from breath practice to meditative concentration",
      "Trains autonomic steadiness and CO₂ tolerance (gently)",
      "Central to classical aṣṭāṅga methodology",
    ],
    warnings: [
      "Never retain to the point of gasping, dizziness, or distress",
      "Those with cardiovascular or respiratory conditions must proceed only with clinical guidance",
      "Build ratios gradually over weeks, not days",
    ],
    lineage: "Patañjali (Yoga Sūtras) → Haṭha corpus → modern yoga revival.",
    preSadhna: [
      { title: "Master Nāḍī Śuddhi First", duration: "—", detail: "Retention is layered atop steady alternate-nostril breathing, never begun cold." },
      { title: "Empty Stomach, Calm Setting", duration: "3 min", detail: "Practice seated, upright, undisturbed." },
    ],
    procedure: [
      { title: "Inhale to a Count", detail: "Inhale steadily to, say, a count of 4." },
      { title: "Retain (Antar Kumbhaka)", detail: "Hold comfortably — begin equal to the inhale, later extending toward 2×.", caution: "Ease governs; release before any strain." },
      { title: "Exhale to a Count", detail: "Exhale slowly to 2× the inhale count (4:4:8 progression)." },
      { title: "Observe the Inner Stillness", detail: "In the retention, attend to the quiet that precedes thought." },
    ],
    faq: [
      { q: "Is breath-holding safe?", a: "Gentle, progressive retention is safe for most healthy adults. The tradition itself is emphatic: never strain, and never gasp." },
      { q: "What is the 'thin veil' Patañjali describes?", a: "A contemplative image: the obscuration of innate clarity is said to lessen as breath and mind grow steady. The Archive presents this as the tradition's account." },
    ],
  },
  {
    slug: "chakra-dharana",
    name: "Cakra Dhāraṇā",
    sanskrit: "चक्र धारणा — Concentration on the Centers",
    category: "Dhāraṇā",
    tradition: "Tantra",
    level: "Intermediate",
    durationHours: 22,
    days: 40,
    authenticityScore: 87,
    summary:
      "Structured concentration upon the six principal psycho-spiritual centers (mūlādhāra → ājñā), each visualized with its element, color, and seed-syllable.",
    description:
      "Cakra Dhāraṇā is the tantric practice of dwelling attention on the subtle centers arrayed along the central axis. The Ṣaṭ-cakra-nirūpaṇa (part of the Śrī Ṭaṅka) describes each with its location, element, color, lotus-petals, animal emblem, and bīja. Concentration proceeds upward, stabilizing attention at each locus. It is both a visualization discipline and a map of ascending psychological states. The Archive presents the symbolism faithfully while marking physiological claims as interpretive.",
    primaryMantra: "laṃ · vaṃ · raṃ · yaṃ · haṃ · oṃ  (the ascending bījas)",
    benefits: [
      "A complete symbolic system linking body, element, and sound",
      "Trains layered visualization and sustained attention",
      "Foundation for kuṇḍalinī-oriented practices (with proper grounding)",
    ],
    warnings: [
      "Intensive kuṇḍalinī work is held by tradition to require a qualified guide; symbolic visualization is the safer, open entry",
      "Discontinue if disturbing imagery or dissociation arises",
    ],
    lineage: "Tantric cakra literature → Śrī Vidyā → modern integrative yoga.",
    preSadhna: [
      { title: "Central Axis", duration: "4 min", detail: "Establish the felt sense of a vertical axis from base to crown." },
      { title: "Grounding", duration: "3 min", detail: "Begin at the base (earth) so practice ascends from a stable foundation." },
    ],
    procedure: [
      { title: "Mūlādhāra", detail: "Base of spine: a four-petaled vermilion lotus, bīja 'laṃ', element earth." },
      { title: "Svādhiṣṭhāna", detail: "Below navel: six-petaled lotus, bīja 'vaṃ', water." },
      { title: "Maṇipūra", detail: "Navel: ten-petaled, bīja 'raṃ', fire." },
      { title: "Anāhata", detail: "Heart: twelve-petaled, bīja 'yaṃ', air." },
      { title: "Viśuddha", detail: "Throat: sixteen-petaled, bīja 'haṃ', ether." },
      { title: "Ājñā", detail: "Brow: two-petaled, bīja 'oṃ', beyond the elements." },
    ],
    faq: [
      { q: "Are the cakras real?", a: "They are a documented symbolic-anatomical model of the tradition. Some practitioners report felt correspondences; the Archive does not assert them as anatomical organs." },
      { q: "Why ascend from the base?", a: "Both safety (grounding) and symbolism (emanation proceeds upward through the elements) favor a base-to-crown progression." },
    ],
  },
  {
    slug: "manasika-japa",
    name: "Mānasika Japa",
    sanskrit: "मानसिक जप — Mental Repetition",
    category: "Mantra",
    tradition: "Universal",
    level: "Foundation",
    durationHours: 10,
    days: 21,
    authenticityScore: 93,
    summary:
      "The wholly internal repetition of a mantra, without movement of lips or breath — regarded as the most subtle and powerful mode of japa.",
    description:
      "Mānasika japa is the inward repetition of a chosen syllable or verse, performed entirely in the mind. The tantric and yogic hierarchy of japa places audible (vācika) below whispered (upāṁśu) below mental (mānasika), since the latter requires and trains the most sustained one-pointedness. It is the natural culmination of any mantra practice and the form recommended for sustained, daily contemplation.",
    primaryMantra: "(the practitioner's chosen seed or verse, repeated in silence)",
    benefits: [
      "Trains pure internal attention independent of physical action",
      "Portable, invisible, and usable in any setting",
      "The mature form toward which all japa tends",
    ],
    warnings: [
      "Drowsiness is the chief obstacle; keep the spine alert",
      "Do not regard mechanical counting as the goal — quality governs",
    ],
    lineage: "Foundational across Vedānta, Tantra, bhakti, and yoga lineages.",
    preSadhna: [
      { title: "Choose the Mantra", duration: "2 min", detail: "Select a single, stable seed or short verse for the whole session." },
      { title: "Alert Posture", duration: "3 min", detail: "An erect, alert posture counteracts the drowsiness that silent japa invites." },
    ],
    procedure: [
      { title: "Sound Internally", detail: "Reproduce the mantra in the mind alone — no lip movement, no breath alteration." },
      { title: "Attend to the Shape", detail: "Feel the 'shape' of the inner sound as a continuous thread." },
      { title: "Catch the Drift", detail: "When attention wanders, return without self-reproach — the return is the practice." },
      { title: "Rest in the After-Silence", detail: "Periodically pause and rest in the silence between repetitions." },
    ],
    faq: [
      { q: "Why is it considered higher than audible japa?", a: "Because it sustains one-pointedness without external support, exercising precisely the faculty (ekāgratā) the practice is meant to develop." },
      { q: "Which mantra should I choose?", a: "The Archive does not prescribe. Traditionally a seed or verse is received or chosen and then kept stable rather than rotated." },
    ],
  },
  {
    slug: "sandhya-vandanam",
    name: "Sandhyā Vandanam",
    sanskrit: "सन्ध्यावन्दनम् — The Twilight Rites",
    category: "Ritual",
    tradition: "Vedic (Smārta)",
    level: "Foundation",
    durationHours: 25,
    days: 60,
    authenticityScore: 94,
    summary:
      "The thrice-daily Vedic discipline performed at the junctures (sandhyā) of dawn, noon, and dusk — arguably the oldest continuously practiced contemplative ritual on earth.",
    description:
      "Sandhyā Vandanam is the daily Vedic office performed at the three junctures of the day. It unifies gesture (mudrā), breath (prāṇāyāma), water-offering (ārghya), and invocation (gāyatrī japa) into a single choreographed rite marking the transition of light. As a living practice it offers a rare window into how ancient ritual grammar persists unbroken into the present. The Archive documents the structure as cultural and liturgical heritage.",
    primaryMantra: "gāyatrī japa (108×) preceded by 'oṃ bhūr bhuvaḥ svaḥ...'",
    benefits: [
      "A living relic of continuous Vedic ritual practice (3,000+ years)",
      "Integrates breath, gesture, and invocation in a single choreography",
      "Models ritual as a discipline of time (the junctures of light)",
    ],
    warnings: [
      "A complex ritual traditionally learned by direct transmission; study before attempting",
      "Presented here as documented heritage, not as a prescription",
    ],
    lineage: "Vedic ritual schools (Taittirīya, Ṛgveda, etc.) → Smārta tradition → present-day practitioners.",
    preSadhna: [
      { title: "Purification (Ācamana)", duration: "3 min", detail: "Sips of water with invocation, marking ritual readiness." },
      { title: "Orientation", duration: "2 min", detail: "Facing the direction appropriate to the juncture (east at dawn, etc.)." },
    ],
    procedure: [
      { title: "Sankalpa", detail: "A formal statement of intent and the cosmic time of the act." },
      { title: "Mārjana & Prāśana", detail: "Purification of the body and sipping of sanctified water." },
      { title: "Ārghya", detail: "Offering of water to the sun at the juncture of light." },
      { title: "Prāṇāyāma", detail: "Measured breath with the Vyāhṛtis and the Gāyatrī." },
      { title: "Gāyatrī Japa", detail: "108 repetitions of the Gāyatrī — the heart of the rite." },
      { title: "Upasthāna", detail: "Closing salutation and return to ordinary time." },
    ],
    faq: [
      { q: "Why three times a day?", a: "The junctures of dawn, noon, and dusk are the liminal thresholds of light — held to be the moments when contemplative efficacy is greatest." },
      { q: "Can it be studied by outsiders?", a: "Its structure is well-documented in the Gṛhya and Dharma texts and accessible to study, though performance historically presumes initiation." },
    ],
  },
  {
    slug: "preta-siddhi",
    name: "Preta-Saṁvāda (Spirit Dialogue)",
    sanskrit: "प्रेतसंवाद — Dialogue with the Departed",
    category: "Tantra",
    tradition: "Tantra / Aghora / Kaula",
    level: "Advanced",
    durationHours: 24,
    days: 3,
    authenticityScore: 72,
    summary:
      "A complete Aghora/Kaula field rite for invoking, questioning, and releasing a preta (restless spirit) within a protected maṇḍala. Documented in the supplied Preta-Siddhi field manual.",
    description:
      "Preta-Saṁvāda is the tantric discipline of dialogue with a preta — a spirit bound by ṛṇa (debt), dveṣa (hatred), or moha (attachment). The rite as documented in the project's knowledge archive comprises three nights of bhūta-śuddhi preparation (Agnī-jāla Rakṣā, tripuṇḍra, dietary restraint), construction of the Preta-Sandhi Yantra on a 12×12 unit grid with bīja at four gates, deployment of the Chakra-Maṇḍala (three concentric zones: yantra core, elemental guard ring, protective mantra circle), invocation of the preta through 108 japa, a seven-question diagnostic sequence (the mūla-prashna), and a liberation rite (Preta-Mukti Kriyā) involving either Āpūrti-Kriyā (karmic substitution) or Bandhana-Chedana (astral severance with a lemon). The rite is preserved as heritage; it is not instructional for unsupervised practice.",
    primaryMantra:
      "oṃ pretātmane āvāhayāmi satyaṁ prakāśaya prakāśaya svāhā  (the invocation, 108×)",
    benefits: [
      "Documents a complete operational rite with yantra, maṇḍala, and diagnostic protocol",
      "Surfaces the dual-rite release logic (substitution vs. severance) found across Aghora lineages",
      "Preserves the seven mūla-prashna as a diagnostic of spirit-binding causes",
    ],
    warnings: [
      "HIGH CAUTION — spirit-contact rite; not to be undertaken without lineage transmission",
      "The source manual warns that the preta's suffering is 'infectious' to unprepared prāṇa and manas",
      "Never reuse a preta-sandhi yantra — single engagement only, then immersed in running water",
      "Do not perform the full kriyā more than once a fortnight; it drains prāṇa",
      "Several mantras in the source carry apparent transmission artifacts; the editorial-correction table in the field manual should be consulted",
    ],
    lineage:
      "Aghora / Kaula tantric oral transmission → modern compilations; no single textual witness; preserved as a field manual of operational detail.",
    preSadhna: [
      { title: "Agnī-jāla Rakṣā (3 nights)", duration: "20 min/night", detail: "Sit facing east at dawn, light seven sesame-oil lamps in a circle, chant 21× Om Agne Jālasamantaṁ Māṁ Rakṣa Rakṣa Svāhā." },
      { title: "Tripuṇḍra & Rakṣā-Sūtra", duration: "5 min", detail: "Apply vibhūti in three lines on the forehead with 3× Om Namaḥ Śivāya; tie a red rakṣā-sūtra on the right wrist." },
      { title: "Dietary Restraint (3 nights)", duration: "3 days", detail: "No meat, alcohol, onions, or garlic; one meal before sunset; no food after." },
    ],
    procedure: [
      { title: "Ground Preparation", detail: "Draw a śaṭkoṇa with rice flour; place a copper plate in the center with black sesame, mustard-oil dīpa, and a kalaśa with mango leaves and coconut." },
      { title: "Construct the Preta-Sandhi Yantra", detail: "On a 12×12 unit grid, draw the outer bhūpura with four 2-unit gates; draw the śaṭkoṇa inside; place a black bindu at the center; inscribe bīja at each gate (East ॐ, South ह्रं, West क्षौं, North फट्); circumscribe with the mantra ring." },
      { title: "Deploy the Chakra-Maṇḍala", detail: "Three concentric zones: inner yantra core with mustard lamp + 7 sesame seeds; middle elemental guard ring (N: water+tulsi, E: frankincense, S: burning neem, W: lemon with 4 cloves) at 2 arm-lengths; outer rice-turmeric circle with bīja at four cardinal points." },
      { title: "Invocation (108×)", detail: "Sit one arm-length north of yantra, facing south. Chant 108× Om Pretātmane Āvāhayāmi Satyaṁ Prakāśaya Prakāśaya Svāhā. Fix gaze on the bindu." },
      { title: "The 7 Preta-Prashna", detail: "Ask, in order: cause of arrival, cause of binding, final memory, debt chain, enemy presence, desire attachment, path to release. Pause between each for signs (flame flicker, temperature, scent)." },
      { title: "Preta-Mukti Kriyā", detail: "Choose the appropriate release: simple sesame-offering (no object), promise of return (object retrievable), Āpūrti-Kriyā (substitute object, 108× Om Pretabandha-Mocanāya Hrīṁ Kṣauṁ Phaṭ Svāhā), or Bandhana-Chedana (cut a lemon at the bindu while chanting Om Chindhi Bandhanaṁ Svāhā)." },
      { title: "Closing", detail: "Pour northern water + sesame to earth; circle yantra 3× with lamp chanting Om Hrīṁ Kṣauṁ Phaṭ; extinguish outer lamps first, central last; fold yantra inward and immerse in running water before sunrise; salt bath + 21× Mahāmṛtyuñjaya." },
    ],
    faq: [
      { q: "What is the difference between Āpūrti and Bandhana-Chedana?", a: "Āpūrti-Kriyā substitutes a ritually-empowered object for the original, releasing the preta without retrieving the original. Bandhana-Chedana severs the preta's emotional cord to the object directly by cutting a lemon at the bindu. The manual counsels Āpūrti first (gentler); Bandhana-Chedana only if the preta is hostile and the holder refuses." },
      { q: "Why is the yantra single-use?", a: "The preta's presence is held to leave an energetic residue on the yantra's bindu. Reuse would risk re-invoking without fresh protection. After the rite the yantra is immersed in running water or buried under a peepal tree with sesame and milk." },
    ],
    yantra: {
      name: "Preta-Sandhi Yantra",
      description: "A 12×12-unit square bhūpura with four 2-unit gates, inscribed with the śaṭkoṇa (two intersecting equilateral triangles) and a central black bindu. Gate bījas: East ॐ, South ह्रं, West क्षौं, North फट्. The outer ring carries the inscription ॐ प्रेतसन्धिकराय ह्रं क्षौं फट् स्वाहा.",
      symbolism: "The four gates are the open-yet-protected channels of communication with the spirit realm. The śaṭkoṇa balances the human and spirit realms. The black bindu is the preta's anchoring point during the dialogue. The single-engagement constraint encodes the principle that each contact is unique and not to be repeated.",
    },
  },
  {
    slug: "bagalamukhi-sadhana",
    name: "Bagalāmukhī Sādhana",
    sanskrit: "बगलामुखी — The Paralysing Goddess",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 78,
    summary:
      "The eighth Mahāvidyā, embodying stambhana (paralysis) — the power to silence hostile speech and arrest inauspicious force. Attested in the Todala Tantra and Rudrayāmala.",
    description:
      "Bagalāmukhī is the eighth of the Daśa Mahāvidyās, iconographically depicted as golden-complexioned, pulling the tongue of a demon with her left hand while wielding a cudgel with her right. Her sādhana is framed around stambhana — the arrest of breath, speech, motion, or hostile intent. The primary textual attestations are the Todala Tantra (which lists the ten Mahāvidyā mūla-mantras) and the Rudrayāmala's Bagalāmukhī-stotra section. The Pitāmbarā Peeth recension (Datia, 1964) preserves an operational paddhati. The Archive preserves the textual framing without reproducing dīkṣā-restricted bījas.",
    primaryMantra:
      "the specific mūla-mantra varies across recensions; the bīja-syllable hrīṁ and the namaskāra 'oṃ hrīṁ bagalāmukhī devyai namaḥ' are publicly attested",
    benefits: [
      "Documents one of the ten Mahāvidyās in their textual lineage",
      "Surfaces the stambhana framework as a category of contemplative action",
      "Connects to a substantial academic literature on Śākta tantric practice",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice, traditionally requires dīkṣā",
      "Stambhana rites are categorized as ugra (fierce); the source texts warn against casual undertaking",
      "The Pitāmbarā Peeth recension carries explicit restriction against open publication of the mūla-mantra",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Todala Tantra → Rudrayāmala → Pitāmbarā Peeth recension → modern Śākta paddhatis. Academic study: D.G. White (Kiss of the Yoginī, 2003), Sanderson (Śaiva Exegesis, 2007), Goudriaan & Gupta (Hindu Tantric and Śākta Literature, 1981).",
    preSadhna: [
      { title: "Purification", duration: "3 days", detail: "Dietary restraint, śauca, and preliminary gaṇeśa-and-guru invocations per the Pitāmbarā paddhati." },
      { title: "Direction & Time", duration: "—", detail: "The textual tradition prescribes specific muhūrta; consult the Todala Tantra ch. 6 and the Pitāmbarā recension." },
    ],
    procedure: [
      { title: "Yantra Installation", detail: "A square yantra with the appropriate bīja at the gates and the goddess's seed-syllable at the bindu. Construction details are dīkṣā-restricted; the public form is documented in Śākta Praamoda." },
      { title: "Mūla-mantra Japa", detail: "The count and duration vary by paddhati. The Todala Tantra specifies the mūla-mantra; the Pitāmbarā Peeth recension specifies the operational count." },
      { title: "Stambhana Application", detail: "Application of stambhana is framed in the texts as protective — the arrest of hostile speech or intent — never as aggression for personal gain. The archive does not document the application specifics." },
    ],
    faq: [
      { q: "Why is the mūla-mantra not reproduced here?", a: "The published editions (Pitāmbarā Peeth, Chowkhamba) carry explicit dīkṣā-restriction notices against open publication. The archive respects this restriction; readers seeking the mūla-mantra should consult the printed editions or a qualified lineage holder." },
      { q: "Is stambhana the same as a 'curse'?", a: "No. Stambhana is a technical category in the ṣaṭ-karma framework (the six ritual acts) and is framed in the source texts as protective — the arrest of hostile force. A curse (śāpa) is a different category with a different metaphysical frame." },
    ],
  },
  {
    slug: "chinnamasta-sadhana",
    name: "Chinnamastā Sādhana",
    sanskrit: "चिन्नमस्ता — The Self-Decapitated Goddess",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 80,
    summary:
      "The third Mahāvidyā, iconographically depicted as self-decapitated, holding her own severed head while her two attendants drink the three streams of blood. Attested in Śāradā Tilaka ch. 7 and Prāṇatoṣiṇī commentary.",
    description:
      "Chinnamastā is one of the most striking iconographies in the Śākta pantheon: the goddess has severed her own head with a sword or scythe, and three streams of blood flow from her neck — one into her own severed mouth, two into the mouths of her attendant dākinīs Varniṇī and Dakini. The image encodes a theology of self-offering, the recycling of life-force (prāṇa) back into itself, and the non-dual recognition that the offerer, the offering, and the receiver are one. The primary textual attestations are the Śāradā Tilaka (chapter 7, with the Prāṇatoṣiṇī commentary of 1898) and the Śakti Saṅgama Tantra's Chinnamastā Khaṇḍa. Academic study: Elizabeth Benard (Chinnamastā, 1994), S.K. Ramachandra Rao's encyclopaedic entries.",
    primaryMantra:
      "the mūla-mantra and the bīja 'hūṁ' are publicly attested; the operational form is dīkṣā-restricted",
    benefits: [
      "Documents one of the most theologically dense Mahāvidyā iconographies",
      "Surfaces the self-offering theology of the prāṇa-cycle",
      "Connects to academic work by Benard and Ramachandra Rao",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice",
      "The iconography itself is psychologically intense; the source texts warn that the sādhana requires stable psychological grounding",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Śāradā Tilaka (c. 8th-11th c.) → Prāṇatoṣiṇī commentary (Bhatțoji Dīkṣita) → Śakti Saṅgama Tantra → modern Śākta paddhatis. Academic study: Benard 1994.",
    preSadhna: [
      { title: "Iconographic Contemplation", duration: "ongoing", detail: "Study the iconography in its textual description (Śāradā Tilaka 7 + Prāṇatoṣiṇī) before any mantra-japa. The image itself is the primary contemplative instrument." },
      { title: "Preliminary Deity Worship", duration: "7 days", detail: "Standard Śākta preliminaries: guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śāradā Tilaka paddhati." },
    ],
    procedure: [
      { title: "Yantra Installation", detail: "The Chinnamastā yantra is described in Śāradā Tilaka 7 with the Prāṇatoṣiṇī commentary: a square bhūpura, eight-petalled lotus, inverted triangle, and the goddess's bīja at the bindu." },
      { title: "Mūla-mantra Japa", detail: "The count is 100,000 per the Śāradā Tilaka paddhati; the operational form is dīkṣā-restricted. The public form 'oṃ hrīṁ klīṁ aim̐ hūṁ phaṭ' is attested in some published editions." },
      { title: "Iconographic Dhyāna", detail: "The dhyāna-śloka (meditation verse) is recited before japa; it describes the self-decapitation, the three streams of blood, and the standing-on-Rati-and-Kāma iconography. The verse is preserved in Śāradā Tilaka 7." },
    ],
    faq: [
      { q: "What does the self-decapitation symbolize?", a: "Academic interpretation (Benard 1994, Ramachandra Rao) reads the iconography as the recycling of prāṇa: the goddess offers her own life-force to herself and her attendants, encoding a non-dual recognition that the offerer, offering, and receiver are one. The image is theologically dense, not a literal prescription." },
      { q: "Why are the attendants drinking blood?", a: "The three streams are read as the three nāḍīs (iḍā, piṅgalā, suṣumṇā) or the three guṇas (sattva, rajas, tamas). The dākinīs Varniṇī and Dakini represent the polarised aspects; Chinnamastā herself is the central axis." },
    ],
  },
  {
    slug: "kala-bhairava-sadhana",
    name: "Kāla Bhairava Aṣṭākṣara Sādhana",
    sanskrit: "काल भैरव — The Terrifying Form of Śiva",
    category: "Tantra",
    tradition: "Śaiva (Kashmir Śaiva / Siddhānta)",
    level: "Advanced",
    durationHours: 18,
    days: 41,
    authenticityScore: 82,
    summary:
      "Sādhana of Kāla Bhairava — the fierce, time-bound form of Śiva who guards the threshold and dissolves fear. Attested in the Svacchanda Tantra and the Kāla Bhairavāṣṭakam.",
    description:
      "Kāla Bhairava is the fierce (ugra) form of Śiva associated with time (kāla), death, and the protection of sacred thresholds. Iconographically depicted as dark-complexioned, carrying a skull-staff (khaṭvāṅga), a trident, and a noose, with a garland of skulls and a dog as his vāhana. The aṣṭākṣara (eight-syllable) mantra is attested in the Svacchanda Tantra, the principal scriptural authority of Kashmir Śaiva non-dualism. The Kāla Bhairavāṣṭakam (eight-verse hymn traditionally attributed to Ādi Śaṅkarācārya, though the attribution is unverifiable) is a widely-recited devotional text. The archive preserves both the textual and the devotional traditions separately.",
    primaryMantra:
      "the aṣṭākṣara is attested in the Svacchanda Tantra; the specific bīja-syllables are dīkṣā-restricted. The Kāla Bhairavāṣṭakam is publicly recited.",
    benefits: [
      "Documents a major Śaiva ugra-devatā practice with strong textual attestation",
      "Connects the contemplative and devotional streams of Bhairava worship",
      "Surfaces the Svacchanda Tantra as a primary scriptural source",
    ],
    warnings: [
      "HIGH CAUTION — ugra-devatā practice; traditionally requires dīkṣā",
      "The Svacchanda Tantra prescribes specific nyāsa and āvāhana preliminaries; without these the japa is held to be ineffective or destabilising",
      "The attribution of the Kāla Bhairavāṣṭakam to Śaṅkarācārya is traditional and unverifiable",
      "Not appropriate for practitioners without a Śaiva lineage grounding",
    ],
    lineage:
      "Svacchanda Tantra (Kashmir Śaiva, c. 7th-9th c.) → Abhinavagupta's commentary → modern Śaiva paddhatis. Devotional stream: Kāla Bhairavāṣṭakam (traditional attribution to Śaṅkarācārya, unverifiable). Academic: Dyczkowski (The Canon of the Śaivāgama), Sanderson (Śaiva Exegesis).",
    preSadhna: [
      { title: "Nyāsa", duration: "15 min", detail: "Aṅga-nyāsa and kara-nyāsa per the Svacchanda Tantra paddhati, with the appropriate Bhairava bīja." },
      { title: "Direction & Time", duration: "—", detail: "The Svacchanda Tantra prescribes facing north or east at midnight or dawn; consult the text for the specific muhūrta." },
    ],
    procedure: [
      { title: "Bhairava Dhyāna", detail: "The dhyāna-śloka from the Svacchanda Tantra describes the iconography: dark, skull-garlanded, three-eyed, with the khaṭvāṅga and trident. Recite before japa." },
      { title: "Aṣṭākṣara Japa", detail: "The eight-syllable mūla-mantra is attested in the Svacchanda Tantra. Count is typically 100,000 over 41 days. The specific bījas are dīkṣā-restricted." },
      { title: "Bhairavāṣṭakam Recitation", detail: "The eight-verse Kāla Bhairavāṣṭakam is recited as a devotional complement. The text is publicly available in the Complete Works of Śaṅkarācārya (1910 ed., Internet Archive)." },
    ],
    faq: [
      { q: "Is Kāla Bhairava the same as Śiva?", a: "Kāla Bhairava is a specific ugra form of Śiva associated with time, death, and threshold-protection. Theologically, in the non-dual Kashmir Śaiva framework, all forms are appearances of the single consciousness; devotionally, Bhairava is approached as a distinct protective deity." },
      { q: "Why is the dog his vāhana?", a: "The dog (śva) is associated with death, threshold-states, and the Bhairava-Kāpālika milieu in Śaiva tradition. The iconographic presence of the dog signals the liminal, chthonic register of the deity." },
    ],
  },
  {
    slug: "bala-tripurasundari-sadhana",
    name: "Bālā Tripurasundarī (Bālā Pañcadaśākṣarī)",
    sanskrit: "बालात्रिपुरसुन्दरी — The Girl-Form of the Goddess",
    category: "Tantra",
    tradition: "Śrī Vidyā (Śākta)",
    level: "Advanced",
    durationHours: 20,
    days: 45,
    authenticityScore: 84,
    summary:
      "Sādhana of Bālā Tripurasundarī — the girl-form (bālā) of the Goddess, the entry-level practice of Śrī Vidyā using the 15-syllable pañcadaśākṣarī mantra. Attested in the Vāmakeśvara Tantra and Paraśurāma Kalpasūtra.",
    description:
      "Bālā Tripurasundarī is the girl-form of Tripurasundarī, the great Goddess of the Śrī Vidyā tradition. She is iconographically depicted as a girl of approximately nine years, holding a book, a noose, a goad, and an arrow (or, in some recensions, a sugarcane bow). Bālā is the entry-level deity of the Śrī Vidyā canon — her sādhana is traditionally the first given to a Śrī Vidyā initiate before the full pañcadaśākṣarī of Tripurasundarī herself. The primary textual attestations are the Vāmakeśvara Tantra, the Bhāvanā Upaniṣad (which describes the Śrī Cakra and the pañcadaśī), and the Paraśurāma Kalpasūtra with its commentaries. Academic study: S.K. Ramchandra Rao (Tantra of Śrī Cakra), André Padoux (Vac, 1990), Madhu Khanna (Yantra, 1979).",
    primaryMantra:
      "the pañcadaśākṣarī (15-syllable) is dīkṣā-restricted; the Bālā bīja-mantra (3-syllable) is the entry-level form, also dīkṣā-restricted in operational form",
    benefits: [
      "Documents the entry-level practice of the Śrī Vidyā canon",
      "Surfaces the Vāmakeśvara Tantra and Paraśurāma Kalpasūtra as primary sources",
      "Connects to a substantial academic literature (Padoux, Khanna, Rao)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Śrī Vidyā practice, traditionally requires dīkṣā",
      "The pañcadaśākṣarī is held to require precise pronunciation; the source texts warn that incorrect japa is destabilising rather than merely ineffective",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śrī Vidyā lineage holder",
    ],
    lineage:
      "Vāmakeśvara Tantra → Bhāvanā Upaniṣad → Paraśurāma Kalpasūtra (c. 10th-11th c.) + Rāmeśvara Sūtri commentary → modern Śrī Vidyā paddhatis. Academic: S.K. Ramchandra Rao, André Padoux, Madhu Khanna.",
    preSadhna: [
      { title: "Guru-Pūjā & Śrī Cakra Darśana", duration: "ongoing", detail: "Standard Śrī Vidyā preliminaries: the sādhaka approaches the Śrī Cakra as the geometric body of the Goddess, with the guru as the transmitting link." },
      { title: "Purification", duration: "7 days", detail: "Dietary restraint, śauca, and recitation of the Lalitā Sahasranāma as preparation for Bālā dīkṣā." },
    ],
    procedure: [
      { title: "Bālā Yantra", detail: "A simplified Śrī Cakra variant specific to Bālā, described in the Vāmakeśvara Tantra paddhati. Construction details are dīkṣā-restricted." },
      { title: "Bālā Pañcadaśākṣarī Japa", detail: "The 15-syllable mantra is attested in the Vāmakeśvara Tantra and Bhāvanā Upaniṣad. The count is 100,000 over 45 days. The specific syllables are dīkṣā-restricted." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the girl-form: nine-years-old, holding book, noose, goad, and arrow/flower. Recited before japa." },
    ],
    faq: [
      { q: "Why is Bālā the entry-level Śrī Vidyā practice?", a: "The Śrī Vidyā tradition frames Bālā as the approachable, gentle form of the Goddess. Initiation into her practice is the prerequisite for the full pañcadaśākṣarī of Tripurasundarī. The entry-level framing is documented in the Paraśurāma Kalpasūtra." },
      { q: "What is the relationship between Bālā and the Śrī Cakra?", a: "Bālā's yantra is a simplified variant of the Śrī Cakra, and her mantra is held to be a subset of the pañcadaśī. Theologically, Bālā is the girl-form that matures into the full Tripurasundarī." },
    ],
  },
  {
    slug: "vajrayogini-sadhana",
    name: "Vajravārāhī / Vajrayoginī Sādhana",
    sanskrit: "वज्रवाराही — The Adamantine Sow-Headed Ḍākinī",
    category: "Tantra",
    tradition: "Buddhist Tantra (Cakrasaṃvara cycle)",
    level: "Advanced",
    durationHours: 24,
    days: 60,
    authenticityScore: 86,
    summary:
      "Sādhana of Vajravārāhī (Vajrayoginī) — the adamantine sow-headed ḍākinī of the Cakrasaṃvara cycle. Attested in the Śrī Vajravārāhīsādhana and the Cakrasaṃvara-tantra.",
    description:
      "Vajrayoginī (also Vajravārāhī — 'the Adamantine Sow') is the principal female deity of the Cakrasaṃvara cycle of Buddhist tantra. Iconographically depicted as red, naked, with a sow's head protruding from behind her right ear, holding a curved knife (kartari) and a skull-bowl (kapāla), standing in ardhaparyaṅka on a corpse. Her sādhana is the entry-point into the mother-tantra class of Buddhist tantra and is preserved in the Tibetan (Tibetan Buddhist Resource Center catalogues), Newari, and Sanskrit manuscript traditions. The Śrī Vajravārāhīsādhana is preserved in the DSBC (Digital Sanskrit Buddhist Canon) and is the primary Sanskrit source. Academic study: Elizabeth English, Vajrayoginī: Her Visualizations, Rituals, and Forms (2002, Wisdom Publications); Ronald Davidson, Indian Esoteric Buddhism (2002).",
    primaryMantra:
      "the 10-syllable (or 12-syllable in some recensions) Vajravārāhī mantra is attested in the Śrī Vajravārāhīsādhana; the operational form is dīkṣā-restricted. The seed-syllable hrīṁ is publicly attested.",
    benefits: [
      "Documents the principal female deity of the Buddhist mother-tantras",
      "Surfaces the Śrī Vajravārāhīsādhana and Cakrasaṃvara-tantra as primary sources",
      "Connects to substantial academic study (English 2002, Davidson 2002)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Buddhist mother-tantra practice; requires abhiṣeka (empowerment)",
      "The Cakrasaṃvara cycle is held in the Tibetan tradition to require completion-stage preliminaries",
      "The operational mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Tibetan or Newari Buddhist lineage transmission",
    ],
    lineage:
      "Cakrasaṃvara-tantra → Śrī Vajravārāhīsādhana (Sanskrit, DSBC) → Tibetan (bKa' brgyud, Sa skya, dGe lugs transmissions) → Newari tradition. Academic: English 2002 (full monograph), Davidson 2002.",
    preSadhna: [
      { title: "Abhiṣeka", duration: "ceremony", detail: "The Cakrasaṃvara abhiṣeka (empowerment) is the prerequisite without which the sādhana is held to be ineffective. Obtainable from qualified Tibetan or Newari lamas." },
      { title: "Refuge & Bodhicitta", duration: "ongoing", detail: "Standard Buddhist tantric preliminaries: refuge in the three jewels, generation of bodhicitta, the four immeasurables." },
    ],
    procedure: [
      { title: "Self-Generation as Vajravārāhī", detail: "The sādhaka visualises themselves as Vajravārāhī per the dhyāna in the Śrī Vajravārāhīsādhana: red, naked, sow-headed, holding kartari and kapāla, standing on a corpse, in the centre of the Cakrasaṃvara maṇḍala." },
      { title: "Mantra Japa", detail: "The 10- or 12-syllable mantra is attested in the Śrī Vajravārāhīsādhana. Count is typically 100,000 with a 10,000 fire-offering. The operational form is dīkṣā-restricted." },
      { title: "Maṇḍala Offerings", detail: "The Cakrasaṃvara maṇḍala is the operating field; offerings of the five nectars and five meats are prescribed in the source text." },
    ],
    faq: [
      { q: "Why the sow's head?", a: "The sow (vārāhī) symbolises the rooting-out of ignorance, the 'root-cutting' of the ego. The iconographic presence of the sow's head behind the right ear is attested in both the Sanskrit dhyāna-ślokas and the Tibetan commentarial tradition. See English 2002, ch. 3." },
      { q: "What is the relationship to the Hindu Vārāhī?", a: "The Hindu Vārāhī (one of the Saptamātṛkā) and the Buddhist Vajravārāhī share an iconographic root (the sow-head) but belong to distinct theological frameworks. The Buddhist Vajravārāhī is a ḍākinī in the Cakrasaṃvara cycle; the Hindu Vārāhī is a mātṛkā. The shared iconography reflects the cross-pollination of tantric milieus documented by Sanderson and Davidson." },
    ],
  },
  {
    slug: "sudarshana-chakra-sadhana",
    name: "Sudarśana Chakra Sādhana",
    sanskrit: "सुदर्शन चक्र — The Discus of Viṣṇu",
    category: "Tantra",
    tradition: "Śrī Vaiṣṇava (Pāñcarātra)",
    level: "Intermediate",
    durationHours: 16,
    days: 41,
    authenticityScore: 83,
    summary:
      "Sādhana of the Sudarśana Chakra — the discus of Viṣṇu, wielded as the instrument of protective dharma. Attested in the Ahirbudhnya Saṃhitā and the Sudarśana Kavaca tradition.",
    description:
      "The Sudarśana Chakra is the discus (chakra) of Viṣṇu, iconographically depicted as a serrated wheel with a flame-like edge, wielded as the instrument of dharma-protection and the dissolution of adversity. The sādhana of Sudarśana is a central protective practice of the Śrī Vaiṣṇava Pāñcarātra tradition. The primary textual attestation is the Ahirbudhnya Saṃhitā (a key Pāñcarātra text, c. 6th-9th century), in which the sage Ahirbudhnya instructs on the deployment of the Sudarśana mantra and yantra for the protection of dharma. The Sudarśana Kavaca (a protective hymn) is a related devotional form. Academic study: F. Otto Schrader, Introduction to the Pāñcarātra and the Ahirbudhnya Saṃhitā (1916); Sanjukta Gupta (developments in Pāñcarātra studies).",
    primaryMantra:
      "the Sudarśana mūla-mantra is attested in the Ahirbudhnya Saṃhitā; the operational form is dīkṣā-restricted. The Sudarśana aṣṭākṣara 'oṃ namaḥ nārāyaṇāya' is publicly recited.",
    benefits: [
      "Documents a major Śrī Vaiṣṇava protective practice with strong textual attestation",
      "Surfaces the Ahirbudhnya Saṃhitā as a primary Pāñcarātra source",
      "Connects to academic study by Schrader and Gupta",
    ],
    warnings: [
      "MODERATE CAUTION — protective Pāñcarātra practice",
      "The mūla-mantra is dīkṣā-restricted in published editions; the operational japa requires Ācārya transmission in the Śrī Vaiṣṇava tradition",
      "The Sudarśana homa (fire ritual) involves prescribed materials and should only be performed by trained Ācāryas",
    ],
    lineage:
      "Ahirbudhnya Saṃhitā (Pāñcarātra, c. 6th-9th c.) → Sudarśana Kavaca tradition → Śrī Vaiṣṇava Ācārya transmission → modern Pāñcarātra paddhatis. Academic: Schrader 1916, S. Gupta.",
    preSadhna: [
      { title: "Pāñcarātra Samāśrayaṇa", duration: "ceremony", detail: "The Śrī Vaiṣṇava initiation ceremony marks entry into the Pāñcarātra practice-stream. Without it, the mūla-mantra japa is held to be without effect." },
      { title: "Pañca-saṃskāra", duration: "ongoing", detail: "The five Śrī Vaiṣṇava sacraments (tapa, puṇḍra, nāma, mantra, ārādhana) are the precondition for sustained Sudarśana practice." },
    ],
    procedure: [
      { title: "Sudarśana Yantra", detail: "An eight-petalled lotus within a square bhūpura, with the Sudarśana bīja at the center and the 16-syllable Sudarśana mantra inscribed around. Described in the Ahirbudhnya Saṃhitā." },
      { title: "Mūla-mantra Japa", detail: "The mūla-mantra is attested in the Ahirbudhnya Saṃhitā; count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted. The public aṣṭākṣara 'oṃ namaḥ nārāyaṇāya' is recited as a preparatory form." },
      { title: "Sudarśana Kavaca Recitation", detail: "The Kavaca (protective hymn) is recited daily as a complement to the japa. The text is publicly available in Śrī Vaiṣṇava paddhatis." },
    ],
    faq: [
      { q: "Is Sudarśana worship the same as Viṣṇu worship?", a: "Sudarśana is the discus of Viṣṇu, approached as a distinct protective deity in the Pāñcarātra tradition. Theologically, Sudarśana is held to be the active, protective aspect of Viṣṇu himself. The Ahirbudhnya Saṃhitā treats the relationship extensively." },
      { q: "What is the Sudarśana homa?", a: "A prescribed fire-ritual described in the Ahirbudhnya Saṃhitā, performed by trained Śrī Vaiṣṇava Ācāryas for specific protective purposes. The archive does not document the homa's operational details." },
    ],
    yantra: {
      name: "Sudarśana Yantra",
      description: "A square bhūpura with four gates, enclosing a 16-petalled lotus, within which is an 8-petalled lotus, within which is the Sudarśana discus with 24 serrations and the central bīja hrauṁ. The 16-syllable Sudarśana mantra is inscribed around the periphery. Described in the Ahirbudhnya Saṃhitā.",
      symbolism: "The discus (cakra) is the active, protective aspect of Viṣṇu — the instrument of dharma-protection and the dissolution of adversity. The 24 serrations correspond to the 24 hours of the day and the unbroken vigilance of dharma. The 8-petalled lotus is the centre of operation; the 16-petalled lotus is the field of application.",
    },
  },
  {
    slug: "pratyangira-devi-sadhana",
    name: "Pratyaṅgirā Devī Sādhana",
    sanskrit: "प्रत्यङ्गिरा — The Atharvaṇa Protective Goddess",
    category: "Tantra",
    tradition: "Śākta (Atharvaṇa / Aghora)",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 70,
    summary:
      "Sādhana of Pratyaṅgirā Devī — the protective goddess of the Atharvaṇa tradition, invoked to neutralise hostile force. Attested in the Atharvānokta Pratyaṅgirā Vidhāna and Pratyaṅgirā Kalpa.",
    description:
      "Pratyaṅgirā Devī (also Atharvaṇa Bhadrakālī, Aghora Pratyaṅgirā, Nīla Sarasvatī in some recensions) is a protective goddess of the Śākta-Atharvaṇa tradition, invoked to neutralise hostile mantra, abhicāra, or spirit-affliction. Iconographically depicted as lion-faced or as a multi-armed fierce goddess seated on a lion, sometimes with the body of a human and the head of a lion (Narasiṃhī form). The primary textual attestations are the Atharvānokta Pratyaṅgirā Vidhāna, the Pratyaṅgirā Kalpa, and the Viprīta Pratyaṅgirā Vidhānam (Sanskrit manuscripts, Internet Archive). The academic monograph literature on Pratyaṅgirā specifically is thin; the broader context is covered by Hatley (Brahmayāmalatantra dissertation, 2007) and Sanderson's Śaiva work. The archive preserves the textual framing without reproducing dīkṣā-restricted mantras.",
    primaryMantra:
      "the mūla-mantra is attested in the Atharvānokta Pratyaṅgirā Vidhāna; the operational form is dīkṣā-restricted. The public form 'oṃ hrīṁ pratyaṅgirāyai namaḥ' is widely recited.",
    benefits: [
      "Documents a major Śākta-Atharvaṇa protective practice",
      "Surfaces the Internet Archive manuscripts as primary sources",
      "Fills a gap in the academic coverage of Śākta tantric protective deities",
    ],
    warnings: [
      "HIGH CAUTION — Atharvaṇa protective rite; traditionally requires dīkṣā",
      "The Pratyaṅgirā Vidhāna prescribes specific nyāsa, āvāhana, and bali preliminaries; without these the japa is held to be ineffective or destabilising",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "The academic literature specifically on Pratyaṅgirā is thin; readers should consult the Sanskrit manuscripts directly for primary attestation",
      "Not appropriate for practitioners without a Śākta-Atharvaṇa lineage grounding",
    ],
    lineage:
      "Atharvānokta Pratyaṅgirā Vidhāna → Pratyaṅgirā Kalpa → Viprīta Pratyaṅgirā Vidhānam (Sanskrit manuscripts, Internet Archive) → modern Śākta-Aghora paddhatis. Academic: Hatley 2007 (Brahmayāmalatantra, milieu coverage), Sanderson (general Śaiva-Śākta context).",
    preSadhna: [
      { title: "Purification & Bhūta-Śuddhi", duration: "3 nights", detail: "Dietary restraint, śauca, and the standard Aghora preliminaries: Agnī-jāla Rakṣā, tripuṇḍra, rakṣā-sūtra. The Pratyaṅgirā rite is preceded by the same protective framework as other Atharvaṇa operations." },
      { title: "Guru & Gaṇapati Pūjā", duration: "7 days", detail: "Standard Śākta preliminaries: guru-pūjā, gaṇeśa-pūjā, and invocation of the iṣṭa-devatā as protective mantle." },
    ],
    procedure: [
      { title: "Pratyaṅgirā Yantra", detail: "An eight-petalled lotus within a square bhūpura, with the Pratyaṅgirā bīja at the center. Construction details are described in the Pratyaṅgirā Kalpa and are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "The mūla-mantra is attested in the Atharvānokta Pratyaṅgirā Vidhāna; count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted. The public namaskāra 'oṃ hrīṁ pratyaṅgirāyai namaḥ' is widely recited." },
      { title: "Protective Application", detail: "Application is framed in the source texts as the neutralisation of hostile force, never as aggression. The Atharvānokta Pratyaṅgirā Vidhāna specifies the procedural constraints; the archive does not document the application specifics." },
    ],
    faq: [
      { q: "Is Pratyaṅgirā the same as Narasiṃhī?", a: "In some recensions Pratyaṅgirā is identified with Narasiṃhī (the lion-faced female counterpart of Narasiṃha), reflecting a Śākta-Vaiṣṇava syncretism. In other recensions she is a distinct Atharvaṇa deity. The iconographic overlap is real but the theological frameworks differ; consult the primary texts for the specific identification in each lineage." },
      { q: "Why is the academic literature thin?", a: "Pratyaṅgirā is a specialized Atharvaṇa-Śākta deity whose textual corpus has not received the same monographic attention as the Mahāvidyās. The Sanskrit manuscripts on Internet Archive are the strongest primary sources; the academic context is provided by Hatley and Sanderson's broader work on the Śaiva-Śākta milieu." },
    ],
  },
  {
    slug: "dhumavati-sadhana",
    name: "Dhūmāvatī Sādhana",
    sanskrit: "धूमावती — The Smoke-Clad Widow",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 79,
    summary:
      "The seventh Mahāvidyā, iconographically depicted as an aged, smoke-clad widow riding a crow, embodying inauspiciousness, decay, and the wisdom of all that is rejected. Attested in Dhūmāvatī Tantra and Śākta Praamoda.",
    description:
      "Dhūmāvatī is the seventh of the Daśa Mahāvidyās and the most deliberately inauspicious form of the Goddess. Iconographically depicted as an aged, ugly widow with smoky complexion, dressed in white (the color of widowhood in the Śākta cultural frame), riding a crow or a horseless chariot, holding a winnowing basket. She embodies the wisdom that arises through loss, decay, hunger, thirst, and the contemplative embrace of all that society rejects. Her sādhana is held to be among the most demanding of the Mahāvidyā practices because it requires the sādhaka to confront inauspiciousness directly rather than warding it off. The primary textual attestations are the Dhūmāvatī Tantra and the Śākta Praamoda digest; scholarly treatment in Kinsley (Hindu Goddesses, 1986; Tantric Visions of the Divine Feminine, 1997) and van Kooij (1972).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'dhūṃ dhūmāvatyai namaḥ'",
    benefits: [
      "Documents the most deliberately inauspicious Mahāvidyā form",
      "Surfaces the Śākta theology of wisdom-through-decay",
      "Connects to Kinsley's scholarly treatment of the Mahāvidyās",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The textual tradition warns that improper practice manifests the very inauspiciousness the goddess embodies",
      "The mūla-mantra is dīkṣā-restricted in the Śākta Praamoda and related editions",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Dhūmāvatī Tantra → Śākta Praamoda digest → modern Śākta paddhatis. Academic: Kinsley 1997, van Kooij 1972, Goudriaan & Gupta 1981.",
    preSadhna: [
      { title: "Iconographic Contemplation", duration: "ongoing", detail: "Study the dhyāna-śloka from the Dhūmāvatī Tantra before any japa. The iconography is the primary contemplative instrument — the widow, the crow, the winnowing basket, the smoky complexion." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śākta Praamoda paddhati." },
    ],
    procedure: [
      { title: "Yantra Installation", detail: "A square bhūpura with a winnowing-basket motif at the center, the Dhūmāvatī bīja inscribed. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "The count is 100,000 over 45 days per the Śākta Praamoda paddhati. The operational form is dīkṣā-restricted. The public bīja-frame 'dhūṃ dhūmāvatyai namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the aged, smoke-clad, crow-riding form. Recited before japa." },
    ],
    faq: [
      { q: "Why is Dhūmāvatī deliberately inauspicious?", a: "The Śākta theology (Kinsley 1997) frames Dhūmāvatī as the Goddess in her aspect of all-that-is-rejected — decay, hunger, widowhood, ugliness. Her sādhana is held to grant wisdom by direct confrontation with these aspects, rather than by warding them off. The inauspiciousness is the contemplative instrument, not a side-effect." },
      { q: "Why the crow vāhana?", a: "The crow (kāka) is associated with death, carrion, and liminal spaces in the Indic cultural frame. Its presence signals the chthonic, inauspicious register of the deity. See Kinsley 1997, ch. 6." },
    ],
    yantra: {
      name: "Dhūmāvatī Yantra",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus rendered in rose accent (the inauspicious register), within which is an asymmetric inverted triangle (the apex displaced, the top edge tilted — the alakṣmī form). The Dhūmāvatī bīja dhūṁ sits at the central bindu in rose accent. A small crow silhouette (the vāhana) hovers above the bindu. Described in the Dhūmāvatī Tantra and Śākta Praamoda.",
      symbolism: "The asymmetry of the triangle encodes the deliberate inauspiciousness — the Goddess in her aspect of all-that-is-rejected (decay, hunger, widowhood, ugliness). The crow is the vāhana of death and liminal spaces. The bindu is Dhūmāvatī herself, the wisdom that arises through direct confrontation with what society wards off.",
    },
  },
  {
    slug: "matangi-sadhana",
    name: "Mātaṅgī Sādhana (Ucchiṣṭa Caṇḍālinī)",
    sanskrit: "मातङ्गी — The Leftover Goddess",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 81,
    summary:
      "The tenth Mahāvidyā, in her Ucchiṣṭa Caṇḍālinī form — the goddess worshipped with leftover food, embodying the transgressive wisdom of the marginal. Attested in the Gandharva Tantra and Mātaṅgī Tantra.",
    description:
      "Mātaṅgī is the tenth of the Daśa Mahāvidyās, often identified with the outcaste (caṇḍālī) form of the Goddess. In her Ucchiṣṭa Caṇḍālinī form she is worshipped with ucchiṣṭa (leftover food), a deliberately transgressive offering that inverts the standard purity protocols of Vedic and Smārta worship. Iconographically depicted as dark or green-complexioned, four-armed, holding a sword, noose, goad, and club, sometimes seated on a corpse or on a lotus. Her sādhana is held to confer mastery over speech, music, and all forms of knowledge — including the marginalised knowledges excluded from the dominant tradition. The primary textual attestations are the Gandharva Tantra (Kak & Shastri 1934 ed.), the Mātaṅgī Tantra, and the Śākta Praamoda digest. Scholarly treatment in Kinsley (1997), White (Kiss of the Yoginī, 2003), and Goudriaan & Gupta (1981).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'oṃ hrīṁ aim̐ mātaṅgyai namaḥ'",
    benefits: [
      "Documents the transgressive Ucchiṣṭa Caṇḍālinī form of the Goddess",
      "Surfaces the Śākta theology of the marginal and the rejected",
      "Connects to academic work on Śākta transgressive practice (White, Kinsley)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The Ucchiṣṭa form involves deliberate inversion of purity protocols; the textual tradition warns against casual undertaking",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Gandharva Tantra (Kak & Shastri 1934 ed.) → Mātaṅgī Tantra → Śākta Praamoda → modern Śākta paddhatis. Academic: Kinsley 1997, White 2003, Goudriaan & Gupta 1981.",
    preSadhna: [
      { title: "Iconographic Study", duration: "ongoing", detail: "Study the Ucchiṣṭa Caṇḍālinī form in the Gandharva Tantra and Śākta Praamoda before any japa. The transgressive frame is the contemplative instrument." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā. The Mātaṅgī rite is preceded by the same protective framework as other Mahāvidyā operations." },
    ],
    procedure: [
      { title: "Yantra Installation", detail: "A square bhūpura with an inverted triangle at the center and the Mātaṅgī bīja. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 45 days. The operational form is dīkṣā-restricted. The public namaskāra 'oṃ hrīṁ aim̐ mātaṅgyai namaḥ' is attested in published digests." },
      { title: "Ucchiṣṭa Offering", detail: "The textual tradition prescribes offering of ucchiṣṭa (leftover food) as part of the rite. The procedural details are dīkṣā-restricted; the archive does not document them." },
    ],
    faq: [
      { q: "Why is leftover food offered to Mātaṅgī?", a: "The Ucchiṣṭa offering inverts the standard purity protocol (where offerings must be fresh and pure). The inversion signals that Mātaṅgī embodies the wisdom accessible through the marginalised, the rejected, and the leftover — including the ucchiṣṭa itself. The transgression is the contemplative instrument, not a casual subversion. See Kinsley 1997, ch. 8." },
      { q: "Why is Mātaṅgī associated with speech and music?", a: "In the Śākta framework, the transgressive wisdom Mātaṅgī embodies is held to confer mastery over all forms of expression — speech, music, art — including the marginalised oral/vernacular traditions excluded from the Vedic canon. The association is documented in the Gandharva Tantra and Śākta Praamoda." },
    ],
    yantra: {
      name: "Mātaṅgī Yantra (Ucchiṣṭa Caṇḍālinī)",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle with the Mātaṅgī bīja aim̐ at the central bindu. A small bowl-with-offering (the ucchiṣṭa motif) is rendered below the bindu, referencing the leftover-food offering that inverts the standard purity protocol. Described in the Gandharva Tantra and Śākta Praamoda.",
      symbolism: "The ucchiṣṭa-bowl motif is the contemplative instrument — the deliberate inversion of purity protocol signalling that Mātaṅgī embodies the wisdom accessible through the marginalised, the rejected, and the leftover. The bindu is Mātaṅgī herself, the outcaste Goddess who grants mastery over all forms of expression.",
    },
  },
  {
    slug: "tara-ugra-sadhana",
    name: "Tārā (Ugra) Sādhana",
    sanskrit: "उग्रतारा — The Fierce Hindu Tārā",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 83,
    summary:
      "The second Mahāvidyā, the Hindu Ugra Tārā form — distinct from Tibetan Green Tārā — depicted standing on a corpse in the cremation ground. Attested in the Bṛhad Nīla Tantra and the Tārā Tantra.",
    description:
      "Tārā is the second of the Daśa Mahāvidyās, and the Hindu form (Ugra Tārā, Ekajaṭā, Nīla-Sarasvatī) is distinct from the Tibetan Buddhist Green Tārā and White Tārā traditions. Iconographically depicted as dark-blue or black, fierce, standing in pratyālīḍha posture on a corpse (śava) in the cremation ground, wearing a garland of severed heads, holding a cleaver (kartari) and a skull-bowl (kapāla), with a single matted lock of hair (ekajaṭā). Her sādhana is held to confer protection, liberation, and the wisdom of the cremation-ground frame. The primary textual attestations are the Bṛhad Nīla Tantra (multiple Internet Archive editions: Kak & Shastri 1938, DLI/JaiGyan, Madhusudan Kaul Chaukhamba and DLI editions), the Tārā Tantra, and the Ekajaṭā Tārā Sādhana Tantra (Khandelwal 2001). Scholarly treatment in Kinsley (1997), Padoux (Vac, 1990), and Goudriaan & Gupta (1981).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'oṃ hrīṁ strīṁ hūṃ phaṭ'",
    benefits: [
      "Documents the Hindu Ugra Tārā form (distinct from the Tibetan traditions)",
      "Surfaces the Bṛhad Nīla Tantra as the primary textual witness",
      "Connects to academic work by Kinsley and Padoux",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The Hindu Ugra Tārā is a fierce cremation-ground form; the textual tradition warns against casual undertaking",
      "The mūla-mantra is dīkṣā-restricted in the Bṛhad Nīla Tantra editions",
      "Not appropriate for practitioners without a Śākta lineage grounding; not to be confused with the Tibetan Buddhist Tārā practices",
    ],
    lineage:
      "Bṛhad Nīla Tantra (multiple Internet Archive editions) → Tārā Tantra → Ekajaṭā Tārā Sādhana Tantra (Khandelwal 2001) → modern Śākta paddhatis. Academic: Kinsley 1997, Padoux 1990, Goudriaan & Gupta 1981.",
    preSadhna: [
      { title: "Iconographic Distinction", duration: "ongoing", detail: "Study the Hindu Ugra Tārā form in the Bṛhad Nīla Tantra before any japa. The form is distinct from the Tibetan Green/White Tārā traditions and must not be conflated with them." },
      { title: "Śmaśāna Preliminaries", duration: "3 nights", detail: "The Ugra Tārā rite is traditionally performed in a cremation ground (śmaśāna) setting. The textual tradition prescribes specific protective preliminaries; without these the japa is held to be ineffective or destabilising." },
    ],
    procedure: [
      { title: "Yantra Installation", detail: "A square bhūpura with an inverted triangle at the center, the Tārā bīja inscribed, surrounded by a garland of severed-head motifs. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 45 days per the Bṛhad Nīla Tantra. The operational form is dīkṣā-restricted. The public bīja-frame 'oṃ hrīṁ strīṁ hūṃ phaṭ' is attested in published editions." },
      { title: "Śava-āsana (Corpse-Seat)", detail: "The textual tradition prescribes seated-on-corpse (śava-āsana) or seated-in-cremation-ground postures. The procedural details are dīkṣā-restricted; the archive does not document them." },
    ],
    faq: [
      { q: "How is the Hindu Tārā different from the Tibetan Buddhist Tārā?", a: "The Hindu Ugra Tārā is a fierce, dark, corpse-standing Mahāvidyā form attested in the Bṛhad Nīla Tantra; her sādhana is held to confer protection and liberation through direct confrontation with the death-frame. The Tibetan Green Tārā and White Tārā are benevolent, lotus-seated forms in the Avalokiteśvara cycle, with different iconography, mantras, and theological frameworks. The two traditions share a name and probably an iconographic root but diverged centuries ago. See Kinsley 1997, ch. 4." },
      { q: "Why is she called Ekajaṭā?", a: "Ekajaṭā ('single-locked') refers to the single matted lock of hair that is one of her iconographic marks. The name is attested in both the Bṛhad Nīla Tantra and the Ekajaṭā Tārā Sādhana Tantra (Khandelwal 2001)." },
    ],
    yantra: {
      name: "Tārā (Ugra) Yantra",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle containing a small śava (corpse) silhouette — the corpse-seat that distinguishes Ugra Tārā from Dakṣiṇa Kālī. The Tārā bīja-strīṁ sits at the central bindu. A garland of twelve severed-head ovals rings the triangle's perimeter. Described in the Bṛhad Nīla Tantra and Tārā Tantra.",
      symbolism: "The corpse within the triangle is the Śava-āsana (corpse-seat) — the contemplative frame of the death-state, distinguishing the Hindu Ugra Tārā from the Tibetan Buddhist Tārā traditions. The severed-head garland is the muṇḍamālā, the dissolution of differentiated identity. The bindu is Ugra Tārā herself, the fierce protective form of the Goddess.",
    },
  },
  {
    slug: "tripura-bhairavi-sadhana",
    name: "Tripura Bhairavī Sādhana",
    sanskrit: "त्रिपुरभैरवी — The Fierce Form of Tripurasundarī",
    category: "Tantra",
    tradition: "Śrī Vidyā (Śākta)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 84,
    summary:
      "The sixth Mahāvidyā, the fierce form of Tripurasundarī in the Śrī Vidyā canon. Attested in Śāradā Tilaka ch. 11 and the Paraśurāma Kalpasūtra.",
    description:
      "Tripura Bhairavī is the sixth of the Daśa Mahāvidyās and the fierce (bhairavī) form of Tripurasundarī within the Śrī Vidyā canon. Iconographically depicted as red-complexioned, four-armed, holding a rosary (mālā) and a book (pustaka) in two hands, with the other two hands in varada and abhaya mudrās, seated on a lotus. She embodies the fierce aspect of the Śrī Vidyā Goddess — the Kundalinī-force in its awakened, ascendant mode. Her sādhana is held to be the natural progression from the gentle Bālā Tripurasundarī practice: it works with the same Śrī Vidyā mantra-framework but in its fierce, transformative register. The primary textual attestations are the Śāradā Tilaka (chapter 11, with multiple Internet Archive editions of the Sanskrit text and Avalon's 1933 PDF), the Paraśurāma Kalpasūtra (4 Internet Archive editions), and the Tripura Bhairavī Rahasya digest. Scholarly treatment in Padoux (Vac, 1990), Brooks (Auspicious Wisdom, 1990), and S.K. Ramachandra Rao (1998).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'aim̐ hrīṁ srīṁ tripura bhairavyai namaḥ'",
    benefits: [
      "Documents the fierce form of the Śrī Vidyā Goddess",
      "Surfaces Śāradā Tilaka ch. 11 as the primary textual witness (with multiple Internet Archive editions)",
      "Connects to academic work by Padoux, Brooks, and Ramachandra Rao",
    ],
    warnings: [
      "HIGH CAUTION — advanced Śrī Vidyā practice; traditionally requires dīkṣā",
      "The fierce form is held to require precise pronunciation and stable psychological grounding; the source texts warn that incorrect japa is destabilising rather than merely ineffective",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śrī Vidyā lineage holder",
    ],
    lineage:
      "Śāradā Tilaka ch. 11 (multiple Internet Archive editions) → Paraśurāma Kalpasūtra (4 Internet Archive editions) → Tripura Bhairavī Rahasya → modern Śrī Vidyā paddhatis. Academic: Padoux 1990, Brooks 1990, S.K. Ramachandra Rao 1998.",
    preSadhna: [
      { title: "Bālā Tripurasundarī Preliminary", duration: "completed", detail: "Tripura Bhairavī sādhana is traditionally undertaken only after sustained Bālā Tripurasundarī practice. The fierce form presupposes the gentle foundation." },
      { title: "Guru-Pūjā & Śrī Cakra Darśana", duration: "ongoing", detail: "Standard Śrī Vidyā preliminaries: the sādhaka approaches the Śrī Cakra as the geometric body of the Goddess, with the guru as the transmitting link." },
    ],
    procedure: [
      { title: "Tripura Bhairavī Yantra", detail: "A Śrī Cakra variant specific to the fierce form, described in Śāradā Tilaka ch. 11. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is 100,000 over 45 days per the Śāradā Tilaka paddhati. The operational form is dīkṣā-restricted. The public bīja-frame 'aim̐ hrīṁ srīṁ tripura bhairavyai namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the red, four-armed form seated on a lotus, holding mālā and pustaka. Recited before japa." },
    ],
    faq: [
      { q: "How is Tripura Bhairavī different from Tripurasundarī?", a: "Tripurasundarī is the gentle (saumya) form of the Goddess in the Śrī Vidyā canon; Tripura Bhairavī is her fierce (ugra) form. Theologically they are two aspects of the same Goddess — the gentle and the transformative — and the Śrī Vidyā tradition treats them as a graduated path, with Bālā as the entry, Tripurasundarī as the full practice, and Tripura Bhairavī as the fierce culmination. See Padoux 1990, Brooks 1990." },
      { q: "Why is the Bālā practice a prerequisite?", a: "The Śrī Vidyā tradition holds that the fierce form requires the contemplative stability established by sustained gentle-form practice. Without that foundation, the fierce-form japa is held to be destabilising rather than transformative. The progression is documented in the Paraśurāma Kalpasūtra." },
    ],
    yantra: {
      name: "Tripura Bhairavī Yantra",
      description: "A square bhūpura with four gates, enclosing a 16-petalled lotus and an 8-petalled lotus, within which is the sadbhūja-cakra (six-triangle interlock) — three upward Śiva triangles and three downward Śakti triangles, simplified from the full nine-triangle Śrī Cakra. The bindu region uses a red-tinted (rose-gold mix) accent to signal the fierce aspect. The Tripura Bhairavī bīja aim̐ hrīṁ srīṁ sits at the central bindu. Described in the Śāradā Tilaka ch. 11 and Paraśurāma Kalpasūtra.",
      symbolism: "The sadbhūja-cakra (six-triangle interlock) is the fierce-form variant of the Śrī Cakra — the same Śiva-Śakti interplay in its transformative, Kundalinī-awakened register. The red-tinted bindu signals the awakened ascendant mode of the Goddess. The bindu is Tripura Bhairavī herself, the fierce culmination of the Śrī Vidyā graduated path.",
    },
  },
  {
    slug: "smasana-bhairavi-sadhana",
    name: "Smāśāna Bhairavī Sādhana",
    sanskrit: "श्मशानभैरवी — The Cremation-Ground Goddess",
    category: "Tantra",
    tradition: "Śaiva-Śākta (Bhairavī strand)",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 80,
    summary:
      "Sādhana of Smāśāna Bhairavī — the cremation-ground form of the Goddess in the Bhairavī strand of Śaiva-Śākta tantra. Attested in the Brahmayāmala Tantra and the Jayadrathayāmala.",
    description:
      "Smāśāna Bhairavī is the cremation-ground (śmaśāna) form of the Goddess in the Bhairavī strand of Śaiva-Śākta tantra. Iconographically depicted as fierce, dark-red or black, seated on a corpse in the cremation ground, wearing a garland of skulls, holding a cleaver and a skull-bowl, surrounded by jackals and the iconography of the śmaśāna. Her sādhana is performed in the cremation ground itself and is held to confer the wisdom of the death-frame, the dissolution of ego-identity, and the protective mantle of the Goddess in her most liminal aspect. The primary textual attestations are the Brahmayāmala Tantra (with Hatley's 2018 critical edition and 2007 PhD thesis providing the scholarly apparatus) and the Jayadrathayāmala. Scholarly treatment in Hatley (2007, 2018), Sanderson (1988, Śaiva Exegesis), and Csaba Kiss's journal articles.",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'oṃ hrīṁ hūṃ smāśāna bhairavyai namaḥ'",
    benefits: [
      "Documents the cremation-ground form of the Bhairavī strand",
      "Surfaces the Brahmayāmala Tantra as the primary textual witness (with Hatley's critical edition)",
      "Connects to substantial academic work by Hatley, Sanderson, and Kiss",
    ],
    warnings: [
      "HIGH CAUTION — cremation-ground Śākta practice; traditionally requires dīkṣā",
      "The textual tradition explicitly requires the śmaśāna setting; without proper preliminaries and supervision the rite is held to be psychologically destabilising",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śaiva-Śākta lineage grounding and direct supervision",
    ],
    lineage:
      "Brahmayāmala Tantra (Hatley 2018 critical edition) → Jayadrathayāmala → modern Śaiva-Śākta paddhatis. Academic: Hatley 2007 (PhD thesis), Hatley 2018 (critical edition), Sanderson 1988, Csaba Kiss journal articles.",
    preSadhna: [
      { title: "Protective Mantle", duration: "3 nights", detail: "The Brahmayāmala prescribes a multi-night protective framework before any śmaśāna work: bhūta-śuddhi, nyāsa, and the invocation of Bhairava as protective mantle." },
      { title: "Cremation-Ground Selection", duration: "—", detail: "The textual tradition specifies the type of cremation ground (active, with specific directional orientation). The sādhaka does not undertake the rite alone; the textual tradition requires a guru or senior sādhaka present." },
    ],
    procedure: [
      { title: "Śmaśāna Yantra", detail: "A square bhūpura with skull-garland motifs and the Smāśāna Bhairavī bīja at the center, drawn on a copper plate or directly on the cremation-ground ground. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 41 nights, performed in the śmaśāna. The operational form is dīkṣā-restricted. The public bīja-frame 'oṃ hrīṁ hūṃ smāśāna bhairavyai namaḥ' is attested in published digests." },
      { title: "Offerings", detail: "The Brahmayāmala prescribes specific offerings (bali) appropriate to the śmaśāna frame. The procedural details are dīkṣā-restricted; the archive does not document them." },
    ],
    faq: [
      { q: "Why is the śmaśāna the prescribed setting?", a: "In the Śaiva-Śākta framework, the cremation ground is the liminal space where the dissolution of form is most directly visible. Performing the rite in this setting is held to support the contemplative dissolution of ego-identity that the sādhana works with. The textual tradition is explicit that the setting is part of the practice, not incidental. See Hatley 2018, introduction." },
      { q: "How does Smāśāna Bhairavī relate to Kālī?", a: "Both are fierce cremation-ground Goddess forms, but they belong to distinct textual lineages. Smāśāna Bhairavī is the Bhairavī strand of the Śaiva-Śākta canon (Brahmayāmala, Jayadrathayāmala), while Kālī is the central Mahāvidyā with her own textual corpus. The iconographic overlap (corpse-seat, skull-garland, cleaver-and-kapāla) reflects the shared śmaśāna milieu. See Sanderson 1988." },
    ],
    yantra: {
      name: "Smāśāna Bhairavī Yantra",
      description: "A square bhūpura in rose accent (the only yantra with rose-tinted gates, signalling the cremation-ground register), enclosing scattered skull-with-crossbones motifs around a central inverted yoni-triangle. Three nested funeral-pyre flame shapes rise above the triangle. The Smāśāna Bhairavī bīja hrīṁ hūṃ sits at the central bindu. Described in the Brahmayāmala Tantra and Jayadrathayāmala.",
      symbolism: "The rose-tinted bhūpura is the śmaśāna (cremation ground) itself — the liminal space where the dissolution of form is most directly visible. The skull-and-crossbones motifs are the death-field iconography. The funeral-pyre flames are the transformative aspect. The bindu is Smāśāna Bhairavī herself, the Goddess in her most liminal aspect — the wisdom of the death-frame.",
    },
  },
  {
    slug: "guhyakali-sadhana",
    name: "Guhyakālī Sādhana",
    sanskrit: "गुह्यकाली — The Secret Kālī",
    category: "Tantra",
    tradition: "Śākta-Kālī (Mahākāla Saṃhitā)",
    level: "Advanced",
    durationHours: 24,
    days: 60,
    authenticityScore: 82,
    summary:
      "Sādhana of Guhyakālī — the 'Secret Kālī' in her 64-fold form, iconographically depicted with ten arms and fifty heads. Attested in the Guhyakālī Tantra and the Mahākāla Saṃhitā Guhyakālī Khaṇḍa.",
    description:
      "Guhyakālī ('the Secret Kālī') is a complex, multi-form manifestation of the Goddess Kālī, iconographically depicted with ten arms and fifty heads (the fifty heads representing the fifty letters of the Sanskrit alphabet, the mātṛkā). She is the central deity of the Mahākāla Saṃhitā's Guhyakālī Khaṇḍa, a substantial Śākta-Kālī scripture preserved in multiple Internet Archive editions (Gopinath Allahabad Block / IGNCA 69227, DLI 552568, Kishor Nath Jha RSS Part 2, Radheshyam Chaturvedi Parts 1 & 3, Ganganath Jha Campus) and in a printed Chaukhamba Surbharati 2-volume edition (917 pages). The sādhana is held to be among the most elaborate in the Śākta-Kālī canon, working with the 64-fold form of the Goddess and the mantras of the Kālī-gaṇa. Scholarly treatment in Goudriaan & Gupta (1981), White (2003), and McDermott (2001, on the Kālī tradition).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'oṃ hrīṁ klīṁ hūṃ guhyakālyai namaḥ'",
    benefits: [
      "Documents one of the most elaborate Śākta-Kālī sādhanas",
      "Surfaces the Mahākāla Saṃhitā Guhyakālī Khaṇḍa as the primary textual witness (with 6+ Internet Archive editions)",
      "Connects to academic work on the Kālī tradition (White, McDermott, Goudriaan-Gupta)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Śākta-Kālī practice; traditionally requires dīkṣā",
      "The 64-fold form is held to require sustained prior Kālī practice and a stable contemplative foundation",
      "The mūla-mantra is dīkṣā-restricted in all published editions",
      "The 'secret' (guhya) framing is not marketing — the textual tradition explicitly restricts the operational details to dīkṣā recipients",
      "Not appropriate for practitioners without a Śākta-Kālī lineage grounding",
    ],
    lineage:
      "Guhyakālī Tantra → Mahākāla Saṃhitā Guhyakālī Khaṇḍa (6+ Internet Archive editions + Chaukhamba Surbharati 2-vol. printed edition) → modern Śākta-Kālī paddhatis. Academic: Goudriaan & Gupta 1981, White 2003, McDermott 2001.",
    preSadhna: [
      { title: "Prior Kālī Foundation", duration: "completed", detail: "The Guhyakālī rite is traditionally undertaken only after sustained foundational Kālī practice (Dakṣiṇa Kālī, then Tārā, then Bhadrakālī). The 64-fold form presupposes the simpler foundation." },
      { title: "Mahākāla Preliminaries", duration: "7 days", detail: "The Mahākāla Saṃhitā prescribes preliminaries specific to the Guhyakālī Khaṇḍa, including the invocation of Mahākāla as the Goddess's consort and protective mantle." },
    ],
    procedure: [
      { title: "Guhyakālī Yantra", detail: "An elaborate multi-ring yantra described in the Mahākāla Saṃhitā Guhyakālī Khaṇḍa, with fifty-letter inscriptions (the mātṛkā), the ten bījas of the ten arms, and the Guhyakālī mūla-mantra at the bindu. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 60 days per the Mahākāla Saṃhitā. The operational form is dīkṣā-restricted. The public bīja-frame 'oṃ hrīṁ klīṁ hūṃ guhyakālyai namaḥ' is attested in published digests." },
      { title: "64-Fold Formulation", detail: "The textual tradition works with the 64 forms of the Goddess as a structured cycle. The specific formulation is dīkṣā-restricted; the archive does not document it." },
    ],
    faq: [
      { q: "Why is she called Guhya ('Secret') Kālī?", a: "The 'secret' framing in the Mahākāla Saṃhitā is not a marketing label but a textual restriction: the operational details of the sādhana — the specific 64-fold formulation, the per-arm bījas, the mūla-mantra — are explicitly restricted to dīkṣā recipients. The restriction is preserved in the printed editions' front-matter." },
      { q: "What do the fifty heads represent?", a: "The fifty heads iconographically represent the fifty letters of the Sanskrit alphabet (the mātṛkā or varṇa-mālā). The theological reading (Goudriaan & Gupta 1981) is that Guhyakālī embodies the Goddess as the source of all sound and form — the sonic matrix from which manifestation arises. The ten arms represent the ten directional and operational aspects of her power." },
    ],
    yantra: {
      name: "Guhyakālī Yantra",
      description: "The most elaborate Śākta-Kālī yantra: a square bhūpura with four gates, enclosing a 16-petalled lotus, an 8-petalled lotus, an 8-segment directional circle (aṣṭa-dik-mātṛkā with 8 bījas: aiṁ, hrīṁ, klīṁ, hūṁ, phaṭ, vauṁ, sauḥ, srīṁ), a 10-pointed star (daśa-bhuja-cakra, the ten arms), and a 50-dot pañcāśad-akṣara-mālā (the fifty-letter garland) around the central bindu. The Guhyakālī bīja hrīṁ klīṁ hūṃ sits at the bindu. Described in the Mahākāla Saṃhitā Guhyakālī Khaṇḍa.",
      symbolism: "The 8-segment circle is the aṣṭa-dik-mātṛkā — the Goddess in her eight directional forms. The 10-pointed star is the daśa-bhuja (ten-armed) form, the operational power of the Goddess in all directions. The 50-dot garland is the mātṛkā (the fifty letters of the Sanskrit alphabet), the sonic matrix from which manifestation arises. The bindu is Guhyakālī herself — the secret Kālī, the Goddess as the source of all sound and form.",
    },
  },
  {
    slug: "dakshina-kali-sadhana",
    name: "Dakṣiṇa Kālī Sādhana",
    sanskrit: "दक्षिणकाली — The Benevolent Fierce Form",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā — first)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 88,
    summary:
      "The primary Mahāvidyā form of Kālī — the first of the ten Mahāvidyās, iconographically depicted standing on Śiva, four-armed, holding a cleaver and a severed head, wearing a garland of severed heads and a skirt of severed arms. Attested in the Karpūrādi Stotra, Kālī Tantra, Todala Tantra.",
    description:
      "Dakṣiṇa Kālī is the primary and most widely worshipped form of the Goddess Kālī — the first of the Daśa Mahāvidyās. The name 'Dakṣiṇa' refers to her benevolent aspect toward her devotees despite her fierce iconography: she stands on the recumbent body of Śiva (the passive consciousness), four-armed, holding a curved cleaver (kartari) and a severed head (muṇḍa) in her upper hands, with her lower hands in varada (boon-granting) and abhaya (fearlessness) mudrās. She wears a garland of fifty severed heads (the mātṛkā, the fifty letters of the Sanskrit alphabet) and a skirt of severed arms. Her sādhana is the foundational Kālī practice from which the more elaborate forms (Smāśāna Kālī, Guhyakālī, Bhadrakālī) develop. The primary textual attestations are the Karpūrādi Stotra (with Vimalānanda's commentary in Woodroffe's Tantric Texts Series 9, 1953), the Kālī Tantra (Mālavīya Chowkhamba and Dīkṣit editions), the Todala Tantra, and the Mahānirvāṇa Tantra (Avalon 1913). Scholarly treatment in Kinsley (1997), Goudriaan & Gupta (1981), White (Kiss of the Yoginī, 2003), and McDermott (2001).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'oṃ krīṁ hrīṁ hūṃ dakṣiṇa kālike namaḥ'",
    benefits: [
      "Documents the primary and most foundational Kālī sādhana",
      "Surfaces the Karpūrādi Stotra and Kālī Tantra as primary textual witnesses",
      "Connects to substantial academic literature (Kinsley, White, McDermott)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The Kālī Tantra prescribes specific nyāsa, āvāhana, and protective preliminaries; without these the japa is held to be ineffective or destabilising",
      "The mūla-mantra is dīkṣā-restricted in all published editions",
      "Not appropriate for practitioners without a Śākta-Kālī lineage grounding",
    ],
    lineage:
      "Karpūrādi Stotra (with Vimalānanda commentary, Woodroffe TTS 9, 1953) → Kālī Tantra (Mālavīya Chowkhamba + Dīkṣit editions) → Todala Tantra → Mahānirvāṇa Tantra (Avalon 1913) → modern Śākta paddhatis. Academic: Kinsley 1997, Goudriaan & Gupta 1981, White 2003, McDermott 2001.",
    preSadhna: [
      { title: "Iconographic Contemplation", duration: "ongoing", detail: "Study the dhyāna-śloka from the Karpūrādi Stotra before any japa. The iconography — Śiva underfoot, the four arms, the garland of fifty heads — is the primary contemplative instrument." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Kālī Tantra paddhati. The Kālī rite is preceded by the same protective framework as other Mahāvidyā operations." },
    ],
    procedure: [
      { title: "Dakṣiṇa Kālī Yantra", detail: "A square bhūpura with an inverted triangle at the center, the Kālī bīja (krīṁ) inscribed at the bindu, surrounded by a garland of severed-head motifs. Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 45 days per the Kālī Tantra. The operational form is dīkṣā-restricted. The public bīja-frame 'oṃ krīṁ hrīṁ hūṃ dakṣiṇa kālike namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka from the Karpūrādi Stotra describes the four-armed form standing on Śiva, with the garland of fifty heads and the skirt of arms. Recited before japa." },
    ],
    faq: [
      { q: "Why does Kālī stand on Śiva?", a: "The iconographic motif (Kinsley 1997, ch. 2; McDermott 2001) is read as the activation of consciousness (Śiva) by the dynamic power (Śakti-Kālī). Śiva is the passive witnessing awareness; Kālī is the active, transformative power. Theologically, she is held to be the dynamic aspect of the same non-dual reality Śiva embodies." },
      { q: "Why the garland of fifty severed heads?", a: "The fifty heads represent the fifty letters of the Sanskrit alphabet (the mātṛkā or varṇa-mālā). The theological reading (Goudriaan & Gupta 1981) is that Kālī embodies the sonic matrix from which manifestation arises — and the severing of the heads symbolises the dissolution of differentiated sound back into silence." },
      { q: "How is Dakṣiṇa Kālī different from Guhyakālī?", a: "Dakṣiṇa Kālī is the primary, four-armed, benevolent-toward-devotees form; Guhyakālī is the multi-form (ten-armed, fifty-headed) 'secret' form attested in the Mahākāla Saṃhitā. Dakṣiṇa Kālī is the foundation; Guhyakālī is the elaborate culmination. The two are related but distinct textual lineages." },
    ],
    yantra: {
      name: "Dakṣiṇa Kālī Yantra",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle containing three horizontal tripuṇḍra lines (Śiva's forehead mark). The Kālī bīja krīṁ sits at the central bindu. A 15-skull muṇḍamālā (garland of skulls) rings the triangle's perimeter, encoding the dissolution of the fifty letters of the Sanskrit alphabet.",
      symbolism: "The inverted triangle is the yoni (the matrix of manifestation). The tripuṇḍra within signals Śiva's presence as the passive consciousness beneath Kālī's active power. The skull-garland encodes the sonic matrix from which manifestation arises — and its dissolution back into silence.",
    },
  },
  {
    slug: "shodashi-tripurasundari-sadhana",
    name: "Ṣoḍaśī / Tripurasundarī Sādhana",
    sanskrit: "षोडशी — The Sixteen-Year-Old Goddess",
    category: "Tantra",
    tradition: "Śrī Vidyā (Śākta)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 90,
    summary:
      "The full pañcadaśākṣarī (15-syllable) sādhana of Tripurasundarī — the beautiful sixteen-year-old form of the Goddess, the central deity of Śrī Vidyā. Attested in the Vāmakeśvara Tantra, Bhāvanā Upaniṣad, Paraśurāma Kalpasūtra.",
    description:
      "Ṣoḍaśī (literally 'the sixteenth') is the full form of Tripurasundarī, the beautiful sixteen-year-old form of the Goddess, central deity of the Śrī Vidyā tradition. Iconographically depicted as sixteen years old, red-complexioned, four-armed, holding a noose, a goad, a sugarcane bow, and five flower-arrows, seated on a lotus that rests on the recumbent body of Śiva which rests on the Śrī Cakra. Her sādhana uses the pañcadaśākṣarī (15-syllable) mantra — distinct from the Bālā (3-syllable) form which is the entry-level practice, and from the Mahā-Ṣoḍaśī (16-syllable) which is the culminating form. The primary textual attestations are the Vāmakeśvara Tantra / Nityāṣoḍaśikārṇava (6 Internet Archive editions including Anandāśrama 56, Sampurnanand 1985, Vāmakeśvarī Mātam with Jayaratha's Vivaraṇa translated by Sampath Sharma), the Bhāvanā Upaniṣad, the Paraśurāma Kalpasūtra (4 editions), and the Lalitā Sahasranāma with Bhāskararāya's Saubhāgya-Bhāskara commentary (Adyar 1925). Scholarly treatment in Padoux (Vac, 1990), Brooks (Auspicious Wisdom, 1990), S.K. Ramachandra Rao (1998), and Madhu Khanna (Yantra, 1979).",
    primaryMantra:
      "the pañcadaśākṣarī (15-syllable) is dīkṣā-restricted in all published editions; the operational form is never written down and is given orally in dīkṣā",
    benefits: [
      "Documents the central sādhana of the Śrī Vidyā canon",
      "Surfaces the Vāmakeśvara Tantra and Paraśurāma Kalpasūtra as primary textual witnesses (with 6+ Internet Archive editions)",
      "Connects to substantial academic literature (Padoux, Brooks, Rao, Khanna)",
    ],
    warnings: [
      "HIGH CAUTION — advanced Śrī Vidyā practice; traditionally requires dīkṣā",
      "The pañcadaśākṣarī is held to require precise pronunciation and stable contemplative grounding; the source texts warn that incorrect japa is destabilising rather than merely ineffective",
      "The mūla-mantra is dīkṣā-restricted in all published editions — it is given orally and never written down",
      "The Bālā Tripurasundarī sādhana is traditionally the prerequisite; without that foundation, Ṣoḍaśī practice is held to be premature",
      "Not appropriate for practitioners without a Śrī Vidyā lineage holder",
    ],
    lineage:
      "Vāmakeśvara Tantra / Nityāṣoḍaśikārṇava (6 Internet Archive editions) → Bhāvanā Upaniṣad → Paraśurāma Kalpasūtra (4 Internet Archive editions) + Rāmeśvara Sūtri commentary → Lalitā Sahasranāma + Bhāskararāya's Saubhāgya-Bhāskara (Adyar 1925) → modern Śrī Vidyā paddhatis. Academic: Padoux 1990, Brooks 1990, S.K. Ramachandra Rao 1998, Madhu Khanna 1979.",
    preSadhna: [
      { title: "Bālā Tripurasundarī Foundation", duration: "completed", detail: "Ṣoḍaśī sādhana is traditionally undertaken only after sustained Bālā practice (typically 1-3 years). The 15-syllable form presupposes the contemplative stability established by the 3-syllable foundation." },
      { title: "Guru-Pūjā & Śrī Cakra Darśana", duration: "ongoing", detail: "Standard Śrī Vidyā preliminaries: the sādhaka approaches the Śrī Cakra as the geometric body of the Goddess, with the guru as the transmitting link. The Śrī Cakra is held to be the yantra-form of Ṣoḍaśī herself." },
    ],
    procedure: [
      { title: "Śrī Cakra Worship", detail: "The Śrī Cakra is the operating yantra of Ṣoḍaśī — the nine-interlocking-triangles maṇḍala with the central bindu. Navāvaraṇa pūjā (nine-enclosure worship) is the standard form. Construction and worship details are dīkṣā-restricted." },
      { title: "Pañcadaśākṣarī Japa", detail: "Count is typically 100,000 over 45 days per the Vāmakeśvara Tantra. The 15-syllable mantra is dīkṣā-restricted and given orally. The public bīja-frame 'aim̐ hrīṁ srīṁ' (the three seed-syllables) is attested in published digests but the full 15-syllable form is not." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the sixteen-year-old form, red-complexioned, four-armed, holding noose, goad, sugarcane bow, and five flower-arrows, seated on Śiva on the Śrī Cakra. Recited before japa." },
    ],
    faq: [
      { q: "What is the difference between Bālā, Ṣoḍaśī, and Mahā-Ṣoḍaśī?", a: "Bālā uses a 3-syllable bīja-mantra and is the entry-level practice (the girl-form). Ṣoḍaśī uses the full 15-syllable pañcadaśākṣarī and is the central practice (the sixteen-year-old form). Mahā-Ṣoḍaśī adds a 16th syllable (the 'śrīṁ' bīja) to the pañcadaśī and is the culminating practice given only to advanced sādhakas. The progression is documented in the Paraśurāma Kalpasūtra and its commentaries." },
      { q: "Why is Ṣoḍaśī called 'the sixteenth'?", a: "The name refers to the Goddess as the 'sixteenth' — beyond the fifteen syllables of the pañcadaśī, she is the silence (the bindu) that contains and transcends them. The theological reading (Padoux 1990) is that the sixteenth is the turīya (the fourth state) of the Śrī Vidyā mantra framework." },
      { q: "Why is the Śrī Cakra her yantra?", a: "The Śrī Cakra (also called Śrī Yantra) is the geometric body of the Goddess in the Śrī Vidyā tradition. Its nine interlocking triangles (four upward for Śiva, five downward for Śakti) meet at the central bindu, which is Ṣoḍaśī herself. Navāvaraṇa pūjā (worshipping through the nine enclosures) is held to be the worship of Ṣoḍaśī in her full form. See Brooks 1990, Khanna 1979." },
    ],
    yantra: {
      name: "Śrī Cakra (Śrī Yantra)",
      description: "The most iconic tantric yantra: a square bhūpura with four gates, enclosing three concentric circles, a 16-petalled lotus, an 8-petalled lotus, and nine interlocking triangles (navayoni) — four upward (Śiva) and five downward (Śakti) — whose intersections form 43 smaller triangles converging on the central bindu. Described in the Vāmakeśvara Tantra and the Bhāvanā Upaniṣad.",
      symbolism: "The nine triangles are the cosmic matrix: Śiva (upward) and Śakti (downward) interlocking to produce the 43-fold field of manifestation. The 16- and 8-petalled lotuses are the petals of creation and dissolution. The central bindu is Ṣoḍaśī herself — the unmanifest source from which all form arises and into which all form dissolves.",
    },
  },
  {
    slug: "bhuvaneshvari-sadhana",
    name: "Bhuvaneśvarī Sādhana",
    sanskrit: "भुवनेश्वरी — Queen of the Universe",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā — fourth)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 85,
    summary:
      "The fourth Mahāvidyā, the 'Queen of the Universe' form of the Goddess — three-eyed, four-armed, holding a noose and a goad, seated on a throne. Attested in Śāradā Tilaka, Bhuvaneśvarī Tantra, and the Rudrayāmala.",
    description:
      "Bhuvaneśvarī is the fourth of the Daśa Mahāvidyās, whose name means 'Queen (Īśvarī) of the World (Bhuvana)'. Iconographically depicted as fair-complexioned, three-eyed, four-armed, holding a noose (pāśa) and a goad (aṅkuśa) in two hands, with the other two hands in varada and abhaya mudrās, seated on a jewelled throne. She embodies the Goddess as the sovereign creator-sustainer of all the worlds (the fourteen bhuvanas of the Indic cosmological framework). Her sādhana is held to confer sovereignty, creative power, and the vision of the world as her manifestation. The primary textual attestations are the Śāradā Tilaka (4 Internet Archive editions: Malaviya, Avalon 1933, DLI, Sri Satguru 1988), the Bhuvaneśvarī Tantra (in Dīkṣit's paired Chinnamastā evam Bhuvaneśvarī Tantra Śāstra edition), the Bhuvaneśvarī Aṣṭakam of the Rudrayāmala, and the Tantradarśana evam Bhuvaneśvarī Sādhana (Ashok Kumar Rakesh). The Śākta Praamoda also contains her paddhati. Scholarly treatment in Kinsley (1997), Goudriaan & Gupta (1981), and Bisschop (2006).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'hrīṁ bhuvaneśvaryai namaḥ'",
    benefits: [
      "Documents the fourth Mahāvidyā — the sovereign creative form of the Goddess",
      "Surfaces the Śāradā Tilaka and Bhuvaneśvarī Tantra as primary textual witnesses (with multiple Internet Archive editions)",
      "Connects to academic work by Kinsley, Goudriaan-Gupta, and Bisschop",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Śāradā Tilaka (4 Internet Archive editions) → Bhuvaneśvarī Tantra (Dīkṣit edition) → Rudrayāmala (Bhuvaneśvarī Aṣṭakam) → Tantradarśana evam Bhuvaneśvarī Sādhana (Rakesh) → Śākta Praamoda → modern Śākta paddhatis. Academic: Kinsley 1997, Goudriaan & Gupta 1981, Bisschop 2006.",
    preSadhna: [
      { title: "Iconographic Contemplation", duration: "ongoing", detail: "Study the dhyāna-śloka from the Śāradā Tilaka before any japa. The iconography — three-eyed, four-armed, noose and goad, jewelled throne — is the primary contemplative instrument." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śāradā Tilaka paddhati." },
    ],
    procedure: [
      { title: "Bhuvaneśvarī Yantra", detail: "A square bhūpura with a 16-petalled lotus inside, within which is an 8-petalled lotus, within which is an inverted triangle with the Bhuvaneśvarī bīja (hrīṁ) at the bindu. Construction details are dīkṣā-restricted; the public form is documented in Śākta Praamoda." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 45 days per the Śāradā Tilaka paddhati. The operational form is dīkṣā-restricted. The public bīja-frame 'hrīṁ bhuvaneśvaryai namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the fair, three-eyed, four-armed form on the jewelled throne. Recited before japa." },
    ],
    faq: [
      { q: "What are the fourteen bhuvanas she rules?", a: "The Indic cosmological framework (attested in the Viṣṇu Purāṇa and the Śāradā Tilaka) enumerates fourteen worlds: seven upper (including earth, bhuvar, svar, mahar, janas, tapas, satya) and seven lower. Bhuvaneśvarī is held to be the sovereign of all fourteen — the Goddess as the world-transcending yet world-sustaining power. See Kinsley 1997, ch. 5." },
      { q: "How does she differ from Tripurasundarī?", a: "Both are Śākta Mahāvidyā forms, but Bhuvaneśvarī is the sovereign-creative aspect (the world as her manifestation, the Queen), while Tripurasundarī is the beautiful-playful aspect (the world as her play, the sixteen-year-old). The iconographies overlap (four-armed, noose and goad) but the theological framings differ. See Kinsley 1997 for the distinction." },
    ],
    yantra: {
      name: "Bhuvaneśvarī Yantra",
      description: "A square bhūpura with four gates, enclosing a 16-petalled lotus, within which is an 8-petalled lotus, within which is an inverted yoni-triangle with the Bhuvaneśvarī bīja hrīṁ at the central bindu. Described in the Śāradā Tilaka and Śākta Praamoda.",
      symbolism: "The 16- and 8-petalled lotuses are the full field of manifestation. The inverted triangle is the yoni — the Goddess as the sovereign creative matrix from which the fourteen bhuvanas (worlds) arise. The bindu is Bhuvaneśvarī herself, the Queen seated at the heart of her kingdom.",
    },
  },
  {
    slug: "kamala-sadhana",
    name: "Kamalā Sādhana",
    sanskrit: "कमला — The Lotus Goddess",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā — tenth)",
    level: "Intermediate",
    durationHours: 18,
    days: 41,
    authenticityScore: 82,
    summary:
      "The tenth Mahāvidyā, the benevolent lotus-seated form — iconographically akin to Lakṣmī, bathed by two elephants, holding lotuses. Attested in Kamalā Mahāvidyā, Śākta Praamoda, Mahābhāgavata Purāṇa.",
    description:
      "Kamalā is the tenth of the Daśa Mahāvidyās, the benevolent lotus-seated form of the Goddess. Iconographically depicted as fair-complexioned, four-armed, holding lotuses in two hands, with the other two hands in varada and abhaya mudrās, seated on a fully-opened lotus, while two elephants (gaja) stand on either side bathing her with water poured from their trunks. The iconography is essentially identical to that of Lakṣmī, the Vaiṣṇava goddess of fortune — and the two are often identified, though within the Mahāvidyā framework Kamalā retains the Śākta theological framing. Her sādhana is held to confer prosperity, auspiciousness, and the contemplative vision of the world as abundant gift. The primary textual attestations are the Kamalā Mahāvidyā (Goswami Prahlad Giri, Chowkhamba), the Śākta Praamoda (3 editions), and the Mahābhāgavata Purāṇa. Scholarly treatment in Kinsley (1997, ch. 9; 1986), and Goudriaan & Gupta (1981).",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'aim̐ hrīṁ srīṁ kamalāyai namaḥ'",
    benefits: [
      "Documents the tenth Mahāvidyā — the benevolent lotus-seated form",
      "Surfaces the Kamalā Mahāvidyā and Śākta Praamoda as primary textual witnesses",
      "Connects to academic work by Kinsley and Goudriaan-Gupta",
    ],
    warnings: [
      "MODERATE CAUTION — benevolent Mahāvidyā form, but still requires dīkṣā for mūla-mantra",
      "The mūla-mantra is dīkṣā-restricted in published editions",
      "The Kamalā form is sometimes confused with Vaiṣṇava Lakṣmī worship; the two share iconography but differ in theological framework",
    ],
    lineage:
      "Kamalā Mahāvidyā (Goswami Prahlad Giri, Chowkhamba) → Śākta Praamoda (3 editions) → Daśa Mahāvidyā Tantra-Sāra (Yogiraj Yashpal) → Mahābhāgavata Purāṇa → modern Śākta paddhatis. Academic: Kinsley 1997, 1986; Goudriaan & Gupta 1981.",
    preSadhna: [
      { title: "Iconographic Contemplation", duration: "ongoing", detail: "Study the dhyāna-śloka from the Kamalā Mahāvidyā. The iconography — lotus-seat, two elephants, four-armed — is the primary contemplative instrument." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śākta Praamoda paddhati." },
    ],
    procedure: [
      { title: "Kamalā Yantra", detail: "A square bhūpura with an 8-petalled lotus inside, within which is a 16-petalled lotus, within which is an inverted triangle with the Kamalā bīja (srīṁ) at the bindu. Construction details are dīkṣā-restricted; the public form is documented in Śākta Praamoda." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 41 days per the Śākta Praamoda paddhati. The operational form is dīkṣā-restricted. The public bīja-frame 'aim̐ hrīṁ srīṁ kamalāyai namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the lotus-seated form with the two bathing elephants. Recited before japa." },
    ],
    faq: [
      { q: "Is Kamalā the same as Lakṣmī?", a: "The iconographies are essentially identical, and the two are often identified in popular practice. Within the Mahāvidyā framework, however, Kamalā retains the Śākta theological framing — she is one of the ten forms of the Goddess as Mahādevī, and her sādhana is undertaken within the Śākta dīkṣā lineage rather than the Vaiṣṇava Lakṣmī-pūjā framework. See Kinsley 1997, ch. 9." },
      { q: "Why is she the only benevolent Mahāvidyā?", a: "The Daśa Mahāvidyās span the full range of the Goddess's manifestations — from the fierce (Kālī, Tārā, Bhairavī, Chinnamastā, Dhūmāvatī, Bagalāmukhī) to the gentle (Tripurasundarī, Bhuvaneśvarī, Kamalā). Kamalā is the most approachable and benevolent form, and her sādhana is sometimes given as a preliminary to the more intense Mahāvidyā practices. The framework encodes the principle that the same Goddess appears in both fierce and gentle forms." },
    ],
    yantra: {
      name: "Kamalā Yantra",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is a 16-petalled lotus (note the inverted order from Bhuvaneśvarī — Kamalā's signature), within which is an inverted yoni-triangle with the Kamalā bīja srīṁ at the central bindu. Two small elephant silhouettes flank the central lotus, referencing the gaja-bathing (Lakṣmī) iconography. Described in the Kamalā Mahāvidyā and Śākta Praamoda.",
      symbolism: "The 8-then-16 lotus order inverts the standard hierarchy, signalling the Goddess's playful reversal of cosmic structure. The two elephants are the gaja-bathing motif — the royal consecration of the Goddess by the cosmic elephants of the directions. The bindu is Kamalā herself, the abundant gift-bestowing form.",
    },
  },
  {
    slug: "bhairavi-proper-sadhana",
    name: "Bhairavī Sādhana (Proper)",
    sanskrit: "भैरवी — The Teacher Goddess",
    category: "Tantra",
    tradition: "Śākta (Daśa Mahāvidyā — fifth)",
    level: "Advanced",
    durationHours: 24,
    days: 45,
    authenticityScore: 83,
    summary:
      "The fifth Mahāvidyā in her proper form — distinct from Tripura Bhairavī — seated on a corpse, holding a rosary and a book, embodying the teacher aspect of the Goddess. Attested in Bhairavī Tantra, Rudrayāmala, Śāradā Tilaka.",
    description:
      "Bhairavī (in her proper fifth-Mahāvidyā form, distinct from Tripura Bhairavī who is the sixth Mahāvidyā in some lists) is the Goddess as the teacher (guru) aspect of the divine feminine. Iconographically depicted as fierce, red-complexioned, four-armed, holding a rosary (mālā) and a book (pustaka) in two hands — the marks of the teacher — with the other hands in varada and abhaya mudrās. She is sometimes depicted seated on a corpse (śava) or on a lotus, wearing a garland of skulls. Her sādhana is held to confer knowledge, liberation, and the direct experiential wisdom that comes from the Guru-as-Goddess. The primary textual attestations are the Bhairavī evam Dhūmāvatī Tantra Śāstra (Pt. Rajesh Dīkṣit edition, archive.org direct PDF — the standalone Bhairavī Tantra survives primarily through this paired edition), the Rudrayāmala Tantram, the Śāradā Tilaka (Bhairavī chapter, 4 editions), and the Śākta Praamoda. Scholarly treatment in Kinsley (1997, 1986), Goudriaan & Gupta (1981), S.K. Ramachandra Rao (1994), and the Indica Today essay tradition.",
    primaryMantra:
      "the mūla-mantra is dīkṣā-restricted in published editions; the publicly attested bīja-frame is 'hrīṁ bhairavyai namaḥ'",
    benefits: [
      "Documents the fifth Mahāvidyā in her proper (teacher) form, distinct from Tripura Bhairavī",
      "Surfaces the Śāradā Tilaka Bhairavī chapter and the Dīkṣit paired edition as primary textual witnesses",
      "Connects to academic work by Kinsley, Rao, and Goudriaan-Gupta",
    ],
    warnings: [
      "HIGH CAUTION — advanced Mahāvidyā practice; traditionally requires dīkṣā",
      "The mūla-mantra is dīkṣā-restricted in all published editions",
      "The Bhairavī (proper) form is sometimes confused with Tripura Bhairavī (the sixth Mahāvidyā); the two are distinct textual lineages with overlapping iconography",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Bhairavī evam Dhūmāvatī Tantra Śāstra (Dīkṣit edition, archive.org) → Rudrayāmala Tantram → Śāradā Tilaka (Bhairavī chapter, 4 editions) → Śākta Praamoda → modern Śākta paddhatis. Academic: Kinsley 1997, 1986; Goudriaan & Gupta 1981; S.K. Ramachandra Rao 1994.",
    preSadhna: [
      { title: "Iconographic Distinction", duration: "ongoing", detail: "Study the Bhairavī (proper) form in the Śāradā Tilaka Bhairavī chapter. Distinguish from Tripura Bhairavī — same name-root but different textual lineage and different iconographic register." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śāradā Tilaka paddhati. The Bhairavī rite is preceded by the same protective framework as other Mahāvidyā operations." },
    ],
    procedure: [
      { title: "Bhairavī Yantra", detail: "A square bhūpura with an 8-petalled lotus inside, within which is an inverted triangle with the Bhairavī bīja (hrīṁ) at the bindu, surrounded by a rosary-motif ring (the teacher attribute). Construction details are dīkṣā-restricted." },
      { title: "Mūla-mantra Japa", detail: "Count is typically 100,000 over 45 days per the Śāradā Tilaka paddhati. The operational form is dīkṣā-restricted. The public bīja-frame 'hrīṁ bhairavyai namaḥ' is attested in published digests." },
      { title: "Dhyāna", detail: "The dhyāna-śloka describes the red, four-armed form holding rosary and book, seated on a corpse or lotus, wearing a skull garland. Recited before japa." },
    ],
    faq: [
      { q: "How is Bhairavī (proper) different from Tripura Bhairavī?", a: "The two share the name-root 'Bhairavī' but belong to distinct Mahāvidyā positions and textual lineages. Bhairavī (proper) is the fifth Mahāvidyā — the teacher aspect, attested in the Bhairavī Tantra and the Śāradā Tilaka Bhairavī chapter. Tripura Bhairavī is the sixth Mahāvidyā — the fierce form of Tripurasundarī within the Śrī Vidyā canon, attested in Śāradā Tilaka ch. 11 and the Paraśurāma Kalpasūtra. The iconographic overlap (corpse-seat, skull garland, fierce aspect) is real but the theological frameworks differ. See Kinsley 1997." },
      { q: "Why does she hold a rosary and a book?", a: "The rosary (mālā) and the book (pustaka) are the marks of the teacher (guru). Bhairavī is the Goddess as the Guru — the source of both practice (rosary = japa) and knowledge (book = śāstra). Theological reading (Rao 1994) frames her as the inner Guru who awakens Kundalinī and grants the direct experiential wisdom that no external book can convey." },
    ],
    yantra: {
      name: "Bhairavī Yantra",
      description: "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle with the Bhairavī bīja hrīṁ at the central bindu, ringed by a rosary-motif (the teacher attribute). Described in the Śāradā Tilaka Bhairavī chapter and the Bhairavī Tantra.",
      symbolism: "The inverted triangle is the yoni-as-teaching — the Goddess as the Guru who transmits both practice (the rosary-motif) and knowledge (the book she holds in her iconography). The bindu is Bhairavī herself, the inner Guru who awakens Kundalinī and grants the direct experiential wisdom that no external book can convey.",
    },
  },
  {
    slug: "lakulisha-pashupata-sadhana",
    name: "Lakulīśa Pāśupata Sādhana",
    sanskrit: "लाकुलीश पाशुपत — The Pāśupata Ascetic Path",
    category: "Tantra",
    tradition: "Śaiva (Pāśupata)",
    level: "Advanced",
    durationHours: 0,
    days: 0,
    authenticityScore: 86,
    summary:
      "The Pāśupata Śaiva ascetic path attributed to Lakulīśa (2nd c. CE) — the elder Śaiva tradition that influenced later tantra. Attested in the Pāśupata Sūtras with Kauṇḍinya's Pañcārthabhāṣya (Trivandrum Sanskrit Series 143, 1940).",
    description:
      "The Pāśupata tradition is one of the oldest surviving Śaiva ascetic orders, attributed to the legendary teacher Lakulīśa (lit. 'the Lord with the club', c. 2nd century CE — historically attested in the Karvan inscription of the Maitraka dynasty and in epigraphic records across western India). The Pāśupata Sūtras, with Kauṇḍinya's foundational Pañcārthabhāṣya commentary (the only surviving ancient commentary), are the primary scriptural authority. The tradition is distinct from the later Kāpālika, Kālāmukha, and Trika Śaiva traditions, but is held to have influenced all of them — and through them, the Śākta-tantra complex that produced the Mahāvidyā corpus. The Pāśupata sādhana is fundamentally ascetic: it involves specific vows (vrata), stage-bound conduct (ācāra) including paradoxical behaviours (acting as if mad, attracting contempt from householders), and the cultivation of direct experience of the identity of the self (paśu) with Śiva (paśupati). The primary textual attestations are the Pāśupata Sūtras with Kauṇḍinya's Pañcārthabhāṣya (Trivendrum Sanskrit Series 143, 1940, ed. Ananta Kṛṣṇa Śāstrī — 3 Internet Archive digitisations including an English translation) and the Pashupat Sutram (Chakrapani Trivedi edition, Shaiva Bharati Varanasi #54). Scholarly treatment in Ingalls (1962, HJAS 'Cynics and Pāśupatas'), Sanderson (1985, 2009), Bisschop (2006), and the Leiden 'Vedic Elements in the Pāśupatasūtra' essay tradition.",
    primaryMantra:
      "the Pāśupata path is primarily a vows-and-conduct framework rather than a mantra-centric sādhana; the Pāśupata Sūtras do not document a mūla-mantra in the tantric sense. The Namaskāra to Śiva (Namaḥ Śivāya) is the public pañcākṣara used in the Pāśupata preliminaries.",
    benefits: [
      "Documents the oldest surviving Śaiva ascetic path with strong textual attestation",
      "Surfaces the Pāśupata Sūtras with Kauṇḍinya's Pañcārthabhāṣya as the primary textual witness (3 Internet Archive digitisations)",
      "Connects to substantial academic literature (Ingalls, Sanderson, Bisschop)",
      "Fills the pre-tantric Śaiva foundation that contextualises later Mahāvidyā practice",
    ],
    warnings: [
      "HIGH CAUTION — extreme ascetic practice; traditionally requires formal initiation into a Pāśupata order",
      "The stage-bound conduct (ācāra) includes paradoxical behaviours (acting as if mad, deliberately attracting contempt) that are destabilising if undertaken without supervision",
      "The Pāśupata path is not mantra-centric in the tantric sense; do not impose tantric frameworks on it",
      "Not appropriate for practitioners without a Pāśupata lineage holder; this is a scholarly entry-point, not a practice manual",
    ],
    lineage:
      "Lakulīśa (c. 2nd c. CE, historically attested in the Karvan inscription) → Pāśupata Sūtras + Kauṇḍinya's Pañcārthabhāṣya (TSS 143, 1940) → modern Pāśupata orders. Academic: Ingalls 1962 (HJAS), Sanderson 1985 & 2009, Bisschop 2006.",
    preSadhna: [
      { title: "Initiation (Dīkṣā)", duration: "ceremony", detail: "Formal initiation into a Pāśupata order is the prerequisite without which the sādhana is held to be without effect. The Pāśupata Sūtras are explicit that the path is not undertaken unilaterally." },
      { title: "Vows (Vrata)", duration: "ongoing", detail: "The Pāśupata Sūtras prescribe specific vows: celibacy, non-violence, dietary restraint, and stage-bound conduct (ācāra). The vows are the foundation; without them the japa is held to be ineffective." },
    ],
    procedure: [
      { title: "Stage-bound Conduct (Ācāra)", detail: "The Pāśupata path unfolds in stages: (1) the stage of dwelling in a Śiva temple, (2) the stage of acting as if mad (paradoxical behaviours intended to attract contempt and burn karmic residue), (3) the stage of moving in society without seeking recognition, (4) the stage of inner absorption. The stages are documented in the Pāśupata Sūtras with Kauṇḍinya's commentary." },
      { title: "Pañcākṣara Japa", detail: "The public pañcākṣara 'Namaḥ Śivāya' is used in the preliminaries. The Pāśupata Sūtras do not document a tantric-style mūla-mantra; the path is conduct-centric rather than mantra-centric." },
      { title: "Cultivation of Pāśupati-Identity", detail: "The culmination of the path is the direct experience of the identity of the self (paśu) with Śiva (paśupati). The Pāśupata Sūtras frame this as the dissolution of the bondage (pāśa) that obscures the pre-existing identity." },
    ],
    faq: [
      { q: "Is Lakulīśa a historical figure?", a: "Yes. Lakulīśa is historically attested in the Karvan inscription of the Maitraka dynasty (c. 5th c. CE) and in epigraphic records across western India from the 2nd century onward. He is traditionally dated to the 2nd century CE. The Pāśupata tradition identifies him as the final avatāra of Śiva, the founder of the order. See Ingalls 1962 for the historical analysis." },
      { q: "Why the paradoxical behaviours in stage two?", a: "The Pāśupata Sūtras prescribe deliberate behaviours that attract contempt from householders (snoring, blinking, acting as if mad) — the commentary (Kauṇḍinya) explains this as a mechanism for burning karmic residue: by accepting the contempt of others, the practitioner exhausts the fruits of past action and accelerates the dissolution of ego-identity. The practice is held to require the protective framework of formal initiation and supervision." },
      { q: "How does Pāśupata relate to later tantra?", a: "The Pāśupata tradition is one of the elder Śaiva ascetic orders from which later Śaiva and Śākta tantra developed. The Kāpālika tradition (which directly influenced the Mahāvidyā cremation-ground forms) emerged from or alongside the Pāśupata milieu. Sanderson (1985, 2009) documents the historical continuity. The Pāśupata framework is thus a foundational context for understanding the later tantric traditions — but it should not be conflated with them. The Pāśupata path is conduct-centric and ascetic; the later tantric paths are mantra-centric and (often) householder-compatible." },
    ],
    yantra: {
      name: "Pāśupata Liṅga Diagram",
      description: "A simple diagram of the Lakulīśa liṅga — a vertical line (the liṅga) with a horizontal line through its upper third (the club / lakula), within a square frame bearing the pañcākṣara 'Namaḥ Śivāya' at the four gates. Unlike the Mahāvidyā yantras, the Pāśupata tradition is conduct-centric rather than mantra-centric, so the diagram is iconographic rather than operational.",
      symbolism: "The liṅga is the aniconic form of Śiva — the unmanifest sign. The club (lakula) is Lakulīśa's identifying attribute, signaling the historical founder of the Pāśupata order. The pañcākṣara at the four gates is the public mantra of the tradition. The diagram is a contemplative aid, not an activated ritual object — the Pāśupata path is undertaken through vows and conduct rather than yantra-pūjā.",
    },
  },
  {
    slug: "matsyendranath-nath-sadhana",
    name: "Matsyendranāth / Nāth Sādhana",
    sanskrit: "मत्स्येन्द्रनाथ — The Nāth Siddha Tradition",
    category: "Tantra",
    tradition: "Nāth (Śaiva-Yogic)",
    level: "Advanced",
    durationHours: 0,
    days: 0,
    authenticityScore: 84,
    summary:
      "The Nāth Siddha tradition attributed to Matsyendranāth — the yogic-astral-body lineage that influenced Haṭha Yoga and the later tantric traditions. Attested in the Kaulajñānanirṇaya, Swacchanda Tantra with Kṣemarāja's commentary, and the Khecarīvidyā.",
    description:
      "The Nāth Siddha tradition (also called the Yogi or Kānphaṭa tradition) is a Śaiva-yogic lineage attributed to the legendary siddha Matsyendranāth and his disciple Gorakhnāth. The tradition is historically traceable from around the 9th-10th centuries CE and is foundational to the development of Haṭha Yoga, Laya Yoga, and the astral-body (cakra/nāḍī) frameworks that became standard across later tantric traditions. Matsyendranāth's primary textual attestation is the Kaulajñānanirṇaya (4 Internet Archive editions: Bagchi Calcutta Sanskrit Series, DLI Nepal-manuscript corpus 1934, Shyamakant Dwivedi Anand, Yogendra Sharma Calcutta Sanskrit Series) — a text that teaches the Goddess-centric (Kaula) form of Śaiva practice that pre-dates the formal Nāth order. The parallel Kashmir-Śaiva recension is preserved in the Swacchanda Tantra with Kṣemarāja's commentary (2 editions), and the Kālīvilāsa Tantra. The Nāth tradition's distinctive contributions to later practice include the six-cakra system, the kuṇḍalinī framework, the nāḍī system (iḍā, piṅgalā, suṣumṇā), the mudrās (especially khecarī), and the structured laya-yoga practices. Scholarly treatment in White (1996, 2003, 2009), Mallinson (2007 Khecarīvidyā; 2017 Roots of Yoga with Singleton), Dasgupta (1946, 1962), Mallik (1954), and Briggs (1938).",
    primaryMantra:
      "the Nāth tradition is primarily a yoga-and-astral-body framework rather than a single-mantra sādhana; the So'ham (I am That) breath-mantra is the public core practice. Specific bījas are dīkṣā-restricted.",
    benefits: [
      "Documents the foundational Śaiva-yogic lineage that shaped Haṭha and Laya Yoga",
      "Surfaces the Kaulajñānanirṇaya and Swacchanda Tantra as primary textual witnesses (with multiple Internet Archive editions)",
      "Connects to substantial academic literature (White, Mallinson, Dasgupta)",
      "Fills the pre-Haṭha-Yoga-Pradīpikā context for the cakra/nāḍī/kuṇḍalinī framework",
    ],
    warnings: [
      "HIGH CAUTION — advanced yogic-astral-body practice; traditionally requires dīkṣā into a Nāth order",
      "The kuṇḍalinī framework is held to require supervision; unsupervised practice is held to risk 'kuṇḍalinī imbalance' (a documented psychophysiological phenomenon in the academic literature)",
      "The khecarīmudrā (tongue-extension) practice involves physical manipulation and should not be undertaken without direct instruction",
      "The Nāth tradition is historically entangled with the Kaula and Sahajiyyā traditions; do not collapse them — they share roots but have distinct framings",
    ],
    lineage:
      "Matsyendranāth (c. 9th-10th c. CE) → Gorakhnāth → Nāth order (Kānphaṭa yogis) → modern Nāth orders. Textual: Kaulajñānanirṇaya (4 Internet Archive editions) → Swacchanda Tantra + Kṣemarāja commentary (2 editions) → Kālīvilāsa Tantra → Haṭha Yoga Pradīpikā (later synthesis). Academic: White 1996, 2003, 2009; Mallinson 2007, 2017; Dasgupta 1946, 1962; Mallik 1954; Briggs 1938.",
    preSadhna: [
      { title: "Dīkṣā into a Nāth Order", duration: "ceremony", detail: "Formal initiation by a Nāth guru is the prerequisite without which the practice is held to be without effect. The Kānphaṭa (split-eared) marker of the Nāth order is received at initiation." },
      { title: "Preliminary Purifications", duration: "ongoing", detail: "The six purifications (ṣaṭkarma) of Haṭha Yoga — dhauti, basti, neti, trāṭaka, nauli, kapālabhāti — are the foundational purifications that prepare the astral body for the higher practices." },
    ],
    procedure: [
      { title: "Āsana and Prāṇāyāma Foundation", detail: "The Nāth tradition treats āsana and prāṇāyāma as the foundation. The Haṭha Yoga Pradīpikā (15th c.) is the standard later synthesis; the Nāth preliminaries are documented in the Kaulajñānanirṇaya and the parallel Kashmir-Śaiva texts." },
      { title: "Mudrā Practice", detail: "The Nāth tradition developed the mudrā framework that became standard in Haṭha Yoga. The khecarīmudrā (tongue-extension) is the most distinctive; others include mahāmudrā, jālandharabandha, and mūlabandha. The Mallinson (2007) edition of the Khecarīvidyā is the standard scholarly reference." },
      { title: "Laya Yoga (Absorption)", detail: "The Nāth laya-yoga practices work with the nāda (inner sound) — the practitioner traces the sound-current inward to its source. The Kaulajñānanirṇaya documents the Goddess-centric form of this practice; the parallel Haṭha form is in the later Śiva Saṃhitā and Haṭha Yoga Pradīpikā." },
      { title: "Kuṇḍalinī Awakening", detail: "The kuṇḍalinī framework (the serpent-power at the base of the spine that ascends through the cakras to the crown) is the central Nāth contribution to later tantric practice. The framework is documented in the Kaulajñānanirṇaya and systematised in the later Śaṭ-Cakra-Nirūpaṇa (16th c.). The practice is held to require supervision; unsupervised work is held to risk psychological destabilisation." },
    ],
    faq: [
      { q: "Who was Matsyendranāth?", a: "Matsyendranāth (also Macchendranāth, c. 9th-10th c. CE) is the legendary founder of the Nāth tradition. He is historically traceable through textual attestations in the Kaulajñānanirṇaya and through the parallel Kashmir-Śaiva textual corpus. In Nepalese tradition he is identified with the Buddhist siddha Luipa and is revered as the founder of the Nepalese Avalokiteśvara cult. See White 1996 (The Alchemical Body) for the historical reconstruction." },
      { q: "How does the Nāth tradition relate to Haṭha Yoga?", a: "The Nāth tradition is the principal historical source of the Haṭha Yoga corpus. The Haṭha Yoga Pradīpikā (15th c.), the Śiva Saṃhitā, and the Gheraṇḍa Saṃhitā are later syntheses of practices developed within the Nāth tradition. The cakra, nāḍī, kuṇḍalinī, mudrā, and ṣaṭkarma frameworks that are standard in modern yoga all trace through the Nāth corpus. See Mallinson & Singleton 2017 (Roots of Yoga)." },
      { q: "Is the Nāth tradition Śaiva or Buddhist?", a: "The Nāth tradition is Śaiva in its primary framing (devotion to Śiva as Ādināth, the first Lord), but historically it absorbed and cross-pollinated with Buddhist siddha traditions (particularly in Nepal, where Matsyendranāth is identified with the Buddhist Avalokiteśvara). The Kaulajñānanirṇaya itself contains both Śaiva and Buddhist-inflected material. The scholarly consensus (White 1996, Mallinson 2007) is that the Śaiva-Buddhist siddha milieu was porous; the Nāth tradition is best understood as a Śaiva-yogic lineage with significant Buddhist cross-pollination." },
    ],
    yantra: {
      name: "Nāth Cakra Diagram",
      description: "A diagram of the six-cakra system central to the Nāth tradition: six horizontal lotus-forms stacked vertically along a central axis (the suṣumṇā nāḍī), from the mūlādhāra (four-petalled, base) to the sahasrāra (thousand-petalled, crown). The iḍā (left) and piṅgalā (right) nāḍīs weave around the central axis. The So'ham breath-mantra is inscribed along the central axis.",
      symbolism: "The six cakras are the astral-body framework that the Nāth tradition developed and bequeathed to later Haṭha Yoga. The suṣumṇā is the central channel through which Kuṇḍalinī ascends. The iḍā and piṅgalā are the lunar and solar channels that weave around it. The So'ham ('I am That') mantra is the breath-mantra — the public core practice of the Nāth tradition.",
    },
  },
  {
    slug: "shanti-karma",
    name: "Śānti Karma (Pacification)",
    sanskrit: "शान्तिकर्म — The Pacifying Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Intermediate",
    durationHours: 16,
    days: 41,
    authenticityScore: 85,
    summary:
      "The first of the six ṣaṭ-karma — pacification. The calming of hostile forces, the settling of disturbances, the restoration of equilibrium. Attested in the Agni Purāṇa ch. 138, Prapañcasāra Tantra, Śāradā Tilaka.",
    description:
      "Śānti Karma is the first and gentlest of the six ṣaṭ-karma — the only saumya (benevolent) member of an otherwise ugra (fierce) framework. Its purpose is pacification: the calming of hostile forces, the settling of disturbances, the restoration of equilibrium to a situation, place, or person. The Agni Purāṇa ch. 138, the Prapañcasāra Tantra, the Mahānirvāṇa Tantra Ch. VIII (which prescribes a clay kalāśa for śānti), and the Śāradā Tilaka all document its procedural paddhati. The rite uses the mṛt (earth/clay) kalāśa, white offerings, and gentle mantras. It is the only ṣaṭ-karma that may be undertaken without the protective precautions required by the fierce four. Scholarly treatment in Goudriaan & Gupta (1981), Sanderson (2009, The Śaiva Age), and White (2003, Kiss of the Yoginī).",
    primaryMantra:
      "the mūla-mantra varies by lineage; the publicly attested form is 'oṃ śāntiṁ kuru kuru svāhā'",
    benefits: [
      "Documents the gentlest of the six ṣaṭ-karma — the only saumya member",
      "Surfaces the Agni Purāṇa ch. 138 and Prapañcasāra Tantra as primary textual witnesses",
      "Provides the category-framework context for the other five ṣaṭ-karma",
    ],
    warnings: [
      "MODERATE CAUTION — the gentlest ṣaṭ-karma, but still requires dīkṣā for the mūla-mantra",
      "The Agni Purāṇa prescribes specific kalāśa material (clay) and color (white); without these the rite is held to be ineffective",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage:
      "Agni Purāṇa ch. 138 → Prapañcasāra Tantra (Avalon 1919, TTS 18) → Mahānirvāṇa Tantra Ch. VIII → Śāradā Tilaka → modern paddhatis. Academic: Goudriaan & Gupta 1981, Sanderson 2009.",
    preSadhna: [
      { title: "Kalāśa Preparation", duration: "ceremony", detail: "A clay kalāśa (ritual pot) is prepared with clean earth and water — the mṛt material prescribed by the Mahānirvāṇa Tantra for śānti rites." },
      { title: "Standard Śākta Preliminaries", duration: "7 days", detail: "Guru-pūjā, gaṇeśa-pūjā, śakti-pūjā per the Śāradā Tilaka paddhati." },
    ],
    procedure: [
      { title: "Pacification Japa", detail: "The śānti mūla-mantra is recited over the clay kalāśa. The count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted." },
      { title: "White Offerings", detail: "White offerings (white flowers, white sandalwood, milk) are prescribed for śānti — the color of peace and purity. The Śāradā Tilaka documents the offering sequence." },
      { title: "Application", detail: "Application is framed as the restoration of equilibrium — the calming of a hostile force, the settling of a disturbance, the healing of an affliction. The rite is held to work through pacification, not coercion." },
    ],
    faq: [
      { q: "Why is Śānti the only saumya ṣaṭ-karma?", a: "The six ṣaṭ-karma span a spectrum from gentle (śānti) to severe (māraṇa). Śānti is the only saumya (benevolent) member — the other five are ugra (fierce). The framework encodes the principle that the same Śākta technology can be applied for either pacification or severity, depending on the situation. See Sanderson 2009." },
      { q: "What is the clay kalāśa for?", a: "The Mahānirvāṇa Tantra Ch. VIII prescribes a clay (mṛt) kalāśa for śānti rites. Clay is the material of the earth — the most stable and grounding of the five elements. The kalāśa becomes the receptacle for the pacifying energy generated by the japa." },
    ],
  },
  {
    slug: "vashikarana-karma",
    name: "Vaśīkaraṇa Karma (Subjugation)",
    sanskrit: "वशीकरणकर्म — The Subduing Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 80,
    summary:
      "The second of the six ṣaṭ-karma — subjugation. Bringing someone under one's influence. Attested in the Agni Purāṇa, Prapañcasāra Tantra, Rudrayāmala, Mantra Mahodadhi.",
    description:
      "Vaśīkaraṇa Karma is the second of the six ṣaṭ-karma — the act of subjugation, bringing a person or force under one's influence. The Mahānirvāṇa Tantra Ch. VIII prescribes a sphaṭika (crystal) kalāśa for vaśīkaraṇa, signaling the crystalline clarity of the influence. The rite is documented in the Agni Purāṇa ch. 138, the Prapañcasāra Tantra, the Rudrayāmala, and the Mantra Mahodadhi of Mahīdhara. Scholarly treatment in Goudriaan & Gupta (1981) and White (2003).",
    primaryMantra: "the mūla-mantra is dīkṣā-restricted in published editions",
    benefits: [
      "Documents the second ṣaṭ-karma — the subjugation category",
      "Surfaces the Rudrayāmala and Mantra Mahodadhi as primary textual witnesses",
    ],
    warnings: [
      "HIGH CAUTION — ugra ṣaṭ-karma; traditionally requires dīkṣā",
      "The Mahānirvāṇa Tantra prescribes the sphaṭika (crystal) kalāśa; without it the rite is held to be ineffective",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage: "Agni Purāṇa → Prapañcasāra → Rudrayāmala → Mantra Mahodadhi → modern paddhatis. Academic: Goudriaan & Gupta 1981, White 2003.",
    preSadhna: [
      { title: "Crystal Kalāśa", duration: "ceremony", detail: "A sphaṭika (crystal) kalāśa is prepared — the Mahānirvāṇa Tantra prescription for vaśīkaraṇa." },
    ],
    procedure: [
      { title: "Subjugation Japa", detail: "Count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted." },
    ],
    faq: [
      { q: "Why the crystal kalāśa?", a: "The Mahānirvāṇa Tantra prescribes sphaṭika (crystal) for vaśīkaraṇa because crystal is held to amplify and direct intention — the subjugation rite works through focused influence, and the crystal kalāśa becomes its instrument." },
    ],
  },
  {
    slug: "stambhana-karma",
    name: "Stambhana Karma (Immobilization)",
    sanskrit: "स्तम्भनकर्म — The Paralysing Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 80,
    summary:
      "The third of the six ṣaṭ-karma — immobilization. Arresting motion, speech, or intent. Attested in the Agni Purāṇa, Prapañcasāra, Mahānirvāṇa Tantra (stone kalāśa), Todala Tantra (Bagalāmukhī as presiding Mahāvidyā).",
    description:
      "Stambhana Karma is the third of the six ṣaṭ-karma — the act of immobilization, the arrest of motion, speech, or hostile intent. The Mahānirvāṇa Tantra Ch. VIII prescribes a pāṣāṇa (stone) kalāśa for stambhana, signaling the lithic stillness of the arrest. The rite is the standalone ṣaṭ-karma category (distinct from the Bagalāmukhī Mahāvidyā sādhana, which is the presiding-deity form of the same principle). The Todala Tantra identifies Bagalāmukhī as the presiding Mahāvidyā of stambhana. The Agni Purāṇa ch. 138, Prapañcasāra, and Śāradā Tilaka document the procedural paddhati. Scholarly treatment in Goudriaan & Gupta (1981), Sanderson (2009), and Hatley (2018, Brahmayāmala).",
    primaryMantra: "the mūla-mantra is dīkṣā-restricted; the Bagalāmukhī bīja hlīṁ is the presiding bīja",
    benefits: [
      "Documents the third ṣaṭ-karma — the standalone stambhana category",
      "Distinguishes the ṣaṭ-karma category from the Bagalāmukhī Mahāvidyā form",
    ],
    warnings: [
      "HIGH CAUTION — ugra ṣaṭ-karma; traditionally requires dīkṣā",
      "The Mahānirvāṇa Tantra prescribes the pāṣāṇa (stone) kalāśa",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage: "Agni Purāṇa → Prapañcasāra → Mahānirvāṇa Tantra → Śāradā Tilaka → Todala Tantra. Academic: Goudriaan & Gupta 1981, Sanderson 2009, Hatley 2018.",
    preSadhna: [
      { title: "Stone Kalāśa", duration: "ceremony", detail: "A pāṣāṇa (stone) kalāśa is prepared — the Mahānirvāṇa Tantra prescription for stambhana." },
    ],
    procedure: [
      { title: "Immobilization Japa", detail: "Count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted. The Bagalāmukhī bīja hlīṁ is the presiding bīja." },
    ],
    faq: [
      { q: "How does Stambhana Karma differ from Bagalāmukhī sādhana?", a: "Stambhana is the ṣaṭ-karma category — the procedural act of immobilization. Bagalāmukhī is the Mahāvidyā form — the presiding deity of that category. The two are related but distinct textual lineages: the ṣaṭ-karma framework (Agni Purāṇa, Mahānirvāṇa Tantra) vs. the Mahāvidyā framework (Todala Tantra, Rudrayāmala). The Todala Tantra identifies Bagalāmukhī as the presiding Mahāvidyā of stambhana, linking the two." },
    ],
  },
  {
    slug: "vidveshana-karma",
    name: "Vidveṣaṇa Karma (Discord-Generation)",
    sanskrit: "विद्वेषणकर्म — The Dividing Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 78,
    summary:
      "The fourth of the six ṣaṭ-karma — discord-generation. Creating division between enemies. Attested in the Agni Purāṇa, Prapañcasāra, Mahānirvāṇa Tantra, Brahmayāmala.",
    description:
      "Vidveṣaṇa Karma is the fourth of the six ṣaṭ-karma — the act of creating division, generating discord between hostile parties. The Mahānirvāṇa Tantra Ch. VIII prescribes an iron (loha) kalāśa for vidveṣaṇa — the metal of Mars, signaling the adversarial register. The rite is documented in the Agni Purāṇa ch. 138, Prapañcasāra, the Brahmayāmala (Hatley 2018 critical edition), and the Sāmba Purāṇa's Abhicāra Vidhi chapter. Scholarly treatment in Sanderson (2009) and Hatley (2007, 2018).",
    primaryMantra: "the mūla-mantra is dīkṣā-restricted",
    benefits: [
      "Documents the fourth ṣaṭ-karma — the discord-generation category",
    ],
    warnings: [
      "HIGH CAUTION — ugra ṣaṭ-karma; traditionally requires dīkṣā",
      "The Mahānirvāṇa Tantra prescribes the iron kalāśa; the Śāradā Tilaka / Mantra Mahodadhi paddhati also documents the procedural constraints",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage: "Agni Purāṇa → Prapañcasāra → Mahānirvāṇa Tantra → Brahmayāmala (Hatley 2018). Academic: Sanderson 2009, Hatley 2018.",
    preSadhna: [
      { title: "Iron Kalāśa", duration: "ceremony", detail: "An iron (loha) kalāśa is prepared — the Mahānirvāṇa Tantra prescription for vidveṣaṇa." },
    ],
    procedure: [
      { title: "Discord Japa", detail: "Count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted." },
    ],
    faq: [
      { q: "Why the iron kalāśa?", a: "Iron (loha) is the metal of Mars in the Indic alchemical framework — the metal of severance and division. The Mahānirvāṇa Tantra prescribes it for vidveṣaṇa because the rite works through the principle of metallurgical division." },
    ],
  },
  {
    slug: "uccatana-karma",
    name: "Uccāṭana Karma (Driving Away)",
    sanskrit: "उच्चाटनकर्म — The Expelling Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 78,
    summary:
      "The fifth of the six ṣaṭ-karma — driving away. Forcing a hostile force to depart. Attested in the Agni Purāṇa, Prapañcasāra, Mahānirvāṇa Tantra, Mantra Mahodadhi.",
    description:
      "Uccāṭana Karma is the fifth of the six ṣaṭ-karma — the act of driving away, forcing a hostile force to depart. The Mahānirvāṇa Tantra Ch. VIII prescribes a copper (tāmra) kalāśa for uccāṭana — the metal of Venus, signaling the compelling register. Woodroffe's commentary on the Mahānirvāṇa Tantra (1929) explicitly names uccāṭana as a 'malevolent purpose' rite. The Agni Purāṇa ch. 138, Prapañcasāra, and Mantra Mahodadhi document the procedural paddhati. Scholarly treatment in Sanderson (2009) and White (2003).",
    primaryMantra: "the mūla-mantra is dīkṣā-restricted",
    benefits: [
      "Documents the fifth ṣaṭ-karma — the driving-away category",
    ],
    warnings: [
      "HIGH CAUTION — ugra ṣaṭ-karma; traditionally requires dīkṣā",
      "Woodroffe's commentary explicitly names uccāṭana as a 'malevolent purpose' rite",
      "Not appropriate for practitioners without a Śākta lineage grounding",
    ],
    lineage: "Agni Purāṇa → Prapañcasāra → Mahānirvāṇa Tantra (Woodroffe 1929 comm.) → Mantra Mahodadhi. Academic: Sanderson 2009, White 2003.",
    preSadhna: [
      { title: "Copper Kalāśa", duration: "ceremony", detail: "A copper (tāmra) kalāśa is prepared — the Mahānirvāṇa Tantra prescription for uccāṭana." },
    ],
    procedure: [
      { title: "Expulsion Japa", detail: "Count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted." },
    ],
    faq: [
      { q: "How does Uccāṭana differ from Māraṇa?", a: "Uccāṭana drives the hostile force away (compelling departure). Māraṇa transforms or ends the hostile force (the most severe ṣaṭ-karma). The two are distinct categories with distinct kalāśa prescriptions (copper for uccāṭana, skull-bowl for māraṇa) and distinct procedural frameworks. See Sanderson 2009." },
    ],
  },
  {
    slug: "marana-karma",
    name: "Māraṇa Karma (Transformation/Death)",
    sanskrit: "मारणकर्म — The Severing Act",
    category: "Tantra",
    tradition: "Śākta / Ṣaṭ-karma",
    level: "Advanced",
    durationHours: 24,
    days: 41,
    authenticityScore: 76,
    summary:
      "The sixth and most severe of the six ṣaṭ-karma — transformation/death. The severing of a hostile force. Attested in the Agni Purāṇa, Prapañcasāra, Mahānirvāṇa Tantra, Mantra Mahodadhi.",
    description:
      "Māraṇa Karma is the sixth and most severe of the six ṣaṭ-karma — the act of transformation, the severing of a hostile force. The Mahānirvāṇa Tantra Ch. VIII prescribes a kapāla (skull-bowl) kalāśa for māraṇa — the vessel of the cremation ground, signaling the most liminal register of the framework. Woodroffe's commentary (1929) explicitly names māraṇa as a 'malevolent purpose' rite. The standalone ṣaṭ-karma category is the broader ritual-class within which the existing Agni Māraṇa Tantra and Vīrudha-Āhāra Māraṇa PDFs (in the knowledge archive) are particular applications. The Agni Purāṇa ch. 138, Prapañcasāra, Mantra Mahodadhi, and the Sāmba Purāṇa's Abhicāra Vidhi document the procedural paddhati. Scholarly treatment in Sanderson (2009), White (2003), and Hatley (2018).",
    primaryMantra: "the mūla-mantra is dīkṣā-restricted",
    benefits: [
      "Documents the sixth and most severe ṣaṭ-karma — the transformation/death category",
      "Provides the category-framework context for the existing Agni Māraṇa and Vīrudha-Āhāra Māraṇa PDFs",
    ],
    warnings: [
      "HIGH CAUTION — the most severe ṣaṭ-karma; traditionally requires dīkṣā and direct supervision",
      "The Mahānirvāṇa Tantra prescribes the kapāla (skull-bowl) kalāśa — the most liminal vessel",
      "Woodroffe's commentary explicitly names māraṇa as a 'malevolent purpose' rite",
      "Not appropriate for practitioners without a Śākta lineage grounding; this is the most restricted ṣaṭ-karma",
    ],
    lineage: "Agni Purāṇa → Prapañcasāra → Mahānirvāṇa Tantra (Woodroffe 1929 comm.) → Mantra Mahodadhi → Sāmba Purāṇa Abhicāra Vidhi. Academic: Sanderson 2009, White 2003, Hatley 2018.",
    preSadhna: [
      { title: "Kapāla Kalāśa", duration: "ceremony", detail: "A kapāla (skull-bowl) kalāśa is prepared — the Mahānirvāṇa Tantra prescription for māraṇa, signaling the cremation-ground register." },
    ],
    procedure: [
      { title: "Severance Japa", detail: "Count is typically 100,000 over 41 days. The operational form is dīkṣā-restricted. The rite is held to work through the principle of energetic severance — the most severe of the ṣaṭ-karma." },
    ],
    faq: [
      { q: "How does this Māraṇa category relate to the existing Agni Māraṇa Tantra and Vīrudha-Āhāra Māraṇa PDFs?", a: "The standalone Māraṇa ṣaṭ-karma documented here is the broader ritual category. The Agni Māraṇa Tantra (fire-based māraṇa) and Vīrudha-Āhāra Māraṇa (food-based māraṇa) in the knowledge archive are particular applications within this broader category — specific sub-sādhanas that use fire or food as the agent of severance. The category framework is documented in the Agni Purāṇa, Mahānirvāṇa Tantra, and Mantra Mahodadhi; the specific applications are documented in their respective Tantra texts." },
    ],
  },
];

// ---------------------------------------------------------------- MANUSCRIPTS

export interface ManuscriptSeed {
  slug: string;
  title: string;
  originalTitle: string;
  tradition: string;
  century: string;
  catalogNumber: string;
  language: string;
  description: string;
  conditionRating: string;
  folios: number;
  sourceUrl: string;
}

export const MANUSCRIPT_SEED: ManuscriptSeed[] = [
  {
    slug: "hatha-yoga-pradipika",
    title: "Haṭha Yoga Pradīpikā",
    originalTitle: "हठयोगप्रदीपिका",
    tradition: "Haṭha / Nāth",
    century: "15th c.",
    catalogNumber: "AK-COD-001",
    language: "Sanskrit",
    description:
      "Svātmārāma's 'Light on Haṭha Yoga' — the principal codification of haṭha practice, assembling āsana, ṣaṭkarma, prāṇāyāma, mudrā, and nādānusandhāna into four chapters. The single most influential haṭha text, drawing on the earlier Gorakṣa Śataka.",
    conditionRating: "Well-attested",
    folios: 96,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/hatha-yoga-pradipika",
  },
  {
    slug: "soundarya-lahari",
    title: "Saundarya Laharī",
    originalTitle: "सौन्दर्यलहरी",
    tradition: "Śrī Vidyā / Advaita",
    century: "8th–9th c. (attrib.)",
    catalogNumber: "AK-COD-002",
    language: "Sanskrit",
    description:
      "The 'Waves of Beauty' — a hundred verses on the goddess, traditionally attributed to Śaṅkara. The first 41 verses outline the worship of the Śrī Cakra; the remainder are hymns of unparalleled poetic density. A foundational text of Śrī Vidyā.",
    conditionRating: "Well-attested",
    folios: 48,
    sourceUrl: "https://www.wisdomlib.org/hinduism/compilation/saundarya-lahari",
  },
  {
    slug: "vijnana-bhairava",
    title: "Vijñāna Bhairava Tantra",
    originalTitle: "विज्ञानभैरवतन्त्र",
    tradition: "Trika / Kashmir Śaiva",
    century: "7th–8th c.",
    catalogNumber: "AK-COD-003",
    language: "Sanskrit",
    description:
      "A dialogue in which Bhairava offers 112 distinct means (dhāraṇās) for entry into contemplative absorption — including breath, sound, emptiness, and sudden gaps between thoughts. The encyclopedic source-text of non-dual 'ways in.'",
    conditionRating: "Well-attested",
    folios: 36,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/vijnana-bhairava-tantra",
  },
  {
    slug: "mahanirvana-tantra",
    title: "Māhānirvāṇa Tantra",
    originalTitle: "महानिर्वाणतन्त्र",
    tradition: "Tantra (Smārta-aligned)",
    century: "late composition (medieval)",
    catalogNumber: "AK-COD-004",
    language: "Sanskrit",
    description:
      "The 'Great Liberation Tantra' — a systematic treatise presenting tantric doctrine and ritual through a frame aligned with orthodox (Vedic) social norms. Woodroffe's early-20th-century edition made it one of the most accessible introductions to tantric thought in the West.",
    conditionRating: "Well-attested",
    folios: 140,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/mahanirvana-tantra",
  },
  {
    slug: "mandukya-upanishad",
    title: "Māṇḍūkya Upaniṣad",
    originalTitle: "माण्डूक्योपनिषद्",
    tradition: "Vedānta (Atharva Veda)",
    century: "pre-common era",
    catalogNumber: "AK-COD-005",
    language: "Sanskrit",
    description:
      "The shortest Upaniṣad (twelve verses) and, with the Kārikā of Gauḍapāda, the seed of Advaita Vedānta. It parses Oṃ into the three states of consciousness plus the fourth (turīya) — the architectural model behind Pranava Japa.",
    conditionRating: "Well-attested",
    folios: 6,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/mandukya-upanishad",
  },
  {
    slug: "shat-cakra-nirupana",
    title: "Ṣaṭ-Cakra-Nirūpaṇa",
    originalTitle: "षट्चक्रनिरूपण",
    tradition: "Tantra / Śrī Vidyā",
    century: "16th c.",
    catalogNumber: "AK-COD-006",
    language: "Sanskrit",
    description:
      "The 'Investigation of the Six Centers' — the canonical description of the six principal cakras with their petals, colors, elements, and seed-syllables. Together with its commentary (Pādukā-pañcaka) it is the textual source of nearly all modern cakra imagery.",
    conditionRating: "Well-attested",
    folios: 30,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/shat-chakra-nirupana",
  },
  {
    slug: "yoga-sutras",
    title: "Yoga Sūtras of Patañjali",
    originalTitle: "पातञ्जलयोगसूत्र",
    tradition: "Rāja Yoga",
    century: "c. 2nd c. CE (est.)",
    catalogNumber: "AK-COD-007",
    language: "Sanskrit",
    description:
      "Four compact chapters (samaadhi, saadhana, vibhuuti, kaivalya) codifying the eight-limbed path (aṣṭāṅga). The most authoritative philosophical source for yoga as a discipline of mind, defining prāṇāyāma, dhāraṇā, dhyāna, and samādhi.",
    conditionRating: "Well-attested",
    folios: 40,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/yoga-sutras-of-patanjali",
  },
  {
    slug: "shiv-samhita",
    title: "Śiva Saṃhitā",
    originalTitle: "शिवसंहिता",
    tradition: "Haṭha / Nāth",
    century: "c. 14th–15th c.",
    catalogNumber: "AK-COD-008",
    language: "Sanskrit",
    description:
      "A dialogue between Śiva and Pārvatī covering the subtle body, the cakras, prāṇāyāma, mudrā, and the means to liberation. A key early haṭha source, notable for its detailed account of nāḍī śuddhi.",
    conditionRating: "Well-attested",
    folios: 60,
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/shiva-samhita",
  },
];

// ------------------------------------------------------------------ SCHOOLS

export interface SchoolSeed {
  slug: string;
  name: string;
  focus: string;
  description: string;
  orderIndex: number;
}

export const SCHOOL_SEED: SchoolSeed[] = [
  { slug: "mantra", name: "School of Mantra", focus: "Sacred Sound & Vibration", orderIndex: 1, description: "The science of formulated sound — seed-syllables, metered verses, and the dissolution of repetition into silence. Here the practitioner studies how sound anchors, generates, and finally releases attention." },
  { slug: "yantra", name: "School of Yantra", focus: "Sacred Geometry", orderIndex: 2, description: "The contemplation of symbolic form — the Śrī Cakra, maṇḍala, and bindu. The school teaches how geometric structures encode cosmologies and serve as instruments of layered concentration." },
  { slug: "ritual", name: "School of Ritual", focus: "Choreographed Action", orderIndex: 3, description: "The grammar of gesture, offering, and rite — from sandhyā to pūjā. Ritual studied as a discipline of time, body, and intention, rather than as superstition." },
  { slug: "dreams", name: "School of Dreams & Sleep", focus: "The Liminal Mind", orderIndex: 4, description: "The threshold states — yoga nidrā, the hypnagogic, and the deep-sleep witness. The school examines consciousness at the edge of waking, where the Māṇḍūkya finds its fourth state." },
  { slug: "astrology", name: "School of Jyotiṣa", focus: "Time & the Heavens", orderIndex: 5, description: "The contemplative astronomy of the seers — planetary cycles, the junctures of light, and the sidereal zodiac. Here cosmos becomes a mirror of inner rhythms." },
  { slug: "consciousness", name: "School of Consciousness", focus: "Non-dual Recognition", orderIndex: 6, description: "The direct path of recognition (pratyabhijñā) — the witnessing awareness in which all states appear. The school of Vedānta, Trika, and the mahāvākya." },
  { slug: "symbolism", name: "School of Symbolism", focus: "Image & Meaning", orderIndex: 7, description: "The reading of images — deity, cakra, color, and number as carriers of compressed meaning. The school that decodes the visual language of the tradition." },
];

// --------------------------------------------------------------- EVIDENCE

export interface EvidenceSeed {
  siddhiSlug: string;
  kind: "primary" | "secondary" | "scholarly" | "modern";
  citation: string;
  url: string;
  notes: string;
  confidence: "high" | "medium" | "low";
}

export const EVIDENCE_SEED: EvidenceSeed[] = [
  { siddhiSlug: "pranava-japa", kind: "primary", citation: "Māṇḍūkya Upaniṣad vv. 1–12", url: "https://www.wisdomlib.org/hinduism/book/mandukya-upanishad", notes: "Parses Oṃ into A-U-M + silence (turīya).", confidence: "high" },
  { siddhiSlug: "pranava-japa", kind: "primary", citation: "Yoga Sūtras I.27–28", url: "https://www.wisdomlib.org/hinduism/book/yoga-sutras-of-patanjali", notes: "Designates Oṃ as the designator of īśvara; prescribes its contemplation.", confidence: "high" },
  { siddhiSlug: "gayatri-mantra", kind: "primary", citation: "Ṛgveda III.62.10", url: "https://www.wisdomlib.org/hinduism/compilation/rig-veda", notes: "The original verse; oldest attestation.", confidence: "high" },
  { siddhiSlug: "nadi-shuddhi", kind: "primary", citation: "Haṭha Yoga Pradīpikā II.7–14", url: "https://www.wisdomlib.org/hinduism/book/hatha-yoga-pradipika", notes: "Describes nāḍī-śuddhi prāṇāyāma.", confidence: "high" },
  { siddhiSlug: "trataka", kind: "primary", citation: "Gheraṇḍa Saṃhitā I.54; HYP II.32", url: "https://www.wisdomlib.org/hinduism/book/hatha-yoga-pradipika", notes: "Lists trāṭaka among the purifications.", confidence: "high" },
  { siddhiSlug: "ajapa-japa", kind: "primary", citation: "Vijñāna Bhairava Tantra vv. 24, 27", url: "https://www.wisdomlib.org/hinduism/book/vijnana-bhairava-tantra", notes: "Breath-awareness dhāraṇās underlying ajapa.", confidence: "high" },
  { siddhiSlug: "sri-yantra-dhyana", kind: "primary", citation: "Saundarya Laharī vv. 1–11, 32, 41", url: "https://www.wisdomlib.org/hinduism/compilation/saundarya-lahari", notes: "Describes the worship of the Śrī Cakra.", confidence: "high" },
  { siddhiSlug: "sri-yantra-dhyana", kind: "scholarly", citation: "Bhāskararāya, Varivasyā-rahasya (comm.)", url: "", notes: "Commentarial tradition on Śrī Cakra symbolism.", confidence: "medium" },
  { siddhiSlug: "mahamrityunjaya", kind: "primary", citation: "Ṛgveda VII.59.12", url: "https://www.wisdomlib.org/hinduism/compilation/rig-veda", notes: "The death-conquering verse.", confidence: "high" },
  { siddhiSlug: "yoga-nidra", kind: "primary", citation: "Māṇḍūkya Upaniṣad vv. 5–7", url: "https://www.wisdomlib.org/hinduism/book/mandukya-upanishad", notes: "Deep-sleep state (prājña) and the fourth (turīya).", confidence: "high" },
  { siddhiSlug: "yoga-nidra", kind: "modern", citation: "Saraswati, S. — Yoga Nidrā (Bihar School, 1976)", url: "", notes: "Systematic modern protocol; distinguishes from the classical state.", confidence: "medium" },
  { siddhiSlug: "bija-mantra", kind: "primary", citation: "Ṣaṭ-Cakra-Nirūpaṇa vv. 104–112", url: "https://www.wisdomlib.org/hinduism/book/shat-chakra-nirupana", notes: "Bīja-syllables of each cakra.", confidence: "high" },
  { siddhiSlug: "soham-dhyana", kind: "primary", citation: "Bṛhadāraṇyaka Upaniṣad I.4.1 (sa ahaṃ asmī)", url: "", notes: "The seed-identity of jīva and brahman.", confidence: "high" },
  { siddhiSlug: "kumbhaka", kind: "primary", citation: "Yoga Sūtras II.49–52", url: "https://www.wisdomlib.org/hinduism/book/yoga-sutras-of-patanjali", notes: "Defines prāṇāyāma and retention; 'thins the veil.'", confidence: "high" },
  { siddhiSlug: "chakra-dharana", kind: "primary", citation: "Ṣaṭ-Cakra-Nirūpaṇa vv. 1–55, 104–112", url: "https://www.wisdomlib.org/hinduism/book/shat-chakra-nirupana", notes: "Locations, elements, colors, bījas of the six cakras.", confidence: "high" },
  { siddhiSlug: "manasika-japa", kind: "primary", citation: "Manu Smṛti II.85; Haṭha texts", url: "", notes: "Hierarchy of japa (vācika < upāṁśu < mānasika).", confidence: "medium" },
  { siddhiSlug: "sandhya-vandanam", kind: "primary", citation: "Taittirīya Āraṇyaka; Gṛhya Sūtras", url: "", notes: "Liturgical structure of the sandhyā rites.", confidence: "high" },
  // New high-intensity sadhana evidence sources
  { siddhiSlug: "preta-siddhi", kind: "primary", citation: "Preta-Siddhi Field Manual (user-supplied transcription, Aghora/Kaula)", url: "", notes: "Field-manual transcription of preta-saṁvāda operational rite; Sanskrit transmission artifacts flagged in the manual's editorial-correction table.", confidence: "medium" },
  { siddhiSlug: "bagalamukhi-sadhana", kind: "primary", citation: "Todala Tantra ch. 6 (mūla-mantras of the 10 Mahāvidyās)", url: "https://archive.org/details/todala-tantra", notes: "Primary text listing Bagalāmukhī among the Mahāvidyās.", confidence: "high" },
  { siddhiSlug: "bagalamukhi-sadhana", kind: "primary", citation: "Rudrayāmala (Bagalāmukhī-stotra section, Uttara-tantra)", url: "", notes: "Source of the Bagalāmukhī-stotra.", confidence: "high" },
  { siddhiSlug: "bagalamukhi-sadhana", kind: "primary", citation: "Bagalāmukhī Rahasyam (Pitāmbarā Peeth, Datia, 1st ed. 1964)", url: "", notes: "Operational paddhati; carries explicit dīkṣā-restriction notice.", confidence: "high" },
  { siddhiSlug: "bagalamukhi-sadhana", kind: "scholarly", citation: "D.G. White, Kiss of the Yoginī (Chicago, 2003)", url: "", notes: "Academic context on Śākta tantric practice.", confidence: "high" },
  { siddhiSlug: "bagalamukhi-sadhana", kind: "scholarly", citation: "Goudriaan & Gupta, Hindu Tantric and Śākta Literature (Harrassowitz, 1981)", url: "", notes: "Scholarly survey of Śākta textual corpus.", confidence: "high" },
  { siddhiSlug: "chinnamasta-sadhana", kind: "primary", citation: "Śāradā Tilaka ch. 7 + Prāṇatoṣiṇī commentary (1898 ed.)", url: "https://archive.org/details/pranatoshini", notes: "Primary text + commentary for Chinnamastā dhyāna and yantra.", confidence: "high" },
  { siddhiSlug: "chinnamasta-sadhana", kind: "primary", citation: "Śakti Saṅgama Tantra, Chinnamastā Khaṇḍa", url: "", notes: "Tantra section dedicated to Chinnamastā.", confidence: "high" },
  { siddhiSlug: "chinnamasta-sadhana", kind: "scholarly", citation: "E. Benard, Chinnamastā: The Aweful Buddhist and Hindu Tantric Goddess (Motilal Banarsidass, 1994)", url: "", notes: "Academic monograph on the iconography and theology.", confidence: "high" },
  { siddhiSlug: "kala-bhairava-sadhana", kind: "primary", citation: "Svacchanda Tantra (Kashmir Śaiva)", url: "https://www.wisdomlib.org/hinduism/book/svacchanda-tantra", notes: "Primary scriptural authority for Bhairava aṣṭākṣara.", confidence: "high" },
  { siddhiSlug: "kala-bhairava-sadhana", kind: "primary", citation: "Kāla Bhairavāṣṭakam (traditional attribution to Śaṅkarācārya, unverifiable)", url: "https://archive.org/details/completeworksofs00sanauoft", notes: "Eight-verse hymn publicly recited; 1910 ed. of Complete Works of Śaṅkarācārya.", confidence: "medium" },
  { siddhiSlug: "kala-bhairava-sadhana", kind: "scholarly", citation: "Dyczkowski, The Canon of the Śaivāgama and the Kubjikā Tantras (1988)", url: "", notes: "Scholarly survey of Śaiva canonical literature including Svacchanda Tantra.", confidence: "high" },
  { siddhiSlug: "bala-tripurasundari-sadhana", kind: "primary", citation: "Vāmakeśvara Tantra", url: "", notes: "Primary Śrī Vidyā text attesting the pañcadaśākṣarī.", confidence: "high" },
  { siddhiSlug: "bala-tripurasundari-sadhana", kind: "primary", citation: "Bhāvanā Upaniṣad (Śrī Cakra and pañcadaśī)", url: "", notes: "Upaniṣadic description of the Śrī Cakra and the 15-syllable mantra.", confidence: "high" },
  { siddhiSlug: "bala-tripurasundari-sadhana", kind: "primary", citation: "Paraśurāma Kalpasūtra (c. 10th-11th c.) + Rāmeśvara Sūtri commentary", url: "https://archive.org/details/srividya-sadhana-vol-1", notes: "Primary Śrī Vidyā paddhati with commentary.", confidence: "high" },
  { siddhiSlug: "bala-tripurasundari-sadhana", kind: "scholarly", citation: "S.K. Ramchandra Rao, Tantra of Śrī Cakra (Kalpatharu, 1989)", url: "", notes: "Academic encyclopaedic study of Śrī Vidyā.", confidence: "high" },
  { siddhiSlug: "bala-tripurasundari-sadhana", kind: "scholarly", citation: "A. Padoux, Vac: The Concept of the Word in Selected Hindu Tantras (SUNY, 1990)", url: "", notes: "Scholarly analysis of Śrī Vidyā mantra framework.", confidence: "high" },
  { siddhiSlug: "vajrayogini-sadhana", kind: "primary", citation: "Śrī Vajravārāhīsādhana (Digital Sanskrit Buddhist Canon)", url: "https://www.dsbcproject.org/", notes: "Primary Sanskrit sādhana text.", confidence: "high" },
  { siddhiSlug: "vajrayogini-sadhana", kind: "primary", citation: "Cakrasaṃvara-tantra", url: "", notes: "Mother-tantra cycle to which Vajravārāhī belongs.", confidence: "high" },
  { siddhiSlug: "vajrayogini-sadhana", kind: "scholarly", citation: "E. English, Vajrayoginī: Her Visualizations, Rituals, and Forms (Wisdom, 2002)", url: "https://archive.org/details/vajrayogini-her-visualizations-rituals-forms", notes: "Full academic monograph on Vajrayoginī; PDF archived.", confidence: "high" },
  { siddhiSlug: "vajrayogini-sadhana", kind: "scholarly", citation: "R. Davidson, Indian Esoteric Buddhism (Columbia, 2002)", url: "", notes: "Scholarly context on Buddhist tantra.", confidence: "high" },
  { siddhiSlug: "sudarshana-chakra-sadhana", kind: "primary", citation: "Ahirbudhnya Saṃhitā (Pāñcarātra, c. 6th-9th c.)", url: "https://archive.org/details/ahirbudhnya-samhita", notes: "Primary Pāñcarātra text on Sudarśana mantra and yantra.", confidence: "high" },
  { siddhiSlug: "sudarshana-chakra-sadhana", kind: "scholarly", citation: "F.O. Schrader, Introduction to the Pāñcarātra and the Ahirbudhnya Saṃhitā (1916)", url: "https://archive.org/details/introductiontoth00schruoft", notes: "Foundational academic study of the text and tradition.", confidence: "high" },
  { siddhiSlug: "pratyangira-devi-sadhana", kind: "primary", citation: "Atharvānokta Pratyaṅgirā Vidhāna (Sanskrit manuscript, Internet Archive)", url: "https://archive.org/details/atharvanokta-pratyangira-vidhana", notes: "Primary Sanskrit source for Pratyaṅgirā sādhana procedure.", confidence: "high" },
  { siddhiSlug: "pratyangira-devi-sadhana", kind: "primary", citation: "Pratyaṅgirā Kalpa (Sanskrit manuscript, Internet Archive)", url: "https://archive.org/details/pratyangira-kalpa", notes: "Primary Sanskrit source for Pratyaṅgirā yantra and procedural paddhati.", confidence: "high" },
  { siddhiSlug: "pratyangira-devi-sadhana", kind: "primary", citation: "Viprīta Pratyaṅgirā Vidhānam (Sanskrit manuscript, Internet Archive)", url: "https://archive.org/details/viprita-pratyangira-vidhanam", notes: "Primary Sanskrit source for the 'reverse' Pratyaṅgirā form.", confidence: "high" },
  { siddhiSlug: "pratyangira-devi-sadhana", kind: "scholarly", citation: "Shaman Hatley, The Brahmayāmalatantra and Early Śaiva Cult of Yoginīs (diss. 2007)", url: "", notes: "Academic context on the Śaiva-Śākta milieu within which Pratyaṅgirā is attested.", confidence: "medium" },
  // Batch 2: Dhūmāvatī, Mātaṅgī, Tārā-Ugra, Tripura Bhairavī, Smāśāna Bhairavī, Guhyakālī
  { siddhiSlug: "dhumavati-sadhana", kind: "primary", citation: "Dhūmāvatī Tantra (Sanskrit, Internet Archive)", url: "https://archive.org/details/dhumavati-tantra", notes: "Primary Tantra text for Dhūmāvatī sādhana.", confidence: "high" },
  { siddhiSlug: "dhumavati-sadhana", kind: "primary", citation: "Śākta Praamoda (Rājadevanandan & Devnandan Singh eds., Internet Archive)", url: "https://archive.org/details/sakta-pramoda", notes: "Digest containing Dhūmāvatī paddhati among the Mahāvidyā compilations.", confidence: "high" },
  { siddhiSlug: "dhumavati-sadhana", kind: "scholarly", citation: "David Kinsley, Tantric Visions of the Divine Feminine (UC Press, 1997)", url: "", notes: "Full academic monograph on the Daśa Mahāvidyās including Dhūmāvatī (ch. 6).", confidence: "high" },
  { siddhiSlug: "dhumavati-sadhana", kind: "scholarly", citation: "Karel van Kooij, Worship of the Goddess according to the Kālikāpurāṇa (1972)", url: "", notes: "Scholarly context on the inauspicious-goddess frame.", confidence: "medium" },
  { siddhiSlug: "matangi-sadhana", kind: "primary", citation: "Gandharva Tantra (Kak & Shastri 1934 ed., Internet Archive)", url: "https://archive.org/details/gandharva-tantra", notes: "Primary Tantra text attesting Mātaṅgī / Ucchiṣṭa Caṇḍālinī.", confidence: "high" },
  { siddhiSlug: "matangi-sadhana", kind: "primary", citation: "Mātaṅgī Mahāvidyā (Goswami Prahlad Giri, Internet Archive)", url: "https://archive.org/details/matangi-mahavidya", notes: "Dedicated Mātaṅgī text with paddhati.", confidence: "high" },
  { siddhiSlug: "matangi-sadhana", kind: "scholarly", citation: "D.G. White, Kiss of the Yoginī (Chicago, 2003)", url: "", notes: "Scholarly context on Śākta transgressive practice.", confidence: "high" },
  { siddhiSlug: "matangi-sadhana", kind: "scholarly", citation: "Kinsley, Tantric Visions of the Divine Feminine (1997, ch. 8)", url: "", notes: "Academic chapter on Mātaṅgī.", confidence: "high" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "primary", citation: "Bṛhad Nīla Tantra (Kak & Shastri 1938 ed., Internet Archive)", url: "https://archive.org/details/brihad-nila-tantra", notes: "Primary Sanskrit text for Hindu Ugra Tārā / Ekajaṭā.", confidence: "high" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "primary", citation: "Bṛhad Nīla Tantra (DLI / JaiGyan edition)", url: "https://archive.org/details/brihad-nila-tantra-dli", notes: "Alternate digitised edition of the same text.", confidence: "high" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "primary", citation: "Bṛhad Nīla Tantra (Madhusudan Kaul ed., Chaukhamba / DLI)", url: "https://archive.org/details/brihad-nila-tantra-kaul", notes: "Kashmir Śaiva recension of the text.", confidence: "high" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "primary", citation: "Ekajaṭā Tārā Sādhana Tantra (Khandelwal, 2001)", url: "", notes: "Modern compiled paddhati for Ekajaṭā Tārā.", confidence: "medium" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "scholarly", citation: "Kinsley, Tantric Visions of the Divine Feminine (1997, ch. 4)", url: "", notes: "Academic chapter distinguishing Hindu Ugra Tārā from Tibetan Buddhist Tārā traditions.", confidence: "high" },
  { siddhiSlug: "tara-ugra-sadhana", kind: "scholarly", citation: "A. Padoux, Vac: The Concept of the Word in Selected Hindu Tantras (SUNY, 1990)", url: "", notes: "Scholarly analysis of the Śākta mantra framework within which Tārā is situated.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "primary", citation: "Śāradā Tilaka ch. 11 (Malaviya ed., Internet Archive)", url: "https://archive.org/details/sarada-tilaka", notes: "Primary text attesting Tripura Bhairavī dhyāna and yantra.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "primary", citation: "Śāradā Tilaka (Avalon 1933 PDF edition)", url: "https://archive.org/details/sarada-tilaka-avalon-1933", notes: "English-translated edition with Sanskrit.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "primary", citation: "Paraśurāma Kalpa Sūtra (Sampurnanand + Vṛtti + Nīrakṣīra-Viveka, Internet Archive)", url: "https://archive.org/details/parashurama-kalpa-sutra", notes: "Primary Śrī Vidyā paddhati with commentary.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "primary", citation: "Paraśurāma Kalpa Sūtra (S.Y. Dave + Rāmeśvara commentary, Internet Archive)", url: "https://archive.org/details/parashurama-kalpa-sutra-dave", notes: "Alternate edition of the same paddhati.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "scholarly", citation: "A. Padoux, Vac (SUNY, 1990)", url: "", notes: "Scholarly analysis of the Śrī Vidyā framework.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "scholarly", citation: "Douglas Brooks, Auspicious Wisdom: The Texts and Traditions of Śrīvidyā Śākta Tantrism (SUNY, 1990)", url: "", notes: "Scholarly monograph on the Śrī Vidyā tradition including the fierce-form progression.", confidence: "high" },
  { siddhiSlug: "tripura-bhairavi-sadhana", kind: "scholarly", citation: "S.K. Ramachandra Rao, Śrī Vidyā (Kalpatharu, 1998)", url: "", notes: "Encyclopaedic academic study of Śrī Vidyā.", confidence: "high" },
  { siddhiSlug: "smasana-bhairavi-sadhana", kind: "primary", citation: "Brahmayāmala Tantra (Hatley 2018 critical edition, Institute of Prakrit, Jainology & Aesthetics)", url: "https://archive.org/details/brahmayamala-hatley", notes: "Critical edition of the Brahmayāmala with scholarly apparatus.", confidence: "high" },
  { siddhiSlug: "smasana-bhairavi-sadhana", kind: "scholarly", citation: "Shaman Hatley, The Brahmayāmalatantra and Early Śaiva Cult of Yoginīs (PhD diss., 2007)", url: "https://archive.org/details/brahmayamala-hatley-thesis", notes: "Full PhD thesis available as PDF; foundational academic study of the text and its Bhairavī strand.", confidence: "high" },
  { siddhiSlug: "smasana-bhairavi-sadhana", kind: "scholarly", citation: "Alexis Sanderson, 'Śaivism and the Tantric Traditions' (1988)", url: "", notes: "Scholarly survey of the Śaiva-Śākta milieu within which the Bhairavī strand is situated.", confidence: "high" },
  { siddhiSlug: "smasana-bhairavi-sadhana", kind: "scholarly", citation: "Csaba Kiss, journal articles on the Brahmayāmala tradition (Cardiff ALT)", url: "", notes: "Academic articles extending Hatley's work on the Bhairavī textual corpus.", confidence: "medium" },
  { siddhiSlug: "guhyakali-sadhana", kind: "primary", citation: "Mahākāla Saṃhitā — Guhyakālī Khaṇḍa (Gopinath Allahabad Block / IGNCA 69227, Internet Archive)", url: "https://archive.org/details/mahakala-samhita-guhyakali-1", notes: "Primary Sanskrit text; one of six+ digitised editions on Internet Archive.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "primary", citation: "Mahākāla Saṃhitā — Guhyakālī Khaṇḍa (DLI 552568, Internet Archive)", url: "https://archive.org/details/mahakala-samhita-guhyakali-2", notes: "Alternate digitised edition.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "primary", citation: "Mahākāla Saṃhitā — Guhyakālī Khaṇḍa (Kishor Nath Jha RSS Part 2, Internet Archive)", url: "https://archive.org/details/mahakala-samhita-guhyakali-3", notes: "Alternate digitised edition.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "primary", citation: "Mahākāla Saṃhitā — Guhyakālī Khaṇḍa (Chaukhamba Surbharati 2-vol. printed edition, 917 pp.)", url: "", notes: "Printed edition; the most widely cited scholarly reference.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "scholarly", citation: "Goudriaan & Gupta, Hindu Tantric and Śākta Literature (Harrassowitz, 1981)", url: "", notes: "Scholarly survey of the Śākta-Kālī textual corpus including the Mahākāla Saṃhitā.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "scholarly", citation: "D.G. White, Kiss of the Yoginī (Chicago, 2003)", url: "", notes: "Scholarly context on the Kālī-gaṇa tradition.", confidence: "high" },
  { siddhiSlug: "guhyakali-sadhana", kind: "scholarly", citation: "Rachel McDermott, Singing to the Goddess: Poems to Kālī and Umā from Bengal (Oxford, 2001)", url: "", notes: "Scholarly context on the broader Kālī tradition.", confidence: "medium" },
  // Batch 3: Dakṣiṇa Kālī, Ṣoḍaśī, Bhuvaneśvarī, Kamalā, Bhairavī proper, Lakulīśa Pāśupata, Matsyendranāth Nāth
  { siddhiSlug: "dakshina-kali-sadhana", kind: "primary", citation: "Karpūrādi-Stotra with Vimalānanda commentary (Woodroffe, Tantric Texts Series 9, 1953)", url: "https://archive.org/details/karpuradi-stotra-tts9", notes: "Primary text + commentary for the Dakṣiṇa Kālī dhyāna.", confidence: "high" },
  { siddhiSlug: "dakshina-kali-sadhana", kind: "primary", citation: "Kālī Tantra (Mālavīya Chowkhamba + Dīkṣit editions, Internet Archive)", url: "https://archive.org/details/kali-tantra", notes: "Primary Tantra text for Kālī sādhana procedure.", confidence: "high" },
  { siddhiSlug: "dakshina-kali-sadhana", kind: "primary", citation: "Todala Tantra (ch. 6, mūla-mantras of the 10 Mahāvidyās)", url: "https://archive.org/details/todala-tantra", notes: "Lists Kālī as the first Mahāvidyā.", confidence: "high" },
  { siddhiSlug: "dakshina-kali-sadhana", kind: "primary", citation: "Mahānirvāṇa Tantra (Avalon 1913 ed.)", url: "https://archive.org/details/mahanirvana-tantra-avalon-1913", notes: "Avalon's translated edition with Sanskrit.", confidence: "high" },
  { siddhiSlug: "dakshina-kali-sadhana", kind: "scholarly", citation: "D. Kinsley, Tantric Visions of the Divine Feminine (UC Press, 1997, ch. 2)", url: "", notes: "Academic chapter on Kālī iconography and theology.", confidence: "high" },
  { siddhiSlug: "dakshina-kali-sadhana", kind: "scholarly", citation: "D.G. White, Kiss of the Yoginī (Chicago, 2003)", url: "", notes: "Scholarly context on the Kālī-Śākta tradition.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Vāmakeśvara Tantra / Nityāṣoḍaśikārṇava (Anandāśrama 56, Internet Archive)", url: "https://archive.org/details/vamakeshvara-tantra-anandashrama-56", notes: "Primary Śrī Vidyā text attesting the pañcadaśākṣarī.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Vāmakeśvara Tantra (Sampurnanand 1985 ed., Internet Archive)", url: "https://archive.org/details/vamakeshvara-tantra-sampurnanand-1985", notes: "Alternate digitised edition.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Vāmakeśvarī Mātam with Jayaratha's Vivaraṇa (trans. Sampath Sharma)", url: "https://archive.org/details/vamakeshvari-matam-jayaratha", notes: "Edition with Jayaratha's commentary translated.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Bhāvanā Upaniṣad (Śrī Cakra and pañcadaśī)", url: "", notes: "Upaniṣadic description of the Śrī Cakra and the 15-syllable mantra.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Paraśurāma Kalpa Sūtra (4 Internet Archive editions, c. 10th-11th c.)", url: "https://archive.org/details/parashurama-kalpa-sutra", notes: "Primary Śrī Vidyā paddhati with commentaries.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "primary", citation: "Lalitā Sahasranāma with Bhāskararāya's Saubhāgya-Bhāskara (Adyar 1925)", url: "https://archive.org/details/lalita-sahasranama-saubhagya-bhaskara", notes: "Standard commentary on the Lalitā Sahasranāma.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "scholarly", citation: "A. Padoux, Vac (SUNY, 1990)", url: "", notes: "Scholarly analysis of the Śrī Vidyā framework.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "scholarly", citation: "D. Brooks, Auspicious Wisdom: The Texts and Traditions of Śrīvidyā Śākta Tantrism (SUNY, 1990)", url: "", notes: "Scholarly monograph on the Śrī Vidyā tradition.", confidence: "high" },
  { siddhiSlug: "shodashi-tripurasundari-sadhana", kind: "scholarly", citation: "S.K. Ramachandra Rao, Śrī Vidyā (Kalpatharu, 1998)", url: "", notes: "Encyclopaedic academic study.", confidence: "high" },
  { siddhiSlug: "bhuvaneshvari-sadhana", kind: "primary", citation: "Śāradā Tilaka (4 Internet Archive editions: Malaviya, Avalon 1933, DLI, Sri Satguru 1988)", url: "https://archive.org/details/sarada-tilaka", notes: "Primary text with Bhuvaneśvarī chapter.", confidence: "high" },
  { siddhiSlug: "bhuvaneshvari-sadhana", kind: "primary", citation: "Bhuvaneśvarī Tantra (in Dīkṣit's paired Chinnamastā evam Bhuvaneśvarī Tantra Śāstra)", url: "https://archive.org/details/chinnamasta-bhuvaneshvari-tantra-dikshit", notes: "Paired edition containing the Bhuvaneśvarī Tantra.", confidence: "high" },
  { siddhiSlug: "bhuvaneshvari-sadhana", kind: "primary", citation: "Bhuvaneśvarī Aṣṭakam (of Rudrayāmala)", url: "https://archive.org/details/rudrayamala-bhuvaneshvari-ashtakam", notes: "Eight-verse hymn from the Rudrayāmala.", confidence: "high" },
  { siddhiSlug: "bhuvaneshvari-sadhana", kind: "scholarly", citation: "D. Kinsley, Tantric Visions of the Divine Feminine (1997, ch. 5)", url: "", notes: "Academic chapter on Bhuvaneśvarī.", confidence: "high" },
  { siddhiSlug: "bhuvaneshvari-sadhana", kind: "scholarly", citation: "P. Bisschop, Early Śaivism and the Skandapurāṇa (2006)", url: "", notes: "Scholarly context on the Śaiva-Śākta milieu.", confidence: "medium" },
  { siddhiSlug: "kamala-sadhana", kind: "primary", citation: "Kamalā Mahāvidyā (Goswami Prahlad Giri, Chowkhamba)", url: "https://archive.org/details/kamala-mahavidya-giri", notes: "Dedicated Kamalā text with paddhati.", confidence: "high" },
  { siddhiSlug: "kamala-sadhana", kind: "primary", citation: "Śākta Praamoda (3 editions, Internet Archive)", url: "https://archive.org/details/sakta-pramoda", notes: "Digest containing Kamalā paddhati among the Mahāvidyā compilations.", confidence: "high" },
  { siddhiSlug: "kamala-sadhana", kind: "primary", citation: "Daśa Mahāvidyā Tantra-Sāra (Yogiraj Yashpal)", url: "https://archive.org/details/dasa-mahavidya-tantra-sara", notes: "Modern digest of the ten Mahāvidyā paddhatis.", confidence: "medium" },
  { siddhiSlug: "kamala-sadhana", kind: "scholarly", citation: "D. Kinsley, Tantric Visions of the Divine Feminine (1997, ch. 9)", url: "", notes: "Academic chapter on Kamalā.", confidence: "high" },
  { siddhiSlug: "kamala-sadhana", kind: "scholarly", citation: "D. Kinsley, Hindu Goddesses (UC Press, 1986)", url: "", notes: "Earlier academic monograph with Kamalā-Lakṣmī discussion.", confidence: "high" },
  { siddhiSlug: "bhairavi-proper-sadhana", kind: "primary", citation: "Bhairavī evam Dhūmāvatī Tantra Śāstra (Pt. Rajesh Dīkṣit, archive.org direct PDF)", url: "https://archive.org/details/bhairavi-dhumavati-tantra-dikshit", notes: "Paired edition containing the Bhairavī Tantra; the primary surviving textual witness.", confidence: "high" },
  { siddhiSlug: "bhairavi-proper-sadhana", kind: "primary", citation: "Rudrayāmala Tantram (Internet Archive)", url: "https://archive.org/details/rudrayamala-tantram", notes: "Source text for the Bhairavī-stotra section.", confidence: "high" },
  { siddhiSlug: "bhairavi-proper-sadhana", kind: "primary", citation: "Śāradā Tilaka, Bhairavī chapter (4 editions)", url: "https://archive.org/details/sarada-tilaka", notes: "The Bhairavī chapter of the Śāradā Tilaka.", confidence: "high" },
  { siddhiSlug: "bhairavi-proper-sadhana", kind: "scholarly", citation: "D. Kinsley, Tantric Visions of the Divine Feminine (1997)", url: "", notes: "Academic discussion of Bhairavī (proper) within the Mahāvidyā framework.", confidence: "high" },
  { siddhiSlug: "bhairavi-proper-sadhana", kind: "scholarly", citation: "S.K. Ramachandra Rao, Encyclopaedia of Indian Iconography (Kalpatharu, 1994)", url: "", notes: "Iconographic analysis of the Bhairavī form.", confidence: "medium" },
  { siddhiSlug: "lakulisha-pashupata-sadhana", kind: "primary", citation: "Pāśupata Sūtras with Kauṇḍinya's Pañcārthabhāṣya, Trivandrum Sanskrit Series 143 (1940, ed. Ananta Kṛṣṇa Śāstrī)", url: "https://archive.org/details/pashupata-sutras-tss-143", notes: "Primary text + only surviving ancient commentary. 3 Internet Archive digitisations incl. English translation.", confidence: "high" },
  { siddhiSlug: "lakulisha-pashupata-sadhana", kind: "primary", citation: "Pashupat Sutram (Chakrapani Trivedi ed., Shaiva Bharati Varanasi #54)", url: "https://archive.org/details/pashupat-sutram-trivedi", notes: "Alternate edition with Hindi commentary.", confidence: "high" },
  { siddhiSlug: "lakulisha-pashupata-sadhana", kind: "scholarly", citation: "Daniel Ingalls, 'Cynics and Pāśupatas' (HJAS, 1962)", url: "", notes: "Foundational academic article on the Pāśupata tradition.", confidence: "high" },
  { siddhiSlug: "lakulisha-pashupata-sadhana", kind: "scholarly", citation: "Alexis Sanderson, 'Śaivism and the Tantric Traditions' (1985); 'The Śaiva Exegesis of Kashmir' (2009)", url: "", notes: "Scholarly survey of the Śaiva milieu within which the Pāśupata tradition is situated.", confidence: "high" },
  { siddhiSlug: "lakulisha-pashupata-sadhana", kind: "scholarly", citation: "Peter Bisschop, Early Śaivism and the Skandapurāṇa (2006)", url: "", notes: "Scholarly analysis of the early Śaiva traditions including Pāśupata.", confidence: "medium" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "primary", citation: "Kaulajñānanirṇaya (Bagchi Calcutta Sanskrit Series, Internet Archive)", url: "https://archive.org/details/kaulajnananirnaya-bagchi", notes: "Primary text attributed to Matsyendranāth. 4 Internet Archive editions available.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "primary", citation: "Kaulajñānanirṇaya (DLI Nepal-manuscript corpus 1934)", url: "https://archive.org/details/kaulajnananirnaya-dli-nepal", notes: "Alternate digitised edition of the same text.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "primary", citation: "Swacchanda Tantra with Kṣemarāja's commentary (2 Internet Archive editions)", url: "https://archive.org/details/svacchanda-tantra-kshemaraja", notes: "Parallel Kashmir-Śaiva recension of the same doctrinal complex.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "scholarly", citation: "D.G. White, The Alchemical Body (Chicago, 1996)", url: "", notes: "Foundational academic monograph on the Nāth siddha tradition.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "scholarly", citation: "J. Mallinson, Khecarīvidyā of Ādinātha (Routledge, 2007)", url: "", notes: "Critical edition and translation of the Nāth khecarī text.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "scholarly", citation: "J. Mallinson & M. Singleton, Roots of Yoga (Penguin, 2017)", url: "", notes: "Comprehensive scholarly sourcebook tracing yoga's Nāth origins.", confidence: "high" },
  { siddhiSlug: "matsyendranath-nath-sadhana", kind: "scholarly", citation: "S. Dasgupta, Obscure Religious Cults (1946, 1962)", url: "", notes: "Early academic study of the Nāth and related traditions.", confidence: "medium" },
];

// ----------------------------------------------------------- REFLECTIONS

export interface ReflectionSeed {
  penName: string;
  siddhiSlug: string;
  title: string;
  body: string;
  tone: string;
}

export const REFLECTION_SEED: ReflectionSeed[] = [
  {
    penName: "a wandering reader",
    siddhiSlug: "pranava-japa",
    title: "The silence after the M",
    body: "I had read the Māṇḍūkya a dozen times before I noticed it says almost nothing about the syllable and everything about what follows it. The practice is the silence. The Oṃ is only the door.",
    tone: "Reverence",
  },
  {
    penName: "S.",
    siddhiSlug: "trataka",
    title: "When the flame became interior",
    body: "Day six. The watering came, and then — unexpectedly — the flame seemed to detach and sit behind my brow. I am documenting the experience rather than believing it. The Archive's caution to remain ordinary is exactly what kept me steady.",
    tone: "Commitment",
  },
  {
    penName: "student of the breath",
    siddhiSlug: "ajapa-japa",
    title: "I did not chant; it was chanting me",
    body: "Somewhere in the third week the effort inverted. The breath kept its own count and I was merely the one in whom it occurred. I do not know what to make of this. I record it because the Archive invites honesty over certainty.",
    tone: "Commitment",
  },
];
