'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    <div className="flex items-center">
                        <span className="text-2xl font-bold tracking-wider cursor-pointer"
                              onClick={() => router.push('/')}>
                            EduAvalia
                        </span>
                    </div>

                    <nav className="flex space-x-4">
                        <button
                            onClick={() => handleNavigation('/evaluation')}
                            className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition"
                        >
                            Avaliação
                        </button>

                        <button
                            onClick={() => handleNavigation('/performance')}
                            className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition"
                        >
                            Gráficos
                        </button>

                        <button
                            onClick={() => handleNavigation('/register/student')}
                            className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition"
                        >
                            Cad. Alunos
                        </button>

                        <button
                            onClick={() => handleNavigation('/register/teacher')}
                            className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition"
                        >
                            Cad. Professores
                        </button>

                        <button
                            onClick={() => handleNavigation('/about')}
                            className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition"
                        >
                            Sobre Nós
                        </button>

                        <button
                            onClick={() => router.push('/login')}
                            className="text-sm font-medium bg-gray-100 text-blue-700 hover:bg-gray-200 px-3 py-2 rounded-md transition"
                        >
                            Início
                        </button>
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
