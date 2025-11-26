"use client";

import { useEffect, useState } from "react";

export default function ReadingRuler() {
  const [enabled, setEnabled] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      setY(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  return (
    <>
      {/* Botão de ativação */}
      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed left-4 bottom-36 z-[9999] bg-purple-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-purple-700"
      >
        Barra de leitura
      </button>

      {/* Regua */}
      {enabled && (
        <div
          className="pointer-events-none fixed left-0 w-full h-6 bg-yellow-400 opacity-70 z-[9998] transition-all duration-75"
          style={{ top: y - 12 }}
        ></div>
      )}
    </>
  );
}
