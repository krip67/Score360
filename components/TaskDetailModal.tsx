import React from 'react';
import { GoalDetail, TaskPriority } from '../types';
import XIcon from './icons/XIcon';
import CalendarIcon from './icons/CalendarIcon';
import TagIcon from './icons/TagIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import ScaleIcon from './icons/ScaleIcon';

interface GoalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: GoalDetail | null;
  isLoading: boolean;
  error: string | null;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const priorityConfig: { [key in TaskPriority]: { text: string; iconColor: string; } } = {
  HIGHEST: { text: 'Наивысший', iconColor: 'text-red-500' },
  HIGH:    { text: 'Высокий', iconColor: 'text-orange-400' },
  LOW:     { text: 'Низкий', iconColor: 'text-sky-400' },
  LOWEST:  { text: 'Наинизший', iconColor: 'text-green-400' },
};

const GoalDetailModal: React.FC<GoalDetailModalProps> = ({ isOpen, onClose, goal, isLoading, error }) => {
  if (!isOpen) return null;
  
  const config = goal?.priority ? priorityConfig[goal.priority] : null;

  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">
            {isLoading ? 'Загрузка...' : goal?.name || 'Детали цели'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
            {isLoading && <div className="text-center p-8">Загрузка деталей цели...</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            {goal && !isLoading && (
                <div>
                    <div className="mb-4">
                      <p className="text-slate-600">{goal.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center">
                            <TagIcon className="w-5 h-5 mr-2 text-indigo-500" />
                            <strong>Категория:</strong><span className="ml-2">{goal.categoryName}</span>
                        </div>
                         <div className="flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2 text-green-500" />
                            <strong>Начало:</strong><span className="ml-2">{formatDate(goal.dateStart)}</span>
                        </div>
                        {config && (
                            <div className={`flex items-center font-medium ${config.iconColor}`}>
                                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                                <strong>Приоритет:</strong><span className="ml-2">{config.text}</span>
                            </div>
                        )}
                        <div className="flex items-center">
                             <CalendarIcon className="w-5 h-5 mr-2 text-red-500" />
                            <strong>Окончание:</strong><span className="ml-2">{formatDate(goal.dateEnd)}</span>
                        </div>
                        {goal.metricName && (
                            <div className="flex items-start col-span-1 md:col-span-2 border-t border-slate-200 pt-3 mt-2">
                                <ScaleIcon className="w-5 h-5 mr-2 text-slate-500 flex-shrink-0 mt-0.5" />
                                <strong>Метрика:</strong><span className="ml-2 text-slate-600">{goal.metricName}</span>
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b pb-2">Подцели ({goal.subtasks.length})</h3>
                    <div className="space-y-3">
                        {goal.subtasks.length > 0 ? (
                            goal.subtasks.map(sub => (
                                <div key={sub.id} className="p-3 bg-white border border-slate-200 rounded-md hover:shadow-sm transition-shadow">
                                    <p className="font-semibold text-slate-900">{sub.name}</p>
                                    <p className="text-sm text-slate-500 mt-1">{sub.description}</p>
                                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-4">
                                       <span className="font-medium text-green-700">с {formatDate(sub.dateStart)}</span>
                                       <span className="font-medium text-red-700">по {formatDate(sub.dateEnd)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 text-sm">Подцели отсутствуют.</p>
                        )}
                    </div>
                </div>
            )}
        </div>

        <footer className="px-6 py-4 bg-slate-50 rounded-b-lg flex justify-end items-center space-x-3 sticky bottom-0 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Закрыть</button>
        </footer>
      </div>
    </div>
  );
};

export default GoalDetailModal;