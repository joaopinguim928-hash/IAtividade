export const MOCK_QUIZZES = [
  {
    id: 'q1',
    title: 'Sintaxe e Crase',
    subject: 'Português',
    category: 'Gramática',
    difficulty: 'Médio',
    icon: 'BookOpen',
    timeLimit: 300, // seconds
    questions: [
      {
        id: 'q1-1',
        prompt: 'Assinale a alternativa em que o uso da crase está CORRETO:',
        options: [
          'Vou à pé para o trabalho todos os dias.',
          'Entreguei o documento à diretora do departamento.',
          'Ela começou à chorar de emoção.',
          'Escrevi uma carta à ele ontem.'
        ],
        correctAnswer: 1,
        explanation: 'A crase ocorre antes de substantivos femininos determinados ("à diretora"). Não ocorre crase antes de verbo ("à chorar"), nem antes de palavra masculina ("à pé", "à ele").'
      },
      {
        id: 'q1-2',
        prompt: 'Na frase "Ele se referiu ___ alunas que obtiveram notas altas", a lacuna deve ser preenchida com:',
        options: ['as', 'às', 'há', 'a'],
        correctAnswer: 1,
        explanation: 'O verbo "referir-se" exige a preposição "a", que se funde com o artigo definido feminino no plural "as" -> "às".'
      },
      {
        id: 'q1-3',
        prompt: 'Qual a função sintática do termo destacado em: "Os alunos compraram *livros novos*"?',
        options: [
          'Objeto Indireto',
          'Sujeito Simples',
          'Objeto Direto',
          'Agente da Passiva'
        ],
        correctAnswer: 2,
        explanation: 'O termo "livros novos" completa o sentido do verbo transitivo direto "compraram" sem preposição obrigatória, sendo um Objeto Direto.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Revolução Industrial e suas Fases',
    subject: 'História',
    category: 'História Geral',
    difficulty: 'Fácil',
    icon: 'Globe',
    timeLimit: 240,
    questions: [
      {
        id: 'q2-1',
        prompt: 'Qual foi o país pioneiro na Primeira Revolução Industrial no século XVIII?',
        options: ['França', 'Inglaterra', 'Alemanha', 'Estados Unidos'],
        correctAnswer: 1,
        explanation: 'A Inglaterra foi a pioneira devido à acumulação de capital, jazidas de carvão/ferro, cercamento dos campos e invenção da máquina a vapor.'
      },
      {
        id: 'q2-2',
        prompt: 'A Segunda Revolução Industrial foi marcada principalmente pelo uso de:',
        options: [
          'Vapor e Carvão mineral',
          'Eletricidade e Petróleo',
          'Energia Nuclear e Microchips',
          'Energia Eólica e Automação quântica'
        ],
        correctAnswer: 1,
        explanation: 'A 2ª Revolução Industrial (séc. XIX/XX) introduziu o motor a combustão, petróleo, eletricidade e a produção em massa em linha de montagem.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Genética e Leis de Mendel',
    subject: 'Biologia',
    category: 'Genética',
    difficulty: 'Difícil',
    icon: 'Dna',
    timeLimit: 360,
    questions: [
      {
        id: 'q3-1',
        prompt: 'De acordo com a Primeira Lei de Mendel, os fatores (genes) de um par:',
        options: [
          'Se fundem durante a fecundação permanentemente',
          'Se separam (segregam) na formação dos gametas',
          'São herdados exclusivamente da mãe',
          'Sempre se expressam de forma codominante'
        ],
        correctAnswer: 1,
        explanation: 'A 1ª Lei de Mendel (Lei da Segregação dos Fatores) estabelece que cada caráter é determinado por dois fatores que se separam na formação dos gametas.'
      },
      {
        id: 'q3-2',
        prompt: 'Qual é a proporção fenotípica esperada do cruzamento entre dois indivíduos heterozigotos (Aa x Aa) com dominância completa?',
        options: ['1:1', '1:2:1', '3:1', '9:3:3:1'],
        correctAnswer: 2,
        explanation: 'O cruzamento Aa x Aa produz genótipos AA, Aa, Aa, aa. Com dominância completa, temos 3 dominantes para 1 recessivo (proporção 3:1).'
      }
    ]
  },
  {
    id: 'q4',
    title: 'Funções Quadráticas e Gráficos',
    subject: 'Matemática',
    category: 'Álgebra',
    difficulty: 'Médio',
    icon: 'Calculator',
    timeLimit: 300,
    questions: [
      {
        id: 'q4-1',
        prompt: 'Dada a função f(x) = x² - 5x + 6, quais são as suas raízes (zeros da função)?',
        options: ['x = -2 e x = -3', 'x = 2 e x = 3', 'x = 1 e x = 6', 'x = 0 e x = 5'],
        correctAnswer: 1,
        explanation: 'Resolvendo por Bhaskara ou Soma e Produto: Soma = 5 e Produto = 6. As raízes são x = 2 e x = 3.'
      },
      {
        id: 'q4-2',
        prompt: 'O gráfico de uma função quadrática f(x) = ax² + bx + c é uma parábola com concavidade voltada para cima quando:',
        options: ['a < 0', 'a > 0', 'Delta (Δ) < 0', 'c = 0'],
        correctAnswer: 1,
        explanation: 'O sinal do coeficiente "a" determina a concavidade: se a > 0, a concavidade é voltada para cima (formato sorridente).'
      }
    ]
  }
];

export const MOCK_ESSAY_PROMPTS = [
  {
    id: 'e1',
    subject: 'Português / Redação',
    title: 'Desafios e Oportunidades da Inteligência Artificial na Educação',
    theme: 'Tecnologia e Sociedade',
    minWords: 50,
    suggestedStructure: [
      'Introdução: Apresente o tema e a tese principal.',
      'Desenvolvimento 1: Vantagens (personalização do ensino, apoio ao professor).',
      'Desenvolvimento 2: Desafios (dependência, plágio, exclusão digital).',
      'Conclusão: Proposta de intervenção ou síntese reflexiva.'
    ],
    sampleContext: 'A emergência de ferramentas de IA generativa transformou as salas de aula em todo o mundo. Escreva um texto dissertativo-argumentativo sobre o impacto da IA no aprendizado continuo.'
  },
  {
    id: 'e2',
    subject: 'História / Sociologia',
    title: 'A Importância do Saneamento Básico na Redução de Desigualdades Sociais',
    theme: 'Cidadania e Saúde Pública',
    minWords: 40,
    suggestedStructure: [
      'Introdução: O acesso à água potável e esgoto como direito fundamental.',
      'Desenvolvimento: Relação entre falta de saneamento, doenças e gastos na saúde.',
      'Conclusão: Políticas públicas e investimento em infraestrutura social.'
    ],
    sampleContext: 'No Brasil, milhões de pessoas ainda carecem de esgotamento sanitário adequado. Discuta como a universalização desse serviço contribui para a dignidade humana.'
  },
  {
    id: 'e3',
    subject: 'Literatura',
    title: 'Análise Crítica da Hipocrisia Social em Dom Casmurro',
    theme: 'Literatura Brasileira',
    minWords: 45,
    suggestedStructure: [
      'Introdução: Apresentação do romance de Machado de Assis e o narrador Bento Santiago.',
      'Desenvolvimento: O foco narrativo em 1ª pessoa e a construção da dúvida sobre Capitu.',
      'Conclusão: Como a obra reflete a sociedade burguesa carioca do séc. XIX.'
    ],
    sampleContext: 'Explicite de forma dissertativa como Machado de Assis utiliza o narrador não confiável para abordar aspectos de ciúme, aparência e status social.'
  }
];

export const MOCK_VERBS = [
  {
    id: 'v1',
    verb: 'Fazer',
    type: 'Irregular',
    group: '2ª Conjugação (-er)',
    english: 'To do / To make',
    conjugations: {
      presente: { eu: 'faço', tu: 'fazes', ele: 'faz', nos: 'fazemos', vos: 'fazeis', eles: 'fazem' },
      preteritoPerfeito: { eu: 'fiz', tu: 'fizeste', ele: 'fez', nos: 'fizemos', vos: 'fizestes', eles: 'fizeram' },
      preteritoImperfeito: { eu: 'fazia', tu: 'fazias', ele: 'fazia', nos: 'fazíamos', vos: 'fazíeis', eles: 'faziam' },
      futuroPresente: { eu: 'farei', tu: 'farás', ele: 'fará', nos: 'faremos', vos: 'fareis', eles: 'farão' },
      subjuntivoPresente: { eu: 'faça', tu: 'faças', ele: 'faça', nos: 'façamos', vos: 'façais', eles: 'façam' }
    },
    tips: 'Atenção ao radical no Pretérito Perfeito ("fiz", "fez") e Futuro do Presente ("farei"). Evite grafar "fazei" com "s".'
  },
  {
    id: 'v2',
    verb: 'Ter',
    type: 'Irregular',
    group: '2ª Conjugação (-er)',
    english: 'To have',
    conjugations: {
      presente: { eu: 'tenho', tu: 'tens', ele: 'tem', nos: 'temos', vos: 'tendes', eles: 'têm' },
      preteritoPerfeito: { eu: 'tive', tu: 'tiveste', ele: 'teve', nos: 'tivemos', vos: 'tivestes', eles: 'tiveram' },
      preteritoImperfeito: { eu: 'tinha', tu: 'tinhas', ele: 'tinha', nos: 'tínhamos', vos: 'tínheis', eles: 'tinham' },
      futuroPresente: { eu: 'terei', tu: 'terás', ele: 'terá', nos: 'teremos', vos: 'tereis', eles: 'terão' },
      subjuntivoPresente: { eu: 'tenha', tu: 'tenhas', ele: 'tenha', nos: 'tenhamos', vos: 'tenhais', eles: 'tenham' }
    },
    tips: 'Lembre-se da acentuação diferencial: "ele tem" (singular, sem acento) vs "eles têm" (plural, com acento circunflexo).'
  },
  {
    id: 'v3',
    verb: 'Ir',
    type: 'Irregular / Anômalo',
    group: '3ª Conjugação (-ir)',
    english: 'To go',
    conjugations: {
      presente: { eu: 'vou', tu: 'vais', ele: 'vai', nos: 'vamos', vos: 'vides', eles: 'vão' },
      preteritoPerfeito: { eu: 'fui', tu: 'foste', ele: 'foi', nos: 'fomos', vos: 'fostes', eles: 'foram' },
      preteritoImperfeito: { eu: 'ia', tu: 'ias', ele: 'ia', nos: 'íamos', vos: 'íeis', eles: 'iam' },
      futuroPresente: { eu: 'irei', tu: 'irás', ele: 'irá', nos: 'iremos', vos: 'ireis', eles: 'irão' },
      subjuntivoPresente: { eu: 'vá', tu: 'vás', ele: 'vá', nos: 'vamos', vos: 'vades', eles: 'vão' }
    },
    tips: 'O verbo "ir" compartilha formas do Pretérito Perfeito com o verbo "ser" (ex: "eu fui à praia" / "eu fui um bom aluno").'
  },
  {
    id: 'v4',
    verb: 'Amar',
    type: 'Regular',
    group: '1ª Conjugação (-ar)',
    english: 'To love',
    conjugations: {
      presente: { eu: 'amo', tu: 'amas', ele: 'ama', nos: 'amamos', vos: 'amais', eles: 'amam' },
      preteritoPerfeito: { eu: 'amei', tu: 'amaste', ele: 'amou', nos: 'amamos', vos: 'amastes', eles: 'amaram' },
      preteritoImperfeito: { eu: 'amava', tu: 'amavas', ele: 'amava', nos: 'amávamos', vos: 'amáveis', eles: 'amavam' },
      futuroPresente: { eu: 'amarei', tu: 'amarás', ele: 'amará', nos: 'amaremos', vos: 'amareis', eles: 'amarão' },
      subjuntivoPresente: { eu: 'ame', tu: 'ames', ele: 'ame', nos: 'amemos', vos: 'ameis', eles: 'amem' }
    },
    tips: 'Modelo padrão da 1ª conjugação (-ar). Todos os verbos regulares em -ar seguem exatamente a mesma terminação.'
  },
  {
    id: 'v5',
    verb: 'Poder',
    type: 'Irregular',
    group: '2ª Conjugação (-er)',
    english: 'To be able to / Can',
    conjugations: {
      presente: { eu: 'posso', tu: 'podes', ele: 'pode', nos: 'podemos', vos: 'podeis', eles: 'podem' },
      preteritoPerfeito: { eu: 'pude', tu: 'pudeste', ele: 'pôde', nos: 'pudemos', vos: 'pudestes', eles: 'puderam' },
      preteritoImperfeito: { eu: 'podia', tu: 'podias', ele: 'podia', nos: 'podíamos', vos: 'podíeis', eles: 'podiam' },
      futuroPresente: { eu: 'poderei', tu: 'poderás', ele: 'poderá', nos: 'poderemos', vos: 'podereis', eles: 'poderão' },
      subjuntivoPresente: { eu: 'possa', tu: 'possas', ele: 'possa', nos: 'possamos', vos: 'possais', eles: 'possam' }
    },
    tips: 'Diferença importante de acento: "ele pode" (presente) vs "ele pôde" (pretérito perfeito).'
  }
];

export const MOCK_MIND_MAPS = [
  {
    id: 'mm1',
    subject: 'Português',
    title: 'Análise Sintática da Oração',
    category: 'Gramática',
    description: 'Estrutura completa dos termos essenciais, integrantes e acessórios da oração.',
    nodes: [
      {
        id: 'n1',
        title: 'Análise Sintática',
        color: 'bg-indigo-600 text-white',
        x: 0,
        y: 0,
        type: 'root',
        description: 'Estudo da função das palavras nas frases.'
      },
      {
        id: 'n2',
        title: 'Termos Essenciais',
        color: 'bg-blue-500 text-white',
        parentId: 'n1',
        x: -220,
        y: 120,
        description: 'Sujeito e Predicado (base da oração).'
      },
      {
        id: 'n3',
        title: 'Termos Integrantes',
        color: 'bg-emerald-500 text-white',
        parentId: 'n1',
        x: 0,
        y: 140,
        description: 'Completam o sentido de verbos e nomes.'
      },
      {
        id: 'n4',
        title: 'Termos Acessórios',
        color: 'bg-amber-500 text-white',
        parentId: 'n1',
        x: 220,
        y: 120,
        description: 'Desempenham função secundária (adjuntos, aposto).'
      },
      {
        id: 'n2-1',
        title: 'Sujeito (Simples, Composto, Oculto)',
        color: 'bg-blue-100 text-blue-900 border border-blue-300',
        parentId: 'n2',
        x: -320,
        y: 240,
        description: 'Quem pratica ou sofre a ação.'
      },
      {
        id: 'n2-2',
        title: 'Predicado (Verbal, Nominal, Verbo-Nominal)',
        color: 'bg-blue-100 text-blue-900 border border-blue-300',
        parentId: 'n2',
        x: -180,
        y: 240,
        description: 'Tudo o que se declara sobre o sujeito.'
      },
      {
        id: 'n3-1',
        title: 'Objetos Direto e Indireto',
        color: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
        parentId: 'n3',
        x: -50,
        y: 260,
        description: 'Complementos verbais.'
      },
      {
        id: 'n3-2',
        title: 'Complemento Nominal',
        color: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
        parentId: 'n3',
        x: 80,
        y: 260,
        description: 'Completa o sentido de substantivo, adjetivo ou advérbio.'
      },
      {
        id: 'n4-1',
        title: 'Adjunto Adnominal e Adverbial',
        color: 'bg-amber-100 text-amber-900 border border-amber-300',
        parentId: 'n4',
        x: 200,
        y: 240,
        description: 'Especificam ou intensificam termos.'
      },
      {
        id: 'n4-2',
        title: 'Aposto e Vocativo',
        color: 'bg-amber-100 text-amber-900 border border-amber-300',
        parentId: 'n4',
        x: 320,
        y: 240,
        description: 'Explicam ou chamam o interlocutor.'
      }
    ]
  },
  {
    id: 'mm2',
    subject: 'Biologia',
    title: 'Visão Geral da Célula e Organelas',
    category: 'Citologia',
    description: 'Mapa mental interativo sobre a estrutura das células eucarióticas.',
    nodes: [
      {
        id: 'b1',
        title: 'Célula Eucariótica',
        color: 'bg-teal-600 text-white',
        x: 0,
        y: 0,
        type: 'root',
        description: 'Unidade fundamental da vida com núcleo definido.'
      },
      {
        id: 'b2',
        title: 'Membrana Plasmática',
        color: 'bg-cyan-500 text-white',
        parentId: 'b1',
        x: -200,
        y: 120,
        description: 'Bicamada lipídica com permeabilidade seletiva.'
      },
      {
        id: 'b3',
        title: 'Núcleo Celular',
        color: 'bg-purple-500 text-white',
        parentId: 'b1',
        x: 0,
        y: 140,
        description: 'Guarda o DNA e controla atividades celulares.'
      },
      {
        id: 'b4',
        title: 'Organelas Citoplasmáticas',
        color: 'bg-rose-500 text-white',
        parentId: 'b1',
        x: 200,
        y: 120,
        description: 'Estruturas com funções específicas.'
      },
      {
        id: 'b4-1',
        title: 'Mitocôndria (Respiração)',
        color: 'bg-rose-100 text-rose-900 border border-rose-300',
        parentId: 'b4',
        x: 120,
        y: 240,
        description: 'Produção de ATP (Energia).'
      },
      {
        id: 'b4-2',
        title: 'Complexo de Golgi (Secreção)',
        color: 'bg-rose-100 text-rose-900 border border-rose-300',
        parentId: 'b4',
        x: 280,
        y: 240,
        description: 'Empacotamento e distribuição de proteínas.'
      }
    ]
  }
];

export const MOCK_USER_STATS = {
  totalQuizzesTaken: 14,
  correctAnswersTotal: 38,
  totalQuestionsTotal: 45,
  essaysSubmitted: 6,
  averageEssayGrade: 880, // out of 1000
  studyTimeHours: 18.5,
  streakDays: 5,
  level: 4,
  xpPoints: 2450,
  nextLevelXp: 3000,
  subjectMastery: [
    { subject: 'Português', score: 88, fullMark: 100 },
    { subject: 'História', score: 75, fullMark: 100 },
    { subject: 'Biologia', score: 82, fullMark: 100 },
    { subject: 'Matemática', score: 65, fullMark: 100 },
    { subject: 'Literatura', score: 90, fullMark: 100 }
  ],
  weeklyActivity: [
    { day: 'Seg', quizzes: 2, essays: 1, hours: 2.1 },
    { day: 'Ter', quizzes: 3, essays: 0, hours: 1.8 },
    { day: 'Qua', quizzes: 1, essays: 2, hours: 3.0 },
    { day: 'Qui', quizzes: 4, essays: 1, hours: 2.5 },
    { day: 'Sex', quizzes: 2, essays: 1, hours: 2.0 },
    { day: 'Sáb', quizzes: 1, essays: 0, hours: 1.2 },
    { day: 'Dom', quizzes: 1, essays: 1, hours: 1.5 }
  ],
  recentActivities: [
    { id: 'act1', type: 'quiz', title: 'Sintaxe e Crase', result: '3/3 acertos (100%)', date: 'Hoje, 14:30' },
    { id: 'act2', type: 'essay', title: 'Desafios e Oportunidades da IA na Educação', result: 'Nota: 920/1000', date: 'Ontem, 18:15' },
    { id: 'act3', type: 'verb', title: 'Prática de Verbos Irregulares', result: '10 conjugações concluídas', date: '20 Out, 10:00' },
    { id: 'act4', type: 'mindmap', title: 'Análise Sintática da Oração', result: 'Estudado e revisado', date: '19 Out, 16:40' }
  ]
};
