import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingItem } from '../types';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Check,
  Share2,
  Copy,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const ShoppingListView: React.FC = () => {
  const {
    shoppingList,
    addShoppingItem,
    toggleShoppingItem,
    removeShoppingItem,
    clearCheckedShoppingItems,
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1 un');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingItem['category']>('Carnes & Proteínas');
  const [copySuccess, setCopySuccess] = useState(false);

  const categories: ShoppingItem['category'][] = [
    'Carnes & Proteínas',
    'Lácteos & Huevos',
    'Frutas & Verduras',
    'Despensa & Granos',
    'Otros',
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addShoppingItem({
      name: newItemName.trim(),
      amount: newItemAmount.trim() || '1 un',
      category: newItemCategory,
    });

    setNewItemName('');
    setNewItemAmount('1 un');
  };

  const handleCopyFormattedList = () => {
    let text = '🛒 *LISTA DE COMPRAS - SHAPECHEF*\n\n';
    categories.forEach((cat) => {
      const items = shoppingList.filter((i) => i.category === cat && !i.checked);
      if (items.length > 0) {
        text += `*${cat.toUpperCase()}*\n`;
        items.forEach((it) => {
          text += `• ${it.name} (${it.amount})\n`;
        });
        text += '\n';
      }
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const totalItems = shoppingList.length;
  const checkedItems = shoppingList.filter((i) => i.checked).length;
  const uncheckedItems = totalItems - checkedItems;

  return (
    <div id="shopping-list-view" className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>🛒</span> Lista de Compras
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {uncheckedItems} pendientes • {checkedItems} comprados
          </p>
        </div>

        <div className="flex items-center gap-2">
          {checkedItems > 0 && (
            <button
              onClick={clearCheckedShoppingItems}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold transition-colors"
            >
              Limpiar comprados
            </button>
          )}

          <button
            onClick={handleCopyFormattedList}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              copySuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Lista</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Add Item Inline Form */}
      <form
        onSubmit={handleAddItem}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
      >
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Añadir Artículo Rápido
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <input
            type="text"
            required
            placeholder="Nombre del artículo (ej: Pechuga de pollo, Whey, Huevos...)"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />

          <input
            type="text"
            placeholder="Cantidad (ej: 1kg, 2 uds)"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as ShoppingItem['category'])}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer focus:bg-white transition-colors"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-white text-slate-800">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir a la Lista</span>
          </button>
        </div>
      </form>

      {/* 3. Categorized Shopping List Sections */}
      {totalItems === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto text-xl">
            🛒
          </div>
          <h3 className="text-base font-bold text-slate-800">Tu lista está vacía</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            ¡Puedes añadir ingredientes directamente desde las recetas o crear tu lista personalizada arriba!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = shoppingList.filter((i) => i.category === cat);
            if (items.length === 0) return null;

            return (
              <div
                key={cat}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {cat}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {items.filter((i) => !i.checked).length} pendientes
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleShoppingItem(item.id)}
                      className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                        item.checked
                          ? 'bg-slate-50/70 text-slate-400 line-through'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            item.checked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <span className={`text-xs font-bold ${item.checked ? 'text-slate-400' : 'text-slate-800'}`}>
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-500 ml-1.5">({item.amount})</span>
                          {item.recipeSource && (
                            <span className="text-[10px] text-emerald-700 block font-medium">
                              De: {item.recipeSource}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeShoppingItem(item.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
