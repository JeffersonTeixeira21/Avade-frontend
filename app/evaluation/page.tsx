'use client';
import React, { useEffect, useState } from 'react';
import RatingRadio from '@/components/RatingRadio';
import Toast from '@/components/Toast';
import type { Teacher } from '@/lib/inMemoryStore';
import { getTeachers, addEvaluation } from '@/lib/inMemoryStore';

const EvaluationPage = () => {
    const [teachersList, setTeachersList] = useState<Teacher[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [objectiveScores, setObjectiveScores] = useState<Record<string, number>>({});
    const [descriptiveAnswers, setDescriptiveAnswers] = useState({ q9: '', q10: '' });
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        setTeachersList(getTeachers());
    }, []);

    const handleTeacherSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeacher(e.target.value);
    };

    const handleObjectiveScoreChange = (question: string, score: number) => {
        setObjectiveScores(prevScores => ({ 
            ...prevScores, 
            [question]: score 
        }));
    };

    const handleDescriptiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDescriptiveAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar se as 8 perguntas foram respondidas
        const allAnswered = Array.from({ length: 8 }, (_, i) => `q${i+1}`)
            .every(key => objectiveScores[key] !== undefined);

        if (!selectedTeacher || !allAnswered || !descriptiveAnswers.q9 || !descriptiveAnswers.q10) {
            setToastMessage('Por favor, preencha todas as perguntas.');
            setToastVisible(true);
            return;
        }

        try {
            addEvaluation({
                teacherId: selectedTeacher,
                studentId: null,
                objectiveScores,
                descriptiveAnswers
            });
        } catch (err) {
            console.error(err);
        }

        setToastMessage('Avaliação enviada com sucesso!');
        setToastVisible(true);

        // Reset sem apagar o professor
        setObjectiveScores({});
        setDescriptiveAnswers({ q9: '', q10: '' });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Formulário de Avaliação Docente</h2>

            <div className="mb-6">
                <label htmlFor="teacher-select" className="block text-lg font-medium text-gray-700 mb-2">
                    Selecione o Professor que deseja avaliar:
                </label>

                <select
                    id="teacher-select"
                    value={selectedTeacher}
                    onChange={handleTeacherSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm text-base"
                >
                    <option value="" disabled>-- Escolha um Professor --</option>
                    {teachersList.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
                    Avaliação Objetiva (1 = Ruim | 5 = Excelente)
                </h3>

                {[...Array(8)].map((_, index) => {
                    const questionNumber = index + 1;
                    return (
                        <div key={questionNumber} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-3">
                                {questionNumber}. Pergunta {questionNumber}
                            </p>

                            <RatingRadio
                                question={`q${questionNumber}`}
                                onChange={handleObjectiveScoreChange}
                            />
                        </div>
                    );
                })}

                <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Avaliação Descritiva</h3>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        9. O que o professor poderia melhorar?
                    </label>
                    <textarea
                        name="q9"
                        rows={3}
                        value={descriptiveAnswers.q9}
                        onChange={handleDescriptiveChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        10. Destaque um ponto positivo do professor.
                    </label>
                    <textarea
                        name="q10"
                        rows={3}
                        value={descriptiveAnswers.q10}
                        onChange={handleDescriptiveChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                >
                    Enviar Avaliação
                </button>
            </form>

            {toastVisible && (
                <Toast 
                    message={toastMessage} 
                    onClose={() => setToastVisible(false)} 
                />
            )}
        </div>
    );
};

export default EvaluationPage;
