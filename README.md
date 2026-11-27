# ColheFácil — app

App mobile do ColheFácil (Expo + React Native + TypeScript), ligado ao backend Laravel em `backend/`. Usa a API do PR #1 (`routes/api.php` com Sanctum).

## Instalar

Pré-requisitos: Node.js 22 e o app Expo Go no celular (ou um simulador iOS/Android).

```bash
npm install
cp .env.example .env
```

No `.env`, aponte `EXPO_PUBLIC_API_URL` para a API (`php artisan serve` sobe em `http://localhost:8000`, e as rotas ficam em `/api`). No celular físico, troque `localhost` pelo IP da sua máquina na rede.

## Rodar

```bash
npm start          # abre o Expo; aperte i para iOS ou a para Android
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint + Prettier
```

## Estrutura

```
src/app/         rotas (expo-router): entrar, cadastro, produtor
src/api/         cliente HTTP e tipos espelhados do backend
src/components/  componentes base do design system
src/features/    dados e componentes por funcionalidade
src/theme/       cores, tipografia e medidas
design/telas/    telas de referência
```

## Telas

Prontas: entrar, cadastro do produtor e início do produtor. As demais (produtos, pedidos, vendas, perfil e o marketplace do consumidor) entram nas próximas etapas.
