import React from 'react';

const viewTitles: { [key: string]: string } = {
    profile: 'Профиль',
    goals: 'Цели',
    review: 'Оценка',
    training: 'Обучение',
    support: 'Поддержка',
    career: 'Моя карьера',
    instruction: 'Инструкция',
};

const Header: React.FC<{activeView: string}> = ({ activeView }) => {
  const title = viewTitles[activeView] || 'Цели';
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
      <div className="px-4 md:px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-800">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
