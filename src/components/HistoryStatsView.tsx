import React, { useState, useMemo } from 'react';
import { useApp, getFormattedDate } from '../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Flame,
  Dumbbell,
  Calendar,
  ChevronRight,
} from 'lucide-react';

export const HistoryStatsView: React.FC = () => {
  const { dailyLogs, calculatedGoals, setSelectedDate, setActiveTab } = useApp();
  const [periodDays, setPeriodDays] = useState<7 | 30 | 90>(7);

  // Generate chart data based on selected period
  const { chartData, stats } = useMemo(() => {
    const today = new Date();
    const data = [];
    let totalProt = 0;
    let totalCals = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let goalMetDays = 0;
    let daysWithDataCount = 0;

    for (let i = periodDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateKey = getFormattedDate(d);
      const dayItems = dailyLogs[dateKey] || [];

      const dayProt = dayItems.reduce((acc, it) => acc + (it.protein || 0), 0);
      const dayCals = dayItems.reduce((acc, it) => acc + (it.calories || 0), 0);
      const dayCarbs = dayItems.reduce((acc, it) => acc + (it.carbs || 0), 0);
      const dayFats = dayItems.reduce((acc, it) => acc + (it.fats || 0), 0);

      // Short label e.g. "Lun", "Mar" or "14/05"
      const dayLabel =
        periodDays === 7
          ? d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')
          : `${d.getDate()}/${d.getMonth() + 1}`;

      data.push({
        date: dateKey,
        label: dayLabel,
        proteina: dayProt,
        calorias: dayCals,
        carbs: dayCarbs,
        gorduras: dayFats,
        metaProteina: calculatedGoals.protein,
      });

      if (dayItems.length > 0) {
        daysWithDataCount++;
        totalProt += dayProt;
        totalCals += dayCals;
        totalCarbs += dayCarbs;
        totalFats += dayFats;
        if (dayProt >= calculatedGoals.protein) {
          goalMetDays++;
        }
      }
    }

    const avgProt = daysWithDataCount > 0 ? Math.round(totalProt / daysWithDataCount) : 0;
    const avgCals = daysWithDataCount > 0 ? Math.round(totalCals / daysWithDataCount) : 0;
    const avgCarbs = daysWithDataCount > 0 ? Math.round(totalCarbs / daysWithDataCount) : 0;
    const avgFats = daysWithDataCount > 0 ? Math.round(totalFats / daysWithDataCount) : 0;
    const consistencyPct =
      daysWithDataCount > 0 ? Math.round((goalMetDays / daysWithDataCount) * 100) : 0;

    return {
      chartData: data,
      stats: {
        avgProt,
        avgCals,
        avgCarbs,
        avgFats,
        goalMetDays,
        daysWithDataCount,
        consistencyPct,
      },
    };
  }, [dailyLogs, calculatedGoals.protein, periodDays]);

  return (
    <div id="history-stats-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Header & Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>📈</span> Historial y Estadísticas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Sigue tu consistencia de proteína y evolución nutricional
          </p>
        </div>

        {/* 7, 30, 90 days selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setPeriodDays(days as 7 | 30 | 90)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                periodDays === days
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {days} días
            </button>
          ))}
        </div>
      </div>

      {/* 2. Macro Averages Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-emerald-700 font-bold">Promedio de Proteína</span>
            <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-800">
            {stats.avgProt}g <span className="text-xs font-normal text-slate-500">/día</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Objetivo: {calculatedGoals.protein}g/día
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-amber-700 font-bold">Promedio de Calorías</span>
            <Flame className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-black text-slate-800">
            {stats.avgCals} <span className="text-xs font-normal text-slate-500">kcal/día</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Objetivo: {calculatedGoals.calories} kcal
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-blue-700 font-bold">Carbohidratos</span>
            <span>🍚</span>
          </div>
          <div className="text-xl font-black text-slate-800">
            {stats.avgCarbs}g <span className="text-xs font-normal text-slate-500">/día</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Objetivo: {calculatedGoals.carbs}g
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-slate-700 font-bold">Tasa de Consistencia</span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-700">
            {stats.consistencyPct}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {stats.goalMetDays} de {stats.daysWithDataCount} días en el objetivo
          </span>
        </div>
      </div>

      {/* 3. Protein Evolution Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Consumo Diario de Proteína ({periodDays} días)
            </h3>
            <p className="text-xs text-slate-500">
              La línea punteada representa tu objetivo diario ({calculatedGoals.protein}g)
            </p>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#0f172a',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: any) => [`${value}g`, 'Proteína']}
              />
              <ReferenceLine
                y={calculatedGoals.protein}
                stroke="#059669"
                strokeDasharray="4 4"
                label={{
                  value: `Objetivo ${calculatedGoals.protein}g`,
                  fill: '#059669',
                  fontSize: 10,
                  position: 'insideTopRight',
                }}
              />
              <Line
                type="monotone"
                dataKey="proteina"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 4, fill: '#059669' }}
                activeDot={{ r: 6, fill: '#047857' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Calories Evolution Bar Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            Consumo Calórico por Día
          </h3>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: any) => [`${value} kcal`, 'Calorías']}
              />
              <Bar dataKey="calorias" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Past Days Quick Log Navigator */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800">Registros de los Últimos Días</h3>
        <div className="space-y-2">
          {chartData.slice(-7).reverse().map((day) => {
            const isMet = day.proteina >= calculatedGoals.protein;
            return (
              <div
                key={day.date}
                onClick={() => {
                  setSelectedDate(day.date);
                  setActiveTab('diary');
                }}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{day.date} ({day.label})</h4>
                    <span className="text-[11px] text-slate-500">
                      🔥 {day.calorias} kcal • 🍚 {day.carbs}g C • 🥑 {day.gorduras}g G
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-xs font-bold block ${isMet ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {day.proteina}g proteína
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {isMet ? '¡Objetivo alcanzado! 🎉' : 'Por debajo del objetivo'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
