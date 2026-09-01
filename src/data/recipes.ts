import { Recipe } from '../types';
import { CAFE_RECIPES } from './recipes/cafe';
import { ALMOCO_RECIPES } from './recipes/almoco';
import { SOBREMESAS_RECIPES } from './recipes/sobremesas';

export const RECIPES_DATA: Recipe[] = [
  ...CAFE_RECIPES,
  ...ALMOCO_RECIPES,
  ...SOBREMESAS_RECIPES,
];

export const CATEGORIES_LIST = [
  'Todos',
  'Desayuno',
  'Almuerzo',
  'Postres',
  'Meriendas',
  'Cena',
  'Recetas rápidas',
  'Airfryer',
  'Sartén',
  'Horno',
  'Olla',
  'Sin cocción',
  'Pollo',
  'Carne',
  'Pescados',
  'Huevos',
  'Whey',
  'Lácteos',
  'Vegetal',
];

