@echo off
echo Starting Quizify 3 (Made by Saksham Sooden)...

:: Start Go Backend
start "Quizify 3 Go API Server" cmd /c "cd backend && go run main.go"

:: Start Next.js Frontend
start "Quizify 3 Next.js App" cmd /c "cd frontend && npm run dev"

echo Both servers are starting! Quizify 3 will be available at http://localhost:3000

