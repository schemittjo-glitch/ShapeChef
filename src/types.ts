export type MealCategory =
  | 'Desayuno'
  | 'Meriendas'
  | 'Almuerzo'
  | 'Cena'
  | 'Postres'
  | 'Recetas rápidas'
  | 'Airfryer'
  | 'Sartén'
  | 'Horno'
  | 'Recetas económicas'
  | 'Pollo'
  | 'Carne'
  | 'Huevos'
  | 'Pescados'
  | 'Lácteos'
  | 'Vegetal'
  | 'Whey'
  | 'Otras proteínas';

export type CookingMethod = 'Airfryer' | 'Sartén' | 'Horno' | 'Olla' | 'Sin cocción';
export type ProteinSource = 'Pollo' | 'Carne' | 'Huevos' | 'Pescados' | 'Lácteos' | 'Vegetal' | 'Whey' | 'Otras proteínas';

export interface Recipe {
  id: string;
  name: string;
  category: string; // Primary category
  categories: string[]; // Multiple tags
  prepTime: number; // in minutes
  protein: number; // in grams
  calories: number; // in kcal
  carbs: number; // in grams
  fats: number; // in grams
  fiber?: number; // in grams
  method: CookingMethod;
  proteinSource: ProteinSource;
  isEconomic?: boolean;
  isQuick?: boolean; // <= 15 min
  imageUrl: string;
  ingredients: {
    item: string;
    amount: string;
    normalizedName: string; // for fridge matching (e.g. 'pollo', 'huevo', 'queso')
  }[];
  instructions: string[];
  tips?: string;
  servings?: number;
  porcao_referencia?: string;
  quantidade_referencia?: string;
  porcoes_totais?: number;
  unidade_porcao?: string;
  shelfLife?: string;
  storageMethod?: string;
}

export type MealType = 'cafe' | 'almoco' | 'lanche' | 'jantar' | 'ceia';

export interface MealLogItem {
  id: string;
  mealType: MealType;
  name: string;
  amount: string; // e.g. "1 porción (250g)" or "100g"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  recipeId?: string;
  time?: string;
}

export interface DayLog {
  date: string; // 'YYYY-MM-DD'
  items: MealLogItem[];
}

export type FitnessGoal = 'perda_gordura' | 'ganho_massa' | 'hipertrofia' | 'manutencao';
export type ActivityLevel = 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito_intenso';
export type Gender = 'masculino' | 'feminino';

export interface DailyMacroGoal {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  weight: number; // kg
  height: number; // cm
  goal: FitnessGoal;
  activityLevel: ActivityLevel;
  customGoals?: DailyMacroGoal;
  isConfigured?: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  category: 'Carnes & Proteínas' | 'Lácteos & Huevos' | 'Frutas & Verduras' | 'Despensa & Granos' | 'Otros';
  checked: boolean;
  recipeSource?: string;
}

export interface DayMealPlan {
  dayName: string;
  meals: {
    type: string;
    recipeId: string;
    customNote?: string;
  }[];
}

export interface WeeklyMealPlan {
  id: string;
  title: string;
  goal: FitnessGoal;
  goalLabel: string;
  description: string;
  targetDailyCalories: number;
  targetDailyProtein: number;
  days: DayMealPlan[];
}

export interface BonusMaterial {
  id: string;
  title: string;
  subtitle: string;
  coverIcon: string;
  tag: string;
  description: string;
  type: 'workout' | 'macros' | 'homemade_protein';
  externalUrl?: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      table?: { headers: string[]; rows: string[][] };
      tips?: string[];
    }[];
  };
}

export interface NotificationSettings {
  mealReminders: boolean;
  proteinGoalReminder: boolean;
  recipeSuggestions: boolean;
  waterReminder: boolean;
}
