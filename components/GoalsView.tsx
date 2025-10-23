import React, { useState } from 'react';
import { Goal } from '../types';
import GoalCard from './TaskCard';
import AddGoalCard from './AddTaskCard';

interface GoalsViewProps {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  onAddGoalClick: () => void;
  onGoalClick: (goalId: number) => void;
  onShowParentClick: (parentId: number) => void;
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals, loading, error, onAddGoalClick, onGoalClick, onShowParentClick }) => {
  const [activeTab, setActiveTab] = useState('peerReview'); // 'my360', 'self', 'peerReview'

  const renderPeerReviewContent = () => {
    if (loading && goals.length === 0) {
      return <div className="text-center text-gray-500 mt-10">Загрузка целей...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-10">{error}</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onClick={onGoalClick} onShowParent={onShowParentClick} />
        ))}
        <AddGoalCard onClick={onAddGoalClick} />
      </div>
    );
  };

  const renderPlaceholderContent = (title: string) => (
    <div className="flex items-center justify-center h-full mt-10">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-600">Раздел "{title}"</h2>
            <p className="text-slate-500 mt-2">Этот раздел находится в разработке.</p>
        </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('my360')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'my360'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Моя оценка 360
          </button>
          <button
            onClick={() => setActiveTab('self')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'self'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Самооценка
          </button>
          <button
            onClick={() => setActiveTab('peerReview')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'peerReview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
            aria-current={activeTab === 'peerReview' ? 'page' : undefined}
          >
            Оценка коллег
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'my360' && renderPlaceholderContent('Моя оценка 360')}
        {activeTab === 'self' && renderPlaceholderContent('Самооценка')}
        {activeTab === 'peerReview' && renderPeerReviewContent()}
      </div>
    </div>
  );
};

export default GoalsView;
