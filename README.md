# PS4: Rick and Morty Explorer

A full-stack Rick and Morty character explorer web application built with React, Node.js, and Express.

## Project Structure

```
assignment-5/
├── backend/       # Express.js API server
└── frontend/      # React + Vite application
```

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

The backend server runs on `http://localhost:5000`.

### 2. Start the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend application runs on `http://localhost:5174` (or `http://localhost:5173`).

## Features

- **Home Page (`/`)**: Hero section with navigation to characters.
- **Characters Page (`/characters`)**: Displays character cards with image, name, species, and status badge.
- **Pagination**: Browse characters with Next and Previous buttons (synced with `?page=N` URL param).
- **Search**: Filter characters by name.
- **Status Filter**: Filter by status (All, Alive, Dead, Unknown).
- **Character Detail (`/characters/:id`)**: Detailed character profile with image, status, gender, origin, location, and total episode count.
- **404 Not Found Page**: Fallback route for invalid URLs.
- **Backend Proxy**: Express server handles requests with CORS enabled and proxies to the Rick and Morty API.
