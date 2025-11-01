import React, { useState, useEffect, useCallback } from 'react';
import { Goal, NewGoalPayload, GoalDetail, NewReviewPayload, Category } from './types';
import Header from './components/Header';
import GoalModal from './components/TaskModal';
import GoalDetailModal from './components/TaskDetailModal';
import Sidebar from './components/Sidebar';
import ReviewModal from './components/ReviewModal';
import ReviewView from './components/ReviewView';
import SupportView from './components/SupportView';
import ProfileView from './components/ProfileView';
import GoalCard from './components/TaskCard';
import AddGoalCard from './components/AddTaskCard';
import { useAuth } from './auth';
import Login from './components/Login';
import TrainingView from './components/TrainingView';
import CareerView from './components/CareerView';
import InstructionView from './components/InstructionView';

const App: React.FC = () => {
  const { token, loading: authLoading, authFetch } = useAuth();
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [activeView, setActiveView] = useState('profile');
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [goalToReview, setGoalToReview] = useState<Goal | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    // When the user logs in and a token becomes available,
    // set the active view to 'profile'. This ensures the user
    // always starts on the profile page after authentication.
    if (token) {
      setActiveView('profile');
    }
  }, [token]);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authFetch('http://194.87.30.33:8080/task/open/my');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Goal[] = await response.json();
      setGoals(data);
    } catch (e) {
      if (e instanceof Error && e.message !== 'Unauthorized') {
        setError(e.message ? `Не удалось загрузить цели: ${e.message}` : 'Произошла неизвестная ошибка');
      }
    } finally {
        setLoading(false);
    }
  }, [authFetch]);
  
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await authFetch('http://194.87.30.33:8080/category');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (e) {
      if (e instanceof Error && e.message !== 'Unauthorized') {
        console.error("Failed to load categories", e);
      }
    } finally {
      setIsLoadingCategories(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (activeView === 'goals' && token) {
        fetchGoals();
    }
  }, [activeView, fetchGoals, token]);

  const handleOpenGoalDetails = useCallback(async (goalId: number) => {
      setIsDetailModalOpen(true);
      setIsDetailLoading(true);
      setDetailError(null);
      setSelectedGoal(null);

      try {
        const response = await authFetch(`http://194.87.30.33:8080/task/${goalId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GoalDetail = await response.json();
        setSelectedGoal(data);
      } catch (e) {
        if (e instanceof Error && e.message !== 'Unauthorized') {
          setDetailError(e.message ? `Не удалось загрузить детали цели: ${e.message}` : 'Произошла неизвестная ошибка');
        }
      } finally {
        setIsDetailLoading(false);
      }
  }, [authFetch]);

  const handleCloseGoalDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedGoal(null);
    setDetailError(null);
  };

  const handleSaveGoal = async (newGoalData: NewGoalPayload) => {
    try {
        const response = await authFetch('http://194.87.30.33:8080/task', {
            method: 'POST',
            body: JSON.stringify(newGoalData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await fetchGoals();
        setIsModalOpen(false);
    } catch (e) {
        console.error("Failed to save goal", e);
        if (e instanceof Error) {
            // You might want to set an error state here to show in the modal
        }
    }
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
    try {
        const response = await authFetch('http://194.87.30.33:8080/review', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Оценка успешно отправлена.");
        handleCloseReviewModal();
    } catch (e) {
        console.error('Failed to save review', e);
        throw e;
    }
  };
  
  const handleOpenAddGoalModal = () => {
    fetchCategories();
    setIsModalOpen(true);
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
        {goals.length < 5 && <AddGoalCard onClick={handleOpenAddGoalModal} />}
      </div>
    );
  };
  
  const renderContent = () => {
    switch(activeView) {
        case 'goals':
            return renderGoalsContent();
        case 'profile':
            return <ProfileView />;
        case 'review':
            return <ReviewView goals={goals} />;
        case 'training':
            return <TrainingView />;
        case 'support':
            return <SupportView />;
        case 'career':
            return <CareerView />;
        case 'instruction':
            return <InstructionView />;
        default:
            return renderGoalsContent();
    }
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-100">Загрузка...</div>;
  }
  
  if (!token) {
      return <Login />;
  }

  return (
    <div className="flex min-h-screen text-slate-800 bg-slate-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto bg-slate-100">
        <Header activeView={activeView} />
        <main className="p-4 md:p-6 flex-grow">
          {renderContent()}
        </main>
        
        <footer className="mt-auto bg-white border-t border-slate-200 p-6 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Контакты</h4>
              <a href="mailto:wink_hr@mail.ru" className="hover:text-indigo-600 transition-colors">wink_hr@mail.ru</a>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Поддержка</h4>
              <p>Используйте раздел "Поддержка"</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Развитие</h4>
              <p>Используйте раздел "Пройти обучение"</p>
            </div>
          </div>
        </footer>
      </div>
      
      <GoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGoal}
        categories={categories}
        isLoadingCategories={isLoadingCategories}
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