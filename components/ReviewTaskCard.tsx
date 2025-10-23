import React from 'react';
import { ReviewGoal } from '../types';
import PencilIcon from './icons/PencilIcon';
import StarIcon from './icons/StarIcon';

interface ReviewGoalCardProps {
  goal: ReviewGoal;
  onEdit: (goal: ReviewGoal) => void;
}

const ScoreBadge: React.FC<{ resultsScore: number | null, interactionScore: number | null }> = ({ resultsScore, interactionScore }) => {
  if (resultsScore === null || interactionScore === null) {
    return (
      <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
        Нет оценки
      </span>
    );
  }
  
  const averageScore = (resultsScore + interactionScore) / 2;
  let colorClasses = 'bg-slate-100 text-slate-800';
  if (averageScore >= 8) colorClasses = 'bg-green-100 text-green-800';
  else if (averageScore >= 5) colorClasses = 'bg-yellow-100 text-yellow-800';
  else colorClasses = 'bg-red-100 text-red-800';

  return (
    <span className={`flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClasses}`}>
      <StarIcon className="w-4 h-4 mr-1.5" />
      {averageScore.toFixed(1)} / 10.0
    </span>
  );
};

const ReviewGoalCard: React.FC<ReviewGoalCardProps> = ({ goal, onEdit }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg flex flex-col border-t-4 border-slate-300 w-full"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 pr-2">{goal.taskName}</h3>
          <ScoreBadge resultsScore={null} interactionScore={null} />
        </div>
        <p className="text-slate-600 text-sm mb-4">{goal.taskDescription}</p>
      </div>

      <div className="bg-slate-50 p-4 rounded-b-lg border-t border-slate-200">
        <button
          onClick={() => onEdit(goal)}
          className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <PencilIcon className="w-5 h-5 mr-2" />
          Оценить цель
        </button>
      </div>
    </div>
  );
};

export default ReviewGoalCard;
