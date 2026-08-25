import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLevel, FitnessGoal, Gender } from '../types';
import {
  User,
  Calculator,
  Bell,
  Award,
  TrendingUp,
  Save,
  CheckCircle2,
  Gift,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    calculatedGoals,
    notifications,
    updateNotifications,
    setActiveTab,
  } = useApp();

  const [formData, setFormData] = useState({
    name: userProfile.name,
    age: userProfile.age,
    gender: userProfile.gender,
    weight: userProfile.weight,
    height: userProfile.height,
    activityLevel: userProfile.activityLevel,
    goal: userProfile.goal,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [customGoalsMode, setCustomGoalsMode] = useState(!!userProfile.customGoals);
  const [customProtein, setCustomProtein] = useState(userProfile.customGoals?.protein || calculatedGoals.protein);
  const [customCalories, setCustomCalories] = useState(userProfile.customGoals?.calories || calculatedGoals.calories);
  const [customCarbs, setCustomCarbs] = useState(userProfile.customGoals?.carbs || calculatedGoals.carbs);
  const [customFats, setCustomFats] = useState(userProfile.customGoals?.fats || calculatedGoals.fats);

  useEffect(() => {
    setFormData({
      name: userProfile.name,
      age: userProfile.age,
      gender: userProfile.gender,
      weight: userProfile.weight,
      height: userProfile.height,
      activityLevel: userProfile.activityLevel,
      goal: userProfile.goal,
    });
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      customGoals: customGoalsMode
        ? {
            protein: Number(customProtein),
            calories: Number(customCalories),
            carbs: Number(customCarbs),
            fats: Number(customFats),
          }
        : undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div id="profile-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-xl shadow-xs">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{userProfile.name}</h1>
            <p className="text-xs text-slate-500 font-medium">
              {userProfile.weight}kg • {userProfile.height}cm • {userProfile.age} anos
            </p>
          </div>
        </div>

        {/* Quick links to History & Bonus */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('history')}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Ver Histórico</span>
          </button>
          <button
            onClick={() => setActiveTab('bonus')}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Meus Bônus</span>
          </button>
        </div>
      </div>

      {/* 2. Calculated Goals Summary Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-800">Minhas Metas Nutricionais</h2>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Calculado automaticamente
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-emerald-700 block mb-0.5">🥩 Meta de Proteína</span>
            <div className="text-xl font-black text-slate-800">{calculatedGoals.protein}g</div>
            <span className="text-[10px] text-slate-500">~2.2g por kg</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-amber-700 block mb-0.5">🔥 Meta de Calorias</span>
            <div className="text-xl font-black text-slate-800">{calculatedGoals.calories}</div>
            <span className="text-[10px] text-slate-500">kcal/dia</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-blue-700 block mb-0.5">🍚 Meta de Carbs</span>
            <div className="text-xl font-black text-slate-800">{calculatedGoals.carbs}g</div>
            <span className="text-[10px] text-slate-500">energia limpa</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">🥑 Meta de Gorduras</span>
            <div className="text-xl font-black text-slate-800">{calculatedGoals.fats}g</div>
            <span className="text-[10px] text-slate-500">hormônios & saciedade</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Profile & Macro Calculator Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>⚙️</span> Atualizar Meus Dados & Recalcular Macros
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Name */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Seu Nome</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Sexo Biológico</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 cursor-pointer focus:bg-white transition-colors"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Idade (anos)</label>
            <input
              type="number"
              required
              min="12"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Peso Atual (kg)</label>
            <input
              type="number"
              step="0.1"
              required
              min="30"
              max="250"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Altura (cm)</label>
            <input
              type="number"
              required
              min="100"
              max="250"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Nível de Atividade Física</label>
            <select
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value as ActivityLevel })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 cursor-pointer focus:bg-white transition-colors"
            >
              <option value="sedentario">Sedentário (pouco ou nenhum exercício)</option>
              <option value="leve">Leve (exercício 1-3 dias/semana)</option>
              <option value="moderado">Moderado (exercício 3-5 dias/semana)</option>
              <option value="intenso">Intenso (exercício 6-7 dias/semana)</option>
              <option value="muito_intenso">Muito Intenso (treinos pesados 2x ao dia)</option>
            </select>
          </div>

          {/* Fitness Goal */}
          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-bold mb-1">Objetivo Principal</label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value as FitnessGoal })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:border-emerald-500 cursor-pointer focus:bg-white transition-colors"
            >
              <option value="perda_gordura">🔥 Queima & Perda de Gordura (Déficit Proteico)</option>
              <option value="hipertrofia">🏋️ Hipertrofia & Definição Muscular</option>
              <option value="ganho_massa">💪 Ganho de Massa Muscular / Bulking Limpo</option>
              <option value="manutencao">⚖️ Manutenção de Peso & Saúde Geral</option>
            </select>
          </div>
        </div>

        {/* Custom manual goals toggle */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
            <input
              type="checkbox"
              checked={customGoalsMode}
              onChange={(e) => setCustomGoalsMode(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Quero definir manualmente minhas metas em gramas/calorias</span>
          </label>

          {customGoalsMode && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div>
                <label className="block text-emerald-700 font-bold mb-1">Proteína (g)</label>
                <input
                  type="number"
                  value={customProtein}
                  onChange={(e) => setCustomProtein(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-amber-700 font-bold mb-1">Calorias (kcal)</label>
                <input
                  type="number"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-blue-700 font-bold mb-1">Carboidratos (g)</label>
                <input
                  type="number"
                  value={customCarbs}
                  onChange={(e) => setCustomCarbs(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Gorduras (g)</label>
                <input
                  type="number"
                  value={customFats}
                  onChange={(e) => setCustomFats(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:border-slate-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
              savedSuccess
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Dados Salvos e Metas Atualizadas!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Perfil & Recalcular Metas</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 4. Section 20: Notification Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-800">Configurações de Notificações</h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Lembretes de Refeições</span>
              <span className="text-slate-500">Avisar nos horários programados do dia</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.mealReminders}
              onChange={(e) => updateNotifications({ mealReminders: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Lembrete de Meta de Proteína</span>
              <span className="text-slate-500">Avisar no fim da tarde se faltar proteína para a meta</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.proteinGoalReminder}
              onChange={(e) => updateNotifications({ proteinGoalReminder: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Sugestões de Receitas para o Jantar</span>
              <span className="text-slate-500">Recomendar pratos rápidos com o restante de proteína</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.recipeSuggestions}
              onChange={(e) => updateNotifications({ recipeSuggestions: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Lembrete de Água / Hidratação</span>
              <span className="text-slate-500">Notificar a cada 2 horas para beber água</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.waterReminder}
              onChange={(e) => updateNotifications({ waterReminder: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
