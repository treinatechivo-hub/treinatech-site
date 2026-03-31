import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { app } from '../firebase';

export const db = getFirestore(app);

export interface StudentRecord {
  id: string;        // email sanitizado como ID do documento
  name: string;
  email: string;
  enrolledCourses: string[];
  active: boolean;
  createdAt: string;
  uid?: string;      // preenchido quando o aluno faz login pela primeira vez
}

function emailToId(email: string) {
  return email.toLowerCase().replace(/[@.]/g, '_');
}

// ─── Leitura ──────────────────────────────────────────────────────────────────

export async function getStudent(email: string): Promise<StudentRecord | null> {
  const ref = doc(db, 'students', emailToId(email));
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as StudentRecord) : null;
}

export async function getAllStudents(): Promise<StudentRecord[]> {
  const snap = await getDocs(collection(db, 'students'));
  return snap.docs.map((d) => d.data() as StudentRecord);
}

// ─── Escrita (admin) ──────────────────────────────────────────────────────────

export async function addStudent(data: Omit<StudentRecord, 'id'>): Promise<StudentRecord> {
  const id = emailToId(data.email);
  const record: StudentRecord = { ...data, id };
  await setDoc(doc(db, 'students', id), record);
  return record;
}

export async function updateStudent(id: string, data: Partial<StudentRecord>): Promise<void> {
  await updateDoc(doc(db, 'students', id), { ...data });
}

export async function deleteStudent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'students', id));
}

// ─── Vincula UID do aluno quando ele faz login ────────────────────────────────

export async function linkUidToStudent(email: string, uid: string): Promise<void> {
  const id = emailToId(email);
  const ref = doc(db, 'students', id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { uid });
  }
}
