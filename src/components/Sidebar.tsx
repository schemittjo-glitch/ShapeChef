import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  UtensilsCrossed,
  CalendarDays,
  PlusCircle,
  Refrigerator,
  ShoppingCart,
  TrendingUp,
  User,
  Gift,
  ChefHat,
  Download,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, shoppingList, favorites } = useApp();

  const uncheckedShoppingCount = shoppingList.filter((i) => !i.checked).length;

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'recipes', label: 'Recetas', icon: UtensilsCrossed, badge: favorites.length > 0 ? `${favorites.length} fav` : null },
    { id: 'mealplan', label: 'Menú Semanal', icon: CalendarDays },
    { id: 'diary', label: 'Diario', icon: PlusCircle },
    { id: 'fridge', label: 'Refrigerador', icon: Refrigerator },
    { id: 'shopping', label: 'Compras', icon: ShoppingCart, badge: uncheckedShoppingCount > 0 ? `${uncheckedShoppingCount}` : null },
    { id: 'history', label: 'Historial', icon: TrendingUp },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'bonus', label: 'Bonos', icon: Gift, isHighlight: true },
  ];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col h-screen sticky top-0 shrink-0 select-none z-30"
    >
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl font-black tracking-tight text-slate-800">
                Shape<span className="text-emerald-600">Chef</span>
              </h1>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium -mt-0.5">Recetas & Macros</p>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <div className="px-4 py-2 flex-1 overflow-y-auto space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-100/80 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-200/70 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Bonus Box & Install Prompt */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 mt-auto space-y-3">
        <button
          onClick={() => window.dispatchEvent(new Event('open-shapechef-install'))}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-2xs hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instalar App en el Móvil</span>
        </button>

        <div className="p-4 bg-emerald-600 rounded-xl text-white shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">
              Bono Activo
            </p>
            <span className="text-xs">🎁</span>
          </div>
          <p className="text-xs font-bold text-white">Guía de Proteína Casera</p>
          <p className="text-[11px] text-emerald-100 leading-tight">
            Ahorra dinero y alcanza tu meta diaria de forma simple.
          </p>
          <button
            onClick={() => setActiveTab('bonus')}
            className="w-full mt-2.5 py-2 bg-white text-emerald-700 rounded-lg text-xs font-black hover:bg-slate-50 transition-colors shadow-xs"
          >
            ABRIR E-BOOK
          </button>
        </div>
      </div>
    </aside>
  );
};
