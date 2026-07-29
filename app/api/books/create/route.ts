import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const userId = 'user-demo-001'
    const body = await request.json()
    const { title, author, fileSize } = body

    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 })
    }

    const result = await db
      .insert(books)
      .values({
        userId,
        title,
        author: author || 'Unknown',
        fileSize: fileSize || 0,
        processingStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('[v0] Book creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
