package handlers

import (
	"fmt"
	"net/http"
	"os"

	"quizify-backend/models"
	"quizify-backend/services"

	"github.com/gin-gonic/gin"
	"google.golang.org/genai"
)

func GenerateQuiz(c *gin.Context) {
	var req models.GenerateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if len(req.Files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files provided."})
		return
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "GEMINI_API_KEY is not configured on the server."})
		return
	}

	difficultyDesc := "Medium"
	switch req.Difficulty {
	case "easy":
		difficultyDesc = "Easy — basic recall and comprehension questions"
	case "medium":
		difficultyDesc = "Medium — application and understanding questions"
	case "hard":
		difficultyDesc = "Hard — analysis, critical thinking, and tricky edge-case questions"
	case "mixed":
		difficultyDesc = "Mixed — a balanced combination of easy, medium, and hard questions"
	}

	numQuestions := req.NumQuestions
	if numQuestions <= 0 {
		numQuestions = 10
	}

	prompt := fmt.Sprintf(`You are an expert quiz creator. Analyze the provided study material and generate exactly %d multiple-choice questions based on the content.

DIFFICULTY LEVEL: %s

RULES:
1. Create original, thoughtful questions that test understanding of the material — not just surface-level recall.
2. Each question must have exactly 4 options (A through D style, but use the full text).
3. For the correctAnswer field: provide the full text of the correct option exactly as it appears in the options array. If a question has multiple correct answers, provide an array of the correct option texts.
4. Provide a clear, educational explanation for each answer.
5. Questions should cover different topics from across the study material.
6. Make distractors (wrong options) plausible but clearly incorrect upon careful analysis.
7. Generate a descriptive title for the quiz based on the study material's subject.`, numQuestions, difficultyDesc)

	if req.Instructions != "" {
		prompt += fmt.Sprintf("\n\nADDITIONAL USER INSTRUCTIONS:\n%s", req.Instructions)
	}

	schema := &genai.Schema{
		Type: genai.TypeObject,
		Properties: map[string]*genai.Schema{
			"title": {Type: genai.TypeString, Description: "A descriptive title for the quiz based on the study material."},
			"questions": {
				Type: genai.TypeArray,
				Items: &genai.Schema{
					Type: genai.TypeObject,
					Properties: map[string]*genai.Schema{
						"question": {Type: genai.TypeString},
						"options": {Type: genai.TypeArray, Items: &genai.Schema{Type: genai.TypeString}},
						"correctAnswer": {
							Description: "The correct answer(s). A single string for single-answer MCQs, or an array of strings for MSQs.",
						},
						"explanation": {Type: genai.TypeString},
					},
					Required: []string{"question", "options", "correctAnswer", "explanation"},
				},
			},
		},
		Required: []string{"title", "questions"},
	}

	resp, err := services.GenerateContent(c.Request.Context(), apiKey, req.Files, prompt, schema)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate quiz. " + err.Error()})
		return
	}

	if len(resp.Questions) == 0 {
		c.JSON(422, gin.H{"error": "No questions could be generated from the study material."})
		return
	}

	c.JSON(http.StatusOK, resp)
}
