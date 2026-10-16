# Quizify 5 Pro Ultra — AI Quiz Generator
> **Made by Saksham Sooden**

## Built for NPTEL exam preparation.
Quizify 5 Pro Ultra transforms your study materials into interactive quizzes using Google Gemini AI and includes complete offline question banks.


## Architecture

* **Frontend**: Next.js (App Router), React, Tailwind CSS v4, Framer Motion
* **Backend API**: Go (Golang) + Gin framework
* **AI Integration**: Google GenAI SDK

## Prerequisites

* Node.js (v18+)
* Go (v1.21+)
* A Gemini API Key from Google AI Studio

## Setup Instructions

1. Configure Environment:
Rename `.env.example` to `.env` and insert your Gemini API Key.
2. Start the Application:
Run the `start.bat` script on Windows to launch both the Go backend and Next.js frontend concurrently.

```bash
./start.bat
```

Alternatively, to start manually:

**Backend (Terminal 1)**:

```bash
cd backend
go run main.go
```

**Frontend (Terminal 2)**:

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to use the app!#   q u i z i f y

