// lib/inMemoryStore.ts
export type Teacher = { id: string; name: string };
export type Evaluation = {
  teacherId: string;
  studentId: string | null;
  objectiveScores: Record<string, number>;
  descriptiveAnswers: { q9: string; q10: string };
  timestamp: string;
};

const KEY_TEACHERS = 'edu_teachers_v1';
const KEY_EVALUATIONS = 'edu_evaluations_v1';

const DEFAULT_TEACHERS: Teacher[] = [
  { id: 't-16782', name: 'Prof. Ana Costa' },
  { id: 't-94321', name: 'Prof. Bruno Lima' },
];

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function getTeachers(): Teacher[] {
  return readJSON<Teacher[]>(KEY_TEACHERS, DEFAULT_TEACHERS.slice());
}

export function addTeacher(name: string): Teacher {
  const list = getTeachers();
  const newT: Teacher = { id: 't-' + Math.random().toString(36).substring(2, 9), name };
  list.push(newT);
  writeJSON(KEY_TEACHERS, list);
  return newT;
}

export function setTeachers(list: Teacher[]) {
  writeJSON(KEY_TEACHERS, list);
}

export function getEvaluations(): Evaluation[] {
  return readJSON<Evaluation[]>(KEY_EVALUATIONS, []);
}

export function addEvaluation(ev: Omit<Evaluation, 'timestamp'>): Evaluation {
  const list = getEvaluations();
  const newEv: Evaluation = { ...ev, timestamp: new Date().toISOString() };
  list.push(newEv);
  writeJSON(KEY_EVALUATIONS, list);
  return newEv;
}

export function clearStore() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY_TEACHERS);
  localStorage.removeItem(KEY_EVALUATIONS);
}

// convenience export for modules still importing `teachers`
export const teachers: Teacher[] = (typeof window === 'undefined') ? DEFAULT_TEACHERS.slice() : getTeachers();

/**
 * React hook for client components that need reactive access to the in-memory store.
 * Use this only inside client components (files with 'use client').
 *
 * Returns:
 *  - teachers: Teacher[]
 *  - evaluationsData: Evaluation[]
 *  - refresh(): force reload from localStorage
 *  - addEvaluationAndRefresh(ev): convenience wrapper that adds and refreshes state
 */
import React from 'react';

export function useInMemoryStore() {
  const [teachersState, setTeachersState] = React.useState<Teacher[]>(() => getTeachers());
  const [evaluationsState, setEvaluationsState] = React.useState<Evaluation[]>(() => getEvaluations());

  React.useEffect(() => {
    const handleStorage = () => {
      setTeachersState(getTeachers());
      setEvaluationsState(getEvaluations());
    };

    // quando outro tab altera localStorage ou quando chamamos funções aqui
    window.addEventListener('storage', handleStorage);

    // cleanup
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const refresh = () => {
    setTeachersState(getTeachers());
    setEvaluationsState(getEvaluations());
  };

  const addEvaluationAndRefresh = (ev: Omit<Evaluation, 'timestamp'>) => {
    addEvaluation(ev);
    refresh();
  };

  return {
    teachers: teachersState,
    evaluationsData: evaluationsState,
    refresh,
    addEvaluationAndRefresh,
  };
}
