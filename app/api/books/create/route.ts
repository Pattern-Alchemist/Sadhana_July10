import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
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
