import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe } from '../types';
import {
  Refrigerator,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  Dumbbell,
  Sparkles,
} from 'lucide-react';

// Common pantry staples that shouldn't penalize a recipe match
const PANTRY_STAPLES = [
  'sal',
  'pimenta',
  'agua',
  'alho',
  'cebola',
  'azeite',
  'oleo',
  'oregano',
  'temperos',
  'canela',
  'fermento',
  'adocante',
  'paprica',
  'curcuma',
  'limao',
  'ervas',
  'cheiro verde',
  'salsinha',
  'cebolinha',
];

function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s]/g, ' ') // replace punctuation with spaces
    .trim();
}

function checkIngredientMatch(userIngredient: string, recipeIngredientItem: string, normalizedName?: string): boolean {
  const u = normalizeText(userIngredient);
  const rItem = normalizeText(recipeIngredientItem);
  const rNorm = normalizeText(normalizedName || '');

  if (!u) return false;

  // Direct substring in ingredient text or normalized key
  if (rItem.includes(u) || u.includes(rItem)) return true;
  if (rNorm && (rNorm.includes(u) || u.includes(rNorm))) return true;

  // Word stems (remove trailing 's' / 'es')
  const uStem = u.replace(/s\b/g, '').replace(/es\b/g, '');
  const rItemStem = rItem.replace(/s\b/g, '').replace(/es\b/g, '');
  const rNormStem = rNorm.replace(/s\b/g, '').replace(/es\b/g, '');
  if (uStem.length >= 3 && (rItemStem.includes(uStem) || rNormStem.includes(uStem))) return true;

  // Common synonym groups for Portuguese culinary terms
  const synonyms: Record<string, string[]> = {
    ovo: ['ovo', 'ovos', 'clara', 'claras', 'gema', 'gemas'],
    clara: ['clara', 'claras', 'ovo', 'ovos'],
    frango: ['frango', 'peito de frango', 'galinha', 'file de frango', 'sobrecoxa'],
    carne: ['carne', 'patinho', 'moida', 'alcatra', 'maminha', 'musculo', 'bife', 'acem'],
    patinho: ['patinho', 'carne', 'moida'],
    peixe: ['peixe', 'tilapia', 'merluza', 'bacalhau', 'salmao', 'atum'],
    tilapia: ['tilapia', 'peixe'],
    salmao: ['salmao', 'peixe'],
    atum: ['atum', 'peixe'],
    queijo: ['queijo', 'cottage', 'ricota', 'mussarela', 'mucarela', 'parmesao', 'minas', 'requeijao', 'prato'],
    cottage: ['cottage', 'queijo', 'ricota'],
    ricota: ['ricota', 'queijo', 'cottage'],
    aveia: ['aveia', 'farelo', 'flocos', 'farinha de aveia'],
    iogurte: ['iogurte', 'grego', 'desnatado', 'coalhada'],
    banana: ['banana', 'bananas'],
    whey: ['whey', 'proteina em po', 'suplemento', 'isolado'],
    tapioca: ['tapioca', 'goma', 'crepioca'],
    batata: ['batata', 'batata doce', 'batata inglesa', 'batatas'],
    arroz: ['arroz', 'arroz integral', 'arroz branco'],
    tomate: ['tomate', 'molho', 'extrato', 'passata', 'tomates'],
    brocolis: ['brocolis', 'legumes', 'couve', 'verdura'],
  };

  for (const [, group] of Object.entries(synonyms)) {
    const uInGroup = group.some((term) => u.includes(term) || term.includes(u));
    const rInGroup = group.some(
      (term) => rItem.includes(term) || term.includes(rItem) || (rNorm && rNorm.includes(term))
    );
    if (uInGroup && rInGroup) return true;
  }

  return false;
}

export const FridgeModeView: React.FC = () => {
  const { recipes, setSelectedRecipe } = useApp();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const clean = customInput.trim();
    const cleanNorm = normalizeText(clean);
    
    // Avoid duplicate ingredients
    const alreadyAdded = selectedIngredients.some((item) => normalizeText(item) === cleanNorm);
    if (!alreadyAdded) {
      setSelectedIngredients((prev) => [...prev, clean]);
    }
    setCustomInput('');
  };

  const removeIngredient = (ing: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ing));
  };

  // Quick suggestion chips to help the user click & add common staples instantly
  const popularSuggestions = [
    'Ovo',
    'Peito de Frango',
    'Queijo',
    'Aveia',
    'Whey',
    'Atum',
    'Banana',
    'Iogurte',
    'Carne Moída',
    'Tilápia',
    'Tapioca',
    'Batata Doce',
  ];

  const handleAddQuickSuggestion = (item: string) => {
    const itemNorm = normalizeText(item);
    if (!selectedIngredients.some((i) => normalizeText(i) === itemNorm)) {
      setSelectedIngredients((prev) => [...prev, item]);
    }
  };

  // Match logic
  const { perfectMatches, almostMatches, totalFound } = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return { perfectMatches: [], almostMatches: [], totalFound: 0 };
    }

    interface MatchResult {
      recipe: Recipe;
      matchedUserIngredients: string[];
      matchedRecipeIngredients: string[];
      missingNonStaples: string[];
      matchScore: number;
    }

    const allMatches: MatchResult[] = [];

    recipes.forEach((recipe) => {
      const recipeIngredients = recipe.ingredients || [];
      
      // Check which user ingredients match this recipe
      const matchedUserIngredients = selectedIngredients.filter((userIng) =>
        recipeIngredients.some((rIng) =>
          checkIngredientMatch(userIng, rIng.item, rIng.normalizedName)
        ) || checkIngredientMatch(userIng, recipe.name, recipe.proteinSource)
      );

      if (matchedUserIngredients.length === 0) {
        return; // No match
      }

      // Check matched vs missing recipe ingredients
      const matchedRecipeIngredients: string[] = [];
      const missingNonStaples: string[] = [];

      recipeIngredients.forEach((rIng) => {
        const isMatched = selectedIngredients.some((userIng) =>
          checkIngredientMatch(userIng, rIng.item, rIng.normalizedName)
        );

        if (isMatched) {
          matchedRecipeIngredients.push(rIng.item);
        } else {
          const rNorm = normalizeText(rIng.normalizedName || rIng.item);
          const isStaple = PANTRY_STAPLES.some((s) => rNorm.includes(s));
          if (!isStaple) {
            missingNonStaples.push(rIng.item);
          }
        }
      });

      // Match Score calculation: prioritizes recipes utilizing more of user's ingredients & high protein
      const matchRatio = matchedUserIngredients.length / selectedIngredients.length;
      const recipeCompleteness = matchedRecipeIngredients.length / (recipeIngredients.length || 1);
      const matchScore = matchRatio * 50 + recipeCompleteness * 30 + recipe.protein * 0.2;

      allMatches.push({
        recipe,
        matchedUserIngredients,
        matchedRecipeIngredients,
        missingNonStaples,
        matchScore,
      });
    });

    // Sort by match score descending
    allMatches.sort((a, b) => b.matchScore - a.matchScore);

    // If user provided 1 ingredient: all recipes containing that ingredient are displayed
    // If user provided 2+ ingredients: split into high matches (>=2 matched or 100% user items matched) and other suggestions
    const perfect: MatchResult[] = [];
    const almost: MatchResult[] = [];

    allMatches.forEach((item) => {
      if (selectedIngredients.length === 1) {
        // With 1 ingredient, categorize by how few extra ingredients are needed
        if (item.missingNonStaples.length <= 2) {
          perfect.push(item);
        } else {
          almost.push(item);
        }
      } else {
        // With 2+ ingredients
        if (
          item.matchedUserIngredients.length >= 2 ||
          item.matchedUserIngredients.length === selectedIngredients.length ||
          item.missingNonStaples.length === 0
        ) {
          perfect.push(item);
        } else {
          almost.push(item);
        }
      }
    });

    return {
      perfectMatches: perfect,
      almostMatches: almost,
      totalFound: allMatches.length,
    };
  }, [recipes, selectedIngredients]);

  return (
    <div id="fridge-mode-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Header Hero */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <Refrigerator className="w-5 h-5 text-emerald-600" />
          <span>Modo Geladeira</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          O que você tem para cozinhar hoje?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Adicione os ingredientes disponíveis e descubra instantaneamente as melhores receitas proteicas que você pode preparar agora!
        </p>
      </div>

      {/* 2. Interactive Ingredient Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Adicionar Ingredientes</h3>
          <span className="text-xs text-slate-500 font-medium">
            {selectedIngredients.length} adicionado{selectedIngredients.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Custom Input */}
        <form onSubmit={handleAddCustom} className="flex items-center gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Digite um ingrediente (ex: frango, ovos, queijo, aveia, atum...)"
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="px-4 sm:px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Sugestões rápidas:</span>
          {popularSuggestions
            .filter((item) => !selectedIngredients.some((i) => normalizeText(i) === normalizeText(item)))
            .slice(0, 8)
            .map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddQuickSuggestion(item)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-600 text-[11px] font-medium border border-transparent transition-colors flex items-center gap-1"
              >
                <Plus className="w-2.5 h-2.5" />
                <span>{item}</span>
              </button>
            ))}
        </div>

        {/* Selected badges with remove */}
        {selectedIngredients.length > 0 ? (
          <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-600 font-bold mr-1">Na sua bancada:</span>
            {selectedIngredients.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs animate-in fade-in"
              >
                <span>{ing}</span>
                <button
                  type="button"
                  onClick={() => removeIngredient(ing)}
                  className="hover:text-emerald-950 text-emerald-600 transition-colors"
                  title={`Remover ${ing}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setSelectedIngredients([])}
              className="text-xs text-slate-400 hover:text-rose-600 underline ml-2 font-medium transition-colors"
            >
              Limpar todos
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400 pt-1">
            Digite ou clique em uma sugestão acima para encontrar todas as receitas que usam seus ingredientes.
          </p>
        )}
      </div>

      {/* 3. Results Section */}
      {selectedIngredients.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm">
          <Refrigerator className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">Nenhum ingrediente adicionado</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Adicione ingredientes como ovos, frango, aveia ou queijo para ver todas as opções disponíveis no catálogo.
          </p>
        </div>
      ) : totalFound === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2 shadow-sm">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">Nenhuma receita encontrada</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Não encontramos receitas com os ingredientes informados. Tente adicionar ingredientes comuns como ovos, frango, aveia, whey ou queijo.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Matches */}
          {perfectMatches.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Combinações Ideais ({perfectMatches.length})</span>
                </h3>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Alta compatibilidade
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {perfectMatches.map(({ recipe, matchedUserIngredients, missingNonStaples }) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-36 w-full bg-slate-100">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-100 text-xs font-black text-emerald-700 shadow-xs">
                        💪 {recipe.protein}g prot
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-[11px] text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-300" /> {recipe.prepTime} min
                      </div>
                    </div>
                    <div className="p-3.5 space-y-2">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {recipe.name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>🔥 {recipe.calories} kcal</span>
                        <span className="text-emerald-700 text-[11px] font-bold">
                          ✓ Usa: {matchedUserIngredients.join(', ')}
                        </span>
                      </div>
                      {missingNonStaples.length > 0 && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-[11px]">
                          <span className="text-slate-500 font-medium block">
                            Outros ingredientes: <span className="text-slate-700 font-semibold">{missingNonStaples.slice(0, 2).join(', ')}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional / Partial Matches */}
          {almostMatches.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <span>Outras Opções com seus Ingredientes ({almostMatches.length})</span>
                </h3>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Requer itens adicionais
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {almostMatches.map(({ recipe, matchedUserIngredients, missingNonStaples }) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-md cursor-pointer group transition-all hover:-translate-y-1"
                  >
                    <div className="relative h-36 w-full bg-slate-100">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-black text-emerald-700 shadow-xs">
                        💪 {recipe.protein}g prot
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-[11px] text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-300" /> {recipe.prepTime} min
                      </div>
                    </div>
                    <div className="p-3.5 space-y-2">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {recipe.name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>🔥 {recipe.calories} kcal</span>
                        <span className="text-emerald-700 text-[11px] font-bold">
                          ✓ Usa: {matchedUserIngredients.join(', ')}
                        </span>
                      </div>
                      {missingNonStaples.length > 0 && (
                        <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-200/60 text-[11px]">
                          <span className="text-amber-800 font-medium block">
                            Faltam: <span className="text-amber-950 font-semibold">{missingNonStaples.slice(0, 2).join(', ')}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

