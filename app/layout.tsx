import React from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
    title: 'Sistema de Avaliação Educacional',
    description: 'Sistema para avaliação de professores pelos alunos.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="pt-BR">
            <body className="min-h-screen flex flex-col bg-gray-100">
                <Navbar />
                <main className="flex-grow">{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;