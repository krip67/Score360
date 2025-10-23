import React from 'react';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

const SupportView: React.FC = () => {
  const messages = [
    {
      id: 1,
      sender: 'user',
      text: 'Не могу оценить цель',
      time: '14:25',
    },
    {
      id: 2,
      sender: 'system',
      text: 'Спасибо за сообщение! Мы уведомили оператора, он подключится в течение минуты.',
      time: '14:26',
    },
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200">
      <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
            <span className="text-xl font-bold text-indigo-600">360</span>
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Служба поддержки</h2>
            <p className="text-sm text-slate-500">В сети</p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto flex flex-col justify-end">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender !== 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-500">
                S
              </div>
            )}
            <div
              className={`max-w-md p-3 rounded-xl ${
                message.sender === 'user'
                  ? 'bg-violet-600 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        <div className="flex items-end gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-500">
                S
            </div>
            <div className="max-w-md p-3 rounded-xl bg-slate-100 rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Оператор подключается</span>
                    <div className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <footer className="flex-shrink-0 p-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Напишите ваше сообщение..."
            className="w-full px-4 py-3 pr-12 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            disabled
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label="Отправить сообщение"
            disabled
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SupportView;