// src/types/auth.ts
export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }