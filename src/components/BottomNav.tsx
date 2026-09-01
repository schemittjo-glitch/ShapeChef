import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, UtensilsCrossed, CalendarDays, PlusCircle, User, Gift } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    {
      id: 'home',
      label: 'Inicio',
      icon: Home,
      badge: null,
    },
    {
      id: 'recipes',
      label: 'Recetas',
      icon: UtensilsCrossed,
      badge: null,
    },
    {
      id: 'mealplan',
      label: 'Menú',
      icon: CalendarDays,
      badge: null,
    },
    {
      id: 'diary',
      label: 'Diario',
      icon: PlusCircle,
      isAction: true,
      badge: null,
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      badge: null,
    },
    {
      id: 'bonus',
      label: 'Bonos',
      icon: Gift,
      badge: 'NUEVO',
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-6 items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center py-1 group relative"
              >
                <div
                  className={`w-10 h-10 -mt-4 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white scale-110 shadow-emerald-600/30'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] mt-0.5 font-bold transition-colors ${
                    isActive ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 relative rounded-lg transition-all ${
                isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-emerald-600' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 px-1 py-0.2 text-[8px] font-black bg-emerald-600 text-white rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
