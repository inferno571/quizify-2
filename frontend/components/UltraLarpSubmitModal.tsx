'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Target, 
  Award, 
  Check
} from 'lucide-react';
import { playLarpSound } from './LarpGuideModal';
import { playRandomLarpMemeSound } from '../lib/larpMemeSounds';

interface UltraLarpSubmitModalProps {
  isOpen: boolean;
  quizTitle: string;
  answeredCount: number;
  totalCount: number;
  playerName?: string;
  onProceed: () => void;
}

export function UltraLarpSubmitModal({
  isOpen,
  quizTitle,
  answeredCount,
  totalCount,
  playerName = 'Scholar',
  onProceed,
}: UltraLarpSubmitModalProps) {
  const [countdown, setCountdown] = useState(7);
  const stopSoundRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Play cinematic triumph sound
    try {
      const playback = playRandomLarpMemeSound(playLarpSound);
      stopSoundRef.current = playback.stop;
    } catch {
      // Audio optional
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onProceed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        stopSoundRef.current?.();
        onProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      stopSoundRef.current?.();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onProceed]);

  if (!isOpen) return null;

  const handleProceedClick = () => {
    stopSoundRef.current?.();
    onProceed();
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 select-none overflow-hidden animate-larp-shake"
      onClick={handleProceedClick}
    >
      {/* 1. Strobe Flash Burst */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-amber-200 to-white animate-larp-flash pointer-events-none z-30" />

      {/* 2. Rotating Radiant Sunburst / Energy Rays */}
      <div className="absolute w-[200vw] h-[200vw] -left-[50vw] -top-[50vw] pointer-events-none opacity-30 animate-larp-spin z-0 bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0deg,transparent_20deg,#ef4444_45deg,transparent_65deg,#f59e0b_90deg,transparent_110deg,#ef4444_135deg,transparent_155deg,#f59e0b_180deg,transparent_200deg,#ef4444_225deg,transparent_245deg,#f59e0b_270deg,transparent_290deg,#ef4444_315deg,transparent_335deg,#f59e0b_360deg)]" />

      {/* 3. Outer Neon Glow Border */}
      <div className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-amber-400 rounded-2xl sm:rounded-3xl pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(245,158,11,0.6),0_0_100px_rgba(245,158,11,0.9)]" />

      {/* 4. Center Stage Cinema Container */}
      <div 
        className="relative z-10 max-w-4xl w-[94%] sm:w-[86%] flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-300 max-h-[92vh] overflow-y-auto p-2 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Badges */}
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-xl uppercase tracking-wider animate-bounce border border-amber-300">
            <Flame className="w-4 h-4 fill-slate-950" />
            THE LARP HAS BEEN OFFICIALLY SUBMITTED
          </span>
          <span className="px-3 py-1 bg-black/80 border border-amber-400 text-amber-300 font-bold text-xs rounded-full backdrop-blur-md shadow-md">
            SCHOLAR AURA: +999,999 (MAX OVERLOAD)
          </span>
        </div>

        {/* Widescreen Meme Poster Frame */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-amber-400 shadow-[0_0_80px_rgba(245,158,11,0.85)] animate-larp-glow group max-h-[38vh] sm:max-h-[44vh] flex items-center justify-center bg-black">
          <img 
            src="/larp_wide.jpg" 
            alt="There's no limit to the LARP" 
            className="w-full h-auto object-contain max-h-[36vh] sm:max-h-[42vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-3 text-white text-[10px] sm:text-xs font-mono font-bold drop-shadow-md">
            <span className="text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              LARP PROTOCOL ENGAGED
            </span>
            <span className="text-emerald-300">
              {answeredCount}/{totalCount} Completed
            </span>
          </div>
        </div>

        {/* Impact Headline */}
        <div className="mt-3 sm:mt-4 space-y-1">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            &ldquo;THERE&rsquo;S NO LIMIT TO THE LARP.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-amber-200/90 tracking-wide drop-shadow-md">
            Generative AI for Computer Vision · 83.3% Official Empirical Win Rate Verified
          </p>
        </div>

        {/* Empirical Findings Stat Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full mt-3 sm:mt-4">
          <div className="bg-black/60 border border-emerald-500/40 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-md shadow-lg">
            <div className="text-[10px] sm:text-[11px] text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3" /> Cascade Win Rate
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">83.33%</div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400">100/120 Questions (#1)</div>
          </div>

          <div className="bg-black/60 border border-amber-500/40 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-md shadow-lg">
            <div className="text-[10px] sm:text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Anti-Only Axiom
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">100% Trap Pruned</div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400">44/44 Traps Eliminated</div>
          </div>

          <div className="bg-black/60 border border-purple-500/40 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-md shadow-lg">
            <div className="text-[10px] sm:text-[11px] text-purple-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" /> Multi-Method
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-300 mt-0.5">Priority 1–6</div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400">Longest + Lexical + RE</div>
          </div>

          <div className="bg-black/60 border border-blue-500/40 rounded-xl p-2.5 sm:p-3 text-center backdrop-blur-md shadow-lg">
            <div className="text-[10px] sm:text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Award className="w-3 h-3" /> Certificate Tier
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-0.5">Elite + Gold</div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400">0.00 Lecture Hours</div>
          </div>
        </div>

        {/* Action Button & Auto-Proceed Timer */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            onClick={handleProceedClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base rounded-xl transition duration-200 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 transform active:scale-95"
          >
            <span>View Official LARP Results</span>
            <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
          </button>
          
          <div className="text-[11px] text-amber-200/80 font-mono">
            Auto-proceeding in <span className="font-bold text-white bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/40">{countdown}s</span> (or press Enter)
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
