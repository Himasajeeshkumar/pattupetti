# Paattupetti

A nostalgic Malayalam music radio experience inspired by Kerala's cassette-era memories, monsoon evenings, classic songs and late-night listening.

🌐 **Live Website**: [https://himasajeeshkumar.github.io/pattupetti/](https://himasajeeshkumar.github.io/pattupetti/)  
📦 **GitHub Repository**: [https://github.com/Himasajeeshkumar/Paattupetti](https://github.com/Himasajeeshkumar/Paattupetti)

---

## Overview

Paattupetti (പാട്ടുപെട്ടി) is a curated Malayalam music radio web application designed with warm Kerala nostalgia. It features 300 timeless tracks categorized into three atmospheric collections:

- **Golden Memories (100 Tracks)**: Evergreen cassette-era masterpieces from the golden age of Malayalam cinema.
- **Monsoon Memories (100 Tracks)**: Rain-drenched, soulful melodies capturing the soothing mood of Kerala monsoons.
- **Night Radio (100 Tracks)**: Calm, late-night atmospheric melodies for peaceful listening and quiet reflection.

---

## Features

- **300 Curated Malayalam Classics**: Hand-curated library with verified metadata (title, artist, film, year, duration).
- **Responsive Photographic Backgrounds**: Dedicated, vibrant Kerala nostalgic backgrounds for each theme on both desktop and mobile devices.
- **Persistent Audio Playback**: Uninterrupted listening across all views powered by the YouTube IFrame Player API.
- **Mini Player & Full Player Modal**: Responsive bottom dock controls, interactive seekbar, volume controls, and a full-screen vinyl-style modal.
- **Dynamic Play Queue**: View upcoming songs, shuffle playback, repeat modes, and add tracks on the fly.
- **Instant Library Search**: Real-time search across all 300 tracks by song title, singer, movie name, or release year.
- **Transparent Nostalgic Aesthetic**: Warm, minimal, translucent UI that lets the authentic Kerala imagery shine without dark or smoky overlays.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Static Export)
- **UI & Logic**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom CSS Design System
- **Player API**: Official YouTube IFrame Player API
- **Deployment**: GitHub Pages via automated GitHub Actions

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Himasajeeshkumar/Paattupetti.git
cd Paattupetti
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000/pattupetti/](http://localhost:3000/pattupetti/) in your browser to view the application.

---

## Build & Production Export

To create an optimized static production build for GitHub Pages or static hosting:

```bash
npm run build
```

The exported site will be generated in the `out/` directory.

---

## GitHub Repository & Deployment

- **Repository**: [https://github.com/Himasajeeshkumar/Paattupetti](https://github.com/Himasajeeshkumar/Paattupetti)
- **Workflow**: Automated deployment is handled via `.github/workflows/deploy.yml` upon push to the `main` branch.

---

## License

Created for personal and educational appreciation of classic Malayalam cinema music.
