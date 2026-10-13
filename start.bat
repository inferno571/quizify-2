@echo off
echo Starting Quizify 2 (Made by Saksham Sooden)...

:: Start Go Backend
start "Quizify 2 Go API Server" cmd /c "cd backend && go run main.go"

:: Start Next.js Frontend
start "Quizify 2 Next.js App" cmd /c "cd frontend && npm run dev"

echo Both servers are starting! Quizify 2 will be available at http://localhost:3000
