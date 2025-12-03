'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function VLibrasWidget() {
  useEffect(() => {
    const container = document.getElementById('vlibras-container');
    const accessButton = document.getElementById('vlibras-access-btn');
    const wrapper = document.getElementById('vlibras-wrapper');

    if (container) container.setAttribute('vw', '');
    if (accessButton) accessButton.setAttribute('vw-access-button', '');
    if (wrapper) wrapper.setAttribute('vw-plugin-wrapper', '');
  }, []);

  return (
    <>
      <div id="vlibras-container" className="enabled">
        <div id="vlibras-access-btn" className="active"></div>
        <div id="vlibras-wrapper">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
          }
        }}
      />
    </>
  );
}
