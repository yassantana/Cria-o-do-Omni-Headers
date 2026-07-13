/**
 * Conteudo do site — Portugues (Brasil). Fonte unica de verdade para textos.
 * Outras linguas (EN/ES) devem exportar um objeto com o MESMO formato (type Content).
 *
 * Regra: textos curtos. O visual comunica; o texto complementa (70/30).
 */
export const ptBR = {
  meta: {
    title: 'Omni Headers — Atendimento omnichannel com IA',
    description:
      'Centralize WhatsApp, Instagram, e-mail e chat em uma so caixa de entrada, com IA e automacao. Implantacao e suporte pela Headers.',
  },

  cta: {
    primary: 'Agendar demonstração',
    secondary: 'Falar com um especialista',
    whatsapp: 'Falar no WhatsApp',
    seeMore: 'Ver como funciona',
  },

  announcement: {
    text: 'Novo: agente de IA em portugues, treinado para o seu negocio.',
    link: 'Conhecer',
  },

  // Pertencimento ao ecossistema Headers (padrao Cloud Bridge)
  brand: {
    belongs: 'Um produto Headers',
    ecosystem: 'Headers',
    product: 'Omni Headers',
  },

  hero: {
    eyebrow: 'Atendimento omnichannel',
    title: 'Todos os canais da sua empresa, em uma operação só.',
    subtitle:
      'WhatsApp, Instagram, e-mail e chat — centralizados, com inteligência artificial e com a implantação da Headers.',
    inboxTitle: 'Caixa de entrada · todos os canais',
    headersLabel: 'Você não contrata só um software. A Headers cuida de tudo:',
    headersSteps: ['Implantação', 'Configuração', 'Integração', 'Treinamento', 'Acompanhamento'],
  },

  trust: {
    label: 'Todos os canais que seus clientes usam, numa operacao so',
    placeholder: 'Espaco reservado para logos de clientes',
  },

  // Momento 1 · Reconhecimento — o visitante ve a propria operacao hoje.
  // Mostrar (mensagens chegando/sem resposta), nao explicar. Texto = 1 frase.
  today: {
    number: '01',
    eyebrow: 'A sua operação hoje',
    title: 'Hoje, o atendimento da sua empresa funciona assim.',
    counterLabel: 'sem resposta agora',
    messages: [
      { name: 'Mariana', channel: 'whatsapp', text: 'Oi, vocês têm horário hoje?', time: '09:41', unanswered: true },
      { name: 'Pedro', channel: 'whatsapp', text: 'Bom dia! Qual o valor?', time: '09:38', unanswered: false },
      { name: 'Loja Centro', channel: 'instagram', text: 'Tem alguém aí?', time: '09:36', unanswered: true },
      { name: 'Carla', channel: 'whatsapp', text: 'Continuo aguardando…', time: '09:30', unanswered: true },
      { name: 'João', channel: 'email', text: 'Segue meu pedido em anexo', time: '09:12', unanswered: false },
      { name: 'Amanda', channel: 'whatsapp', text: 'Ninguém respondeu ainda?', time: '08:47', unanswered: true },
    ],
  },

  // Cena · Atendimento colaborativo — a equipe atende junta, no mesmo numero
  equipe: {
    number: '02',
    eyebrow: 'A operação por dentro',
    title: 'A equipe inteira atende junta, no mesmo número.',
    intro:
      'Todos veem a conversa e o histórico do cliente, deixam recados entre si e a IA ajuda a responder. Ninguém atende sozinho.',
  },

  // Cena · Objecao — "preciso trocar de numero? e o WhatsApp oficial? e seguro?"
  whatsapp: {
    number: '03',
    eyebrow: 'A dúvida que todo empresário tem',
    title: 'É o seu WhatsApp de sempre. Mesmo número, oficial e seguro.',
    intro:
      'Você não troca de número nem corre risco de bloqueio. Para o seu cliente, nada muda — ele continua te chamando no WhatsApp normal.',
    clientLabel: 'Para o seu cliente',
    clientSub: 'O WhatsApp de sempre',
    omniLabel: 'Para a sua equipe',
    omniSub: 'A operação no Omni Headers',
    businessName: 'Loja do Carlos',
    phone: '+55 85 9•••• ••••',
    phoneNote: 'o seu número de sempre',
    seal: 'Conexão oficial · WhatsApp Business API',
    sealNote: 'sem risco de bloqueio',
  },

  // Cena · Culminacao — "O que realmente muda na minha empresa?"
  transformacao: {
    number: '09',
    eyebrow: 'A consequência de tudo que você viu até aqui',
    title: 'A sua operação funcionando do jeito que ela sempre deveria ter funcionado.',
    intro:
      'Cada mensagem respondida. Cada cliente atendido. Cada gestor informado. Não é uma promessa — é o que acontece quando a operação está organizada.',
  },

  // Cena · Objecao — "Vou ficar sozinho depois? A plataforma vai evoluir comigo?"
  crescimento: {
    number: '08',
    eyebrow: 'E daqui a um ano?',
    title: 'Daqui a um ano, a sua operação vai estar muito mais inteligente do que está hoje.',
    intro:
      'Novos canais. Novas automações. Mais inteligência. A plataforma acompanha o crescimento da sua empresa — sem precisar recomeçar do zero.',
  },

  // Cena · Objecao — "Vou precisar trocar os sistemas que minha empresa ja usa?"
  integracoes: {
    number: '07',
    eyebrow: 'A dúvida que aparece em toda reunião',
    title: 'O Omni Headers não substitui seus sistemas. Ele conecta todos eles.',
    intro:
      'Seu ERP, CRM e sistemas internos continuam exatamente como estão. O Omni faz a ponte — e entrega contexto completo para o atendente antes de ele digitar a primeira palavra.',
  },

  // Cena · Objecao — "Como implantamos isso? Vou ficar sozinho depois?"
  parceria: {
    number: '06',
    eyebrow: 'A Headers com você',
    title: 'Você não recebe um login e fica sozinho. Você ganha uma equipe.',
    intro:
      'Da análise da sua operação à evolução contínua — especialistas Headers caminham ao seu lado em cada etapa da jornada.',
  },

  // Cena · Objecao — "Como acompanho minha equipe? Quem esta online? Quanto tempo demorou?"
  gestao: {
    number: '05',
    eyebrow: 'O controle que todo gestor precisa',
    title: 'Você vê tudo — quem está online, quem está atendendo e quanto tempo está demorando.',
    intro:
      'Em tempo real, sem precisar perguntar para ninguém. Cada segundo de atraso aparece no painel — e você age antes que o cliente perceba.',
  },

  // Cena · Objecao — "Posso confiar na IA? E se ela responder errado? Posso controlar?"
  ia: {
    number: '04',
    eyebrow: 'A pergunta que todo empresário faz',
    title: 'Ela responde o que sabe. Quando não sabe, chama a equipe.',
    intro:
      'Você define as regras. A Captain responde o que você autorizar — o resto passa para o time. Nunca inventa, nunca improvisa.',
  },

  // 03 · Transformação — Capacidade 2: operação que responde rápido (IA + automação)
  fast: {
    number: '',
    eyebrow: 'A transformação · Capacidade 2',
    title: 'Uma operação que responde na hora, mesmo com a equipe cheia.',
    intro:
      'A inteligência artificial atende o simples sozinha e adianta o resto para o time. A sua equipe rende mais e o cliente nunca fica esperando.',
    outcomes: [
      { title: 'O cliente é respondido na hora', desc: 'A IA atende 24 horas, sem fila e sem espera.' },
      { title: 'A equipe foca no que importa', desc: 'O repetitivo sai do caminho; as pessoas cuidam do que exige gente.' },
      { title: 'Nada trava quando o volume sobe', desc: 'As automações distribuem e organizam a fila sozinhas.' },
    ],
  },

  channels: {
    eyebrow: 'Centralizacao & canais',
    title: 'Uma caixa de entrada para todos os canais',
    subtitle: 'O mesmo cliente, em qualquer canal, vira uma unica conversa.',
    integrations: {
      title: 'Conecta com o que voce ja usa',
      subtitle: 'ERP, CRM, e-commerce, agenda e APIs. E o que faltar, a Headers integra.',
      categories: ['ERP', 'CRM', 'E-commerce', 'Agenda', 'Planilhas', 'APIs proprias'],
    },
  },

  features: {
    eyebrow: 'Como funciona',
    title: 'Tudo que sua operacao de atendimento precisa',
    subtitle: 'Uma plataforma completa — sem gambiarra, sem varios sistemas soltos.',
    items: [
      { title: 'Caixa de entrada unificada', desc: 'Todos os canais, uma tela.' },
      { title: 'IA que atende', desc: 'Responde, sugere e resume conversas.' },
      { title: 'Automacoes e bots', desc: 'Fluxos, respostas prontas e distribuicao.' },
      { title: 'Contatos e historico', desc: 'O cliente e tudo que ja falou, num lugar.' },
      { title: 'Relatorios e SLA', desc: 'Volume, tempo de resposta e satisfacao.' },
      { title: 'Equipes e permissoes', desc: 'Times organizados, acesso sob controle.' },
    ],
  },

  ai: {
    eyebrow: 'Inteligencia artificial',
    title: 'Uma IA que trabalha junto com a sua equipe',
    subtitle:
      'Treinada com o contexto do seu negocio, em portugues. Atende sozinha o simples e entrega o complexo pronto para o humano.',
    capabilities: [
      { title: 'Responde na hora', desc: 'Tira duvidas comuns 24/7, sem fila.' },
      { title: 'Sugere a resposta', desc: 'O atendente so revisa e envia.' },
      { title: 'Resume a conversa', desc: 'Contexto inteiro em uma linha.' },
      { title: 'Classifica e encaminha', desc: 'Manda para o time certo, sozinha.' },
    ],
    chip: 'Captain · IA do Omni Headers',
  },

  automation: {
    eyebrow: 'Automacoes',
    title: 'O trabalho repetitivo, no piloto automatico',
    subtitle: 'Monte fluxos que atendem, qualificam e encaminham — sem escrever uma linha de codigo.',
    flow: [
      { label: 'Cliente inicia conversa', kind: 'start' },
      { label: 'Bot identifica o assunto', kind: 'bot' },
      { label: 'Resolveu sozinho?', kind: 'decision' },
      { label: 'IA responde e finaliza', kind: 'ai' },
      { label: 'Encaminha para o time certo', kind: 'route' },
    ],
    perks: ['Respostas prontas', 'Distribuicao inteligente', 'Horarios e ausencia', 'Tags automaticas'],
  },

  dashboards: {
    eyebrow: 'Dashboards',
    title: 'Decisoes com base em dados, nao em achismo',
    subtitle: 'Acompanhe volume, tempo de resposta, SLA, satisfacao e produtividade — por canal e por atendente.',
    kpis: [
      { label: 'Conversas hoje', hint: 'volume em tempo real' },
      { label: 'Tempo de 1a resposta', hint: 'media do dia' },
      { label: 'Resolvidas pela IA', hint: '% automatizado' },
      { label: 'Satisfacao (CSAT)', hint: 'pos-atendimento' },
    ],
  },

  results: {
    eyebrow: 'Resultados',
    title: 'O que muda quando o atendimento se organiza',
    subtitle:
      'Os numeros reais entram apos a implantacao no seu cenario. Abaixo, os indicadores que vamos acompanhar juntos.',
    placeholderNote: 'Seu numero aqui',
    metrics: [
      { label: 'Tempo de resposta', trend: 'down', caption: 'mais rapido' },
      { label: 'Conversas por atendente', trend: 'up', caption: 'mais produtividade' },
      { label: 'Resolucao automatica', trend: 'up', caption: 'menos fila' },
      { label: 'Satisfacao do cliente', trend: 'up', caption: 'CSAT maior' },
    ],
  },

  headers: {
    eyebrow: 'Muito alem de um software',
    title: 'A plataforma e so uma parte. A diferenca e a Headers.',
    subtitle:
      'Voce nao recebe um login e fica sozinho. A Headers conduz toda a transformacao do seu atendimento — do primeiro setup a evolucao continua.',
    deliverables: [
      { title: 'Implantacao', desc: 'Colocamos tudo no ar, configurado para voce.' },
      { title: 'Configuracao personalizada', desc: 'Do seu jeito, para o seu processo.' },
      { title: 'Consultoria', desc: 'Especialistas desenhando a melhor operacao.' },
      { title: 'Integracoes & APIs', desc: 'Conectado aos sistemas que voce ja usa.' },
      { title: 'IA & automacoes', desc: 'Inteligencia e fluxos sob medida.' },
      { title: 'Chatbots', desc: 'Bots que atendem com a cara da sua marca.' },
      { title: 'Treinamento', desc: 'Sua equipe usando de verdade, com seguranca.' },
      { title: 'Suporte especializado', desc: 'Gente de verdade, no seu idioma e fuso.' },
      { title: 'Evolucao continua', desc: 'Melhoria constante, lado a lado com voce.' },
    ],
    closing: 'Nao somos so um software de atendimento. Somos o seu parceiro de transformacao digital.',
  },

  segments: {
    eyebrow: 'Para o seu segmento',
    title: 'Feito para a realidade do seu negocio',
    subtitle: 'Selecione um segmento e veja como o Omni Headers se encaixa.',
    items: [
      { id: 'varejo', label: 'Varejo', gain: 'Atenda, venda e fidelize pelo WhatsApp sem perder cliente.' },
      { id: 'ecommerce', label: 'E-commerce', gain: 'Do carrinho ao pos-venda, tudo numa conversa so.' },
      { id: 'saude', label: 'Saude & Clinicas', gain: 'Confirme consultas e reduza faltas, automaticamente.' },
      { id: 'servicos', label: 'Servicos', gain: 'Orcamentos e agendamentos rapidos, sem telefone.' },
      { id: 'educacao', label: 'Educacao', gain: 'Capte alunos e atenda responsaveis em escala.' },
      { id: 'franquias', label: 'Franquias & multi-unidade', gain: 'Padronize o atendimento com visao de todas as unidades.' },
    ],
  },

  testimonials: {
    eyebrow: 'Quem usa, aprova',
    title: 'Historias de quem organizou o atendimento',
    subtitle: 'Espaco reservado para depoimentos e casos reais de clientes.',
    placeholder: 'Depoimento em breve',
    placeholderRole: 'Cliente Omni Headers',
  },

  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Tudo que voce precisa saber antes da demo',
    items: [
      {
        q: 'Quanto tempo leva para implantar?',
        a: 'A Headers conduz a implantacao no seu ritmo. O prazo depende dos canais e integracoes — definimos tudo na demonstracao.',
      },
      {
        q: 'Funciona com o WhatsApp que ja uso?',
        a: 'Sim. Conectamos seu numero pela API oficial do WhatsApp, com seguranca e sem perder seu historico.',
      },
      {
        q: 'Preciso trocar de numero?',
        a: 'Nao. Mantemos o seu numero e centralizamos o atendimento de toda a equipe nele.',
      },
      {
        q: 'A IA atende em portugues?',
        a: 'Sim. A IA e treinada com o contexto do seu negocio e responde em portugues, no tom da sua marca.',
      },
      {
        q: 'Voces treinam minha equipe?',
        a: 'Treinamos. Sua equipe aprende a usar a plataforma de verdade, com acompanhamento da Headers.',
      },
      {
        q: 'E o suporte, como funciona?',
        a: 'Suporte especializado da Headers, com gente de verdade no seu idioma e fuso — e evolucao continua da operacao.',
      },
      {
        q: 'Meus dados ficam seguros (LGPD)?',
        a: 'Sim. Seguimos as boas praticas de seguranca e privacidade exigidas pela LGPD.',
      },
    ],
  },

  finalCta: {
    eyebrow: 'Vamos comecar?',
    title: 'Vamos organizar o seu atendimento?',
    subtitle: 'O cafe e por nossa conta. Mostramos a plataforma funcionando no seu cenario, sem compromisso.',
    note: 'Resposta rapida · Sem compromisso · Demonstracao personalizada',
  },

  footer: {
    tagline: 'Atendimento omnichannel com IA, implantado e cuidado pela Headers.',
    madeBy: 'Um produto Headers',
    columns: [
      {
        title: 'A apresentação',
        links: [
          { label: 'Sua operação hoje', href: '#problema' },
          { label: 'A equipe atende junta', href: '#solucao' },
          { label: 'Inteligência artificial', href: '#inteligencia-artificial' },
          { label: 'Indicadores', href: '#dashboards' },
        ],
      },
      {
        title: 'A Headers',
        links: [
          { label: 'Como implantamos', href: '#solucao-headers' },
          { label: 'Agendar demonstração', href: '#contato' },
        ],
      },
    ],
    legal: ['Politica de Privacidade', 'Termos de Uso', 'LGPD'],
    rights: 'Todos os direitos reservados.',
  },

  demoPage: {
    eyebrow: 'Agendar demonstracao',
    title: 'Veja o Omni Headers funcionando no seu cenario',
    subtitle: 'Preencha e um especialista da Headers entra em contato para agendar a sua demonstracao.',
    fields: {
      name: 'Seu nome',
      company: 'Empresa',
      email: 'E-mail corporativo',
      phone: 'WhatsApp',
      segment: 'Segmento',
      message: 'Conte rapidamente seu desafio (opcional)',
    },
    submit: 'Quero agendar a demonstracao',
    aside: [
      'Demonstracao personalizada para o seu negocio',
      'Sem compromisso e sem custo',
      'Conducao por especialistas da Headers',
    ],
    placeholderNotice: 'Formulario de exemplo — integracao com o backend sera configurada na proxima fase.',
  },

  thankYou: {
    title: 'Recebemos o seu pedido!',
    subtitle: 'Um especialista da Headers vai falar com voce em breve para agendar a demonstracao.',
    back: 'Voltar para o inicio',
    whatsappCta: 'Prefere agora? Fale no WhatsApp',
  },

  notFound: {
    title: 'Pagina nao encontrada',
    subtitle: 'O endereco que voce procurou nao existe ou foi movido.',
    back: 'Voltar para o inicio',
  },
} as const

export default ptBR
