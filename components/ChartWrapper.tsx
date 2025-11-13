// components/ChartWrapper.tsx
'use client';

import React from 'react';

// IMPORTAÇÕES CORRETAS PARA RADAR CHART
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController, // <-- ESSENCIAL
  ChartOptions,
} from 'chart.js';

// REGISTRO COMPLETO — AGORA FUNCIONA
ChartJS.register(
  RadialLinearScale,
  RadarController,   // <-- ESSENCIAL
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ChartWrapperProps {
  labels: string[];
  data: number[];
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ labels, data }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<ChartJS | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // destrói instância anterior
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new ChartJS(ctx, {
      type: 'radar', // <-- seu gráfico RADAR agora funciona
      data: {
        labels,
        datasets: [
          {
            label: 'Média de Desempenho (Escala 1-5)',
            data,
            backgroundColor: 'rgba(66, 153, 225, 0.4)',
            borderColor: 'rgba(66, 153, 225, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(66, 153, 225, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(66, 153, 225, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 5,
            angleLines: { display: false },
            ticks: {
              stepSize: 1,
              backdropColor: 'rgba(255,255,255,0.7)',
            },
          },
        },
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (context) => `Média: ${context.formattedValue}`,
            },
          },
        },
      } as ChartOptions,
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, data]);

  return (
    <div className="relative h-96">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ChartWrapper;
