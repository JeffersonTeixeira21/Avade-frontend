import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { getFirestoreDb } from './firebase';

export type Teacher = { id: string; name: string };
export type Evaluation = {
  id?: string;
  teacherId: string;
  studentId: string | null;
  objectiveScores: Record<string, number>;
  descriptiveAnswers: { q9: string; q10: string };
  timestamp?: any;
};

const TEACHERS = 'teachers';
const EVALUATIONS = 'evaluations';
const STUDENTS = 'students';

export async function getTeachers(): Promise<Teacher[]> {
  const db = getFirestoreDb();
  const snap = await getDocs(collection(db, TEACHERS));
  const list: Teacher[] = [];
  snap.forEach(docSnap => {
    const data = docSnap.data() as any;
    list.push({ id: docSnap.id, name: data.name });
  });
  return list;
}

export async function addTeacher(name: string): Promise<Teacher> {
  const db = getFirestoreDb();
  const ref = await addDoc(collection(db, TEACHERS), { name });
  return { id: ref.id, name };
}

export async function getEvaluations(): Promise<Evaluation[]> {
  const db = getFirestoreDb();
  const snap = await getDocs(query(collection(db, EVALUATIONS), orderBy('timestamp', 'desc')));
  const list: Evaluation[] = [];
  snap.forEach(s => {
    const data = s.data() as any;
    list.push({
      id: s.id,
      teacherId: data.teacherId,
      studentId: data.studentId ?? null,
      objectiveScores: data.objectiveScores ?? {},
      descriptiveAnswers: data.descriptiveAnswers ?? { q9: '', q10: '' },
      timestamp: data.timestamp ?? null,
    });
  });
  return list;
}

export async function addEvaluation(ev: Omit<Evaluation, 'timestamp' | 'id'>): Promise<Evaluation> {
  const db = getFirestoreDb();
  const ref = await addDoc(collection(db, EVALUATIONS), {
    teacherId: ev.teacherId,
    studentId: ev.studentId ?? null,
    objectiveScores: ev.objectiveScores,
    descriptiveAnswers: ev.descriptiveAnswers,
    timestamp: serverTimestamp(),
  });
  return { id: ref.id, ...ev, timestamp: new Date().toISOString() };
}

export function subscribeEvaluations(onUpdate: (list: Evaluation[]) => void) {
  const db = getFirestoreDb();
  const q = query(collection(db, EVALUATIONS), orderBy('timestamp', 'desc'));
  return onSnapshot(q, snap => {
    const arr: Evaluation[] = [];
    snap.forEach(s => {
      const data = s.data() as any;
      arr.push({
        id: s.id,
        teacherId: data.teacherId,
        studentId: data.studentId ?? null,
        objectiveScores: data.objectiveScores ?? {},
        descriptiveAnswers: data.descriptiveAnswers ?? { q9: '', q10: '' },
        timestamp: data.timestamp ?? null,
      });
    });
    onUpdate(arr);
  });
}
