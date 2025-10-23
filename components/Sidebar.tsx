import React from 'react';
import UserIcon from './icons/UserIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import StarIcon from './icons/StarIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import SupportIcon from './icons/SupportIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: 'profile', label: 'Профиль', icon: UserIcon },
  { id: 'goals', label: 'Цели', icon: ClipboardListIcon },
  { id: 'review', label: 'Оценка', icon: StarIcon },
  { id: 'training', label: 'Пройти обучение', icon: BookOpenIcon },
  { id: 'support', label: 'Поддержка', icon: SupportIcon },
  { id: 'career', label: 'Моя карьера', icon: TrendingUpIcon },
  { id: 'instruction', label: 'Инструкция', icon: InformationCircleIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Оценка <span className="text-indigo-600">360</span>
        </h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-6 h-6 mr-3 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        {/* Placeholder for user info or logout */}
      </div>
    </aside>
  );
};

export default Sidebar;
