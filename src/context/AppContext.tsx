import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Recipe,
  UserProfile,
  DailyMacroGoal,
  MealLogItem,
  DayLog,
  ShoppingItem,
  NotificationSettings,
  MealType,
} from '../types';
import { RECIPES_DATA } from '../data/recipes';

interface AppContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Recipes
  recipes: Recipe[];
  favorites: string[]; // recipe IDs
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (val: boolean) => void;
  openFavorites: () => void;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe: Recipe | null) => void;
  recipeFilterProteinMin: number | null;
  setRecipeFilterProteinMin: (val: number | null) => void;
  recipeSearchQuery: string;
  setRecipeSearchQuery: (query: string) => void;
  recipeActiveCategory: string;
  setRecipeActiveCategory: (category: string) => void;

  // Profile & Goals
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  calculatedGoals: DailyMacroGoal;

  // Food Diary & Logs
  selectedDate: string; // 'YYYY-MM-DD'
  setSelectedDate: (date: string) => void;
  dailyLogs: Record<string, MealLogItem[]>;
  currentDayItems: MealLogItem[];
  currentDayTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  addMealItem: (item: Omit<MealLogItem, 'id' | 'time'>, date?: string) => void;
  addRecipeToMeal: (recipe: Recipe, mealType: MealType, date?: string) => void;
  removeMealItem: (id: string, date?: string) => void;
  clearDayLogs: (date?: string) => void;

  // Shopping List
  shoppingList: ShoppingItem[];
  addShoppingItem: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
  addRecipeToShoppingList: (recipe: Recipe) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearCheckedShoppingItems: () => void;
  generateShoppingListFromMealPlan: (recipeIds: string[]) => void;

  // Notifications
  notifications: NotificationSettings;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;

  // Trigger celebratory confetti
  triggerConfetti: () => void;

  // Reset all user data
  resetAllUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to format date YYYY-MM-DD
export function getFormattedDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateMacros(profile: UserProfile): DailyMacroGoal {
  // Mifflin-St Jeor Equation
  let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
  if (profile.gender === 'masculino') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity Multipliers
  const activityMultipliers: Record<string, number> = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    muito_intenso: 1.9,
  };
  const tdee = bmr * (activityMultipliers[profile.activityLevel] || 1.4);

  let targetCalories = tdee;
  let proteinPerKg = 2.0;

  switch (profile.goal) {
    case 'perda_gordura':
      targetCalories = tdee - 500; // Caloric deficit
      proteinPerKg = 2.2; // Higher protein to spare lean mass
      break;
    case 'ganho_massa':
      targetCalories = tdee + 400; // Lean surplus
      proteinPerKg = 2.0;
      break;
    case 'hipertrofia':
      targetCalories = tdee + 250; // Performance surplus
      proteinPerKg = 2.2;
      break;
    case 'manutencao':
    default:
      targetCalories = tdee;
      proteinPerKg = 1.8;
      break;
  }

  const targetProtein = Math.round(profile.weight * proteinPerKg);
  // Fats at ~0.8g/kg
  const targetFats = Math.round(profile.weight * 0.85);
  // Remaining calories to carbs
  const caloriesFromProtAndFat = targetProtein * 4 + targetFats * 9;
  const remainingCals = Math.max(0, targetCalories - caloriesFromProtAndFat);
  const targetCarbs = Math.round(remainingCals / 4);

  return {
    calories: Math.max(1200, Math.round(targetCalories)),
    protein: targetProtein,
    carbs: targetCarbs,
    fats: targetFats,
  };
}

// Generate realistic mock history for the last 30 days
function generateInitialLogs(): Record<string, MealLogItem[]> {
  const logs: Record<string, MealLogItem[]> = {};
  const today = new Date();

  // Today's log (partially filled to match prompt example)
  const todayStr = getFormattedDate(today);
  logs[todayStr] = [
    {
      id: 'today-1',
      mealType: 'cafe',
      name: 'Omelete Turbo com Frango Desfiado e Ricota',
      amount: '1 porção',
      calories: 320,
      protein: 42,
      carbs: 4,
      fats: 15,
      time: '08:15',
    },
    {
      id: 'today-2',
      mealType: 'almoco',
      name: 'Frango à Parmegiana Fit na Airfryer',
      amount: '1 porção (200g)',
      calories: 380,
      protein: 48,
      carbs: 16,
      fats: 12,
      time: '12:40',
    },
    {
      id: 'today-3',
      mealType: 'lanche',
      name: 'Iogurte Grego com Whey de Baunilha & Frutas',
      amount: '1 taça (200g)',
      calories: 240,
      protein: 34,
      carbs: 22,
      fats: 4,
      time: '16:30',
    },
    {
      id: 'today-4',
      mealType: 'almoco',
      name: 'Porção de Arroz Integral com Feijão',
      amount: '150g',
      calories: 190,
      protein: 6,
      carbs: 38,
      fats: 2,
      time: '12:45',
    },
    {
      id: 'today-5',
      mealType: 'lanche',
      name: 'Castanhas do Pará e Nozes',
      amount: '20g',
      calories: 130,
      protein: 3,
      carbs: 3,
      fats: 12,
      time: '16:40',
    },
    {
      id: 'today-6',
      mealType: 'jantar',
      name: 'Filé de Tilápia com Lemon Pepper na Airfryer',
      amount: '1 filé grande (220g)',
      calories: 270,
      protein: 41,
      carbs: 8,
      fats: 6,
      time: '20:10',
    },
    {
      id: 'today-7',
      mealType: 'jantar',
      name: 'Brócolis e Cenoura cozidos no vapor com azeite',
      amount: '100g',
      calories: 110,
      protein: 4,
      carbs: 12,
      fats: 5,
      time: '20:15',
    }
  ];

  // Seed previous 14 days
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = getFormattedDate(d);

    const variance = (i % 5) * 4;
    logs[dateStr] = [
      {
        id: `prev-${i}-1`,
        mealType: 'cafe',
        name: 'Panqueca Proteica de Banana e Whey',
        amount: '1 porção',
        calories: 310,
        protein: 34,
        carbs: 32,
        fats: 6,
        time: '08:00',
      },
      {
        id: `prev-${i}-2`,
        mealType: 'almoco',
        name: 'Power Bowl de Carne Moída com Arroz e Legumes',
        amount: '1 bowl',
        calories: 490,
        protein: 50 + (i % 3),
        carbs: 45,
        fats: 14,
        time: '12:30',
      },
      {
        id: `prev-${i}-3`,
        mealType: 'lanche',
        name: 'Wrap Proteico de Atum Cremoso',
        amount: '1 unidade',
        calories: 290,
        protein: 38,
        carbs: 22,
        fats: 6,
        time: '16:00',
      },
      {
        id: `prev-${i}-4`,
        mealType: 'jantar',
        name: 'Strogonoff Proteico com Iogurte Grego e Batatas',
        amount: '1 prato',
        calories: 420 + variance,
        protein: 46 - (i % 2),
        carbs: 28,
        fats: 12,
        time: '20:00',
      },
    ];
  }

  return logs;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Meu Perfil',
  age: 25,
  gender: 'masculino',
  weight: 70,
  height: 175,
  goal: 'manutencao',
  activityLevel: 'moderado',
  isConfigured: false,
};

const RESET_FLAG_KEY = 'shapechef_zeroed_v4';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if we need to reset legacy mock data once
  if (typeof window !== 'undefined') {
    try {
      const isZeroed = localStorage.getItem(RESET_FLAG_KEY);
      if (isZeroed !== 'true') {
        localStorage.removeItem('shapechef_daily_logs');
        localStorage.removeItem('shapechef_shopping_list');
        localStorage.removeItem('shapechef_favorites');
        localStorage.removeItem('shapechef_profile');
        localStorage.setItem(RESET_FLAG_KEY, 'true');
      }
    } catch {
      // ignore
    }
  }

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');

  // Recipes & Filters (Full recipe catalog maintained intact)
  const [recipes] = useState<Recipe[]>(RECIPES_DATA);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shapechef_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [recipeFilterProteinMin, setRecipeFilterProteinMin] = useState<number | null>(null);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');
  const [recipeActiveCategory, setRecipeActiveCategory] = useState<string>('Todos');

  const openFavorites = () => {
    setShowOnlyFavorites(true);
    setRecipeActiveCategory('Todos');
    setActiveTab('recipes');
  };

  // Profile - zeroed/default clean baseline
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('shapechef_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const calculatedGoals = userProfile.customGoals || calculateMacros(userProfile);

  // Diary Logs - zeroed initial logs (empty)
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate());
  const [dailyLogs, setDailyLogs] = useState<Record<string, MealLogItem[]>>(() => {
    try {
      const saved = localStorage.getItem('shapechef_daily_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Shopping List - zeroed initial list (empty)
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    try {
      const saved = localStorage.getItem('shapechef_shopping_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem('shapechef_notifications');
      return saved
        ? JSON.parse(saved)
        : {
            mealReminders: true,
            proteinGoalReminder: true,
            recipeSuggestions: true,
            waterReminder: false,
          };
    } catch {
      return {
        mealReminders: true,
        proteinGoalReminder: true,
        recipeSuggestions: true,
        waterReminder: false,
      };
    }
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('shapechef_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('shapechef_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('shapechef_daily_logs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  useEffect(() => {
    localStorage.setItem('shapechef_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('shapechef_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Current day items
  const currentDayItems = dailyLogs[selectedDate] || [];

  const currentDayTotals = currentDayItems.reduce(
    (acc, item) => ({
      calories: acc.calories + (item.calories || 0),
      protein: acc.protein + (item.protein || 0),
      carbs: acc.carbs + (item.carbs || 0),
      fats: acc.fats + (item.fats || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      Array.isArray(prev) ? (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]) : [id]
    );
  };

  const isFavorite = (id: string) => Array.isArray(favorites) && favorites.includes(id);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...profile,
      isConfigured: profile.isConfigured !== undefined ? profile.isConfigured : true,
    }));
  };

  const updateNotifications = (settings: Partial<NotificationSettings>) => {
    setNotifications((prev) => ({ ...prev, ...settings }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const addMealItem = (item: Omit<MealLogItem, 'id' | 'time'>, date: string = selectedDate) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newItem: MealLogItem = {
      ...item,
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      time: timeStr,
    };

    setDailyLogs((prev) => {
      const dayList = prev[date] ? [...prev[date], newItem] : [newItem];
      return { ...prev, [date]: dayList };
    });

    // Check if goal was just reached today
    const currentProtein = currentDayTotals.protein;
    if (date === getFormattedDate() && currentProtein < calculatedGoals.protein && currentProtein + item.protein >= calculatedGoals.protein) {
      triggerConfetti();
    }
  };

  const addRecipeToMeal = (recipe: Recipe, mealType: MealType, date: string = selectedDate) => {
    addMealItem(
      {
        mealType,
        name: recipe.name,
        amount: '1 porção',
        calories: recipe.calories,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fats: recipe.fats,
        recipeId: recipe.id,
      },
      date
    );
  };

  const removeMealItem = (id: string, date: string = selectedDate) => {
    setDailyLogs((prev) => {
      const dayList = prev[date] || [];
      return {
        ...prev,
        [date]: dayList.filter((item) => item.id !== id),
      };
    });
  };

  const clearDayLogs = (date: string = selectedDate) => {
    setDailyLogs((prev) => ({
      ...prev,
      [date]: [],
    }));
  };

  const addShoppingItem = (item: Omit<ShoppingItem, 'id' | 'checked'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: 'shop-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      checked: false,
    };
    setShoppingList((prev) => [newItem, ...prev]);
  };

  const addRecipeToShoppingList = (recipe: Recipe) => {
    if (!recipe || !recipe.ingredients) return;
    const newItems: ShoppingItem[] = recipe.ingredients.map((ing) => {
      let category: ShoppingItem['category'] = 'Mercearia & Grãos';
      const norm = (ing.normalizedName || ing.item || '').toLowerCase();
      if (norm.includes('frango') || norm.includes('carne') || norm.includes('peixe') || norm.includes('atum') || norm.includes('salmao')) {
        category = 'Carnes & Proteínas';
      } else if (norm.includes('ovo') || norm.includes('queijo') || norm.includes('iogurte') || norm.includes('leite')) {
        category = 'Laticínios & Ovos';
      } else if (norm.includes('tomate') || norm.includes('banana') || norm.includes('brocolis') || norm.includes('batata') || norm.includes('morango') || norm.includes('limao') || norm.includes('salada')) {
        category = 'Hortifruti';
      }

      return {
        id: 'shop-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5) + '-' + Math.random().toString(36).substr(2, 3),
        name: ing.item,
        amount: ing.amount,
        category,
        checked: false,
        recipeSource: recipe.name,
      };
    });

    setShoppingList((prev) => [...newItems, ...(prev || [])]);
  };

  const generateShoppingListFromMealPlan = (recipeIds: string[]) => {
    if (!Array.isArray(recipeIds)) return;
    const matchedRecipes = recipes.filter((r) => recipeIds.includes(r.id));
    matchedRecipes.forEach((r) => addRecipeToShoppingList(r));
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCheckedShoppingItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const resetAllUserData = () => {
    setDailyLogs({});
    setShoppingList([]);
    setFavorites([]);
    setUserProfile(DEFAULT_USER_PROFILE);
    try {
      localStorage.removeItem('shapechef_daily_logs');
      localStorage.removeItem('shapechef_shopping_list');
      localStorage.removeItem('shapechef_favorites');
      localStorage.removeItem('shapechef_profile');
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        recipes,
        favorites,
        toggleFavorite,
        isFavorite,
        showOnlyFavorites,
        setShowOnlyFavorites,
        openFavorites,
        selectedRecipe,
        setSelectedRecipe,
        recipeFilterProteinMin,
        setRecipeFilterProteinMin,
        recipeSearchQuery,
        setRecipeSearchQuery,
        recipeActiveCategory,
        setRecipeActiveCategory,
        userProfile,
        updateUserProfile,
        calculatedGoals,
        selectedDate,
        setSelectedDate,
        dailyLogs,
        currentDayItems,
        currentDayTotals,
        addMealItem,
        addRecipeToMeal,
        removeMealItem,
        clearDayLogs,
        shoppingList,
        addShoppingItem,
        addRecipeToShoppingList,
        toggleShoppingItem,
        removeShoppingItem,
        clearCheckedShoppingItems,
        generateShoppingListFromMealPlan,
        notifications,
        updateNotifications,
        triggerConfetti,
        resetAllUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
