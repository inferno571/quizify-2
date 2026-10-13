package main

import (
	"log"
	"os"

	"quizify-backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Attempt to load .env from the parent directory
	_ = godotenv.Load("../.env")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // In production, replace with your specific frontend domain
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Health check route
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "Quizify Go API is running"})
	})

	// API routes
	api := r.Group("/api")
	{
		api.POST("/extract-quiz", handlers.ExtractQuiz)
		api.POST("/generate-quiz", handlers.GenerateQuiz)
	}

	log.Printf("🚀 Go API Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
