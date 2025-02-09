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
      // Simuler une API call
      const user = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'reader' as const,
      };
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  signOut: () => set({ user: null }),
}));