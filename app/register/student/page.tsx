'use client';
import React, { useState } from 'react';

const RegisterStudentPage = () => {
    const [studentName, setStudentName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!studentName) {
            setStatusMessage('Nome inválido.');
            return;
        }

        // Simulate registration logic
        setStatusMessage(`Aluno '${studentName}' cadastrado em memória.`);
        setStudentName('');
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Cadastro de Aluno (Em Memória)</h2>
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
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md">
                    Cadastrar Aluno
                </button>
                {statusMessage && <p className="text-sm mt-3 text-center">{statusMessage}</p>}
            </form>
        </div>
    );
};

export default RegisterStudentPage;