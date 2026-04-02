import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  Firestore,
} from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAYNM56HDmP4HbRGW_zT2EC5G6t1BDoJRI",
  authDomain: "treinatech-3ef28.firebaseapp.com",
  projectId: "treinatech-3ef28",
  storageBucket: "treinatech-3ef28.firebasestorage.app",
  messagingSenderId: "78585439215",
  appId: "1:78585439215:web:af6af74553729711038c1a",
};

let _db: Firestore | null = null;
function getDb(): Firestore {
  if (!_db) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    _db = getFirestore(app);
  }
  return _db;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  active: boolean;
  createdAt: string;
  uid?: string;
}

function emailToId(email: string) {
  return email.toLowerCase().replace(/[@.]/g, '_');
}

export async function getStudent(email: string): Promise<StudentRecord | null> {
  const ref = doc(getDb(), 'students', emailToId(email));
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as StudentRecord) : null;
}

export async function getAllStudents(): Promise<StudentRecord[]> {
  const snap = await getDocs(collection(getDb(), 'students'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StudentRecord));
}

export async function addStudent(data: Omit<StudentRecord, 'id'>): Promise<StudentRecord> {
  const id = emailToId(data.email);
  const record: StudentRecord = { ...data, id };
  await setDoc(doc(getDb(), 'students', id), record);
  return record;
}

export async function updateStudent(id: string, data: Partial<StudentRecord>): Promise<void> {
  await updateDoc(doc(getDb(), 'students', id), { ...data });
}

export async function deleteStudent(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), 'students', id));
}

export async function linkUidToStudent(email: string, uid: string): Promise<void> {
  const id = emailToId(email);
  const ref = doc(getDb(), 'students', id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { uid });
  }
}
