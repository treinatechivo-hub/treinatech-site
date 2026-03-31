import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { getStudent, linkUidToStudent, addStudent } from '../services/firestore';

// ─── Types ────────────────────────────────────────────────────────────────────

export const ADMIN_EMAIL = 'treinatechivo@gmail.com';

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  enrolledCourses: string[];
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

// ─── Helper: monta User a partir do Firebase + Firestore ─────────────────────

async function buildUser(fbUser: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}): Promise<User> {
  const email = fbUser.email ?? '';
  const isAdmin = email === ADMIN_EMAIL;

  // Vincula UID ao registro do aluno no Firestore (se existir)
  if (!isAdmin) await linkUidToStudent(email, fbUser.uid);

  // Busca cursos liberados no Firestore
  const record = !isAdmin ? await getStudent(email) : null;

  return {
    uid: fbUser.uid,
    name: fbUser.displayName ?? record?.name ?? email.split('@')[0],
    email,
    photoURL: fbUser.photoURL,
    enrolledCourses: record?.enrolledCourses ?? [],
    isAdmin,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const appUser = await buildUser(fbUser);
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(auth, googleProvider);
    // onAuthStateChanged cuida do setUser
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    // Cria registro no Firestore se ainda não existir
    const existing = await getStudent(email);
    if (!existing) {
      await addStudent({
        name,
        email,
        enrolledCourses: [],
        active: true,
        createdAt: new Date().toISOString().split('T')[0],
        uid: result.user.uid,
      });
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
