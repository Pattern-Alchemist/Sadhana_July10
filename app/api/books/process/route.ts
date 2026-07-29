import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { books } from '@/lib/db/schema'
import { processBook } from '@/lib/book-to-skill'

export async function POST(request: NextRequest) {
  try {
    const userId = 'user-demo-001'
    const body = await request.json()
    const { bookId, extractedText, title, author } = body

    if (!bookId || !extractedText) {
      return NextResponse.json(
        { error: 'bookId and extractedText required' },
        { status: 400 }
      )
    }

    // Update book status to processing
    const { eq } = await import('drizzle-orm')
    await db
      .update(books)
      .set({
        processingStatus: 'processing',
        updatedAt: new Date(),
      })
      .where(eq(books.id, bookId))

    try {
      // Process the book
      const result = await processBook(bookId, extractedText, userId)

      // Update book to completed
      const { eq } = await import('drizzle-orm')
      await db
        .update(books)
        .set({
          processingStatus: 'completed',
          extractedText: extractedText.substring(0, 5000), // Store truncated version
          updatedAt: new Date(),
        })
        .where(eq(books.id, bookId))

      return NextResponse.json({
        success: true,
        bookId,
        result,
      })
    } catch (error) {
      console.error('[v0] Book processing error:', error)

      // Mark as failed
      const { eq } = await import('drizzle-orm')
      await db
        .update(books)
        .set({
          processingStatus: 'failed',
          updatedAt: new Date(),
        })
        .where(eq(books.id, bookId))

      return NextResponse.json(
        { error: 'Book processing failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
