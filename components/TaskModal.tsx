import React, { useState, useEffect, useCallback } from 'react';
import { Category, NewGoalPayload, Metric, TaskPriority, Goal } from '../types';
import XIcon from './icons/XIcon';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: NewGoalPayload) => Promise<void>;
  categories: Category[];
  isLoadingCategories: boolean;
  goals: Goal[];
}

const priorityOptions: { [key in TaskPriority]: string } = {
  HIGHEST: 'Наивысший',
  HIGH: 'Высокий',
  LOW: 'Низкий',
  LOWEST: 'Наинизший',
};


const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, categories, isLoadingCategories, goals }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [metricId, setMetricId] = useState<number | ''>('');
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [parentId, setParentId] = useState<number | ''>('');

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setDateStart('');
    setDateEnd('');
    setCategoryId('');
    setMetricId('');
    setMetrics([]);
    setPriority('HIGH');
    setParentId('');
    setError(null);
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
        resetForm();
    }
  }, [isOpen, resetForm]);
  
  useEffect(() => {
    if (categoryId) {
        const fetchMetrics = async () => {
            setIsLoadingMetrics(true);
            setMetrics([]);
            setMetricId('');
            try {
                // To use your real API, uncomment the lines below and remove the mock data logic.
                /*
                const response = await fetch(`http://localhost:8080/metric/${categoryId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Metric[] = await response.json(); // Assuming API returns {id, description}
                setMetrics(data);
                */

                // Mocking the metric fetch
                await new Promise(resolve => setTimeout(resolve, 500));
                const MOCK_METRICS: Metric[] = [
                    { id: 1, description: "Количество пройденных образовательных курсов." },
                    { id: 2, description: "Средний балл сертификатов сертификации." },
                    { id: 3, description: "Рост профессиональной экспертизы (количество новых квалификаций)." },
                    { id: 4, description: "Процент освоения новых методик и инструментов." },
                    { id: 5, description: "Время освоения новой технологии (ускорение)." },
                    { id: 6, description: "Участие в профессиональных мероприятиях (конференции, воркшопы)." },
                    { id: 7, description: "Повышение собственной квалификации (уровень компетенций по внутреннему стандарту)." },
                    { id: 8, description: "Количественный показатель роста навыков лидерства (Leadership Skills Index)." },
                    { id: 9, description: "Коэффициент востребованности новых навыков на рынке труда. " },
                    { id: 10, description: "Степень овладения иностранными языками (уровень владения)." },
                    { id: 11, description: "Другое" }
                ];
                setMetrics(MOCK_METRICS);

            } catch (e) {
                console.error("Failed to load metrics", e);
                // Optionally set a metrics-specific error state
            } finally {
                setIsLoadingMetrics(false);
            }
        };
        fetchMetrics();
    } else {
        setMetrics([]);
        setMetricId('');
    }
  }, [categoryId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dateStart || !dateEnd || !categoryId || !metricId) {
        setError("Пожалуйста, заполните все обязательные поля, отмеченные *.");
        return;
    }
    setError(null);
    setIsSaving(true);
    try {
        const payload: NewGoalPayload = {
            name,
            description,
            dateStart: new Date(dateStart).toISOString(),
            dateEnd: new Date(dateEnd).toISOString(),
            category_id: categoryId,
            metricId: metricId,
            taskPriorityEnum: priority,
            ...(parentId && { parentId: parentId })
        };
        await onSave(payload);
    } catch (e) {
        if (e instanceof Error) setError(`Не удалось сохранить цель: ${e.message}`);
        else setError('Произошла неизвестная ошибка при сохранении.');
        setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = name && dateStart && dateEnd && categoryId && metricId;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">Новая цель</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            <div>
              <label htmlFor="goal-name" className="block text-sm font-medium text-slate-700">Название цели *</label>
              <input type="text" id="goal-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="goal-description" className="block text-sm font-medium text-slate-700">Описание</label>
              <textarea id="goal-description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-start" className="block text-sm font-medium text-slate-700">Дата начала *</label>
                <input type="date" id="date-start" value={dateStart} onChange={e => setDateStart(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="date-end" className="block text-sm font-medium text-slate-700">Дата окончания *</label>
                <input type="date" id="date-end" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Приоритет *</label>
                <select id="priority" value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required>
                    {Object.entries(priorityOptions).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="parent-id" className="block text-sm font-medium text-slate-700">Ключевая цель</label>
                <select 
                  id="parent-id" 
                  value={parentId} 
                  onChange={e => setParentId(e.target.value ? Number(e.target.value) : '')} 
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Не выбрана</option>
                  {goals.map(goal => (
                    <option key={goal.id} value={goal.id}>{goal.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Категория *</label>
                <select id="category" value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required disabled={isLoadingCategories}>
                    <option value="" disabled>{isLoadingCategories ? 'Загрузка...' : 'Выберите категорию'}</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {categoryId && (
                <div>
                    <label htmlFor="metric" className="block text-sm font-medium text-slate-700">Метрика *</label>
                    <select id="metric" value={metricId} onChange={e => setMetricId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required disabled={isLoadingMetrics || metrics.length === 0}>
                        <option value="" disabled>
                            {isLoadingMetrics ? 'Загрузка метрик...' : (metrics.length > 0 ? 'Выберите метрику' : 'Для этой категории нет метрик')}
                        </option>
                        {metrics.map(metric => (
                            <option key={metric.id} value={metric.id}>{metric.description}</option>
                        ))}
                    </select>
                </div>
            )}
          </div>
          <footer className="px-6 py-4 bg-slate-50 rounded-b-lg flex justify-end items-center space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Отмена</button>
            <button type="submit" disabled={!isFormValid || isSaving} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed">
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;