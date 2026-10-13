import React, { useState, useEffect } from 'react';
import { Quiz } from '../lib/types';
import { Info, UserCircle, Star, Crown, Shield, CheckCircle, Sparkles, LogOut } from 'lucide-react';
import { PlayerNameModal } from './PlayerNameModal';

const SAKSHAM_NAME = 'Saksham Sooden';
function isSakshamUser(name: string): boolean {
  return name.trim().toLowerCase() === SAKSHAM_NAME.toLowerCase();
}

interface QuizScreenProps {
  quiz: Quiz;
  onComplete: (answers: Record<number, string | string[]>, starred: number[]) => void;
}

/** Check if a question is MSQ (multiple correct answers) */
function isMSQ(correctAnswer: string | string[]): boolean {
  return Array.isArray(correctAnswer) && correctAnswer.length > 1;
}

export function QuizScreen({ quiz, onComplete }: QuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [showChangeUserModal, setShowChangeUserModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('quizify_player_name');
    if (saved) setPlayerName(saved);
  }, []);

  const handleLogoutOrSwitch = () => {
    setShowChangeUserModal(true);
  };

  const handleConfirmNewUser = (newName: string) => {
    setPlayerName(newName);
    setShowChangeUserModal(false);
  };

  const isSpecialUser = playerName ? isSakshamUser(playerName) : false;

  const question = quiz.questions[currentIdx];
  const isCurrentMSQ = isMSQ(question.correctAnswer);

  useEffect(() => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(currentIdx);
      return next;
    });
  }, [currentIdx]);

  const handleSelectSingle = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: option }));
  };

  const handleToggleMulti = (option: string) => {
    setAnswers((prev) => {
      const current = prev[currentIdx];
      const currentArr = Array.isArray(current) ? [...current] : current ? [current] : [];
      const idx = currentArr.indexOf(option);
      if (idx >= 0) {
        currentArr.splice(idx, 1);
      } else {
        currentArr.push(option);
      }
      return { ...prev, [currentIdx]: currentArr.length > 0 ? currentArr : [] };
    });
  };

  const handleSaveNext = () => {
    // Remove marked status if saved normally
    setMarked((prev) => {
      const next = new Set(prev);
      next.delete(currentIdx);
      return next;
    });
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((p) => p + 1);
    }
  };

  const handleClear = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentIdx];
      return next;
    });
  };

  const handleMarkReviewNext = () => {
    setMarked((prev) => {
      const next = new Set(prev);
      next.add(currentIdx);
      return next;
    });
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((p) => p + 1);
    }
  };

  const handleSubmit = () => {
    setShowConfirmSubmit(true);
  };

  const confirmSubmit = () => {
    setShowConfirmSubmit(false);
    onComplete(answers, Array.from(marked));
  };

  const hasAnswer = (idx: number): boolean => {
    const ans = answers[idx];
    if (ans === undefined || ans === null) return false;
    if (Array.isArray(ans)) return ans.length > 0;
    return ans !== "";
  };

  const getStatus = (idx: number) => {
    const isAnswered = hasAnswer(idx);
    const isMarked = marked.has(idx);
    const isVisited = visited.has(idx);

    if (isAnswered && isMarked) return 'ANSWERED_MARKED';
    if (isAnswered && !isMarked) return 'ANSWERED';
    if (!isAnswered && isMarked) return 'MARKED';
    if (!isAnswered && isVisited) return 'NOT_ANSWERED';
    return 'NOT_VISITED';
  };

  const getPaletteColorInfo = (status: string) => {
    switch (status) {
      case 'ANSWERED':
        return { bg: 'bg-[#2ecc71]', border: 'border-[#27ae60]', text: 'text-white' };
      case 'NOT_ANSWERED':
        return { bg: 'bg-[#e74c3c]', border: 'border-[#c0392b]', text: 'text-white' };
      case 'MARKED':
        return { bg: 'bg-[#9b59b6]', border: 'border-[#8e44ad]', text: 'text-white' };
      case 'ANSWERED_MARKED':
        return { bg: 'bg-[#9b59b6]', border: 'border-[#8e44ad]', text: 'text-white' };
      default: // NOT_VISITED
        return { bg: 'bg-[#ecf0f1]', border: 'border-[#bdc3c7]', text: 'text-gray-800' };
    }
  };

  // Check if current option is selected (works for both single and multi)
  const isOptionSelected = (option: string): boolean => {
    const ans = answers[currentIdx];
    if (!ans) return false;
    if (Array.isArray(ans)) return ans.includes(option);
    return ans === option;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans select-none overflow-hidden text-sm">
      {/* Top Header */}
      <header className="bg-[#2c3e50] text-white py-2 px-4 shadow-md flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-xs text-white shadow-sm">
            Q2
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide leading-tight">{quiz.title}</h1>
            <div className="text-[11px] text-gray-300 flex items-center gap-1.5">
              <span className="font-semibold text-white">Quizify 2</span>
              <span>•</span>
              <span className="text-orange-400 font-medium">Made by Saksham Sooden</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block bg-white/10 text-gray-200 border border-white/20 px-2.5 py-1 rounded text-xs font-semibold">
            Quizify 2
          </span>
          <span className="bg-orange-500 text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs">
            Saksham Sooden
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane (Question Area) */}
        <div className="flex-1 flex flex-col bg-white border-r border-gray-300 relative min-w-0">
          
          {/* Section Header */}
          <div className="bg-[#34495e] text-white px-4 py-2 border-b border-gray-300 flex justify-between items-center shrink-0">
            <span className="font-semibold uppercase text-xs tracking-wider">Default Section</span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-6 py-3 shrink-0">
             <div className="flex items-center gap-3">
               <span className="text-lg font-bold text-gray-800">Question No. {currentIdx + 1}</span>
               {isCurrentMSQ && (
                 <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold border border-amber-300 uppercase tracking-wider">
                   MSQ — Select All Correct
                 </span>
               )}
             </div>
             <div className="text-gray-600 flex items-center gap-2">
                <span className="font-semibold">Marks: +1, -0</span>
             </div>
          </div>
          
          {/* Question Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
            <h3 className="text-base text-gray-900 font-medium mb-6 whitespace-pre-wrap leading-relaxed">
              {question.question}
            </h3>
            
            <div className="space-y-3 pl-2">
              {question.options.map((option, idx) => {
                const char = String.fromCharCode(65 + idx);
                const isSelected = isOptionSelected(option);
                
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded cursor-pointer border hover:bg-blue-50 transition-colors ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                    }`}
                  >
                    {isCurrentMSQ ? (
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 rounded" 
                        checked={isSelected}
                        onChange={() => handleToggleMulti(option)}
                      />
                    ) : (
                      <input 
                        type="radio" 
                        name={`question-${currentIdx}`} 
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500" 
                        checked={isSelected}
                        onChange={() => handleSelectSingle(option)}
                      />
                    )}
                    <div className="flex-1">
                      <span className="font-bold mr-2 text-gray-700">{char}.</span>
                      <span className="text-gray-800 text-base">{option}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-gray-50 border-t border-gray-300 p-3 flex justify-between items-center shrink-0">
            <div className="flex gap-2">
              <button
                onClick={handleMarkReviewNext}
                className="flex items-center gap-1 bg-white text-gray-800 px-4 py-2 text-sm border border-gray-300 rounded shadow-sm hover:bg-gray-100 font-medium whitespace-nowrap transition"
              >
                <Star className="w-4 h-4 text-purple-600" />
                Mark for Review & Next
              </button>
              <button
                onClick={handleClear}
                className="bg-white text-gray-800 px-4 py-2 text-sm border border-gray-300 rounded shadow-sm hover:bg-gray-100 font-medium whitespace-nowrap transition"
              >
                Clear Response
              </button>
            </div>
            
            <button
              onClick={handleSaveNext}
              className="bg-[#2980b9] text-white px-6 py-2 text-sm rounded shadow-sm hover:bg-[#206796] font-semibold whitespace-nowrap transition"
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Pane (Palette Navigation) */}
        <div className="w-72 bg-[#ecf0f1] flex flex-col shrink-0 relative overflow-hidden">
          
          {/* User Profile Area */}
          <div className={`p-3 border-b border-gray-300 flex items-center justify-between gap-3 shrink-0 ${isSpecialUser ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              {isSpecialUser ? (
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md ring-2 ring-yellow-300/50">
                  <Crown className="w-5 h-5 text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ring-1 ring-white">
                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div className="select-text leading-tight">
                <div className={`font-bold text-xs ${isSpecialUser ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500' : 'text-gray-800'}`}>
                  {playerName || 'Student Portal'}
                </div>
                <div className="text-[10px] text-gray-500">
                  {isSpecialUser ? '👑 Ultra Admin • LVL 9000' : 'Quizify 2 Platform'}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                {isSpecialUser ? (
                  <>
                    <span className="text-[8px] bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-black px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                    </span>
                    <span className="text-[8px] bg-gradient-to-r from-purple-500 to-purple-700 text-white font-black px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> PRO
                    </span>
                  </>
                ) : (
                  <div className="text-[9px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded border border-orange-200">
                    {playerName || 'Player'}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleLogoutOrSwitch}
                  title="Switch user or logout"
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-200 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Legends */}
          <div className="p-3 border-b border-gray-300 bg-white shrink-0">
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-[#ecf0f1] border border-[#bdc3c7] text-[#7f8c8d] shadow-inner rounded-sm">1</span> Not Visited
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-[#e74c3c] border border-[#c0392b] text-white rounded-sm shadow-inner rounded-b-md">1</span> Not Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-[#2ecc71] border border-[#27ae60] text-white rounded-sm shadow-inner rounded-t-md">1</span> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-[#9b59b6] border border-[#8e44ad] text-white rounded-full shadow-inner">1</span> Marked
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-700">
                <div className="relative w-6 h-6 flex items-center justify-center bg-[#9b59b6] border border-[#8e44ad] text-white rounded-full shadow-inner shrink-0">
                  1
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ecc71] rounded-full border border-white"></div>
                </div> 
                Answered & Marked for Review
            </div>
          </div>

          {/* Palette Grid */}
          <div className="p-3 bg-[#e8ecef] text-[#34495e] font-bold text-xs shrink-0 flex justify-between items-center border-b border-gray-300">
            <span>Question Palette:</span>
            <span title="Navigate to any question directly by clicking on the number.">
              <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-white grid grid-cols-4 gap-3 content-start">
            {quiz.questions.map((q, idx) => {
              const status = getStatus(idx);
              const colors = getPaletteColorInfo(status);
              const isActive = currentIdx === idx;
              const qIsMSQ = isMSQ(q.correctAnswer);
              
              let shapeClass = "rounded-sm";
              if (status === 'ANSWERED') shapeClass = "rounded-t-md";
              if (status === 'NOT_ANSWERED') shapeClass = "rounded-b-md";
              if (status === 'MARKED' || status === 'ANSWERED_MARKED') shapeClass = "rounded-full";

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  title={qIsMSQ ? `Q${idx+1} (MSQ)` : `Q${idx+1}`}
                  className={`relative w-10 h-10 flex items-center justify-center text-sm font-bold border transition-transform hover:scale-105 shadow-inner ${colors.bg} ${colors.text} ${colors.border} ${shapeClass} ${isActive ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' : ''}`}
                >
                  {idx + 1}
                  {status === 'ANSWERED_MARKED' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#2ecc71] rounded-full border border-white shrink-0 shadow-sm"></div>
                  )}
                  {qIsMSQ && (
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-400 rounded-full border border-white text-[6px] flex items-center justify-center font-black text-amber-900">M</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="p-4 border-t border-gray-300 bg-gray-100 shrink-0 flex flex-col items-center gap-2">
             <button onClick={handleSubmit} className="w-full bg-[#16a085] hover:bg-[#12876f] text-white py-2 px-4 rounded shadow font-bold text-sm transition-colors border border-[#117a65]">
               Submit
             </button>
             <div className="text-[10px] text-gray-500 font-medium">
               Quizify 2 • <span className="text-orange-600 font-semibold">Made by Saksham Sooden</span>
             </div>
          </div>
        </div>
      </div>

      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Exam</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to submit? You cannot change your answers after submission.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSubmit}
                className="px-4 py-2 bg-[#16a085] hover:bg-[#12876f] text-white text-sm rounded font-bold shadow transition cursor-pointer"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <PlayerNameModal
        isOpen={showChangeUserModal}
        onConfirm={handleConfirmNewUser}
        onCancel={() => setShowChangeUserModal(false)}
      />
    </div>
  );
}
