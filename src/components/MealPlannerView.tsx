import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MEAL_PLANS_DATA } from '../data/mealPlans';
import { FitnessGoal, MealType, Recipe, WeeklyMealPlan, DayMealPlan } from '../types';
import {
  CalendarDays,
  Flame,
  Dumbbell,
  Scale,
  ShoppingCart,
  PlusCircle,
  Check,
  ChevronRight,
  Clock,
  User,
  Settings2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  Search,
} from 'lucide-react';

export const MealPlannerView: React.FC = () => {
  const {
    recipes,
    userProfile,
    calculatedGoals,
    setSelectedRecipe,
    addMealItem,
    generateShoppingListFromMealPlan,
    setActiveTab,
    triggerConfetti,
  } = useApp();

  // Selected goal defaults to user's profile goal
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>(userProfile.goal || 'perda_gordura');
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [shoppingGeneratedSuccess, setShoppingGeneratedSuccess] = useState(false);
  const [dayLoggedSuccess, setDayLoggedSuccess] = useState(false);
  const [mealLoggedSuccessId, setMealLoggedSuccessId] = useState<string | null>(null);

  // Custom modified meal plans state so user can swap meals
  const [customPlans, setCustomPlans] = useState<WeeklyMealPlan[]>(() => {
    try {
      const saved = localStorage.getItem('shapechef_custom_meal_plans');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return MEAL_PLANS_DATA;
  });

  // Sync default goal when user profile goal changes
  useEffect(() => {
    if (userProfile.goal) {
      setSelectedGoal(userProfile.goal);
    }
  }, [userProfile.goal]);

  // Persist customized meal plans
  useEffect(() => {
    try {
      localStorage.setItem('shapechef_custom_meal_plans', JSON.stringify(customPlans));
    } catch {
      // ignore
    }
  }, [customPlans]);

  // Modal for swapping recipes
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swappingMealInfo, setSwappingMealInfo] = useState<{
    dayIdx: number;
    mealIdx: number;
    mealType: string;
    currentRecipeId: string;
  } | null>(null);
  const [swapSearchQuery, setSwapSearchQuery] = useState('');
  const [swapCategoryFilter, setSwapCategoryFilter] = useState('Todos');

  const currentPlan =
    customPlans.find((p) => p.goal === selectedGoal) ||
    MEAL_PLANS_DATA.find((p) => p.goal === selectedGoal) ||
    MEAL_PLANS_DATA[0];

  const currentDay = currentPlan.days[selectedDayIdx] || currentPlan.days[0];

  // Helper to find recipe
  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find((r) => r.id === id);
  };

  // Calculate day's total nutrition from the 4 meals
  const dayNutrients = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fats = 0;

    currentDay.meals.forEach((m) => {
      const rec = getRecipeById(m.recipeId);
      if (rec) {
        calories += rec.calories || 0;
        protein += rec.protein || 0;
        carbs += rec.carbs || 0;
        fats += rec.fats || 0;
      }
    });

    return { calories, protein, carbs, fats };
  }, [currentDay, recipes]);

  // Reset plan to default
  const handleResetToDefault = () => {
    const original = MEAL_PLANS_DATA.find((p) => p.goal === selectedGoal);
    if (!original) return;
    setCustomPlans((prev) =>
      prev.map((p) => (p.goal === selectedGoal ? JSON.parse(JSON.stringify(original)) : p))
    );
  };

  // Open swap recipe modal
  const handleOpenSwapModal = (dayIdx: number, mealIdx: number, mealType: string, recipeId: string) => {
    setSwappingMealInfo({ dayIdx, mealIdx, mealType, currentRecipeId: recipeId });
    setSwapSearchQuery('');
    setSwapCategoryFilter('Todos');
    setSwapModalOpen(true);
  };

  // Execute swap
  const handleSelectSwapRecipe = (newRecipe: Recipe) => {
    if (!swappingMealInfo) return;
    const { dayIdx, mealIdx } = swappingMealInfo;

    setCustomPlans((prev) => {
      return prev.map((plan) => {
        if (plan.goal !== selectedGoal) return plan;
        const newDays = plan.days.map((day, dIdx) => {
          if (dIdx !== dayIdx) return day;
          const newMeals = day.meals.map((meal, mIdx) => {
            if (mIdx !== mealIdx) return meal;
            return {
              ...meal,
              recipeId: newRecipe.id,
              customNote: newRecipe.name,
            };
          });
          return { ...day, meals: newMeals };
        });
        return { ...plan, days: newDays };
      });
    });

    setSwapModalOpen(false);
    setSwappingMealInfo(null);
  };

  // Generate shopping list for entire week (all 7 days, 4 meals/day)
  const handleGenerateShoppingList = () => {
    const allRecipeIds: string[] = [];
    currentPlan.days.forEach((day) => {
      day.meals.forEach((m) => {
        if (!allRecipeIds.includes(m.recipeId)) {
          allRecipeIds.push(m.recipeId);
        }
      });
    });

    generateShoppingListFromMealPlan(allRecipeIds);
    setShoppingGeneratedSuccess(true);
    triggerConfetti();
    setTimeout(() => setShoppingGeneratedSuccess(false), 3500);
  };

  // Convert meal type string to MealType union
  const mapMealType = (typeStr: string): MealType => {
    const t = typeStr.toLowerCase();
    if (t.includes('café') || t.includes('cafe')) return 'cafe';
    if (t.includes('lanche')) return 'lanche';
    if (t.includes('jantar')) return 'jantar';
    return 'almoco';
  };

  // Log single meal to today's diary
  const handleLogSingleMeal = (recipe: Recipe, mealTypeStr: string, uniqueKey: string) => {
    addMealItem({
      mealType: mapMealType(mealTypeStr),
      name: recipe.name,
      amount: '1 porção',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
      recipeId: recipe.id,
    });
    setMealLoggedSuccessId(uniqueKey);
    setTimeout(() => setMealLoggedSuccessId(null), 2500);
  };

  // Log all 4 meals of the selected day to today's diary
  const handleLogWholeDay = () => {
    currentDay.meals.forEach((meal) => {
      const rec = getRecipeById(meal.recipeId);
      if (rec) {
        addMealItem({
          mealType: mapMealType(meal.type),
          name: rec.name,
          amount: '1 porção',
          calories: rec.calories,
          protein: rec.protein,
          carbs: rec.carbs,
          fats: rec.fats,
          recipeId: rec.id,
        });
      }
    });

    setDayLoggedSuccess(true);
    triggerConfetti();
    setTimeout(() => setDayLoggedSuccess(false), 3000);
  };

  // Filter recipes for swap modal
  const filteredSwapRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (swapCategoryFilter !== 'Todos') {
        const matchesCategory =
          r.category === swapCategoryFilter ||
          r.categories?.includes(swapCategoryFilter) ||
          r.proteinSource === swapCategoryFilter;
        if (!matchesCategory) return false;
      }
      if (swapSearchQuery.trim()) {
        const q = swapSearchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesIngredient = r.ingredients.some((ing) =>
          ing.item.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesIngredient) return false;
      }
      return true;
    });
  }, [recipes, swapCategoryFilter, swapSearchQuery]);

  // Goal name formatting
  const getGoalTitle = (goal: FitnessGoal) => {
    switch (goal) {
      case 'perda_gordura':
        return 'Queima & Perda de Gordura';
      case 'hipertrofia':
        return 'Hipertrofia & Construção';
      case 'ganho_massa':
        return 'Ganho de Massa (Bulking Limpo)';
      case 'manutencao':
      default:
        return 'Manutenção & Longevidade';
    }
  };

  return (
    <div id="meal-planner-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Header & User Profile Goals Sync Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📅</span>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Cardápio da Semana
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                4 Refeições / Dia
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Planejamento nutricional completo sincronizado com as metas do seu perfil ({userProfile.name})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-edit-profile-from-planner"
              onClick={() => setActiveTab('profile')}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Settings2 className="w-4 h-4 text-emerald-600" />
              <span>Ajustar Perfil</span>
            </button>

            <button
              id="btn-generate-weekly-shopping"
              onClick={handleGenerateShoppingList}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
                shoppingGeneratedSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {shoppingGeneratedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Lista da Semana Gerada!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-emerald-700" />
                  <span>Gerar Lista de Compras</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* User Macro Target Cards */}
        <div className="bg-gradient-to-r from-emerald-50/60 via-slate-50 to-emerald-50/40 p-4 sm:p-5 rounded-2xl border border-emerald-100/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">
                Suas Metas Diárias Calculadas ({userProfile.name} • {userProfile.weight}kg)
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
              Objetivo: {getGoalTitle(selectedGoal)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-amber-700 block mb-0.5">
                🔥 Calorias Meta
              </span>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {calculatedGoals.calories}{' '}
                <span className="text-[10px] font-medium text-slate-400">kcal/dia</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-0.5">
                🥩 Proteína Meta
              </span>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {calculatedGoals.protein}g{' '}
                <span className="text-[10px] font-medium text-slate-400">
                  (~{((calculatedGoals.protein / (userProfile.weight || 75))).toFixed(1)}g/kg)
                </span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-blue-700 block mb-0.5">
                🍚 Carboidratos Meta
              </span>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {calculatedGoals.carbs}g{' '}
                <span className="text-[10px] font-medium text-slate-400">energia</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-700 block mb-0.5">
                🥑 Gorduras Meta
              </span>
              <div className="text-base sm:text-lg font-black text-slate-800">
                {calculatedGoals.fats}g{' '}
                <span className="text-[10px] font-medium text-slate-400">saciedade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Goal Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'perda_gordura', label: 'Perda de gordura', icon: '🔥', cals: '1.750 kcal' },
          { id: 'hipertrofia', label: 'Hipertrofia', icon: '🏋️', cals: '2.450 kcal' },
          { id: 'ganho_massa', label: 'Ganho de massa', icon: '💪', cals: '2.650 kcal' },
          { id: 'manutencao', label: 'Manutenção', icon: '⚖️', cals: '2.150 kcal' },
        ].map((tab) => {
          const isActive = selectedGoal === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedGoal(tab.id as FitnessGoal);
                setSelectedDayIdx(0);
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-xs ring-2 ring-emerald-400/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 text-base mb-1">
                <span>{tab.icon}</span>
                <span className={`text-xs font-bold ${isActive ? 'text-emerald-950' : 'text-slate-800'}`}>
                  {tab.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700">{tab.cals}</span>
                {userProfile.goal === tab.id && (
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    Seu Perfil
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Plan Overview Banner with Reset Button */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="space-y-0.5">
          <h3 className="font-bold text-slate-800 text-sm">{currentPlan.title}</h3>
          <p className="text-slate-500">{currentPlan.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResetToDefault}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1 transition-colors"
            title="Restaurar receitas padrão deste plano"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Restaurar Padrão</span>
          </button>
        </div>
      </div>

      {/* 4. Days of the Week Selector Pills (All 7 Days) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
          <span>Selecione o Dia da Semana (7 dias completos)</span>
          <span className="text-slate-400 text-[11px] font-medium">4 refeições balanceadas por dia</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {currentPlan.days.map((day, idx) => {
            const isSelected = selectedDayIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="block">{day.dayName.split('-')[0]}</span>
                <span className={`text-[10px] block font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  4 refeições
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Day Nutrition Summary Card vs User Goals */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="text-base font-bold text-slate-800">
                Resumo Nutricional: {currentDay.dayName}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Soma das 4 refeições planejadas para este dia comparadas com as metas do seu perfil
            </p>
          </div>

          <button
            id="btn-log-day-meals"
            onClick={handleLogWholeDay}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all shrink-0 ${
              dayLoggedSuccess
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800 shadow-xs'
            }`}
          >
            {dayLoggedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dia Registrado no Diário!</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Adicionar Dia Inteiro ao Diário</span>
              </>
            )}
          </button>
        </div>

        {/* Nutritional Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* Calories */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-amber-800">🔥 Calorias</span>
              <span className="font-bold text-slate-700">
                {dayNutrients.calories} / {calculatedGoals.calories} kcal
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayNutrients.calories / calculatedGoals.calories) * 100))}%`,
                }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block text-right">
              {Math.round((dayNutrients.calories / calculatedGoals.calories) * 100)}% da meta
            </span>
          </div>

          {/* Protein */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-emerald-800">🥩 Proteína</span>
              <span className="font-bold text-slate-700">
                {dayNutrients.protein}g / {calculatedGoals.protein}g
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayNutrients.protein / calculatedGoals.protein) * 100))}%`,
                }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block text-right">
              {Math.round((dayNutrients.protein / calculatedGoals.protein) * 100)}% da meta
            </span>
          </div>

          {/* Carbs */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-800">🍚 Carboidratos</span>
              <span className="font-bold text-slate-700">
                {dayNutrients.carbs}g / {calculatedGoals.carbs}g
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayNutrients.carbs / calculatedGoals.carbs) * 100))}%`,
                }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block text-right">
              {Math.round((dayNutrients.carbs / calculatedGoals.carbs) * 100)}% da meta
            </span>
          </div>

          {/* Fats */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-800">🥑 Gorduras</span>
              <span className="font-bold text-slate-700">
                {dayNutrients.fats}g / {calculatedGoals.fats}g
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayNutrients.fats / calculatedGoals.fats) * 100))}%`,
                }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block text-right">
              {Math.round((dayNutrients.fats / calculatedGoals.fats) * 100)}% da meta
            </span>
          </div>
        </div>
      </div>

      {/* 6. Day's 4 Meals Schedule Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>🍽️</span> As 4 Refeições de {currentDay.dayName}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Clique na refeição para ver o modo de preparo ou clique em "Trocar" para substituir
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentDay.meals.map((meal, mealIdx) => {
            const recipe = getRecipeById(meal.recipeId);
            if (!recipe) return null;
            const uniqueKey = `meal-${selectedDayIdx}-${mealIdx}`;
            const isLogged = mealLoggedSuccessId === uniqueKey;

            // Meal label colors
            let badgeBg = 'bg-amber-100 text-amber-900 border-amber-200';
            let mealEmoji = '🌅';
            if (meal.type.toLowerCase().includes('almoço') || meal.type.toLowerCase().includes('almoco')) {
              badgeBg = 'bg-emerald-100 text-emerald-900 border-emerald-200';
              mealEmoji = '🥗';
            } else if (meal.type.toLowerCase().includes('lanche')) {
              badgeBg = 'bg-blue-100 text-blue-900 border-blue-200';
              mealEmoji = '🥪';
            } else if (meal.type.toLowerCase().includes('jantar')) {
              badgeBg = 'bg-purple-100 text-purple-900 border-purple-200';
              mealEmoji = '🍲';
            }

            return (
              <div
                key={mealIdx}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div className="flex gap-3.5">
                  {/* Recipe Image with Quick View */}
                  <div
                    onClick={() => setSelectedRecipe(recipe)}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                  >
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-white/95 text-[10px] font-black text-emerald-700 shadow-xs border border-emerald-100">
                      {recipe.protein}g prot
                    </div>
                  </div>

                  {/* Meal Information */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md border ${badgeBg}`}>
                          {mealEmoji} {meal.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {recipe.prepTime} min
                        </span>
                      </div>

                      <h4
                        onClick={() => setSelectedRecipe(recipe)}
                        className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 cursor-pointer transition-colors line-clamp-2"
                      >
                        {recipe.name}
                      </h4>
                    </div>

                    {/* Macros breakdown */}
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 mt-2">
                      <span className="text-amber-700 font-bold">🔥 {recipe.calories} kcal</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">🥩 {recipe.protein}g P</span>
                      <span>•</span>
                      <span className="text-blue-700 font-bold">🍚 {recipe.carbs}g C</span>
                      <span>•</span>
                      <span className="text-slate-700 font-bold">🥑 {recipe.fats}g G</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions for this meal */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleOpenSwapModal(selectedDayIdx, mealIdx, meal.type, recipe.id)}
                    className="text-slate-500 hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Trocar Receita</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLogSingleMeal(recipe, meal.type, uniqueKey)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 border transition-all ${
                        isLogged
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {isLogged ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3 h-3" />
                          <span>+ Diário</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
                    >
                      <span>Ver Receita</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Modal for swapping recipe in the meal plan */}
      {swapModalOpen && swappingMealInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>Substituir {swappingMealInfo.mealType}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Escolha qualquer receita do catálogo para o cardápio deste dia
                </p>
              </div>
              <button
                onClick={() => setSwapModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filter */}
            <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou ingrediente..."
                  value={swapSearchQuery}
                  onChange={(e) => setSwapSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {[
                  'Todos',
                  'Café da manhã',
                  'Lanches',
                  'Almoço',
                  'Jantar',
                  'Frango',
                  'Carne',
                  'Peixes',
                  'Ovos',
                  'Sobremesas',
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSwapCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                      swapCategoryFilter === cat
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Recipes List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2.5 max-h-[450px]">
              {filteredSwapRecipes.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Nenhuma receita encontrada para essa busca.
                </div>
              ) : (
                filteredSwapRecipes.map((rec) => {
                  const isCurrent = rec.id === swappingMealInfo.currentRecipeId;
                  return (
                    <div
                      key={rec.id}
                      onClick={() => handleSelectSwapRecipe(rec)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-300'
                          : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.imageUrl}
                          alt={rec.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{rec.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                            <span className="text-emerald-700 font-bold">{rec.protein}g proteína</span>
                            <span>•</span>
                            <span className="text-amber-700 font-bold">{rec.calories} kcal</span>
                            <span>•</span>
                            <span>{rec.prepTime} min</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                          isCurrent
                            ? 'bg-emerald-200 text-emerald-800'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                        }`}
                      >
                        {isCurrent ? 'Atual' : 'Escolher'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
