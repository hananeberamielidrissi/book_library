import { create } from 'zustand'
import { User } from '@/types'

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      // Liste des utilisateurs fictifs
      const testUsers: User[] = [
        { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        { id: '2', name: 'Reader User', email: 'reader@example.com', role: 'reader' }
      ];

      // Trouver l'utilisateur correspondant
      const user = testUsers.find(u => u.email === email);

      if (user) {
        set({ user, isLoading: false });
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  signOut: () => set({ user: null }),
}));
