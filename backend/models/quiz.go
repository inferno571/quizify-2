package models

import "encoding/json"

type Question struct {
	Question      string          `json:"question"`
	Options       []string        `json:"options"`
	CorrectAnswer json.RawMessage `json:"correctAnswer"`
	Explanation   string          `json:"explanation"`
}

type QuizResponse struct {
	Title     string     `json:"title"`
	Questions []Question `json:"questions"`
}

type FileInput struct {
	Data     string `json:"data"`
	MimeType string `json:"mimeType"`
}

type ExtractRequest struct {
	Files        []FileInput `json:"files"`
	Instructions string      `json:"instructions"`
}

type GenerateRequest struct {
	Files        []FileInput `json:"files"`
	NumQuestions int         `json:"numQuestions"`
	Difficulty   string      `json:"difficulty"`
	Instructions string      `json:"instructions"`
}
