'use client';
import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Sobre Nós - EduAvalia</h2>
            <div className="space-y-4 text-gray-600">
                <p>O <strong>EduAvalia</strong> é um sistema desenvolvido para facilitar a coleta de feedback de alunos sobre o desempenho dos professores. Nossa missão é fornecer dados objetivos e descritivos para que a coordenação pedagógica e os próprios docentes possam identificar pontos fortes e áreas de melhoria.</p>
                <p>Acreditamos que a avaliação contínua é fundamental para a excelência educacional. Através de formulários simples e análises visuais (gráficos), tornamos o processo de feedback eficiente, transparente e acionável.</p>
                <h3 className="text-xl font-semibold text-gray-700 pt-4">Nossos Princípios</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Anonimato:</strong> Garantimos a confidencialidade das respostas dos alunos (neste modo, o userId é simulado).</li>
                    <li><strong>Objetividade:</strong> As perguntas são estruturadas para fornecer métricas claras.</li>
                    <li><strong>Melhoria Contínua:</strong> O foco é sempre no desenvolvimento profissional do corpo docente.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;