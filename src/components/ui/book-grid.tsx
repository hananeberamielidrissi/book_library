import { Book } from '@/types'
import { BookCard } from './book-card'

interface BookGridProps {
  books: Book[]
  onBookSelect: (book: Book) => void
}

export function BookGrid({ books, onBookSelect }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onViewDetails={onBookSelect}
        />
      ))}
    </div>
  )
}