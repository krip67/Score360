import React from 'react';
import PlusIcon from './icons/PlusIcon';

interface AddGoalCardProps {
  onClick: () => void;
}

const AddGoalCard: React.FC<AddGoalCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 flex flex-col items-center justify-center p-5 text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label="Добавить новую цель"
    >
      <PlusIcon className="w-12 h-12 mb-2" />
      <span className="font-semibold text-center">Добавить новую цель</span>
    </button>
  );
};

export default AddGoalCard;