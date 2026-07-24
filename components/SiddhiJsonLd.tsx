import type { Siddhi, EvidenceSource } from "@/db/schema";
import { getSiteUrl } from "@/lib/seo";

/**
 * Emits Schema.org structured data (JSON-LD) for siddhi folios.
 *
 * Includes:
 *   - Article: the siddhi as a scholarly article
 *   - BreadcrumbList: the navigation path
 *   - Dataset (embedded): the evidence sources as structured data
 *
 * This is server-rendered and inserted into the <head> via Next.js metadata.
 * Google rich results will pick this up for siddhi folios.
 */

interface Props {
  siddhi: Siddhi;
  evidence: EvidenceSource[];
}

export function SiddhiJsonLd({ siddhi, evidence }: Props) {
  const baseUrl = getSiteUrl();
  const siddhiUrl = `${baseUrl}/siddhi/${siddhi.slug}`;
  const archiveUrl = `${baseUrl}/archive`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": siddhiUrl,
    "url": siddhiUrl,
    "headline": siddhi.name,
    "alternativeHeadline": siddhi.sanskrit ?? undefined,
    "description": siddhi.summary ?? undefined,
    "articleBody": siddhi.description ?? undefined,
    "articleSection": siddhi.category ?? undefined,
    "keywords": [
      siddhi.category,
      siddhi.tradition,
      siddhi.level,
      ...(siddhi.benefits as string[] ?? []),
    ].filter(Boolean).join(", "),
    "inLanguage": ["en", "sa"],
    "author": {
      "@type": "Organization",
      "name": "AstroKalki · The Living Archive",
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "AstroKalki",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "about": {
      "@type": "Thing",
      "name": siddhi.name,
      "description": siddhi.summary ?? undefined,
    },
    "isPartOf": {
      "@type": "Collection",
      "name": "AstroKalki Siddhi Corpus",
      "url": archiveUrl,
    },
    "citation": evidence.map((e) => ({
      "@type": "CreativeWork",
      "text": e.citation ?? undefined,
      "url": e.url ?? undefined,
      "description": e.notes ?? undefined,
    })),
    "educationalLevel": siddhi.level ?? undefined,
    "learningResourceType": "Scholarly Article",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Archive",
        "item": archiveUrl,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": siddhi.name,
        "item": siddhiUrl,
      },
    ],
  };

  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `Evidence sources for ${siddhi.name}`,
    "description": `${evidence.length} textual citations supporting the ${siddhi.name} folio, with confidence ratings and source URLs.`,
    "url": siddhiUrl,
    "creator": {
      "@type": "Organization",
      "name": "AstroKalki",
    },
    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    "isAccessibleForFree": true,
    "keywords": ["tantra", "siddhi", "evidence", siddhi.category, siddhi.tradition].filter(Boolean),
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "citation",
        "description": "The textual citation (e.g. 'Ṛgveda VII.59.12')",
      },
      {
        "@type": "PropertyValue",
        "name": "kind",
        "description": "primary text, commentary, or modern scholarship",
      },
      {
        "@type": "PropertyValue",
        "name": "confidence",
        "description": "high, medium, or low",
      },
      {
        "@type": "PropertyValue",
        "name": "url",
        "description": "permanent archive URL (Internet Archive, Muktabodha, etc.)",
      },
    ],
    "distribution": evidence.map((e) => ({
      "@type": "DataDownload",
      "name": e.citation ?? "Unnamed source",
      "encodingFormat": "text/html",
      "contentUrl": e.url ?? undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [article, breadcrumb, dataset],
        }),
      }}
    />
  );
}
