/**
 * Lineage Transmission Maps
 * Branching scholarly reconstruction of how teachings are said to have
 * moved through teachers and texts. Framed as tradition's own account,
 * not as settled history.
 */

export interface LineageNode {
  id: string;
  label: string;
  detail: string;
  era: string;
  children?: LineageNode[];
}

export interface LineageTree {
  key: string;
  title: string;
  region: string;
  root: LineageNode;
}

export const lineages: LineageTree[] = [
  {
    key: "nath",
    title: "The Nāth Current",
    region: "North & West India",
    root: {
      id: "adinath",
      label: "Ādinātha (Śiva)",
      detail: "Mythopoetic origin of haṭha and kuṇḍalinī teachings.",
      era: "Primordial",
      children: [
        {
          id: "matsyendra",
          label: "Matsyendranātha",
          detail: "Credited founder of the Kaula Nāth lineage; Kāmarūpa.",
          era: "c. 9th–10th c.",
          children: [
            {
              id: "gorakh",
              label: "Gorakṣanātha",
              detail: "Systematized haṭha yoga; the organizing saint of the order.",
              era: "c. 11th–12th c.",
              children: [
                {
                  id: "svatmarama",
                  label: "Svātmārāma",
                  detail: "Compiler of the Haṭha Yoga Pradīpikā.",
                  era: "c. 15th c.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    key: "srividya",
    title: "The Śrī Vidyā Tradition",
    region: "South India",
    root: {
      id: "dakshinamurti",
      label: "Dakṣiṇāmūrti",
      detail: "Silent teacher form of Śiva; symbolic fount of the lineage.",
      era: "Primordial",
      children: [
        {
          id: "hayagriva",
          label: "Hayagrīva → Agastya",
          detail: "Transmission of the Lalitā cult to the sage Agastya.",
          era: "Legendary",
          children: [
            {
              id: "sankara",
              label: "Ādi Śaṅkara",
              detail: "Associated with the Saundarya Laharī and Śrī Cakra worship.",
              era: "c. 8th c.",
              children: [
                {
                  id: "bhasuranandanatha",
                  label: "Bhāskararāya",
                  detail: "Commentator on the Lalitā Sahasranāma; set worship norms.",
                  era: "c. 18th c.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    key: "trika",
    title: "Trika Śaivism (Kashmir)",
    region: "Kashmir",
    root: {
      id: "siva",
      label: "Śiva (Paramaśiva)",
      detail: "Source of the Recognition (pratyabhijñā) teachings.",
      era: "Primordial",
      children: [
        {
          id: "somnanda",
          label: "Somānanda",
          detail: "Founder of the Recognition school; Śiva Dṛṣṭi.",
          era: "c. 9th c.",
          children: [
            {
              id: "uttasomadeva",
              label: "Utpaladeva",
              detail: "Composed the Īśvara Pratyabhijñā Kārikā.",
              era: "c. 10th c.",
              children: [
                {
                  id: "abhinava",
                  label: "Abhinavagupta",
                  detail: "Master synthesizer; Tantrāloka, the encyclopedic opus.",
                  era: "c. 11th c.",
                  children: [
                    {
                      id: "ksemaraja",
                      label: "Kṣemarāja",
                      detail: "Direct disciple; codified Pratyabhijñā philosophy.",
                      era: "c. 11th c.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
