'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: 'admin' | 'student') => {
    // Gera um ID de usuário simples e salva no localStorage (simula autenticação em memória)
    const userId = `${role}_${Math.random().toString(36).substring(2, 9)}`;
    const user = { id: userId, role };
    try {
      localStorage.setItem('eduavalie_user', JSON.stringify(user));
    } catch (e) {
      // localStorage pode falhar em ambientes restritos; ignorar
      console.warn('localStorage unavailable', e);
    }

    // Redireciona para a página correspondente
    if (role === 'admin') {
      router.push('/performance');
    } else {
      router.push('/evaluation');
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center p-6">
      <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Bem-vindo(a) ao EduAvalia</h2>
        <p className="text-center text-gray-600 mb-8">Selecione seu perfil para acessar o sistema.</p>

        <div className="text-center text-sm mb-4">
          <p className="text-green-600 font-medium">Sistema em modo "Em Memória". Dados não serão persistidos.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            id="login-admin-btn"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out shadow-md"
          >
            Acessar como Administrador (Cadastro/Gráficos)
          </button>
          <button
            onClick={() => handleLogin('student')}
            id="login-student-btn"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-md"
          >
            Acessar como Aluno (Avaliações)
          </button>
        </div>
      </div>
    </main>
  );
}