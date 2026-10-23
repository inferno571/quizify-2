'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { playRandomLarpMemeSound } from '../lib/larpMemeSounds';
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
  Scale, 
  GitFork, 
  Binary, 
  Ban, 
  Layers, 
  ArrowRight,
  BarChart3
} from 'lucide-react';

/**
 * Synthesize an epic cinematic bass-drop and shimmer chime
 * using the standard HTML5 Web Audio API (zero external audio files).
 */
export function playLarpSound() {
  if (typeof window === 'undefined') return;
  let context: AudioContext | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stop = () => {
    clearTimeout(timer);
    if (context && context.state !== 'closed') void context.close().catch(() => {});
  };
  try {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    context = ctx;
    void ctx.resume().catch(stop);
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
    timer = setTimeout(stop, 1500);
  } catch {
    stop();
  }
  return stop;
}

/**
 * Full-screen Flash & Shockwave Overlay triggered on Acknowledge or LARP Successful
 */
export function LarpFlashOverlay({ 
  isOpen, 
  onClose,
  synthesizedSound = true,
  durationMs = 4000,
  soundName,
  badgeText = "THE LARP HAS BEEN OFFICIALLY ACKNOWLEDGED",
  subText = "LARP Cascade Engaged • Zero Lectures Watched • Elite + Gold Guaranteed"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  synthesizedSound?: boolean;
  durationMs?: number;
  soundName?: string;
  badgeText?: string;
  subText?: string;
}) {
  useEffect(() => {
    if (!isOpen) return;

    // Play native synthesized cinematic audio
    const stopSound = synthesizedSound ? playLarpSound() : undefined;

    const timer = setTimeout(() => {
      onClose();
    }, durationMs);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      stopSound?.();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, synthesizedSound, durationMs]);

  if (!isOpen) return null;

  return createPortal(
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
            {badgeText}
          </span>
          <span className="px-3 py-1 bg-black/60 border border-amber-400/80 text-amber-300 font-bold text-xs rounded-full backdrop-blur-xs">
            SCHOLAR AURA: +999,999 (MAX LEVEL)
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
            {subText}
          </p>
          <div className="pt-2 text-[11px] text-gray-400 font-medium">
            {soundName && <p className="mb-1 text-amber-300">Meme Sound: {soundName}</p>}
            (Click anywhere or press Esc to dismiss)
          </div>
        </div>

      </div>
    </div>, document.body
  );
}

interface LarpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge?: () => void;
}

export function LarpGuideModal({ isOpen, onClose, onAcknowledge }: LarpGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'longest' | 'antionly' | 'reverse' | 'methods' | 'benchmark' | 'center' | 'linkedin'>('longest');
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  if (!isOpen) return null;

  const linkedInPostText = `🚀 Thrilled to share that I have successfully completed the 12-week NPTEL Online Certification in Generative AI for Computer Vision with an Elite + Gold distinction from IIT Madras / IIT Kharagpur! 🎓✨

Over the past three months, this intensive academic journey deepened my core understanding of advanced generative paradigms, diffusion models, vision transformers, and multimodal AI.

Empirical LARP findings achieved an 83.33% win rate across all 120 questions with zero lecture slides opened!

Heartfelt gratitude to the esteemed professors, course coordinators, and teaching assistants for curating such a world-class curriculum that truly challenged my problem-solving faculties.

Key takeaways:
🔹 Advanced conceptual frameworks and algorithmic depth
🔹 Distractor pruning and Anti-Only elimination heuristics
🔹 Discipline, deep technical curiosity, and perseverance

Continuous learning never stops! Looking forward to applying these principles to cutting-edge industry problems. 💡📈

#NPTEL #IIT #ContinuousLearning #LARP #GenerativeAI #ComputerVision #EliteCertification #LifelongLearner #TechExcellence`;

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
        className="bg-surface rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-amber-200/80 dark:border-amber-500/30 animate-in zoom-in-95 duration-200"
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
                How to LARP in NPTEL &amp; Score 83%+ Without Studying
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-canvas text-gray-800 dark:text-neutral-100">
          
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
                  <Sparkles className="w-3 h-3 text-amber-400" /> LARP Fundamental Axiom
                </div>
                <blockquote className="text-xl sm:text-2xl font-black italic tracking-wide text-amber-300 leading-tight">
                  &ldquo;THERE&rsquo;S NO LIMIT TO THE LARP.&rdquo;
                </blockquote>
                <p className="text-xs text-slate-300 leading-relaxed">
                  How to systematically extract correct answers without opening a single lecture slide. 
                  Master the <strong>Anti-Only Axiom</strong>, the <strong>Longest Option Theorem</strong>, the <strong>Multi-Method Cascade</strong>, and <strong>Reverse Engineering</strong>.
                </p>

                {/* Stat Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Lecture Time</div>
                    <div className="text-sm font-black text-white">0.00 hrs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">GenAI CV Win Rate</div>
                    <div className="text-sm font-black text-emerald-400">83.3% (#1)</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Anti-Only Filter</div>
                    <div className="text-sm font-black text-cyan-400">100% Trap Pruned</div>
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
          <div className="flex border-b border-gray-200 dark:border-outline gap-1 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('longest')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'longest'
                  ? 'bg-surface text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              1. Longest Option Theorem
            </button>
            <button
              onClick={() => setActiveTab('antionly')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'antionly'
                  ? 'bg-surface text-amber-600 dark:text-amber-400 border-t-2 border-amber-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <Ban className="w-3.5 h-3.5 text-amber-500" />
              2. Anti-Only &amp; Cascade (NEW! 🔥)
            </button>
            <button
              onClick={() => setActiveTab('benchmark')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'benchmark'
                  ? 'bg-surface text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-emerald-500" />
              3. GenAI CV Benchmark (83.3%)
            </button>
            <button
              onClick={() => setActiveTab('reverse')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'reverse'
                  ? 'bg-surface text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              4. Reverse Engineering
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'methods'
                  ? 'bg-surface text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              5. Matching Words &amp; Math
            </button>
            <button
              onClick={() => setActiveTab('center')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'center'
                  ? 'bg-surface text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              6. TCS iON Protocol
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'linkedin'
                  ? 'bg-surface text-orange-600 dark:text-orange-400 border-t-2 border-orange-500 border-x border-gray-200 dark:border-x-neutral-800 shadow-xs'
                  : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-surface-hover'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              7. LinkedIn Post
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
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
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

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  First, <strong>count the total number of words</strong> in each of the four options:
                </p>
                
                <div className="bg-slate-50 dark:bg-surface p-3 rounded-lg border border-slate-200 dark:border-outline text-xs space-y-1.5 font-mono">
                  <div className="text-gray-500 dark:text-neutral-400 text-[11px] font-sans font-semibold mb-1">Example Option Analysis:</div>
                  <div className="text-gray-700 dark:text-neutral-300">A) It maximizes batch throughput. <span className="text-gray-400 dark:text-neutral-500 font-bold">[4 words]</span></div>
                  <div className="text-gray-700 dark:text-neutral-300">B) It reduces gradient variance. <span className="text-gray-400 dark:text-neutral-500 font-bold">[4 words]</span></div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/80 dark:bg-emerald-950/50 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                    C) It maps high-dimensional sparse representations into dense continuous vector spaces capturing semantic similarity. <span className="text-emerald-900 dark:text-emerald-200">[14 words]</span> &larr; SELECT THIS
                  </div>
                  <div className="text-gray-700 dark:text-neutral-300">D) It guarantees zero training loss. <span className="text-gray-400 dark:text-neutral-500 font-bold">[5 words]</span></div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 p-2.5 rounded text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                  <strong>The Word Count Verdict:</strong> If one option has noticeably more words than the other three, 
                  <strong> lock it in immediately</strong>. The longest words method has an 80.0% empirical success rate alone in GenAI for CV.
                </div>
              </div>

              {/* Sub-rule 1B: Character Count Tiebreaker */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
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
                        <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> TIEBREAKER RESOLUTION
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  If two or more options are tied with the <strong>exact same number of words</strong>, count total characters (including specialized technical terminology like <em>&ldquo;heteroscedasticity&rdquo;</em> vs <em>&ldquo;variability&rdquo;</em>).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ANTI-ONLY & MULTI-CASCADE (NEW AXIOMS) */}
          {activeTab === 'antionly' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Header Box */}
              <div className="bg-gradient-to-r from-amber-950/40 via-red-950/40 to-orange-950/40 p-4 sm:p-5 rounded-xl border border-amber-600/60 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-black text-sm flex items-center justify-center shrink-0 border border-amber-500/40">
                      <Ban className="w-4 h-4 text-amber-400" />
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                        Axiom 3: The Anti-Absolute (&ldquo;Never Choose &lsquo;Only&rsquo;&rdquo;) Axiom
                        <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-red-500/30">
                          100% Trap Proof
                        </span>
                      </h3>
                      <span className="text-xs text-amber-300 font-medium">
                        Negative Distractor Pruning &bull; Absolute Qualifier Elimination
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800 self-start sm:self-auto">
                    44/44 Traps Eliminated (0% Error Rate)
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  When creating multiple-choice questions in machine learning and computer vision, professors invent quick false distractors by inserting restrictive absolute qualifiers like <strong>&ldquo;only&rdquo;</strong> (e.g., <em>&ldquo;Only continuous variables&rdquo;</em>, <em>&ldquo;Only training data&rdquo;</em>, <em>&ldquo;CNNs can only process text&rdquo;</em>, <em>&ldquo;Pooling only&rdquo;</em>).
                  In AI, principles are almost never absolute. Therefore, <strong>options containing &ldquo;only&rdquo; are guaranteed trap distractors</strong>.
                </p>
              </div>

              {/* Empirical Proof */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 font-black text-xs flex items-center justify-center shrink-0">
                    3A
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      The &ldquo;Never Choose &lsquo;Only&rsquo;&rdquo; Verification (120 Questions)
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-semibold">
                      Real exam findings in Generative AI for Computer Vision
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-surface p-3.5 rounded-xl border border-slate-200 dark:border-outline text-xs space-y-2 font-mono">
                  <div className="text-gray-500 dark:text-neutral-400 text-[11px] font-sans font-bold flex items-center justify-between">
                    <span>Real Exam Case Study (Week 1, Q4):</span>
                    <span className="text-red-500 font-mono text-[10px]">Filter &lsquo;Only&rsquo; (2 Traps Detected)</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-gray-700 dark:text-neutral-300 p-2 rounded-lg bg-gray-50 dark:bg-surface border border-gray-200 dark:border-neutral-900">
                      A) The probability of a single random variable <span className="text-gray-400 text-[10px]">(7 words)</span>
                    </div>

                    <div className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                      <div>
                        B) The probability of two or more random variables occurring together <span className="text-[10px] text-emerald-600 dark:text-emerald-400">(10 words)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.5 rounded font-sans font-black">
                        CORRECT &bull; LOCK IN
                      </span>
                    </div>

                    <div className="text-red-800 dark:text-red-300 p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-900 line-through opacity-75">
                      C) Only independent events <span className="text-[10px] font-sans ml-2">[ELIMINATED: Contains &lsquo;Only&rsquo;]</span>
                    </div>

                    <div className="text-red-800 dark:text-red-300 p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-900 line-through opacity-75">
                      D) Only continuous variables <span className="text-[10px] font-sans ml-2">[ELIMINATED: Contains &lsquo;Only&rsquo;]</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-950/40 border-l-4 border-red-500 p-2.5 rounded text-xs text-red-950 dark:text-red-200 font-medium leading-relaxed">
                  <strong>The Empirical Anti-Only Rule:</strong> In 44 out of 120 questions across all 12 weeks, options contained &ldquo;only&rdquo;. 
                  In <strong>0 out of 44 questions (0.00%)</strong> was &ldquo;only&rdquo; the correct answer! Instantly strike out any option containing &ldquo;only&rdquo;.
                </div>
              </div>

              {/* Master Multi-Method Priority Cascade */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      The Prioritized Multi-Method Decision Cascade
                    </h4>
                    <span className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold">
                      How to use ALL LARP methods simultaneously on every single question
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  Never rely on just one heuristic. On every single exam question, execute the prioritized waterfall:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-red-900 dark:text-red-300">Priority 1 (Negative Filter): The Anti-Only Axiom</strong>
                      <p className="text-[11px] text-red-800 dark:text-red-200">Prune any option containing the restrictive word &ldquo;only&rdquo;. Prunes 52 bad distractors with 100% precision.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-emerald-900 dark:text-emerald-300">Priority 2 (Universal Inclusivity): &ldquo;All of the above&rdquo;</strong>
                      <p className="text-[11px] text-emerald-800 dark:text-emerald-200">If &ldquo;All of the above&rdquo; survives in the candidate pool, lock it in immediately (5/5 correct, 100% win rate).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-amber-900 dark:text-amber-300">Priority 3: The Longest Option Theorem (Word Count Primary)</strong>
                      <p className="text-[11px] text-amber-800 dark:text-amber-200">Select the option with the highest total word count. Professors qualify correct answers with rigorous definitions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-blue-900 dark:text-blue-300">Priority 4: Character Count Tiebreaker</strong>
                      <p className="text-[11px] text-blue-800 dark:text-blue-200">When word counts are identical, count characters. Longer characters denote specialized technical terms.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">5</span>
                    <div>
                      <strong className="text-indigo-900 dark:text-indigo-300">Priority 5: Lexical Alignment (Matching Words Heuristic)</strong>
                      <p className="text-[11px] text-indigo-800 dark:text-indigo-200">If options are closely tied, count overlapping non-trivial keywords from the question stem.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                    <span className="w-5 h-5 rounded-full bg-purple-500 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">6</span>
                    <div>
                      <strong className="text-purple-900 dark:text-purple-300">Priority 6: Distractor Intersection (Reverse Engineering Modal Modes)</strong>
                      <p className="text-[11px] text-purple-800 dark:text-purple-200">For multi-tuple and numerical coordinate options, pick the component mode in the crossfire.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 p-3 rounded-lg border border-amber-500/40 text-xs text-amber-300 font-bold text-center">
                  Result of Prioritized Cascade: 83.33% (100 / 120 Questions Correct) on Generative AI for Computer Vision!
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: OFFICIAL BENCHMARK SCORECARD */}
          {activeTab === 'benchmark' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Grand Benchmark Header */}
              <div className="bg-gradient-to-br from-slate-900 to-black text-white p-4 sm:p-5 rounded-xl border border-neutral-800 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm sm:text-base font-extrabold text-amber-300 uppercase tracking-wider">
                      Generative AI for Computer Vision (120 Questions) Official LARP Benchmark
                    </h3>
                  </div>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
                    Weeks 1–12 Complete
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Rigorous empirical evaluation performed across all 12 weekly assignments (120 multiple choice questions) in 
                  <strong> Generative AI for Computer Vision</strong> from IIT Madras &amp; Kharagpur.
                </p>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs pt-1">
                  <div className="bg-white/5 border border-amber-500/60 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-amber-300 font-bold">Multi-Cascade</div>
                    <div className="text-lg font-black text-amber-400">83.33%</div>
                    <div className="text-[9px] text-neutral-400">100/120 (#1 Best)</div>
                  </div>
                  <div className="bg-white/5 border border-emerald-500/40 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-emerald-300 font-bold">Longest Option</div>
                    <div className="text-lg font-black text-emerald-400">80.00%</div>
                    <div className="text-[9px] text-neutral-400">96/120 correct</div>
                  </div>
                  <div className="bg-white/5 border border-blue-500/40 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-blue-300 font-bold">Lexical Overlap</div>
                    <div className="text-lg font-black text-blue-400">75.83%</div>
                    <div className="text-[9px] text-neutral-400">91/120 correct</div>
                  </div>
                  <div className="bg-white/5 border border-purple-500/40 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-purple-300 font-bold">Reverse Eng.</div>
                    <div className="text-lg font-black text-purple-400">61.67%</div>
                    <div className="text-[9px] text-neutral-400">74/120 correct</div>
                  </div>
                  <div className="bg-white/5 border border-cyan-500/40 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-cyan-300 font-bold">Anti-Only Filter</div>
                    <div className="text-lg font-black text-cyan-400">100% Trap</div>
                    <div className="text-[9px] text-neutral-400">44/44 eliminated</div>
                  </div>
                  <div className="bg-white/5 border border-red-500/30 rounded-lg p-2.5 shadow-sm">
                    <div className="text-[10px] text-red-300 font-bold">Blind Guess</div>
                    <div className="text-lg font-black text-red-400">25.00%</div>
                    <div className="text-[9px] text-neutral-400">Baseline (30/120)</div>
                  </div>
                </div>
              </div>

              {/* 12-Week Detailed Breakdown Table */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                    Week-by-Week Empirical Breakdown (GenAI for CV)
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Elite + Gold Standard
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-surface-muted text-gray-700 dark:text-neutral-300 text-[11px] font-sans">
                      <tr>
                        <th className="p-2 rounded-l">Week</th>
                        <th className="p-2">Subject Module</th>
                        <th className="p-2 text-center">Longest</th>
                        <th className="p-2 text-center">Lexical</th>
                        <th className="p-2 text-center">Reverse</th>
                        <th className="p-2 text-center rounded-r text-amber-600 dark:text-amber-400 font-black">Ultra Cascade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-800 text-[11px]">
                      <tr>
                        <td className="p-2 font-bold">W1</td>
                        <td className="p-2 font-sans">Foundations of Generative Models &amp; Probability</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">40%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">70% (7/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W2</td>
                        <td className="p-2 font-sans">Deep Neural Networks &amp; Backpropagation</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W3</td>
                        <td className="p-2 font-sans">CNNs &amp; Computer Vision Foundations</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">70% (7/10)</td>
                      </tr>
                      <tr className="bg-amber-50/50 dark:bg-amber-950/20 font-bold">
                        <td className="p-2 text-amber-600 dark:text-amber-400">W4 🔥</td>
                        <td className="p-2 font-sans text-amber-900 dark:text-amber-200">Advanced Architectures &amp; Sequence Models</td>
                        <td className="p-2 text-center">100%</td>
                        <td className="p-2 text-center">100%</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center font-black text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/40">100% (10/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W5</td>
                        <td className="p-2 font-sans">Context, Attention &amp; Representation Learning</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W6</td>
                        <td className="p-2 font-sans">Transformers &amp; Vision Transformers (ViT)</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W7</td>
                        <td className="p-2 font-sans">Vision Transformers &amp; Auto-Encoders</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W8</td>
                        <td className="p-2 font-sans">Variational Auto-Encoders (VAEs)</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">70% (7/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W9</td>
                        <td className="p-2 font-sans">GANs &amp; Diffusion Models</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">60% (6/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W10</td>
                        <td className="p-2 font-sans">Diffusion Models &amp; Large Language Models</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center">70%</td>
                        <td className="p-2 text-center">60%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W11</td>
                        <td className="p-2 font-sans">Vision-Language Models (VLMs) &amp; Multimodal AI</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center">40%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">W12</td>
                        <td className="p-2 font-sans">Multimodal Systems &amp; Agentic AI</td>
                        <td className="p-2 text-center">90%</td>
                        <td className="p-2 text-center">80%</td>
                        <td className="p-2 text-center">50%</td>
                        <td className="p-2 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">90% (9/10)</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-900 text-white font-bold">
                      <tr>
                        <td className="p-2" colSpan={2}>GRAND TOTAL (120 Questions)</td>
                        <td className="p-2 text-center text-emerald-400">80.0%</td>
                        <td className="p-2 text-center text-blue-400">75.8%</td>
                        <td className="p-2 text-center text-purple-400">61.7%</td>
                        <td className="p-2 text-center text-amber-400 font-black text-sm bg-amber-500/20">83.33% (100/120)</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 p-2.5 rounded text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                  <strong>LARP Takeaway:</strong> Scoring 83.33% comfortably clears the NPTEL 40% certificate threshold (+43.33% margin), guaranteeing an <strong>Elite + Gold Distinction</strong> without opening a single lecture slide!
                </div>
              </div>

              {/* DLNLP Comparison Card */}
              <div className="bg-slate-100 dark:bg-surface-muted p-3.5 rounded-xl border border-gray-300 dark:border-outline text-xs space-y-1.5">
                <div className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Deep Learning &amp; NLP (101 Questions) Benchmark Comparison</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">44.6% RE Win Rate</span>
                </div>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed text-[11px]">
                  Across both DLNLP (44.6%) and Generative AI for CV (83.33%), the LARP methods outperform random guessing (25.0%) by 2x to 3.3x, proving the universal psychometric validity of professor distractor patterns.
                </p>
              </div>

            </div>
          )}

          {/* TAB 4: REVERSE ENGINEERING AXIOM */}
          {activeTab === 'reverse' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Header Box */}
              <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-purple-950/40 p-4 sm:p-5 rounded-xl border border-purple-800/60 dark:border-purple-700/50 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-700 dark:text-purple-300 font-black text-sm flex items-center justify-center shrink-0 border border-purple-500/30">
                      <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                        Axiom 2: The Reverse Engineering Principle
                        <span className="text-[10px] bg-purple-500/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-purple-500/30">
                          Axiom
                        </span>
                      </h3>
                      <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                        Distractor Intersection &bull; Component Mode Decomposition
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
                    44.6% on DLNLP &bull; 61.7% on GenAI CV
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  When facing numerical, tuple-based, or multi-clause options where word lengths are nearly identical, 
                  <strong> reverse engineer the professor&rsquo;s exam design psychology</strong>. 
                  Exam creators rarely invent 4 entirely independent wrong options from thin air. Instead, they calculate the true answer first, 
                  and construct distractors by perturbing one variable or prefix at a time.
                </p>
              </div>

              {/* Core Mechanism */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center shrink-0">
                    4A
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                      The Numerical Prefix/Suffix Intersection
                    </h4>
                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 font-semibold">
                      Eliminate outlier options by tracking component frequency modes
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  If options share repeating prefixes or recurring suffixes, find the <strong>modal intersection</strong> (the option that contains the most frequent sub-elements):
                </p>

                {/* Visual Audio Walkthrough */}
                <div className="bg-slate-50 dark:bg-surface p-3.5 rounded-xl border border-slate-200 dark:border-outline text-xs space-y-2.5 font-mono">
                  <div className="text-gray-500 dark:text-neutral-400 text-[11px] font-sans font-bold flex items-center justify-between">
                    <span>Empirical Inspection (Audio Case Study):</span>
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-[10px]">Prefix Mode: 13,000 (2x) | Suffix Mode: 105 (2x)</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                      <div>
                        A) <span className="underline decoration-indigo-400 decoration-2 font-black">13</span>,<span className="underline decoration-purple-400 decoration-2 font-black">105</span> 
                        <span className="ml-2 text-[10px] font-sans font-normal text-emerald-700 dark:text-emerald-400">&larr; Has both frequent prefix (13k) &amp; frequent suffix (105)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.5 rounded font-sans font-black">
                        CORRECT &bull; LOCK IN
                      </span>
                    </div>

                    <div className="text-gray-700 dark:text-neutral-300 p-2 rounded-lg bg-gray-50 dark:bg-surface border border-gray-200 dark:border-neutral-900 flex items-center justify-between">
                      <div>
                        B) <span className="underline decoration-indigo-400 decoration-2 font-semibold">13</span>,405 
                        <span className="ml-2 text-[10px] font-sans text-gray-500 dark:text-neutral-500">(Shares 13k prefix, but 405 suffix is a distractor)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-600 font-sans">Distractor 1</span>
                    </div>

                    <div className="text-gray-700 dark:text-neutral-300 p-2 rounded-lg bg-gray-50 dark:bg-surface border border-gray-200 dark:border-neutral-900 flex items-center justify-between">
                      <div>
                        C) 14,405 
                        <span className="ml-2 text-[10px] font-sans text-gray-500 dark:text-neutral-500">(14k prefix is an outlier distractor)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-600 font-sans">Distractor 2</span>
                    </div>

                    <div className="text-gray-700 dark:text-neutral-300 p-2 rounded-lg bg-gray-50 dark:bg-surface border border-gray-200 dark:border-neutral-900 flex items-center justify-between">
                      <div>
                        D) 17,<span className="underline decoration-purple-400 decoration-2 font-semibold">105</span> 
                        <span className="ml-2 text-[10px] font-sans text-gray-500 dark:text-neutral-500">(Shares 105 suffix, but 17k is an outlier distractor)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-600 font-sans">Distractor 3</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/40 border-l-4 border-purple-500 p-2.5 rounded text-xs text-purple-950 dark:text-purple-200 font-medium leading-relaxed">
                  <strong>The Reverse Engineering Verdict:</strong> Options sharing components isolate the exact variables the professor was testing. 
                  The option that sits at the center of the crossfire is almost always the calculated answer.
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: MATCHING WORDS & MATH BALLPARK */}
          {activeTab === 'methods' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Method 2: Matching Words Heuristic */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-black text-xs flex items-center justify-center shrink-0">
                    #5
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

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  When the longest option rule is inconclusive or options are equal length, inspect vocabulary overlap:
                </p>

                <div className="bg-blue-50/60 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-200 dark:border-blue-900/60 text-xs space-y-2">
                  <div className="font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                    The 2+ Overlapping Words Principle:
                  </div>
                  <p className="text-blue-900 dark:text-blue-200 leading-relaxed">
                    If there are <strong>more than two specific words</strong> from the question that reappear inside an answer option, 
                    <strong> pick that option</strong>. Choose the option that shares the <strong>highest number of words in common</strong> with the question stem.
                  </p>
                </div>
              </div>

              {/* Method 3: Brute-Force Mathematical Ballpark Convergence */}
              <div className="bg-surface p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center shrink-0">
                    #6
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

                <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                  Facing a complex physics, ML, or HR numerical problem with zero idea what equation to use?
                  Multiply, divide, or add all numbers given in the question stem. Choose whichever option is closest or in the same order of magnitude.
                </p>
              </div>

            </div>
          )}

          {/* TAB 6: TCS iON CENTER PROTOCOL */}
          {activeTab === 'center' && (
            <div className="space-y-3.5 text-xs text-gray-700 dark:text-neutral-300 animate-in fade-in duration-150">
              <div className="bg-surface p-4 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  1. The Color Hall Ticket Preparation
                </h4>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                  Print the admit card in high-gloss color. Carry two blue ballpoint pens even though you will never touch paper because the TCS iON virtual keypad does all the numerical input.
                </p>
              </div>

              <div className="bg-surface p-4 rounded-xl border border-gray-200 dark:border-outline shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  2. The Mandatory Waiting Hour Performance
                </h4>
                <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                  Using the Longest Option Theorem and the LARP Cascade, you will finish your 50 questions in under 20 minutes. 
                  However, TCS iON does not let anyone leave before 60 minutes. Do NOT click submit early and sleep on the desk. 
                  Solemnly click through the review palette looking like you are deeply pondering mathematical edge-cases.
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: LINKEDIN TEMPLATE */}
          {activeTab === 'linkedin' && (
            <div className="space-y-3 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 p-3 rounded-xl">
                <div>
                  <div className="font-bold text-blue-900 dark:text-blue-200">Pre-Formatted LinkedIn LARP Victory Post</div>
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

              <div className="bg-[#080808] text-neutral-100 p-4 rounded-xl font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-neutral-800 select-all max-h-72 overflow-y-auto">
                {linkedInPostText}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-surface border-t border-gray-200 dark:border-outline flex items-center justify-between shrink-0">
          <div className="text-[11px] text-gray-500 dark:text-neutral-400 font-medium">
            Quizify 5 Pro Ultra • <span className="text-orange-600 dark:text-orange-400 font-bold">Made by Saksham Sooden</span>
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
 * Top-Right Button that toggles the Ultra LARP guide modal and triggers the full-screen flash on acknowledge
 */
export function LarpGuideButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs border bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/15 border-amber-400/60 hover:border-amber-500 text-amber-900 dark:text-amber-300 hover:text-orange-950 dark:hover:text-amber-100 hover:shadow-amber-500/10 dark:bg-amber-950/30"
        title="Open the In-Depth NPTEL Ultra LARP Guide"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500 group-hover:scale-110 transition-transform" />
        <span className="font-extrabold tracking-tight">Ultra LARP Guide</span>
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

/**
 * Mid-Quiz "LARP Successful" Button
 * Plays a randomly selected meme sound and the cinematic overlay.
 */
export function LarpSuccessfulButton({ 
  className = "",
  variant = "primary"
}: { 
  className?: string;
  variant?: 'primary' | 'subtle';
}) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [sound, setSound] = useState<{ name: string; duration: number } | null>(null);
  const stopSound = useRef<(() => void) | null>(null);
  const close = useCallback(() => {
    stopSound.current?.();
    stopSound.current = null;
    setIsFlashing(false);
  }, []);
  useEffect(() => {
    const hide = () => { if (document.hidden) close(); };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      stopSound.current?.();
    };
  }, [close]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          stopSound.current?.();
          try {
            const playback = playRandomLarpMemeSound(playLarpSound);
            stopSound.current = playback.stop;
            setSound(playback.clip);
          } catch { /* The celebration remains available without audio. */ }
          setIsFlashing(true);
        }}
        className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer shadow-md active:scale-95 border select-none ${
          variant === 'primary'
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 border-amber-300 dark:border-amber-400/80 shadow-orange-500/20 hover:shadow-orange-500/40'
            : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-400/60 hover:border-amber-500'
        } ${className}`}
        title="Celebrate with the original cinematic effect or Vine Boom!"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
        </span>
        <Flame className="w-3.5 h-3.5 fill-slate-950 text-slate-950 group-hover:scale-125 transition-transform" />
        <span className="tracking-tight uppercase font-extrabold whitespace-nowrap">
          LARP Successful
        </span>
        <Sparkles className="w-3 h-3 text-slate-950 opacity-90 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Screen flash with wide meme image and cinematic effects */}
      <LarpFlashOverlay 
        isOpen={isFlashing} 
        onClose={close}
        badgeText="🔥 LARP SUCCESSFUL — THEOREM ENGAGED!"
        synthesizedSound={false}
        durationMs={Math.max(4000, ((sound?.duration ?? 3) + 0.5) * 1000)}
        soundName={sound?.name}
        subText="Anti-Only Filter Applied • Longest Option Locked • Elite + Gold Certificate Guaranteed"
      />
    </>
  );
}
