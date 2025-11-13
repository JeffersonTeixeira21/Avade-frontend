'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  question: string; // ex: "q1"
  onChange: (question: string, score: number) => void;
  value?: number;
};

const RatingRadio: React.FC<Props> = ({ question, onChange, value }) => {
  const [selected, setSelected] = useState<number | null>(value ?? null);

  useEffect(() => {
    if (typeof value === 'number') setSelected(value);
  }, [value]);

  const handleChange = (score: number) => {
    setSelected(score);
    onChange(question, score);
  };

  return (
    <div className="flex items-center justify-between rating-radio">
      <span className="text-sm text-red-500">Ruim (1)</span>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map(score => (
          <label key={`${question}-${score}`} title={String(score)} className="inline-flex items-center cursor-pointer select-none">
            <input
              id={`${question}-${score}`}
              name={question}
              type="radio"
              value={score}
              checked={selected === score}
              onChange={() => handleChange(score)}
              className="sr-only"
            />
            <div
              aria-hidden
              className={`w-10 h-10 flex items-center justify-center rounded-md border-2 ${
                selected === score
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => handleChange(score)}
            >
              {score}
            </div>
          </label>
        ))}
      </div>
      <span className="text-sm text-green-500">Excelente (5)</span>
    </div>
  );
};

export default RatingRadio;