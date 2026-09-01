import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MealType, Recipe } from '../types';
import {
  X,
  Heart,
  PlusCircle,
  ShoppingCart,
  Clock,
  Dumbbell,
  Flame,
  Check,
  ChevronDown,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export const RecipeModal: React.FC = () => {
  const {
    selectedRecipe,
    setSelectedRecipe,
    favorites,
    toggleFavorite,
    isFavorite,
    addRecipeToMeal,
    addRecipeToShoppingList,
    triggerConfetti,
  } = useApp();

  const [selectedMealType, setSelectedMealType] = useState<MealType>('almoco');
  const [isLoggedSuccess, setIsLoggedSuccess] = useState(false);
  const [isShoppingSuccess, setIsShoppingSuccess] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!selectedRecipe) return null;

  const isFav = isFavorite(selectedRecipe.id);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddToDiary = () => {
    addRecipeToMeal(selectedRecipe, selectedMealType);
    setIsLoggedSuccess(true);
    setTimeout(() => setIsLoggedSuccess(false), 2500);
  };

  const handleAddToShoppingList = () => {
    addRecipeToShoppingList(selectedRecipe);
    setIsShoppingSuccess(true);
    setTimeout(() => setIsShoppingSuccess(false), 2500);
  };

  return (
    <div
      id="recipe-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="recipe-detail-card"
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col"
      >
        {/* Close Button Top */}
        <button
          id="btn-close-recipe-modal"
          onClick={() => setSelectedRecipe(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all backdrop-blur-md shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 space-y-6 pb-6">
          {/* 1. Large Image & Badges */}
          <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
            <img
              src={selectedRecipe.imageUrl}
              alt={selectedRecipe.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            {/* Favorite & Category Top Left */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <button
                id="btn-modal-toggle-fav"
                onClick={() => toggleFavorite(selectedRecipe.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
                  isFav
                    ? 'bg-rose-500 text-white shadow-rose-500/40'
                    : 'bg-white/90 text-slate-700 hover:text-rose-600 border border-slate-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>

              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                {selectedRecipe.category}
              </span>
            </div>

            {/* Title bottom overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                {selectedRecipe.name}
              </h2>
              {selectedRecipe.quantidade_referencia && (
                <p className="text-xs text-white/90 font-medium mt-1 drop-shadow-xs flex items-center gap-1.5">
                  <span>🍽️</span> {selectedRecipe.quantidade_referencia}
                  {selectedRecipe.porcoes_totais && selectedRecipe.porcoes_totais > 1 && (
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px]">
                      Rinde {selectedRecipe.porcoes_totais} {selectedRecipe.unidade_porcao || 'porciones'}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="px-5 sm:px-6 space-y-6">
            {/* 2. Main Macro Grid Cards */}
            <div className="grid grid-cols-5 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div className="p-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Tiempo</span>
                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5">
                  ⏱️ {selectedRecipe.prepTime}m
                </span>
              </div>
              <div className="p-1 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-0.5">Proteína</span>
                <span className="text-sm font-black text-emerald-700 flex items-center justify-center gap-0.5">
                  💪 {selectedRecipe.protein}g
                </span>
              </div>
              <div className="p-1 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block mb-0.5">Calorías</span>
                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5">
                  🔥 {selectedRecipe.calories}
                </span>
              </div>
              <div className="p-1 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold text-blue-700 block mb-0.5">Carbs</span>
                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5">
                  🍚 {selectedRecipe.carbs}g
                </span>
              </div>
              <div className="p-1 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-600 block mb-0.5">Grasas</span>
                <span className="text-sm font-bold text-slate-800 flex items-center justify-center gap-0.5">
                  🥑 {selectedRecipe.fats}g
                </span>
              </div>
            </div>

            {/* Reference Portion Note if available */}
            {selectedRecipe.porcao_referencia && (
              <div className="bg-amber-50/70 border border-amber-200/80 px-3.5 py-2 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <span>ℹ️</span>
                <span><strong>Tabla basada en:</strong> {selectedRecipe.porcao_referencia}</span>
              </div>
            )}

            {/* 3. Action Buttons Row */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Meal type selector for Diary */}
                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs flex-1 shadow-xs">
                  <span className="text-slate-500 font-medium">Comida:</span>
                  <select
                    id="select-meal-type"
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value as MealType)}
                    className="bg-transparent text-slate-800 font-bold focus:outline-none flex-1 cursor-pointer"
                  >
                    <option value="cafe">Desayuno</option>
                    <option value="almoco">Almuerzo</option>
                    <option value="lanche">Merienda</option>
                    <option value="jantar">Cena</option>
                    <option value="ceia">Snack nocturno</option>
                  </select>
                </div>

                {/* Log Button */}
                <button
                  id="btn-modal-add-to-diary"
                  onClick={handleAddToDiary}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                    isLoggedSuccess
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isLoggedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>¡Registrado en el Diario!</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Añadir al Diario</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="pt-1">
                {/* Shopping List Button */}
                <button
                  id="btn-modal-add-to-shopping"
                  onClick={handleAddToShoppingList}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                    isShoppingSuccess
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isShoppingSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>¡Ingredientes Añadidos!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Añadir a la Lista de Compras</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 4. Ingredients Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span>🛒</span> Ingredientes
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedRecipe.ingredients.length} ingredientes (toca para marcar)
                </span>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedRecipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-slate-100/70 text-slate-400 line-through'
                          : 'hover:bg-white text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1 text-xs">
                        <strong className={isChecked ? 'text-slate-400' : 'text-slate-800'}>
                          {ing.item}
                        </strong>
                        {ing.amount ? <span className="text-slate-500"> ({ing.amount})</span> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Step-by-Step Numbered Instructions */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>👨‍🍳</span> Modo de Preparación
              </h3>

              <div className="space-y-3">
                {selectedRecipe.instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-relaxed"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 shadow-xs text-xs">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 mt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Chef's Secret Tip */}
            {selectedRecipe.tips && !selectedRecipe.storageMethod && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  💡 Consejo del Chef ShapeChef
                </span>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">{selectedRecipe.tips}</p>
              </div>
            )}

            {/* Storage & Shelf Life */}
            {(selectedRecipe.storageMethod || selectedRecipe.shelfLife) && (
              <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-2xl space-y-1.5 text-xs">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <span>🧊</span> Conservación y Almacenamiento
                </span>
                {selectedRecipe.shelfLife && (
                  <p className="text-emerald-800">
                    <strong>Caducidad:</strong> {selectedRecipe.shelfLife}
                  </p>
                )}
                {selectedRecipe.storageMethod && (
                  <p className="text-emerald-800">
                    <strong>Cómo conservar:</strong> {selectedRecipe.storageMethod}
                  </p>
                )}
              </div>
            )}

            {/* 7. Detailed Nutritional Facts */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tabla Nutricional por Porción
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Energía</span>
                  <span className="font-bold text-slate-800">{selectedRecipe.calories} kcal</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Proteína Pura</span>
                  <span className="font-bold text-emerald-700">{selectedRecipe.protein}g</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Carbohidratos</span>
                  <span className="font-bold text-blue-700">{selectedRecipe.carbs}g</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Grasas Totales</span>
                  <span className="font-bold text-slate-700">{selectedRecipe.fats}g</span>
                </div>
              </div>
              {selectedRecipe.fiber && (
                <p className="text-[11px] text-slate-500">
                  🌾 Fibra Alimentaria: <strong>{selectedRecipe.fiber}g</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
