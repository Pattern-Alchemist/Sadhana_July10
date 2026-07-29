import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      command,
      transcript,
      guruResponse,
      practiceContext,
    } = body;

    // Validate required fields
    if (!userId || !transcript) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log voice interaction
    const voiceLog = {
      userId,
      command,
      transcript,
      guruResponse,
      practiceContext,
      createdAt: new Date(),
    };

    // TODO: Save to database (aghad_voice_logs table)
    console.log("[v0] Voice Log:", voiceLog);

    return NextResponse.json(
      {
        success: true,
        message: "Voice interaction logged",
        voiceLog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Voice API error:", error);
    return NextResponse.json(
      { error: "Failed to log voice interaction" },
      { status: 500 }
    );
  }
}

// Get Guru response based on user input
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Missing query parameter" },
        { status: 400 }
      );
    }

    // Simple keyword matching for Guru responses
    const responses: Record<string, string> = {
      meditation: "Meditation is the gateway to inner silence. Sit with spine straight, close your eyes, and watch your breath without control.",
      mantra: "Mantras are sacred vibrations that attune your consciousness to higher frequencies. Chant with reverence and presence.",
      kundalini: "Kundalini is the divine energy coiled at your spine. Through systematic practice, it awakens and ascends through the chakras.",
      chakra: "Each chakra governs different aspects of consciousness. Root: stability, Sacral: creativity, Solar Plexus: power, Heart: love, Throat: truth, Third Eye: intuition, Crown: unity.",
      practice: "Consistency is the foundation of enlightenment. Practice daily with full presence. Trust the process.",
      difficulty: "Difficulties are blessings. They reveal areas needing healing. Continue with patience and reverence.",
      progress: "Progress is not linear. Some days you feel expanded, others contracted. This is natural. Trust the journey.",
    };

    const lowerQuery = query.toLowerCase();
    let response = "Om namah shivaya. I am here to guide you. Ask about meditation, mantras, chakras, kundalini, or your practice.";

    for (const [key, value] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        response = value;
        break;
      }
    }

    return NextResponse.json(
      {
        success: true,
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Voice API error:", error);
    return NextResponse.json(
      { error: "Failed to get Guru response" },
      { status: 500 }
    );
  }
}
