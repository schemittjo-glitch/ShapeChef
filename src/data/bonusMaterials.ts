import { BonusMaterial } from '../types';

export const BONUS_MATERIALS_DATA: BonusMaterial[] = [
  {
    id: 'bonus-ficha-treino',
    title: 'Ficha de Treino Completa',
    subtitle: 'Divisão Periodizada: Em Casa & Academia (Iniciante ao Avançado)',
    coverIcon: '🏋️',
    tag: 'E-BOOK / FICHA PRÁTICA',
    type: 'workout',
    description: 'Guia definitivo de musculação e calistenia para maximizar a hipertrofia e a queima de gordura em conjunto com a dieta proteica.',
    content: {
      intro: 'O estímulo mecânico é o gatilho biológico que sinaliza ao seu corpo para direcionar a proteína consumida para a construção muscular. Esta ficha foi desenhada para quem busca resultados rápidos e sustentáveis.',
      sections: [
        {
          heading: '1. Nível Iniciante — Adaptação Anatômica & Base (Full Body 3x/semana)',
          subheading: 'Ideal para quem está começando ou retornando após período parado.',
          body: [
            'Frequência: Segunda, Quarta e Sexta-feira.',
            'Objetivo: Aprender a técnica correta dos movimentos básicos e condicionar tendões e ligamentos.',
          ],
          table: {
            headers: ['Exercício', 'Séries', 'Repetições', 'Descanso'],
            rows: [
              ['Agachamento Livre ou no Smith / Agachamento Livre em Casa', '3', '10 a 12', '60s'],
              ['Supino Reto com Halteres / Flexão de Braços (no chão ou joelhos)', '3', '10 a 12', '60s'],
              ['Puxada Frontal ou Remada Baixa / Remada Invertida ou com Elástico', '3', '10 a 12', '60s'],
              ['Desenvolvimento com Halteres para Ombros', '3', '12', '60s'],
              ['Prancha Abdominal Isométrica', '3', '30 a 45s', '45s'],
            ],
          },
          tips: [
            'Priorize a amplitude de movimento antes de aumentar a carga.',
            'Mantenha 1 a 2 repetições de reserva em cada série neste nível.',
          ],
        },
        {
          heading: '2. Nível Intermediário — Divisão Superior / Inferior (Upper / Lower 4x/semana)',
          subheading: 'O padrão-ouro para hipertrofia acelerada e recuperação muscular ideal.',
          body: [
            'Frequência: Segunda (Upper), Terça (Lower), Quinta (Upper), Sexta (Lower).',
            'Objetivo: Aumentar a densidade de treino por grupo muscular com progressão de cargas.',
          ],
          table: {
            headers: ['Treino A - Superiores (Upper)', 'Séries', 'Repetições', 'Descanso'],
            rows: [
              ['Supino Inclinado com Halteres', '4', '8 a 10', '90s'],
              ['Remada Curvada com Barra ou Halteres', '4', '8 a 10', '90s'],
              ['Elevação Lateral de Ombros com Halteres', '4', '12 a 15', '60s'],
              ['Tríceps Corda ou Mergulho', '3', '10 a 12', '60s'],
              ['Rosca Direta com Barra W ou Halteres', '3', '10 a 12', '60s'],
            ],
          },
          tips: [
            'Aplique o princípio da sobrecarga progressiva: anote suas cargas toda semana e tente somar 1kg ou 1 repetição extra.',
          ],
        },
        {
          heading: '3. Nível Avançado — Divisão ABC x 2 (Push / Pull / Legs 6x/semana)',
          subheading: 'Volume e intensidade máximos para atletas experientes.',
          body: [
            'Push (Peito, Ombros e Tríceps) | Pull (Costas, Trapézio e Bíceps) | Legs (Quadríceps, Posterior e Panturrilhas).',
            'Trabalhe até a falha concêntrica nas últimas séries dos exercícios compostos.',
          ],
          table: {
            headers: ['Dia', 'Foco Principal', 'Exercício Chave', 'Volume'],
            rows: [
              ['A (Push)', 'Peitoral, Deltóide Anterior/Lateral, Tríceps', 'Supino Reto + Paralelas', '16 a 20 séries'],
              ['B (Pull)', 'Dorsais, Romboides, Deltóide Posterior, Bíceps', 'Levantamento Terra + Barra Fixa', '16 a 20 séries'],
              ['C (Legs)', 'Quadríceps, Isquiotibiais, Glúteos, Panturrilhas', 'Agachamento Livre + Leg Press', '18 a 22 séries'],
            ],
          },
        },
      ],
    },
  },
  {
    id: 'bonus-guia-macros',
    title: 'Guia Completo de Macros & Déficit',
    subtitle: 'Como Calcular, Ajustar e Quebrar Platôs de Peso',
    coverIcon: '🧮',
    tag: 'E-BOOK / GUIA NUTRICIONAL',
    type: 'macros',
    description: 'Entenda a ciência por trás do balanço calórico, como distribuir carboidratos e gorduras e a dosagem exata de proteína por kg de peso.',
    content: {
      intro: 'Calorias determinam o peso na balança; a proporção de macronutrientes (Proteínas, Gorduras e Carboidratos) determina se o seu corpo queimará gordura ou perderá massa magra.',
      sections: [
        {
          heading: '1. O Cálculo Científico da Taxa Metabólica Basal (TMB)',
          body: [
            'Fórmula de Mifflin-St Jeor (utilizada no ShapeChef):',
            'Homens: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) + 5',
            'Mulheres: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) - 161',
            'Gasto Calórico Total Diário (GET / TDEE) = TMB × Fator de Atividade Física (1.2 a 1.9).',
          ],
        },
        {
          heading: '2. Regra de Ouro da Proteína no ShapeChef',
          body: [
            '• Emagrecimento / Déficit: 2.0g a 2.4g de proteína por kg corporal (evita catabolismo e mantém saciedade alta).',
            '• Hipertrofia / Ganho Limpo: 1.8g a 2.2g de proteína por kg corporal.',
            '• Manutenção: 1.6g a 1.8g de proteína por kg corporal.',
            'As gorduras devem compor cerca de 0.7g a 1.0g/kg para suporte hormonal, e o restante das calorias é preenchido com carboidratos para energia nos treinos.',
          ],
        },
        {
          heading: '3. Como Quebrar Platôs de Emagrecimento',
          body: [
            '1. Re-feed Estratégico: Elevar carboidratos para nível de manutenção durante 2 dias restaura níveis de leptina e reativa a tireoide.',
            '2. Aumentar o NEAT (Termogênese Não Associada ao Exercício): Dê 8.000 a 10.000 passos por dia.',
            '3. Ciclar Calorias: Dias de treino com calorias moderadas e dias de descanso com menor ingestão de carboidratos.',
          ],
          tips: [
            'Utilize a Calculadora de Metas do seu Perfil no ShapeChef para atualizar suas metas a cada 3 a 5kg perdidos ou ganhos.',
          ],
        },
      ],
    },
  },
  {
    id: 'bonus-proteina-caseira',
    title: 'Guia de Proteína Caseira & Econômica',
    subtitle: 'Receitas Artesanais de Proteína em Pó, Barras e Queijos',
    coverIcon: '🥛',
    tag: 'E-BOOK / RECEITAS SECRETAS',
    type: 'homemade_protein',
    description: 'Aprenda a fazer suplementos caseiros e queijos hiperproteicos por uma fração do preço dos produtos industriais.',
    content: {
      intro: 'Com este guia, você economiza centenas de reais por mês fabricando suas próprias fontes de proteína concentrada com ingredientes simples e naturais de supermercado.',
      sections: [
        {
          heading: '1. Proteína em Pó Caseira Econômica (Fórmula 70% Concentrada)',
          subheading: 'Rende cerca de 500g com validade de 30 dias em pote hermético.',
          body: [
            'Ingredientes:',
            '• 250g de Leite em Pó Desnatado',
            '• 150g de Farinha de Aveia Fina ou Isolado de Soja',
            '• 80g de Clara de Ovo Pasteurizada em Pó ou Colágeno Hidrolisado',
            '• 20g de Cacau 100% ou Canela em pó + 1 colher de sobremesa de xilitol',
            'Modo de Preparo: Misture todos os ingredientes secos em uma tigela grande e passe 2 vezes por uma peneira fina para aerar. Cada porção de 35g fornece 22g de proteína e menos de 130 kcal.',
          ],
        },
        {
          heading: '2. Barra de Proteína Caseira "Fudge" Sem Forno',
          subheading: 'Rende 6 barras grandes de 24g de proteína cada.',
          body: [
            'Ingredientes:',
            '• 120g de Whey Protein ou Proteína Caseira em pó',
            '• 80g de Pasta de Amendoim Integral',
            '• 4 colheres de sopa de mel ou xarope sem açúcar',
            '• 40g de aveia em flocos + 20g de chia',
            '• 30ml de água ou leite para dar o ponto',
            'Modo de Preparo: Misture tudo em uma tigela até virar uma massa pesada que desgruda dos dedos. Molde em uma travessa forrada com papel manteiga, corte em 6 retângulos e leve ao congelador por 20 minutos.',
          ],
        },
        {
          heading: '3. Queijo Cottage Caseiro Ultra Proteico (Rende 400g)',
          body: [
            'Ingredientes: 1 litro de leite desnatado + 4 colheres de sopa de vinagre de maçã ou limão + 1 pitada de sal.',
            'Modo de Preparo: Aqueça o leite até quase ferver (85°C). Desligue e adicione o vinagre. Mexa delicadamente e deixe descansar por 15 minutos até a coalhada se separar do soro esverdeado.',
            'Despeje em uma peneira forrada com pano de algodão limpo, lave em água fria corrente para tirar a acidez do vinagre, escorra bem e misture com 2 colheres de iogurte natural e sal.',
          ],
          tips: [
            'Você obtém um queijo com mais de 12g de proteína a cada 100g e menos de 1% de gordura por um custo baixíssimo!',
          ],
        },
      ],
    },
  },
];
