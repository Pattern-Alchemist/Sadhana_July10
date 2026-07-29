import { getDb, isDatabaseAvailable } from "@/db";
import { aaghadMantras } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    if (!isDatabaseAvailable()) {
      return Response.json(
        { 
          error: "Database not connected",
          mantras: [] 
        },
        { status: 503 }
      );
    }

    const db = getDb();
    const mantras = await db
      .select()
      .from(aaghadMantras)
      .orderBy(asc(aaghadMantras.title));

    return Response.json({ mantras }, { status: 200 });
  } catch (error) {
    console.error("Error fetching mantras:", error);
    return Response.json(
      { error: "Failed to fetch mantras", mantras: [] },
      { status: 500 }
    );
  }
}
