import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut as fbSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    getAuth,
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';

// ─── Firebase init (lazy, evita duplicate-app) ────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyAYNM56HDmP4HbRGW_zT2EC5G6t1BDoJRI",
    authDomain: "treinatech-3ef28.firebaseapp.com",h
    projectId: "treinatech-3ef28",
    storageBucket: "treinatech-3ef28.firebasestorage.app",
    messagingSenderId: "78585439215",
    appId: "1:78585439215:web:af6af74553729711038c1a",
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

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
    firebaseApp: typeof firebaseApp;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
                  try {
                            if (fbUser) {
                                        const email = fbUser.email ?? '';
                                        const isAdmin = email === ADMIN_EMAIL;

                              let enrolledCourses: string[] = [];

                              if (!isAdmin) {
                                            try {
                                                            const { getStudent, linkUidToStudent } = await import('../services/firestore');
                                                            const record = await getStudent(email);

                                              // 🔒 BLOQUEIO: apenas alunos cadastrados pelo admin têm acesso
                                              if (!record || !record.active) {
                                                                console.warn('Acesso negado: usuário não autorizado -', email);
                                                                await fbSignOut(auth);
                                                                setUser(null);
                                                                setLoading(false);
                                                                return;
                                              }

                                              // Aluno autorizado: vincula UID e carrega cursos
                                              await linkUidToStudent(email, fbUser.uid);
                                                            enrolledCourses = record.enrolledCourses ?? [];
                                            } catch (e) {
                                                            console.warn('Firestore indisponível:', e);
                                                            // Em caso de falha no Firestore, nega acesso por segurança
                                              await fbSignOut(auth);
                                                            setUser(null);
                                                            setLoading(false);
                                                            return;
                                            }
                              }

                              setUser({
                                            uid: fbUser.uid,
                                            name: fbUser.displayName ?? email.split('@')[0],
                                            email,
                                            photoURL: fbUser.photoURL,
                                            enrolledCourses,
                                            isAdmin,
                              });
                            } else {
                                        setUser(null);
                            }
                  } catch (err) {
                            console.error('Erro no auth:', err);
                            setUser(null);
                  } finally {
                            setLoading(false);
                  }
          });

                  return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
          await signInWithPopup(auth, googleProvider);
    };

    const signInWithEmail = async (email: string, password: string) => {
          await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithEmail = async (name: string, email: string, password: string) => {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(result.user, { displayName: name });
          try {
                  const { addStudent, getStudent } = await import('../services/firestore');
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
          } catch (e) {
                  console.warn('Firestore indisponível ao criar conta:', e);
          }
    };

    const signOut = async () => {
          await fbSignOut(auth);
    };

    return (
          <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, firebaseApp }}>
            {children}
          </AuthContext.Provider>AuthContext.Provider>
        );
};
