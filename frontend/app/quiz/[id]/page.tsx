"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuizScreen } from '../../../components/QuizScreen';
import { PlayerNameModal } from '../../../components/PlayerNameModal';
import { getQuizzes, getAttempts, saveAttempts, clearQuizProgress } from '../../../lib/storage';
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

  const handleQuizComplete = async (
    answers: Record<number, string | string[]>, 
    starred: number[],
    twoPlayerInfo?: {
      isTwoPlayer: boolean;
      player1Name: string;
      player2Name: string;
      player2Answers: Record<number, string | string[]>;
      conflictQuestions: number[];
    }
  ) => {
    if (!quiz) return;

    let score = 0;
    let p2Score = 0;
    const incorrectIndices: number[] = [];

    const checkCorrect = (userAns: string | string[] | undefined, correct: string | string[]) => {
      if (Array.isArray(correct)) {
        const userArr = Array.isArray(userAns) ? [...userAns].sort() : [];
        const correctArr = [...correct].sort();
        return userArr.length === correctArr.length && 
          userArr.every((val, i) => val.trim().toLowerCase() === correctArr[i].trim().toLowerCase());
      } else {
        const userStr = Array.isArray(userAns) ? userAns[0] || "" : (userAns || "");
        return userStr.trim().toLowerCase() === correct.trim().toLowerCase();
      }
    };

    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = checkCorrect(userAnswer, q.correctAnswer);

      if (isCorrect) {
        score++;
      } else {
        incorrectIndices.push(idx);
      }

      if (twoPlayerInfo?.isTwoPlayer) {
        const p2Answer = twoPlayerInfo.player2Answers[idx];
        const isP2Correct = checkCorrect(p2Answer, q.correctAnswer);
        if (isP2Correct) {
          p2Score++;
        }
      }
    });

    const mergedStarred = Array.from(new Set([...starred, ...incorrectIndices]));
    const attempt: QuizAttempt = { 
      answers, 
      starred: mergedStarred, 
      score,
      markedForReview: starred,
      isTwoPlayer: twoPlayerInfo?.isTwoPlayer || false,
      player1Name: twoPlayerInfo?.player1Name || playerName || "Player 1",
      player2Name: twoPlayerInfo?.player2Name || "Player 2",
      player1Answers: answers,
      player2Answers: twoPlayerInfo?.player2Answers,
      player1Score: score,
      player2Score: twoPlayerInfo?.isTwoPlayer ? p2Score : undefined,
      conflictQuestions: twoPlayerInfo?.conflictQuestions,
    };
    
    const attempts = getAttempts();
    const newAttempts = { ...attempts, [quiz.id]: attempt };
    saveAttempts(newAttempts);

    // Clear saved in-progress session since quiz is completed
    clearQuizProgress(quiz.id);

    // Submit score to leaderboard for Player 1
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

    // Submit score to leaderboard for Player 2 if 2-player mode was used
    if (twoPlayerInfo?.isTwoPlayer && twoPlayerInfo.player2Name && twoPlayerInfo.player2Name !== playerName) {
      try {
        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'submit',
            name: twoPlayerInfo.player2Name,
            quizId: quiz.id,
            score: p2Score,
            totalQuestions: quiz.questions.length,
          }),
        });
      } catch (err) {
        console.warn('Failed to submit Player 2 score to leaderboard:', err);
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

  return (
    <QuizScreen 
      quiz={quiz} 
      onComplete={handleQuizComplete} 
      onExit={() => router.push('/dashboard')} 
    />
  );
}
