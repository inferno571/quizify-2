@echo off
echo Starting Quizify 5 Pro Ultra (Made by Saksham Sooden)...

:: Start Go Backend
start "Quizify 5 Pro Ultra Go API Server" cmd /c "cd backend && go run main.go"

:: Start Next.js Frontend
start "Quizify 5 Pro Ultra Next.js App" cmd /c "cd frontend && npm run dev"

echo Both servers are starting! Quizify 5 Pro Ultra will be available at http://localhost:3000

