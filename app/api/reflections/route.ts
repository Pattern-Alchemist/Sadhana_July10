import { db } from "@/db";
import { reflections } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureArchiveSeeded();
    const rows = await db
      .select()
      .from(reflections)
      .orderBy(desc(reflections.createdAt));
    return Response.json({ reflections: rows });
  } catch (err) {
    console.error("[reflections GET]", err);
    return Response.json({ reflections: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureArchiveSeeded();
    const body = await req.json().catch(() => ({}));
    const penName = String(body?.penName ?? "anonymous reader")
      .slice(0, 80)
      .trim();
    const siddhiSlug = String(body?.siddhiSlug ?? "").slice(0, 120);
    const title = String(body?.title ?? "").slice(0, 200).trim();
    const bodyText = String(body?.body ?? "").slice(0, 4000).trim();
    const tone = String(body?.tone ?? "Curiosity").slice(0, 40);

    if (!title || !bodyText) {
      return Response.json(
        { ok: false, error: "A title and reflection are required." },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(reflections)
      .values({
        penName: penName || "anonymous reader",
        siddhiSlug: siddhiSlug || null,
        title,
        body: bodyText,
        tone,
      })
      .returning();

    return Response.json({ ok: true, reflection: created });
  } catch (err) {
    console.error("[reflections POST]", err);
    return Response.json(
      { ok: false, error: "Could not inscribe the reflection." },
      { status: 500 }
    );
  }
}


