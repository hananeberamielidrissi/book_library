import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { useBooks } from "@/context/BooksContext";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react"; // Importation des icônes
import { useState } from "react";

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
}

export function BookCard({ book, onViewDetails }: BookCardProps) {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const { removeBook } = useBooks(); // Fonction pour supprimer un livre
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    router.push(`/pages/books/edit/${book.id}`); // Rediriger vers la page d'édition
  };

  const handleDelete = () => {
    removeBook(book.id);
    setShowModal(false); 
  };

  return (
    <div>
    <Card className="flex flex-col h-full bg-gray-800">
      <CardHeader>
        <div className="aspect-[3/4] relative">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <CardTitle className="mt-4 text-white">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-1">
        <p className="line-clamp-2 text-white">{book.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col w-full p-2 mt-2">
        {/* Bouton Voir les détails, dans une ligne séparée */}
        <Button onClick={() => onViewDetails(book)} className="w-full bg-[#005F66] hover:bg-[#007B8B]">
          Voir les détails
        </Button>

        {/* Icônes Modifier et Supprimer, dans la même ligne */}
        {user?.role === "admin" && (
          <div className="flex w-full justify-between mt-2">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Pencil className="h-8 w-8 text-yellow-600" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowModal(true)}>
              <Trash className="h-8 w-8 text-red-600" />
            </Button>
          </div>
        )}
      </CardFooter>

    </Card>
    {showModal && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-xs transform transition-transform duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Voulez-vous vraiment supprimer ce livre ?
      </h3>
      <div className="mt-6 flex justify-between items-center">
        <Button
          variant="outline"
          className="w-1/3 text-gray-600 hover:bg-gray-200 border-gray-300"
          onClick={() => setShowModal(false)}
        >
          Annuler
        </Button>
        <Button
          className="w-1/3 text-white bg-red-600 hover:bg-red-700 border-red-700"
          onClick={handleDelete}
        >
          Supprimer
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
