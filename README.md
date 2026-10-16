# PS4: Rick and Morty Explorer

A Rick and Morty character explorer web application built with React, Node.js, and Express.

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ShowDetails.jsx
│   │   └── ShowsList.jsx
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── server.js
└── vite.config.js
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

```bash
npm run server
```

The server will run on `http://localhost:5000`.

### 3. Start the Frontend Application

In another terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5174` (or `http://localhost:5173`).

*(Note: The frontend also has automatic fallback to the Rick and Morty API if the backend is not running).*

## Features

- **Home Page (`/`)**: Hero section with navigation to characters.
- **Characters List (`/characters`, `/shows`)**: Browse all characters with image, name, species, and status badge.
- **Search**: Search by character name.
- **Status Filter**: Filter by status (All, Alive, Dead, Unknown).
- **Pagination**: Navigate between pages with Next/Previous buttons and URL query sync (`?page=N`).
- **Character Detail (`/characters/:id`, `/shows/:id`)**: Character profile with image, status badge, species, gender, origin, location, and episode count.
- **404 Page**: Clean fallback page for unknown routes.
- **Backend API (`server.js`)**: Express server proxying the Rick and Morty API with CORS enabled.
