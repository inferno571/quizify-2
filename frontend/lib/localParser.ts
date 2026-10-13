import { Question, Quiz } from "./types";

/**
 * Parses raw JSON content into a Quiz or list of Questions.
 */
export function parseQuizJson(rawText: string, defaultTitle?: string): Quiz {
  const data = JSON.parse(rawText);

  // If already full Quiz format
  if (data && data.questions && Array.isArray(data.questions)) {
    return {
      id: data.id || `quiz-${Date.now()}`,
      title: data.title || defaultTitle || "Imported Quiz",
      date: data.date || new Date().toLocaleDateString("en-GB"),
      questions: data.questions.map(normalizeQuestion),
    };
  }

  // If array of questions directly
  if (Array.isArray(data)) {
    return {
      id: `quiz-${Date.now()}`,
      title: defaultTitle || "Imported Quiz",
      date: new Date().toLocaleDateString("en-GB"),
      questions: data.map(normalizeQuestion),
    };
  }

  throw new Error("Invalid quiz format. Expected an object with a 'questions' array or an array of question objects.");
}

function normalizeQuestion(q: any): Question {
  const options = Array.isArray(q.options)
    ? q.options.map((o: any) => String(o).trim())
    : [];

  let correctAnswer = q.correctAnswer || q.answer || q.acceptedAnswer || "";
  if (Array.isArray(correctAnswer)) {
    correctAnswer = correctAnswer.map((a: any) => String(a).trim());
  } else {
    correctAnswer = String(correctAnswer).trim();
  }

  // If correctAnswer is given as an option letter like 'A' or 'B'
  if (typeof correctAnswer === "string" && /^[A-Da-d]$/.test(correctAnswer) && options.length > 0) {
    const idx = correctAnswer.toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < options.length) {
      correctAnswer = options[idx];
    }
  }

  return {
    question: String(q.question || "").trim(),
    options,
    correctAnswer,
    explanation: String(q.explanation || "").trim(),
  };
}

/**
 * Smart local text question parser:
 * Parses standard quiz text formats such as:
 * 1. Question text
 * A. Option A
 * B. Option B
 * C. Option C
 * D. Option D
 * Answer: B (or Accepted answer: Option B)
 * Explanation: ...
 */
export function parseQuizFromText(text: string, title?: string): Quiz {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const questions: Question[] = [];

  let currentQuestion: Partial<Question> | null = null;
  let currentOptions: string[] = [];

  const questionStartRegex = /^(\d+[\.\)]\s*|Q(?:uestion)?\s*\d+[\.:\s]*)(.*)/i;
  const optionRegex = /^([A-Da-d][\.\)]|\([A-Da-d]\)|[•\-\*])\s+(.*)/;
  const answerRegex = /^(?:Answer|Accepted answer(?: is)?|Correct(?: answer)?|Ans)[\s:=-]+(.*)/i;
  const explanationRegex = /^(?:Explanation|Exp|Reason)[\s:=-]+(.*)/i;

  function finalizeCurrent() {
    if (currentQuestion && currentQuestion.question) {
      const qText = currentQuestion.question.trim();
      let ans = currentQuestion.correctAnswer || "";

      // If answer was like 'A' or 'B', map to option text
      if (typeof ans === "string" && /^[A-Da-d]$/.test(ans.trim()) && currentOptions.length > 0) {
        const idx = ans.trim().toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < currentOptions.length) {
          ans = currentOptions[idx];
        }
      }

      questions.push({
        question: qText,
        options: currentOptions.length > 0 ? currentOptions : ["True", "False"],
        correctAnswer: ans || (currentOptions[0] || "True"),
        explanation: currentQuestion.explanation || "",
      });
    }
    currentQuestion = null;
    currentOptions = [];
  }

  for (const line of lines) {
    const qMatch = line.match(questionStartRegex);
    if (qMatch) {
      finalizeCurrent();
      currentQuestion = {
        question: qMatch[2].trim() || line,
        options: [],
        explanation: "",
      };
      continue;
    }

    const ansMatch = line.match(answerRegex);
    if (ansMatch && currentQuestion) {
      currentQuestion.correctAnswer = ansMatch[1].trim();
      continue;
    }

    const expMatch = line.match(explanationRegex);
    if (expMatch && currentQuestion) {
      currentQuestion.explanation = expMatch[1].trim();
      continue;
    }

    const optMatch = line.match(optionRegex);
    if (optMatch && currentQuestion) {
      currentOptions.push(optMatch[2].trim());
      continue;
    }

    // Line continuation
    if (currentQuestion) {
      if (currentQuestion.explanation) {
        currentQuestion.explanation += " " + line;
      } else if (currentOptions.length > 0) {
        currentOptions[currentOptions.length - 1] += " " + line;
      } else {
        currentQuestion.question += " " + line;
      }
    }
  }

  finalizeCurrent();

  if (questions.length === 0) {
    throw new Error("Could not detect any questions in the provided text. Please ensure questions start with numbering like '1.' and options start with 'A.', 'B.', etc.");
  }

  return {
    id: `quiz-${Date.now()}`,
    title: title || "Imported Quiz",
    date: new Date().toLocaleDateString("en-GB"),
    questions,
  };
}
