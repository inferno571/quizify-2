package services

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"quizify-backend/models"

	"google.golang.org/genai"
)

func GenerateContent(ctx context.Context, apiKey string, files []models.FileInput, prompt string, schema *genai.Schema) (*models.QuizResponse, error) {
	client, err := genai.NewClient(ctx, &genai.ClientConfig{APIKey: apiKey})
	if err != nil {
		return nil, err
	}

	parts := make([]*genai.Part, 0, len(files)+1)
	for _, f := range files {
		data, err := base64.StdEncoding.DecodeString(f.Data)
		if err != nil {
			return nil, fmt.Errorf("failed to decode base64 file data: %v", err)
		}
		parts = append(parts, &genai.Part{
			InlineData: &genai.Blob{
				MIMEType: f.MimeType,
				Data:     data,
			},
		})
	}
	parts = append(parts, &genai.Part{Text: prompt})

	contents := []*genai.Content{
		{
			Role:  "user",
			Parts: parts,
		},
	}

	config := &genai.GenerateContentConfig{
		ResponseMIMEType: "application/json",
		ResponseSchema:   schema,
	}

	resp, err := client.Models.GenerateContent(ctx, "gemini-flash-latest", contents, config)
	if err != nil {
		return nil, err
	}

	if len(resp.Candidates) == 0 || resp.Candidates[0].Content == nil || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("empty response from Gemini")
	}

	text := resp.Candidates[0].Content.Parts[0].Text
	if text == "" {
		return nil, fmt.Errorf("empty response text from Gemini")
	}

	// Clean potential markdown blocks from Gemini response
	text = strings.TrimSpace(text)
	text = strings.TrimPrefix(text, "```json")
	text = strings.TrimPrefix(text, "```")
	text = strings.TrimSuffix(text, "```")
	text = strings.TrimSpace(text)

	var parsed models.QuizResponse
	if err := json.Unmarshal([]byte(text), &parsed); err != nil {
		return nil, fmt.Errorf("failed to parse json response: %v", err)
	}

	return &parsed, nil
}
