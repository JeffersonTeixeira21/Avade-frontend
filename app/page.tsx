'use client';
import React from 'react';

const HomePage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo ao EduAvalia</h1>
            <p className="text-lg text-center mb-8">
                Um sistema para facilitar a coleta de feedback de alunos sobre o desempenho dos professores.
            </p>
            <div className="flex space-x-4">
                <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Acessar
                </a>
                <a href="/about" className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                    Sobre Nós
                </a>
            </div>
        </main>
    );
};

export default HomePage;