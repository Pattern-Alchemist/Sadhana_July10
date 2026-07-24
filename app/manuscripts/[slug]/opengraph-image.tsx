import { ImageResponse } from "next/og";
import { MANUSCRIPT_SEED } from "@/lib/archive-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgImageParams = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function ManuscriptOpenGraphImage({ params }: OgImageParams) {
  const { slug } = await params;
  const manuscript = MANUSCRIPT_SEED.find((item) => item.slug === slug);

  const title = manuscript?.title ?? "Codex Record";
  const originalTitle = manuscript?.originalTitle ?? "The Living Archive";
  const catalogNumber = manuscript?.catalogNumber ?? "AK-COD";
  const tradition = manuscript?.tradition ?? "AstroKalki Codex Library";
  const century = manuscript?.century ?? "Primary-source catalogue";
  const language = manuscript?.language ?? "Sanskrit";
  const description =
    manuscript?.description ??
    "A catalogued AstroKalki manuscript record with provenance, condition, and source context.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 24% 16%, rgba(201,152,94,0.26), transparent 34%), radial-gradient(circle at 78% 78%, rgba(39,180,168,0.18), transparent 30%), linear-gradient(135deg, #090706 0%, #16100d 50%, #271912 100%)",
          color: "#f5ead5",
          padding: 70,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(201,152,94,0.34)",
            padding: 42,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#c9985e",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            <span>AstroKalki Codex Library</span>
            <span>{catalogNumber}</span>
          </div>

          <div style={{ display: "flex", gap: 42, alignItems: "stretch" }}>
            <div
              style={{
                display: "flex",
                width: 150,
                border: "1px solid rgba(240,201,135,0.55)",
                background: "rgba(245,234,213,0.06)",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 16,
                color: "#f0c987",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              <span style={{ fontSize: 26 }}>Codex</span>
              <span style={{ fontSize: 34 }}>{catalogNumber}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  border: "1px solid rgba(201,152,94,0.55)",
                  borderRadius: 999,
                  padding: "12px 22px",
                  color: "#f0c987",
                  fontSize: 25,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                {tradition} · {century} · {language}
              </div>
              <div
                style={{
                  color: "#fff7e8",
                  fontSize: title.length > 30 ? 76 : 88,
                  lineHeight: 0.95,
                  letterSpacing: -2,
                }}
              >
                {title}
              </div>
              <div style={{ color: "#f0c987", fontSize: 40, lineHeight: 1.16 }}>
                {originalTitle}
              </div>
              <div
                style={{
                  color: "rgba(245,234,213,0.80)",
                  fontSize: 29,
                  lineHeight: 1.28,
                }}
              >
                {description.length > 180 ? `${description.slice(0, 177)}…` : description}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(201,152,94,0.30)",
              paddingTop: 24,
              color: "rgba(245,234,213,0.62)",
              fontSize: 23,
            }}
          >
            <span>Provenance precedes interpretation</span>
            <span>astrokalki.archive</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
