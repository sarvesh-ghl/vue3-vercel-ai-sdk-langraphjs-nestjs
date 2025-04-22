# AI Chat Application

A full-stack chat application built with Vue 3, Vercel AI SDK, LangGraph, LangChain, and NestJS.

## Features

- Real-time chat interface with streaming responses
- Modern UI using Naive UI components
- Backend powered by NestJS with LangGraph and LangChain
- TypeScript support throughout the stack
- Swagger API documentation
- Monorepo structure using npm workspaces
- Concurrent development server for frontend and backend

## Prerequisites

- Node.js (v20 or later)
- npm or yarn
- OpenAI API key

## Project Structure

```
.
├── packages/
│   ├── frontend/           # Vue 3 frontend application
│   │   ├── src/
│   │   │   ├── views/     # Vue components
│   │   │   ├── router/    # Vue Router configuration
│   │   │   └── main.ts    # Application entry point
│   │   └── ...
│   └── backend/           # NestJS backend application
│       ├── src/
│       │   ├── chat/      # Chat module
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── ...
└── ...
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/sarvesh-ghl/vue3-vercel-ai-sdk-langraphjs-nestjs.git
cd vue3-vercel-ai-sdk-langraphjs-nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
# Backend environment
cd packages/backend
touch .env
```

4. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

## Development

To start both frontend and backend in development mode:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3000`
API documentation will be available at `http://localhost:3000/api`

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend in development mode
- `npm run dev:backend` - Start only the backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build only the frontend
- `npm run build:backend` - Build only the backend
- `npm run start` - Start the production server

## Technologies Used

- Frontend:
  - Vue 3
  - Vercel AI SDK
  - Naive UI
  - TypeScript
  - Vite

- Backend:
  - NestJS
  - LangGraph
  - LangChain
  - TypeScript
  - Swagger

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT 