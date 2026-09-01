import React from 'react';
import { useApp } from '../context/AppContext';
import { ChefHat, ShoppingCart, Heart, PlusCircle, Refrigerator, Download } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    favorites,
    showOnlyFavorites,
    setShowOnlyFavorites,
    openFavorites,
    shoppingList,
    userProfile,
  } = useApp();

  const uncheckedShoppingCount = shoppingList.filter((i) => !i.checked).length;
  const isFavoritesActive = activeTab === 'recipes' && showOnlyFavorites;

  const handleToggleFavorites = () => {
    if (activeTab === 'recipes' && showOnlyFavorites) {
      setShowOnlyFavorites(false);
    } else {
      openFavorites();
    }
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Mobile Brand (Visible only on < lg screens) */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex lg:hidden items-center gap-1.5 cursor-pointer"
        >
          <span className="font-black text-xl tracking-tight text-slate-900">
            Shape<span className="text-emerald-600">Chef</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            PRO
          </span>
        </div>

        {/* Desktop Quick Breadcrumb / Greeting context */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
          <span className="font-bold text-slate-800">Shape<span className="text-emerald-600">Chef</span></span>
          <span>•</span>
          <span className="capitalize font-medium text-slate-600">
            {activeTab === 'home'
              ? 'Panel General'
              : activeTab === 'recipes'
              ? isFavoritesActive
                ? `Recetas Favoritas (${favorites.length})`
                : 'Catálogo de Recetas'
              : activeTab === 'mealplan'
              ? 'Menú Semanal'
              : activeTab === 'diary'
              ? 'Diario Alimentario'
              : activeTab === 'fridge'
              ? 'Modo Refrigerador'
              : activeTab === 'shopping'
              ? 'Lista de Compras'
              : activeTab === 'history'
              ? 'Historial & Evolución'
              : activeTab === 'profile'
              ? 'Perfil & Objetivos'
              : 'Bonos Exclusivos'}
          </span>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Install / Add Shortcut Button */}
          <button
            id="header-btn-install-pwa"
            onClick={() => window.dispatchEvent(new Event('open-shapechef-install'))}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Instalar App y Añadir a la Pantalla de Inicio"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Instalar App</span>
          </button>

          {/* Quick Action: Registrar Refeição */}
          <button
            id="header-btn-quick-log"
            onClick={() => setActiveTab('diary')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-full text-xs border border-emerald-200 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Registrar Comida</span>
          </button>

          {/* Quick Action: Modo Geladeira */}
          <button
            id="header-btn-fridge-mode"
            onClick={() => setActiveTab('fridge')}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full text-xs shadow-xs transition-colors"
          >
            <Refrigerator className="w-3.5 h-3.5" />
            <span>Modo Refrigerador</span>
          </button>

          {/* Favorites Shortcut - Top Favorite Trigger */}
          <button
            id="btn-header-favorites"
            onClick={handleToggleFavorites}
            className={`p-2 rounded-xl border transition-all relative ${
              isFavoritesActive
                ? 'bg-rose-500 border-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                : favorites.length > 0
                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={
              isFavoritesActive
                ? 'Mostrando solo favoritos (haz clic para ver todas)'
                : 'Ver solo recetas favoritas'
            }
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isFavoritesActive
                  ? 'fill-white text-white scale-110'
                  : favorites.length > 0
                  ? 'fill-rose-500 text-rose-500'
                  : ''
              }`}
            />
            {favorites.length > 0 && !isFavoritesActive && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[9px] font-black text-white rounded-full flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Shopping List Shortcut */}
          <button
            id="btn-header-shopping"
            onClick={() => setActiveTab('shopping')}
            className={`p-2 rounded-xl border transition-all relative ${
              activeTab === 'shopping'
                ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Lista de Compras"
          >
            <ShoppingCart className="w-4 h-4" />
            {uncheckedShoppingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                {uncheckedShoppingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
