#!/usr/bin/env python3
"""
AstroKalki — Add yantra fields to siddhis that lack them.
Inserts a `yantra: { name, description, symbolism }` block before the closing `},` of each siddhi object that doesn't already have one.
"""

import re
from pathlib import Path

ARCHIVE = Path("/home/z/my-project/workspace/Arena_Export/src/lib/archive-data.ts")

YANTRAS = {
    "dakshina-kali-sadhana": {
        "name": "Dakṣiṇa Kālī Yantra",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle containing three horizontal tripuṇḍra lines (Śiva's forehead mark). The Kālī bīja krīṁ sits at the central bindu. A 15-skull muṇḍamālā (garland of skulls) rings the triangle's perimeter, encoding the dissolution of the fifty letters of the Sanskrit alphabet.",
        "symbolism": "The inverted triangle is the yoni (the matrix of manifestation). The tripuṇḍra within signals Śiva's presence as the passive consciousness beneath Kālī's active power. The skull-garland encodes the sonic matrix from which manifestation arises — and its dissolution back into silence.",
    },
    "shodashi-tripurasundari-sadhana": {
        "name": "Śrī Cakra (Śrī Yantra)",
        "description": "The most iconic tantric yantra: a square bhūpura with four gates, enclosing three concentric circles, a 16-petalled lotus, an 8-petalled lotus, and nine interlocking triangles (navayoni) — four upward (Śiva) and five downward (Śakti) — whose intersections form 43 smaller triangles converging on the central bindu. Described in the Vāmakeśvara Tantra and the Bhāvanā Upaniṣad.",
        "symbolism": "The nine triangles are the cosmic matrix: Śiva (upward) and Śakti (downward) interlocking to produce the 43-fold field of manifestation. The 16- and 8-petalled lotuses are the petals of creation and dissolution. The central bindu is Ṣoḍaśī herself — the unmanifest source from which all form arises and into which all form dissolves.",
    },
    "bhuvaneshvari-sadhana": {
        "name": "Bhuvaneśvarī Yantra",
        "description": "A square bhūpura with four gates, enclosing a 16-petalled lotus, within which is an 8-petalled lotus, within which is an inverted yoni-triangle with the Bhuvaneśvarī bīja hrīṁ at the central bindu. Described in the Śāradā Tilaka and Śākta Praamoda.",
        "symbolism": "The 16- and 8-petalled lotuses are the full field of manifestation. The inverted triangle is the yoni — the Goddess as the sovereign creative matrix from which the fourteen bhuvanas (worlds) arise. The bindu is Bhuvaneśvarī herself, the Queen seated at the heart of her kingdom.",
    },
    "kamala-sadhana": {
        "name": "Kamalā Yantra",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is a 16-petalled lotus (note the inverted order from Bhuvaneśvarī — Kamalā's signature), within which is an inverted yoni-triangle with the Kamalā bīja srīṁ at the central bindu. Two small elephant silhouettes flank the central lotus, referencing the gaja-bathing (Lakṣmī) iconography. Described in the Kamalā Mahāvidyā and Śākta Praamoda.",
        "symbolism": "The 8-then-16 lotus order inverts the standard hierarchy, signalling the Goddess's playful reversal of cosmic structure. The two elephants are the gaja-bathing motif — the royal consecration of the Goddess by the cosmic elephants of the directions. The bindu is Kamalā herself, the abundant gift-bestowing form.",
    },
    "bhairavi-proper-sadhana": {
        "name": "Bhairavī Yantra",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle with the Bhairavī bīja hrīṁ at the central bindu, ringed by a rosary-motif (the teacher attribute). Described in the Śāradā Tilaka Bhairavī chapter and the Bhairavī Tantra.",
        "symbolism": "The inverted triangle is the yoni-as-teaching — the Goddess as the Guru who transmits both practice (the rosary-motif) and knowledge (the book she holds in her iconography). The bindu is Bhairavī herself, the inner Guru who awakens Kundalinī and grants the direct experiential wisdom that no external book can convey.",
    },
    "dhumavati-sadhana": {
        "name": "Dhūmāvatī Yantra",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus rendered in rose accent (the inauspicious register), within which is an asymmetric inverted triangle (the apex displaced, the top edge tilted — the alakṣmī form). The Dhūmāvatī bīja dhūṁ sits at the central bindu in rose accent. A small crow silhouette (the vāhana) hovers above the bindu. Described in the Dhūmāvatī Tantra and Śākta Praamoda.",
        "symbolism": "The asymmetry of the triangle encodes the deliberate inauspiciousness — the Goddess in her aspect of all-that-is-rejected (decay, hunger, widowhood, ugliness). The crow is the vāhana of death and liminal spaces. The bindu is Dhūmāvatī herself, the wisdom that arises through direct confrontation with what society wards off.",
    },
    "matangi-sadhana": {
        "name": "Mātaṅgī Yantra (Ucchiṣṭa Caṇḍālinī)",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle with the Mātaṅgī bīja aim̐ at the central bindu. A small bowl-with-offering (the ucchiṣṭa motif) is rendered below the bindu, referencing the leftover-food offering that inverts the standard purity protocol. Described in the Gandharva Tantra and Śākta Praamoda.",
        "symbolism": "The ucchiṣṭa-bowl motif is the contemplative instrument — the deliberate inversion of purity protocol signalling that Mātaṅgī embodies the wisdom accessible through the marginalised, the rejected, and the leftover. The bindu is Mātaṅgī herself, the outcaste Goddess who grants mastery over all forms of expression.",
    },
    "tara-ugra-sadhana": {
        "name": "Tārā (Ugra) Yantra",
        "description": "A square bhūpura with four gates, enclosing an 8-petalled lotus, within which is an inverted yoni-triangle containing a small śava (corpse) silhouette — the corpse-seat that distinguishes Ugra Tārā from Dakṣiṇa Kālī. The Tārā bīja-strīṁ sits at the central bindu. A garland of twelve severed-head ovals rings the triangle's perimeter. Described in the Bṛhad Nīla Tantra and Tārā Tantra.",
        "symbolism": "The corpse within the triangle is the Śava-āsana (corpse-seat) — the contemplative frame of the death-state, distinguishing the Hindu Ugra Tārā from the Tibetan Buddhist Tārā traditions. The severed-head garland is the muṇḍamālā, the dissolution of differentiated identity. The bindu is Ugra Tārā herself, the fierce protective form of the Goddess.",
    },
    "tripura-bhairavi-sadhana": {
        "name": "Tripura Bhairavī Yantra",
        "description": "A square bhūpura with four gates, enclosing a 16-petalled lotus and an 8-petalled lotus, within which is the sadbhūja-cakra (six-triangle interlock) — three upward Śiva triangles and three downward Śakti triangles, simplified from the full nine-triangle Śrī Cakra. The bindu region uses a red-tinted (rose-gold mix) accent to signal the fierce aspect. The Tripura Bhairavī bīja aim̐ hrīṁ srīṁ sits at the central bindu. Described in the Śāradā Tilaka ch. 11 and Paraśurāma Kalpasūtra.",
        "symbolism": "The sadbhūja-cakra (six-triangle interlock) is the fierce-form variant of the Śrī Cakra — the same Śiva-Śakti interplay in its transformative, Kundalinī-awakened register. The red-tinted bindu signals the awakened ascendant mode of the Goddess. The bindu is Tripura Bhairavī herself, the fierce culmination of the Śrī Vidyā graduated path.",
    },
    "smasana-bhairavi-sadhana": {
        "name": "Smāśāna Bhairavī Yantra",
        "description": "A square bhūpura in rose accent (the only yantra with rose-tinted gates, signalling the cremation-ground register), enclosing scattered skull-with-crossbones motifs around a central inverted yoni-triangle. Three nested funeral-pyre flame shapes rise above the triangle. The Smāśāna Bhairavī bīja hrīṁ hūṃ sits at the central bindu. Described in the Brahmayāmala Tantra and Jayadrathayāmala.",
        "symbolism": "The rose-tinted bhūpura is the śmaśāna (cremation ground) itself — the liminal space where the dissolution of form is most directly visible. The skull-and-crossbones motifs are the death-field iconography. The funeral-pyre flames are the transformative aspect. The bindu is Smāśāna Bhairavī herself, the Goddess in her most liminal aspect — the wisdom of the death-frame.",
    },
    "guhyakali-sadhana": {
        "name": "Guhyakālī Yantra",
        "description": "The most elaborate Śākta-Kālī yantra: a square bhūpura with four gates, enclosing a 16-petalled lotus, an 8-petalled lotus, an 8-segment directional circle (aṣṭa-dik-mātṛkā with 8 bījas: aiṁ, hrīṁ, klīṁ, hūṁ, phaṭ, vauṁ, sauḥ, srīṁ), a 10-pointed star (daśa-bhuja-cakra, the ten arms), and a 50-dot pañcāśad-akṣara-mālā (the fifty-letter garland) around the central bindu. The Guhyakālī bīja hrīṁ klīṁ hūṃ sits at the bindu. Described in the Mahākāla Saṃhitā Guhyakālī Khaṇḍa.",
        "symbolism": "The 8-segment circle is the aṣṭa-dik-mātṛkā — the Goddess in her eight directional forms. The 10-pointed star is the daśa-bhuja (ten-armed) form, the operational power of the Goddess in all directions. The 50-dot garland is the mātṛkā (the fifty letters of the Sanskrit alphabet), the sonic matrix from which manifestation arises. The bindu is Guhyakālī herself — the secret Kālī, the Goddess as the source of all sound and form.",
    },
    "lakulisha-pashupata-sadhana": {
        "name": "Pāśupata Liṅga Diagram",
        "description": "A simple diagram of the Lakulīśa liṅga — a vertical line (the liṅga) with a horizontal line through its upper third (the club / lakula), within a square frame bearing the pañcākṣara 'Namaḥ Śivāya' at the four gates. Unlike the Mahāvidyā yantras, the Pāśupata tradition is conduct-centric rather than mantra-centric, so the diagram is iconographic rather than operational.",
        "symbolism": "The liṅga is the aniconic form of Śiva — the unmanifest sign. The club (lakula) is Lakulīśa's identifying attribute, signaling the historical founder of the Pāśupata order. The pañcākṣara at the four gates is the public mantra of the tradition. The diagram is a contemplative aid, not an activated ritual object — the Pāśupata path is undertaken through vows and conduct rather than yantra-pūjā.",
    },
    "matsyendranath-nath-sadhana": {
        "name": "Nāth Cakra Diagram",
        "description": "A diagram of the six-cakra system central to the Nāth tradition: six horizontal lotus-forms stacked vertically along a central axis (the suṣumṇā nāḍī), from the mūlādhāra (four-petalled, base) to the sahasrāra (thousand-petalled, crown). The iḍā (left) and piṅgalā (right) nāḍīs weave around the central axis. The So'ham breath-mantra is inscribed along the central axis.",
        "symbolism": "The six cakras are the astral-body framework that the Nāth tradition developed and bequeathed to later Haṭha Yoga. The suṣumṇā is the central channel through which Kuṇḍalinī ascends. The iḍā and piṅgalā are the lunar and solar channels that weave around it. The So'ham ('I am That') mantra is the breath-mantra — the public core practice of the Nāth tradition.",
    },
}


def main():
    text = ARCHIVE.read_text(encoding="utf-8")
    for slug, y in YANTRAS.items():
        # Find the siddhi object by slug
        # The yantra field should be inserted before the closing `},` of the siddhi object
        # Pattern: find `slug: "<slug>"` then walk to the matching `},` and insert before it
        slug_pat = re.compile(rf'slug:\s*"{re.escape(slug)}"')
        m = slug_pat.search(text)
        if not m:
            print(f"  ! {slug}: not found")
            continue
        # Check if yantra field already exists in this siddhi block (next ~3000 chars)
        block_start = m.start()
        block_end = text.find("\n  {", block_start + 10)  # next siddhi start
        if block_end == -1:
            block_end = text.find("\n];", block_start)
        block = text[block_start:block_end]
        if "yantra:" in block:
            print(f"  - {slug}: already has yantra field, skipping")
            continue
        # Find the last `    ],\n  },` in the block (the faq array close + siddhi close)
        # The actual structure is:
        #       { q: "...", a: "..." },
        #     ],
        #   },
        # We want to insert the yantra field between `],` and `\n  },`
        faq_close_pat = re.compile(r'(    \],\n)(  \},)')
        # Search within the block
        block_text = text[block_start:block_end]
        fms = list(faq_close_pat.finditer(block_text))
        if not fms:
            print(f"  ! {slug}: couldn't find faq close to anchor yantra insert")
            continue
        last_faq_close = fms[-1]
        # The match positions are relative to block_text; convert to absolute
        insert_pos = block_start + last_faq_close.end(1)  # after `    ],\n`, before `  },`
        # Build the yantra block with proper indentation
        # Insert between `    ],\n` and `  },`
        # The yantra field goes at the siddhi's indentation level (4 spaces for the field,
        # since the siddhi object is at 2-space indent and its fields are at 4-space)
        indent = "    "
        yantra_block = (
            f"{indent}yantra: {{\n"
            f'{indent}  name: "{y["name"]}",\n'
            f'{indent}  description: "{y["description"]}",\n'
            f'{indent}  symbolism: "{y["symbolism"]}",\n'
            f"{indent}}},\n"
        )
        text = text[:insert_pos] + yantra_block + text[insert_pos:]
        print(f"  + {slug}: yantra field inserted")

    ARCHIVE.write_text(text, encoding="utf-8")
    print("\nDone.")


if __name__ == "__main__":
    main()
