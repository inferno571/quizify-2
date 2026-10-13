"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuizScreen } from '../../../components/QuizScreen';
import { PlayerNameModal } from '../../../components/PlayerNameModal';
import { getQuizzes, getAttempts, saveAttempts } from '../../../lib/storage';
import { DEFAULT_QUIZZES } from '../../../lib/defaultQuizzes';
import { Quiz, QuizAttempt } from '../../../lib/types';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const quizzes = getQuizzes();
    let found = quizzes.find(q => q.id === id);
    if (!found) {
      found = DEFAULT_QUIZZES.find(q => q.id === id);
    }

    if (found) {
      setQuiz(found);
    } else {
      router.push('/dashboard');
      return;
    }

    // Check if player name exists in localStorage
    const savedName = localStorage.getItem('quizify_player_name');
    if (savedName) {
      setPlayerName(savedName);
    } else {
      setShowNameModal(true);
    }
  }, [params.id, router]);

  const handleNameConfirm = (name: string) => {
    setPlayerName(name);
    setShowNameModal(false);
    localStorage.setItem('quizify_player_name', name);
  };

  const handleNameCancel = () => {
    setShowNameModal(false);
    router.push('/dashboard');
  };

  const handleQuizComplete = async (answers: Record<number, string | string[]>, starred: number[]) => {
    if (!quiz) return;

    let score = 0;
    const incorrectIndices: number[] = [];

    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      const correct = q.correctAnswer;

      let isCorrect = false;

      if (Array.isArray(correct)) {
        const userArr = Array.isArray(userAnswer) ? [...userAnswer].sort() : [];
        const correctArr = [...correct].sort();
        isCorrect = userArr.length === correctArr.length && 
          userArr.every((val, i) => val.trim().toLowerCase() === correctArr[i].trim().toLowerCase());
      } else {
        const userStr = Array.isArray(userAnswer) ? userAnswer[0] || "" : (userAnswer || "");
        isCorrect = userStr.trim().toLowerCase() === correct.trim().toLowerCase();
      }

      if (isCorrect) {
        score++;
      } else {
        incorrectIndices.push(idx);
      }
    });

    const mergedStarred = Array.from(new Set([...starred, ...incorrectIndices]));
    const attempt: QuizAttempt = { answers, starred: mergedStarred, score };
    
    const attempts = getAttempts();
    const newAttempts = { ...attempts, [quiz.id]: attempt };
    saveAttempts(newAttempts);

    // Submit score to leaderboard
    if (playerName) {
      try {
        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'submit',
            name: playerName,
            quizId: quiz.id,
            score,
            totalQuestions: quiz.questions.length,
          }),
        });
      } catch (err) {
        console.warn('Failed to submit score to leaderboard:', err);
      }
    }

    router.push(`/results/${quiz.id}`);
  };

  if (!quiz) return <div className="p-8 text-center text-gray-500">Loading quiz...</div>;

  // Show name modal if no name yet
  if (showNameModal) {
    return (
      <PlayerNameModal
        isOpen={true}
        onConfirm={handleNameConfirm}
        onCancel={handleNameCancel}
      />
    );
  }

  // Wait for player name
  if (!playerName) {
    return <div className="p-8 text-center text-gray-500">Setting up...</div>;
  }

  return <QuizScreen quiz={quiz} onComplete={handleQuizComplete} />;
}
