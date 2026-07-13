# Omni Headers

Site institucional **Omni Headers** — projeto independente, do zero, em **React + Vite + TypeScript**.

> Esta etapa entrega apenas a **arquitetura** do projeto. Nenhuma pagina foi desenvolvida ainda.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Build / Dev server | Vite 6 |
| UI | React 18 + TypeScript 5.7 |
| Roteamento | react-router-dom 6 |
| Estilos | CSS moderno com design tokens (CSS variables) |
| Lint / Format | ESLint 9 (flat config) + Prettier |
| Testes | Vitest + Testing Library + jsdom |

## Como rodar

Requisitos: **Node >= 18.18** (recomendado 20, ver `.nvmrc`).

```bash
npm install      # instala as dependencias
npm run dev      # ambiente de desenvolvimento (http://localhost:5180)
npm run build    # type-check + build de producao
npm run preview  # serve o build
```

Scripts auxiliares:

```bash
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run typecheck    # TypeScript sem emitir
npm test             # Vitest (run unico)
npm run test:watch   # Vitest em modo watch
```

## Estrutura de pastas

```
omni_headers/
├─ public/                 # estaticos servidos como /  (favicon, robots...)
├─ src/
│  ├─ assets/              # imagens, icones e fontes importados no bundle
│  ├─ components/          # UI reutilizavel e agnostica de contexto
│  │  ├─ ui/               #   primitivos visuais (Button, Input...)
│  │  ├─ layout/           #   estrutura (Container, Header, Footer...)
│  │  └─ common/           #   compostos compartilhados (Logo...)
│  ├─ sections/            # blocos de pagina (Hero, Features, CTA...)
│  ├─ pages/               # rotas completas que orquestram secoes
│  ├─ hooks/               # hooks customizados reutilizaveis
│  ├─ data/                # conteudo estatico / config do site
│  ├─ router/              # mapa de rotas e configuracao de navegacao
│  ├─ constants/           # constantes globais
│  ├─ types/               # tipos TypeScript compartilhados
│  ├─ utils/               # funcoes utilitarias puras
│  ├─ styles/              # tokens.css, reset.css, global.css
│  ├─ test/                # setup de testes (Vitest)
│  ├─ App.tsx              # shell raiz da aplicacao
│  └─ main.tsx             # ponto de entrada (React + Router)
├─ index.html
├─ vite.config.ts
├─ tsconfig*.json
├─ eslint.config.js
└─ .prettierrc.json
```

## Aliases de import

Configurados em `vite.config.ts` e `tsconfig.app.json`:

| Alias | Caminho |
| --- | --- |
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@sections/*` | `src/sections/*` |
| `@pages/*` | `src/pages/*` |
| `@hooks/*` | `src/hooks/*` |
| `@assets/*` | `src/assets/*` |
| `@data/*` | `src/data/*` |
| `@styles/*` | `src/styles/*` |
| `@utils/*` | `src/utils/*` |
| `@router/*` | `src/router/*` |
| `@constants/*` | `src/constants/*` |
| `@app-types/*` | `src/types/*` |

> Use `@app-types` (e nao `@types`) para evitar conflito com o diretorio do DefinitelyTyped.

## Convencoes

- **Componentes**: arquivos `PascalCase.tsx`; um componente por pasta quando houver estilos/co-locacao.
- **Utilitarios/hooks**: `camelCase.ts`.
- **Barrels** (`index.ts`) em cada camada para imports limpos.
- **Estilos**: consuma sempre os tokens via `var(--token)`; evite valores hard-coded.
- **Sem strings de conteudo soltas** nos componentes — centralize em `src/data`.
