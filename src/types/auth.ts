import { User } from ".";

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }