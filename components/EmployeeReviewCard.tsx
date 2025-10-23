import React from 'react';
import { EmployeeReview } from '../types';
import StarIcon from './icons/StarIcon';

interface EmployeeReviewCardProps {
  review: EmployeeReview;
  onDetailsClick: (review: EmployeeReview) => void;
}

const truncateText = (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

const ScoreBadge: React.FC<{ label: string; score: number | string }> = ({ label, score }) => (
    <div className="flex flex-col items-center justify-center p-2 bg-slate-100 rounded-md w-1/2">
        <span className="text-xs text-slate-500">{label}</span>
        <div className="flex items-center font-bold text-slate-700">
            <StarIcon className="w-4 h-4 mr-1 text-amber-400" />
            <span>{typeof score === 'number' ? score.toFixed(1) : score}</span>
        </div>
    </div>
);

const EmployeeReviewCard: React.FC<EmployeeReviewCardProps> = ({ review, onDetailsClick }) => {
    const { selfAssessment, respAssessments, taskName, taskDescription } = review;

    const selfScore = (selfAssessment.interactionScore + selfAssessment.satisfaction) / 2;
    const peerScore = respAssessments.length > 0 
        ? respAssessments.reduce((acc, r) => acc + r.resultScore + r.interactionScore, 0) / (respAssessments.length * 2) 
        : 'N/A';
    
    const title = taskName || `Оценка №${review.id}`;
    const description = taskDescription || selfAssessment.result;

    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col border-t-4 border-indigo-500 w-full">
            <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm mb-4 h-10">{truncateText(description, 70)}</p>

                <div className="flex items-center space-x-2">
                    <ScoreBadge label="Самооценка" score={selfScore} />
                    <ScoreBadge label="Оценка коллег" score={peerScore} />
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-b-lg border-t border-slate-200">
                <button
                    onClick={() => onDetailsClick(review)}
                    className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Оценить
                </button>
            </div>
        </div>
    );
};

export default EmployeeReviewCard;