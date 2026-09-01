import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BONUS_MATERIALS_DATA } from '../data/bonusMaterials';
import { BonusMaterial } from '../types';
import {
  Gift,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Table as TableIcon,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const BonusHubView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedBonus, setSelectedBonus] = useState<BonusMaterial | null>(null);

  const handleBonusClick = (bonus: BonusMaterial) => {
    if (bonus.externalUrl) {
      window.open(bonus.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedBonus(bonus);
    }
  };

  if (selectedBonus) {
    return (
      <div id="bonus-reader-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
        {/* Back button & Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setSelectedBonus(null)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a los Bonos</span>
          </button>

          <div className="flex items-center gap-2">
            {selectedBonus.externalUrl && (
              <a
                href={selectedBonus.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors"
              >
                <span>Acceder al Enlace Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {selectedBonus.tag}
            </span>
          </div>
        </div>

        {/* Bonus Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{selectedBonus.coverIcon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Material Exclusivo
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">{selectedBonus.title}</h1>
            <p className="text-xs sm:text-sm text-slate-500">{selectedBonus.subtitle}</p>
            {selectedBonus.content.intro && (
              <p className="text-xs sm:text-sm text-slate-600 italic pt-2 border-t border-slate-100">
                "{selectedBonus.content.intro}"
              </p>
            )}
          </div>

          {/* Sections List */}
          <div className="space-y-6">
            {selectedBonus.content.sections.map((sec, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{sec.heading}</span>
                </h3>

                {sec.subheading && (
                  <p className="text-xs text-emerald-700 font-bold">{sec.subheading}</p>
                )}

                <div className="space-y-2">
                  {sec.body.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Table rendering if exists */}
                {sec.table && (
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-200">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tips block */}
                {sec.tips && sec.tips.length > 0 && (
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2 pt-3">
                    <span className="text-[11px] font-bold text-emerald-900 block uppercase tracking-wider">
                      💡 Consejos Prácticos del Especialista
                    </span>
                    {sec.tips.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* External link CTA if exists */}
          {selectedBonus.externalUrl && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Accede al Material Completo</h4>
                <p className="text-xs text-emerald-700">
                  Haz clic en el botón para abrir el archivo y contenido original.
                </p>
              </div>
              <a
                href={selectedBonus.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 whitespace-nowrap transition-colors flex items-center gap-2"
              >
                <span>Acceder al Enlace Externo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Action button if macro guide */}
          {selectedBonus.type === 'macros' && (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900">¿Listo para aplicar tus macros?</h4>
                <p className="text-xs text-emerald-700">
                  Abre nuestra calculadora integrada para definir tu plan exacto en 1 clic.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('profile')}
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                Abrir Mi Calculadora
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="bonus-hub-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <Gift className="w-5 h-5 text-emerald-600" />
          <span>Área de Bonos ShapeChef</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Materiales y Guías Exclusivas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Accede a fichas de entrenamiento estructuradas, guías avanzadas de macronutrientes y técnicas para alcanzar tu objetivo de proteína con el máximo ahorro.
        </p>
      </div>

      {/* Bonus Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BONUS_MATERIALS_DATA.map((bonus) => (
          <div
            key={bonus.id}
            id={`card-${bonus.id}`}
            onClick={() => handleBonusClick(bonus)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-6 shadow-sm hover:shadow-md cursor-pointer group transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                  {bonus.coverIcon}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  {bonus.externalUrl && <ExternalLink className="w-3 h-3 text-emerald-600" />}
                  {bonus.tag}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors flex items-center justify-between gap-1">
                  <span>{bonus.title}</span>
                  {bonus.externalUrl && (
                    <ExternalLink className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  )}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{bonus.subtitle}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{bonus.externalUrl ? 'Abrir Material' : 'Leer Guía Completa'}</span>
              {bonus.externalUrl ? (
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

