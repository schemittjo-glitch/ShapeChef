import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    calculatedGoals,
    currentDayTotals,
    setActiveTab,
    recipes,
    setSelectedRecipe,
    setRecipeSearchQuery,
    setRecipeActiveCategory,
    setShowOnlyFavorites,
  } = useApp();

  const [fridgeQuery, setFridgeQuery] = useState('');

  // Find recipes matching the comma-separated ingredients
  const matchingFridgeRecipes = useMemo(() => {
    const tokens = fridgeQuery
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (tokens.length === 0) {
      return recipes.slice(0, 3);
    }

    const scored = recipes
      .map((r) => {
        const ingList = (r.ingredients || []).map((i) =>
          (i.normalizedName || i.item || '').toLowerCase()
        );
        const matchCount = tokens.filter(
          (tok) =>
            ingList.some((ing) => ing.includes(tok) || tok.includes(ing)) ||
            r.name.toLowerCase().includes(tok)
        ).length;
        return { recipe: r, matchCount };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount || b.recipe.protein - a.recipe.protein);

    return scored.length > 0 ? scored.slice(0, 3).map((s) => s.recipe) : [];
  }, [fridgeQuery, recipes]);

  const handleSearchFridge = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (fridgeQuery.trim()) {
      setRecipeSearchQuery(fridgeQuery.trim());
    }
    setActiveTab('fridge');
  };

  // 3 Featured Categories data with imagery matching user reference
  const categoryCards = useMemo(() => {
    const countCafeLanches = recipes.filter(
      (r) =>
        r.categories?.some((c) => ['Desayuno', 'Meriendas y Snacks', 'Café da manhã', 'Lanches'].includes(c)) ||
        ['Desayuno', 'Meriendas y Snacks', 'Café da manhã', 'Lanches'].includes(r.category)
    ).length;

    const countAlmocoJantar = recipes.filter(
      (r) =>
        r.categories?.some((c) => ['Almuerzo', 'Cena', 'Almoço', 'Jantar'].includes(c)) ||
        ['Almuerzo', 'Cena', 'Almoço', 'Jantar'].includes(r.category)
    ).length;

    const countSobremesas = recipes.filter(
      (r) =>
        r.categories?.some((c) => ['Postres', 'Sobremesas'].includes(c)) ||
        r.category === 'Postres' ||
        r.category === 'Sobremesas'
    ).length;

    return [
      {
        id: 'cafe-lanches',
        title: 'Desayuno & Snacks',
        categoryTarget: 'Desayuno',
        count: countCafeLanches,
        imageUrl:
          'https://fitproreceitasproteicas.lovable.app/assets/cafe-da-manha-DC3uyx-m.jpg',
        badge: 'Energía & Rapidez',
      },
      {
        id: 'almoco-jantar',
        title: 'Almuerzo & Cena',
        categoryTarget: 'Almuerzo',
        count: countAlmocoJantar,
        imageUrl:
          'https://fitproreceitasproteicas.lovable.app/assets/almoco-janta-F_o_ToVd.jpg',
        badge: 'Platos Principales',
      },
      {
        id: 'sobremesas',
        title: 'Postres',
        categoryTarget: 'Postres',
        count: countSobremesas,
        imageUrl:
          'https://fitproreceitasproteicas.lovable.app/assets/sobremesas-saKXeFqD.jpg',
        badge: 'Dulces Proteicos',
      },
    ];
  }, [recipes]);

  const handleSelectCategory = (categoryTarget: string) => {
    setShowOnlyFavorites(false);
    setRecipeActiveCategory(categoryTarget);
    setActiveTab('recipes');
  };

  // Greeting based on local time
  const currentHour = new Date().getHours();
  let greeting = '¡Buenos días';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = '¡Buenas tardes';
  } else if (currentHour >= 18 || currentHour < 5) {
    greeting = '¡Buenas noches';
  }

  // Today formatted
  const todayFormatted = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  // Calculate percentages
  const proteinGoal = calculatedGoals.protein || 160;
  const caloriesGoal = calculatedGoals.calories || 2200;
  const carbsGoal = calculatedGoals.carbs || 250;
  const fatsGoal = calculatedGoals.fats || 70;

  const proteinConsumed = currentDayTotals.protein;
  const caloriesConsumed = currentDayTotals.calories;
  const carbsConsumed = currentDayTotals.carbs;
  const fatsConsumed = currentDayTotals.fats;

  const proteinPct = Math.min(100, Math.round((proteinConsumed / proteinGoal) * 100)) || 0;
  const caloriesPct = Math.min(100, Math.round((caloriesConsumed / caloriesGoal) * 100)) || 0;
  const carbsPct = Math.min(100, Math.round((carbsConsumed / carbsGoal) * 100)) || 0;
  const fatsPct = Math.min(100, Math.round((fatsConsumed / fatsGoal) * 100)) || 0;

  const proteinRemaining = Math.max(0, proteinGoal - proteinConsumed);
  const caloriesRemaining = Math.max(0, caloriesGoal - caloriesConsumed);

  const hasProfile = Boolean(userProfile.isConfigured);

  return (
    <div id="dashboard-view" className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Greeting & Quick Actions (Compact & Refined) */}
      <div className="bg-white py-3.5 px-5 sm:px-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            {hasProfile
              ? `${greeting}, ${userProfile.name}! 👋`
              : `${greeting}, ¡Crea tu perfil! 👋`}
          </h2>
          <p className="text-slate-500 font-medium text-xs mt-0.5">
            {hasProfile
              ? `Hoy es ${todayFormatted} • Sigue tus objetivos de hoy`
              : `Hoy es ${todayFormatted} • Configura tus datos para calcular tus metas personalizadas.`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!hasProfile && (
            <button
              id="btn-create-profile"
              onClick={() => setActiveTab('profile')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs shadow-2xs transition-colors"
            >
              Crear Perfil
            </button>
          )}
          <button
            id="btn-quick-log"
            onClick={() => setActiveTab('diary')}
            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-full text-xs border border-emerald-200 transition-colors shadow-2xs"
          >
            + Registrar Comida
          </button>
          <button
            id="btn-quick-fridge"
            onClick={() => setActiveTab('fridge')}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full text-xs shadow-2xs transition-colors"
          >
            Modo Refrigerador
          </button>
        </div>
      </div>

      {/* 2. Main 12-Column Grid matching Professional Polish theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: 8 Cols on Desktop */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card 1: Resumo de Macros (Compact) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Resumen de Macros
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {proteinPct >= 100 ? '¡Meta Alcanzada! 🎉' : `${proteinPct}% de la proteína`}
              </span>
            </div>

            {/* 4 Macro Progress Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Proteína */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">Proteína</span>
                  <span className="text-xs font-bold text-emerald-600">
                    {proteinConsumed}/{proteinGoal}g
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${proteinPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  {proteinRemaining > 0 ? `Faltan ${proteinRemaining}g` : '¡Meta cumplida!'}
                </p>
              </div>

              {/* Calorias */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">Calorías</span>
                  <span className="text-xs font-bold text-amber-600">
                    {caloriesConsumed}/{caloriesGoal}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${caloriesPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  {caloriesRemaining > 0 ? `Quedan ${caloriesRemaining} kcal` : 'Límite del día alcanzado'}
                </p>
              </div>

              {/* Carbo */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">Carbohidratos</span>
                  <span className="text-xs font-bold text-blue-600">
                    {carbsConsumed}/{carbsGoal}g
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${carbsPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">{carbsPct}% alcanzado</p>
              </div>

              {/* Gordura */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700">Grasas</span>
                  <span className="text-xs font-bold text-slate-500">
                    {fatsConsumed}/{fatsGoal}g
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400 rounded-full transition-all duration-500"
                    style={{ width: `${fatsPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  {fatsPct < 80 ? 'Equilibrado' : `${fatsPct}% consumido`}
                </p>
              </div>
            </div>

            {/* Bottom Progress Callout (Compact) */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-[3px] border-emerald-500 border-t-slate-100 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-black text-slate-800">{proteinPct}%</span>
              </div>
              <p className="text-xs text-slate-600 leading-tight">
                ¡Ya has alcanzado{' '}
                <span className="font-bold text-slate-800">
                  {proteinPct >= 100
                    ? 'el 100% de tu meta'
                    : proteinPct >= 50
                    ? 'más de la mitad de la meta'
                    : `${proteinPct}% de tu meta`}
                </span>{' '}
                de proteína hoy!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Cols on Desktop (Modo Geladeira Widget) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Modo Geladeira Widget matching Image 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                Modo Refrigerador
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Escribe lo que tienes en el refrigerador. Puedes separarlo por comas.
              </p>

              {/* Input field with search icon matching Image 2 */}
              <form onSubmit={handleSearchFridge} className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={fridgeQuery}
                  onChange={(e) => setFridgeQuery(e.target.value)}
                  placeholder="ej: pollo, huevo, queso"
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 rounded-full py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-2xs focus:outline-none transition-all"
                />
              </form>

              {/* Suggested Recipes from Fridge */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {fridgeQuery.trim() ? 'Recetas encontradas:' : 'Sugerido para ti:'}
                  </p>
                  {fridgeQuery.trim() && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                      {matchingFridgeRecipes.length} recetas
                    </span>
                  )}
                </div>

                {matchingFridgeRecipes.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400">
                    Ninguna receta encontrada con estos ingredientes.
                  </div>
                ) : (
                  matchingFridgeRecipes.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRecipe(r)}
                      className="group cursor-pointer flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={r.imageUrl}
                          alt={r.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                          {r.name}
                        </p>
                        <p className="text-[11px] text-emerald-600 font-bold">
                          {r.protein}g Proteína • {r.prepTime} min
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={handleSearchFridge}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm text-center"
            >
              Encontrar Recetas con Mis Ingredientes
            </button>
          </div>
        </div>
      </div>

      {/* Categorias Section matching user reference photo with elevated visual polish */}
      <div className="pt-2 space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
              Categorías
            </h3>
            <p className="text-xs text-slate-500">
              Explora recetas hiperproteicas separadas por ocasión
            </p>
          </div>
          <button
            onClick={() => {
              setRecipeActiveCategory('Todas');
              setActiveTab('recipes');
            }}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            Ver todas ({recipes.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.categoryTarget)}
              className="group relative h-52 sm:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:border-emerald-500/50"
            >
              {/* Background Image with Zoom on Hover */}
              <img
                src={cat.imageUrl}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Dark Vignette Overlay for High Contrast Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/45 transition-colors duration-300" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white tracking-wide">
                  {cat.badge}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Centered Main Category Title matching reference image */}
              <div className="absolute inset-0 flex items-center justify-center px-4 text-center pointer-events-none">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300">
                  {cat.title}
                </h4>
              </div>

              {/* Bottom Subtitle & Count */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                <span className="text-[11px] font-medium text-slate-200 line-clamp-1">
                  {cat.subtitle}
                </span>
                <span className="shrink-0 font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[11px] text-white">
                  {cat.count} recetas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
