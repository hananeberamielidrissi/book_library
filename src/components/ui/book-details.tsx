import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Book } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { ReviewForm } from "./review-form"
  
  interface BookDetailsProps {
    book: Book | null
    isOpen: boolean
    onClose: () => void
  }
  
  export function BookDetails({ book, isOpen, onClose }: BookDetailsProps) {
    const { user } = useAuth()
  
    if (!book) return null
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl bg-gray-200">
          <DialogHeader>
            <DialogTitle>{book.title}</DialogTitle>
            <DialogDescription>par {book.author}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4]">
              <img
                src={book.coverImage}
                alt={book.title}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <p>{book.description}</p>
              <div className="space-y-2">
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Date de publication:</strong> {book.publishedDate}</p>
                <p><strong>Note:</strong> {book.rating}/5</p>
              </div>
              <ReviewForm bookId={book.id} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }