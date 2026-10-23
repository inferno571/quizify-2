import React, { useState, useEffect } from 'react';
import { Quiz } from '../lib/types';
import { 
  Info, 
  UserCircle, 
  Star, 
  Crown, 
  Shield, 
  CheckCircle, 
  Sparkles, 
  LogOut, 
  Shuffle, 
  RotateCw, 
  Bookmark, 
  BookmarkCheck, 
  Pause, 
  Play, 
  RotateCcw, 
  ArrowLeft,
  Users,
  Swords,
  UserCheck,
  Edit2,
  Check,
  Flame
} from 'lucide-react';
import { PlayerNameModal } from './PlayerNameModal';
import { getSavedProgress, saveQuizProgress, clearQuizProgress } from '../lib/storage';
import { MathText } from './MathText';
import { LarpGuideButton } from './LarpGuideModal';
import { QuizReactionButton } from './QuizReactionButton';
import { ThemeToggle } from './ThemeToggle';
import { QuizThemeSurface } from './QuizThemeSurface';
import { useTheme } from './ThemeProvider';
import { UltraLarpSubmitModal } from './UltraLarpSubmitModal';


const SAKSHAM_NAME = 'Saksham Sooden';
function isSakshamUser(name: string): boolean {
  return name.trim().toLowerCase() === SAKSHAM_NAME.toLowerCase();
}

export interface TwoPlayerAttemptInfo {
  isTwoPlayer: boolean;
  player1Name: string;
  player2Name: string;
  player2Answers: Record<number, string | string[]>;
  conflictQuestions: number[];
}

interface QuizScreenProps {
  quiz: Quiz;
  onComplete: (
    answers: Record<number, string | string[]>, 
    starred: number[],
    twoPlayerInfo?: TwoPlayerAttemptInfo
  ) => void;
  onExit?: () => void;
}

/** Check if a question is MSQ (multiple correct answers) */
function isMSQ(correctAnswer: string | string[]): boolean {
  return Array.isArray(correctAnswer) && correctAnswer.length > 1;
}

export function QuizScreen({ quiz, onComplete, onExit }: QuizScreenProps) {
  const isGenAICV = 
    quiz.subject === 'Generative AI for Computer Vision' || 
    quiz.id.startsWith('genai_cv') || 
    quiz.id.startsWith('genai-cv');

  const { theme, setTheme } = useTheme();

  // Compulsory LARP Theme for Generative AI for Computer Vision
  useEffect(() => {
    if (isGenAICV && theme !== 'larp') {
      setTheme('larp');
    }
  }, [isGenAICV, theme, setTheme]);

  const [showUltraLarpSubmit, setShowUltraLarpSubmit] = useState(false);

  // Check for saved in-progress session for this quiz
  const initialSaved = typeof window !== 'undefined' ? getSavedProgress(quiz.id) : null;

  // Question order randomization state (e.g. 1-10 question order)
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(() => {
    if (initialSaved?.shuffleQuestions !== undefined) {
      return initialSaved.shuffleQuestions;
    }
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizify_shuffle_questions') === 'true';
    }
    return false;
  });

  const generateQuestionOrder = (count: number) => {
    const arr = Array.from({ length: count }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [questionOrder, setQuestionOrder] = useState<number[]>(() => {
    if (initialSaved?.questionOrder && initialSaved.questionOrder.length === quiz.questions.length) {
      return initialSaved.questionOrder;
    }
    const count = quiz.questions.length;
    if (typeof window !== 'undefined' && localStorage.getItem('quizify_shuffle_questions') === 'true') {
      const arr = Array.from({ length: count }, (_, i) => i);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    return Array.from({ length: count }, (_, i) => i);
  });

  // currentPos is the 0-based position in the current questionOrder (0 to N-1)
  const [currentPos, setCurrentPos] = useState<number>(() => {
    if (initialSaved && typeof initialSaved.currentPos === 'number') {
      return Math.min(Math.max(0, initialSaved.currentPos), quiz.questions.length - 1);
    }
    return 0;
  });

  // Map position to original question index in quiz.questions
  const origIdx = questionOrder[currentPos] ?? currentPos;

  const [answers, setAnswers] = useState<Record<number, string | string[]>>(() => {
    return initialSaved?.answers || {};
  });
  const [visited, setVisited] = useState<Set<number>>(() => {
    if (initialSaved?.visited && initialSaved.visited.length > 0) {
      return new Set(initialSaved.visited);
    }
    return new Set([questionOrder[0] ?? 0]);
  });
  const [marked, setMarked] = useState<Set<number>>(() => {
    if (initialSaved?.marked) {
      return new Set(initialSaved.marked);
    }
    return new Set();
  });
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [resumedBannerVisible, setResumedBannerVisible] = useState(() => {
    return Boolean(initialSaved && (Object.keys(initialSaved.answers || {}).length > 0 || initialSaved.currentPos > 0));
  });

  const [playerName, setPlayerName] = useState<string | null>(null);
  const [showChangeUserModal, setShowChangeUserModal] = useState(false);

  // 2-Player Mode State
  const [isTwoPlayer, setIsTwoPlayer] = useState<boolean>(() => {
    if (initialSaved?.isTwoPlayer !== undefined) return initialSaved.isTwoPlayer;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizify_two_player_mode') === 'true';
    }
    return false;
  });

  const [player2Name, setPlayer2Name] = useState<string>(() => {
    return initialSaved?.player2Name || 'Player 2';
  });
  const [isEditingP2Name, setIsEditingP2Name] = useState(false);

  const [player2Answers, setPlayer2Answers] = useState<Record<number, string | string[]>>(() => {
    return initialSaved?.player2Answers || {};
  });

  const [conflictQuestions, setConflictQuestions] = useState<Set<number>>(() => {
    if (initialSaved?.conflictQuestions && Array.isArray(initialSaved.conflictQuestions)) {
      return new Set(initialSaved.conflictQuestions);
    }
    return new Set();
  });

  const [activeConflictPlayer, setActiveConflictPlayer] = useState<1 | 2>(1);

  // Option order randomization slider state
  const [randomizeOptions, setRandomizeOptions] = useState<boolean>(() => {
    if (initialSaved?.randomizeOptions !== undefined) {
      return initialSaved.randomizeOptions;
    }
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizify_randomize_options') === 'true';
    }
    return false;
  });

  // Fisher-Yates generator for consistent shuffling across all questions
  const createShuffledMap = (questions: typeof quiz.questions) => {
    const map: Record<number, string[]> = {};
    questions.forEach((q, idx) => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      map[idx] = opts;
    });
    return map;
  };

  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, string[]>>(() => {
    if (initialSaved?.shuffledOptionsMap && Object.keys(initialSaved.shuffledOptionsMap).length > 0) {
      return initialSaved.shuffledOptionsMap;
    }
    if (typeof window !== 'undefined' && localStorage.getItem('quizify_randomize_options') === 'true') {
      return createShuffledMap(quiz.questions);
    }
    return {};
  });

  // Auto-save test progress in background so work is never lost
  useEffect(() => {
    saveQuizProgress({
      quizId: quiz.id,
      answers,
      marked: Array.from(marked),
      visited: Array.from(visited),
      currentPos,
      questionOrder,
      shuffledOptionsMap,
      shuffleQuestions,
      randomizeOptions,
      savedAt: new Date().toISOString(),
      isTwoPlayer,
      player1Name: playerName || 'Player 1',
      player2Name,
      player2Answers,
      conflictQuestions: Array.from(conflictQuestions),
    });
  }, [
    quiz.id, 
    answers, 
    marked, 
    visited, 
    currentPos, 
    questionOrder, 
    shuffledOptionsMap, 
    shuffleQuestions, 
    randomizeOptions,
    isTwoPlayer,
    playerName,
    player2Name,
    player2Answers,
    conflictQuestions
  ]);

  const toggleTwoPlayerMode = () => {
    setIsTwoPlayer((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizify_two_player_mode', String(next));
      }
      if (next) {
        // When enabling, make sure player2Answers has whatever answers are currently selected
        setPlayer2Answers((p2) => {
          const merged = { ...answers, ...p2 };
          return merged;
        });
      }
      return next;
    });
  };

  const toggleShuffleQuestions = () => {
    setShuffleQuestions((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizify_shuffle_questions', String(next));
      }
      if (next) {
        setQuestionOrder(generateQuestionOrder(quiz.questions.length));
      } else {
        setQuestionOrder(Array.from({ length: quiz.questions.length }, (_, i) => i));
      }
      setCurrentPos(0);
      return next;
    });
  };

  const reshuffleQuestionOrder = () => {
    if (!shuffleQuestions) {
      setShuffleQuestions(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizify_shuffle_questions', 'true');
      }
    }
    setQuestionOrder(generateQuestionOrder(quiz.questions.length));
    setCurrentPos(0);
  };

  const toggleRandomize = () => {
    setRandomizeOptions((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizify_randomize_options', String(next));
      }
      if (next) {
        setShuffledOptionsMap(createShuffledMap(quiz.questions));
      } else {
        setShuffledOptionsMap({});
      }
      return next;
    });
  };

  const reshuffleCurrentOptions = () => {
    setShuffledOptionsMap(createShuffledMap(quiz.questions));
  };

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

  const question = quiz.questions[origIdx] || quiz.questions[0];
  const isCurrentMSQ = isMSQ(question.correctAnswer);

  useEffect(() => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(origIdx);
      return next;
    });
  }, [origIdx]);

  const isCurrentConflict = isTwoPlayer && conflictQuestions.has(origIdx);

  const handleTriggerConflict = () => {
    setConflictQuestions((prev) => {
      const next = new Set(prev);
      next.add(origIdx);
      return next;
    });
    // Ensure player 2 has an initial copy of current answer if not set
    setPlayer2Answers((prev) => {
      if (prev[origIdx] === undefined && answers[origIdx] !== undefined) {
        return { ...prev, [origIdx]: answers[origIdx] };
      }
      return prev;
    });
    setActiveConflictPlayer(2);
  };

  const handleResolveConsensus = () => {
    setConflictQuestions((prev) => {
      const next = new Set(prev);
      next.delete(origIdx);
      return next;
    });
    // Sync player 2 to whatever player 1 answered
    setPlayer2Answers((prev) => {
      const next = { ...prev };
      if (answers[origIdx] !== undefined) {
        next[origIdx] = answers[origIdx];
      } else {
        delete next[origIdx];
      }
      return next;
    });
  };

  const handleAssignOptionToPlayer = (playerNum: 1 | 2, option: string) => {
    if (playerNum === 1) {
      if (isCurrentMSQ) {
        setAnswers((prev) => {
          const current = prev[origIdx];
          const currentArr = Array.isArray(current) ? [...current] : current ? [current] : [];
          const idx = currentArr.indexOf(option);
          if (idx >= 0) currentArr.splice(idx, 1);
          else currentArr.push(option);
          return { ...prev, [origIdx]: currentArr.length > 0 ? currentArr : [] };
        });
      } else {
        setAnswers((prev) => ({ ...prev, [origIdx]: option }));
      }
    } else {
      if (isCurrentMSQ) {
        setPlayer2Answers((prev) => {
          const current = prev[origIdx];
          const currentArr = Array.isArray(current) ? [...current] : current ? [current] : [];
          const idx = currentArr.indexOf(option);
          if (idx >= 0) currentArr.splice(idx, 1);
          else currentArr.push(option);
          return { ...prev, [origIdx]: currentArr.length > 0 ? currentArr : [] };
        });
      } else {
        setPlayer2Answers((prev) => ({ ...prev, [origIdx]: option }));
      }
    }
  };

  const handleSelectSingle = (option: string) => {
    if (!isTwoPlayer || !conflictQuestions.has(origIdx)) {
      setAnswers((prev) => ({ ...prev, [origIdx]: option }));
      if (isTwoPlayer) {
        setPlayer2Answers((prev) => ({ ...prev, [origIdx]: option }));
      }
    } else {
      handleAssignOptionToPlayer(activeConflictPlayer, option);
    }
  };

  const handleToggleMulti = (option: string) => {
    if (!isTwoPlayer || !conflictQuestions.has(origIdx)) {
      setAnswers((prev) => {
        const current = prev[origIdx];
        const currentArr = Array.isArray(current) ? [...current] : current ? [current] : [];
        const idx = currentArr.indexOf(option);
        if (idx >= 0) {
          currentArr.splice(idx, 1);
        } else {
          currentArr.push(option);
        }
        const next = { ...prev, [origIdx]: currentArr.length > 0 ? currentArr : [] };
        if (isTwoPlayer) {
          setPlayer2Answers((p2) => ({ ...p2, [origIdx]: currentArr.length > 0 ? currentArr : [] }));
        }
        return next;
      });
    } else {
      handleAssignOptionToPlayer(activeConflictPlayer, option);
    }
  };

  const handleSaveNext = () => {
    // Remove marked status if saved normally
    setMarked((prev) => {
      const next = new Set(prev);
      next.delete(origIdx);
      return next;
    });
    if (currentPos < quiz.questions.length - 1) {
      setCurrentPos((p) => p + 1);
    }
  };

  const handleClear = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[origIdx];
      return next;
    });
    if (isTwoPlayer) {
      setPlayer2Answers((prev) => {
        const next = { ...prev };
        delete next[origIdx];
        return next;
      });
      setConflictQuestions((prev) => {
        const next = new Set(prev);
        next.delete(origIdx);
        return next;
      });
    }
  };

  const handleMarkReviewNext = () => {
    setMarked((prev) => {
      const next = new Set(prev);
      next.add(origIdx);
      return next;
    });
    if (currentPos < quiz.questions.length - 1) {
      setCurrentPos((p) => p + 1);
    }
  };

  const handleSubmit = () => {
    setShowConfirmSubmit(true);
  };

  const executeFinalSubmit = () => {
    const effectiveP2Answers: Record<number, string | string[]> = {};
    quiz.questions.forEach((_, idx) => {
      if (conflictQuestions.has(idx)) {
        effectiveP2Answers[idx] = player2Answers[idx] !== undefined ? player2Answers[idx] : (answers[idx] || "");
      } else {
        effectiveP2Answers[idx] = answers[idx] || "";
      }
    });

    onComplete(
      answers, 
      Array.from(marked),
      isTwoPlayer ? {
        isTwoPlayer: true,
        player1Name: playerName || "Player 1",
        player2Name: player2Name || "Player 2",
        player2Answers: effectiveP2Answers,
        conflictQuestions: Array.from(conflictQuestions),
      } : undefined
    );
  };

  const confirmSubmit = () => {
    setShowConfirmSubmit(false);
    clearQuizProgress(quiz.id);

    if (isGenAICV) {
      setShowUltraLarpSubmit(true);
    } else {
      executeFinalSubmit();
    }
  };

  const handleRestartFresh = () => {
    if (confirm("Are you sure you want to restart this test from Question 1? Current in-progress answers will be cleared.")) {
      clearQuizProgress(quiz.id);
      setAnswers({});
      setPlayer2Answers({});
      setConflictQuestions(new Set());
      setMarked(new Set());
      setVisited(new Set([questionOrder[0] ?? 0]));
      setCurrentPos(0);
      setResumedBannerVisible(false);
      setSaveToast("Test reset to Question 1.");
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  const hasAnswer = (idx: number): boolean => {
    const ans = answers[idx];
    const hasP1 = ans !== undefined && ans !== null && (Array.isArray(ans) ? ans.length > 0 : ans !== "");
    if (!isTwoPlayer || !conflictQuestions.has(idx)) {
      return hasP1;
    }
    const p2Ans = player2Answers[idx];
    const hasP2 = p2Ans !== undefined && p2Ans !== null && (Array.isArray(p2Ans) ? p2Ans.length > 0 : p2Ans !== "");
    return hasP1 && hasP2;
  };

  const getStatus = (idx: number): 'ANSWERED_MARKED' | 'MARKED' | 'ANSWERED' | 'NOT_ANSWERED' | 'NOT_VISITED' => {
    const isAnswered = hasAnswer(idx);
    const isMarked = marked.has(idx);
    const isVisited = visited.has(idx);

    if (isAnswered && isMarked) return 'ANSWERED_MARKED';
    if (isMarked) return 'MARKED';
    if (isAnswered) return 'ANSWERED';
    if (isVisited) return 'NOT_ANSWERED';
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



  const isP1Selected = (option: string): boolean => {
    const ans = answers[origIdx];
    if (!ans) return false;
    if (Array.isArray(ans)) return ans.includes(option);
    return ans === option;
  };

  const isP2Selected = (option: string): boolean => {
    if (!isTwoPlayer) return false;
    const ans = conflictQuestions.has(origIdx) ? player2Answers[origIdx] : answers[origIdx];
    if (!ans) return false;
    if (Array.isArray(ans)) return ans.includes(option);
    return ans === option;
  };

  // Check if current option is selected (works for both single and multi)
  const isOptionSelected = (option: string): boolean => {
    if (isTwoPlayer && isCurrentConflict) {
      return activeConflictPlayer === 1 ? isP1Selected(option) : isP2Selected(option);
    }
    return isP1Selected(option);
  };

  // Determine displayed options for current question based on randomizeOptions
  const displayedOptions = (randomizeOptions && shuffledOptionsMap[origIdx] && shuffledOptionsMap[origIdx].length === question.options.length)
    ? shuffledOptionsMap[origIdx]
    : question.options;

  // Clean displayed question text so question number matches current position (1 to N)
  const cleanQuestionBody = question.question.replace(/^\d+[\.\)]\s*/, '');
  const displayedQuestionText = `${currentPos + 1}. ${cleanQuestionBody}`;

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz-screen app-background flex flex-col h-dvh bg-canvas font-sans select-none overflow-hidden text-sm text-gray-900 dark:text-white transition-colors duration-200">
      {/* Top Header */}
      <header className="bg-[#1e293b] dark:bg-canvas border-b border-gray-700/50 dark:border-outline text-white py-2 px-4 shadow-md flex flex-wrap gap-2 justify-between items-center z-10 shrink-0 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-xs text-white shadow-sm">
            Q5
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide leading-tight">{quiz.title}</h1>
            <div className="text-[11px] text-gray-300 dark:text-neutral-400 flex items-center gap-1.5">
              <span className="font-semibold text-white">Quizify 5 Pro Ultra</span>
              <span>•</span>
              <span className="text-orange-400 font-medium">Made by Saksham Sooden</span>
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Shuffle Questions Order Slider / Button */}
          <div 
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all ${
              shuffleQuestions 
                ? 'bg-purple-500/25 border-purple-400/60 shadow-sm shadow-purple-500/20 text-white' 
                : 'bg-black/20 border-white/10 hover:border-white/20 text-gray-300'
            }`}
            title="Shuffle question order (e.g. 1-10 question order)"
          >
            <div className="flex items-center gap-1.5">
              <Shuffle className={`w-3.5 h-3.5 transition-colors ${shuffleQuestions ? 'text-purple-300 animate-pulse' : 'text-gray-400'}`} />
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline whitespace-nowrap">
                Shuffle Questions
              </span>
              <span className="text-xs font-semibold text-gray-200 sm:hidden">
                Q-Order
              </span>
            </div>

            {/* Interactive Slider Switch */}
            <button
              type="button"
              role="switch"
              id="shuffle-questions-slider"
              aria-checked={shuffleQuestions}
              onClick={toggleShuffleQuestions}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                shuffleQuestions ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Shuffle question order</span>
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  shuffleQuestions ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-[10px] font-bold px-1 rounded uppercase tracking-wider ${
              shuffleQuestions ? 'bg-purple-400 text-slate-950 font-black' : 'text-gray-400'
            }`}>
              {shuffleQuestions ? 'ON' : 'OFF'}
            </span>

            {shuffleQuestions && (
              <button
                type="button"
                onClick={reshuffleQuestionOrder}
                title="Reshuffle question order now"
                className="text-purple-300 hover:text-white p-0.5 rounded transition cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Randomize Options Slider Switch in Top Right */}
          <div 
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all ${
              randomizeOptions 
                ? 'bg-amber-500/20 border-amber-400/50 shadow-sm shadow-amber-500/20 text-white' 
                : 'bg-black/20 border-white/10 hover:border-white/20 text-gray-300'
            }`}
            title="Randomize option display order (slider in top right)"
          >
            <div className="flex items-center gap-1.5">
              <Shuffle className={`w-3.5 h-3.5 transition-colors ${randomizeOptions ? 'text-amber-400 animate-pulse' : 'text-gray-400'}`} />
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline whitespace-nowrap">
                Randomize Options
              </span>
              <span className="text-xs font-semibold text-gray-200 sm:hidden">
                Shuffle
              </span>
            </div>

            {/* Interactive Slider Switch */}
            <button
              type="button"
              role="switch"
              id="randomize-options-slider"
              aria-checked={randomizeOptions}
              onClick={toggleRandomize}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                randomizeOptions ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Randomize options order</span>
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  randomizeOptions ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-[10px] font-bold px-1 rounded uppercase tracking-wider ${
              randomizeOptions ? 'bg-amber-400 text-slate-950 font-black' : 'text-gray-400'
            }`}>
              {randomizeOptions ? 'ON' : 'OFF'}
            </span>

            {randomizeOptions && (
              <button
                type="button"
                onClick={reshuffleCurrentOptions}
                title="Reshuffle current option order"
                className="text-amber-300 hover:text-white p-0.5 rounded transition cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 2-Player Mode Switch in Header */}
          <div 
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all ${
              isTwoPlayer 
                ? 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 border-purple-400/60 shadow-sm shadow-purple-500/20 text-white' 
                : 'bg-black/20 border-white/10 hover:border-white/20 text-gray-300'
            }`}
            title="Toggle 2-Player mode with independent/consensus answer selection"
          >
            <div className="flex items-center gap-1.5">
              <Users className={`w-3.5 h-3.5 transition-colors ${isTwoPlayer ? 'text-purple-300 animate-pulse' : 'text-gray-400'}`} />
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline whitespace-nowrap">
                2-Player Mode
              </span>
              <span className="text-xs font-semibold text-gray-200 sm:hidden">
                2P
              </span>
            </div>

            {/* Interactive Slider Switch */}
            <button
              type="button"
              role="switch"
              id="two-player-mode-slider"
              aria-checked={isTwoPlayer}
              onClick={toggleTwoPlayerMode}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                isTwoPlayer ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'
              }`}
            >
              <span className="sr-only">Toggle 2-Player Mode</span>
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isTwoPlayer ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-[10px] font-bold px-1 rounded uppercase tracking-wider ${
              isTwoPlayer ? 'bg-purple-400 text-slate-950 font-black' : 'text-gray-400'
            }`}>
              {isTwoPlayer ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Theme Toggle or Compulsory LARP Badge */}
          {isGenAICV ? (
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)] animate-pulse"
              title="LARP Theme is strictly compulsory for Generative AI for Computer Vision"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black tracking-tight uppercase whitespace-nowrap">LARP LOCKED</span>
            </div>
          ) : (
            <ThemeToggle compact />
          )}
          <button type="button" className="lg:hidden px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-xs"
            aria-expanded={showQuestionPalette} aria-controls="question-palette"
            onClick={() => setShowQuestionPalette(value => !value)}>
            {showQuestionPalette ? 'Hide questions' : 'Questions'}
          </button>

          {/* NPTEL LARP Guide */}
          <div className="hidden md:block">
            <LarpGuideButton />
          </div>

          {/* LARP Successful Button */}
          <div className="hidden lg:block">
            <QuizReactionButton />
          </div>

          {/* Save & Exit Button in Header */}
          <button
            type="button"
            onClick={() => setShowSaveModal(true)}

            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black shadow-sm transition cursor-pointer active:scale-95"
            title="Save your test progress and resume later"
          >
            <Bookmark className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden sm:inline">Save & Pause</span>
            <span className="sm:hidden">Save</span>
          </button>

          {/* Quick Exit to Dashboard Button */}
          <button
            type="button"
            onClick={() => {
              if (onExit) {
                onExit();
              } else {
                window.location.href = '/dashboard';
              }
            }}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-gray-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-white/20 transition cursor-pointer"
            title="Exit to Dashboard (progress auto-saved)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <span className="hidden xl:inline-block bg-white/10 text-gray-200 border border-white/20 px-2.5 py-1 rounded text-xs font-semibold">
            Quizify 5 Pro Ultra
          </span>

          <span className="hidden md:inline-block bg-orange-500 text-white px-2.5 py-1 rounded text-xs font-bold shadow-xs">
            Saksham Sooden
          </span>
        </div>
      </header>

      {/* Resumed Progress Notification Banner */}
      {resumedBannerVisible && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shrink-0 shadow-xs border-b border-orange-600">
          <div className="flex items-center gap-2 flex-wrap">
            <BookmarkCheck className="w-4 h-4 fill-slate-950" />
            <span>
              Resumed In-Progress Test: Resuming from Question {currentPos + 1} of {quiz.questions.length} ({answeredCount} questions already answered).
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleRestartFresh} 
              className="bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 px-2 py-0.5 rounded text-[11px] font-black cursor-pointer transition underline"
            >
              Start Over Fresh
            </button>
            <button 
              onClick={() => setResumedBannerVisible(false)} 
              className="text-slate-950 hover:opacity-75 font-black text-sm px-1 cursor-pointer"
              title="Dismiss notification"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Left Pane (Question Area) */}
        <QuizThemeSurface className="quiz-question-pane flex-1 flex flex-col bg-white dark:bg-canvas border-r border-gray-300 dark:border-outline relative min-w-0 transition-colors">
          
          {/* Section Header */}
          <div className="bg-[#34495e] dark:bg-surface text-white px-4 py-2 border-b border-gray-300 dark:border-outline flex justify-between items-center shrink-0">
            <span className="font-semibold uppercase text-xs tracking-wider">Default Section</span>
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Answered: {answeredCount}/{quiz.questions.length}
              </span>
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <BookmarkCheck className="w-3.5 h-3.5" /> Auto-Saving Active
              </span>
            </div>
          </div>

          {/* 2-Player Matchup Banner */}
          {isTwoPlayer && (
            <div className="bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10 dark:from-surface-muted dark:to-surface-muted border-b border-purple-200/80 dark:border-outline px-6 py-2.5 flex items-center justify-between text-xs shrink-0 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span className="text-blue-600 dark:text-blue-400 font-black">P1:</span>
                  <span>{playerName || "Player 1"}</span>
                </div>
                <span className="text-gray-400 dark:text-neutral-500 font-black text-xs uppercase tracking-widest">vs</span>
                <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 px-3 py-1 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span className="text-purple-600 dark:text-purple-400 font-black">P2:</span>
                  {isEditingP2Name ? (
                    <input
                      type="text"
                      value={player2Name}
                      onChange={(e) => setPlayer2Name(e.target.value)}
                      onBlur={() => setIsEditingP2Name(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingP2Name(false)}
                      autoFocus
                      className="w-24 px-1 py-0.5 text-xs border border-purple-400 rounded bg-surface-muted text-purple-900 dark:text-purple-200 focus:outline-none"
                    />
                  ) : (
                    <span 
                      onClick={() => setIsEditingP2Name(true)} 
                      className="cursor-pointer hover:underline flex items-center gap-1"
                      title="Click to rename Player 2"
                    >
                      {player2Name || "Player 2"}
                      <Edit2 className="w-2.5 h-2.5 opacity-60 hover:opacity-100" />
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-neutral-300">
                <span className="text-gray-500 dark:text-neutral-400">Mode:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                  isCurrentConflict 
                    ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800' 
                    : 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                }`}>
                  {isCurrentConflict ? '⚔️ Disagreement (Split Answers)' : '🤝 Consensus (Single Shared Answer)'}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 dark:text-neutral-400">Total Conflicts:</span>
                <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-white font-black text-[11px]">
                  {conflictQuestions.size}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between bg-gray-50 dark:bg-surface border-b border-gray-200 dark:border-outline px-6 py-3 shrink-0">
             <div className="flex items-center gap-3 flex-wrap">
               <span className="text-lg font-bold text-gray-800 dark:text-white">Question No. {currentPos + 1}</span>
               {isCurrentMSQ && (
                 <span className="bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-bold border border-amber-300 dark:border-amber-800 uppercase tracking-wider">
                   MSQ — Select All Correct
                 </span>
               )}
               {shuffleQuestions && (
                 <span className="bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-bold border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                   <Shuffle className="w-3 h-3" /> Questions Shuffled (1–{quiz.questions.length})
                 </span>
               )}
               {randomizeOptions && (
                 <span className="bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-bold border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                   <Shuffle className="w-3 h-3" /> Options Randomized
                 </span>
               )}
             </div>
             <div className="flex items-center gap-3">
               <QuizReactionButton />
               <div className="text-gray-600 dark:text-neutral-400 flex items-center gap-2">
                 <span className="font-semibold text-xs sm:text-sm">Marks: +1, -0</span>
               </div>
             </div>
          </div>
          
          {/* Question Content */}
          <div className="quiz-content flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-20 bg-white dark:bg-canvas">
            <div className="quiz-question-card text-base text-gray-900 dark:text-white font-medium mb-6 leading-relaxed">
              <MathText text={displayedQuestionText} block />
            </div>

            {/* 2-Player Question Mode Box (Consensus vs Conflict of Interest) */}
            {isTwoPlayer && (
              <div className={`mb-5 p-3.5 rounded-xl border transition-all ${
                isCurrentConflict 
                  ? 'bg-gradient-to-r from-purple-50 via-pink-50/50 to-blue-50 border-purple-300 shadow-xs' 
                  : 'bg-blue-50/60 border-blue-200 shadow-2xs'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {isCurrentConflict ? (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs uppercase tracking-wide">
                        <Swords className="w-3.5 h-3.5" /> Conflict of Interest Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs">
                        <UserCheck className="w-3.5 h-3.5" /> Consensus (Both Agree)
                      </span>
                    )}
                    <span className="text-xs text-gray-600">
                      {isCurrentConflict 
                        ? "Players disagree on this question. Both can pick different options below." 
                        : "Both players agree on this question. Click once to select for both."}
                    </span>
                  </div>

                  {/* Toggle between Consensus and Conflict for this question */}
                  <div>
                    {isCurrentConflict ? (
                      <button
                        type="button"
                        onClick={handleResolveConsensus}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-300 shadow-2xs transition cursor-pointer"
                      >
                        🤝 We Agree (Merge Choices)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleTriggerConflict}
                        className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black rounded-lg shadow-xs transition cursor-pointer active:scale-95"
                      >
                        <Swords className="w-3.5 h-3.5" /> Disagreement? Split P1 & P2
                      </button>
                    )}
                  </div>
                </div>

                {/* If Conflict Mode is active: Show Active Player Selector */}
                {isCurrentConflict && (
                  <div className="mt-3 pt-2.5 border-t border-purple-200 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Selecting for:</span>
                      <div className="inline-flex rounded-lg p-0.5 bg-gray-200 border border-gray-300">
                        <button
                          type="button"
                          onClick={() => setActiveConflictPlayer(1)}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            activeConflictPlayer === 1 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'text-gray-700 hover:text-black'
                          }`}
                        >
                          🔵 {playerName || "Player 1"}
                          {answers[origIdx] && <Check className="w-3 h-3" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveConflictPlayer(2)}
                          className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            activeConflictPlayer === 2 
                              ? 'bg-purple-600 text-white shadow-xs' 
                              : 'text-gray-700 hover:text-black'
                          }`}
                        >
                          🟣 {player2Name || "Player 2"}
                          {player2Answers[origIdx] && <Check className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-500 italic">
                      Tip: You can also click the [+P1] or [+P2] chips directly on each option!
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-3 pl-2">
              {displayedOptions.map((option, idx) => {
                const char = String.fromCharCode(65 + idx);
                const p1Selected = isP1Selected(option);
                const p2Selected = isP2Selected(option);
                const isSelected = isTwoPlayer 
                  ? (isCurrentConflict ? (activeConflictPlayer === 1 ? p1Selected : p2Selected) : p1Selected)
                  : isOptionSelected(option);

                // Dynamic card styling
                let borderClass = 'bg-surface border-gray-200 dark:border-outline hover:bg-gray-50 dark:hover:bg-surface-hover hover:border-gray-300 dark:hover:border-neutral-700 text-gray-900 dark:text-white shadow-xs';
                if (!isTwoPlayer) {
                  if (isSelected) {
                    borderClass = 'bg-blue-50/90 dark:bg-[#0c192e] border-blue-500 dark:border-blue-500/80 font-semibold text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/60 shadow-sm';
                  }
                } else if (!isCurrentConflict) {
                  if (p1Selected) {
                    borderClass = 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#0c192e] dark:to-[#1a0f2e] border-indigo-400 dark:border-indigo-400 font-semibold text-slate-900 dark:text-white ring-2 ring-indigo-500 shadow-sm';
                  }
                } else {
                  // Conflict mode
                  if (p1Selected && p2Selected) {
                    borderClass = 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-[#0c192e] dark:to-[#1a0f2e] border-indigo-400 dark:border-indigo-400 font-semibold text-slate-900 dark:text-white ring-2 ring-indigo-500 shadow-sm';
                  } else if (p1Selected) {
                    borderClass = 'bg-blue-50 dark:bg-[#0c192e] border-blue-400 dark:border-blue-400 font-semibold text-blue-950 dark:text-blue-100 ring-2 ring-blue-500 shadow-sm';
                  } else if (p2Selected) {
                    borderClass = 'bg-purple-50 dark:bg-[#1a0f2e] border-purple-400 dark:border-purple-400 font-semibold text-purple-950 dark:text-purple-100 ring-2 ring-purple-500 shadow-sm';
                  }
                }

                return (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (isCurrentMSQ) {
                        handleToggleMulti(option);
                      } else {
                        handleSelectSingle(option);
                      }
                    }}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition select-none ${borderClass}`}
                  >
                    {!isTwoPlayer || !isCurrentConflict ? (
                      isCurrentMSQ ? (
                        <input 
                          type="checkbox" 
                          name={`question-${origIdx}`} 
                          className="mt-1 w-4 h-4 text-blue-600 dark:border-outline dark:bg-surface-muted rounded focus:ring-blue-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleToggleMulti(option)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <input 
                          type="radio" 
                          name={`question-${origIdx}`} 
                          className="mt-1 w-4 h-4 text-blue-600 dark:border-outline dark:bg-surface-muted focus:ring-blue-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleSelectSingle(option)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )
                    ) : (
                      <div className="mt-0.5 flex flex-col gap-1 shrink-0">
                        {p1Selected && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs" title={`${playerName || 'P1'} Picked`}>
                            1
                          </span>
                        )}
                        {p2Selected && (
                          <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs" title={`${player2Name || 'P2'} Picked`}>
                            2
                          </span>
                        )}
                        {!p1Selected && !p2Selected && (
                          <div className="w-4 h-4 rounded border border-gray-300 dark:border-outline bg-surface-muted" />
                        )}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <span className="font-bold mr-2 text-gray-800 dark:text-neutral-200">{char}.</span>
                      <span className="text-gray-900 dark:text-white font-medium text-base leading-relaxed">
                        <MathText text={option} />
                      </span>
                    </div>

                    {/* 2-Player Status Badges & Quick-Assign Buttons */}
                    {isTwoPlayer && (
                      <div className="flex items-center gap-1.5 shrink-0 self-center">
                        {!isCurrentConflict ? (
                          p1Selected && (
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                              🤝 Both (P1 & P2)
                            </span>
                          )
                        ) : (
                          <div className="flex items-center gap-1.5">
                            {/* Visual badges for selections */}
                            {p1Selected && (
                              <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                                🔵 {playerName || 'P1'}
                              </span>
                            )}
                            {p2Selected && (
                              <span className="inline-flex items-center gap-1 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                                🟣 {player2Name || 'P2'}
                              </span>
                            )}

                            {/* Direct quick-assign chips */}
                            <div className="flex items-center gap-1 pl-1 border-l border-gray-300">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAssignOptionToPlayer(1, option);
                                }}
                                className={`px-2 py-0.5 rounded text-[11px] font-black transition cursor-pointer border ${
                                  p1Selected
                                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                                    : 'bg-white hover:bg-blue-50 text-blue-700 border-blue-300'
                                }`}
                                title={`Toggle selection for ${playerName || 'Player 1'}`}
                              >
                                + P1
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAssignOptionToPlayer(2, option);
                                }}
                                className={`px-2 py-0.5 rounded text-[11px] font-black transition cursor-pointer border ${
                                  p2Selected
                                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                                    : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-300'
                                }`}
                                title={`Toggle selection for ${player2Name || 'Player 2'}`}
                              >
                                + P2
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-gray-50 dark:bg-surface border-t border-gray-300 dark:border-outline p-3 flex flex-wrap gap-3 justify-between items-center shrink-0">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleMarkReviewNext}
                className="flex items-center gap-1 bg-surface-muted text-gray-800 dark:text-neutral-200 px-4 py-2 text-sm border border-gray-300 dark:border-outline rounded shadow-sm hover:bg-gray-100 dark:hover:bg-surface-hover font-medium whitespace-nowrap transition cursor-pointer"
              >
                <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Mark for Review & Next
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1 bg-surface-muted text-gray-800 dark:text-neutral-200 px-4 py-2 text-sm border border-gray-300 dark:border-outline rounded shadow-sm hover:bg-gray-100 dark:hover:bg-surface-hover font-medium whitespace-nowrap transition cursor-pointer"
              >
                Clear Response
              </button>
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 px-3.5 py-2 text-sm rounded shadow-sm hover:bg-amber-100 dark:hover:bg-amber-900/40 font-semibold whitespace-nowrap transition cursor-pointer"
                title="Save current test progress and resume anytime later"
              >
                <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Save & Pause
              </button>
              <QuizReactionButton />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveNext}
                className="bg-[#2980b9] text-white px-6 py-2 text-sm rounded shadow-sm hover:bg-[#206796] font-semibold whitespace-nowrap transition cursor-pointer"
              >
                Save & Next
              </button>
            </div>
          </div>
        </QuizThemeSurface>

        {/* Right Pane (Palette Navigation) */}
        <div id="question-palette" className={`${showQuestionPalette ? 'flex' : 'hidden'} lg:flex absolute inset-y-0 right-0 z-20 lg:static w-[min(18rem,100%)] bg-surface border-l border-outline flex-col shrink-0 overflow-hidden transition-colors`}>
          
          <button type="button" className="lg:hidden p-2 text-foreground bg-surface-muted border-b border-outline font-semibold" onClick={() => setShowQuestionPalette(false)}>Close question palette</button>
          {/* User Profile Area */}
          <div className={`p-3 border-b border-gray-300 dark:border-outline flex items-center justify-between gap-3 shrink-0 ${isSpecialUser ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30' : 'bg-surface'}`}>
            <div className="flex items-center gap-3">
              {isSpecialUser ? (
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md ring-2 ring-yellow-300/50">
                  <Crown className="w-5 h-5 text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ring-1 ring-white">
                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              ) : (
                <UserCircle className="w-10 h-10 text-gray-400 dark:text-neutral-500" />
              )}
              <div className="select-text leading-tight">
                <div className={`font-bold text-xs ${isSpecialUser ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500' : 'text-gray-800 dark:text-white'}`}>
                  {playerName || 'Student Portal'}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-neutral-400">
                  {isSpecialUser ? '👑 Ultra Admin • LVL 9000' : 'Quizify 5 Pro Ultra Platform'}
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
              </div>
              <button 
                onClick={handleLogoutOrSwitch}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-0.5 cursor-pointer"
                title="Switch User / Edit Player Name"
              >
                <LogOut className="w-2.5 h-2.5" /> Switch
              </button>
            </div>
          </div>

          {/* Palette Legend */}
          <div className="p-3 bg-surface border-b border-gray-300 dark:border-outline grid grid-cols-2 gap-2 text-[11px] shrink-0 font-medium text-slate-800 dark:text-neutral-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-5 rounded-t-md bg-[#2ecc71] flex items-center justify-center text-white font-bold text-[10px]">
                {Array.from({length: quiz.questions.length}, (_, i) => i).filter(i => getStatus(i) === 'ANSWERED').length}
              </div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-5 rounded-b-md bg-[#e74c3c] flex items-center justify-center text-white font-bold text-[10px]">
                {Array.from({length: quiz.questions.length}, (_, i) => i).filter(i => getStatus(i) === 'NOT_ANSWERED').length}
              </div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-5 rounded-sm bg-[#ecf0f1] dark:bg-surface-muted border border-gray-300 dark:border-outline flex items-center justify-center text-gray-700 dark:text-neutral-300 font-bold text-[10px]">
                {Array.from({length: quiz.questions.length}, (_, i) => i).filter(i => getStatus(i) === 'NOT_VISITED').length}
              </div>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-5 rounded-full bg-[#9b59b6] flex items-center justify-center text-white font-bold text-[10px]">
                {Array.from({length: quiz.questions.length}, (_, i) => i).filter(i => getStatus(i) === 'MARKED').length}
              </div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-6 h-5 rounded-full bg-[#9b59b6] relative flex items-center justify-center text-white font-bold text-[10px]">
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#2ecc71] rounded-full border border-white"></div>
                {Array.from({length: quiz.questions.length}, (_, i) => i).filter(i => getStatus(i) === 'ANSWERED_MARKED').length}
              </div>
              <span className="leading-tight text-[10px]">Ans. & Marked for Review</span>
            </div>
            {isTwoPlayer && (
              <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-gray-200 dark:border-outline">
                <div className="w-6 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-2xs">
                  ⚔️
                </div>
                <span className="leading-tight text-[10px] font-bold text-purple-900 dark:text-purple-300">
                  Split / Disagreed: {conflictQuestions.size}
                </span>
              </div>
            )}
          </div>

          {/* Palette Grid Header */}
          <div className="p-3 bg-[#e8ecef] dark:bg-surface-muted text-[#34495e] dark:text-neutral-200 font-bold text-xs shrink-0 flex justify-between items-center border-b border-gray-300 dark:border-outline">
            <div className="flex items-center gap-1.5">
              <span>Question Palette:</span>
              {shuffleQuestions && (
                <span className="text-[9px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded font-black border border-purple-200 dark:border-purple-800 uppercase tracking-wide">
                  Shuffled 1–{quiz.questions.length}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={reshuffleQuestionOrder}
              title={`Shuffle 1-${quiz.questions.length} questions order`}
              className="flex items-center gap-1 text-[11px] bg-white dark:bg-surface-muted hover:bg-gray-100 dark:hover:bg-surface-hover text-[#2c3e50] dark:text-white border border-gray-300 dark:border-outline px-2.5 py-1 rounded shadow-xs font-semibold cursor-pointer transition active:scale-95"
            >
              <Shuffle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>Shuffle</span>
            </button>
          </div>

          {/* Question Palette Grid */}
          <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-canvas grid grid-cols-4 gap-3 content-start">
            {questionOrder.map((qIdx, pos) => {
              const status = getStatus(qIdx);
              const colors = getPaletteColorInfo(status);
              const isActive = currentPos === pos;
              const targetQ = quiz.questions[qIdx];
              const qIsMSQ = targetQ ? isMSQ(targetQ.correctAnswer) : false;
              const hasConflictBadge = isTwoPlayer && conflictQuestions.has(qIdx);
              
              let shapeClass = "rounded-sm";
              if (status === 'ANSWERED') shapeClass = "rounded-t-md";
              if (status === 'NOT_ANSWERED') shapeClass = "rounded-b-md";
              if (status === 'MARKED' || status === 'ANSWERED_MARKED') shapeClass = "rounded-full";

              return (
                <button
                  key={pos}
                  onClick={() => { setCurrentPos(pos); setShowQuestionPalette(false); }}
                  title={qIsMSQ ? `Question ${pos + 1} (MSQ)` : `Question ${pos + 1}`}
                  className={`relative w-10 h-10 flex items-center justify-center text-sm font-bold border transition-transform hover:scale-105 shadow-inner cursor-pointer ${colors.bg} ${colors.text} ${colors.border} ${shapeClass} ${isActive ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' : ''}`}
                >
                  {pos + 1}
                  {status === 'ANSWERED_MARKED' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#2ecc71] rounded-full border border-white shrink-0 shadow-sm"></div>
                  )}
                  {qIsMSQ && (
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-400 rounded-full border border-white text-[6px] flex items-center justify-center font-black text-amber-900">M</div>
                  )}
                  {hasConflictBadge && (
                    <div 
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border border-white text-[7px] flex items-center justify-center font-black text-white shadow-xs" 
                      title="Split Answer (Conflict)"
                    >
                      ⚔️
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Action & Save Progress */}
          <div className="p-4 border-t border-gray-300 dark:border-outline bg-gray-100 dark:bg-surface shrink-0 flex flex-col items-center gap-2">
             <button 
               onClick={handleSubmit} 
               className="w-full bg-[#16a085] hover:bg-[#12876f] text-white py-2 px-4 rounded shadow font-bold text-sm transition-colors border border-[#117a65] cursor-pointer"
             >
               Submit Exam
             </button>
             <button
               onClick={() => setShowSaveModal(true)}
               className="w-full bg-surface hover:bg-gray-50 dark:hover:bg-surface-hover text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/80 py-1.5 px-3 rounded text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
             >
               <Bookmark className="w-3.5 h-3.5 text-amber-600" />
               Save Progress & Resume Later
             </button>
             <div className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium">
               Quizify 5 Pro Ultra • <span className="text-orange-600 dark:text-orange-400 font-semibold">Made by Saksham Sooden</span>
             </div>

          </div>
        </div>
      </div>

      {/* Save & Pause Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface rounded-xl shadow-2xl p-6 max-w-md w-full border border-gray-100 dark:border-outline text-slate-800 dark:text-neutral-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quiz Progress Saved</h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400">Your test state is securely preserved in your browser.</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-surface rounded-lg p-3.5 border border-gray-200 dark:border-outline mb-5 space-y-2">
              <div className="flex justify-between text-xs text-gray-700 dark:text-neutral-300">
                <span className="font-medium text-gray-500 dark:text-neutral-400">Quiz:</span>
                <span className="font-bold truncate max-w-[200px]">{quiz.title}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-700 dark:text-neutral-300">
                <span className="font-medium text-gray-500 dark:text-neutral-400">Current Question:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Question {currentPos + 1} of {quiz.questions.length}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-700 dark:text-neutral-300">
                <span className="font-medium text-gray-500 dark:text-neutral-400">Answered Questions:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{answeredCount} of {quiz.questions.length}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-700 dark:text-neutral-300">
                <span className="font-medium text-gray-500 dark:text-neutral-400">Marked for Review:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{marked.size} questions</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-neutral-400 mb-6 leading-relaxed">
              You can return to the dashboard and resume right from <strong>Question {currentPos + 1}</strong> anytime. All your chosen answers, review marks, and options are preserved.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-2.5">
              <button 
                onClick={() => {
                  setShowSaveModal(false);
                  setSaveToast("Progress saved! You can resume anytime.");
                  setTimeout(() => setSaveToast(null), 3000);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-outline rounded-lg text-xs text-gray-700 dark:text-neutral-300 font-semibold hover:bg-gray-50 dark:hover:bg-surface-hover cursor-pointer transition"
              >
                Continue Answering
              </button>
              <button 
                onClick={() => {
                  setShowSaveModal(false);
                  if (onExit) {
                    onExit();
                  } else {
                    window.location.href = '/dashboard';
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs rounded-lg shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Save & Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed bottom-16 left-6 z-50 bg-neutral-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-lg border border-neutral-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-transparent dark:border-outline rounded shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Submit Exam</h3>
            <p className="text-gray-600 dark:text-neutral-400 mb-6 text-sm">
              Are you sure you want to submit? You cannot change your answers after submission.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-gray-300 dark:border-outline rounded text-sm text-gray-700 dark:text-neutral-300 font-semibold hover:bg-gray-50 dark:hover:bg-surface-hover cursor-pointer"
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

      {showUltraLarpSubmit && (
        <UltraLarpSubmitModal
          isOpen={showUltraLarpSubmit}
          quizTitle={quiz.title}
          answeredCount={Object.keys(answers).length}
          totalCount={quiz.questions.length}
          playerName={playerName || 'Scholar'}
          onProceed={executeFinalSubmit}
        />
      )}
    </div>
  );
}
