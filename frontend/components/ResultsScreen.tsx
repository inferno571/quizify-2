import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Quiz } from '../lib/types';
import { CheckCircle, XCircle, RotateCcw, Copy, Star, Check, AlertTriangle, Trophy } from 'lucide-react';
import { Leaderboard } from './Leaderboard';

interface ResultsScreenProps {
  quiz: Quiz;
  answers: Record<number, string | string[]>;
  starred: number[];
  onBack: () => void;
}

type Tab = 'OVERVIEW' | 'STARRED' | 'LEADERBOARD';

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

export function ResultsScreen({ quiz, answers, starred, onBack }: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>('OVERVIEW');
  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('quizify_player_name');
    if (saved) setPlayerName(saved);
  }, []);

  let score = 0;
  
  const reviewedQuestions = quiz.questions.map((q, idx) => {
    const userAnswer = answers[idx];
    const isCorrect = checkCorrectness(userAnswer, q.correctAnswer);
    if (isCorrect) score++;
    return { ...q, userAnswer, isCorrect };
  });

  const percentage = Math.round((score / quiz.questions.length) * 100);

  // Important questions: the starred list already includes incorrectly answered ones (merged in App.tsx)
  const importantQuestions = starred
    .filter(idx => idx >= 0 && idx < quiz.questions.length)
    .sort((a, b) => a - b)
    .map(idx => {
      const q = quiz.questions[idx];
      const userAnswer = answers[idx];
      const isCorrect = checkCorrectness(userAnswer, q.correctAnswer);
      const wasManuallyStarred = true; // We don't distinguish here, all are "important"
      return { idx, ...q, userAnswer, isCorrect, wasManuallyStarred };
    });

  const generateExportText = () => {
    const reportHeader = `=== Quizify 2 — Exam Performance Report ===\nQuiz: ${quiz.title}\nScore: ${score}/${quiz.questions.length} (${percentage}%)\nPlatform: Quizify 2 | Made by Saksham Sooden\n============================================\n\n`;
    return reportHeader + importantQuestions.map(({ idx, question, options, correctAnswer, explanation, isCorrect }) => {
      const formattedOptions = options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n');
      const correctStr = Array.isArray(correctAnswer) ? correctAnswer.join(', ') : correctAnswer;
      const tag = isCorrect ? '[✓ Correct - Starred]' : '[✗ Incorrect]';
      return `${tag} Q${idx + 1}. ${question}\n${formattedOptions}\n\nCorrect Answer: ${correctStr}\nExplanation: ${explanation || 'None provided.'}`;
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

  const incorrectCount = importantQuestions.filter(q => !q.isCorrect).length;
  const starredCorrectCount = importantQuestions.filter(q => q.isCorrect).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Top Header Section */}
      <div className="bg-white rounded border border-gray-300 p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
         <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-200 uppercase tracking-wide">
                Quizify 2
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Made by <span className="text-gray-800 font-semibold">Saksham Sooden</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 mb-1">Result Summary</h2>
            <p className="text-gray-600 text-sm font-medium">{quiz.title}</p>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-center">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Score</div>
               <div className={`text-4xl font-extrabold ${percentage >= 80 ? 'text-emerald-600' : percentage >= 50 ? 'text-amber-500' : 'text-rose-600'}`}>
                 {score}<span className="text-xl text-gray-400">/{quiz.questions.length}</span>
               </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center min-w-24">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Accuracy</div>
               <div className="text-3xl font-bold text-slate-700">{percentage}%</div>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6 font-medium">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`py-3 px-6 text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'OVERVIEW' ? 'border-[#2980b9] text-[#2980b9] font-bold bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
        >
          Detailed Review
        </button>
        <button
          onClick={() => setActiveTab('STARRED')}
          className={`py-3 px-6 text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'STARRED' ? 'border-purple-600 text-purple-700 font-bold bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
        >
          <Star className="w-4 h-4" />
          Important Questions ({importantQuestions.length})
        </button>
        <button
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`py-3 px-6 text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'LEADERBOARD' ? 'border-yellow-500 text-yellow-700 font-bold bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
        >
          <Trophy className="w-4 h-4" />
          Leaderboard
        </button>
      </div>


      {/* Tab Content */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 lg:space-y-8">
          {reviewedQuestions.map((q, idx) => {
            const qIsMSQ = isMSQ(q.correctAnswer);
            const correctArr = normalizeToArray(q.correctAnswer);
            const userArr = normalizeToArray(q.userAnswer);

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className={`bg-white rounded shadow-sm border p-5 md:p-6 relative ${q.isCorrect ? 'border-emerald-200' : 'border-rose-200'}`}
              >
                {starred.includes(idx) && (
                   <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg border-b border-l flex items-center gap-1 ${
                     q.isCorrect 
                       ? 'bg-purple-100 text-purple-700 border-purple-200' 
                       : 'bg-rose-100 text-rose-700 border-rose-200'
                   }`}>
                      {q.isCorrect ? (
                        <><Star className="w-3 h-3 fill-current" /> Starred</>
                      ) : (
                        <><AlertTriangle className="w-3 h-3" /> Incorrect — Auto-starred</>
                      )}
                   </div>
                )}

                <div className="flex gap-3 md:gap-4 mb-5 pt-2">
                  <div className="mt-0.5 shrink-0">
                    {q.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold tracking-wider uppercase block ${q.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        Question {idx + 1}
                      </span>
                      {qIsMSQ && (
                        <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-200 uppercase">
                          MSQ
                        </span>
                      )}
                    </div>
                    <p className="text-base font-semibold text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {q.question}
                    </p>
                  </div>
                </div>

                <div className="pl-9 md:pl-10 space-y-4">
                  <div className="grid gap-2 text-sm">
                    {q.options.map((opt, i) => {
                      const isUserSelected = userArr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                      const isCorrectOption = correctArr.some(a => a.trim().toLowerCase() === opt.trim().toLowerCase());
                      
                      let bgClasses = "bg-white border-slate-200 text-slate-600";
                      if (isCorrectOption) bgClasses = "bg-emerald-50 border-emerald-300 text-emerald-900";
                      else if (isUserSelected && !isCorrectOption) bgClasses = "bg-rose-50 border-rose-300 text-rose-900";

                      return (
                        <div key={i} className={`flex p-3 rounded border items-center transition-colors ${bgClasses}`}>
                          <div className={`w-6 h-6 rounded flex items-center justify-center font-bold mr-3 shrink-0 text-xs ${
                            isCorrectOption ? 'bg-emerald-200 text-emerald-800' : 
                            (isUserSelected && !isCorrectOption) ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-500'}`}
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="leading-tight pr-4 flex-1">{opt}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            {isUserSelected && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isCorrectOption ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'}`}>
                                Your pick
                              </span>
                            )}
                            {isCorrectOption && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                            {isUserSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-600" />}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {q.explanation && (
                    <div className="bg-slate-50 border border-slate-200 rounded p-4 mt-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Explanation</h4>
                      <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === 'STARRED' && (
        <div className="bg-white rounded shadow-sm border border-gray-300 p-6">
          {importantQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
               <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
               <p className="text-lg font-medium text-gray-700 mb-1">No Important Questions</p>
               <p className="text-sm">All questions were answered correctly and none were starred.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="font-bold text-gray-800 text-lg">Important Questions for Review</h3>
                   <p className="text-sm text-gray-500 mt-1">
                     {incorrectCount > 0 && (
                       <span className="text-rose-600 font-semibold">{incorrectCount} incorrect (auto-added)</span>
                     )}
                     {incorrectCount > 0 && starredCorrectCount > 0 && ' · '}
                     {starredCorrectCount > 0 && (
                       <span className="text-purple-600 font-semibold">{starredCorrectCount} manually starred</span>
                     )}
                   </p>
                 </div>
                 <button
                   onClick={handleCopy}
                   className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-semibold transition shrink-0"
                 >
                   {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   {copied ? 'Copied!' : 'Copy to Clipboard'}
                 </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                All incorrectly answered questions are automatically included. The content below is formatted for easy paste into Word documents.
              </p>
              <textarea 
                className="w-full h-96 p-4 bg-gray-50 border border-gray-300 rounded text-sm font-mono text-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
                value={generateExportText()}
                readOnly
              />
            </>
          )}
        </div>
      )}

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
            className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold bg-[#34495e] text-white hover:bg-[#2c3e50] transition shadow"
          >
            <RotateCcw className="w-5 h-5" />
            Back to Course Dashboard
          </button>
          <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
            <span className="font-semibold text-gray-600">Quizify 2</span>
            <span>•</span>
            <span className="text-orange-600 font-semibold">Made with ❤️ by Saksham Sooden</span>
          </div>
      </div>

    </div>
  );
}
