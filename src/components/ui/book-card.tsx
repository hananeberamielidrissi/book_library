import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Book } from '@/types'
  import Image from 'next/image'
  
  interface BookCardProps {
    book: Book
    onViewDetails: (book: Book) => void
  }
  
  export function BookCard({ book, onViewDetails }: BookCardProps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="aspect-[3/4] relative">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <CardTitle className="mt-4">{book.title}</CardTitle>
          <CardDescription>{book.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2">{book.description}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => onViewDetails(book)} className="w-full">
            Voir les détails
          </Button>
        </CardFooter>
      </Card>
    )
  }