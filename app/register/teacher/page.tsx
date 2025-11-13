'use client';
import React, { useState } from 'react';

const RegisterTeacherPage = () => {
    const [teacherName, setTeacherName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (!teacherName) {
            setStatusMessage('Nome do professor é obrigatório.');
            return;
        }

        // Simulate registration logic
        const newTeacher = {
            id: 't-' + Math.random().toString(36).substring(2, 9),
            name: teacherName,
        };

        // Here you would typically send newTeacher to your in-memory store or API

        setStatusMessage(`Professor '${teacherName}' cadastrado em memória.`);
        setTeacherName('');
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Cadastro de Professor (Em Memória)</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="teacher-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo do Professor</label>
                    <input
                        type="text"
                        id="teacher-name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        placeholder="Ex: Prof. João da Luz"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md">
                    Cadastrar Professor
                </button>
                {statusMessage && <p className="text-sm mt-3 text-center">{statusMessage}</p>}
            </form>
        </div>
    );
};

export default RegisterTeacherPage;