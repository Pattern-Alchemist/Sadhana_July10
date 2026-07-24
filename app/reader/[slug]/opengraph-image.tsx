import { ImageResponse } from "next/og";
import { getReaderEntry } from "@/lib/reader-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgImageParams = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function ReaderOpenGraphImage({ params }: OgImageParams) {
  const { slug } = await params;
  const entry = getReaderEntry(slug);

  const title = entry?.title ?? "Reader";
  const tradition = entry?.tradition ?? "Tradition";
  const century = entry?.century ?? "Century";
  const source = entry?.source ?? "Source";
  const english = entry?.english ?? "AstroKalki Reader Verse";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 10%, rgba(201,152,94,0.30), transparent 32%), radial-gradient(circle at 82% 18%, rgba(127,90,240,0.22), transparent 28%), linear-gradient(135deg, #0b0807 0%, #18100d 54%, #2a1710 100%)",
          color: "#f5ead5",
          padding: 72,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#c9985e",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <span>AstroKalki</span>
          <span>Reader Folio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(201,152,94,0.55)",
              borderRadius: 999,
              padding: "12px 22px",
              color: "#f0c987",
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {tradition} · {century}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                color: "#fff7e8",
                fontSize: title.length > 32 ? 78 : 92,
                lineHeight: 0.94,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>
            <div style={{ color: "#f0c987", fontSize: 38, lineHeight: 1.18 }}>
              {source}
            </div>
          </div>
          <div
            style={{
              maxWidth: 930,
              color: "rgba(245,234,213,0.82)",
              fontSize: 30,
              lineHeight: 1.28,
            }}
          >
            {english.length > 170 ? `${english.slice(0, 167)}…` : english}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(201,152,94,0.35)",
            paddingTop: 26,
            color: "rgba(245,234,213,0.62)",
            fontSize: 24,
          }}
        >
          <span>Scholarly pointers, not prescriptions</span>
          <span>astrokalki.archive</span>
        </div>
      </div>
    ),
    size
  );
}
