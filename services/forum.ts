import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAYNM56HDmP4HbRGW_zT2EC5G6t1BDoJRI',
  authDomain: 'treinatech-3ef28.firebaseapp.com',
  projectId: 'treinatech-3ef28',
  storageBucket: 'treinatech-3ef28.firebasestorage.app',
  messagingSenderId: '78585439215',
  appId: '1:78585439215:web:af6af74553729711038c1a',
};

function getDb() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  return getFirestore(app);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  topicsCount: number;
  postsCount: number;
  lastPost?: {
    topicId: string;
    topicTitle: string;
    authorName: string;
    createdAt: Timestamp;
  } | null;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  authorUid: string;
  authorName: string;
  authorPhoto: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  repliesCount: number;
  views: number;
  pinned: boolean;
  solved: boolean;
  likes: string[];
}

export interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  authorUid: string;
  authorName: string;
  authorPhoto: string | null;
  createdAt: Timestamp;
  likes: string[];
  isSolution: boolean;
}

// ─── Default Categories ───────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: Omit<ForumCategory, 'id'>[] = [
  {
    name: 'Anúncios e Novidades',
    description: 'Comunicados oficiais, lançamentos e novidades da TREINATECH.',
    icon: '📢',
    order: 1,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
  {
    name: 'Discussão Geral',
    description: 'Conversa livre sobre dados, tecnologia e carreira.',
    icon: '💬',
    order: 2,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
  {
    name: 'Dúvidas e Suporte',
    description: 'Tire suas dúvidas sobre os cursos e conteúdos.',
    icon: '❓',
    order: 3,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
  {
    name: 'Dicas e Truques',
    description: 'Compartilhe atalhos, técnicas e macetes úteis.',
    icon: '💡',
    order: 4,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
  {
    name: 'Projetos e Conquistas',
    description: 'Mostre seus dashboards, projetos e certificados.',
    icon: '🏆',
    order: 5,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
  {
    name: 'Erros e Soluções',
    description: 'Compartilhe erros que você encontrou e como resolveu.',
    icon: '🐛',
    order: 6,
    topicsCount: 0,
    postsCount: 0,
    lastPost: null,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ForumCategory[]> {
  const db = getDb();
  const snap = await getDocs(query(collection(db, 'forum_categories'), orderBy('order', 'asc')));

  if (snap.empty) {
    await seedCategories();
    const snap2 = await getDocs(query(collection(db, 'forum_categories'), orderBy('order', 'asc')));
    return snap2.docs.map((d) => ({ id: d.id, ...d.data() } as ForumCategory));
  }

  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumCategory));
}

async function seedCategories() {
  const db = getDb();
  for (const cat of DEFAULT_CATEGORIES) {
    await addDoc(collection(db, 'forum_categories'), cat);
  }
}

// ─── Topics ───────────────────────────────────────────────────────────────────

export async function getTopicsByCategory(categoryId: string): Promise<ForumTopic[]> {
  const db = getDb();
  const q = query(
    collection(db, 'forum_topics'),
    where('categoryId', '==', categoryId),
    orderBy('updatedAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  const topics = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumTopic));
  // Sort pinned topics to top client-side (avoids composite Firestore index requirement)
  return topics.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
}

export async function getTopic(topicId: string): Promise<ForumTopic | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, 'forum_topics', topicId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as ForumTopic) : null;
}

export async function createTopic(data: {
  categoryId: string;
  title: string;
  content: string;
  authorUid: string;
  authorName: string;
  authorPhoto: string | null;
}): Promise<string> {
  const db = getDb();
  const now = serverTimestamp();
  const ref = await addDoc(collection(db, 'forum_topics'), {
    ...data,
    createdAt: now,
    updatedAt: now,
    repliesCount: 0,
    views: 0,
    pinned: false,
    solved: false,
    likes: [],
  });

  // Increment category counters
  await updateDoc(doc(db, 'forum_categories', data.categoryId), {
    topicsCount: increment(1),
    postsCount: increment(1),
    lastPost: {
      topicId: ref.id,
      topicTitle: data.title,
      authorName: data.authorName,
      createdAt: now,
    },
  });

  return ref.id;
}

export async function incrementTopicViews(topicId: string) {
  const db = getDb();
  await updateDoc(doc(db, 'forum_topics', topicId), { views: increment(1) });
}

export async function toggleTopicLike(topicId: string, uid: string, liked: boolean) {
  const db = getDb();
  await updateDoc(doc(db, 'forum_topics', topicId), {
    likes: liked ? arrayRemove(uid) : arrayUnion(uid),
  });
}

export async function markTopicSolved(topicId: string, solved: boolean) {
  const db = getDb();
  await updateDoc(doc(db, 'forum_topics', topicId), { solved });
}

// ─── Replies ──────────────────────────────────────────────────────────────────

export function subscribeToReplies(
  topicId: string,
  callback: (replies: ForumReply[]) => void
): () => void {
  const db = getDb();
  const q = query(
    collection(db, 'forum_replies'),
    where('topicId', '==', topicId),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumReply)));
  });
}

export async function createReply(data: {
  topicId: string;
  categoryId: string;
  content: string;
  authorUid: string;
  authorName: string;
  authorPhoto: string | null;
}): Promise<string> {
  const db = getDb();
  const now = serverTimestamp();
  const ref = await addDoc(collection(db, 'forum_replies'), {
    topicId: data.topicId,
    content: data.content,
    authorUid: data.authorUid,
    authorName: data.authorName,
    authorPhoto: data.authorPhoto,
    createdAt: now,
    likes: [],
    isSolution: false,
  });

  // Update topic counters
  await updateDoc(doc(db, 'forum_topics', data.topicId), {
    repliesCount: increment(1),
    updatedAt: now,
  });

  // Update category post count
  await updateDoc(doc(db, 'forum_categories', data.categoryId), {
    postsCount: increment(1),
  });

  return ref.id;
}

export async function toggleReplyLike(replyId: string, uid: string, liked: boolean) {
  const db = getDb();
  await updateDoc(doc(db, 'forum_replies', replyId), {
    likes: liked ? arrayRemove(uid) : arrayUnion(uid),
  });
}

export async function markReplyAsSolution(replyId: string, topicId: string, isSolution: boolean) {
  const db = getDb();
  // Remove solution flag from all replies first
  const q = query(collection(db, 'forum_replies'), where('topicId', '==', topicId));
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    if (d.data().isSolution) {
      await updateDoc(doc(db, 'forum_replies', d.id), { isSolution: false });
    }
  }
  // Mark the chosen reply
  await updateDoc(doc(db, 'forum_replies', replyId), { isSolution });
  // Mark topic as solved
  await markTopicSolved(topicId, isSolution);
}

// ─── Recent Topics (for home screen) ─────────────────────────────────────────

export async function getRecentTopics(count = 5): Promise<ForumTopic[]> {
  const db = getDb();
  const q = query(
    collection(db, 'forum_topics'),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ForumTopic));
}
