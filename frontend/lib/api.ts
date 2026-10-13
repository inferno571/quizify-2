import { Quiz } from "./types";

/**
 * Convert a File to a base64 string (without the data URI prefix).
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

/**
 * Prepare files as base64 payloads for the server API.
 */
async function prepareFiles(files: File[]): Promise<Array<{ data: string; mimeType: string }>> {
  return Promise.all(
    files.map(async (file) => ({
      data: await fileToBase64(file),
      mimeType: file.type,
    }))
  );
}

/**
 * Extract quiz from uploaded document files (questions + answers already present).
 * Calls the backend API which proxies to Gemini.
 */
export async function extractQuizFromFiles(files: File[], instructions?: string): Promise<Omit<Quiz, 'id' | 'date'>> {
  const preparedFiles = await prepareFiles(files);

  const response = await fetch('/api/extract-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: preparedFiles, instructions }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const parsed = await response.json();
  if (!parsed.questions || parsed.questions.length === 0) {
    throw new Error("No questions could be extracted from these document(s).");
  }

  return parsed;
}

/**
 * Generate quiz questions from study material with configurable parameters.
 * Calls the backend API which proxies to Gemini.
 */
export async function generateQuizFromMaterial(files: File[], numQuestions: number, difficulty: string, instructions?: string): Promise<Omit<Quiz, 'id' | 'date'>> {
  const preparedFiles = await prepareFiles(files);

  const response = await fetch('/api/generate-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files: preparedFiles, numQuestions, difficulty, instructions }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const parsed = await response.json();
  if (!parsed.questions || parsed.questions.length === 0) {
    throw new Error("No questions could be generated from the study material.");
  }

  return parsed;
}
