"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardScreen } from '../../../components/DashboardScreen';
import { extractQuizFromFiles, generateQuizFromMaterial } from '../../../lib/api';
import { 
  getQuizzes, 
  saveQuizzes, 
  getAttempts, 
  syncDiskQuizzes, 
  saveQuizPermanent, 
  deleteQuizPermanent 
} from '../../../lib/storage';
import { parseQuizJson, parseQuizFromText } from '../../../lib/localParser';
import { DEFAULT_QUIZZES } from '../../../lib/defaultQuizzes';
import { Quiz, QuizAttempt } from '../../../lib/types';
import { QuizMode } from '../../../components/LandingScreen';

function inferSubject(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("hr") || lower.includes("analytics")) return "HR Analytics";
  if (lower.includes("nlp") || lower.includes("dlnlp")) return "DLNLP";
  if (lower.includes("genai") || lower.includes("generative")) return "Generative AI";
  if (lower.includes("deep") || lower.includes("learning") || lower.includes("cnn")) return "Deep Learning";
  return "General";
}

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode') as QuizMode;
  const mode = modeParam === 'generate' || modeParam === 'upload' ? modeParam : 'upload';

  const [quizzes, setQuizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initial quick load from localStorage / defaultQuizzes
    setQuizzes(getQuizzes());
    setAttempts(getAttempts());

    // 2. Sync from local disk permanently
    syncDiskQuizzes().then((synced) => {
      if (synced && synced.length > 0) {
        setQuizzes(synced);
      }
    });
  }, []);

  const handleUpload = async (files: File[], instructions?: string) => {
    setIsUploading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      // 1. Check if files are JSON or TXT (Local Offline Parsing - No API required!)
      const jsonFiles = files.filter(f => f.name.endsWith('.json') || f.type === 'application/json');
      const txtFiles = files.filter(f => f.name.endsWith('.txt') || f.type === 'text/plain');

      if (jsonFiles.length > 0) {
        let currentList = quizzes;
        for (const f of jsonFiles) {
          const content = await f.text();
          const parsed = parseQuizJson(content, f.name.replace(/\.[^/.]+$/, ""));
          parsed.subject = parsed.subject || inferSubject(f.name);
          currentList = await saveQuizPermanent(parsed, currentList);
        }
        setQuizzes(currentList);
        setSuccessMsg(`Successfully imported ${jsonFiles.length} quiz file(s) offline!`);
        return;
      }

      if (txtFiles.length > 0) {
        let currentList = quizzes;
        for (const f of txtFiles) {
          const content = await f.text();
          const parsed = parseQuizFromText(content, f.name.replace(/\.[^/.]+$/, ""));
          parsed.subject = parsed.subject || inferSubject(f.name);
          currentList = await saveQuizPermanent(parsed, currentList);
        }
        setQuizzes(currentList);
        setSuccessMsg(`Successfully parsed ${txtFiles.length} text quiz(zes) offline!`);
        return;
      }

      // 2. For image/PDF files, try the backend extraction API
      const extractedContent = await extractQuizFromFiles(files, instructions);
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: files.length > 1 ? `Combined Assignment (${files.length} parts)` : (extractedContent.title || files[0].name.replace(/\.[^/.]+$/, "")),
        subject: inferSubject(files[0].name),
        date: new Date().toLocaleDateString('en-GB'),
        questions: extractedContent.questions
      };
      const updated = await saveQuizPermanent(newQuiz, quizzes);
      setQuizzes(updated);
      setSuccessMsg(`Extracted "${newQuiz.title}" successfully!`);
    } catch (err: any) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to parse documents.";
      if (msg.includes("GEMINI_API_KEY") || msg.includes("500") || msg.includes("Failed to fetch")) {
        setError("Gemini API key is missing or unavailable. You can use 'Add Quiz Offline' button to paste questions/JSON, or upload .json and .txt files without an API key.");
      } else {
        setError(msg);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateFromMaterial = async (files: File[], numQuestions: number, difficulty: string, instructions?: string) => {
    setIsUploading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const generatedContent = await generateQuizFromMaterial(files, numQuestions, difficulty, instructions);
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: generatedContent.title || `Generated Quiz (${numQuestions} Qs)`,
        date: new Date().toLocaleDateString('en-GB'),
        questions: generatedContent.questions
      };
      const updated = await saveQuizPermanent(newQuiz, quizzes);
      setQuizzes(updated);
      setSuccessMsg(`Generated "${newQuiz.title}" successfully!`);
    } catch (err: any) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to generate quiz.";
      if (msg.includes("GEMINI_API_KEY") || msg.includes("500") || msg.includes("Failed to fetch")) {
        setError("AI generation requires a Gemini API key. For offline mode without an API key, use 'Add Quiz Offline' to save quizzes locally.");
      } else {
        setError(msg);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveManualQuiz = async (quiz: Quiz) => {
    try {
      const updated = await saveQuizPermanent(quiz, quizzes);
      setQuizzes(updated);
      setSuccessMsg(`Saved quiz "${quiz.title}" permanently!`);
    } catch (err: any) {
      setError(err.message || "Failed to save quiz");
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    try {
      const updated = await deleteQuizPermanent(id, quizzes);
      setQuizzes(updated);
      setSuccessMsg("Quiz deleted.");
    } catch (err: any) {
      setError(err.message || "Failed to delete quiz");
    }
  };

  const startQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  const viewResults = (id: string) => {
    router.push(`/results/${id}`);
  };

  const backToLanding = () => {
    router.push('/');
  };

  return (
    <>
      {error && (
        <div className="m-6 p-4 bg-[#fdf2e9] border border-[#e67e22] text-[#d35400] text-sm font-semibold rounded shadow-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-xl ml-4 cursor-pointer">&times;</button>
        </div>
      )}

      {successMsg && (
        <div className="m-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold rounded shadow-sm flex justify-between items-center">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-xl ml-4 cursor-pointer">&times;</button>
        </div>
      )}

      <DashboardScreen 
        quizzes={quizzes} 
        attempts={attempts} 
        isLoading={isUploading} 
        onUpload={handleUpload} 
        onGenerateFromMaterial={handleGenerateFromMaterial}
        onTakeQuiz={startQuiz}
        onViewResults={viewResults}
        onDeleteQuiz={handleDeleteQuiz}
        onSaveManualQuiz={handleSaveManualQuiz}
        mode={mode}
        onBack={backToLanding}
      />
    </>
  );
}
