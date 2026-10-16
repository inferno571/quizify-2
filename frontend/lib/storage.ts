import { Quiz, QuizAttempt, SavedQuizProgress } from "./types";
import { DEFAULT_QUIZZES } from "./defaultQuizzes";

const LOCAL_STORAGE_QUIZZES_KEY = 'nptel_quizzes';
const LOCAL_STORAGE_ATTEMPTS_KEY = 'nptel_attempts';
const LOCAL_STORAGE_PROGRESS_KEY = 'quizify_in_progress';

export function getQuizzes(): Quiz[] {
  if (typeof window === 'undefined') return DEFAULT_QUIZZES;
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_QUIZZES_KEY);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(DEFAULT_QUIZZES));
      return DEFAULT_QUIZZES;
    }
    const parsed: Quiz[] = JSON.parse(stored);
    let modified = false;
    for (const defQuiz of DEFAULT_QUIZZES) {
      let idx = parsed.findIndex((q) => q.id === defQuiz.id);
      if (idx === -1 && defQuiz.id === "genai-week-1") {
        idx = parsed.findIndex((q) => q.id === "week-1-assignment-1");
        if (idx !== -1) {
          parsed[idx].id = defQuiz.id;
          modified = true;
        }
      }
      if (idx === -1) {
        parsed.push(defQuiz);
        modified = true;
      } else {
        if (parsed[idx].subject !== defQuiz.subject && defQuiz.subject) {
          parsed[idx].subject = defQuiz.subject;
          modified = true;
        }
        if (parsed[idx].title !== defQuiz.title) {
          parsed[idx].title = defQuiz.title;
          modified = true;
        }
        const curQuestionsJson = JSON.stringify(parsed[idx].questions);
        const defQuestionsJson = JSON.stringify(defQuiz.questions);
        if (
          curQuestionsJson !== defQuestionsJson ||
          curQuestionsJson.includes('\uFFFD') ||
          curQuestionsJson.includes('q_?') ||
          parsed[idx].questions.length !== defQuiz.questions.length
        ) {
          parsed[idx].questions = defQuiz.questions;
          modified = true;
        }
      }
    }
    if (modified) {
      localStorage.setItem(LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error("Could not load quizzes from localStorage", e);
    return DEFAULT_QUIZZES;
  }
}

/**
 * Fetch quizzes directly from local disk (/api/quizzes) and merge with localStorage.
 * Ensures quizzes saved on disk are permanently available.
 */
export async function syncDiskQuizzes(): Promise<Quiz[]> {
  const current = getQuizzes();
  try {
    const res = await fetch('/api/quizzes', {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        return current;
      }
      const data = await res.json();
      const diskQuizzes: Quiz[] = data.quizzes || [];

      const merged = [...current];
      let hasNew = false;

      for (const dq of diskQuizzes) {
        const existingIdx = merged.findIndex((q) => q.id === dq.id);
        if (existingIdx === -1) {
          merged.push(dq);
          hasNew = true;
        } else {
          // If title, subject, or questions count differs, update
          const curQuestionsJson = JSON.stringify(merged[existingIdx].questions);
          const dqQuestionsJson = JSON.stringify(dq.questions);
          if (
            merged[existingIdx].title !== dq.title ||
            merged[existingIdx].subject !== dq.subject ||
            curQuestionsJson !== dqQuestionsJson ||
            curQuestionsJson.includes('\uFFFD') ||
            curQuestionsJson.includes('q_?') ||
            merged[existingIdx].questions.length !== dq.questions.length
          ) {
            merged[existingIdx] = dq;
            hasNew = true;
          }
        }
      }

      if (hasNew && typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(merged));
      }
      return merged;
    }
  } catch (err) {
    console.warn("Could not sync disk quizzes:", err);
  }
  return current;
}

export function saveQuizzes(quizzes: Quiz[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_QUIZZES_KEY, JSON.stringify(quizzes));
  } catch (e) {
    console.error("Could not save quizzes to localStorage", e);
  }
}

/**
 * Save a single quiz both to localStorage and disk.
 */
export async function saveQuizPermanent(quiz: Quiz, currentQuizzes: Quiz[]): Promise<Quiz[]> {
  const updated = [quiz, ...currentQuizzes.filter((q) => q.id !== quiz.id)];
  saveQuizzes(updated);

  // Asynchronously persist to disk
  try {
    await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quiz),
    });
  } catch (e) {
    console.warn("Failed to persist quiz to local disk:", e);
  }

  return updated;
}

/**
 * Delete a quiz from both localStorage and disk.
 */
export async function deleteQuizPermanent(id: string, currentQuizzes: Quiz[]): Promise<Quiz[]> {
  const updated = currentQuizzes.filter((q) => q.id !== id);
  saveQuizzes(updated);

  try {
    await fetch(`/api/quizzes?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  } catch (e) {
    console.warn("Failed to delete quiz from disk:", e);
  }

  return updated;
}

export function getAttempts(): Record<string, QuizAttempt> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_ATTEMPTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Could not load attempts from localStorage", e);
    return {};
  }
}

export function saveAttempts(attempts: Record<string, QuizAttempt>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error("Could not save attempts to localStorage", e);
  }
}

export function getAllSavedProgress(): Record<string, SavedQuizProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Could not load in-progress tests from localStorage", e);
    return {};
  }
}

export function getSavedProgress(quizId: string): SavedQuizProgress | null {
  const all = getAllSavedProgress();
  return all[quizId] || null;
}

export function saveQuizProgress(progress: SavedQuizProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllSavedProgress();
    all[progress.quizId] = {
      ...progress,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error("Could not save quiz progress to localStorage", e);
  }
}

export function clearQuizProgress(quizId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllSavedProgress();
    if (all[quizId]) {
      delete all[quizId];
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(all));
    }
  } catch (e) {
    console.error("Could not clear quiz progress from localStorage", e);
  }
}
