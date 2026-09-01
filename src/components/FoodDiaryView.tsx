import React, { useState } from 'react';
import { useApp, getFormattedDate } from '../context/AppContext';
import { MealType, MealLogItem, Recipe } from '../types';
import {
  Plus,
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Flame,
  Search,
  Sparkles,
  ArrowRight,
  X,
  Clock,
} from 'lucide-react';

export const FoodDiaryView: React.FC = () => {
  const {
    userProfile,
    calculatedGoals,
    selectedDate,
    setSelectedDate,
    currentDayItems,
    currentDayTotals,
    addMealItem,
    removeMealItem,
    clearDayLogs,
    recipes,
    setSelectedRecipe,
    setRecipeFilterProteinMin,
    setActiveTab,
  } = useApp();

  // Manual Item Modal state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [targetMealType, setTargetMealType] = useState<MealType>('almoco');
  const [manualName, setManualName] = useState('');
  const [manualAmount, setManualAmount] = useState('1 porção (150g)');
  const [manualCalories, setManualCalories] = useState<number | ''>(250);
  const [manualProtein, setManualProtein] = useState<number | ''>(35);
  const [manualCarbs, setManualCarbs] = useState<number | ''>(15);
  const [manualFats, setManualFats] = useState<number | ''>(5);

  // Quick Recipe Picker Modal
  const [isRecipePickerOpen, setIsRecipePickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  // Date navigation helpers
  const handleDateShift = (deltaDays: number) => {
    const parts = selectedDate.split('-');
    const cur = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    cur.setDate(cur.getDate() + deltaDays);
    setSelectedDate(getFormattedDate(cur));
  };

  const isToday = selectedDate === getFormattedDate();

  // Macro calculations
  const proteinGoal = calculatedGoals.protein;
  const caloriesGoal = calculatedGoals.calories;
  const carbsGoal = calculatedGoals.carbs;
  const fatsGoal = calculatedGoals.fats;

  const proteinConsumed = currentDayTotals.protein;
  const caloriesConsumed = currentDayTotals.calories;
  const carbsConsumed = currentDayTotals.carbs;
  const fatsConsumed = currentDayTotals.fats;

  const proteinRemaining = Math.max(0, proteinGoal - proteinConsumed);
  const caloriesRemaining = Math.max(0, caloriesGoal - caloriesConsumed);

  const mealCategories: { id: MealType; title: string; icon: string }[] = [
    { id: 'cafe', title: 'Desayuno', icon: '🍳' },
    { id: 'almoco', title: 'Almuerzo', icon: '🍲' },
    { id: 'lanche', title: 'Meriendas', icon: '🥪' },
    { id: 'jantar', title: 'Cena', icon: '🥗' },
    { id: 'ceia', title: 'Snack Nocturno', icon: '🌙' },
  ];

  const handleSaveManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    addMealItem({
      mealType: targetMealType,
      name: manualName.trim(),
      amount: manualAmount || '1 porción',
      calories: Number(manualCalories) || 0,
      protein: Number(manualProtein) || 0,
      carbs: Number(manualCarbs) || 0,
      fats: Number(manualFats) || 0,
    });

    setManualName('');
    setIsManualModalOpen(false);
  };

  const handleAddRecipeFromPicker = (recipe: Recipe) => {
    addMealItem({
      mealType: targetMealType,
      name: recipe.name,
      amount: '1 porción',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
      recipeId: recipe.id,
    });
    setIsRecipePickerOpen(false);
  };

  const filteredPickerRecipes = (recipes || []).filter((r) =>
    (r.name && r.name.toLowerCase().includes((pickerSearch || '').toLowerCase())) ||
    (r.category && r.category.toLowerCase().includes((pickerSearch || '').toLowerCase()))
  );

  return (
    <div id="food-diary-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Date Switcher */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => handleDateShift(-1)}
          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-slate-800 font-bold text-sm focus:outline-none cursor-pointer"
          />
          {isToday && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              HOY
            </span>
          )}
        </div>

        <button
          onClick={() => handleDateShift(1)}
          className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Daily Macro Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">Resumen del Día</h2>
          <span className="text-xs text-slate-500 font-medium">
            Faltan: <strong className="text-emerald-700">{proteinRemaining}g de proteína</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Protein */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-emerald-700 font-bold block mb-0.5">🥩 Proteína</span>
            <div className="text-base font-black text-slate-800">
              {proteinConsumed} <span className="text-xs font-normal text-slate-500">/ {proteinGoal}g</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Restan: <strong className="text-emerald-700">{proteinRemaining}g</strong>
            </div>
          </div>

          {/* Calories */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-amber-700 font-bold block mb-0.5">🔥 Calorías</span>
            <div className="text-base font-black text-slate-800">
              {caloriesConsumed} <span className="text-xs font-normal text-slate-500">/ {caloriesGoal}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Restan: <strong className="text-amber-700">{caloriesRemaining} kcal</strong>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-blue-700 font-bold block mb-0.5">🍚 Carbohidratos</span>
            <div className="text-base font-black text-slate-800">
              {carbsConsumed} <span className="text-xs font-normal text-slate-500">/ {carbsGoal}g</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Restan: <strong className="text-blue-700">{Math.max(0, carbsGoal - carbsConsumed)}g</strong>
            </div>
          </div>

          {/* Fats */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-700 font-bold block mb-0.5">🥑 Grasas</span>
            <div className="text-base font-black text-slate-800">
              {fatsConsumed} <span className="text-xs font-normal text-slate-500">/ {fatsGoal}g</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Restan: <strong className="text-slate-700">{Math.max(0, fatsGoal - fatsConsumed)}g</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section 15: Meta de proteína - Direct shortcut */}
      {proteinRemaining > 0 && (
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="text-xs sm:text-sm text-emerald-900">
            ¡Faltan <strong className="text-emerald-700 font-black">{proteinRemaining}g de proteína</strong> para alcanzar tu objetivo diario!
          </div>
          <button
            onClick={() => {
              setRecipeFilterProteinMin(proteinRemaining);
              setActiveTab('recipes');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Encontrar recetas con {proteinRemaining}g+</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Meal Categories List (Café, Almoço, Lanche, Jantar, Ceia) */}
      <div className="space-y-4">
        {mealCategories.map((cat) => {
          const items = currentDayItems.filter((i) => i.mealType === cat.id);
          const mealProtein = items.reduce((sum, i) => sum + (i.protein || 0), 0);
          const mealCalories = items.reduce((sum, i) => sum + (i.calories || 0), 0);

          return (
            <div
              key={cat.id}
              id={`meal-section-${cat.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              {/* Category Header */}
              <div className="p-4 bg-slate-50 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{cat.title}</h3>
                    <span className="text-[11px] text-slate-500">
                      {mealProtein}g proteína • {mealCalories} kcal
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Option 1: Add from App Recipes */}
                  <button
                    onClick={() => {
                      setTargetMealType(cat.id);
                      setIsRecipePickerOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                    title="Añadir receta de la aplicación"
                  >
                    <span>🍳</span>
                    <span className="hidden sm:inline">Receta de la App</span>
                  </button>

                  {/* Option 2: Add Manual Food */}
                  <button
                    onClick={() => {
                      setTargetMealType(cat.id);
                      setIsManualModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 shadow-xs"
                    title="Añadir alimento manual"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Manual</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="p-3 divide-y divide-slate-100">
                {items.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center italic">
                    Ningún alimento registrado en esta comida
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 px-2 flex items-center justify-between group hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                          {item.time && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              {item.time}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {item.amount} • <span className="text-emerald-700 font-bold">{item.protein}g proteína</span> •{' '}
                          <span className="text-amber-600 font-medium">{item.calories} kcal</span> •{' '}
                          <span className="text-blue-600 font-medium">{item.carbs}g C</span> •{' '}
                          <span className="text-slate-600 font-medium">{item.fats}g G</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeMealItem(item.id, selectedDate)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-80 group-hover:opacity-100"
                        title="Eliminar elemento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Food Add Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>➕</span> Registrar Alimento Manual
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nombre del alimento</label>
                <input
                  type="text"
                  required
                  placeholder="ej: Pechuga de pollo a la plancha, Batido de whey..."
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Cantidad / Porción</label>
                <input
                  type="text"
                  placeholder="ej: 150g, 2 rebanadas, 1 scoop"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-700 font-bold mb-1">Proteína (g)</label>
                  <input
                    type="number"
                    value={manualProtein}
                    onChange={(e) => setManualProtein(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-amber-700 font-bold mb-1">Calorías (kcal)</label>
                  <input
                    type="number"
                    value={manualCalories}
                    onChange={(e) => setManualCalories(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-amber-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-blue-700 font-bold mb-1">Carbohidratos (g)</label>
                  <input
                    type="number"
                    value={manualCarbs}
                    onChange={(e) => setManualCarbs(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Grasas (g)</label>
                  <input
                    type="number"
                    value={manualFats}
                    onChange={(e) => setManualFats(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-slate-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
                >
                  Añadir Comida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Recipe Picker Modal */}
      {isRecipePickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>🍳</span> Elige una Receta de la App
              </h3>
              <button
                onClick={() => setIsRecipePickerOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder="Buscar receta por nombre..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredPickerRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleAddRecipeFromPicker(recipe)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{recipe.name}</h4>
                    <span className="text-[11px] text-slate-500">
                      💪 <strong className="text-emerald-700">{recipe.protein}g</strong> prot • 🔥 {recipe.calories} kcal
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 shadow-xs">
                    Añadir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
