import { BonusMaterial } from '../types';

export const BONUS_MATERIALS_DATA: BonusMaterial[] = [
  {
    id: 'bonus-ficha-treino',
    title: 'Ficha de Entrenamiento Completa',
    subtitle: 'División Periodizada: En Casa y Gimnasio (Principiante a Avanzado)',
    coverIcon: '🏋️',
    tag: 'E-BOOK / GUÍA PRÁCTICA',
    type: 'workout',
    externalUrl: 'https://fichadetreiino.lovable.app/',
    description: 'Guía definitiva de musculación y calistenia para maximizar la hipertrofia y la quema de grasa junto con la dieta proteica.',
    content: {
      intro: 'El estímulo mecánico es el detonante biológico que indica a tu cuerpo que dirija la proteína consumida hacia la construcción muscular. Esta ficha fue diseñada para quienes buscan resultados rápidos y sostenibles.',
      sections: [
        {
          heading: '1. Nivel Principiante — Adaptación Anatómica y Base (Full Body 3x/semana)',
          subheading: 'Ideal para quienes inician o retoman después de un período inactivo.',
          body: [
            'Frecuencia: Lunes, Miércoles y Viernes.',
            'Objetivo: Aprender la técnica correcta de los movimientos básicos y acondicionar tendones y ligamentos.',
          ],
          table: {
            headers: ['Ejercicio', 'Series', 'Repeticiones', 'Descanso'],
            rows: [
              ['Sentadilla Libre o en Smith / Sentadilla Libre en Casa', '3', '10 a 12', '60s'],
              ['Press de Banca con Mancuernas / Flexiones de Brazos (en suelo o rodillas)', '3', '10 a 12', '60s'],
              ['Jalón al Pecho o Remo Bajo / Remo Invertido o con Elástico', '3', '10 a 12', '60s'],
              ['Press Militar con Mancuernas para Hombros', '3', '12', '60s'],
              ['Plancha Abdominal Isométrica', '3', '30 a 45s', '45s'],
            ],
          },
          tips: [
            'Prioriza el rango de movimiento antes de aumentar la carga.',
            'Mantén 1 a 2 repeticiones en reserva (RIR) en cada serie en este nivel.',
          ],
        },
        {
          heading: '2. Nivel Intermedio — División Superior / Inferior (Upper / Lower 4x/semana)',
          subheading: 'El estándar de oro para hipertrofia acelerada y recuperación muscular óptima.',
          body: [
            'Frecuencia: Lunes (Upper), Martes (Lower), Jueves (Upper), Viernes (Lower).',
            'Objetivo: Aumentar la densidad de entrenamiento por grupo muscular con progresión de cargas.',
          ],
          table: {
            headers: ['Entrenamiento A - Superiores (Upper)', 'Series', 'Repeticiones', 'Descanso'],
            rows: [
              ['Press Inclinado con Mancuernas', '4', '8 a 10', '90s'],
              ['Remo con Barra o Mancuernas', '4', '8 a 10', '90s'],
              ['Elevaciones Laterales con Mancuernas', '4', '12 a 15', '60s'],
              ['Tríceps en Polea o Fondos', '3', '10 a 12', '60s'],
              ['Curl de Bíceps con Barra Z o Mancuernas', '3', '10 a 12', '60s'],
            ],
          },
          tips: [
            'Aplica el principio de sobrecarga progresiva: anota tus pesos cada semana e intenta sumar 1kg o 1 repetición extra.',
          ],
        },
        {
          heading: '3. Nivel Avanzado — División ABC x 2 (Push / Pull / Legs 6x/semana)',
          subheading: 'Volumen e intensidad máximos para atletas experimentados.',
          body: [
            'Push (Pecho, Hombros y Tríceps) | Pull (Espalda, Trapecio y Bíceps) | Legs (Cuádriceps, Isquiotibiales, Glúteos y Pantorrillas).',
            'Trabaja cerca o al fallo concéntrico en las últimas series de los ejercicios compuestos.',
          ],
          table: {
            headers: ['Día', 'Enfoque Principal', 'Ejercicio Clave', 'Volumen'],
            rows: [
              ['A (Push)', 'Pectoral, Deltoides Anterior/Lateral, Tríceps', 'Press de Banca + Fondos Paralelas', '16 a 20 series'],
              ['B (Pull)', 'Dorsales, Romboides, Deltoides Posterior, Bíceps', 'Peso Muerto + Dominadas', '16 a 20 series'],
              ['C (Legs)', 'Cuádriceps, Isquiotibiales, Glúteos, Pantorrillas', 'Sentadilla Libre + Prensa de Piernas', '18 a 22 series'],
            ],
          },
        },
      ],
    },
  },
  {
    id: 'bonus-guia-macros',
    title: 'Guía Completa de Macros & Déficit',
    subtitle: 'Cómo Calcular, Ajustar y Romper Estancamientos de Peso',
    coverIcon: '🧮',
    tag: 'E-BOOK / GUÍA NUTRICIONAL',
    type: 'macros',
    description: 'Comprende la ciencia detrás del balance calórico, cómo distribuir carbohidratos y grasas y la dosis exacta de proteína por kg de peso.',
    content: {
      intro: 'Las calorías determinan el peso en la báscula; la proporción de macronutrientes (Proteínas, Grasas y Carbohidratos) determina si tu cuerpo quemará grasa o perderá masa magra.',
      sections: [
        {
          heading: '1. El Cálculo Científico de la Tasa Metabólica Basal (TMB)',
          body: [
            'Fórmula de Mifflin-St Jeor (utilizada en ShapeChef):',
            'Hombres: TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) + 5',
            'Mujeres: TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) - 161',
            'Gasto Energético Total Diario (GET / TDEE) = TMB × Factor de Actividad Física (1.2 a 1.9).',
          ],
        },
        {
          heading: '2. Regla de Oro de la Proteína en ShapeChef',
          body: [
            '• Pérdida de Grasa / Déficit: 2.0g a 2.4g de proteína por kg corporal (evita catabolismo y mantiene alta saciedad).',
            '• Hipertrofia / Ganancia Limpia: 1.8g a 2.2g de proteína por kg corporal.',
            '• Mantenimiento: 1.6g a 1.8g de proteína por kg corporal.',
            'Las grasas deben componer de 0.7g a 1.0g/kg para soporte hormonal, y el resto de calorías se completa con carbohidratos para energía en los entrenamientos.',
          ],
        },
        {
          heading: '3. Cómo Romper Estancamientos de Peso',
          body: [
            '1. Re-feed Estratégico: Elevar carbohidratos a nivel de mantenimiento durante 2 días restaura niveles de leptina y reactiva la tiroides.',
            '2. Aumentar el NEAT (Gasto No Asociado al Ejercicio): Camina de 8.000 a 10.000 pasos diarios.',
            '3. Ciclar Calorías: Días de entrenamiento con calorías moderadas y días de descanso con menor ingesta de carbohidratos.',
          ],
          tips: [
            'Utiliza la Calculadora de Metas de tu Perfil en ShapeChef para actualizar tus metas cada 3 a 5kg perdidos o ganados.',
          ],
        },
      ],
    },
  },
  {
    id: 'bonus-proteina-caseira',
    title: 'Guía de Proteína Casera & Económica',
    subtitle: 'Recetas Artesanales de Proteína en Polvo, Barritas y Quesos',
    coverIcon: '🥛',
    tag: 'E-BOOK / RECETAS SECRETAS',
    type: 'homemade_protein',
    externalUrl: 'https://drive.google.com/drive/folders/1UaSDifn_TFARKv1fGp7VBsx9mEa0oNx2?usp=sharing',
    description: 'Aprende a preparar suplementos caseros y quesos hiperproteicos por una fracción del precio comercial.',
    content: {
      intro: 'Con esta guía ahorrarás dinero cada mes fabricando tus propias fuentes de proteína concentrada con ingredientes simples y naturales de supermercado.',
      sections: [
        {
          heading: '1. Proteína en Polvo Casera Económica (Fórmula 70% Concentrada)',
          subheading: 'Rinde aprox. 500g con validez de 30 días en frasco hermético.',
          body: [
            'Ingredientes:',
            '• 250g de Leche en Polvo Desnatada',
            '• 150g de Harina de Avena Fina o Aislado de Soya',
            '• 80g de Clara de Huevo Pasteurizada en Polvo o Colágeno Hidrolizado',
            '• 20g de Cacao 100% o Canela en polvo + 1 cucharada pequeña de xilitol',
            'Modo de Preparación: Mezcla todos los ingredientes secos en un tazón grande y pásalos 2 veces por un colador fino para airear. Cada porción de 35g aporta 22g de proteína y menos de 130 kcal.',
          ],
        },
        {
          heading: '2. Barrita de Proteína Casera "Fudge" Sin Horno',
          subheading: 'Rinde 6 barritas grandes de 24g de proteína cada una.',
          body: [
            'Ingredientes:',
            '• 120g de Whey Protein o Proteína Casera en polvo',
            '• 80g de Mantequilla de Cacahuete Natural',
            '• 4 cucharadas soperas de miel o sirope sin azúcar',
            '• 40g de avena en copos + 20g de chía',
            '• 30ml de agua o leche para dar la consistencia',
            'Modo de Preparación: Mezcla todo en un tazón hasta obtener una masa densa que se despegue de los dedos. Moldea en un recipiente forrado con papel vegetal, corta en 6 rectángulos y congela por 20 minutos.',
          ],
        },
        {
          heading: '3. Queso Cottage Casero Ultra Proteico (Rinde 400g)',
          body: [
            'Ingredientes: 1 litro de leche desnatada + 4 cucharadas de vinagre de manzana o limón + 1 pizca de sal.',
            'Modo de Preparación: Calienta la leche hasta casi hervir (85°C). Apaga el fuego y añade el vinagre. Remueve suavemente y deja reposar por 15 minutos hasta que la cuajada se separe del suero.',
            'Vierte en un colador con paño de algodón limpio, enjuaga con agua fría para quitar la acidez del vinagre, escurre bien y mezcla con 2 cucharadas de yogur natural y sal.',
          ],
          tips: [
            '¡Obtienes un queso con más de 12g de proteína por cada 100g y menos del 1% de grasa a un costo mínimo!',
          ],
        },
      ],
    },
  },
];
