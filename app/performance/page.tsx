'use client';
import React from 'react';
import ChartWrapper from '@/components/ChartWrapper';
import { useInMemoryStore } from '@/lib/inMemoryStore';

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

const PerformancePage = () => {
  const { evaluationsData, teachers } = useInMemoryStore();
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

    const totals: Record<string, number> = {};
    filtered.forEach(ev => {
      Object.entries(ev.objectiveScores).forEach(([q, score]) => {
        totals[q] = (totals[q] || 0) + score;
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
        <label htmlFor="teacher-select" className="block text-lg font-medium text-gray-700 mb-2">
          Selecione o Professor:
        </label>

        <select
          id="teacher-select"
          value={selectedTeacherId}
          onChange={handleTeacherChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        >
          <option value="" disabled>-- Escolha um Professor --</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {performanceData ? (
        <ChartWrapper labels={questionLabels} data={performanceData} />
      ) : selectedTeacherId ? (
        <p className="text-gray-500">Nenhuma avaliação encontrada para este professor.</p>
      ) : null}
    </div>
  );
};

export default PerformancePage;
