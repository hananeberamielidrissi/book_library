"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Book } from "@/types";
import { useBooks } from "@/context/BooksContext";
import { CheckCircle } from "lucide-react";

export default function AddBookPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { addBook } = useBooks();

  // États des champs
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    if (user?.role !== "admin") {
      setIsRedirecting(true);
      setTimeout(() => router.push("/books"), 1000);
    }
  }, [user, router]);

  if (isRedirecting) {
    return <div className="text-center mt-10">Redirection en cours...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author,
      description,
      coverImage: coverImage || "/images/default.jpg",
      isbn,
      publishedDate,
      rating: 0,
      reviews: [],
    };

    addBook(newBook); 
    // setShowSuccessModal(true);

    // setTimeout(() => {
    //   setShowSuccessModal(false);
    //   router.push("/books");
    // }, 2000);
    setSuccessMessage("📗 Livre ajouté avec succés !");
    setTimeout(() => {
      setSuccessMessage(""); 
      router.push("/pages/books");
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 p-6">
      <Card className="w-full max-w-lg bg-gray-300 shadow-xl rounded-lg p-6">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-800">📚 Ajouter un Livre</h1>
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
                placeholder="Titre du livre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 bg-white border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Auteur</label>
              <Input
                placeholder="Nom de l'auteur"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 bg-white border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Description</label>
              <Textarea
                placeholder="Brève description du livre"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 bg-white border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Image de couverture</label>
              <Input
                placeholder="URL de l'image"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="mt-1 bg-white border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
              {coverImage && (
                <img src={coverImage} alt="Aperçu" className="mt-2 w-full h-40 object-cover rounded-lg shadow-md" />
              )}
            </div>

            <div>
              <label className="text-gray-700 font-medium">ISBN</label>
              <Input
                placeholder="Numéro ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                className="mt-1 bg-white border border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Date de publication</label>
              <Input
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
                className="mt-1 bg-white border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <Button type="submit" className="w-full bg-[#007B8B] hover:bg-[#005F66] text-white py-2 mt-4 rounded-lg transition">
              Ajouter le Livre
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
