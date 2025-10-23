import React, { useState, useEffect } from 'react';
import { EmployeeReview, PeerReviewAssessment, SelfAssessment, NewManagerAssessmentPayload } from '../types';
import XIcon from './icons/XIcon';
import StarIcon from './icons/StarIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import RatingInput from './RatingInput';

interface EmployeeReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: EmployeeReview | null;
  onSaveManagerAssessment: (reviewId: number, payload: NewManagerAssessmentPayload) => Promise<void>;
  onFinalizeManagerAssessment: (reviewId: number, payload: NewManagerAssessmentPayload) => Promise<void>;
}

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => (
    <div className="flex items-center font-semibold">
        <StarIcon className="w-5 h-5 mr-1.5 text-amber-400" />
        <span className="text-slate-800">{score}</span>
        <span className="text-slate-400 text-sm">/10</span>
    </div>
);

const SelfAssessmentSection: React.FC<{ assessment: SelfAssessment }> = ({ assessment }) => (
    <div className="space-y-4">
        <div>
            <h4 className="text-sm font-semibold text-slate-600">Каких результатов удалось достичь?</h4>
            <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.result}</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-600">Какой личный вклад был сделан?</h4>
            <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.personalContribution}</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-600">Что забираешь с собой по результатам?</h4>
            <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.experience}</p>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-slate-600">Что будешь делать по-другому?</h4>
            <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.future}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-1">Качество взаимодействия</h4>
                <ScoreDisplay score={assessment.interactionScore} />
            </div>
             <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-1">Общая удовлетворенность</h4>
                <ScoreDisplay score={assessment.satisfaction} />
            </div>
        </div>
    </div>
);

const PeerAssessmentSection: React.FC<{ assessments: PeerReviewAssessment[] }> = ({ assessments }) => (
    <div className="space-y-4">
        {assessments.map((assessment, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-white">
                <h5 className="font-bold text-slate-800 mb-3">Оценка респондента №{index + 1}</h5>
                <div className="space-y-3">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-600 mb-1">Оценка результата</h4>
                            <ScoreDisplay score={assessment.resultScore} />
                        </div>
                         <div>
                            <h4 className="text-sm font-semibold text-slate-600 mb-1">Качество взаимодействия</h4>
                            <ScoreDisplay score={assessment.interactionScore} />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-600">Сильные стороны (комментарий)</h4>
                        <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.comment}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-600">Зоны роста (рекомендации)</h4>
                        <p className="mt-1 text-slate-800 bg-slate-50 p-2 rounded-md">{assessment.recommendation}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const EmployeeReviewDetailModal: React.FC<EmployeeReviewDetailModalProps> = ({ isOpen, onClose, review, onSaveManagerAssessment, onFinalizeManagerAssessment }) => {
  const [resultScore, setResultScore] = useState<number | ''>('');
  const [strengthsComment, setStrengthsComment] = useState('');
  const [contributionComment, setContributionComment] = useState('');
  const [interactionScore, setInteractionScore] = useState<number | ''>('');
  const [recommendations, setRecommendations] = useState('');
  const [overallRating, setOverallRating] = useState<number | ''>('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (review?.managerAssessment) {
        const { managerAssessment } = review;
        setResultScore(managerAssessment.resultScore);
        setStrengthsComment(managerAssessment.strengthsComment);
        setContributionComment(managerAssessment.contributionComment);
        setInteractionScore(managerAssessment.interactionScore);
        setRecommendations(managerAssessment.recommendations);
        setOverallRating(managerAssessment.overallRating);
    } else {
        setResultScore('');
        setStrengthsComment('');
        setContributionComment('');
        setInteractionScore('');
        setRecommendations('');
        setOverallRating('');
    }
    setError(null);
    setIsSaving(false);
    setIsFinalizing(false);
  }, [review]);


  if (!isOpen) return null;
  
  const isFormValid = resultScore !== '' && strengthsComment && contributionComment && interactionScore !== '' && recommendations && overallRating !== '';

  const createPayload = (): NewManagerAssessmentPayload | null => {
      if (!isFormValid) return null;
      return {
          resultScore: resultScore as number,
          strengthsComment,
          contributionComment,
          interactionScore: interactionScore as number,
          recommendations,
          overallRating: overallRating as number,
      };
  };
  
  const handleSave = async () => {
    const payload = createPayload();
    if (!review || !payload) {
        setError("Пожалуйста, заполните все поля руководителя.");
        return;
    }
    setError(null);
    setIsSaving(true);
    try {
        await onSaveManagerAssessment(review.id, payload);
    } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось сохранить оценку');
    } finally {
        setIsSaving(false);
    }
  };
  
  const handleFinalize = async () => {
    const payload = createPayload();
    if (!review || !payload) {
        setError("Пожалуйста, заполните все поля руководителя.");
        return;
    }
    setError(null);
    setIsFinalizing(true);
    try {
        await onFinalizeManagerAssessment(review.id, payload);
    } catch (e) {
        setError(e instanceof Error ? e.message : 'Не удалось зафиксировать оценку');
    } finally {
        setIsFinalizing(false);
    }
  };

  const title = review?.taskName || `Оценка №${review?.id}`;
  const description = review?.taskDescription || review?.selfAssessment?.result;

  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">
            Детали оценки
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Закрыть">
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </header>

        <div className="p-6 overflow-y-auto text-sm">
            {review ? (
                <div className="space-y-6">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="text-sm font-medium text-slate-600">Задача</p>
                        <p className="font-semibold text-lg text-slate-900">{title}</p>
                        <p className="text-sm text-slate-500 mt-1">{description}</p>
                    </div>

                    <div>
                        <div className="flex items-center mb-4">
                            <UserCircleIcon className="w-6 h-6 mr-3 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-800">Самооценка сотрудника</h3>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                           <SelfAssessmentSection assessment={review.selfAssessment} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-4">
                            <UserGroupIcon className="w-6 h-6 mr-3 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-800">Оценки респондентов ({review.respAssessments.length})</h3>
                        </div>
                        {review.respAssessments.length > 0 ? (
                           <PeerAssessmentSection assessments={review.respAssessments} />
                        ) : (
                           <div className="text-center p-8 bg-white rounded-lg border border-slate-200">
                                <p className="text-slate-500">Оценки от респондентов отсутствуют.</p>
                           </div>
                        )}
                    </div>
                    
                    {/* Manager Assessment Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <ClipboardCheckIcon className="w-6 h-6 mr-3 text-indigo-600" />
                            <h3 className="text-lg font-semibold text-slate-800">Оценка руководителя</h3>
                        </div>
                         {error && <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">{error}</div>}
                        <div className="p-4 space-y-4 bg-slate-50 rounded-lg border border-slate-200">
                           <RatingInput label="Насколько сотруднику удалось достичь результатов, которые были запланированы по задаче?" value={resultScore} onChange={setResultScore} required/>
                           <div>
                                <label htmlFor="strengths-comment" className="block text-sm font-medium text-slate-700">Прокомментируй, какие личные качества помогли сотруднику достичь результата *</label>
                                <textarea id="strengths-comment" value={strengthsComment} onChange={e => setStrengthsComment(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                           </div>
                            <div>
                                <label htmlFor="contribution-comment" className="block text-sm font-medium text-slate-700">Какой личный вклад ты можешь выделить в результатах сотрудника? *</label>
                                <textarea id="contribution-comment" value={contributionComment} onChange={e => setContributionComment(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                           </div>
                           <RatingInput label="Оцени качество взаимодействия по общей оценке коллег" value={interactionScore} onChange={setInteractionScore} required/>
                           <div>
                                <label htmlFor="recommendations-comment" className="block text-sm font-medium text-slate-700">Что ты порекомендуешь улучшить сотруднику в следующем цикле? *</label>
                                <textarea id="recommendations-comment" value={recommendations} onChange={e => setRecommendations(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                           </div>
                           <RatingInput label="Какой общий рейтинг ты можешь выделить для сотрудника?" value={overallRating} onChange={setOverallRating} required/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center p-8">Ошибка: данные для оценки не найдены.</div>
            )}
        </div>

        <footer className="px-6 py-4 bg-slate-50 rounded-b-lg flex justify-between items-center sticky bottom-0 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Закрыть</button>
             <div className="flex items-center space-x-3">
                <button 
                  type="button" 
                  onClick={handleSave}
                  disabled={!isFormValid || isSaving || isFinalizing}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button 
                  type="button" 
                  onClick={handleFinalize}
                  disabled={!isFormValid || isSaving || isFinalizing}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                  {isFinalizing ? 'Фиксация...' : 'Зафиксировать'}
                </button>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default EmployeeReviewDetailModal;