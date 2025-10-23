import React, { useState, useEffect, useCallback } from 'react';
import { User, NewReviewPayload, Goal } from '../types';
import XIcon from './icons/XIcon';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: NewReviewPayload) => Promise<void>;
  goal: Goal | null;
}

const MOCK_USERS: User[] = [
  { id: 1, username: "krip67", firstName: "Илья", lastName: "Припеченков", patronymic: "Михайлович", tabNum: 1111 },
  { id: 2, username: "ivanov_i", firstName: "Иван", lastName: "Иванов", patronymic: "Петрович", tabNum: 1112 },
  { id: 3, username: "petrova_a", firstName: "Анна", lastName: "Петрова", patronymic: "Сергеевна", tabNum: 1113 },
  { id: 4, username: "sidorov_s", firstName: "Сергей", lastName: "Сидоров", patronymic: "Андреевич", tabNum: 1114 },
];

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSave, goal }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setSelectedUserIds([]);
    setError(null);
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        setIsLoadingUsers(true);
        setError(null);
        try {
          // To use your real API, uncomment the lines below and remove the mock data logic.
          /*
          const response = await fetch('http://localhost:8080/user');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: User[] = await response.json();
          setUsers(data);
          */
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
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserIds.length === 0 || !goal) {
        setError("Пожалуйста, выберите хотя бы одного респондента.");
        return;
    }
    setError(null);
    setIsSaving(true);
    try {
        const payload: NewReviewPayload = {
            goalId: goal.id,
            reviewerIds: selectedUserIds,
        };
        await onSave(payload);
    } catch (e) {
        if (e instanceof Error) setError(`Не удалось отправить на оценку: ${e.message}`);
        else setError('Произошла неизвестная ошибка при сохранении.');
        setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = selectedUserIds.length > 0;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">Оценка цели</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          <div className="p-6 space-y-4 overflow-y-auto">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p className="text-sm font-medium text-slate-600">Цель</p>
                <p className="font-semibold text-slate-900">{goal?.name}</p>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Респонденты *</label>
                <div className="border border-slate-300 rounded-md max-h-60 overflow-y-auto">
                  {isLoadingUsers ? (
                    <div className="p-4 text-center text-slate-500">Загрузка сотрудников...</div>
                  ) : users.length > 0 ? (
                    <ul className="divide-y divide-slate-200">
                      {users.map(user => (
                        <li key={user.id}>
                           <label className="flex items-center p-3 cursor-pointer hover:bg-slate-50">
                             <input
                               type="checkbox"
                               className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                               checked={selectedUserIds.includes(user.id)}
                               onChange={() => handleUserToggle(user.id)}
                             />
                             <span className="ml-3 text-sm text-slate-800">{`${user.lastName} ${user.firstName} ${user.patronymic}`}</span>
                           </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                     <div className="p-4 text-center text-slate-500">Сотрудники не найдены.</div>
                  )}
                </div>
            </div>
          </div>
          <footer className="flex-shrink-0 px-6 py-4 bg-slate-50 rounded-b-lg flex justify-end items-center space-x-3 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Отмена</button>
            <button type="submit" disabled={!isFormValid || isSaving} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed">
              {isSaving ? 'Отправка...' : 'Отправить на оценку'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;