import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/recipes';
import { Recipe } from '../types';
import {
  Search,
  SlidersHorizontal,
  Heart,
  Clock,
  Dumbbell,
  Flame,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export const RecipesView: React.FC = () => {
  const {
    recipes,
    favorites,
    toggleFavorite,
    isFavorite,
    showOnlyFavorites,
    setShowOnlyFavorites,
    setSelectedRecipe,
    recipeFilterProteinMin,
    setRecipeFilterProteinMin,
    recipeSearchQuery,
    setRecipeSearchQuery,
    recipeActiveCategory,
    setRecipeActiveCategory,
  } = useApp();

  // Advanced filters state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterMaxCalories, setFilterMaxCalories] = useState<number | null>(null);
  const [filterMaxTime, setFilterMaxTime] = useState<number | null>(null);
  const [filterCookingMethod, setFilterCookingMethod] = useState<string | null>(null);
  const [filterProteinSource, setFilterProteinSource] = useState<string | null>(null);

  // Protein preset buttons
  const proteinPresets = [10, 20, 30, 40, 50, 60];

  // Filter recipes logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // 1. Favorites only toggle (Triggered via Top Header or category filter)
      if (showOnlyFavorites && !isFavorite(recipe.id)) {
        return false;
      }

      // 2. Active Category pill
      if (recipeActiveCategory !== 'Todos') {
        const matchesCategory =
          (recipe.category && recipe.category.toLowerCase() === recipeActiveCategory.toLowerCase()) ||
          (recipe.categories && recipe.categories.some((c) => c && c.toLowerCase() === recipeActiveCategory.toLowerCase())) ||
          (recipe.method && recipe.method.toLowerCase() === recipeActiveCategory.toLowerCase()) ||
          (recipe.proteinSource && recipe.proteinSource.toLowerCase() === recipeActiveCategory.toLowerCase());
        if (!matchesCategory) return false;
      }

      // 3. Search query (by name or by ingredient, e.g. "frango + queijo")
      if (recipeSearchQuery.trim()) {
        const query = recipeSearchQuery.toLowerCase().trim();
        const searchTerms = query.split(/[+,]+/).map((s) => s.trim()).filter(Boolean);

        const matchesAllTerms = searchTerms.every((term) => {
          const inName = recipe.name ? recipe.name.toLowerCase().includes(term) : false;
          const inIngredients = recipe.ingredients ? recipe.ingredients.some(
            (ing) =>
              (ing.item && ing.item.toLowerCase().includes(term)) ||
              (ing.normalizedName && ing.normalizedName.toLowerCase().includes(term))
          ) : false;
          const inCategory = recipe.categories ? recipe.categories.some((c) => c && c.toLowerCase().includes(term)) : false;
          return inName || inIngredients || inCategory;
        });

        if (!matchesAllTerms) return false;
      }

      // 4. Minimum protein filter
      if (recipeFilterProteinMin !== null && recipe.protein < recipeFilterProteinMin) {
        return false;
      }

      // 5. Max calories filter
      if (filterMaxCalories !== null && recipe.calories > filterMaxCalories) {
        return false;
      }

      // 6. Max prep time filter
      if (filterMaxTime !== null && recipe.prepTime > filterMaxTime) {
        return false;
      }

      // 7. Cooking method filter
      if (filterCookingMethod && recipe.method !== filterCookingMethod) {
        return false;
      }

      // 8. Protein source filter
      if (filterProteinSource && recipe.proteinSource !== filterProteinSource) {
        return false;
      }

      return true;
    });
  }, [
    recipes,
    showOnlyFavorites,
    favorites,
    recipeActiveCategory,
    recipeSearchQuery,
    recipeFilterProteinMin,
    filterMaxCalories,
    filterMaxTime,
    filterCookingMethod,
    filterProteinSource,
  ]);

  const activeFiltersCount =
    (recipeFilterProteinMin !== null ? 1 : 0) +
    (filterMaxCalories !== null ? 1 : 0) +
    (filterMaxTime !== null ? 1 : 0) +
    (filterCookingMethod ? 1 : 0) +
    (filterProteinSource ? 1 : 0) +
    (showOnlyFavorites ? 1 : 0);

  const handleResetFilters = () => {
    setRecipeFilterProteinMin(null);
    setFilterMaxCalories(null);
    setFilterMaxTime(null);
    setFilterCookingMethod(null);
    setFilterProteinSource(null);
    setShowOnlyFavorites(false);
    setRecipeSearchQuery('');
    setRecipeActiveCategory('Todos');
  };

  return (
    <div id="recipes-catalog-view" className="space-y-5 pb-14 animate-in fade-in duration-200">
      {/* 1. Header & Title */}
      <div className={`p-6 rounded-2xl border transition-all ${
        showOnlyFavorites
          ? 'bg-gradient-to-r from-rose-50 to-pink-50/60 border-rose-200 shadow-sm'
          : 'bg-white border-slate-200 shadow-sm'
      } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>{showOnlyFavorites ? '❤️' : '🍳'}</span>
              <span>{showOnlyFavorites ? 'Receitas Favoritas' : 'Catálogo de Receitas'}</span>
            </h1>
            {showOnlyFavorites && (
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500 text-white shadow-xs">
                {favorites.length} {favorites.length === 1 ? 'salva' : 'salvas'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {showOnlyFavorites
              ? 'Exibindo apenas as receitas que você marcou com o coração para acesso rápido.'
              : 'Mais de 25 receitas hiperproteicas balanceadas, práticas e saborosas.'}
          </p>
        </div>

        {/* Favorites Switch Tab / Catalog Switcher */}
        <div className="flex items-center gap-2">
          {showOnlyFavorites ? (
            <button
              id="btn-show-all-recipes"
              onClick={() => setShowOnlyFavorites(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all"
            >
              <span>🍳</span>
              <span>Ver todo o catálogo ({recipes.length})</span>
            </button>
          ) : (
            <button
              id="toggle-favorites-filter"
              onClick={() => setShowOnlyFavorites(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                favorites.length > 0
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-rose-600 text-rose-600' : 'text-rose-500'}`} />
              <span>Ver Favoritos ({favorites.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Smart Search Input (Por nome, ingrediente como "frango + queijo") */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-recipe-smart-search"
              type="text"
              value={recipeSearchQuery}
              onChange={(e) => setRecipeSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou ingrediente (ex: Parmegiana, frango + queijo, aveia, banana...)"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
            {recipeSearchQuery && (
              <button
                onClick={() => setRecipeSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            id="btn-open-filter-modal"
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              activeFiltersCount > 0
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-black">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* 3. Protein Quick Filters (10g+, 20g+, 30g+, 40g+, 50g+, 60g+) & Custom Input */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="text-slate-600 font-bold flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
              Mínimo de proteína:
            </span>

            <div className="flex items-center flex-wrap gap-1.5">
              <button
                onClick={() => setRecipeFilterProteinMin(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  recipeFilterProteinMin === null
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Qualquer
              </button>

              {proteinPresets.map((val) => (
                <button
                  key={val}
                  onClick={() =>
                    setRecipeFilterProteinMin(recipeFilterProteinMin === val ? null : val)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    recipeFilterProteinMin === val
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {val}g+
                </button>
              ))}

              {/* Custom protein target field */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 ml-1">
                <span className="text-[11px] text-slate-500">Pelo menos:</span>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={recipeFilterProteinMin || ''}
                  onChange={(e) => {
                    const val = e.target.value ? parseInt(e.target.value, 10) : null;
                    setRecipeFilterProteinMin(val);
                  }}
                  placeholder="ex: 35"
                  className="w-12 bg-transparent text-xs text-emerald-700 font-bold focus:outline-none text-center"
                />
                <span className="text-[11px] text-slate-500">g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Horizontal Scrollable Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          id="category-pill-favorites"
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
            showOnlyFavorites
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current text-white' : 'text-rose-500'}`} />
          <span>Favoritas ({favorites.length})</span>
        </button>

        {CATEGORIES_LIST.map((cat) => {
          const isActive = !showOnlyFavorites && recipeActiveCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setShowOnlyFavorites(false);
                setRecipeActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Filters Summary Badge Row */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between text-xs bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-emerald-800 font-bold">Filtros ativos:</span>
            {showOnlyFavorites && (
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[11px] font-bold shadow-2xs">
                ❤️ Apenas Favoritas ({favorites.length})
              </span>
            )}
            {recipeFilterProteinMin && (
              <span className="px-2 py-0.5 rounded bg-white text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                💪 {recipeFilterProteinMin}g+ proteína
              </span>
            )}
            {filterMaxCalories && (
              <span className="px-2 py-0.5 rounded bg-white text-amber-700 border border-amber-200 text-[11px] font-bold">
                🔥 Até {filterMaxCalories} kcal
              </span>
            )}
            {filterMaxTime && (
              <span className="px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200 text-[11px] font-bold">
                ⏱️ Até {filterMaxTime} min
              </span>
            )}
            {filterCookingMethod && (
              <span className="px-2 py-0.5 rounded bg-white text-purple-700 border border-purple-200 text-[11px] font-bold">
                🍳 {filterCookingMethod}
              </span>
            )}
            {filterProteinSource && (
              <span className="px-2 py-0.5 rounded bg-white text-teal-700 border border-teal-200 text-[11px] font-bold">
                🥩 {filterProteinSource}
              </span>
            )}
          </div>

          <button
            onClick={handleResetFilters}
            className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpar filtros</span>
          </button>
        </div>
      )}

      {/* 5. Recipe Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 shadow-sm">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto text-2xl ${
            showOnlyFavorites ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'
          }`}>
            {showOnlyFavorites ? '❤️' : '🍳'}
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {showOnlyFavorites ? 'Nenhuma receita favoritada ainda' : 'Nenhuma receita encontrada'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            {showOnlyFavorites
              ? 'Clique no ícone de coração (❤️) em qualquer receita do catálogo para salvá-la. Todas as suas receitas marcadas ficam reunidas aqui para acesso rápido pelo topo!'
              : 'Não encontramos receitas com os filtros selecionados. Tente reduzir o valor mínimo de proteína ou buscar por outro termo.'}
          </p>
          <button
            onClick={() => {
              if (showOnlyFavorites) {
                setShowOnlyFavorites(false);
              } else {
                handleResetFilters();
              }
            }}
            className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
          >
            {showOnlyFavorites ? 'Explorar todas as receitas' : 'Ver todas as receitas'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => {
            const isFav = isFavorite(recipe.id);
            return (
              <div
                key={recipe.id}
                id={`recipe-card-${recipe.id}`}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-all duration-200 hover:-translate-y-1 flex flex-col"
              >
                {/* Photo & Top Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className={`absolute top-2.5 left-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                      isFav
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40'
                        : 'bg-white/80 text-slate-700 hover:text-rose-500 hover:bg-white'
                    }`}
                    title={isFav ? 'Remover dos favoritos' : 'Favoritar receita'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Protein Badge */}
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-100 text-xs font-black text-emerald-700 flex items-center gap-1 shadow-xs">
                    <span>💪</span>
                    <span>{recipe.protein}g proteína</span>
                  </div>

                  {/* Time & Method Badge */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] text-white font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-300" />
                      {recipe.prepTime} min
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[11px] text-white font-medium">
                      {recipe.method}
                    </span>
                  </div>
                </div>

                {/* Recipe Info & Macros */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {recipe.category}
                      </span>
                      {recipe.isEconomic && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          💰 Econômica
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {recipe.name}
                    </h3>
                  </div>

                  {/* Macros breakdown mini-bar */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 grid grid-cols-4 gap-1 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Calorias</span>
                      <span className="text-xs font-bold text-amber-600">{recipe.calories}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Proteína</span>
                      <span className="text-xs font-extrabold text-emerald-600">{recipe.protein}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Carbs</span>
                      <span className="text-xs font-bold text-blue-600">{recipe.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Gordura</span>
                      <span className="text-xs font-bold text-slate-600">{recipe.fats}g</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Advanced Filters Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-800">Filtros Avançados</h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter by Protein */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-emerald-600" />
                Proteína mínima
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRecipeFilterProteinMin(recipeFilterProteinMin === v ? null : v)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      recipeFilterProteinMin === v
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {v}g+
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Calories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Calorias máximas
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[250, 350, 450, 550].map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilterMaxCalories(filterMaxCalories === v ? null : v)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      filterMaxCalories === v
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Até {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Prep Time */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                Tempo de Preparo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 30].map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilterMaxTime(filterMaxTime === v ? null : v)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      filterMaxTime === v
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Até {v} min
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Cooking Method */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Modo de preparo</label>
              <div className="grid grid-cols-3 gap-2">
                {['Airfryer', 'Frigideira', 'Forno', 'Panela'].map((method) => (
                  <button
                    key={method}
                    onClick={() =>
                      setFilterCookingMethod(filterCookingMethod === method ? null : method)
                    }
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      filterCookingMethod === method
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Protein Source */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Fonte principal de proteína</label>
              <div className="grid grid-cols-3 gap-2">
                {['Frango', 'Carne', 'Ovos', 'Peixes', 'Whey'].map((source) => (
                  <button
                    key={source}
                    onClick={() =>
                      setFilterProteinSource(filterProteinSource === source ? null : source)
                    }
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      filterProteinSource === source
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Limpar todos
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Aplicar Filtros ({filteredRecipes.length} receitas)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
