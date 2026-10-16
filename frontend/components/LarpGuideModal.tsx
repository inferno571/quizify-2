'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  Trophy, 
  GraduationCap, 
  Brain, 
  Target, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Award,
  ChevronRight,
  Calculator,
  FileText,
  AlertTriangle,
  Scale
} from 'lucide-react';

/**
 * Synthesize an epic cinematic bass-drop and shimmer chime
 * using the standard HTML5 Web Audio API (zero external audio files).
 */
function playLarpSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Heavy cinematic bass drop (140Hz -> 32Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.9);
    subGain.gain.setValueAtTime(0.9, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

    // 2. Brass / Synth Impact chord (A Major triumph)
    const chordFreqs = [220, 277.18, 329.63, 440];
    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    });

    // 3. Shimmer bell sparkle
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'triangle';
    bellOsc.frequency.setValueAtTime(880, now + 0.05);
    bellOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.4);
    bellGain.gain.setValueAtTime(0.25, now + 0.05);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start(now + 0.05);
    bellOsc.stop(now + 0.8);
  } catch (err) {
    // Autoplay policy or unsupported audio
  }
}

/**
 * Full-screen Flash & Shockwave Overlay triggered on Acknowledge
 */
export function LarpFlashOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;

    // Play native synthesized cinematic audio
    playLarpSound();

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 cursor-pointer select-none overflow-hidden animate-larp-shake"
    >
      {/* 1. Strobe Flash Burst */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-amber-200 to-white animate-larp-flash pointer-events-none z-30" />

      {/* 2. Rotating Radiant Sunburst / Energy Rays */}
      <div className="absolute w-[200vw] h-[200vw] -left-[50vw] -top-[50vw] pointer-events-none opacity-25 animate-larp-spin z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0deg,transparent_20deg,#ef4444_45deg,transparent_65deg,#f59e0b_90deg,transparent_110deg,#ef4444_135deg,transparent_155deg,#f59e0b_180deg,transparent_200deg,#ef4444_225deg,transparent_245deg,#f59e0b_270deg,transparent_290deg,#ef4444_315deg,transparent_335deg,#f59e0b_360deg)]" />

      {/* 3. Outer Neon Glow Border */}
      <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-amber-400 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-[inset_0_0_60px_rgba(245,158,11,0.5),0_0_80px_rgba(245,158,11,0.8)]" />

      {/* 4. Center Stage Cinema Container */}
      <div className="relative z-10 max-w-4xl w-[92%] sm:w-[85%] flex flex-col items-center text-center animate-in zoom-in-90 fade-in duration-300">
        
        {/* Top Badges */}
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-lg uppercase tracking-wider animate-bounce">
            <Flame className="w-4 h-4 fill-slate-950" />
            THE LARP HAS BEEN OFFICIALLY ACKNOWLEDGED
          </span>
          <span className="px-3 py-1 bg-black/60 border border-amber-400/80 text-amber-300 font-bold text-xs rounded-full backdrop-blur-xs">
            SCHOLAR AURA: 100,000+
          </span>
        </div>

        {/* Widescreen Meme Poster Frame */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-amber-400 shadow-[0_0_80px_rgba(245,158,11,0.8)] animate-larp-glow group max-h-[60vh] flex items-center justify-center bg-black">
          <img 
            src="/larp_wide.jpg" 
            alt="There's no limit to the LARP" 
            className="w-full h-auto object-contain max-h-[58vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>


        {/* Bottom Impact Text */}
        <div className="mt-4 sm:mt-5 space-y-1.5">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            &ldquo;THERE&rsquo;S NO LIMIT TO THE LARP.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-amber-200/90 tracking-wide drop-shadow-md">
            Longest Option Theorem Engaged &bull; Zero Lectures Watched &bull; Elite + Gold Guaranteed
          </p>
          <div className="pt-2 text-[11px] text-gray-400 font-medium">
            (Click anywhere or press Esc to dismiss)
          </div>
        </div>

      </div>
    </div>
  );
}

interface LarpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge?: () => void;
}

export function LarpGuideModal({ isOpen, onClose, onAcknowledge }: LarpGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'longest' | 'methods' | 'center' | 'linkedin'>('longest');
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  if (!isOpen) return null;

  const linkedInPostText = `🚀 Thrilled to share that I have successfully completed the 12-week NPTEL Online Certification in [Course Name] with an Elite + Gold distinction from IIT Madras / IIT Kharagpur! 🎓✨

Over the past three months, this intensive academic journey deepened my core understanding of advanced theoretical paradigms, mathematical foundations, and real-world implementations.

Heartfelt gratitude to the esteemed professors, course coordinators, and teaching assistants for curating such a rigorous, world-class curriculum that truly challenged my problem-solving faculties.

Key takeaways:
🔹 Advanced conceptual frameworks and algorithmic depth
🔹 Rigorous continuous evaluations and proctored examinations
🔹 Discipline, deep technical curiosity, and perseverance

Continuous learning never stops! Looking forward to applying these principles to cutting-edge industry problems. 💡📈

#NPTEL #IIT #ContinuousLearning #EngineeringGrind #EliteCertification #LifelongLearner #TechExcellence`;

  const handleCopyLinkedIn = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedLinkedIn(true);
    setTimeout(() => setCopiedLinkedIn(false), 2500);
  };

  const handleAcknowledgeClick = () => {
    onClose();
    if (onAcknowledge) {
      onAcknowledge();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-amber-200/80 dark:border-amber-500/30 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex items-center justify-between shrink-0 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Flame className="w-5 h-5 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  The Official NPTEL LARP Guide
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                  2026 Edition
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 font-medium">
                How to LARP in NPTEL &amp; Score 90%+ Without Studying
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Close Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
          
          {/* Hero Banner with Meme Image */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-4 sm:p-5 text-white shadow-lg border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Meme Image Poster */}
              <div className="relative shrink-0 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src="/larp_square.jpg" 
                  alt="There's no limit to the LARP meme" 
                  className="relative w-32 sm:w-40 h-auto rounded-md object-contain shadow-2xl border-2 border-amber-400/80"
                />
              </div>

              {/* Manifesto Text */}
              <div className="flex-1 text-center sm:text-left space-y-2.5">
                <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-[10px] font-black text-amber-300 tracking-wider uppercase">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Fundamental Axiom
                </div>
                <blockquote className="text-xl sm:text-2xl font-black italic tracking-wide text-amber-300 leading-tight">
                  &ldquo;THERE&rsquo;S NO LIMIT TO THE LARP.&rdquo;
                </blockquote>
                <p className="text-xs text-slate-300 leading-relaxed">
                  How to systematically extract correct answers without opening a single lecture slide. 
                  Master the <strong>Longest Option Theorem</strong>, <strong>Lexical Word Overlap</strong>, and <strong>Ballpark Math Convergence</strong>.
                </p>

                {/* Stat Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Lecture Time</div>
                    <div className="text-sm font-black text-white">0.00 hrs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Longest Option</div>
                    <div className="text-sm font-black text-emerald-400">Primary Rule</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Exam Speed</div>
                    <div className="text-sm font-black text-cyan-400">18 Mins</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Scholarly Aura</div>
                    <div className="text-sm font-black text-amber-400">&infin; Infinite</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-slate-800 gap-1 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('longest')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'longest'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-slate-800 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              1. Longest Option Theorem
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'methods'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-slate-800 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              2. Matching Words &amp; Math Ballpark
            </button>
            <button
              onClick={() => setActiveTab('center')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'center'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-slate-800 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              3. TCS iON Protocol
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'linkedin'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-slate-800 shadow-xs'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              4. LinkedIn Post
            </button>
          </div>

          {/* TAB 1: THE LONGEST OPTION THEOREM IN DEPTH */}
          {activeTab === 'longest' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-300 text-sm">
                  <Scale className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  Rule #1: Always Pick the Longest Answer
                </div>
                <p className="leading-relaxed">
                  When you have not studied the subject, your greatest weapon is the professor&rsquo;s subconscious fear of answer-key grievances. 
                  Professors must qualify the correct option with specific clauses, preconditions, and definitions to make it indisputably true. 
                  Distractors (wrong options) are concocted quickly and kept brief.
                </p>
              </div>

              {/* Sub-rule 1A: Word Count Primary Rule */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center shrink-0">
                      1A
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                        Primary Metric: The Word Count Rule
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3 h-3" /> ALWAYS WORKS (Gold Standard)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                  First, <strong>count the total number of words</strong> in each of the four options:
                </p>
                
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="text-gray-500 dark:text-slate-400 text-[11px] font-sans font-semibold mb-1">Example Option Analysis:</div>
                  <div className="text-gray-700 dark:text-slate-300">A) It maximizes batch throughput. <span className="text-gray-400 dark:text-slate-500 font-bold">[4 words]</span></div>
                  <div className="text-gray-700 dark:text-slate-300">B) It reduces gradient variance. <span className="text-gray-400 dark:text-slate-500 font-bold">[4 words]</span></div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/80 dark:bg-emerald-950/50 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                    C) It maps high-dimensional sparse representations into dense continuous vector spaces capturing semantic similarity. <span className="text-emerald-900 dark:text-emerald-200">[14 words]</span> &larr; SELECT THIS
                  </div>
                  <div className="text-gray-700 dark:text-slate-300">D) It guarantees zero training loss. <span className="text-gray-400 dark:text-slate-500 font-bold">[5 words]</span></div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 p-2.5 rounded text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                  <strong>The Word Count Verdict:</strong> If one option has noticeably more words than the other three, 
                  <strong> lock it in immediately</strong>. The longest words method has an almost 100% empirical success rate in NPTEL tests.
                </div>
              </div>

              {/* Sub-rule 1B: Character Count Tiebreaker */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center shrink-0">
                      1B
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                        Tiebreaker: Character Count (Use with Caution)
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> NOT 100% GUARANTEED
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                  If two or more options are tied with the <strong>exact same number of words</strong>, proceed to the character-level inspection:
                </p>

                <ul className="text-xs text-gray-700 dark:text-slate-300 space-y-2 list-disc pl-5">
                  <li>
                    Count total characters (including alphabet letters, hyphens, and punctuation).
                  </li>
                  <li>
                    Select the option with the <strong>longest total character length</strong> (indicating longer, more specialized terminology like <em>&ldquo;heteroscedasticity&rdquo;</em> vs <em>&ldquo;variability&rdquo;</em>).
                  </li>
                </ul>

                <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-3 rounded text-xs text-amber-950 dark:text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-900 dark:text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    Crucial Caveat &amp; Warning:
                  </div>
                  <p className="leading-relaxed">
                    While the <strong>longest words method always works</strong>, the character count tiebreaker method is 
                    <strong> not 100% guaranteed to work</strong>. Formatting artifacts, hyphenated terms, or font spacing can skew character counts. 
                    Use character counting strictly as a secondary fallback with caution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATCHING WORDS & MATH BALLPARK */}
          {activeTab === 'methods' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Method 2: Matching Words Heuristic */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0">
                    #2
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      The Matching Words Heuristic (Lexical Overlap Rule)
                    </h3>
                    <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold">
                      Count words in common between the Question &amp; Options
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                  When the longest option rule is inconclusive or options are equal length, inspect vocabulary overlap:
                </p>

                <div className="bg-blue-50/60 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-xs space-y-2">
                  <div className="font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                    The 2+ Overlapping Words Principle:
                  </div>
                  <p className="text-blue-900 dark:text-blue-200 leading-relaxed">
                    If there are <strong>more than two specific words</strong> from the question that reappear inside an answer option, 
                    <strong> pick that option</strong>. Choose the option that shares the <strong>highest number of words in common</strong> with the question stem.
                  </p>
                </div>

                <div className="text-xs text-gray-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-gray-200 dark:border-slate-800 leading-relaxed">
                  <strong>Why this works:</strong> IIT professors copy questions straight from their slide definitions. 
                  The slide header contains keywords X and Y, and the correct bullet point contains X and Y again. 
                  Distractors are generated off the top of their head and lack that direct lexical fingerprint.
                </div>
              </div>

              {/* Method 3: Brute-Force Mathematical Ballpark Convergence */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0">
                    #3
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      Brute-Force Mathematical Ballpark Convergence
                    </h3>
                    <span className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold">
                      For numerical questions when you don&rsquo;t know the formula
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                  Facing a complex physics, ML, or HR numerical problem with zero idea what equation to use? Execute the brute-force sweep:
                </p>

                <div className="bg-purple-50/60 dark:bg-purple-950/40 p-3 rounded-lg border border-purple-200 dark:border-purple-800 text-xs space-y-2">
                  <div className="font-bold text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" />
                    The Arithmetic Convergence Algorithm:
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-purple-900 dark:text-purple-200 leading-relaxed">
                    <li>Extract <strong>every single number</strong> given in the question stem (e.g. <em>N</em> = 50, <em>p</em> = 0.4).</li>
                    <li>
                      Perform primitive mathematical operations with those numbers:
                      <ul className="list-disc pl-4 mt-1.5 space-y-1 text-[11px] text-purple-800 dark:text-purple-300">
                        <li><strong>Multiply them:</strong> <span className="font-semibold text-purple-950 dark:text-purple-100">50 × 0.4 = 20</span></li>
                        <li><strong>Divide them:</strong> <span className="font-semibold text-purple-950 dark:text-purple-100">50 / 0.4 = 125</span> or <span className="font-semibold text-purple-950 dark:text-purple-100">0.4 / 50 = 0.008</span></li>
                        <li><strong>Add/Subtract them:</strong> <span className="font-semibold text-purple-950 dark:text-purple-100">50 + 0.4 = 50.4</span> or <span className="font-semibold text-purple-950 dark:text-purple-100">50 - 0.4 = 49.6</span></li>
                        <li><strong>Divide product by 2 or 100:</strong> <span className="font-semibold text-purple-950 dark:text-purple-100">(50 × 0.4) / 2 = 10</span></li>
                      </ul>
                    </li>
                    <li>
                      Compare your results against the 4 options: <strong>choose whichever option is closest or in the same approximate ballpark / order of magnitude</strong>.
                    </li>
                  </ol>
                </div>

                <div className="text-xs text-gray-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-gray-200 dark:border-slate-800 leading-relaxed">
                  <strong>Why this works:</strong> NPTEL questions rarely involve mystery transcendental constants. 
                  Formulas are almost always products, ratios, or linear combinations of the given parameters. 
                  Simple multiplication or division hits the exact answer or its decimal multiple &gt;70% of the time.
                </div>
              </div>

              {/* Bonus LARP Method: Decimal Outlier Elimination */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
                    #4
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      Decimal Outlier Elimination (Distractor Twins)
                    </h3>
                    <span className="text-[10px] text-orange-700 dark:text-orange-400 font-semibold">
                      Spotting professor copy-paste distractors
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                  If the 4 numerical options are: <strong>A) 0.15</strong>, <strong>B) 14.8</strong>, <strong>C) 15.2</strong>, and <strong>D) 1500</strong>:
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                  Immediately eliminate <strong>A</strong> (too small) and <strong>D</strong> (too large). 
                  Professors create quick distractors by moving the decimal point (multiplying or dividing by 10 or 100). 
                  The true correct answer is always flanked closely by its legitimate calculation twin (<strong>B</strong> or <strong>C</strong>).
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: TCS iON CENTER PROTOCOL */}
          {activeTab === 'center' && (
            <div className="space-y-3.5 text-xs text-gray-700 dark:text-slate-300 animate-in fade-in duration-150">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  1. The Color Hall Ticket Preparation
                </h4>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Print the admit card in high-gloss color. Carry two blue ballpoint pens even though you will never touch paper because the TCS iON virtual keypad does all the numerical input.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  2. The Mandatory Waiting Hour Performance
                </h4>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  Using the Longest Option Theorem and Lexical Overlap, you will finish your 50 questions in under 20 minutes. 
                  However, TCS iON does not let anyone leave before 60 minutes. Do NOT click submit early and sleep on the desk. 
                  Solemnly click through the review palette looking like you are deeply pondering mathematical edge-cases.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LINKEDIN TEMPLATE */}
          {activeTab === 'linkedin' && (
            <div className="space-y-3 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 p-3 rounded-xl">
                <div>
                  <div className="font-bold text-blue-900 dark:text-blue-200">Pre-Formatted LinkedIn Victory Post</div>
                  <div className="text-[11px] text-blue-700 dark:text-blue-300">One-click copy to celebrate your glorious certificate with the world.</div>
                </div>
                <button
                  onClick={handleCopyLinkedIn}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs shrink-0"
                >
                  {copiedLinkedIn ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLinkedIn ? 'Copied!' : 'Copy Post'}
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-slate-700 select-all max-h-72 overflow-y-auto">
                {linkedInPostText}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-gray-500 dark:text-slate-400 font-medium">
            Quizify 3 • <span className="text-orange-600 dark:text-orange-400 font-bold">Made by Saksham Sooden</span>
          </div>

          <button
            onClick={handleAcknowledgeClick}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs rounded-lg transition cursor-pointer shadow-md flex items-center gap-1.5 transform active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            Acknowledge the LARP
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Top-Right Button that toggles the LARP guide modal and triggers the full-screen flash on acknowledge
 */
export function LarpGuideButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs border bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/15 border-amber-400/60 hover:border-amber-500 text-amber-900 dark:text-amber-300 hover:text-orange-950 dark:hover:text-amber-100 hover:shadow-amber-500/10 dark:bg-amber-950/30"
        title="Open the In-Depth NPTEL LARP Guide"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500 group-hover:scale-110 transition-transform" />
        <span className="font-extrabold tracking-tight">LARP Guide</span>
        <span className="bg-amber-400/80 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
          NPTEL
        </span>
      </button>

      <LarpGuideModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onAcknowledge={() => setIsFlashing(true)}
      />

      {/* Screen flash with meme image and effects */}
      <LarpFlashOverlay 
        isOpen={isFlashing} 
        onClose={() => setIsFlashing(false)} 
      />
    </>
  );
}
