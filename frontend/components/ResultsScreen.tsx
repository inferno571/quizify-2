import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Quiz } from '../lib/types';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Copy, 
  Star, 
  Check, 
  AlertTriangle, 
  Trophy, 
  Bookmark, 
  BookmarkCheck,
  HelpCircle,
  Users,
  Swords,
  Scale,
  Flame,
  Sparkles
} from 'lucide-react';
import { Leaderboard } from './Leaderboard';
import { MathText } from './MathText';

interface ResultsScreenProps {
  quiz: Quiz;
  answers: Record<number, string | string[]>;
  starred: number[];
  markedForReview?: number[];
  isTwoPlayer?: boolean;
  player1Name?: string;
  player2Name?: string;
  player1Answers?: Record<number, string | string[]>;
  player2Answers?: Record<number, string | string[]>;
  player1Score?: number;
  player2Score?: number;
  conflictQuestions?: number[];
  onBack: () => void;
}

type Tab = 'OVERVIEW' | 'INCORRECT' | 'DISAGREED' | 'MARKED_FOR_REVIEW' | 'STARRED' | 'LEADERBOARD';

/** Normalize correctAnswer to always be an array for comparison */
function normalizeToArray(val: string | string[] | undefined): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function isMSQ(correctAnswer: string | string[]): boolean {
  return Array.isArray(correctAnswer) && correctAnswer.length > 1;
}

function checkCorrectness(userAnswer: string | string[] | undefined, correctAnswer: string | string[]): boolean {
  const correctArr = normalizeToArray(correctAnswer).map(s => s.trim().toLowerCase()).sort();
  const userArr = normalizeToArray(userAnswer).map(s => s.trim().toLowerCase()).sort();
  
  if (correctArr.length !== userArr.length) return false;
  return correctArr.every((val, i) => val === userArr[i]);
}

function formatAnswerText(ans: string | string[] | undefined): string {
  if (ans === undefined || ans === null) return 'None';
  if (Array.isArray(ans)) {
    return ans.length > 0 ? ans.join(', ') : 'None';
  }
  return ans || 'None';
}

export function ResultsScreen({ 
  quiz, 
  answers, 
  starred, 
  markedForReview, 
  isTwoPlayer = false,
  player1Name,
  player2Name,
  player1Answers,
  player2Answers,
  player1Score,
  player2Score,
  conflictQuestions = [],
  onBack 
}: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('OVERVIEW');
  const [copied, setCopied] = useState(false);
  const [markedCopied, setMarkedCopied] = useState(false);
  const [twoPlayerCopied, setTwoPlayerCopied] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quizify_player_name');
    if (saved) setPlayerName(saved);
  }, []);

  const isGenAICV = 
    quiz.subject === 'Generative AI for Computer Vision' || 
    quiz.id.startsWith('genai_cv') || 
    quiz.id.startsWith('genai-cv');

  const p1DisplayName = player1Name || playerName || 'Player 1';
  const p2DisplayName = player2Name || 'Player 2';

  // Player 1 & Player 2 Answers mapping
  const p1EffectiveAnswers = player1Answers || answers;
  const p2EffectiveAnswers: Record<number, string | string[]> = {};
  quiz.questions.forEach((_, idx) => {
    if (conflictQuestions && conflictQuestions.includes(idx)) {
      p2EffectiveAnswers[idx] = player2Answers?.[idx] !== undefined ? player2Answers[idx] : (answers[idx] || '');
    } else {
      p2EffectiveAnswers[idx] = player2Answers?.[idx] !== undefined ? player2Answers[idx] : (answers[idx] || '');
    }
  });

  // Calculate scores
  let computedP1Score = 0;
  let computedP2Score = 0;

  // Manually marked for review question indices
  const manualMarkedIndices = markedForReview !== undefined
    ? markedForReview
    : starred.filter(idx => {
        const ua = answers[idx];
        const targetQ = quiz.questions[idx];
        return targetQ ? checkCorrectness(ua, targetQ.correctAnswer) : false;
      });

  const allReviewedQuestions = quiz.questions.map((q, idx) => {
    const p1Ans = p1EffectiveAnswers[idx];
    const p2Ans = p2EffectiveAnswers[idx];

    const isP1Correct = checkCorrectness(p1Ans, q.correctAnswer);
    const isP2Correct = checkCorrectness(p2Ans, q.correctAnswer);

    if (isP1Correct) computedP1Score++;
    if (isP2Correct) computedP2Score++;

    const isConflict = conflictQuestions && conflictQuestions.length > 0
      ? conflictQuestions.includes(idx)
      : (JSON.stringify(normalizeToArray(p1Ans).sort()) !== JSON.stringify(normalizeToArray(p2Ans).sort()));

    const isMarked = manualMarkedIndices.includes(idx);

    return { 
      idx, 
      ...q, 
      userAnswer: p1Ans, 
      isCorrect: isP1Correct, 
      isMarked,
      p1Ans,
      p2Ans,
      isP1Correct,
      isP2Correct,
      isConflict
    };
  });

  const finalP1Score = player1Score !== undefined ? player1Score : computedP1Score;
  const finalP2Score = player2Score !== undefined ? player2Score : computedP2Score;

  const score = finalP1Score;
  const percentage = Math.round((finalP1Score / quiz.questions.length) * 100);
  const p2Percentage = Math.round((finalP2Score / quiz.questions.length) * 100);

  // 2-Player breakdown lists
  const disagreedQuestions = allReviewedQuestions.filter(q => q.isConflict);
  const agreedQuestions = allReviewedQuestions.filter(q => !q.isConflict);

  const p1DisagreedWins = disagreedQuestions.filter(q => q.isP1Correct && !q.isP2Correct).length;
  const p2DisagreedWins = disagreedQuestions.filter(q => !q.isP1Correct && q.isP2Correct).length;
  const agreedCorrectCount = agreedQuestions.filter(q => q.isP1Correct).length;

  // Manually marked questions array
  const manuallyMarkedQuestions = manualMarkedIndices
    .filter(idx => idx >= 0 && idx < quiz.questions.length)
    .sort((a, b) => a - b)
    .map(idx => allReviewedQuestions[idx]);

  const markedCorrectCount = manuallyMarkedQuestions.filter(q => q.isCorrect).length;
  const markedIncorrectCount = manuallyMarkedQuestions.filter(q => !q.isCorrect).length;

  // Important questions
  const importantQuestions = starred
    .filter(idx => idx >= 0 && idx < quiz.questions.length)
    .sort((a, b) => a - b)
    .map(idx => {
      const q = allReviewedQuestions[idx];
      return { ...q, wasManuallyStarred: manualMarkedIndices.includes(idx) };
    });

  const generateExportText = () => {
    const reportHeader = `=== Quizify 5 Pro Ultra — Exam Performance Report ===\nQuiz: ${quiz.title}\nScore: ${score}/${quiz.questions.length} (${percentage}%)\nPlatform: Quizify 5 Pro Ultra | Made by Saksham Sooden\n============================================\n\n`;
    return reportHeader + importantQuestions.map(({ idx, question, options, correctAnswer, explanation, isCorrect }) => {
      const formattedOptions = options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
      const correctStr = Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer;
      const tag = isCorrect ? '[✓ Correct - Starred]' : '[✗ Incorrect]';
      return `${tag} Q${idx + 1}. ${question}\n${formattedOptions}\n\nCorrect Answer: ${correctStr}\nExplanation: ${explanation || 'None provided.'}`;
    }).join('\n\n--------------------------------------------------------------\n\n');
  };

  const generateTwoPlayerExportText = () => {
    let report = `=== Quizify 5 Pro Ultra — 2-Player Head-to-Head Exam Report ===\n`;
    report += `Quiz: ${quiz.title}\n`;
    report += `Player 1 (${p1DisplayName}): ${finalP1Score}/${quiz.questions.length} (${percentage}%)\n`;
    report += `Player 2 (${p2DisplayName}): ${finalP2Score}/${quiz.questions.length} (${p2Percentage}%)\n`;
    const outcome = finalP1Score > finalP2Score
      ? `Winner: ${p1DisplayName} (Lead of +${finalP1Score - finalP2Score} pts)`
      : finalP2Score > finalP1Score
      ? `Winner: ${p2DisplayName} (Lead of +${finalP2Score - finalP1Score} pts)`
      : `Outcome: Tie Game / Draw`;
    report += `${outcome}\n`;
    report += `Total Questions: ${quiz.questions.length} | Agreed: ${agreedQuestions.length} | Disagreed: ${disagreedQuestions.length}\n`;
    report += `Platform: Quizify 5 Pro Ultra | Made by Saksham Sooden\n======================================================\n\n`;

    if (disagreedQuestions.length > 0) {
      report += `--- CLASHES / DISAGREED QUESTIONS (${disagreedQuestions.length}) ---\n\n`;
      disagreedQuestions.forEach((q) => {
        const correctStr = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer;
        report += `Q${q.idx + 1}. ${q.question}\n`;
        report += `  🔵 ${p1DisplayName}: ${formatAnswerText(q.p1Ans)} [${q.isP1Correct ? '✓ Correct' : '✗ Incorrect'}]\n`;
        report += `  🟣 ${p2DisplayName}: ${formatAnswerText(q.p2Ans)} [${q.isP2Correct ? '✓ Correct' : '✗ Incorrect'}]\n`;
        report += `  Correct Answer: ${correctStr}\n`;
        report += `  Explanation: ${q.explanation || 'None provided.'}\n\n`;
      });
    }

    return report;
  };

  const generateMarkedExportText = () => {
    const reportHeader = `=== Quizify 5 Pro Ultra — Manually Marked for Review Questions ===\nQuiz: ${quiz.title}\nTotal Marked: ${manuallyMarkedQuestions.length} (${markedCorrectCount} Correct, ${markedIncorrectCount} Incorrect)\nPlatform: Quizify 5 Pro Ultra | Made by Saksham Sooden\n========================================================\n\n`;
    return reportHeader + manuallyMarkedQuestions.map(({ idx, question, options, correctAnswer, explanation, isCorrect, userAnswer }) => {
      const formattedOptions = options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
      const correctStr = Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer;
      const userStr = Array.isArray(userAnswer) ? (userAnswer.join(', ') || 'None') : (userAnswer || 'None');
      const tag = isCorrect ? '[✓ Correct - Flagged]' : '[✗ Incorrect - Flagged]';
      return `${tag} Q${idx + 1}. ${question}\n${formattedOptions}\n\nYour Pick: ${userStr}\nCorrect Answer: ${correctStr}\nExplanation: ${explanation || 'None provided.'}`;
    }).join('\n\n--------------------------------------------------------------\n\n');
  };

  const handleCopy = () => {
    const text = generateExportText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleCopyTwoPlayer = () => {
    const text = generateTwoPlayerExportText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setTwoPlayerCopied(true);
        setTimeout(() => setTwoPlayerCopied(false), 2000);
      });
    }
  };

  const handleCopyMarked = () => {
    const text = generateMarkedExportText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setMarkedCopied(true);
        setTimeout(() => setMarkedCopied(false), 2000);
      });
    }
  };

  const incorrectCount = importantQuestions.filter(q => !q.isCorrect).length;
  const starredCorrectCount = importantQuestions.filter(q => q.isCorrect).length;

  const incorrectQuestions = allReviewedQuestions.filter(q => !q.isP1Correct || (isTwoPlayer && !q.isP2Correct));
  const displayedList = activeTab === 'INCORRECT' ? incorrectQuestions
    : activeTab === 'DISAGREED' ? disagreedQuestions : allReviewedQuestions;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Top Header Section */}
      {isTwoPlayer ? (
        <div className="bg-surface rounded-2xl border border-purple-200/90 dark:border-purple-900/50 p-6 shadow-sm mb-6 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-outline">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  2-Player Head-to-Head
                </span>
                <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium">
                  Quizify 5 Pro Ultra • <span className="text-gray-800 dark:text-neutral-200 font-semibold">{quiz.title}</span>
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {finalP1Score > finalP2Score ? (
                  <span className="text-blue-700 flex items-center gap-2 dark:text-blue-300">
                    🏆 {p1DisplayName} Wins the Match!
                  </span>
                ) : finalP2Score > finalP1Score ? (
                  <span className="text-purple-700 flex items-center gap-2 dark:text-purple-300">
                    🏆 {p2DisplayName} Wins the Match!
                  </span>
                ) : (
                  <span className="text-indigo-700 flex items-center gap-2 dark:text-indigo-300">
                    🤝 It&apos;s a Dead Heat Draw!
                  </span>
                )}
              </h2>
              <p className="text-gray-500 text-xs mt-1 dark:text-muted">
                {finalP1Score === finalP2Score
                  ? `Both players demonstrated equal mastery with identical scores of ${finalP1Score}/${quiz.questions.length}.`
                  : finalP1Score > finalP2Score
                  ? `${p1DisplayName} secured victory with a lead of +${finalP1Score - finalP2Score} point${finalP1Score - finalP2Score === 1 ? '' : 's'}.`
                  : `${p2DisplayName} secured victory with a lead of +${finalP2Score - finalP1Score} point${finalP2Score - finalP1Score === 1 ? '' : 's'}.`}
              </p>
            </div>

            {/* Duel Score Comparison Cards */}
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-center">
              {/* Player 1 Card */}
              <div className={`p-4 rounded-xl border text-center min-w-32 transition-all ${
                finalP1Score > finalP2Score 
                  ? 'bg-blue-50/90 dark:bg-blue-950/50 border-blue-400 dark:border-blue-500 ring-2 ring-blue-400/50 shadow-md' 
                  : 'bg-surface border-blue-200 dark:border-blue-900/60'
              }`}>
                <div className="flex items-center justify-center gap-1 text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">
                  🔵 {p1DisplayName}
                </div>
                <div className="text-3xl font-black text-blue-700 dark:text-blue-400">
                  {finalP1Score}<span className="text-base text-gray-400 dark:text-neutral-500 font-normal">/{quiz.questions.length}</span>
                </div>
                <div className="text-xs font-bold text-blue-900/80 dark:text-blue-300/80 mt-0.5">
                  {percentage}% Accuracy
                </div>
              </div>

              <div className="text-center font-black text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-widest px-1">
                VS
              </div>

              {/* Player 2 Card */}
              <div className={`p-4 rounded-xl border text-center min-w-32 transition-all ${
                finalP2Score > finalP1Score 
                  ? 'bg-purple-50/90 dark:bg-purple-950/50 border-purple-400 dark:border-purple-500 ring-2 ring-purple-400/50 shadow-md' 
                  : 'bg-surface border-purple-200 dark:border-purple-900/60'
              }`}>
                <div className="flex items-center justify-center gap-1 text-xs font-black text-purple-900 uppercase tracking-wider mb-1 dark:text-purple-200">
                  🟣 {p2DisplayName}
                </div>
                <div className="text-3xl font-black text-purple-700 dark:text-purple-300">
                  {finalP2Score}<span className="text-base text-gray-400 font-normal">/{quiz.questions.length}</span>
                </div>
                <div className="text-xs font-bold text-purple-900/80 mt-0.5 dark:text-purple-200/80">
                  {p2Percentage}% Accuracy
                </div>
              </div>
            </div>
          </div>

          {/* Consensus & Disagreement Breakdown Pill Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-surface-muted dark:bg-surface border border-outline dark:border-outline p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-gray-600 dark:text-neutral-400 font-medium">🤝 Agreed Questions:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {agreedQuestions.length} ({agreedCorrectCount} correct)
              </span>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-purple-800 dark:text-purple-300 font-medium">⚔️ Disagreed Questions:</span>
              <span className="font-black text-purple-950 dark:text-purple-200">
                {disagreedQuestions.length}
              </span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 p-2.5 rounded-lg flex items-center justify-between sm:col-span-2 md:col-span-1">
              <span className="text-blue-800 dark:text-blue-300 font-medium">Clash Record:</span>
              <span className="font-bold text-gray-800 dark:text-neutral-200">
                🔵 P1: {p1DisagreedWins} • 🟣 P2: {p2DisagreedWins}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-outline dark:border-outline p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800 uppercase tracking-wide">
                  Quizify 5 Pro Ultra
                </span>

                {isGenAICV && (
                  <span className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-400/60 uppercase tracking-wide flex items-center gap-1 shadow-xs">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    LARP VERIFIED
                  </span>
                )}

                <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium">
                  Made by <span className="text-gray-800 dark:text-neutral-200 font-semibold">Saksham Sooden</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Result Summary</h2>
              <p className="text-gray-600 dark:text-neutral-400 text-sm font-medium">{quiz.title}</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-center">
                 <div className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Score</div>
                 <div className={`text-4xl font-extrabold ${percentage >= 80 ? 'text-emerald-600 dark:text-emerald-400' : percentage >= 50 ? 'text-amber-500 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                   {score}<span className="text-xl text-gray-400 dark:text-neutral-500">/{quiz.questions.length}</span>
                 </div>
              </div>
              <div className="w-px h-12 bg-surface-hover dark:bg-neutral-800"></div>
              <div className="text-center min-w-24">
                 <div className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Accuracy</div>
                 <div className="text-3xl font-bold text-gray-800 dark:text-white">{percentage}%</div>
              </div>
           </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-outline dark:border-outline mb-6 font-medium overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'OVERVIEW' ? 'border-[#2980b9] text-[#2980b9] dark:text-blue-400 font-bold bg-surface' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-surface-hover dark:hover:bg-surface-hover'
          }`}
        >
          Detailed Review
        </button>

        {/* 2-Player Disagreed Questions Tab */}
        {isTwoPlayer && disagreedQuestions.length > 0 && (
          <button
            onClick={() => setActiveTab('DISAGREED')}
            className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'DISAGREED' 
                ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold bg-purple-50/50 dark:bg-purple-950/30' 
                : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-surface-hover dark:hover:bg-surface-hover'
            }`}
          >
            <Swords className="w-4 h-4 text-purple-600 dark:text-purple-300" />
            <span>Disagreed / Clashes</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'DISAGREED' 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
            }`}>
              {disagreedQuestions.length}
            </span>
          </button>
        )}

        <button type="button" onClick={() => setActiveTab('INCORRECT')} aria-pressed={activeTab === 'INCORRECT'}
          className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'INCORRECT' ? 'border-rose-500 text-rose-700 dark:text-rose-300 font-bold bg-surface' : 'border-transparent text-muted hover:bg-surface-hover'
          }`}>
          <XCircle className="w-4 h-4" /><span>Incorrect</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-surface-muted">{incorrectQuestions.length}</span>
        </button>

        {/* Separate Section for Manually Marked for Review Questions */}
        <button
          onClick={() => setActiveTab('MARKED_FOR_REVIEW')}
          className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'MARKED_FOR_REVIEW' 
              ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold bg-purple-50/50 dark:bg-purple-950/30' 
              : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-surface-hover dark:hover:bg-surface-hover'
          }`}
        >
          <Bookmark className="w-4 h-4 text-purple-600 fill-purple-600 dark:text-purple-300" />
          <span>Marked for Review</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            activeTab === 'MARKED_FOR_REVIEW' 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
          }`}>
            {manuallyMarkedQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('STARRED')}
          className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'STARRED' ? 'border-amber-500 text-amber-700 dark:text-amber-400 font-bold bg-surface' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-surface-hover dark:hover:bg-surface-hover'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Important Questions</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-surface-muted dark:bg-neutral-800 text-gray-600 dark:text-neutral-300">
            {importantQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`py-3 px-5 text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'LEADERBOARD' ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400 font-bold bg-surface' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-surface-hover dark:hover:bg-surface-hover'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Leaderboard</span>
        </button>
      </div>

      {/* Tab Content: OVERVIEW & DISAGREED */}
      {(activeTab === 'OVERVIEW' || activeTab === 'DISAGREED' || activeTab === 'INCORRECT') && (
        <div className="space-y-6 lg:space-y-8">
          {activeTab === 'INCORRECT' && (
            <section className="rounded-xl border border-outline bg-surface p-5" aria-label="Incorrect answers summary">
              <h3 className="text-lg font-bold text-foreground">{incorrectQuestions.length ? 'Incorrect answers to review' : 'No incorrect answers'}</h3>
              <p className="mt-1 text-sm text-muted">
                {incorrectQuestions.length
                  ? isTwoPlayer ? 'Questions either player missed, including unanswered questions. Compare your choices with the correct answers below.' : 'Review your mistakes and unanswered questions. Each one is a chance to improve.'
                  : isTwoPlayer ? 'Both players answered every question correctly. Great teamwork!' : 'You answered every question correctly. Nicely done!'}
              </p>
            </section>
          )}
          {displayedList.map((q) => {
            const idx = q.idx;
            const qIsMSQ = isMSQ(q.correctAnswer);
            const correctArr = normalizeToArray(q.correctAnswer);
            const p1Arr = normalizeToArray(q.p1Ans);
            const p2Arr = normalizeToArray(q.p2Ans);

            // Outcome card styling
            const isCardSuccess = isTwoPlayer 
              ? (q.isConflict ? (q.isP1Correct || q.isP2Correct) : q.isP1Correct) 
              : q.isCorrect;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className={`bg-surface rounded-xl shadow-xs border p-5 md:p-6 relative ${
                  isCardSuccess ? 'border-emerald-200 dark:border-emerald-900/60' : 'border-rose-200 dark:border-rose-900/60'
                }`}
              >
                <div className="absolute top-0 right-0 flex items-center">
                  {isTwoPlayer && q.isConflict && (
                    <span className="bg-purple-100 text-purple-800 border-b border-l border-purple-200 px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800">
                      <Swords className="w-3.5 h-3.5" /> Disagreed Choice
                    </span>
                  )}
                  {q.isMarked && (
                    <span className="bg-purple-100 text-purple-800 border-b border-l border-purple-200 px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800">
                      <Bookmark className="w-3 h-3 fill-purple-600 text-purple-600 dark:text-purple-300" /> Marked for Review
                    </span>
                  )}
                  {!q.isCorrect && !q.isMarked && !isTwoPlayer && (
                    <span className="bg-rose-100 text-rose-700 border-b border-l border-rose-200 px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
                      <AlertTriangle className="w-3 h-3" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="flex gap-3 md:gap-4 mb-4 pt-2">
                  <div className="mt-0.5 shrink-0">
                    {isTwoPlayer ? (
                      q.isConflict ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                          ⚔️
                        </div>
                      ) : q.isP1Correct ? (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      )
                    ) : q.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-bold tracking-wider uppercase block ${
                        isCardSuccess ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'
                      }`}>
                        Question {idx + 1}
                      </span>
                      {qIsMSQ && (
                        <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-200 uppercase dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                          MSQ
                        </span>
                      )}
                      {q.isMarked && (
                        <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-purple-200 uppercase dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800">
                          Flagged in Test
                        </span>
                      )}
                    </div>
                    <div className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                      <MathText text={q.question} block />
                    </div>
                  </div>
                </div>

                {/* 2-Player Summary Pill Box for this Question */}
                {isTwoPlayer && (
                  <div className="mb-4 pl-9 md:pl-10">
                    <div className="p-3 rounded-lg border bg-surface-muted border-outline text-xs">
                      {q.isConflict ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="bg-purple-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                              <Swords className="w-3 h-3" /> Disagreement (Conflict of Interest)
                            </span>
                            <span className="text-gray-500 font-medium dark:text-muted">Players chose different answers</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            <div className={`p-2 rounded border flex items-center justify-between ${
                              q.isP1Correct ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200' : 'bg-rose-50 border-rose-300 text-rose-900 font-medium dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                            }`}>
                              <span className="flex items-center gap-1.5">
                                🔵 {p1DisplayName}:
                                <span className="font-semibold">{formatAnswerText(q.p1Ans)}</span>
                              </span>
                              {q.isP1Correct ? (
                                <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-bold dark:text-emerald-300">
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 dark:text-emerald-300" /> Correct (+1)
                                </span>
                              ) : (
                                <span className="text-rose-700 flex items-center gap-1 text-[11px] font-bold dark:text-rose-300">
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 dark:text-rose-300" /> Incorrect
                                </span>
                              )}
                            </div>
                            <div className={`p-2 rounded border flex items-center justify-between ${
                              q.isP2Correct ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200' : 'bg-rose-50 border-rose-300 text-rose-900 font-medium dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                            }`}>
                              <span className="flex items-center gap-1.5">
                                🟣 {p2DisplayName}:
                                <span className="font-semibold">{formatAnswerText(q.p2Ans)}</span>
                              </span>
                              {q.isP2Correct ? (
                                <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-bold dark:text-emerald-300">
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 dark:text-emerald-300" /> Correct (+1)
                                </span>
                              ) : (
                                <span className="text-rose-700 flex items-center gap-1 text-[11px] font-bold dark:text-rose-300">
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 dark:text-rose-300" /> Incorrect
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                              🤝 Both Agreed
                            </span>
                            <span className="text-gray-700 font-medium dark:text-foreground">
                              Chosen: <span className="font-bold">{formatAnswerText(q.p1Ans)}</span>
                            </span>
                          </div>
                          <div>
                            {q.isP1Correct ? (
                              <span className="text-emerald-700 font-bold flex items-center gap-1 dark:text-emerald-300">
                                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-300" /> Both Correct (+1)
                              </span>
                            ) : (
                              <span className="text-rose-700 font-bold flex items-center gap-1 dark:text-rose-300">
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-300" /> Both Incorrect
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pl-9 md:pl-10 space-y-4">
                  {activeTab === 'INCORRECT' && !isTwoPlayer && (
                    <div className="text-sm text-foreground space-y-1">
                      <p><strong>Your answer: </strong><MathText text={normalizeToArray(q.userAnswer).some(value => value.trim()) ? formatAnswerText(q.userAnswer) : 'Unanswered'} /></p>
                      <p><strong>Correct answer: </strong><MathText text={formatAnswerText(q.correctAnswer)} /></p>
                    </div>
                  )}
                  <div className="grid gap-2 text-sm">
                    {q.options.map((opt, i) => {
                      const isCorrectOption = correctArr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                      const isP1Selected = p1Arr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                      const isP2Selected = p2Arr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());

                      let bgClasses = "bg-surface border-outline dark:border-outline text-gray-800 dark:text-white";
                      if (isCorrectOption) {
                        bgClasses = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200";
                      } else if (!isTwoPlayer) {
                        if (isP1Selected && !isCorrectOption) {
                          bgClasses = "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200";
                        }
                      } else {
                        if ((isP1Selected || isP2Selected) && !isCorrectOption) {
                          bgClasses = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200";
                        }
                      }

                      return (
                        <div key={i} className={`flex p-3 rounded-lg border items-center transition-colors ${bgClasses}`}>
                          <div className={`w-6 h-6 rounded flex items-center justify-center font-bold mr-3 shrink-0 text-xs ${
                            isCorrectOption ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100' : 
                            ((isP1Selected || isP2Selected) && !isCorrectOption) ? 'bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-100' : 'bg-surface-muted dark:bg-surface-muted text-gray-600 dark:text-neutral-200'}`}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="leading-tight pr-4 flex-1 font-medium text-gray-900 dark:text-white">
                            <MathText text={opt} />
                          </span>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isTwoPlayer ? (
                              <>
                                {isP1Selected && (
                                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs ${
                                    isCorrectOption ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200' : 'bg-blue-100 text-blue-900 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-800'
                                  }`}>
                                    🔵 {p1DisplayName}
                                  </span>
                                )}
                                {isP2Selected && (
                                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs ${
                                    isCorrectOption ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200' : 'bg-purple-100 text-purple-900 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800'
                                  }`}>
                                    🟣 {p2DisplayName}
                                  </span>
                                )}
                                {isCorrectOption && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />}
                                {(isP1Selected || isP2Selected) && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-300" />}
                              </>
                            ) : (
                              <>
                                {isP1Selected && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isCorrectOption ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' : 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200'}`}>
                                    Your pick
                                  </span>
                                )}
                                {isCorrectOption && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />}
                                {isP1Selected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-300" />}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="bg-surface-muted dark:bg-surface border border-outline dark:border-outline rounded-lg p-4 mt-4">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest mb-2">Explanation</h4>
                      <div className="text-gray-800 dark:text-neutral-200 text-sm leading-relaxed">
                        <MathText text={q.explanation} block />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Tab Content: MARKED FOR REVIEW */}
      {activeTab === 'MARKED_FOR_REVIEW' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 text-white p-5 rounded-xl shadow-md border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-200 shrink-0 shadow-inner dark:border-purple-800">
                <Bookmark className="w-6 h-6 fill-purple-300 text-purple-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 border border-purple-400/30 dark:border-purple-800">
                    Exam Flagged
                  </span>
                  <span className="text-xs text-purple-200">
                    Questions you clicked &apos;Mark for Review & Next&apos; on
                  </span>
                </div>
                <h3 className="text-lg font-bold">Questions Marked for Review</h3>
              </div>
            </div>

            {manuallyMarkedQuestions.length > 0 && (
              <button
                onClick={handleCopyMarked}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer shadow-sm self-start sm:self-center"
              >
                {markedCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {markedCopied ? 'Copied Flagged!' : 'Copy Flagged Questions'}
              </button>
            )}
          </div>

          {manuallyMarkedQuestions.length === 0 ? (
            <div className="bg-surface rounded-xl shadow-xs border border-outline p-12 text-center text-gray-500 dark:text-muted">
              <Bookmark className="w-12 h-12 mx-auto mb-3 text-purple-300" />
              <p className="text-lg font-semibold text-gray-700 mb-1 dark:text-foreground">No Questions Marked for Review</p>
              <p className="text-sm">You didn&apos;t flag any questions with &apos;Mark for Review & Next&apos; during the exam.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {manuallyMarkedQuestions.map((q) => {
                const idx = q.idx;
                const correctArr = normalizeToArray(q.correctAnswer);
                const userArr = normalizeToArray(q.userAnswer);

                return (
                  <div key={idx} className="bg-surface rounded-xl shadow-xs border border-purple-200 p-5 md:p-6 relative dark:border-purple-800">
                    <div className="flex gap-3 mb-4">
                      <div className="mt-0.5 shrink-0">
                        {q.isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-purple-700 uppercase dark:text-purple-300">Question {idx + 1}</span>
                        <div className="text-base font-semibold text-slate-800 leading-relaxed dark:text-foreground">
                          <MathText text={q.question} block />
                        </div>
                      </div>
                    </div>
                    <div className="pl-8 space-y-3">
                      <div className="grid gap-2 text-sm">
                        {q.options.map((opt, i) => {
                          const isCorrect = correctArr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                          const isUserPick = userArr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                          return (
                            <div key={i} className={`flex p-3 rounded-lg border items-center ${
                              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200' :
                              isUserPick ? 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200' : 'bg-surface border-outline'
                            }`}>
                              <span className="font-bold mr-3 text-xs">{String.fromCharCode(65 + i)}</span>
                              <span className="flex-1"><MathText text={opt} /></span>
                              {isUserPick && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-hover ml-2">Your pick</span>}
                              {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 ml-2 dark:text-emerald-300" />}
                            </div>
                          );
                        })}
                      </div>
                      {q.explanation && (
                        <div className="bg-surface-muted border border-outline rounded-lg p-3 text-sm">
                          <MathText text={q.explanation} block />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: STARRED (Important Questions Export) */}
      {activeTab === 'STARRED' && (
        <div className="bg-surface rounded-xl shadow-xs border border-outline p-6">
          {importantQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-muted">
               <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
               <p className="text-lg font-medium text-gray-700 mb-1 dark:text-foreground">No Important Questions</p>
               <p className="text-sm">All questions were answered correctly and none were starred.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                 <div>
                   <h3 className="font-bold text-gray-800 text-lg dark:text-foreground">Important Questions for Review</h3>
                   <p className="text-sm text-gray-500 mt-1 dark:text-muted">
                     {incorrectCount > 0 && (
                       <span className="text-rose-600 font-semibold dark:text-rose-300">{incorrectCount} incorrect (auto-added)</span>
                     )}
                     {incorrectCount > 0 && starredCorrectCount > 0 && ' · '}
                     {starredCorrectCount > 0 && (
                       <span className="text-purple-600 font-semibold dark:text-purple-300">{starredCorrectCount} manually starred</span>
                     )}
                   </p>
                 </div>
                 <div className="flex items-center gap-2">
                   {isTwoPlayer && (
                     <button
                       onClick={handleCopyTwoPlayer}
                       className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition shrink-0 cursor-pointer shadow-xs"
                     >
                       {twoPlayerCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       {twoPlayerCopied ? 'Copied Matchup!' : 'Copy 2P Matchup Report'}
                     </button>
                   )}
                   <button
                     onClick={handleCopy}
                     className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shrink-0 cursor-pointer shadow-xs"
                   >
                     {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                     {copied ? 'Copied!' : 'Copy to Clipboard'}
                   </button>
                 </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 dark:text-muted">
                All incorrectly answered questions and flagged questions are formatted for easy copy-pasting.
              </p>
              <textarea 
                className="w-full h-96 p-4 bg-surface-muted border border-outline rounded-lg text-sm font-mono text-gray-800 outline-none focus:ring-2 focus:ring-purple-500 dark:text-foreground"
                value={isTwoPlayer ? generateTwoPlayerExportText() : generateExportText()}
                readOnly
              />
            </>
          )}
        </div>
      )}

      {/* Tab Content: LEADERBOARD */}
      {activeTab === 'LEADERBOARD' && (
        <Leaderboard
          quizId={quiz.id}
          quizTitle={quiz.title}
          currentPlayerName={playerName}
          currentPlayerScore={score}
          totalQuestions={quiz.questions.length}
        />
      )}

      {/* Footer controls */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 pb-8">
         <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-[#34495e] text-white hover:bg-[#2c3e50] transition shadow cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Back to Course Dashboard
          </button>
          <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
            <span className="font-semibold text-gray-600 dark:text-muted">Quizify 5 Pro Ultra</span>
            <span>•</span>
            <span className="text-orange-600 font-semibold dark:text-orange-300">Made with ❤️ by Saksham Sooden</span>
          </div>

      </div>

    </div>
  );
}
