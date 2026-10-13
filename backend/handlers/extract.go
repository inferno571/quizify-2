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

func ExtractQuiz(c *gin.Context) {
	var req models.ExtractRequest
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

	prompt := `Extract the complete quiz from these document(s). If multiple documents are provided, merge all their multiple-choice questions into a single comprehensive quiz. Parse all multiple choice questions, options, the designated correct answer(s), and the provided explanation.

IMPORTANT RULES:
1. For the correct_answer field: if the question has ONLY ONE correct answer, provide it as a single STRING with the full text of the correct option exactly as it appears in the options array.
2. If the question has MULTIPLE correct answers (MSQ / Multiple Select Question), provide correct_answer as an ARRAY OF STRINGS, each being the full text of a correct option exactly as it appears in the options array.
3. Do NOT use option letters (e.g. A, B, C, D) — always use the full option text.
4. If the source material indicates "MSQ" or "multiple answers" or "select all that apply" or has multiple correct options marked, use an array for correct_answer.`

	if req.Instructions != "" {
		prompt += fmt.Sprintf("\n\nADDITIONAL USER INSTRUCTIONS:\n%s", req.Instructions)
	}

	schema := &genai.Schema{
		Type: genai.TypeObject,
		Properties: map[string]*genai.Schema{
			"title": {Type: genai.TypeString, Description: "A suitable title for the quiz document(s)."},
			"questions": {
				Type: genai.TypeArray,
				Items: &genai.Schema{
					Type: genai.TypeObject,
					Properties: map[string]*genai.Schema{
						"question": {Type: genai.TypeString},
						"options": {Type: genai.TypeArray, Items: &genai.Schema{Type: genai.TypeString}},
						"correctAnswer": {
							Description: "The correct answer(s). A single string for single-answer MCQs, or an array of strings for MSQs (multiple correct answers).",
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract quiz. " + err.Error()})
		return
	}

	if len(resp.Questions) == 0 {
		c.JSON(422, gin.H{"error": "No questions could be extracted from the document(s)."})
		return
	}

	c.JSON(http.StatusOK, resp)
}
