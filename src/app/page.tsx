import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bibliothèque de Livres</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/books">Voir les livres</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Connexion</Link>
        </Button>
      </div>
    </div>
  )
}