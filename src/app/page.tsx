import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BooksProvider } from '@/context/BooksContext';

export default function Home() {
  return (
    <BooksProvider>
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        {/* Carte d'accueil */}
        <div className="bg-gray-600 bg-opacity-90 backdrop-blur-lg shadow-lg rounded-2xl p-12 text-center max-w-3xl transition-all duration-500 hover:scale-105">
          {/* Image d'illustration */}
          <img
            src="/accueil.jpg" // Remplace par une image adaptée dans /public
            alt="Bibliothèque"
            className="w-52 mx-auto mb-6 rounded-lg shadow-md"
          />

          {/* Titre et description */}
          <h1 className="text-5xl font-extrabold text-[#007B8B] mb-4">Bibliothèque de Livres</h1>
          <p className="text-lg text-gray-300 mb-8">
            Découvrez une large sélection de livres et plongez dans de nouvelles aventures littéraires.
          </p>

          {/* Boutons d'action */}
          <div className="space-x-4">
            <Button className="px-6 py-3 text-lg bg-[#007B8B] hover:bg-[#005F66] transition-all transform hover:scale-110" asChild>
              <Link href="/books">Voir les livres</Link>
            </Button>
            <Button className="px-6 py-3 text-lg border border-[#007B8B] text-[#007B8B] hover:bg-[#007B8B] hover:text-white transition-all transform hover:scale-110" variant="outline" asChild>
              <Link href="/auth/login">Connexion</Link>
            </Button>
          </div>
        </div>
      </div>
    </BooksProvider>
  );
}
