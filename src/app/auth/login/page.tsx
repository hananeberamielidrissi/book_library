"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push("/pages/books");
    } catch (error) {
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-lg bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#007B8B]">Connexion</h1>
          <p className="mt-2 text-gray-400">
            Connectez-vous pour accéder à la bibliothèque
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B8B] transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-600 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B8B] transition"
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-[#007B8B] hover:bg-[#005F66] text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Se connecter
          </Button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Vous n'avez pas de compte ? <a href="#" className="text-[#007B8B] hover:underline">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
}
