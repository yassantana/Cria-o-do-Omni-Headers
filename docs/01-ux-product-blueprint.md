# Omni Headers — Blueprint de Experiência & Produto

> **Etapa 2 — Planejamento.** Documento de design de experiência (UX/UI/Product/Marketing/CRO).
> Nenhuma linha de interface foi escrita. Este é o mapa que o código vai seguir na etapa 3.
>
> Autoria conceitual: UX Sênior · UI Sênior · Product Designer · Marketing SaaS · CRO.
> Mercado-alvo: Brasil (pt-BR). Idioma do site: Português do Brasil.

---

## 0. Resumo estratégico (a base de tudo)

### 0.1 O que é o Omni Headers
Plataforma de **atendimento omnichannel com IA** que reúne WhatsApp, Instagram, Facebook,
Telegram, e-mail e chat do site em **uma única caixa de entrada**, com automações, bots e um
agente de IA. É um **produto da Headers** — entregue com implantação, integrações, treinamento
e suporte local (Fortaleza/CE, atendimento Brasil).

> **Regra de marca inquebrável:** o motor por baixo (Chatwoot) é **base técnica**, nunca o
> protagonista. O site nunca diz "Chatwoot". O protagonista é o **Omni Headers** e o cuidado
> humano da Headers em cima dele.

### 0.2 Posicionamento (uma frase)
> **"Todo o atendimento da sua empresa em um só lugar — com inteligência artificial e gente de
> verdade cuidando de tudo."**

O diferencial não é "ter uma ferramenta". É **ferramenta + Headers**: implantação feita por
especialistas, integrada aos sistemas que a empresa já usa, com IA configurada para o negócio,
time treinado e suporte que responde. Esse é o fosso competitivo (o "moat").

### 0.3 Para quem (ICPs / personas)
| # | Persona | Dor central | Gatilho de conversão |
|---|---|---|---|
| P1 | **Dona/gestor de PME** (varejo, e-commerce, serviços) com volume alto de WhatsApp | "Vários celulares, mensagens perdidas, nenhum controle" | Quer organização e não perder venda |
| P2 | **Operação multi-unidade / franquia / multi-atendente** | "Cada loja atende de um jeito, zero visibilidade" | Centralização + relatórios |
| P3 | **Líder de CX/Suporte** que quer IA e automação sem complexidade enterprise | "Equipe afogada em repetição" | IA + automação que reduz fila |
| P4 | **Clínicas / saúde / educação** (segmentos Headers) | "Agendamento e atendimento manual, lento" | Automação + integração com sistema atual |

**Estado mental do visitante:** desconfiado de promessa de tecnologia, com medo de implantação
demorada/cara e de "ficar na mão". O site precisa vender **resultado + segurança**, não features.

### 0.4 Objetivo de conversão (modelo escolhido)
Headers é consultiva ("diagnóstico", "cafezinho"). O produto exige implantação. Portanto o site é
**sales-assisted (lead-gen), não self-service puro**:

- **Macro-conversão (primária):** **Agendar demonstração** / **Falar com especialista**.
- **Conversão expressa (atrito mínimo):** **Falar no WhatsApp** (canal nativo do público BR).
- **Micro-conversões:** ver planos, baixar material, ver demo em vídeo, calcular economia.

> ⚠️ **Decisão a confirmar com o cliente** (ver §14): existe **teste grátis self-service**? Se sim,
> adicionamos CTA "Começar grátis" como primária para P1/P3. Por ora o blueprint assume
> **demo-led** com WhatsApp como atalho.

### 0.5 Tom de voz
Herda a alma da Headers: **profissional, claro, sem jargão, caloroso e brasileiro**. Confiante, mas
"de gente para gente" — o "cafezinho" como assinatura. Frases curtas. Verbo no presente. Foco em
"você/sua equipe/seus clientes". Zero termo técnico gratuito.

### 0.6 Princípios de design (norteiam todas as telas)
1. **Clareza acima de tudo** — em 5 segundos o visitante entende o que é e para quem é.
2. **Mostrar, não contar** — toda feature aparece como demo visual da plataforma, não como texto.
3. **Confiança em cada dobra** — prova social, números e "feito pela Headers" recorrentes.
4. **Movimento com propósito** — animação que explica (canais convergindo, IA respondendo), nunca
   enfeite. Tudo respeita `prefers-reduced-motion`.
5. **Brasil-first** — WhatsApp no centro, linguagem local, exemplos de negócios reais daqui.
6. **Uma história, não uma lista** — o scroll é um roteiro com começo, tensão, virada e desfecho.

---

## 1. A jornada completa do visitante

Da chegada ao CTA final — estado mental, o que vê, e o micro-objetivo de cada momento.

| Fase | Onde está | Mentalidade | O que o site entrega | Micro-objetivo |
|---|---|---|---|---|
| **1. Chegada** | Hero (1ª dobra) | "O que é isso e serve pra mim?" | Promessa clara + canais reconhecíveis + CTA | Reter (não fazer ele dar "voltar") |
| **2. Identificação** | Prova social + Problema | "Esse é o meu problema mesmo" | Espelha o caos atual dele | Gerar o "é isso!" |
| **3. Esperança** | Solução / inbox unificada | "Será que resolve?" | A virada: tudo em um lugar | Mostrar o "depois" |
| **4. Entendimento** | Features / como funciona | "Como funciona na prática?" | Demos visuais de cada capacidade | Tornar concreto |
| **5. Encantamento** | Demo interativa + IA | "Caramba, é bonito e esperto" | Plataforma viva, IA respondendo | Desejo |
| **6. Confiança** | Diferenciais Headers + cases | "Dá pra confiar em quem entrega?" | Implantação, suporte, casos reais | Reduzir risco |
| **7. Racionalização** | Resultados + segmentos + integrações | "Funciona no meu setor? Com meus sistemas?" | Números, casos por segmento, integrações | Justificar pra si (e pro chefe) |
| **8. Decisão** | Planos + FAQ | "Quanto custa? E se der errado?" | Planos + quebra de objeções | Remover últimas barreiras |
| **9. Ação** | CTA final + Footer | "Ok, vamos conversar" | Convite caloroso + WhatsApp | Converter |

**Princípio CRO da jornada:** cada fase responde **a próxima pergunta** que nasce na cabeça do
visitante. Nunca pedimos a ação (CTA forte) antes de ter pago a "conta de confiança" daquele ponto.
CTAs aparecem **3 vezes** ao longo do scroll (hero, meio após a demo, fim), além do botão fixo no
header — sempre perto de uma prova.

---

## 2. Arquitetura do site

### 2.1 Escopo (fase atual)
Foco: **uma landing page de alta conversão** (long-scroll, narrativa única) + páginas de apoio
mínimas. Não é um portal com dezenas de páginas — é um funil bem contado.

```
Omni Headers (site)
│
├─ / .................... Home / Landing (a história completa — o coração)
│
├─ /planos ............. Planos & preços (detalhe; âncora #planos também vive na Home)
├─ /demonstracao ....... Agendar demonstração (formulário de lead) — destino do CTA primário
├─ /obrigado .......... Confirmação pós-conversão (thank-you + próximos passos)
│
├─ (futuro) /recursos/* . Páginas profundas por recurso (IA, automação, canais) — fase posterior
├─ (futuro) /segmentos/* . Landing por segmento (varejo, saúde, e-commerce) — fase posterior
├─ (futuro) /blog ....... Conteúdo/SEO — fase posterior
│
├─ /404 ............... Não encontrado
└─ /403 ............... (reservado)
```

> A Home é construída por **seções** (camada `sections/`) montadas na **página** `Home`
> (camada `pages/`). Páginas de apoio reaproveitam Header/Footer e componentes.

### 2.2 Hierarquia de navegação (information architecture)
- **Nível 1 (header):** Recursos · Como funciona · Segmentos · Planos · Contato → + CTA.
- **Nível 2 (âncoras internas da Home):** rolagem suave para `#recursos`, `#como-funciona`,
  `#planos`, etc. (scroll-spy destaca a seção ativa).
- **Nível 3 (footer):** mapa completo + institucional + legal + família Headers.

---

## 3. Todas as seções, em ordem (o núcleo do documento)

Para **cada seção**: objetivo (#4) · conteúdo (#5) · animações (#6) · CTA (#7) · ilustrações (#10) ·
gráficos (#11) · cards (#12) · demo da plataforma (#13).

---

### S0 · Top bar de anúncio (opcional, dispensável)
- **Objetivo:** comunicar uma oferta/novidade sem roubar o hero. Ex.: "Novo: agente de IA Captain
  em português 🇧🇷".
- **Conteúdo:** 1 frase + link. Fechável (lembra a escolha).
- **Animação:** slide-down sutil na 1ª carga; some ao fechar.
- **CTA:** texto-link discreto ("Saiba mais →").
- **Cards/gráficos/ilustração:** nenhum.

---

### S1 · Header / Navbar (global, fixo)
- **Objetivo:** orientar + manter o CTA sempre a um clique.
- **Conteúdo:** logo Omni Headers · menu (Recursos, Como funciona, Segmentos, Planos, Contato) ·
  **CTA primário "Agendar demonstração"** · atalho **WhatsApp** (ícone).
- **Animação:** transparente sobre o hero → ganha fundo sólido + sombra ao rolar (shrink/condense);
  underline animado nos itens; menu mobile abre em drawer com stagger.
- **CTA:** "Agendar demonstração" (sólido) + ícone WhatsApp.
- **Ilustração:** logotipo/símbolo "omni" (anel/órbita — ver §6).
- **Cards:** mega-menu opcional em "Recursos" (cards de recurso com ícone).

---

### S2 · Hero (1ª dobra) — *a promessa*
- **Objetivo:** em 5s comunicar **o quê, pra quem, por quê e o próximo passo**. É a seção mais
  importante para conversão.
- **Conteúdo:**
  - **Eyebrow:** "Atendimento omnichannel com IA · por Headers".
  - **Headline (H1):** *"Todo o atendimento da sua empresa em um só lugar."*
  - **Subhead:** *"WhatsApp, Instagram, e-mail e chat na mesma caixa de entrada — com IA e
    automação que respondem rápido, e a Headers cuidando da implantação."*
  - **CTAs:** primário **"Agendar demonstração"** · secundário **"Falar no WhatsApp"**.
  - **Faixa de confiança (micro):** "Canais oficiais" + linha de logos dos canais; selo
    "Implantação e suporte Headers".
- **Demo da plataforma (#13):** à direita/abaixo, **mockup da inbox unificada** com conversas de
  vários canais chegando; uma mensagem nova "pinga" e o badge do canal aparece. É o primeiro
  vislumbre do produto vivo.
- **Animação (#6):** headline com **mask/blur reveal** palavra a palavra; **órbita de canais** —
  ícones de WhatsApp/Instagram/e-mail/chat girando e **convergindo** para a inbox (metáfora do
  "omni"); cursor-follow de um gradiente suave no fundo; entrada com fade-rise em stagger.
- **Ilustração (#10):** anel/órbita "omni" + glyphs de canal; blobs de gradiente ao fundo.
- **Gráfico (#11):** mini-indicador "tempo de resposta ↓" como teaser (animado discretamente).
- **Cards (#12):** nenhum dominante; só os "chips" de canal.

---

### S3 · Barra de prova social / canais — *credibilidade instantânea*
- **Objetivo:** confiança em < 3 segundos logo após o hero (princípio CRO).
- **Conteúdo:** "Empresas que já centralizaram o atendimento" + **logos de clientes** (ou, enquanto
  não houver, **logos dos canais integrados** + 1 número forte: "+X mil conversas/mês organizadas").
- **Animação:** **marquee** lento e infinito (logos deslizando), com fade nas bordas; logos em
  grayscale que ganham cor no hover.
- **CTA:** nenhum (seção de respiro/confiança).
- **Ilustração:** logos.
- **Cards/gráficos:** opcional 1 stat-card.

---

### S4 · O problema — *agitação da dor*
- **Objetivo:** fazer o visitante se reconhecer no caos atual (identificação → "é isso!").
- **Conteúdo:** "Atender em todo canal virou uma bagunça?" + lista visual das dores:
  vários celulares, mensagens sem resposta, cliente repetindo a história, zero relatório, equipe
  perdida. Texto curto e empático.
- **Demo (#13):** **antes/depois** — o "antes" mostrado como vários balões de chat bagunçados,
  notificações vermelhas, telefones espalhados.
- **Animação:** ícones de caos entrando "tremidos"/desordenados; números de "não lidas" subindo;
  contraste proposital com a calma da próxima seção. Scroll-reveal.
- **CTA:** nenhum (ainda criando tensão).
- **Ilustração (#10):** cena ilustrada do "caos" (telefones, balões, alertas).
- **Cards (#12):** **3–5 "cards de dor"** (ícone + dor), em tom acinzentado/alerta.
- **Gráfico (#11):** opcional — barrinha "mensagens perdidas" alta (vermelha).

---

### S5 · A virada / solução — *o alívio*
- **Objetivo:** apresentar a grande ideia: **uma caixa de entrada para tudo**. Momento de alívio
  visual e emocional (a "luz no fim").
- **Conteúdo:** "Respire. Agora é tudo em um lugar só." + parágrafo curto da solução.
- **Demo (#13):** **a inbox unificada se montando** — os canais bagunçados da S4 **convergem** e se
  organizam numa timeline única e calma; um atendente assume a conversa.
- **Animação:** transição coreografada do caos (S4) para a ordem; os balões espalhados "voam" para
  dentro da inbox; paleta vira azul/calma. **Sticky/pinned scroll** possível aqui (a inbox se
  organiza conforme rola).
- **CTA:** texto-link suave "Veja como funciona ↓".
- **Ilustração:** transição caos→ordem.
- **Cards:** nenhum (foco no demo).

---

### S6 · Recursos principais / "Como funciona" — *o entendimento*
- **Objetivo:** explicar as capacidades centrais de forma concreta e visual.
- **Conteúdo (pilares):**
  1. **Caixa de entrada unificada** — todos os canais, uma tela.
  2. **IA que atende (Captain)** — responde dúvidas comuns, sugere respostas, resume conversas.
  3. **Automação & bots** — fluxos, respostas prontas, distribuição inteligente, horários.
  4. **Contatos & histórico (CRM leve)** — perfil do cliente e toda a conversa em um lugar.
  5. **Relatórios & métricas** — volume, tempo de resposta, satisfação, por canal/atendente.
  6. **App + multiequipe** — atender de qualquer lugar, com times e permissões.
- **Layout:** **bento grid** (blocos de tamanhos diferentes) OU seções alternadas
  texto/visual (zig-zag). Recomendo **bento** para o overview + alternado para aprofundar 2–3.
- **Demo (#13):** cada bloco traz um **micro-demo** real do recurso (mini-inbox, IA digitando,
  fluxo de bot, gráfico).
- **Animação (#6):** cards entram em **stagger**; ao entrar no viewport, o micro-demo "ganha vida"
  (IA digita com efeito typewriter; números contam; toggle de canais alterna sozinho). Hover com
  leve tilt/elevação.
- **CTA:** secundário ao fim do bloco: "Ver tudo que a plataforma faz" / "Agendar demonstração".
- **Ilustração (#10):** ícones próprios e spots por recurso.
- **Gráfico (#11):** mini-charts dentro dos cards de "Relatórios" e "IA".
- **Cards (#12):** **cards de recurso** (ícone + título + 1 linha + micro-demo).

---

### S7 · Demonstração interativa da plataforma — *o encantamento*
- **Objetivo:** o momento "uau". Mostrar a plataforma **viva**, próxima do real, gerando desejo.
- **Conteúdo:** uma **maquete grande e fiel** da interface, com:
  - **seletor de canais** (clica em WhatsApp/Instagram/e-mail e a conversa troca);
  - **timeline unificada** mostrando o mesmo cliente em canais diferentes virando **uma conversa**;
  - **IA Captain** redigindo uma resposta em tempo real;
  - painel lateral com dados do contato.
- **Padrão de interação:** **sticky scroll storytelling** — a maquete fica fixa enquanto legendas à
  lateral avançam ("1. Tudo chega aqui" → "2. A IA já responde" → "3. Você assume com um clique").
- **Animação (#6):** scroll-linked (a tela do produto reage ao scroll); typewriter da IA; troca de
  canal com cross-fade; "ping" de mensagem nova; cursor fantasma demonstrando cliques.
- **CTA:** **primário forte logo após** ("Quero ver isso no meu negócio → Agendar demonstração"),
  porque o desejo está no pico (princípio CRO: CTA junto da prova de valor).
- **Demo (#13):** **esta seção É a demo central** — a peça visual mais cara/caprichada do site.
- **Ilustração:** moldura de browser/app; cursor fantasma.
- **Cards:** "passos" como cards-legenda que acendem conforme o scroll.

---

### S8 · Diferenciais Headers — *a confiança (o moat)*
- **Objetivo:** responder "qualquer um tem ferramenta — por que VOCÊS?". É o que separa o Omni
  Headers de um software cru.
- **Conteúdo (os 5 diferenciais):**
  1. **Implantação feita por especialistas** — você não fica sozinho ligando fios.
  2. **Integrações com o que você já usa** — ERP, CRM, e-commerce, agenda.
  3. **IA configurada pro seu negócio** — treinada com o seu contexto, em português.
  4. **Treinamento da sua equipe** — gente usando de verdade, não manual esquecido.
  5. **Suporte que responde** — Headers, Fortaleza/Brasil, no seu fuso e no seu idioma.
- **Mensagem-âncora:** *"A ferramenta é poderosa. A diferença é ter a Headers do seu lado."*
- **Animação:** cards em stagger; ícone de cada diferencial com micro-animação (linha sendo
  conectada, escudo formando, etc.); selo "feito pela Headers" com leve brilho.
- **CTA:** "Converse com um especialista" (tom cafezinho).
- **Ilustração (#10):** selo/assinatura Headers; ícone de "aperto de mão"/parceria.
- **Cards (#12):** **5 cards de diferencial** (ícone + título + 1 linha).
- **Gráfico:** nenhum (é seção emocional/confiança).

---

### S9 · Segmentos / casos de uso — *"funciona no meu setor?"*
- **Objetivo:** auto-identificação por mercado (varejo, e-commerce, clínicas, serviços,
  multi-unidade/franquias, educação) — reaproveita os segmentos da Headers.
- **Conteúdo:** card por segmento com **a dor e o ganho específicos** ("Clínicas: confirme consultas
  e reduza faltas pelo WhatsApp, automático").
- **Interação:** **tabs** ou grid filtrável; ao escolher um segmento, o exemplo/visual muda.
- **Animação:** troca de tab com cross-fade; ícones por segmento; números do segmento contam.
- **CTA:** "Ver caso do meu segmento" / "Falar com especialista".
- **Ilustração (#10):** ícone/cena por segmento.
- **Cards (#12):** **cards de segmento** (ícone + setor + ganho).
- **Gráfico:** opcional, 1 stat por segmento.

---

### S10 · Resultados & números — *a racionalização*
- **Objetivo:** provar valor com métricas (justificativa lógica para o "sim").
- **Conteúdo:** indicadores como **tempo de 1ª resposta ↓**, **% de conversas resolvidas pela IA**,
  **satisfação (CSAT) ↑**, **conversas centralizadas/mês**, **atendentes por operação**. (Números a
  validar com cases reais — ver §14.)
- **Animação (#6):** **count-up** dos números ao entrar no viewport; barras/linhas que "crescem";
  comparativo **antes × depois** animado.
- **CTA:** nenhum forte (deixa o número falar) — ou link "Ver casos".
- **Gráfico (#11):**
  - **Barras**: volume por canal.
  - **Linha**: tempo de resposta antes × depois.
  - **Donut/anel**: distribuição de canais.
  - **Gauge/contador**: % automatizado, CSAT.
- **Cards (#12):** **stat-cards** (número grande + rótulo + ícone de tendência).
- **Ilustração:** discreta (fundos de dado).

---

### S11 · Integrações — *"conversa com meus sistemas?"*
- **Objetivo:** remover a objeção técnica ("não vou ter que trocar tudo").
- **Conteúdo:** canais oficiais (WhatsApp API, Instagram, Facebook, Telegram, e-mail, chat) +
  categorias de integração (ERP, CRM, e-commerce, planilhas, agenda) + "e o que faltar, a Headers
  integra".
- **Animação:** **grid de logos** com hover (cor + tooltip); linhas conectando logos a um hub
  central "Omni Headers" (constelação/órbita); reveal em stagger.
- **CTA:** "Não achou o seu? Fale com a gente."
- **Ilustração (#10):** diagrama hub-and-spoke (Omni Headers no centro, sistemas ao redor).
- **Cards (#12):** **cards de integração** (logo + nome + categoria).
- **Gráfico:** o próprio diagrama de conexões.

---

### S12 · Depoimentos / cases — *prova social profunda*
- **Objetivo:** confiança emocional via terceiros (gente como o visitante).
- **Conteúdo:** depoimentos com **nome, cargo, empresa, foto** + resultado concreto; opcional case
  em destaque com métrica ("reduziu o tempo de resposta de 2h para 4min").
- **Animação:** **carrossel** com auto-play suave + controles; aspas/quote com reveal; foto com leve
  zoom no ativo.
- **CTA:** "Quero esse resultado → Agendar demonstração".
- **Ilustração:** aspas decorativas; avatares.
- **Cards (#12):** **cards de depoimento** + **card de case em destaque** (com gráfico do resultado).
- **Gráfico (#11):** mini-gráfico de resultado no case destaque.

> ⚠️ Depende de material real do cliente (ver §14). Sem isso, usamos placeholders honestos e
> destacamos canais/diferenciais.

---

### S13 · Planos & preços — *a decisão*
- **Objetivo:** transformar interesse em conversa de compra; ancorar valor.
- **Conteúdo:** **3 planos** (ex.: *Essencial · Profissional[destaque] · Sob medida/Enterprise*) com
  benefícios por nível. Como é **implantação + serviço**, recomendo **"a partir de" + CTA de
  conversa** em vez de checkout. **Toggle mensal/anual** se houver. Reforço: "implantação e
  treinamento inclusos".
- **Animação:** **toggle** com transição de preço (count); card central "Profissional" elevado e em
  destaque; hover com leve elevação; selo "mais escolhido".
- **CTA:** por card — "Agendar demonstração" / "Falar no WhatsApp"; no Enterprise — "Falar com
  vendas".
- **Cards (#12):** **3 pricing-cards** (nome, preço/“a partir de”, lista de benefícios com checks,
  CTA). Destaque visual no recomendado.
- **Ilustração:** discreta; ícones de check.
- **Gráfico:** tabela comparativa (opcional, expansível).

> ⚠️ **Confirmar:** mostrar preço público? quais valores/planos? (ver §14). Default: "a partir de" +
> tabela comparativa, sem checkout.

---

### S14 · FAQ — *quebra de objeções*
- **Objetivo:** dissolver as últimas dúvidas/medos antes do CTA final.
- **Conteúdo (perguntas que convertem):** "Quanto tempo leva pra implantar?", "Funciona com o
  WhatsApp que já uso?", "Preciso trocar meu número?", "Tem fidelidade?", "É a API oficial do
  WhatsApp?", "Vocês treinam minha equipe?", "E o suporte, como é?", "Meus dados ficam seguros
  (LGPD)?".
- **Animação:** **acordeão** com expand/collapse suave (altura animada); ícone +/− que rotaciona.
- **CTA:** ao final — "Ainda com dúvida? Chama no WhatsApp."
- **Cards (#12):** **itens de acordeão** (pergunta → resposta).
- **Ilustração/gráfico:** nenhum (foco em texto e clareza).

---

### S15 · CTA final — *o fechamento (o cafezinho)*
- **Objetivo:** a conversão principal, no auge da confiança acumulada.
- **Conteúdo:** headline calorosa — *"Vamos organizar seu atendimento? O café é por nossa conta."* +
  subtexto curto + **CTA primário grande** + WhatsApp. Reforço de baixo risco ("Sem compromisso.
  Mostramos funcionando no seu cenário.").
- **Animação:** fundo com gradiente/órbita em movimento lento; botão com leve pulso/brilho; reveal
  do bloco inteiro ao entrar.
- **CTA:** **"Agendar demonstração"** (primário) + **"Falar no WhatsApp"**.
- **Ilustração (#10):** órbita "omni" fechando o ciclo visual aberto no hero (rima visual).
- **Cards/gráfico:** nenhum (foco total na ação).

---

### S16 · Footer — *navegação e institucional*
- **Objetivo:** orientar quem chegou ao fim, reforçar marca/contato, links legais.
- **Conteúdo:** logo + tagline · mapa do site (Recursos, Planos, Segmentos, Contato) · **contato
  real** (Fortaleza/CE, WhatsApp, e-mail) · redes sociais · **"Um produto Headers"** (assinatura da
  família) · LGPD/Política/Termos · © ano.
- **Animação:** reveal suave; ícones sociais com hover; botão "voltar ao topo".
- **CTA:** WhatsApp + "Agendar demonstração" (secundário) + newsletter (opcional).
- **Ilustração:** logo + selo Headers.

---

## 4. Como será a navegação (#8)

- **Header fixo (sticky)** com **scroll-spy**: o item do menu correspondente à seção visível fica
  destacado. Rolagem por âncora é **suave** (`scroll-behavior: smooth`, respeitando reduced-motion).
- **Estado do header:** transparente sobre o hero → condensa (fundo sólido + sombra + logo menor) ao
  rolar. CTA primário **sempre visível**.
- **Progresso de leitura:** barra fina de progresso no topo (opcional) reforça "história em
  andamento".
- **Mobile:** menu **hambúrguer → drawer** lateral/full-screen com itens em stagger, CTA e WhatsApp
  fixos no rodapé do drawer. Botão **WhatsApp flutuante** persistente (canto inferior).
- **Âncoras:** `#recursos`, `#como-funciona`, `#segmentos`, `#planos`, `#contato` — usadas pelo menu
  e por CTAs internos. Mapa central de rotas/âncoras já previsto em `src/router/paths.ts`.
- **Volta ao topo:** botão aparece após X de scroll.
- **Teclado/acessibilidade:** navegável por Tab, foco visível, "pular para o conteúdo", drawer
  fecha no Esc.

## 5. Como será o menu (#9)

- **Itens (nível 1):** **Recursos · Como funciona · Segmentos · Planos · Contato**.
- **CTA do menu:** **"Agendar demonstração"** (botão sólido) + **ícone WhatsApp**.
- **Mega-menu em "Recursos"** (desktop): painel com **cards** (Caixa unificada, IA Captain,
  Automação, Relatórios, Integrações, App) — ícone + nome + 1 linha. Abre com fade/slide.
- **"Segmentos"** pode abrir dropdown simples (lista de setores).
- **Comportamento:** hover (desktop) com underline animado; clique rola para a âncora; item ativo
  destacado por scroll-spy.
- **Mobile:** drawer com acordeão para "Recursos/Segmentos"; CTA + WhatsApp sempre acessíveis.
- **Logo:** à esquerda; clique volta ao topo.

---

## 6. CTAs — sistema completo (#7)

| CTA | Texto | Tipo | Onde aparece | Destino |
|---|---|---|---|---|
| **Primário** | **Agendar demonstração** | Botão sólido (cor de marca) | Header (fixo), Hero, pós-demo S7, CTA final, Planos | `/demonstracao` (form) |
| **Expresso** | **Falar no WhatsApp** | Botão contorno + ícone | Header, Hero, Diferenciais, FAQ, CTA final, Footer, botão flutuante | `wa.me/55…` |
| **Secundário** | Ver planos / Ver demonstração | Link/texto | Hero (opcional), fim de seções | `#planos` / vídeo |
| **Micro** | Saiba mais ↓ / Ver tudo | Link suave | Entre seções | âncora |
| **Tab/toggle** | Mensal ↔ Anual; segmentos | Controle | Planos, Segmentos | interno |

**Regras CRO:**
- **1 ação primária dominante** por dobra — nunca competir dois botões fortes.
- CTA forte **sempre depois de uma prova** (demo, número, depoimento), nunca antes.
- **Hierarquia visual consistente:** primário = preenchido vibrante; expresso = contorno;
  secundário = texto.
- **Microcopy de baixo risco** junto ao botão ("sem compromisso", "mostramos no seu cenário").
- **WhatsApp** como rota de menor atrito para o público brasileiro, sempre disponível.

---

## 7. Ilustrações necessárias (#10)

Estilo recomendado: **moderno, geométrico, com gradientes de marca**, leve toque 3D/glow; coerente,
nada de clipart genérico. Catálogo:

1. **Símbolo "Omni"** — anel/órbita (representa "todos os canais ao redor de um centro"). Base do
   logo e elemento recorrente (hero, CTA final → rima visual).
2. **Glyphs de canal** — WhatsApp, Instagram, Facebook, Telegram, e-mail, chat (estilo unificado).
3. **Cena do caos (S4)** — telefones, balões e alertas desorganizados (tom acinzentado/alerta).
4. **Cena da ordem (S5)** — os mesmos elementos organizados na inbox (tom azul/calma).
5. **Ícones de recurso** (S6) — inbox, IA/cérebro, fluxo/bot, contato, gráfico, app.
6. **Selo "Feito pela Headers"** / assinatura de parceria (S8, footer).
7. **Ícones de segmento** (S9) — varejo, saúde, e-commerce, serviços, educação, multi-unidade.
8. **Diagrama de integrações** (S11) — hub-and-spoke "constelação".
9. **Cursor fantasma / moldura de app & browser** (S7) — para os demos.
10. **Blobs/gradientes & grid de fundo** — atmosfera, profundidade, sem ruído.
11. **Avatares & aspas** (S12) — depoimentos (fotos reais quando houver).
12. **Spot do café** (S15) — referência sutil ao "cafezinho" da Headers.

> Formatos: **SVG** para ícones/símbolos (nítidos, animáveis, leves); **Lottie** para animações
> ricas pontuais; **PNG/WebP** otimizados só quando necessário. Tudo vive em `src/assets/`.

---

## 8. Gráficos / dataviz (#11)

Todos **ilustrativos e animados** (entram com o scroll), com números a validar:

| Gráfico | Onde | O que mostra |
|---|---|---|
| **Barras** | S10, S6 (card) | Volume de conversas por canal |
| **Linha (antes×depois)** | S10 | Queda do tempo de 1ª resposta |
| **Donut / anel** | S10 | Distribuição de atendimento por canal |
| **Gauge / contador** | Hero, S10 | CSAT, % resolvido pela IA, % automatizado |
| **Count-up (números)** | S3, S9, S10 | Métricas-chave com animação de contagem |
| **Mini-sparklines** | Cards de recurso/case | Tendência rápida |
| **Diagrama de conexões** | S11 | Integrações ligadas ao hub Omni Headers |
| **Mini-gráfico de case** | S12 | Resultado do depoimento em destaque |

Princípio: **gráfico conta uma história em 1 segundo** — rótulos claros, cores de marca, nada de
excesso de eixos. Acessíveis (não depender só de cor; ter rótulo textual).

---

## 9. Cards — catálogo (#12)

| Tipo de card | Seção | Composição |
|---|---|---|
| **Card de dor** | S4 | Ícone + dor (tom alerta) |
| **Card de recurso** | S6 / mega-menu | Ícone + título + 1 linha + micro-demo |
| **Card-legenda (passo)** | S7 | Número + título + descrição (acende no scroll) |
| **Card de diferencial** | S8 | Ícone + título + 1 linha (assinatura Headers) |
| **Card de segmento** | S9 | Ícone + setor + ganho específico |
| **Stat-card** | S10 / S3 | Número grande + rótulo + tendência |
| **Card de integração** | S11 | Logo + nome + categoria |
| **Card de depoimento** | S12 | Foto + nome/cargo/empresa + citação |
| **Card de case (destaque)** | S12 | Logo + resultado + mini-gráfico |
| **Pricing-card** | S13 | Plano + preço + benefícios (checks) + CTA (1 em destaque) |
| **Item de acordeão (FAQ)** | S14 | Pergunta → resposta |

Padrão visual comum: cantos arredondados (token `--radius-lg`), borda sutil, fundo `--color-surface`,
hover com elevação/tilt leve, ícone no topo. Consistência > variedade.

---

## 10. Demonstrações visuais da plataforma (#13)

O site **mostra o produto funcionando** — esse é o coração do encantamento:

1. **Mini-inbox no hero** — vislumbre: conversas de vários canais, mensagem nova "pinga".
2. **Antes×Depois (S4→S5)** — caos de canais convergindo e se organizando na inbox unificada.
3. **Demo interativa central (S7)** — maquete fiel: seletor de canais, **timeline unificada** do
   mesmo cliente, **IA Captain redigindo**, painel de contato; conduzida por **sticky scroll**.
4. **Micro-demos nos cards (S6)** — cada recurso com sua amostra (IA digitando, fluxo de bot,
   gráfico, troca de canal).
5. **Builder de automação/bot (glimpse)** — pequeno fluxo (nós conectados) animando.
6. **App mobile (moldura)** — atender de qualquer lugar; notificação chegando.
7. **Dashboard de métricas** — números e gráficos "ao vivo" (S10).

> Todos são **maquetes em HTML/CSS/SVG** (não prints estáticos): nítidos, animáveis, leves e
> responsivos. Nada de "Chatwoot" visível — UI com a marca **Omni Headers**.

---

## 11. O fluxo da história — do 1º scroll ao CTA final (#14)

A narrativa é um arco clássico (problema → virada → prova → convite), em ato único:

```
HERO ───────────► "Existe um jeito de juntar tudo." (promessa + 1º vislumbre)
   │  prova social — "outros já fazem isso" (confiança rápida)
   ▼
PROBLEMA ───────► "Você vive esse caos?" (tensão, identificação)   ← vilão: a bagunça
   ▼
VIRADA ─────────► "Respire. Agora é um lugar só." (alívio)         ← herói: a inbox unificada
   ▼
RECURSOS ───────► "Veja como funciona." (entendimento concreto)
   ▼
DEMO INTERATIVA ► "Olha funcionando." (encantamento → PICO DE DESEJO) ──► CTA forte aqui
   ▼
DIFERENCIAIS ───► "E quem entrega é a Headers." (confiança/segurança) ← o aliado
   ▼
SEGMENTOS+NÚMEROS► "Funciona no seu caso, com seus números." (racionalização)
   ▼
INTEGRAÇÕES ────► "Conversa com o que você já usa." (remove objeção técnica)
   ▼
DEPOIMENTOS ────► "Gente como você aprovou." (prova social profunda)
   ▼
PLANOS + FAQ ───► "Cabe no seu bolso, sem risco." (decisão + objeções)
   ▼
CTA FINAL ──────► "Vamos tomar um café e organizar isso?" (ação, tom Headers)
   │  (a órbita "omni" do hero reaparece — o círculo se fecha)
   ▼
FOOTER ─────────► caminhos + contato + "um produto Headers"
```

**Curva emocional:** sobe no hero (esperança) → desce no problema (tensão) → sobe forte na
virada/demo (alívio + desejo) → estabiliza em confiança (diferenciais/prova) → fecha na ação. CTAs
fortes posicionados nos **picos de confiança/desejo** (hero, pós-demo, fim).

**Rimas visuais:** a **órbita de canais** abre (hero) e fecha (CTA final); a paleta vai de
**cinza/alerta** (problema) para **azul/calma** (solução) — o próprio site "resolve o caos" diante
dos olhos do visitante.

---

## 12. Direção de UI (cores · tipografia · motion · grid)

> Liga o blueprint ao código já criado (`src/styles/tokens.css`). Ajustaremos os tokens na fase 3.

- **Paleta (proposta):** base **navy escuro** + **azul Headers** como primária (parentesco com a
  marca-mãe) + **acento energético** (laranja/elétrico) para CTAs; neutros para texto/superfícies;
  verdes/âmbar/vermelho para estados. *(Confirmar se seguimos o azul Headers ou criamos identidade
  própria do Omni — ver §14.)* O `tokens.css` atual já traz a base; será calibrado.
- **Modo claro × escuro:** recomendo **hero/seções de impacto em dark** (premium, faz o produto
  brilhar) com seções de leitura podendo ser claras — ou dark consistente. A definir na UI.
- **Tipografia:** uma **sans geométrica/grotesk** para títulos (impacto) + **sans humanista** para
  texto (legibilidade) + **mono** para números/labels técnicos. (Famílias a escolher; tokens já
  preveem `--font-sans`/`--font-mono`.)
- **Motion (princípios):** durações 120–320ms; easing suave; entrada padrão = **fade + rise**;
  reveals por `IntersectionObserver`; scroll-linked apenas onde explica; **tudo desligável** via
  `prefers-reduced-motion`. Biblioteca sugerida: avaliar **Framer Motion / Motion** na fase 3
  (decisão de implementação, não agora).
- **Grid & espaço:** container máx. ~1200px (token já definido); escala de espaçamento de 4px;
  respiro generoso entre seções; ritmo vertical consistente.
- **Acessibilidade visual:** contraste AA+; foco visível; alvos de toque ≥ 44px; não depender só de
  cor.

---

## 13. Qualidade transversal (UX que não aparece, mas decide)

- **Responsividade:** mobile-first (público BR é majoritariamente mobile); breakpoints já em
  `constants`. Demos e gráficos com versões simplificadas no mobile.
- **Performance (impacta conversão e SEO):** lazy-load de imagens/seções abaixo da dobra; assets
  otimizados (SVG/WebP); animação em GPU; meta de LCP rápido no hero.
- **Acessibilidade:** semântica, navegação por teclado, ARIA onde preciso, legendas, reduced-motion.
- **SEO:** title/description, Open Graph (preview no WhatsApp!), dados estruturados, headings
  hierárquicos, alt em imagens, URL/âncoras limpas.
- **Confiança/LGPD:** menção a segurança e privacidade (FAQ + footer); selo/condução clara.
- **Consistência:** design system enxuto (tokens + componentes reutilizáveis) — escala sem virar
  colcha de retalhos.

---

## 14. Métricas de sucesso (instrumentação CRO)

- **Macro:** taxa de conversão visitante → demo agendada; visitante → clique no WhatsApp.
- **Micro:** scroll-depth por seção (onde abandonam), cliques por CTA, play da demo/vídeo, expansões
  de FAQ, alternância de planos.
- **Saúde do funil:** mapa de calor + gravação de sessão (avaliar Clarity/Hotjar na fase 3).
- **Testes A/B (futuro):** headline do hero, texto do CTA primário, ordem Planos×Depoimentos.

---

## 15-A. Addendum — Decisões finais aprovadas (2026-06-30)

O cliente aprovou o blueprint e fechou a direção. Mudanças que valem sobre tudo acima:

1. **Uso comercial:** o site é **ferramenta de venda** usada em apresentações — precisa vender a
   solução antes do vendedor falar. Visitante sai querendo **agendar demonstração**.
2. **100% Demo-Led:** **sem teste grátis, sem preços, sem comparação de planos.** A seção S13
   (Planos & preços) **sai do site**. Tudo conduz à demo.
   - **CTA primário:** **Agendar Demonstração.** **CTA secundário:** **Falar com um Especialista.**
3. **Posicionamento = solução completa, não software.** A plataforma é só uma parte. A Headers
   entrega: implantação, configuração personalizada, consultoria, integrações, APIs, IA, automações,
   chatbots, treinamento, suporte especializado, evolução contínua. Percepção desejada: **parceiro
   estratégico da transformação digital do atendimento**.
4. **Identidade visual:** parte da Headers como base, mas **Omni tem personalidade própria**.
   Aparência de **SaaS internacional premium**, não de site institucional. (Tokens calibrados:
   navy profundo + azul Headers como primária + gradiente assinatura azul→íris→ciano para a energia
   "omni/IA" + laranja Headers como toque humano/cafezinho.)
5. **Referências de UX:** Intercom, **Stripe, Linear, Notion**, Zendesk, HubSpot, Freshworks, Front,
   **Vercel**. Absorver qualidade, não copiar. (Easy Lite descartado — só o conceito de navegação
   intuitiva.)
6. **Comunicação 70% visual / 30% texto.** Sempre que der para trocar texto por representação
   visual, troca. Texto **complementa** a imagem, nunca o contrário. **Sem grandes blocos de texto.**
7. **Experiência premium:** quase toda seção tem elemento visual próprio — mockups exclusivos,
   dashboards ilustrados, fluxogramas, diagramas, timelines, bento grids, cards ilustrados,
   gráficos, motion design, scroll animations, hover effects, micro animações, conexões/linhas
   animadas.
8. **Mockups exclusivos do Omni Headers** (NUNCA print do Chatwoot). Mostrar visualmente: conversas,
   atendimento, WhatsApp/Instagram/Telegram/Facebook/E-mail/Chat do site, IA, bots, automações,
   dashboard, histórico, etiquetas, indicadores, SLA, performance, produtividade.
9. **Storytelling (ordem oficial):** Problema → Caos no atendimento → Centralização → Integrações →
   Inteligência Artificial → Automações → Dashboards → Resultados → Implantação pela Headers →
   Agendar demonstração. Cada seção prepara a próxima.
10. **Layout dinâmico:** cada seção com identidade própria; alternar bento grids, comparações,
    timelines, mockups, dashboards, cards, diagramas, fluxogramas, 2 colunas, grandes ilustrações,
    blocos assimétricos. Nunca repetir o mesmo padrão.
11. **Provas sociais / números / depoimentos / clientes:** **placeholders elegantes** — não inventar
    nada. Conteúdo real entra depois.
12. **Contatos:** placeholders (WhatsApp, e-mail, redes).
13. **Idioma:** pt-BR agora; **arquitetura pronta para i18n** (camada `src/i18n` + conteúdo
    centralizado por locale, troca de dicionário no futuro EN/ES).

> **Seção S13 (Planos & preços) fica REMOVIDA da v1.** Seu lugar no funil é ocupado pelo reforço da
> **solução completa Headers** + **FAQ** conduzindo ao CTA de demonstração.

---

## 15. Decisões pendentes (resolvidas no Addendum 15-A acima)

1. **Modelo de conversão:** demo-led (recomendado) **ou** existe **teste grátis self-service**?
   (muda o CTA primário).
2. **Preço público:** mostramos valores/planos reais, ou "a partir de" + "falar com vendas"?
3. **Identidade visual:** Omni Headers segue o **azul da Headers** (parentesco) ou ganha
   **identidade própria** (paleta/acento diferentes)? Há manual de marca/logo do Omni?
4. **Provas reais:** há **logos de clientes, depoimentos e números** que posso usar? (senão, uso
   placeholders honestos e foco em canais/diferenciais).
5. **WhatsApp/contatos:** confirmo número(s), e-mail e redes para os CTAs/footer (o institucional usa
   `wa.me/558540427747`, Fortaleza/CE).
6. **easylite.com.br:** o site bloqueou meu acesso — se ele é referência importante, me envie
   prints/descrição do que você gosta nele.
7. **Idioma:** só pt-BR agora, ou já prever estrutura para EN/ES?

---

*Fim do blueprint. Nenhuma interface foi construída — este documento é o roteiro da fase 3.*
