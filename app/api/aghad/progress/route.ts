import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      courseSlug,
      currentModule,
      totalHoursCompleted,
      currentStreak,
      completedModules,
      enlightenmentProgress,
      completedPractices,
    } = body;

    // Validate required fields
    if (!userId || !courseSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you would save to database
    // For now, return success response
    const progress = {
      userId,
      courseSlug,
      currentModule,
      totalHoursCompleted,
      currentStreak,
      completedModules,
      enlightenmentProgress,
      completedPractices,
      updatedAt: new Date(),
    };

    // TODO: Save to database (aghad_user_progress table)

    return NextResponse.json(
      {
        success: true,
        message: "Progress saved successfully",
        progress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Progress API error:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const courseSlug = request.nextUrl.searchParams.get("courseSlug");

    if (!userId || !courseSlug) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // TODO: Fetch from database
    const progress = {
      userId,
      courseSlug,
      currentModule: 1,
      totalHoursCompleted: 0,
      currentStreak: 0,
      completedModules: [],
      enlightenmentProgress: 0,
      completedPractices: [],
    };

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("[v0] Progress API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
