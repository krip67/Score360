import React, { useState, useEffect, useCallback } from 'react';
import { ReviewGoal, NewPeerReviewPayload } from '../types';
import XIcon from './icons/XIcon';
import RatingInput from './RatingInput';

interface ReviewEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reviewId: number, payload: NewPeerReviewPayload) => Promise<void>;
  goal: ReviewGoal | null;
}

const ReviewEditModal: React.FC<ReviewEditModalProps> = ({ isOpen, onClose, onSave, goal }) => {
  const [resultsScore, setResultsScore] = useState<number | ''>('');
  const [qualitiesComment, setQualitiesComment] = useState('');
  const [interactionScore, setInteractionScore] = useState<number | ''>('');
  const [improvementComment, setImprovementComment] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setError(null);
    setIsSaving(false);
    setResultsScore('');
    setQualitiesComment('');
    setInteractionScore('');
    setImprovementComment('');
  }, []);

  useEffect(() => {
    if (isOpen) {
        resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || qualitiesComment === '' || improvementComment === '' || resultsScore === '' || interactionScore === '') {
        setError("Пожалуйста, заполните все поля.");
        return;
    }

    setError(null);
    setIsSaving(true);
    
    try {
        const payload: NewPeerReviewPayload = {
            resultScore: Number(resultsScore),
            comment: qualitiesComment,
            interactionScore: Number(interactionScore),
            recommendation: improvementComment
        };
        await onSave(goal.id, payload);
    } catch (e) {
        if (e instanceof Error) setError(`Не удалось сохранить оценку: ${e.message}`);
        else setError('Произошла неизвестная ошибка при сохранении.');
        setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = goal && qualitiesComment && improvementComment && resultsScore !== '' && interactionScore !== '';

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
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">Оценка коллеги</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          <div className="p-6 space-y-4 overflow-y-auto">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</div>}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                <p className="text-sm font-medium text-slate-600">Цель</p>
                <p className="font-semibold text-slate-900">{goal?.taskName}</p>
                <p className="text-sm text-slate-500 mt-1">{goal?.taskDescription}</p>
            </div>
            
            <RatingInput
              label="Насколько удалось сотруднику достичь результатов, которые были запланированы по задаче?"
              value={resultsScore}
              onChange={setResultsScore}
              required
            />

            <div>
              <label htmlFor="qualities-comment" className="block text-sm font-medium text-slate-700">Прокомментируй, какие личные качества помогли коллеге достичь результата *</label>
              <textarea 
                id="qualities-comment" 
                value={qualitiesComment} 
                onChange={e => setQualitiesComment(e.target.value)} 
                rows={3} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            
            <RatingInput
              label="Оцени качество взаимодействия"
              value={interactionScore}
              onChange={setInteractionScore}
              required
            />
            
            <div>
              <label htmlFor="improvement-comment" className="block text-sm font-medium text-slate-700">Что сотрудник может улучшить в своей работе по задаче в следующее полугодие? *</label>
              <textarea 
                id="improvement-comment" 
                value={improvementComment} 
                onChange={e => setImprovementComment(e.target.value)} 
                rows={3} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>

          </div>
          <footer className="flex-shrink-0 px-6 py-4 bg-slate-50 rounded-b-lg flex justify-end items-center space-x-3 border-t">
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

export default ReviewEditModal;