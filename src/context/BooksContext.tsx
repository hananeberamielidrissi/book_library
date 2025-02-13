"use client"

import { createContext, useContext, useState } from 'react'
import { Book } from '@/types'

// Définition du type du contexte
interface BooksContextType {
  books: Book[]
  addBook: (book: Book) => void
  updateBook: (updatedBook: Book) => void
  removeBook: (id: string) => void
}

// Création du contexte
const BooksContext = createContext<BooksContextType | undefined>(undefined)

// Composant Provider pour englober l'application
export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([
    {
      "id": "1",
      "title": "Le Petit Prince",
      "author": "Antoine de Saint-Exupéry",
      "description": "Un conte philosophique sur l'amour et l'amitié.",
      "coverImage": "/images/petit-prince.jpg",
      "isbn": "978-2-07-040850-4",
      "publishedDate": "1943-04-06",
      "rating": 4.5,
      "reviews": []
    },
    {
      "id": "3",
      "title": "Les Misérables",
      "author": "Victor Hugo",
      "description": "Un roman épique qui explore la justice sociale et l'amour au XIXe siècle en France.",
      "coverImage": "/images/les-miserables.jpg",
      "isbn": "978-2-07-041760-9",
      "publishedDate": "1862-04-03",
      "rating": 4.8,
      "reviews": []
    },
    {
      "id": "4",
      "title": "Le Hobbit",
      "author": "J.R.R. Tolkien",
      "description": "Un roman de fantasy qui suit les aventures de Bilbo Baggins dans la Terre du Milieu.",
      "coverImage": "/images/le-hobbit.jpg",
      "isbn": "978-0-618-00221-3",
      "publishedDate": "1937-09-21",
      "rating": 4.6,
      "reviews": []
    },
    {
      "id": "5",
      "title": "L'Alchimiste",
      "author": "Paulo Coelho",
      "description": "Un conte spirituel sur la quête personnelle et la recherche du sens de la vie.",
      "coverImage": "/images/l-alchimiste.jpg",
      "isbn": "978-0-06-112241-5",
      "publishedDate": "1988-05-01",
      "rating": 4.3,
      "reviews": []
    },
    {
      "id": "6",
      "title": "La Peste",
      "author": "Albert Camus",
      "description": "Un roman sur la résistance humaine face à une épidémie dévastatrice.",
      "coverImage": "/images/la-peste.jpg",
      "isbn": "978-2-07-036822-7",
      "publishedDate": "1947-06-10",
      "rating": 4.4,
      "reviews": []
    },
    {
      "id": "7",
      "title": "Le Seigneur des Anneaux",
      "author": "J.R.R. Tolkien",
      "description": "Une épopée de fantasy sur la lutte pour détruire un anneau magique maléfique.",
      "coverImage": "/images/le-seigneur-des-anneaux.jpg",
      "isbn": "978-0-261-10364-5",
      "publishedDate": "1954-07-29",
      "rating": 4.9,
      "reviews": []
    },
    {
      "id": "8",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "description": "Un roman sur les injustices raciales dans l'Amérique des années 1930.",
      "coverImage": "/images/to-kill-a-mockingbird.jpg",
      "isbn": "978-0-06-112008-4",
      "publishedDate": "1960-07-11",
      "rating": 4.8,
      "reviews": []
    },
    {
      "id": "9",
      "title": "Moby Dick",
      "author": "Herman Melville",
      "description": "Un roman sur la quête obsessionnelle du capitaine Ahab pour tuer Moby Dick, un cachalot légendaire.",
      "coverImage": "/images/moby-dick.jpg",
      "isbn": "978-1-85326-008-7",
      "publishedDate": "1851-11-14",
      "rating": 4.1,
      "reviews": []
    },
    {
      "id": "10",
      "title": "Crime et Châtiment",
      "author": "Fiodor Dostoïevski",
      "description": "Un roman philosophique sur la culpabilité et la rédemption d'un jeune homme qui commet un meurtre.",
      "coverImage": "/images/crime-et-chatiment.jpg",
      "isbn": "978-2-07-036832-6",
      "publishedDate": "1866-01-01",
      "rating": 4.6,
      "reviews": []
    }
  ]
  )

  // Ajouter un livre
  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book])
  }

  // Modifier un livre
  const updateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    )
  }

  // Supprimer un livre
  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
  }

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte
export const useBooks = () => {
  const context = useContext(BooksContext)
  if (!context) throw new Error('useBooks doit être utilisé dans un BooksProvider')
  return context
}
