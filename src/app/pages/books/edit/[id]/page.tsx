"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useBooks } from "@/context/BooksContext";
import { Book } from "@/types";
import { CheckCircle } from "lucide-react";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams(); // Récupérer l'ID du livre depuis l'URL
  const { books, updateBook } = useBooks();
  
  const [book, setBook] = useState<Book | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      const foundBook = books.find((b) => b.id === id);
      if (foundBook) {
        setBook(foundBook);
      } else {
        router.push("/pages/books"); // Redirige si le livre n'existe pas
      }
    }
  }, [id, books, router]);

  if (!book) {
    return <div className="text-center mt-10">Chargement du livre...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook(book);
    setSuccessMessage("📗 Livre mis à jour avec succès !");
    setTimeout(() => {
      setSuccessMessage(""); 
      router.push("/pages/books");
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 p-6">
      <Card className="w-full max-w-lg bg-gray-300 shadow-xl rounded-lg p-6">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-800">📚 Modifier un Livre</h1>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg mb-4 transition-opacity duration-300 ease-in-out">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">Titre</label>
              <Input
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
                className="mt-1 border border-black rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Auteur</label>
              <Input
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                required
                className="mt-1 border border-black rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Description</label>
              <Textarea
                value={book.description}
                onChange={(e) => setBook({ ...book, description: e.target.value })}
                required
                className="mt-1 border border-black rounded-lg"
              />
            </div>

            <Button type="submit" className="w-full bg-[#007B8B] hover:bg-[#005F66] text-white py-2 mt-4 rounded-lg transition">
              Modifier le Livre
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
