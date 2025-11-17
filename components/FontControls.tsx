'use client';

import { useState, useEffect } from 'react';

export default function FontControls() {
  const [size, setSize] = useState(100);

  useEffect(() => {
    document.documentElement.style.fontSize = `${size}%`;
  }, [size]);

  return (
    <div className="fixed left-4 bottom-4 z-50 bg-white shadow-md p-2 rounded-lg flex gap-2">
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setSize(Math.min(size + 10, 200))}
        aria-label="Aumentar texto"
      >
        A+
      </button>

      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setSize(Math.max(size - 10, 60))}
        aria-label="Diminuir texto"
      >
        A-
      </button>

      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => setSize(100)}
        aria-label="Restaurar tamanho padrão"
      >
        Reset
      </button>
    </div>
  );
}
