import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export const ADMIN_EMAIL = 'treinatechivo@gmail.com';

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  enrolledCourses: string[]; // IDs dos cursos adquiridos
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

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * INTEGRAÇÃO GOOGLE / FIREBASE
 * ─────────────────────────────
 * Para ativar login real com Google:
 *
 * 1. Instale Firebase:
 *    npm install firebase
 *
 * 2. Crie src/firebase.ts:
 *    import { initializeApp } from 'firebase/app';
 *    import { getAuth } from 'firebase/auth';
 *    const app = initializeApp({ ...suas credenciais do Firebase Console });
 *    export const auth = getAuth(app);
 *
 * 3. Substitua as funções signInWithGoogle e signOut abaixo por:
 *    import { GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
 *    import { auth } from '../firebase';
 *    const provider = new GoogleAuthProvider();
 *    await signInWithPopup(auth, provider);
 *
 * 4. Use onAuthStateChanged para persistir sessão:
 *    useEffect(() => {
 *      return onAuthStateChanged(auth, (fbUser) => {
 *        if (fbUser) setUser({ uid: fbUser.uid, name: fbUser.displayName!, ... });
 *        else setUser(null);
 *        setLoading(false);
 *      });
 *    }, []);
 */

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaura sessão do localStorage (substituir por onAuthStateChanged do Firebase)
  useEffect(() => {
    const stored = localStorage.getItem('tt_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('tt_user');
      }
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    /**
     * MODO DEMO — simula um usuário logado via Google.
     * Substitua pelo signInWithPopup do Firebase em produção:
     *
     *   import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
     *   import { auth } from '../firebase';
     *   const provider = new GoogleAuthProvider();
     *   const result = await signInWithPopup(auth, provider);
     *   const fbUser = result.user;
     *   const isAdmin = fbUser.email === ADMIN_EMAIL;
     *   setUser({ uid: fbUser.uid, name: fbUser.displayName!, email: fbUser.email!, photoURL: fbUser.photoURL, enrolledCourses: [], isAdmin });
     */
    /**
     * MODO DEMO — simula login com Google como administrador.
     * Em produção, substituir por signInWithPopup do Firebase.
     */
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = {
      uid: 'uid_admin_google',
      name: 'Ivo Amarante',
      email: ADMIN_EMAIL,
      photoURL: null,
      enrolledCourses: [],
      isAdmin: true,
    };
    setUser(mockUser);
    localStorage.setItem('tt_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('tt_user');
  };

  const signInWithEmail = async (email: string, _password: string) => {
    /**
     * MODO DEMO — simula login por e-mail.
     * Em produção, use signInWithEmailAndPassword do Firebase:
     *   import { signInWithEmailAndPassword } from 'firebase/auth';
     *   const result = await signInWithEmailAndPassword(auth, email, password);
     */
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const isAdmin = email === ADMIN_EMAIL;
    const mockUser: User = {
      uid: `uid_${email.split('@')[0]}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      photoURL: null,
      enrolledCourses: isAdmin ? [] : ['excel'],
      isAdmin,
    };
    setUser(mockUser);
    localStorage.setItem('tt_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signUpWithEmail = async (name: string, email: string, _password: string) => {
    /**
     * MODO DEMO — simula cadastro por e-mail.
     * Em produção, use createUserWithEmailAndPassword do Firebase.
     */
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = {
      uid: `uid_${Date.now()}`,
      name,
      email,
      photoURL: null,
      enrolledCourses: [],
      isAdmin: false,
    };
    setUser(mockUser);
    localStorage.setItem('tt_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
