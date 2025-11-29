'use client';
import React, { useEffect, useState } from 'react';
import ChartWrapper from '@/components/ChartWrapper';
import { getTeachers, getEvaluations } from '@/lib/firestoreService';

const questionLabels = [
  "Domínio do conteúdo",
  "Clareza explicativa",
  "Métodos e exemplos",
  "Respostas às dúvidas",
  "Organização das aulas",
  "Uso de recursos didáticos",
  "Relacionamento com alunos",
  "Estímulo ao pensamento crítico"
];

export default function PerformancePage() {
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [performanceData, setPerformanceData] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const t = await getTeachers();
        setTeachers(t);
        const ev = await getEvaluations();
        setEvaluations(ev);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = event.target.value;
    setSelectedTeacherId(teacherId);
    const filtered = evaluations.filter(e => e.teacherId === teacherId);
    if (filtered.length === 0) {
      setPerformanceData(null);
      return;
    }
    const totals: Record<string, number> = {};
    filtered.forEach(ev => {
      Object.entries(ev.objectiveScores).forEach(([k, v]) => {
        totals[k] = (totals[k] || 0) + (Number(v) || 0);
      });
    });
    const averages = Object.keys(totals)
      .sort()
      .map(k => +(totals[k] / filtered.length).toFixed(2));
    setPerformanceData(averages);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gráficos de Desempenho Docente</h2>

      <div className="mb-6">
        <label htmlFor="teacher-select" className="block text-lg font-medium text-gray-700 mb-2">Selecione o Professor:</label>
        <select id="teacher-select" onChange={handleTeacherChange} value={selectedTeacherId} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm">
          <option value="" disabled>-- Escolha um Professor --</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {loading && <p>Carregando dados...</p>}

      {performanceData ? (
        <ChartWrapper labels={questionLabels} data={performanceData} />
      ) : selectedTeacherId ? <p className="text-gray-500">Nenhuma avaliação encontrada para este professor.</p> : null}
    </div>
  );
}
