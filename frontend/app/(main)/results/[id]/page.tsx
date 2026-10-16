"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResultsScreen } from '../../../../components/ResultsScreen';
import { getQuizzes, getAttempts } from '../../../../lib/storage';
import { DEFAULT_QUIZZES } from '../../../../lib/defaultQuizzes';
import { Quiz, QuizAttempt } from '../../../../lib/types';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const quizzes = getQuizzes();
    const attempts = getAttempts();
    
    let foundQuiz = quizzes.find(q => q.id === id);
    if (!foundQuiz) {
      foundQuiz = DEFAULT_QUIZZES.find(q => q.id === id);
    }
    const foundAttempt = attempts[id];

    if (foundQuiz && foundAttempt) {
      setQuiz(foundQuiz);
      setAttempt(foundAttempt);
    } else {
      router.push('/dashboard');
    }
  }, [params.id, router]);

  const backToDashboard = () => {
    router.push('/dashboard');
  };

  if (!quiz || !attempt) return <div className="p-8 text-center text-gray-500">Loading results...</div>;

  return (
    <ResultsScreen 
      quiz={quiz} 
      answers={attempt.answers} 
      starred={attempt.starred} 
      markedForReview={attempt.markedForReview}
      isTwoPlayer={attempt.isTwoPlayer}
      player1Name={attempt.player1Name}
      player2Name={attempt.player2Name}
      player1Answers={attempt.player1Answers}
      player2Answers={attempt.player2Answers}
      player1Score={attempt.player1Score}
      player2Score={attempt.player2Score}
      conflictQuestions={attempt.conflictQuestions}
      onBack={backToDashboard} 
    />
  );
}
