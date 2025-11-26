'use client';

import { useState } from 'react';

export default function AccessibilityMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir/fechar */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed right-4 bottom-4 z-[9999]
          bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg
          hover:bg-blue-700 transition
        "
      >
        ♿ Acessibilidade
      </button>

      {open && (
        <div
          className="
            fixed right-4 bottom-20 z-[9999]
            bg-white shadow-2xl rounded-xl p-4 w-64
            border border-gray-200
            animate-fadeIn
          "
        >
          <h3 className="font-bold mb-3 text-gray-800">Acessibilidade</h3>

          {children}
        </div>
      )}
    </>
  );
}
