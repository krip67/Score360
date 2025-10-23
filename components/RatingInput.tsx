import React from 'react';

interface RatingInputProps {
  label: string;
  value: number | '';
  onChange: (value: number) => void;
  required?: boolean;
}

const RatingInput: React.FC<RatingInputProps> = ({ label, value, onChange, required }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && '*'}
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-10 h-10 rounded-md border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              value === num
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            aria-pressed={value === num}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
