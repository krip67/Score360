import React, { useState, useEffect, useCallback } from 'react';
import { Goal, NewGoalPayload, GoalDetail, NewReviewPayload, Category } from './types';
import Header from './components/Header';
import GoalModal from './components/TaskModal';
import GoalDetailModal from './components/TaskDetailModal';
import Sidebar from './components/Sidebar';
import ReviewModal from './components/ReviewModal';
import ReviewView from './components/ReviewView';
import SupportView from './components/SupportView';
import GoalCard from './components/TaskCard';
import AddGoalCard from './components/AddTaskCard';

// MOCK DATA - updated to the new API format.
const MOCK_GOALS: Goal[] = [
    {
        id: 1,
        name: "Подготовить квартальный отчет",
        description: "Собрать данные по KPI и подготовить презентацию для руководства.",
        dateStart: "2025-10-01T09:00:00.000Z",
        dateEnd: "2025-10-15T18:00:00.000Z",
        categoryName: "Аналитика",
        metricName: "Процент освоения новых методик и инструментов.",
        priority: "HIGHEST",
        subtaskIds: [2, 3],
        parentTaskId: null
    },
    {
        id: 4,
        name: "Разработка нового модуля",
        description: "Реализовать функционал аутентификации пользователей через социальные сети.",
        dateStart: "2025-09-20T09:00:00.000Z",
        dateEnd: "2025-10-25T18:00:00.000Z",
        categoryName: "Разработка",
        metricName: "Время освоения новой технологии (ускорение).",
        priority: "HIGH",
        subtaskIds: [],
        parentTaskId: 1,
    },
    {
        id: 5,
        name: "Обновить документацию API",
        description: "Актуализировать Swagger/OpenAPI спецификации для всех эндпоинтов.",
        dateStart: "2025-10-10T09:00:00.000Z",
        dateEnd: "2025-10-20T18:00:00.000Z",
        categoryName: "Документация",
        metricName: "Другое",
        priority: "LOW",
        subtaskIds: [],
        parentTaskId: null
    }
];

const MOCK_GOAL_DETAIL: GoalDetail = {
    id: 1,
    name: "Подготовить квартальный отчет",
    description: "Собрать данные по KPI и подготовить презентацию для руководства.",
    dateStart: "2025-10-01T09:00:00.000Z",
    dateEnd: "2025-10-15T18:00:00.000Z",
    categoryName: "Аналитика",
    metricName: "Процент освоения новых методик и инструментов.",
    priority: "HIGHEST",
    subtaskIds: [2, 3],
    parentTaskId: null,
    subtasks: [
        { id: 2, name: "Сбор данных из CRM", description: "Выгрузить отчеты по продажам.", dateStart: "2025-10-01T10:00:00Z", dateEnd: "2025-10-05T17:00:00Z", categoryName: "Аналитика" },
        { id: 3, name: "Создание презентации", description: "Оформить слайды с ключевыми метриками.", dateStart: "2025-10-06T10:00:00Z", dateEnd: "2025-10-14T17:00:00Z", categoryName: "Дизайн" }
    ]
};


const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [activeView, setActiveView] = useState('goals');
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [goalToReview, setGoalToReview] = useState<Goal | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // To use your real API, uncomment the lines below and remove the mock data logic.
      /*
      const response = await fetch('http://localhost:8080/goal');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Goal[] = await response.json();
      setGoals(data);
      */
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGoals(MOCK_GOALS);
      
    } catch (e) {
      setError(e instanceof Error ? `Не удалось загрузить цели: ${e.message}` : 'Произошла неизвестная ошибка');
    } finally {
        setLoading(false);
    }
  }, []);
  
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await fetch('http://localhost:8080/category');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (e) {
      console.error("Failed to load categories", e);
      // Optionally set an error state to be displayed to the user
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (activeView === 'goals') {
        fetchGoals();
    }
  }, [activeView, fetchGoals]);

  const handleOpenGoalDetails = useCallback(async (goalId: number) => {
      setIsDetailModalOpen(true);
      setIsDetailLoading(true);
      setDetailError(null);
      setSelectedGoal(null);

      try {
        // To use your real API, uncomment the lines below and remove the mock logic.
        /*
        const response = await fetch(`http://localhost:8080/goal/${goalId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GoalDetail = await response.json();
        setSelectedGoal(data);
        */
       
        // Mocking the detail fetch
        await new Promise(resolve => setTimeout(resolve, 800));
        if (goalId === 1) {
            setSelectedGoal(MOCK_GOAL_DETAIL);
        } else {
            const goalData = MOCK_GOALS.find(g => g.id === goalId);
            if (goalData) {
                // Construct a detail view from the main goal data
                setSelectedGoal({
                    ...goalData,
                    subtasks: [] // Assuming other goals don't have subgoals in this mock scenario
                });
            } else {
                throw new Error('Цель не найдена.');
            }
        }

      } catch (e) {
        setDetailError(e instanceof Error ? `Не удалось загрузить детали цели: ${e.message}` : 'Произошла неизвестная ошибка');
      } finally {
        setIsDetailLoading(false);
      }
  }, []);

  const handleCloseGoalDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedGoal(null);
    setDetailError(null);
  };

  const handleSaveGoal = async (newGoalData: NewGoalPayload) => {
    // Mocking the POST request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const category = categories.find(c => c.id === newGoalData.category_id);
    
    const newGoal: Goal = {
        id: Math.max(...MOCK_GOALS.map(t => t.id), 0) + 1,
        name: newGoalData.name,
        description: newGoalData.description,
        dateStart: new Date(newGoalData.dateStart).toISOString(),
        dateEnd: new Date(newGoalData.dateEnd).toISOString(),
        categoryName: category ? category.name : 'Неизвестно',
        metricName: `Метрика ID: ${newGoalData.metricId}`, // Mocked name, as metric list is not available in App state
        priority: newGoalData.taskPriorityEnum,
        subtaskIds: [],
        parentTaskId: newGoalData.parentId ?? null,
    };
    MOCK_GOALS.unshift(newGoal);
    
    await fetchGoals();
    setIsModalOpen(false);
  };
  
  const handleOpenReviewModal = (goal: Goal) => {
    setGoalToReview(goal);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setGoalToReview(null);
  };

  const handleSaveReview = async (payload: NewReviewPayload) => {
    console.log("Отправка на оценку:", payload);
    // Mocking the POST request to http://localhost:8080/review
    // To use real API, uncomment this block
    /*
    try {
        const response = await fetch('http://localhost:8080/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (e) {
        // Handle error, e.g., show an error message in the modal
        console.error('Failed to save review', e);
        throw e; // Re-throw to be caught in the modal
    }
    */
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Оценка успешно отправлена.");
    handleCloseReviewModal();
  };

  const renderGoalsContent = () => {
    if (loading && goals.length === 0) {
      return <div className="text-center text-gray-500 mt-10">Загрузка целей...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg mt-10">{error}</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onClick={handleOpenGoalDetails} onShowParent={handleOpenGoalDetails} />
        ))}
        <AddGoalCard onClick={() => setIsModalOpen(true)} />
      </div>
    );
  };
  
  const renderPlaceholderContent = (title: string) => (
    <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-600">Раздел "{title}"</h2>
            <p className="text-slate-500 mt-2">Этот раздел находится в разработке.</p>
        </div>
    </div>
  );

  const renderContent = () => {
    switch(activeView) {
        case 'goals':
            return renderGoalsContent();
        case 'profile':
            return renderPlaceholderContent('Профиль');
        case 'review':
            return <ReviewView goals={goals} />;
        case 'training':
            return renderPlaceholderContent('Пройти обучение');
        case 'support':
            return <SupportView />;
        case 'career':
            return renderPlaceholderContent('Моя карьера');
        case 'instruction':
            return renderPlaceholderContent('Инструкция');
        default:
            return renderGoalsContent();
    }
  };

  return (
    <div className="flex min-h-screen text-slate-800 bg-slate-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto bg-slate-100">
        <Header activeView={activeView} />
        <main className="p-4 md:p-6 flex-grow">
          {renderContent()}
        </main>
      </div>
      
      <GoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
        categories={categories}
        isLoadingCategories={isLoadingCategories}
        goals={goals}
      />
      <GoalDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseGoalDetails}
        goal={selectedGoal}
        isLoading={isDetailLoading}
        error={detailError}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSave={handleSaveReview}
        goal={goalToReview}
      />
    </div>
  );
};

export default App;