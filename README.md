# Pokedex

Uma aplicação web moderna para visualizar informações sobre Pokémon, utilizando a PokeAPI.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **API**: PokeAPI (Pública e gratuita)

## 📋 Funcionalidades

✅ **Fase 1: Setup e Estrutura Base**
- Projeto Next.js com App Router e TypeScript configurado
- Tailwind CSS integrado
- Interfaces TypeScript para PokeAPI (`types/pokemon.ts`)

✅ **Fase 2: Consumo da API**
- Serviço de API (`services/api.ts`) com:
  - `getPokemonList`: lista com paginação
  - `getPokemonDetails`: detalhes por nome ou ID
  - `getPokemonListWithDetails`: lista completa com detalhes
- TanStack Query configurado para cache automático

✅ **Fase 3: Componentes e UI**
- `PokemonCard`: card com imagem, nome e badges de tipos
- Cores dinâmicas do Tailwind para cada tipo de Pokémon
- Grid principal com paginação

✅ **Fase 4: Funcionalidades Avançadas**
- `SearchBar`: busca em tempo real por nome ou ID
- `PokemonModal`: modal de detalhes com:
  - Estatísticas base (HP, Attack, Defense, etc.)
  - Altura e peso
  - Habilidades
  - Tipos

✅ **Fase 5: Polimento**
- Skeleton screens durante carregamento
- Design totalmente responsivo (mobile, tablet, desktop)
- Interface moderna com gradientes e sombras

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/zzruanxx/Pokedex.git
cd Pokedex
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📁 Estrutura do Projeto

```
Pokedex/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal com QueryProvider
│   ├── page.tsx           # Página principal com grid e paginação
│   └── globals.css        # Estilos globais com Tailwind
├── components/            # Componentes React
│   ├── PokemonCard.tsx    # Card individual do Pokémon
│   ├── PokemonCardSkeleton.tsx  # Loading skeleton
│   ├── PokemonModal.tsx   # Modal de detalhes
│   ├── SearchBar.tsx      # Barra de busca
│   └── QueryProvider.tsx  # Provider do TanStack Query
├── services/              # Serviços de API
│   └── api.ts            # Funções de fetch da PokeAPI
├── types/                # TypeScript types
│   └── pokemon.ts        # Interfaces da PokeAPI
└── next.config.js        # Configuração do Next.js
```

## 🎨 Tipos de Pokémon e Cores

Cada tipo de Pokémon possui uma cor específica:
- 🔥 Fire (Fogo) - Vermelho
- 💧 Water (Água) - Azul
- ⚡ Electric (Elétrico) - Amarelo
- 🌿 Grass (Grama) - Verde
- ❄️ Ice (Gelo) - Ciano
- 👊 Fighting (Lutador) - Vermelho escuro
- 🧪 Poison (Veneno) - Roxo
- ... e mais!

## 🔍 Como Usar

1. **Navegar**: Use os botões "Anterior" e "Próxima" para navegar entre páginas
2. **Buscar**: Digite o nome ou ID do Pokémon na barra de busca
3. **Detalhes**: Clique em qualquer card para ver informações detalhadas
4. **Fechar**: Clique fora do modal ou pressione ESC para fechar

## 📱 Responsividade

- **Mobile**: 1 coluna
- **Tablet**: 2-3 colunas
- **Desktop**: 4 colunas
- **Large Desktop**: 4+ colunas

## 🌐 API

Este projeto utiliza a [PokeAPI](https://pokeapi.co/), uma API RESTful pública e gratuita com dados de todos os Pokémon.

## 📄 Licença

ISC