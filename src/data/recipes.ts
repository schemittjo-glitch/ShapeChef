import { Recipe } from '../types';
import { CAFE_LANCHES_RECIPES } from './recipes/cafeLanches';
import { SUCOS_DETOX_RECIPES } from './recipes/sucosDetox';
import { FRANGO_RECIPES } from './recipes/frango';
import { CARNES_RECIPES } from './recipes/carnes';
import { PEIXES_RECIPES } from './recipes/peixes';
import { VEGETARIANAS_RECIPES } from './recipes/vegetarianas';
import { DOCES_SOBREMESAS_RECIPES } from './recipes/docesSobremesas';

export const RECIPES_DATA: Recipe[] = [
  ...CAFE_LANCHES_RECIPES,
  ...SUCOS_DETOX_RECIPES,
  ...FRANGO_RECIPES,
  ...CARNES_RECIPES,
  ...PEIXES_RECIPES,
  ...VEGETARIANAS_RECIPES,
  ...DOCES_SOBREMESAS_RECIPES,
];

export const CATEGORIES_LIST = [
  'Todos',
  'Café da manhã',
  'Lanches',
  'Almoço',
  'Jantar',
  'Sobremesas',
  'Receitas rápidas',
  'Airfryer',
  'Frigideira',
  'Forno',
  'Panela',
  'Sem cozimento',
  'Frango',
  'Carne',
  'Peixe',
  'Ovos',
  'Whey',
  'Vegetal',
];
