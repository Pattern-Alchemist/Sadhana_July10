'use client'

import { useState } from 'react'
import { Upload, BookOpen, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function BooksPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [books, setBooks] = useState<Array<{ id: number; title: string; status: string }>>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    for (const file of files) {
      if (file.type === 'application/pdf' || file.name.endsWith('.txt')) {
        await processFile(file)
      }
    }
  }

  const processFile = async (file: File) => {
    setIsProcessing(true)
    try {
      // Read file content
      const text = await file.text()

      // Create book record
      const bookResponse = await fetch('/api/books/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: file.name.replace(/\.[^/.]+$/, ''),
          author: 'Unknown',
          fileSize: file.size,
        }),
      })

      const bookData = await bookResponse.json()
      const bookId = bookData.id

      // Process book
      const processResponse = await fetch('/api/books/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          extractedText: text.substring(0, 50000),
          title: file.name,
        }),
      })

      if (processResponse.ok) {
        const result = await processResponse.json()
        setBooks((prev) => [
          ...prev,
          {
            id: bookId,
            title: file.name,
            status: 'completed',
          },
        ])
      }
    } catch (error) {
      console.error('[v0] File processing error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-sm text-amber-400 hover:text-amber-300">
            ← Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">Upload Books</h1>
          <p className="text-sm text-slate-400">Transform spiritual books into personalized curricula</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-8 rounded-lg border-2 border-dashed px-6 py-12 text-center transition ${
            isDragging
              ? 'border-amber-400 bg-amber-400/5'
              : 'border-slate-700/50 bg-slate-800/30'
          }`}
        >
          <Upload className="mx-auto mb-4 h-12 w-12 text-amber-400" />
          <h3 className="text-lg font-semibold text-slate-100">Drag & drop your books</h3>
          <p className="mt-2 text-sm text-slate-400">Supports PDF and text files</p>
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-amber-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </div>
          )}
        </div>

        {/* Books List */}
        {books.length > 0 && (
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/30">
            <div className="border-b border-slate-700/50 px-6 py-4">
              <h3 className="font-semibold text-slate-100">Your Books</h3>
            </div>
            <div className="divide-y divide-slate-700/50">
              {books.map((book) => (
                <div key={book.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <BookOpen className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="font-medium text-slate-100">{book.title}</p>
                      <p className="text-sm text-slate-400">{book.status}</p>
                    </div>
                  </div>
                  {book.status === 'completed' && (
                    <Link
                      href={`/books/${book.id}`}
                      className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
                    >
                      View Curriculum
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
