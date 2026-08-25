export type MealCategory =
  | 'Café da manhã'
  | 'Lanches'
  | 'Almoço'
  | 'Jantar'
  | 'Sobremesas'
  | 'Receitas rápidas'
  | 'Airfryer'
  | 'Frigideira'
  | 'Forno'
  | 'Receitas econômicas'
  | 'Frango'
  | 'Carne'
  | 'Ovos'
  | 'Peixes'
  | 'Outras proteínas';

export type CookingMethod = 'Airfryer' | 'Frigideira' | 'Forno' | 'Panela' | 'Sem cozimento';
export type ProteinSource = 'Frango' | 'Carne' | 'Ovos' | 'Peixes' | 'Peixe' | 'Laticínios' | 'Vegetal' | 'Whey' | 'Outras proteínas';

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
    normalizedName: string; // for fridge matching (e.g. 'frango', 'ovo', 'queijo')
  }[];
  instructions: string[];
  tips?: string;
  servings?: number;
}

export type MealType = 'cafe' | 'almoco' | 'lanche' | 'jantar' | 'ceia';

export interface MealLogItem {
  id: string;
  mealType: MealType;
  name: string;
  amount: string; // e.g. "1 porção (250g)" or "100g"
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
  category: 'Carnes & Proteínas' | 'Laticínios & Ovos' | 'Hortifruti' | 'Mercearia & Grãos' | 'Outros';
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
