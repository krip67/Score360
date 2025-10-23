import React, { useState, useEffect, useCallback } from 'react';
import { ReviewGoal, Goal, NewSelfAssessmentPayload, NewPeerReviewPayload, EmployeeReview, NewManagerAssessmentPayload } from '../types';
import ReviewGoalCard from './ReviewTaskCard';
import ReviewEditModal from './ReviewEditModal';
import SelfAssessmentModal from './SelfAssessmentModal';
import PlusIcon from './icons/PlusIcon';
import EmployeeReviewCard from './EmployeeReviewCard';
import EmployeeReviewDetailModal from './EmployeeReviewDetailModal';

const MOCK_REVIEW_GOALS: ReviewGoal[] = [
  {
    id: 1,
    taskId: 4,
    taskName: "Разработка нового модуля",
    taskDescription: "Реализовать функционал аутентификации пользователей через социальные сети.",
  },
  {
    id: 2,
    taskId: 5,
    taskName: "Обновить документацию API",
    taskDescription: "Актуализировать Swagger/OpenAPI спецификации для всех эндпоинтов.",
  },
  {
    id: 3,
    taskId: 1,
    taskName: "Подготовить квартальный отчет",
    taskDescription: "Собрать данные по KPI и подготовить презентацию для руководства.",
  }
];

const MOCK_SELF_ASSESSMENT_GOALS: Goal[] = [
    {
        id: 101,
        name: "Завершить рефакторинг модуля авторизации",
        description: "Оптимизировать код, улучшить покрытие тестами и обновить документацию.",
        dateStart: "2025-11-01T09:00:00.000Z",
        dateEnd: "2025-11-30T18:00:00.000Z",
        categoryName: "Разработка",
        metricName: "Снижение технического долга.",
        priority: "HIGH",
        subtaskIds: [],
        parentTaskId: null
    },
    {
        id: 102,
        name: "Провести исследование конкурентов",
        description: "Анализ функционала, ценовой политики и маркетинговых стратегий основных конкурентов на рынке.",
        dateStart: "2025-11-05T09:00:00.000Z",
        dateEnd: "2025-11-20T18:00:00.000Z",
        categoryName: "Аналитика",
        metricName: "Полнота отчета.",
        priority: "LOW",
        subtaskIds: [],
        parentTaskId: null
    }
];

const MOCK_EMPLOYEE_REVIEWS: EmployeeReview[] = [
  {
    id: 14,
    taskId: 101,
    taskName: "Завершить рефакторинг модуля авторизации",
    taskDescription: "Оптимизировать код, улучшить покрытие тестами и обновить документацию.",
    selfAssessment: {
      result: "Модуль был успешно отрефакторен, покрытие тестами увеличено на 20%.",
      personalContribution: "Я полностью переписал слой доступа к данным и внедрил новые паттерны.",
      experience: "Получил ценный опыт в оптимизации SQL-запросов.",
      future: "В следующий раз буду использовать TDD с самого начала.",
      interactionScore: 8,
      satisfaction: 9
    },
    respAssessments: [
      {
        resultScore: 9,
        comment: "Отличная работа, код стал намного чище.",
        interactionScore: 8,
        recommendation: "Стоит уделить больше внимания документированию API."
      },
      {
        resultScore: 7,
        comment: "Были некоторые проблемы с коммуникацией в начале.",
        interactionScore: 6,
        recommendation: "Более четко формулировать требования к смежным командам."
      }
    ]
  },
   {
    id: 15,
    taskId: null,
    taskName: null,
    taskDescription: null,
    selfAssessment: {
      result: "Подготовлен детальный отчет по 5 ключевым конкурентам.",
      personalContribution: "Проанализировал более 50 источников, провел SWOT-анализ.",
      experience: "Научился работать с аналитическими платформами, такими как SimilarWeb.",
      future: "Буду использовать больше визуализации данных в отчетах.",
      interactionScore: 10,
      satisfaction: 8
    },
    respAssessments: [
      {
        resultScore: 10,
        comment: "Очень подробный и полезный отчет. Нашли несколько инсайтов.",
        interactionScore: 10,
        recommendation: "Все отлично!"
      }
    ]
  }
];


interface ReviewViewProps {
  goals: Goal[];
}

const ReviewView: React.FC<ReviewViewProps> = ({ goals: userGoals }) => {
    const [goals, setGoals] = useState<ReviewGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<ReviewGoal | null>(null);
    const [activeTab, setActiveTab] = useState('peerReview');

    const [isSelfAssessmentModalOpen, setIsSelfAssessmentModalOpen] = useState(false);
    
    const [selfAssessmentGoals, setSelfAssessmentGoals] = useState<Goal[]>([]);
    const [selfAssessmentLoading, setSelfAssessmentLoading] = useState(true);
    const [selfAssessmentError, setSelfAssessmentError] = useState<string | null>(null);

    const [employeeReviews, setEmployeeReviews] = useState<EmployeeReview[]>([]);
    const [loadingEmployeeReviews, setLoadingEmployeeReviews] = useState(true);
    const [errorEmployeeReviews, setErrorEmployeeReviews] = useState<string | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedDetailReview, setSelectedDetailReview] = useState<EmployeeReview | null>(null);
    
    const fetchReviewGoals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setGoals(MOCK_REVIEW_GOALS);
        } catch (e) {
            setError(e instanceof Error ? `Не удалось загрузить цели для оценки: ${e.message}` : 'Произошла неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    }, []);
    
    const fetchSelfAssessmentGoals = useCallback(async () => {
        setSelfAssessmentLoading(true);
        setSelfAssessmentError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setSelfAssessmentGoals(MOCK_SELF_ASSESSMENT_GOALS);
        } catch (e) {
            setSelfAssessmentError(e instanceof Error ? `Не удалось загрузить задачи для самооценки: ${e.message}` : 'Произошла неизвестная ошибка');
        } finally {
            setSelfAssessmentLoading(false);
        }
    }, []);
    
    const fetchEmployeeReviews = useCallback(async () => {
        setLoadingEmployeeReviews(true);
        setErrorEmployeeReviews(null);
        try {
            // To use your real API, uncomment the lines below and remove the mock logic.
            /*
            const response = await fetch('http://localhost:8080/review/boss');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: EmployeeReview[] = await response.json();
            setEmployeeReviews(data);
            */
            await new Promise(resolve => setTimeout(resolve, 800));
            setEmployeeReviews(MOCK_EMPLOYEE_REVIEWS);
        } catch (e) {
            setErrorEmployeeReviews(e instanceof Error ? `Не удалось загрузить оценки сотрудников: ${e.message}` : 'Произошла неизвестная ошибка');
        } finally {
            setLoadingEmployeeReviews(false);
        }
    }, []);


    useEffect(() => {
        if (activeTab === 'peerReview') {
            fetchReviewGoals();
        } else if (activeTab === 'self') {
            fetchSelfAssessmentGoals();
        } else if (activeTab === 'employeeReview') {
            fetchEmployeeReviews();
        }
    }, [activeTab, fetchReviewGoals, fetchSelfAssessmentGoals, fetchEmployeeReviews]);

    const handleOpenModal = (goal: ReviewGoal) => {
        setSelectedGoal(goal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGoal(null);
    };

    const handleSaveReview = async (reviewId: number, payload: NewPeerReviewPayload) => {
        console.log("Сохранение оценки:", reviewId, payload);
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log("Оценка успешно сохранена.");
        handleCloseModal();
    };

    const handleSaveSelfAssessment = async (payload: NewSelfAssessmentPayload) => {
        console.log("Сохранение самооценки:", payload);
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log("Самооценка успешно сохранена.");
        setIsSelfAssessmentModalOpen(false);
    };

    const handleOpenDetailModal = (review: EmployeeReview) => {
        setSelectedDetailReview(review);
        setIsDetailModalOpen(true);
    };

    const handleSaveManagerAssessment = async (reviewId: number, payload: NewManagerAssessmentPayload) => {
        console.log("Сохранение оценки руководителя:", reviewId, payload);
        // Here you would typically make an API call to save the data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Update local state to reflect the change
        setEmployeeReviews(prev => prev.map(r => r.id === reviewId ? { ...r, managerAssessment: payload } : r));
        
        console.log("Оценка руководителя успешно сохранена.");
        // We can keep the modal open after a save
    };

    const handleFinalizeManagerAssessment = async (reviewId: number, payload: NewManagerAssessmentPayload) => {
        console.log("Фиксация оценки руководителя:", reviewId, payload);
        // Here you would typically make an API call to finalize the data
        await new Promise(resolve => setTimeout(resolve, 800));

        // Update local state and close modal
        setEmployeeReviews(prev => prev.map(r => r.id === reviewId ? { ...r, managerAssessment: payload } : r));
        
        console.log("Оценка руководителя успешно зафиксирована.");
        setIsDetailModalOpen(false);
        setSelectedDetailReview(null);
    };

    const renderPeerReviewContent = () => {
        if (loading) {
            return <div className="text-center text-gray-500 mt-10">Загрузка целей для оценки...</div>;
        }

        if (error) {
            return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-10">{error}</div>;
        }
        
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {goals.length > 0 ? (
                    goals.map(goal => (
                        <ReviewGoalCard key={goal.id} goal={goal} onEdit={handleOpenModal} />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center h-full">
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-600">Целей для оценки нет</h2>
                            <p className="text-slate-500 mt-2">Вам пока не назначили ни одной цели для оценки.</p>
                        </div>
                    </div>
                )}
            </div>
        )
    };

    const renderSelfAssessmentContent = () => {
        if (selfAssessmentLoading) {
            return <div className="text-center text-gray-500 mt-10">Загрузка задач для самооценки...</div>;
        }

        if (selfAssessmentError) {
            return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-10">{selfAssessmentError}</div>;
        }

        return (
            <div className="space-y-8">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                         <div>
                            <h2 className="text-2xl font-bold text-slate-800">Проведите самооценку</h2>
                            <p className="text-slate-500 mt-2 max-w-2xl">
                                Проанализируйте свою работу, поделитесь результатами и определите зоны роста. 
                                Ваш отзыв поможет в дальнейшем профессиональном развитии.
                            </p>
                         </div>
                        <button
                            onClick={() => setIsSelfAssessmentModalOpen(true)}
                            className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
                            Создать самооценку
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 px-1">Задачи на ревью</h3>
                    {selfAssessmentGoals.length > 0 ? (
                        <div className="space-y-4">
                            {selfAssessmentGoals.map(goal => (
                                <div key={goal.id} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-800">{goal.name}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{goal.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-600">Нет задач для самооценки</h2>
                            <p className="text-slate-500 mt-2">Все ваши задачи выполнены или еще не отправлены на ревью.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderEmployeeReviewContent = () => {
        if (loadingEmployeeReviews) {
            return <div className="text-center text-gray-500 mt-10">Загрузка оценок сотрудников...</div>;
        }

        if (errorEmployeeReviews) {
            return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-10">{errorEmployeeReviews}</div>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {employeeReviews.length > 0 ? (
                    employeeReviews.map(review => (
                        <EmployeeReviewCard key={review.id} review={review} onDetailsClick={handleOpenDetailModal} />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center h-full">
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-600">Нет оценок для просмотра</h2>
                            <p className="text-slate-500 mt-2">На данный момент нет завершенных оценок от ваших сотрудников.</p>
                        </div>
                    </div>
                )}
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
        <>
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
                <button
                    onClick={() => setActiveTab('employeeReview')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'employeeReview'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    Оценка сотрудников
                </button>
                </nav>
            </div>

            <div>
                {activeTab === 'my360' && renderPlaceholderContent('Моя оценка 360')}
                {activeTab === 'self' && renderSelfAssessmentContent()}
                {activeTab === 'peerReview' && renderPeerReviewContent()}
                {activeTab === 'employeeReview' && renderEmployeeReviewContent()}
            </div>
            
            <ReviewEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveReview}
                goal={selectedGoal}
            />

            <SelfAssessmentModal
                isOpen={isSelfAssessmentModalOpen}
                onClose={() => setIsSelfAssessmentModalOpen(false)}
                onSave={handleSaveSelfAssessment}
                tasks={userGoals}
            />

            <EmployeeReviewDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                review={selectedDetailReview}
                onSaveManagerAssessment={handleSaveManagerAssessment}
                onFinalizeManagerAssessment={handleFinalizeManagerAssessment}
            />
        </>
    );
};

export default ReviewView;