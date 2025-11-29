'use client';
import React, { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { addTeacher as addTeacherService, addTeacher } from '@/lib/firestoreService';
import { addDoc as addDocLocal } from 'firebase/firestore'; 

import { getFirestoreDb } from '@/lib/firebase';
import { collection } from 'firebase/firestore';

export default function RegisterStudentPage() {
  const [studentName, setStudentName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setStatusMessage('Nome inválido.');
      return;
    }
    setSubmitting(true);
    try {
      const db = getFirestoreDb();
      await addDoc(collection(db, 'students'), { name: studentName.trim(), createdAt: new Date().toISOString() });
      setStatusMessage(`Aluno '${studentName}' cadastrado.`);
      setStudentName('');
    } catch (err) {
      console.error(err);
      setStatusMessage('Erro ao cadastrar aluno.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo do Aluno</label>
          <input
            type="text"
            id="student-name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Ex: Maria da Silva"
          />
        </div>
        <button disabled={submitting} type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          {submitting ? 'Cadastrando...' : 'Cadastrar Aluno'}
        </button>
        {statusMessage && <p className="text-sm mt-3 text-center">{statusMessage}</p>}
      </form>
    </div>
  );
}
