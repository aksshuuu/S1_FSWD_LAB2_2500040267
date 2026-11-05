Project Structure
movie-club/
├── server.js             # Express API server & Mongoose Schema (Backend)
├── package.json          # Node.js project manifest & dependencies
├── .env                  # Environment configuration
├── index.html            # Vite entry point
├── src/
│   ├── App.jsx           # Main React component, modal form, & API logic
│   ├── App.css           # Sapphire Blue theme, typography, and layout styling
│   └── main.jsx          # React DOM renderer
└── README.md             # Project documentation

# 🎬 The Film Index: A Curated Cinema Archive

A modern, full-stack (MERN) web application designed for cataloging movie screenings, archiving club deliberations, and tracking community reviews. Built with a sleek, responsive "Sapphire Blue" UI, this application allows movie clubs to maintain a detailed digital repository of their cinematic history.

## ✨ Core Features

* **Sapphire Blue Interface:** A clean, edge-to-edge layout utilizing "Plus Jakarta Sans" typography, pill-shaped action buttons, and intuitive modal overlays.
* **Comprehensive Archival Records:** Extended MongoDB database schema tracking not just basic movie details, but in-depth club discussion minutes, curators, and release data.
* **Real-Time Client Processing:** Instant search and dynamic dropdown filters for Genre, Minimum Rating thresholds, and Sorting (Highest to Lowest) handled securely on the frontend.
* **Modern MERN Architecture:** Fully decoupled React/Vite frontend with an Express.js/Node.js REST API, utilizing ES Modules (`import`/`export`) and Mongoose.
* **Optimistic UI Updates:** Instantaneous visual feedback when adding or removing catalog records from the grid.

## 📜 Archival Data Structure

Each accession in the digital catalog records the following fields via the custom Mongoose schema:

* **Movie Title** (`name`) — The canonical title of the screened work.
* **Movie Grace / Genre** (`genre`) — Standardized stylistic classifications (Drama, Noir, Sci-Fi, Horror, etc.).
* **Movie Director** (`director`) — The auteur / director of the film.
* **Movie Release Date** (`releaseDate`) — Original theatrical premiere date.
* **Movie Rating** (`tickets`) — The club consensus rating score (1.0 to 10.0 scale).
* **Discussion Leader / Curator** (`curator`) — The club member who curated or led the session.
* **Club Discussion Date** (`discussionDate`) — The date the film was screened and debated.
* **Conversation Paper Record** (`minutes`) — Archival text logging member debates, thematic takeaways, and cinematic analysis.

## 🚀 Quick Start Guide

### 1. Prerequisites
* Node.js (v18+ recommended)
* MongoDB (Local installation running on default port `27017` or a MongoDB Atlas URI)

### 2. Installation
Navigate to your project directory and install the necessary dependencies for both the backend and frontend:

```bash
# Ensure you are in your project folder
cd movie-club

# Install dependencies (Express, Mongoose, Cors, Dotenv, React, Vite)
npm install

<img width="1917" height="997" alt="image" src="https://github.com/user-attachments/assets/79cf6f40-59e2-4ea1-bfd1-acb0536d75a2" />
<img width="1917" height="993" alt="image" src="https://github.com/user-attachments/assets/5f3fd7d2-e676-4858-a503-99f526041c5a" />






























































# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
