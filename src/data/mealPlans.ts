import { WeeklyMealPlan } from '../types';

export const MEAL_PLANS_DATA: WeeklyMealPlan[] = [
  {
    id: 'perda-gordura',
    title: 'Definição & Perda de Gordura',
    goal: 'perda_gordura',
    goalLabel: '🔥 Perda de Gordura',
    description: 'Cardápio planejado para déficit calórico controlado com alta saciedade e preservação de massa magra.',
    targetDailyCalories: 1750,
    targetDailyProtein: 165,
    days: [
      {
        dayName: 'Segunda-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'omelete-espinafre-queijo', customNote: 'Omelete de Espinafre e Queijo' },
          { type: 'Almoço', recipeId: 'frango-espinafre-cottage', customNote: 'Frango Grelhado com Espinafre e Cottage' },
          { type: 'Lanche da tarde', recipeId: 'turbo-verde-tropical', customNote: 'Suco Turbo Verde Tropical & Chia' },
          { type: 'Jantar', recipeId: 'tilapia-grelhada-legumes-vapor', customNote: 'Tilápia Grelhada com Legumes no Vapor' },
        ],
      },
      {
        dayName: 'Terça-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'panqueca-aveia-banana-canela', customNote: 'Panqueca de Aveia, Banana e Canela' },
          { type: 'Almoço', recipeId: 'carne-cheddar-brocolis', customNote: 'Carne com Brócolis e Cheddar' },
          { type: 'Lanche da tarde', recipeId: 'smoothie-morango-chia', customNote: 'Smoothie de Morango e Chia' },
          { type: 'Jantar', recipeId: 'omelete-forno-frango-brocolis', customNote: 'Omelete de Forno com Frango e Brócolis' },
        ],
      },
      {
        dayName: 'Quarta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'pao-queijo-fit-aveia', customNote: 'Pão de Queijo Fit com Aveia' },
          { type: 'Almoço', recipeId: 'frango-teriyaki-legumes', customNote: 'Frango Teriyaki com Legumes' },
          { type: 'Lanche da tarde', recipeId: 'crepioca-frango', customNote: 'Crepioca Recheada com Frango' },
          { type: 'Jantar', recipeId: 'salmao-crosta-gergelim', customNote: 'Salmão com Crosta de Gergelim' },
        ],
      },
      {
        dayName: 'Quinta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'mingau-aveia-cacau-pasta-amendoim', customNote: 'Mingau de Aveia com Cacau e Pasta de Amendoim' },
          { type: 'Almoço', recipeId: 'frango-xadrez-proteico', customNote: 'Frango Xadrez Proteico' },
          { type: 'Lanche da tarde', recipeId: 'sanduiche-natural-atum', customNote: 'Sanduíche Natural de Atum' },
          { type: 'Jantar', recipeId: 'almondegas-carne-molho-tomate', customNote: 'Almôndegas de Carne com Molho de Tomate' },
        ],
      },
      {
        dayName: 'Sexta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'torrada-integral-abacate-ovo', customNote: 'Torrada Integral com Abacate e Ovo Poché' },
          { type: 'Almoço', recipeId: 'hamburguer-frango-aveia', customNote: 'Hambúrguer de Frango com Aveia' },
          { type: 'Lanche da tarde', recipeId: 'bolo-caneca-cacau-fit', customNote: 'Bolo de Caneca de Cacau Fit' },
          { type: 'Jantar', recipeId: 'hamburguer-proteico-carne-aveia', customNote: 'Hambúrguer Proteico de Carne com Aveia' },
        ],
      },
      {
        dayName: 'Sábado',
        meals: [
          { type: 'Café da manhã', recipeId: 'panqueca-proteica-whey', customNote: 'Panqueca Proteica de Whey' },
          { type: 'Almoço', recipeId: 'frango-parmesao-fit', customNote: 'Frango Parmesão Fit' },
          { type: 'Lanche da tarde', recipeId: 'mousse-maracuja-whey', customNote: 'Mousse de Maracujá com Whey' },
          { type: 'Jantar', recipeId: 'ceviche-tilapia-abacate', customNote: 'Ceviche de Tilápia com Abacate' },
        ],
      },
      {
        dayName: 'Domingo',
        meals: [
          { type: 'Café da manhã', recipeId: 'waffle-fit-aveia', customNote: 'Waffle Fit de Aveia' },
          { type: 'Almoço', recipeId: 'escondidinho-frango-batata-doce', customNote: 'Escondidinho de Frango com Batata Doce' },
          { type: 'Lanche da tarde', recipeId: 'brigadeiro-maromba-whey', customNote: 'Brigadeiro Maromba de Whey' },
          { type: 'Jantar', recipeId: 'sopa-proteica-frango-legumes', customNote: 'Sopa Proteica de Frango com Legumes' },
        ],
      },
    ],
  },
  {
    id: 'hipertrofia',
    title: 'Hipertrofia & Construção Muscular',
    goal: 'hipertrofia',
    goalLabel: '🏋️ Hipertrofia',
    description: 'Foco em síntese proteica máxima com carboidratos estratégicos para suportar treinos intensos e recuperação muscular.',
    targetDailyCalories: 2450,
    targetDailyProtein: 195,
    days: [
      {
        dayName: 'Segunda-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'shake-proteico-banana-amendoim', customNote: 'Shake Proteico de Banana e Pasta de Amendoim' },
          { type: 'Almoço', recipeId: 'rocambole-recheado-proteico', customNote: 'Rocambole Recheado Proteico' },
          { type: 'Lanche da tarde', recipeId: 'salgado-maromba-frango-batata-doce', customNote: 'Salgado Maromba de Frango e Batata Doce' },
          { type: 'Jantar', recipeId: 'espetinho-frango-picante', customNote: 'Espetinho de Frango Picante com Arroz' },
        ],
      },
      {
        dayName: 'Terça-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'overnight-oats-frutas-vermelhas', customNote: 'Overnight Oats com Frutas Vermelhas' },
          { type: 'Almoço', recipeId: 'frango-curry-leite-coco', customNote: 'Frango ao Curry com Leite de Coco' },
          { type: 'Lanche da tarde', recipeId: 'smoothie-acai-whey-banana', customNote: 'Smoothie de Açaí com Whey e Banana' },
          { type: 'Jantar', recipeId: 'lasanha-explosiva-proteina', customNote: 'Lasanha Explosiva de Proteína' },
        ],
      },
      {
        dayName: 'Quarta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'tapioca-recheada-ovo-queijo', customNote: 'Tapioca Recheada com Ovo e Queijo Minas' },
          { type: 'Almoço', recipeId: 'picanha-panela-couve-flor-gratinada', customNote: 'Picanha de Panela com Couve-Flor Gratinada' },
          { type: 'Lanche da tarde', recipeId: 'mousse-chocolate-abacate-whey', customNote: 'Mousse de Chocolate com Whey' },
          { type: 'Jantar', recipeId: 'alcatra-desfiada-pure-mandioca', customNote: 'Alcatra Desfiada com Purê de Mandioca' },
        ],
      },
      {
        dayName: 'Quinta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'paozinho-frigideira-iogurte', customNote: 'Pãozinho de Frigideira com Iogurte' },
          { type: 'Almoço', recipeId: 'frango-anabolico-mexicano', customNote: 'Frango Anabólico Mexicano' },
          { type: 'Lanche da tarde', recipeId: 'barra-cereal-caseira-proteica', customNote: 'Barra de Cereal Caseira Proteica' },
          { type: 'Jantar', recipeId: 'costela-desossada-mandioca-crocante', customNote: 'Costela Desossada com Mandioca Crocante' },
        ],
      },
      {
        dayName: 'Sexta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'panqueca-proteica-whey', customNote: 'Panqueca Proteica de Whey' },
          { type: 'Almoço', recipeId: 'frango-molho-amendoim-light', customNote: 'Frango no Molho de Amendoim Light' },
          { type: 'Lanche da tarde', recipeId: 'sanduiche-pasta-frango-cenoura', customNote: 'Sanduíche de Pasta de Frango e Cenoura' },
          { type: 'Jantar', recipeId: 'salmao-grelhado-pure-couve-flor', customNote: 'Salmão Grelhado com Purê de Couve-Flor' },
        ],
      },
      {
        dayName: 'Sábado',
        meals: [
          { type: 'Café da manhã', recipeId: 'omelete-cogumelos-espinafre', customNote: 'Omelete de Cogumelos e Espinafre' },
          { type: 'Almoço', recipeId: 'bife-acebolado-pimentao-arroz', customNote: 'Bife Acebolado com Pimentão e Arroz' },
          { type: 'Lanche da tarde', recipeId: 'shake-cafe-proteico-termogenico', customNote: 'Shake de Café Proteico Termogênico' },
          { type: 'Jantar', recipeId: 'musculo-molho-madeira-couve-flor', customNote: 'Músculo ao Molho Madeira' },
        ],
      },
      {
        dayName: 'Domingo',
        meals: [
          { type: 'Café da manhã', recipeId: 'pao-queijo-cottage-frigideira', customNote: 'Pão de Queijo de Cottage' },
          { type: 'Almoço', recipeId: 'frango-assado-mostarda', customNote: 'Frango Assado na Mostarda' },
          { type: 'Lanche da tarde', recipeId: 'doce-leite-whey-fit', customNote: 'Doce de Leite com Whey Fit' },
          { type: 'Jantar', recipeId: 'moqueca-fit-peixe-camarao', customNote: 'Moqueca Fit de Peixe e Camarão' },
        ],
      },
    ],
  },
  {
    id: 'ganho-massa',
    title: 'Ganho de Massa Limpa (Bulking Limpo)',
    goal: 'ganho_massa',
    goalLabel: '💪 Ganho de Massa',
    description: 'Superávit calórico controlado com fontes nobres de nutrientes, promovendo ganho de volume muscular com mínimo acúmulo de gordura.',
    targetDailyCalories: 2650,
    targetDailyProtein: 185,
    days: [
      {
        dayName: 'Segunda-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'vitamina-abacate-cacau', customNote: 'Vitamina de Abacate com Cacau' },
          { type: 'Almoço', recipeId: 'creme-milho-carne-panela', customNote: 'Creme de Milho com Carne de Panela' },
          { type: 'Lanche da tarde', recipeId: 'crepioca-doce-banana-canela', customNote: 'Crepioca Doce de Banana e Canela' },
          { type: 'Jantar', recipeId: 'carne-de-sol-macaxeira-cremosa', customNote: 'Carne de Sol Desfiada com Macaxeira' },
        ],
      },
      {
        dayName: 'Terça-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'panqueca-maca-canela', customNote: 'Panqueca de Maçã com Canela' },
          { type: 'Almoço', recipeId: 'panqueca-carne-batata-doce', customNote: 'Panqueca de Carne com Batata Doce' },
          { type: 'Lanche da tarde', recipeId: 'bolo-cenoura-fit-cacau', customNote: 'Bolo de Cenoura Fit com Calda de Cacau' },
          { type: 'Jantar', recipeId: 'bife-milanesa-crocante', customNote: 'Bife à Milanesa Crocante com Arroz' },
        ],
      },
      {
        dayName: 'Quarta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'shake-frutas-vermelhas-chia', customNote: 'Shake de Frutas Vermelhas com Chia' },
          { type: 'Almoço', recipeId: 'peito-frango-espinafre-ricota', customNote: 'Peito de Frango Recheado com Espinafre' },
          { type: 'Lanche da tarde', recipeId: 'beijinho-proteico-coco-whey', customNote: 'Beijinho Proteico de Coco' },
          { type: 'Jantar', recipeId: 'bacalhau-forno-legumes', customNote: 'Bacalhau de Forno com Legumes' },
        ],
      },
      {
        dayName: 'Quinta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'pao-queijo-batata-doce', customNote: 'Pão de Queijo com Batata Doce' },
          { type: 'Almoço', recipeId: 'rocambole-recheado-proteico', customNote: 'Rocambole Recheado Proteico' },
          { type: 'Lanche da tarde', recipeId: 'smoothie-acai-whey-banana', customNote: 'Smoothie de Açaí com Whey e Banana' },
          { type: 'Jantar', recipeId: 'costela-desossada-mandioca-crocante', customNote: 'Costela Desossada com Mandioca Crocante' },
        ],
      },
      {
        dayName: 'Sexta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'shake-proteico-banana-amendoim', customNote: 'Shake Proteico de Banana e Pasta de Amendoim' },
          { type: 'Almoço', recipeId: 'frango-anabolico-mexicano', customNote: 'Frango Anabólico Mexicano' },
          { type: 'Lanche da tarde', recipeId: 'salgado-maromba-frango-batata-doce', customNote: 'Salgado Maromba de Frango e Batata Doce' },
          { type: 'Jantar', recipeId: 'lasanha-explosiva-proteina', customNote: 'Lasanha Explosiva de Proteína' },
        ],
      },
      {
        dayName: 'Sábado',
        meals: [
          { type: 'Café da manhã', recipeId: 'overnight-oats-frutas-vermelhas', customNote: 'Overnight Oats com Frutas Vermelhas' },
          { type: 'Almoço', recipeId: 'picanha-panela-couve-flor-gratinada', customNote: 'Picanha de Panela com Couve-Flor Gratinada' },
          { type: 'Lanche da tarde', recipeId: 'doce-leite-whey-fit', customNote: 'Doce de Leite com Whey Fit' },
          { type: 'Jantar', recipeId: 'alcatra-desfiada-pure-mandioca', customNote: 'Alcatra Desfiada com Purê de Mandioca' },
        ],
      },
      {
        dayName: 'Domingo',
        meals: [
          { type: 'Café da manhã', recipeId: 'waffle-fit-aveia', customNote: 'Waffle Fit de Aveia' },
          { type: 'Almoço', recipeId: 'frango-curry-leite-coco', customNote: 'Frango ao Curry com Leite de Coco' },
          { type: 'Lanche da tarde', recipeId: 'brigadeiro-maromba-whey', customNote: 'Brigadeiro Maromba de Whey' },
          { type: 'Jantar', recipeId: 'moqueca-fit-peixe-camarao', customNote: 'Moqueca Fit de Peixe e Camarão' },
        ],
      },
    ],
  },
  {
    id: 'manutencao',
    title: 'Manutenção & Longevidade',
    goal: 'manutencao',
    goalLabel: '⚖️ Manutenção',
    description: 'Equilíbrio ideal de macronutrientes para manter a composição corporal e disposição durante a rotina diária.',
    targetDailyCalories: 2150,
    targetDailyProtein: 160,
    days: [
      {
        dayName: 'Segunda-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'pao-queijo-batata-doce', customNote: 'Pão de Queijo com Batata Doce' },
          { type: 'Almoço', recipeId: 'iscas-alcatra-shoyu-legumes', customNote: 'Iscas de Alcatra ao Shoyu com Legumes' },
          { type: 'Lanche da tarde', recipeId: 'pudim-chia-cacau-morango', customNote: 'Pudim de Chia com Cacau e Morangos' },
          { type: 'Jantar', recipeId: 'atum-selado-gergelim', customNote: 'Atum Selado com Gergelim' },
        ],
      },
      {
        dayName: 'Terça-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'omelete-espinafre-queijo', customNote: 'Omelete de Espinafre e Queijo' },
          { type: 'Almoço', recipeId: 'frango-teriyaki-legumes', customNote: 'Frango Teriyaki com Legumes' },
          { type: 'Lanche da tarde', recipeId: 'smoothie-morango-chia', customNote: 'Smoothie de Morango e Chia' },
          { type: 'Jantar', recipeId: 'salmao-crosta-gergelim', customNote: 'Salmão com Crosta de Gergelim' },
        ],
      },
      {
        dayName: 'Quarta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'panqueca-aveia-banana-canela', customNote: 'Panqueca de Aveia, Banana e Canela' },
          { type: 'Almoço', recipeId: 'carne-cheddar-brocolis', customNote: 'Carne com Brócolis e Cheddar' },
          { type: 'Lanche da tarde', recipeId: 'sanduiche-natural-atum', customNote: 'Sanduíche Natural de Atum' },
          { type: 'Jantar', recipeId: 'tilapia-grelhada-legumes-vapor', customNote: 'Tilápia Grelhada com Legumes no Vapor' },
        ],
      },
      {
        dayName: 'Quinta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'torrada-integral-abacate-ovo', customNote: 'Torrada Integral com Abacate e Ovo Poché' },
          { type: 'Almoço', recipeId: 'frango-xadrez-proteico', customNote: 'Frango Xadrez Proteico' },
          { type: 'Lanche da tarde', recipeId: 'bolo-caneca-cacau-fit', customNote: 'Bolo de Caneca de Cacau Fit' },
          { type: 'Jantar', recipeId: 'almondegas-carne-molho-tomate', customNote: 'Almôndegas de Carne com Molho de Tomate' },
        ],
      },
      {
        dayName: 'Sexta-feira',
        meals: [
          { type: 'Café da manhã', recipeId: 'mingau-aveia-cacau-pasta-amendoim', customNote: 'Mingau de Aveia com Cacau e Pasta de Amendoim' },
          { type: 'Almoço', recipeId: 'hamburguer-frango-aveia', customNote: 'Hambúrguer de Frango com Aveia' },
          { type: 'Lanche da tarde', recipeId: 'crepioca-frango', customNote: 'Crepioca Recheada com Frango' },
          { type: 'Jantar', recipeId: 'salmao-grelhado-pure-couve-flor', customNote: 'Salmão Grelhado com Purê de Couve-Flor' },
        ],
      },
      {
        dayName: 'Sábado',
        meals: [
          { type: 'Café da manhã', recipeId: 'pao-queijo-fit-aveia', customNote: 'Pão de Queijo Fit com Aveia' },
          { type: 'Almoço', recipeId: 'bife-acebolado-pimentao-arroz', customNote: 'Bife Acebolado com Pimentão e Arroz' },
          { type: 'Lanche da tarde', recipeId: 'mousse-maracuja-whey', customNote: 'Mousse de Maracujá com Whey' },
          { type: 'Jantar', recipeId: 'ceviche-tilapia-abacate', customNote: 'Ceviche de Tilápia com Abacate' },
        ],
      },
      {
        dayName: 'Domingo',
        meals: [
          { type: 'Café da manhã', recipeId: 'waffle-fit-aveia', customNote: 'Waffle Fit de Aveia' },
          { type: 'Almoço', recipeId: 'escondidinho-frango-batata-doce', customNote: 'Escondidinho de Frango com Batata Doce' },
          { type: 'Lanche da tarde', recipeId: 'mousse-chocolate-abacate-whey', customNote: 'Mousse de Chocolate com Whey' },
          { type: 'Jantar', recipeId: 'sopa-proteica-frango-legumes', customNote: 'Sopa Proteica de Frango com Legumes' },
        ],
      },
    ],
  },
];
