'use client'; 

import Script from 'next/script';
import React from 'react';

export default function VLibrasWidget() {
  return (
    <>
      <div vw="" className="enabled">
        <div vw-access-button="" className="active"></div>
        <div vw-plugin-wrapper="">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <Script 
        src="https://vlibras.gov.br/app/vlibras-plugin.js" 
        strategy="afterInteractive" // <-- ALTERADO PARA CARREGAR MAIS CEDO
        onLoad={() => {
          // Garante que o objeto VLibras existe antes de tentar inicializar
          if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
          }
        }}
      />
    </>
  );
}