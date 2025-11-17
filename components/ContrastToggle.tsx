'use client';

import { useState, useEffect } from 'react';

export default function ContrastToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [enabled]);

  return (
    <button
      className="fixed left-4 bottom-20 z-50 bg-black text-white px-3 py-2 rounded-lg shadow-md"
      onClick={() => setEnabled(!enabled)}
      aria-label="Alternar alto contraste"
    >
      Contraste
    </button>
  );
}
