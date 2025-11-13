'use client';
import React from 'react';
import ChartWrapper from '@/components/ChartWrapper';
import { useInMemoryStore } from '@/lib/inMemoryStore';

const PerformancePage = () => {
  const { evaluationsData, teachers, addEvaluationAndRefresh } = useInMemoryStore();
  const [selectedTeacherId, setSelectedTeacherId] = React.useState('');
  const [performanceData, setPerformanceData] = React.useState<number[] | null>(null);

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = event.target.value;
    setSelectedTeacherId(teacherId);
    const filtered = evaluationsData.filter(e => e.teacherId === teacherId);
    if (filtered.length === 0) {
      setPerformanceData(null);
      return;
    }
    // calcula médias por questão (assume q1..q8)
    const totals: Record<string, number> = {};
    filtered.forEach(ev => {
      Object.entries(ev.objectiveScores).forEach(([k, v]) => {
        totals[k] = (totals[k] || 0) + v;
      });
    });
    const averages = Object.keys(totals)
      .sort() // garante ordem q1..q8 (se keys forem q1..q8)
      .map(k => +(totals[k] / filtered.length).toFixed(2));
    setPerformanceData(averages);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gráficos de Desempenho Docente</h2>
      <div className="mb-6">
        <label htmlFor="teacher-select" className="block text-lg font-medium text-gray-700 mb-2">Selecione o Professor:</label>
        <select id="teacher-select" onChange={handleTeacherChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm">
          <option value="" disabled>-- Escolha um Professor --</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {performanceData ? (
        <ChartWrapper labels={performanceData.map((_, i) => `Q${i+1}`)} data={performanceData} />
      ) : (
        selectedTeacherId ? <p className="text-gray-500">Nenhuma avaliação encontrada para este professor.</p> : null
      )}
    </div>
  );
};

export default PerformancePage;
