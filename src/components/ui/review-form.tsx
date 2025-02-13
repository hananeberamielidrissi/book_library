"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooks } from "@/context/BooksContext"; // Assurez-vous que ce contexte contient la fonction updateBook
import { CheckCircle, Rat } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


const reviewSchema = z.object({
  rating: z.string(),
  comment: z.string().min(10, {
    message: "Le commentaire doit contenir au moins 10 caractères",
  }),
});

export function ReviewForm({ bookId }: { bookId: string }) {

  const router = useRouter();

  const { books, updateBook } = useBooks();
  const [successMessage, setSuccessMessage] = useState("");// Accès au contexte des livres
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    const book = books.find((b) => b.id === bookId);
    if (!book) {
      console.error("Livre introuvable");
      return;
    }

    const newReview = {
      id: crypto.randomUUID(), // Generate a unique ID for the review
      userId: "currentUserId", // Replace with the actual user ID
      bookId: bookId,
      rating: parseInt(values.rating),
      comment: values.comment,
      createdAt: new Date().toISOString(), // Ajoute la date du commentaire
    };

    // Mise à jour du livre avec le nouvel avis
    const updatedBook = {
      ...book,
      rating: (book.rating + newReview.rating) / 2, // Recalcul de la note moyenne
      reviews: [...(book.reviews || []), newReview], // Ajoute l'avis
    };

    updateBook(updatedBook);
    setSuccessMessage("Avis ajouté !");
    setTimeout(() => {
      setSuccessMessage(""); 
      router.push("/pages/books");
    }, 3000); // Met à jour le livre dans le contexte

    console.log("Avis ajouté :", newReview);
    form.reset(); // Réinitialise le formulaire après soumission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une note" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} étoile{rating > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre avis..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#005F66] hover:bg-[#007B8B]">Soumettre l'avis</Button>
      </form>
      {successMessage && (
            <div className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg mb-4 transition-opacity duration-300 ease-in-out">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span>{successMessage}</span>
            </div>
          )}
    </Form>
  );
}
