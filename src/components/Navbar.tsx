"use client"

import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between shadow-md">
      <Link href="/pages/books" className="text-lg font-bold text-[#007B8B]">Bibliothèque</Link>
      <div className="flex gap-4">
        {user?.role === 'admin' && (
          <Button asChild className='bg-[#007B8B] hover:bg-[#005F66]'>
            <Link href="/pages/books/add-book">Ajouter un livre</Link>
          </Button>
        )}
        <Button onClick={signOut} className='bg-[#007B8B] hover:bg-[#005F66]'>Déconnexion</Button>
      </div>
    </nav>
  )
}
