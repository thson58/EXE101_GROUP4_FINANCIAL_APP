// src/services/auth.service.ts
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
  } from 'firebase/auth';
  import { auth } from '../config/firebase';
  
  export const authService = {
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  
    async resetPassword(email: string) {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  
    async logout() {
      try {
        await signOut(auth);
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };
  