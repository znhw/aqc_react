# React - Semantic Anime Quote Client

A React single-page application for finding contextually relevant anime quotes from natural-language input.

The application provides a chat-style interface where users can describe a thought, feeling, or situation and receive a semantically relevant anime quote.

This repository contains the **frontend client**. Semantic retrieval, embeddings, and vector search are handled by a separate backend service.

## Tech Stack

- React
- TypeScript
- Vite
- REST API
- CSS
- ESLint

## How It Works

The frontend acts as the client for the semantic quote retrieval system:

1. The user enters a natural-language prompt.
2. The React client sends the prompt to the backend API.
3. The backend converts the input into an embedding.
4. Vector similarity search retrieves relevant anime quotes.
5. The selected quote is returned and rendered in the chat interface.

The frontend is intentionally kept separate from the retrieval implementation.

## Frontend Architecture

The application uses a modular frontend structure with responsibilities separated between page composition, feature components, application state, API communication, and reusable UI primitives.

```text
src/
├── components/
│   ├── chat/        # Chat-specific components
│   ├── layout/      # Application layout
│   └── ui/          # Reusable UI primitives
├── hooks/           # Application state and interaction logic
├── pages/           # Page-level composition
├── services/        # Backend API communication
├── types/           # Shared TypeScript types
└── utils/           # Shared utilities
```

Chat interactions are coordinated through the `useChat` hook, while backend communication is isolated within the service layer. Presentational components remain focused on rendering and user interaction.

This keeps UI concerns separate from application logic and external API communication.

## Project Structure

Key parts of the application include:

- `ChatRoom` — page-level composition for the chat experience
- `useChat` — manages chat state and interaction logic
- `chatServices` — handles communication with the backend API
- `components/chat` — chat-specific presentation components
- `components/ui` — reusable UI primitives
- `types/chat` — shared TypeScript definitions for chat data

## Running Locally

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Backend

This repository contains only the frontend application.

The backend is responsible for:

- Generating text embeddings
- Storing and querying quote vectors
- Performing semantic similarity search
- Selecting relevant quotes
- Exposing the retrieval functionality through an API

## Status

Active personal project.
