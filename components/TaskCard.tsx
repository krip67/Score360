import React from 'react';
import { Goal, TaskPriority } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import TagIcon from './icons/TagIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';
import ScaleIcon from './icons/ScaleIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';

interface GoalCardProps {
  goal: Goal;
  onClick: (goalId: number) => void;
  onShowParent: (parentId: number) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const priorityConfig: { [key in TaskPriority]: { text: string; borderColor: string; iconColor: string; } } = {
  HIGHEST: { text: 'Наивысший', borderColor: 'border-red-500', iconColor: 'text-red-500' },
  HIGH:    { text: 'Высокий', borderColor: 'border-orange-400', iconColor: 'text-orange-400' },
  LOW:     { text: 'Низкий', borderColor: 'border-sky-400', iconColor: 'text-sky-400' },
  LOWEST:  { text: 'Наинизший', borderColor: 'border-green-400', iconColor: 'text-green-400' },
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick, onShowParent }) => {
  const hasSubtasks = goal.subtaskIds.length > 0;
  const config = goal.priority ? priorityConfig[goal.priority] : null;
  const borderColor = config ? config.borderColor : 'border-slate-300';

  const CardWrapper = hasSubtasks ? 'button' : 'div';

  const handleShowParentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (goal.parentTaskId !== null) {
      onShowParent(goal.parentTaskId);
    }
  };

  return (
    <CardWrapper
      onClick={() => hasSubtasks && onClick(goal.id)}
      className={`bg-white rounded-lg shadow-lg flex flex-col border-t-4 ${borderColor} text-left w-full ${hasSubtasks ? 'hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : ''}`}
      aria-label={hasSubtasks ? `Показать детали цели: ${goal.name}` : undefined}
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-slate-900 pr-2">{goal.name}</h3>
            <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <TagIcon className="w-4 h-4 mr-1.5" />
              {goal.categoryName}
            </span>
        </div>
        <p className="text-slate-600 text-sm mb-4">{goal.description}</p>
        
        {goal.metricName && (
             <div className="flex items-start text-sm text-slate-500 mt-4 p-3 bg-slate-50 rounded-md border border-slate-200">
                <ScaleIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="flex-1"><span className="font-semibold text-slate-600">Метрика:</span> {goal.metricName}</span>
            </div>
        )}
      </div>

      <div className="bg-slate-50 p-4 rounded-b-lg border-t border-slate-200 text-sm">
        <div className="space-y-3">
            {config && (
              <div className={`flex items-center font-semibold ${config.iconColor}`}>
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                  <span>Приоритет: {config.text}</span>
              </div>
            )}
            {hasSubtasks && (
                <div className="flex items-center text-indigo-700 font-semibold">
                    <ClipboardListIcon className="w-5 h-5 mr-2" />
                    <span>{goal.subtaskIds.length} подцелей</span>
                </div>
            )}
            <div className="flex items-center justify-between text-slate-500">
                <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-slate-400" />
                    <span className="font-medium text-green-600">{formatDate(goal.dateStart)}</span>
                </div>
                <span className="mx-2">→</span>
                <div className="flex items-center">
                    <span className="font-medium text-red-600">{formatDate(goal.dateEnd)}</span>
                </div>
            </div>
        </div>
        {goal.parentTaskId !== null && (
          <div className="mt-4 pt-3 border-t border-slate-200">
            <button
              onClick={handleShowParentClick}
              className="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              aria-label={`Показать ключевую цель для ${goal.name}`}
            >
              <ArrowUpIcon className="w-5 h-5 mr-2" />
              Ключевая цель
            </button>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default GoalCard;