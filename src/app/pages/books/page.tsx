"use client"

import { useState } from 'react'
import { BookGrid } from '@/components/ui/book-grid'
import { BookDetails } from '@/components/ui/book-details'
import { Book } from '@/types'
import { AuthGuard } from '@/components/guards/auth-guard'
import Navbar from '@/components/Navbar'
import { useBooks } from '@/context/BooksContext'


export default function BooksPage() {
  const { books } = useBooks()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  return (
    <AuthGuard>
      <Navbar />
      <div className="container mx-auto py-8">
        <BookGrid 
          books={books} 
          onBookSelect={setSelectedBook} 
        />
        <BookDetails
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      </div>
    </AuthGuard>
  )
}
