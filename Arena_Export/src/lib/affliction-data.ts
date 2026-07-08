/**
 * Affliction-to-practice cross-reference data.
 *
 * Maps common afflictions to the siddhis / practices the tradition
 * prescribes for them. Each mapping includes the textual source and
 * the caution level.
 *
 * Framing: "the tradition holds" not "this will work". The healer's
 * quick-reference — not a medical prescription.
 */

export interface AfflictionMapping {
  affliction: string;
  sanskrit?: string;
  category: "physical" | "psychological" | "spiritual" | "karmic" | "protective";
  description: string;
  prescribedPractices: {
    siddhiSlug?: string;
    practiceName: string;
    source: string;
    caution: "moderate" | "high";
    note: string;
  }[];
}

export const AFFLICTIONS: AfflictionMapping[] = [
  {
    affliction: "Fear of death / mortality anxiety",
    sanskrit: "mṛtyu-bhaya",
    category: "psychological",
    description: "The contemplative confrontation with mortality — one of the most fundamental human afflictions. The tradition holds that the Mahāmṛtyuñjaya mantra, properly recited, dissolves the fear of death (not death itself).",
    prescribedPractices: [
      {
        siddhiSlug: "mahamrityunjaya",
        practiceName: "Mahāmṛtyuñjaya Mantra Japa",
        source: "Ṛgveda VII.59.12",
        caution: "moderate",
        note: "The 'death-conquering' verse. Held to liberate from the fear and bondage of mortality, not to postpone biological death. The cucumber-from-vine simile encodes a theology of willing release.",
      },
      {
        siddhiSlug: "pranava-japa",
        practiceName: "Pranava Japa (Oṃ)",
        source: "Māṇḍūkya Upaniṣad",
        caution: "moderate",
        note: "The Māṇḍūkya parses Oṃ into three states + turīya (the fourth). The contemplation of turīya — the witnessing awareness beyond waking, dream, and deep sleep — is held to dissolve the identification with the mortal body.",
      },
    ],
  },
  {
    affliction: "Spirit-affliction / preta-saṁvāda",
    sanskrit: "bhūta-graha",
    category: "spiritual",
    description: "Affliction by restless spirits (preta) or unseen forces. The Śākta-Atharvaṇa tradition documents protective and release rites for this condition. HIGH CAUTION — requires lineage transmission.",
    prescribedPractices: [
      {
        siddhiSlug: "pratyangira-devi-sadhana",
        practiceName: "Pratyaṅgirā Devī Sādhana",
        source: "Atharvānokta Pratyaṅgirā Vidhāna",
        caution: "high",
        note: "The protective goddess of the Atharvaṇa tradition. Invoked to neutralise hostile mantra, abhicāra, or spirit-affliction. Requires dīkṣā.",
      },
      {
        siddhiSlug: "preta-siddhi",
        practiceName: "Preta-Saṁvāda (Spirit Dialogue)",
        source: "Preta-Siddhi Field Manual",
        caution: "high",
        note: "Direct engagement with the preta to identify the cause of binding and facilitate release. The most dangerous of the spirit-affliction rites — only for the prepared practitioner.",
      },
      {
        siddhiSlug: "kala-bhairava-sadhana",
        practiceName: "Kāla Bhairava Aṣṭākṣara",
        source: "Svacchanda Tantra",
        caution: "high",
        note: "The fierce form of Śiva associated with time, death, and threshold-protection. Invoked as a protective mantle against spirit-affliction.",
      },
    ],
  },
  {
    affliction: "Hostile mantra / abhicāra directed at self or other",
    sanskrit: "abhicāra",
    category: "protective",
    description: "When hostile mantra or ritual has been directed at a person, the tradition prescribes specific protective rites. The healer's role is neutralisation, never counter-attack.",
    prescribedPractices: [
      {
        siddhiSlug: "pratyangira-devi-sadhana",
        practiceName: "Pratyaṅgirā Devī Sādhana",
        source: "Pratyaṅgirā Kalpa",
        caution: "high",
        note: "The primary Atharvaṇa protective rite for neutralising hostile mantra.",
      },
      {
        siddhiSlug: "sudarshana-chakra-sadhana",
        practiceName: "Sudarśana Chakra Sādhana",
        source: "Ahirbudhnya Saṃhitā",
        caution: "moderate",
        note: "The Pāñcarātra protective rite. Sudarśana is the discus of Viṣṇu — the instrument of dharma-protection. Used for community-level protection.",
      },
      {
        siddhiSlug: "bagalamukhi-sadhana",
        practiceName: "Bagalāmukhī Sādhana",
        source: "Todala Tantra",
        caution: "high",
        note: "The eighth Mahāvidyā, embodying stambhana (paralysis). Used to arrest hostile speech and intent. Advanced practice — requires dīkṣā.",
      },
    ],
  },
  {
    affliction: "Insomnia / restless mind",
    sanskrit: "anidra",
    category: "physical",
    description: "Inability to sleep due to mental agitation. The tradition holds that specific breath practices and mantra settle the mind and prepare it for rest.",
    prescribedPractices: [
      {
        siddhiSlug: "nadi-shuddhi",
        practiceName: "Nāḍī Śuddhi (Alternate-Nostril Breath)",
        source: "Haṭha Yoga Pradīpikā II.7-14",
        caution: "moderate",
        note: "Balances the breath between the two nostrils, steadying the autonomic state. The foundational breath practice for calming the mind before sleep.",
      },
      {
        siddhiSlug: "yoga-nidra",
        practiceName: "Yoga Nidrā",
        source: "Māṇḍūkya Upaniṣad",
        caution: "moderate",
        note: "The state of conscious sleep — the body rests while awareness remains. A documented method for deep physiological rest.",
      },
      {
        siddhiSlug: "soham-dhyana",
        practiceName: "So'ham Dhyāna",
        source: "Bṛhadāraṇyaka Upaniṣad",
        caution: "moderate",
        note: "The breath-mantra 'I am That' — tracing the inhale (sa) and exhale (ham). Settles the mind into the witnessing awareness.",
      },
    ],
  },
  {
    affliction: "Grief / loss / emotional stuckness",
    sanskrit: "śoka",
    category: "psychological",
    description: "The stuckness of unprocessed grief. The tradition holds that breath and sound practices can move the prāṇa through the heart center, facilitating release.",
    prescribedPractices: [
      {
        siddhiSlug: "kumbhaka",
        practiceName: "Kumbhaka (Breath Retention)",
        source: "Yoga Sūtras II.49-52",
        caution: "moderate",
        note: "Patañjali holds that kumbhaka 'thins the veil' — the retention creates a space in which stuck emotional patterns can surface and dissolve.",
      },
      {
        practiceName: "Shaman's Triangle Breath",
        source: "5 Rare Breath Magic Techniques",
        caution: "moderate",
        note: "The three sharp inhales + sternum tap + voiced exhale is held to open the heart space and release old grief. A somatic release technique.",
      },
      {
        siddhiSlug: "pranava-japa",
        practiceName: "Pranava Japa (Oṃ)",
        source: "Māṇḍūkya Upaniṣad",
        caution: "moderate",
        note: "The resonance of Oṃ is held to attenuate verbal thought into silence — the space in which grief can be witnessed rather than resisted.",
      },
    ],
  },
  {
    affliction: "Anxiety / ungroundedness",
    sanskrit: "citta-udvega",
    category: "psychological",
    description: "The agitation of the mind-stuff (citta). The tradition prescribes grounding breath, mantra, and concentration practices.",
    prescribedPractices: [
      {
        siddhiSlug: "trataka",
        practiceName: "Trāṭaka (Steady Gazing)",
        source: "Gheraṇḍa Saṃhitā I.54",
        caution: "moderate",
        note: "Fixing the eyes on a single point (typically a candle flame) concentrates the mind and stabilises the outward-flowing attention that feeds anxiety.",
      },
      {
        siddhiSlug: "nadi-shuddhi",
        practiceName: "Nāḍī Śuddhi",
        source: "Haṭha Yoga Pradīpikā",
        caution: "moderate",
        note: "The alternate-nostril breath balances the sympathetic/parasympathetic systems — the most direct physiological intervention for anxiety.",
      },
      {
        siddhiSlug: "chakra-dharana",
        practiceName: "Mūlādhāra Dhāraṇā",
        source: "Ṣaṭ-Cakra-Nirūpaṇa",
        caution: "moderate",
        note: "Concentration on the mūlādhāra (root cakra) — the earth element. Grounds the upward-flowing anxiety energy back into the body's base.",
      },
    ],
  },
  {
    affliction: "Karmic obstruction / ṛṇa (unpaid debt)",
    sanskrit: "ṛṇa-bandhana",
    category: "karmic",
    description: "The sense of being bound by karmic debts — to ancestors, to places, to unresolved obligations. The tradition prescribes piṇḍa-dāna and mantra-japa for release.",
    prescribedPractices: [
      {
        siddhiSlug: "mahamrityunjaya",
        practiceName: "Mahāmṛtyuñjaya Mantra",
        source: "Ṛgveda VII.59.12",
        caution: "moderate",
        note: "Held to dissolve the karmic bonds associated with mortality — the 'cucumber from its vine' simile encodes a willing release of karmic attachment.",
      },
      {
        siddhiSlug: "sandhya-vandanam",
        practiceName: "Sandhyā Vandanam",
        source: "Taittirīya Āraṇyaka",
        caution: "moderate",
        note: "The thrice-daily Vedic rite includes the tarpaṇa (offering to ancestors) — held to discharge ṛṇa toward the lineage.",
      },
    ],
  },
  {
    affliction: "Need for protection of a space / community",
    sanskrit: "rakṣā",
    category: "protective",
    description: "When a physical space or a community needs protection from hostile forces. The Pāñcarātra and Śākta traditions prescribe specific protective rites.",
    prescribedPractices: [
      {
        siddhiSlug: "sudarshana-chakra-sadhana",
        practiceName: "Sudarśana Chakra Sādhana",
        source: "Ahirbudhnya Saṃhitā",
        caution: "moderate",
        note: "The Pāñcarātra protective rite for dharma-protection at the community level. Sudarśana is the active, protective aspect of Viṣṇu.",
      },
      {
        siddhiSlug: "kala-bhairava-sadhana",
        practiceName: "Kāla Bhairava Sādhana",
        source: "Svacchanda Tantra",
        caution: "high",
        note: "Bhairava as the guardian of sacred thresholds — invoked to protect a space from hostile entry.",
      },
    ],
  },
];

export const AFFLICTION_CATEGORIES: Record<AfflictionMapping["category"], string> = {
  physical: "Physical",
  psychological: "Psychological",
  spiritual: "Spiritual",
  karmic: "Karmic",
  protective: "Protective",
};
