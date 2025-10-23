import React, { useState, useEffect, useCallback } from 'react';
import { Goal, User, NewSelfAssessmentPayload } from '../types';
import XIcon from './icons/XIcon';
import RatingInput from './RatingInput';

interface SelfAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: NewSelfAssessmentPayload) => Promise<void>;
  tasks: Goal[];
}

const MOCK_USERS: User[] = [
  { id: 1, username: "krip67", firstName: "Илья", lastName: "Припеченков", patronymic: "Михайлович", tabNum: 1111 },
  { id: 2, username: "ivanov_i", firstName: "Иван", lastName: "Иванов", patronymic: "Петрович", tabNum: 1112 },
  { id: 3, username: "petrova_a", firstName: "Анна", lastName: "Петрова", patronymic: "Сергеевна", tabNum: 1113 },
  { id: 4, username: "sidorov_s", firstName: "Сергей", lastName: "Сидоров", patronymic: "Андреевич", tabNum: 1114 },
];

const SelfAssessmentModal: React.FC<SelfAssessmentModalProps> = ({ isOpen, onClose, onSave, tasks }) => {
  const [taskId, setTaskId] = useState<number | ''>('');
  const [result, setResult] = useState('');
  const [personalContribution, setPersonalContribution] = useState('');
  const [experience, setExperience] = useState('');
  const [future, setFuture] = useState('');
  const [interactionScore, setInteractionScore] = useState<number | ''>('');
  const [satisfaction, setSatisfaction] = useState<number | ''>('');
  const [reviewerIds, setReviewerIds] = useState<number[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setTaskId('');
    setResult('');
    setPersonalContribution('');
    setExperience('');
    setFuture('');
    setInteractionScore('');
    setSatisfaction('');
    setReviewerIds([]);
    setError(null);
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        setIsLoadingUsers(true);
        setError(null);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          setUsers(MOCK_USERS);
        } catch (e) {
          setError(e instanceof Error ? `Не удалось загрузить сотрудников: ${e.message}` : 'Произошла неизвестная ошибка');
        } finally {
          setIsLoadingUsers(false);
        }
      };
      fetchUsers();
    } else {
        resetForm();
    }
  }, [isOpen, resetForm]);
  
  const handleUserToggle = (userId: number) => {
    setReviewerIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const isFormValid = taskId && result && personalContribution && experience && future && interactionScore !== '' && satisfaction !== '' && reviewerIds.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
        setError("Пожалуйста, заполните все обязательные поля.");
        return;
    }
    setError(null);
    setIsSaving(true);
    try {
        const payload: NewSelfAssessmentPayload = {
            taskId: taskId as number,
            result,
            personalContribution,
            experience,
            future,
            interactionScore: interactionScore as number,
            satisfaction: satisfaction as number,
            reviewerIds,
        };
        await onSave(payload);
    } catch (e) {
        if (e instanceof Error) setError(`Не удалось сохранить оценку: ${e.message}`);
        else setError('Произошла неизвестная ошибка при сохранении.');
        setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">Создание самооценки</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          <div className="p-6 space-y-4 overflow-y-auto">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            
            <div>
              <label htmlFor="task-select" className="block text-sm font-medium text-slate-700">Задача *</label>
              <select id="task-select" value={taskId} onChange={e => setTaskId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required>
                  <option value="" disabled>Выберите задачу</option>
                  {tasks.map(task => (
                      <option key={task.id} value={task.id}>{task.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label htmlFor="self-result" className="block text-sm font-medium text-slate-700">Каких результатов удалось достичь? *</label>
              <textarea id="self-result" value={result} onChange={e => setResult(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>

            <div>
              <label htmlFor="self-contribution" className="block text-sm font-medium text-slate-700">Какой личный вклад ты сделал в полученный результат? *</label>
              <textarea id="self-contribution" value={personalContribution} onChange={e => setPersonalContribution(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>

            <div>
              <label htmlFor="self-experience" className="block text-sm font-medium text-slate-700">Что ты забираешь с собой по результатам выполнения этой задачи? *</label>
              <textarea id="self-experience" value={experience} onChange={e => setExperience(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>

             <div>
              <label htmlFor="self-future" className="block text-sm font-medium text-slate-700">Что в следующий раз будешь делать по-другому? *</label>
              <textarea id="self-future" value={future} onChange={e => setFuture(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>

            <div className="space-y-4">
              <RatingInput
                label="Как ты оцениваешь качество своего взаимодействия с коллегами, командой по данной задаче?"
                value={interactionScore}
                onChange={setInteractionScore}
                required
              />
              <RatingInput
                label="Как ты оцениваешь общую удовлетворенность своим выполнением данной задачи?"
                value={satisfaction}
                onChange={setSatisfaction}
                required
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Респонденты *</label>
                <div className="border border-slate-300 rounded-md max-h-40 overflow-y-auto">
                  {isLoadingUsers ? ( <div className="p-4 text-center text-slate-500">Загрузка...</div> ) 
                  : users.length > 0 ? (
                    <ul className="divide-y divide-slate-200">
                      {users.map(user => (
                        <li key={user.id}>
                           <label className="flex items-center p-3 cursor-pointer hover:bg-slate-50">
                             <input type="checkbox" className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" checked={reviewerIds.includes(user.id)} onChange={() => handleUserToggle(user.id)} />
                             <span className="ml-3 text-sm text-slate-800">{`${user.lastName} ${user.firstName}`}</span>
                           </label>
                        </li>
                      ))}
                    </ul>
                  ) : ( <div className="p-4 text-center text-slate-500">Сотрудники не найдены.</div> )}
                </div>
            </div>

          </div>
          <footer className="flex-shrink-0 px-6 py-4 bg-slate-50 rounded-b-lg flex justify-end items-center space-x-3 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Отмена</button>
            <button type="submit" disabled={!isFormValid || isSaving} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed">
              {isSaving ? 'Сохранение...' : 'Оценить'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default SelfAssessmentModal;
