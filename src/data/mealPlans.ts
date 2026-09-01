import { WeeklyMealPlan } from '../types';

export const MEAL_PLANS_DATA: WeeklyMealPlan[] = [
  {
    "id": "perda-gordura",
    "title": "Definición & Pérdida de Grasa",
    "goal": "perda_gordura",
    "goalLabel": "🔥 Pérdida de Grasa",
    "description": "Menú planificado para déficit calórico controlado con alta saciedad y preservación de masa muscular magra.",
    "targetDailyCalories": 1750,
    "targetDailyProtein": 165,
    "days": [
      {
        "dayName": "Lunes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-1",
            "customNote": "Panqueque Americano de plátano"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-1",
            "customNote": "Rollo de Carne / Pollo Relleno Proteico"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-1",
            "customNote": "Mousse de chocolate Choco-Fit"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-8",
            "customNote": "Fricassê Saudável"
          }
        ]
      },
      {
        "dayName": "Martes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-2",
            "customNote": "Pan de queso de sartén"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-2",
            "customNote": "Lasaña Explosiva de Proteína"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-12",
            "customNote": "Panzinho Turbo"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-9",
            "customNote": "Panqueque Integral Rellena"
          }
        ]
      },
      {
        "dayName": "Miércoles",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-3",
            "customNote": "Pan de queso Power"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-3",
            "customNote": "Lasaña de pollo Proteica"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-3",
            "customNote": "Danoninho Caseiro Fit"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-10",
            "customNote": "pollo ao Molho Rústico e queso Light"
          }
        ]
      },
      {
        "dayName": "Jueves",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-4",
            "customNote": "Toast Canoa de pollo"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-4",
            "customNote": "Bife à Milanesa Crocante"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-14",
            "customNote": "Burger Monstro Proteico"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-11",
            "customNote": "arroz Cremoso com pollo e tomate"
          }
        ]
      },
      {
        "dayName": "Viernes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-5",
            "customNote": "Tortilla / Omelette de Legumes Proteico"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-5",
            "customNote": "Guiso / Moqueca de Pescado de Peixe Turbo"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-5",
            "customNote": "Creme de Papaia com yogur"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-12",
            "customNote": "Pastel Gratinado de pollo com Abóbora e Bateta"
          }
        ]
      },
      {
        "dayName": "Sábado",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-6",
            "customNote": "yogur Proteico Real"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-6",
            "customNote": "Creme de Milho com carne de Panela"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-16",
            "customNote": "Croqueta / Coxinha Fit Turbo"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-13",
            "customNote": "Fusilli de pollo e Legumes ao Tzatziki"
          }
        ]
      },
      {
        "dayName": "Domingo",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-7",
            "customNote": "Wrap de Couve com carne picada"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-7",
            "customNote": "Macarrão Cremoso com pollo ao Creme de Milho"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-7",
            "customNote": "Creme de aguacate com cacao"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-14",
            "customNote": "Macarrão ao Creme de Cheddar e pollo"
          }
        ]
      }
    ]
  },
  {
    "id": "hipertrofia",
    "title": "Hipertrofia & Construcción Muscular",
    "goal": "hipertrofia",
    "goalLabel": "🏋️ Hipertrofia",
    "description": "Enfoque en máxima síntesis proteica con carbohidratos estratégicos para entrenamientos intensos y recuperación.",
    "targetDailyCalories": 2450,
    "targetDailyProtein": 195,
    "days": [
      {
        "dayName": "Lunes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-8",
            "customNote": "Bolinha Turbinada Proteica"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-15",
            "customNote": "Penne Proteico com carne e Vegetais"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-8",
            "customNote": "Flan de vainilla"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-22",
            "customNote": "Hamburguesa de carne magra com Berinjela"
          }
        ]
      },
      {
        "dayName": "Martes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-9",
            "customNote": "Pan de pollo"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-16",
            "customNote": "pollo Mediterrâneo com Legumes e Tzatziki"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-19",
            "customNote": "Nuggets de pollo Caseiro"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-23",
            "customNote": "Músculo ao Molho Madeira com Purê de Couve-Flor"
          }
        ]
      },
      {
        "dayName": "Miércoles",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-10",
            "customNote": "Pan de Lentilha"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-17",
            "customNote": "pollo à Moda Toscana com Batetas Rústicas"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-10",
            "customNote": "crema de ricota Doce"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-24",
            "customNote": "carne de Sol Desfiada com Macaxeira Cremosa"
          }
        ]
      },
      {
        "dayName": "Jueves",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-11",
            "customNote": "Pan de Nuvem"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-18",
            "customNote": "pollo Glaceado BBQ e Mel com Batetas Crocantes"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-21",
            "customNote": "Salgado de Maromba"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-25",
            "customNote": "Albóndigas de carne magra ao Sugo Proteico"
          }
        ]
      },
      {
        "dayName": "Viernes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-12",
            "customNote": "Panzinho Turbo"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-19",
            "customNote": "Alcatra Desfiada com Purê de Mandioca Dourado"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-12",
            "customNote": "Cheesecake de fresa no vaso"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-26",
            "customNote": "Bife Acebollado com Pimentão e arroz"
          }
        ]
      },
      {
        "dayName": "Sábado",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-13",
            "customNote": "Patê de atún Proteico"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-20",
            "customNote": "Bife Rolê Relleno com espinacas e Cottage"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-23",
            "customNote": "Misto Quente Turbo"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-27",
            "customNote": "Costela Desossada ao Glaceado com Mandioca Crocante"
          }
        ]
      },
      {
        "dayName": "Domingo",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-14",
            "customNote": "Burger Monstro Proteico"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-21",
            "customNote": "Picanha de Panela com Couve-Flor Gratinada"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-14",
            "customNote": "Muffins de manzana e canela"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-28",
            "customNote": "Iscas de Alcatra ao Shoyu com Mix de Legumes"
          }
        ]
      }
    ]
  },
  {
    "id": "ganho-massa",
    "title": "Ganancia de Masa Muscular Limpia",
    "goal": "ganho_massa",
    "goalLabel": "⚡ Ganancia de Masa",
    "description": "Superávit calórico controlado y alta densidad proteica para hipertrofia con mínima acumulación de grasa.",
    "targetDailyCalories": 2200,
    "targetDailyProtein": 180,
    "days": [
      {
        "dayName": "Lunes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-15",
            "customNote": "Salgado Maromba"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-29",
            "customNote": "pechuga de pollo Relleno com espinacas e ricota"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-15",
            "customNote": "Cocada de horno Fit"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-36",
            "customNote": "Ensalada Templária de pollo A la Plancha"
          }
        ]
      },
      {
        "dayName": "Martes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-16",
            "customNote": "Croqueta / Coxinha Fit Turbo"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-30",
            "customNote": "Strogonoff de pollo Fit com Bateta Doce"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-26",
            "customNote": "Pastel de horno de carne"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-37",
            "customNote": "pollo com Quiabo e Polenta Cremosa"
          }
        ]
      },
      {
        "dayName": "Miércoles",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-17",
            "customNote": "Pizza Proteica de sartén"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-31",
            "customNote": "pollo Xadrez Tradicional Fit"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-17",
            "customNote": "Pastel en Taza de plátano"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-38",
            "customNote": "tilapia A la Plancha ao Molho de Alcaparras e limón"
          }
        ]
      },
      {
        "dayName": "Jueves",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-18",
            "customNote": "Quiche Proteica de Caneca"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-32",
            "customNote": "pollo Suculento ao Molho de Mostarda e Mel"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-28",
            "customNote": "Muffin de carne Maromba"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-39",
            "customNote": "salmón ao horno com Aspargos e Endro"
          }
        ]
      },
      {
        "dayName": "Viernes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-19",
            "customNote": "Nuggets de pollo Caseiro"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-33",
            "customNote": "Coxas Suculentas ao limón com Couve à Mineira"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-19",
            "customNote": "Cookies de avena e chocolate"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-40",
            "customNote": "Bacalhau Desfiado com Batetas ao Murro"
          }
        ]
      },
      {
        "dayName": "Sábado",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-20",
            "customNote": "Mingau de avena Proteico"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-34",
            "customNote": "pollo Crocante de horno"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-30",
            "customNote": "Muffin de pollo com queso"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-41",
            "customNote": "Sardinha Al Horno com Pimentão e cebolla"
          }
        ]
      },
      {
        "dayName": "Domingo",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-21",
            "customNote": "Salgado de Maromba"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-35",
            "customNote": "pollo Cremoso ao Molho Amarelo (Curry)"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-21",
            "customNote": "Trufa / Brigadeiro Fit de leche en polvo"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-42",
            "customNote": "Peixe Crocante com Farinha de Grão-de-Bico"
          }
        ]
      }
    ]
  },
  {
    "id": "manutencao",
    "title": "Mantenimiento & Salud Equilibrada",
    "goal": "manutencao",
    "goalLabel": "⚖️ Mantenimiento & Salud",
    "description": "Equilibrio óptimo de macronutrientes para sostener la composición corporal, energía alta y longevidad.",
    "targetDailyCalories": 2000,
    "targetDailyProtein": 155,
    "days": [
      {
        "dayName": "Lunes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-22",
            "customNote": "Burrito Proteico de clara"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-43",
            "customNote": "camarón ao ajo e Óleo com Espaguete de calabacín"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-22",
            "customNote": "Beijinho de Coco Proteico"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-50",
            "customNote": "Sopa Detox de pollo com brócoli e Gengibre"
          }
        ]
      },
      {
        "dayName": "Martes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-23",
            "customNote": "Misto Quente Turbo"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-44",
            "customNote": "Guiso / Moqueca de Pescado de camarón com leche de Coco Light"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-33",
            "customNote": "Hot Pocket Express"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-51",
            "customNote": "Canja de Galinha Reforçada"
          }
        ]
      },
      {
        "dayName": "Miércoles",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-24",
            "customNote": "Tostex de queso no Pan de Nuvem"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-45",
            "customNote": "Filé de Peixe com Purê de Ervilha"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-24",
            "customNote": "Bombón de fresa com yogur"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-52",
            "customNote": "Creme de Abóbora Cabotiá com pollo deshebrado"
          }
        ]
      },
      {
        "dayName": "Jueves",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-25",
            "customNote": "Pastel de horno Fit"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-46",
            "customNote": "atún com Crosta de Gergelim e Legumes Orientais"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-35",
            "customNote": "Crepe Proteico de atún"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-53",
            "customNote": "Caldo de frijoles com Costelinha Suculenta"
          }
        ]
      },
      {
        "dayName": "Viernes",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-26",
            "customNote": "Pastel de horno de carne"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-47",
            "customNote": "Tortilla / Omelette de horno Nutritiva"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-26",
            "customNote": "Doce de leche Fit"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-54",
            "customNote": "arroz integral com Lentilha e Cubos de pollo"
          }
        ]
      },
      {
        "dayName": "Sábado",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-27",
            "customNote": "Gofre / Waffle Salgado de queso"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-48",
            "customNote": "Fritada Colorida de Legumes"
          },
          {
            "type": "Merienda",
            "recipeId": "cafe-37",
            "customNote": "Salgado de pollo com queso"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-55",
            "customNote": "Espaguete de calabacín com Albóndigas de pollo"
          }
        ]
      },
      {
        "dayName": "Domingo",
        "meals": [
          {
            "type": "Desayuno",
            "recipeId": "cafe-28",
            "customNote": "Muffin de carne Maromba"
          },
          {
            "type": "Almuerzo",
            "recipeId": "almoco-49",
            "customNote": "Panqueque Fit de avena com Recheio de pollo"
          },
          {
            "type": "Merienda",
            "recipeId": "sobremesa-28",
            "customNote": "arroz Doce Integral Proteico"
          },
          {
            "type": "Cena",
            "recipeId": "almoco-56",
            "customNote": "Lasaña de Berinjela com carne picada"
          }
        ]
      }
    ]
  }
];
