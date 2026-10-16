'use client';

import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';

interface LarpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LarpGuideModal({ isOpen, onClose }: LarpGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'phases' | 'heuristics' | 'center' | 'linkedin'>('phases');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-amber-200/80 animate-in zoom-in-95 duration-200"
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
                The Sacred Art of Zero Lectures &amp; Maximum IIT Aura
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 text-slate-800">
          
          {/* Hero Banner with Meme Image */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-4 sm:p-5 text-white shadow-lg border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Meme Image Poster */}
              <div className="relative shrink-0 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src="/larp.jpg" 
                  alt="There's no limit to the LARP meme" 
                  className="relative w-36 sm:w-44 rounded-md object-cover shadow-2xl border-2 border-amber-400/80"
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
                  The ultimate blueprint for engineering students who watch <strong>0 hours of professor lectures</strong>, 
                  grind assignment patterns the night before, and walk into the TCS iON center with the confidence of an IIT PhD chair.
                </p>

                {/* Stat Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Lecture Time</div>
                    <div className="text-sm font-black text-white">0.00 hrs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 text-center">
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">Assignment Key</div>
                    <div className="text-sm font-black text-emerald-400">100% Rote</div>
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
          <div className="flex border-b border-gray-200 gap-1 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('phases')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'phases'
                  ? 'bg-white text-orange-600 border-t-2 border-orange-500 border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              5 Phases of the LARP
            </button>
            <button
              onClick={() => setActiveTab('heuristics')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'heuristics'
                  ? 'bg-white text-orange-600 border-t-2 border-orange-500 border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Golden Heuristics
            </button>
            <button
              onClick={() => setActiveTab('center')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'center'
                  ? 'bg-white text-orange-600 border-t-2 border-orange-500 border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              TCS iON Center Protocol
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'linkedin'
                  ? 'bg-white text-orange-600 border-t-2 border-orange-500 border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              LinkedIn Victory Post
            </button>
          </div>

          {/* TAB 1: 5 PHASES */}
          {activeTab === 'phases' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center">1</span>
                  <h3 className="text-sm font-bold text-gray-900">Phase 1: The Zero-Lecture Commitment</h3>
                </div>
                <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                  Never open the video tab on the Swayam portal. The 40-minute drone of slides is a psychological trap. 
                  Tell your family and professors: <em>&ldquo;Yes, I am auditing an advanced postgraduate curriculum from IIT Madras.&rdquo;</em>
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">2</span>
                  <h3 className="text-sm font-bold text-gray-900">Phase 2: Weekly Assignment Infiltration</h3>
                </div>
                <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                  Submit weekly assignments on Tuesday nights using the sacred collective intelligence of WhatsApp, Telegram, or Quizify 2. 
                  Secure your 25% internal weightage with zero cognitive expenditure.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">3</span>
                  <h3 className="text-sm font-bold text-gray-900">Phase 3: The Full Combined Exam Binge (Night Before)</h3>
                </div>
                <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                  The night before the exam, open <strong>Quizify 2</strong> and run the <em>Full Combined Grand Test (Weeks 1-12)</em> twice. 
                  NPTEL question setters do not invent 50 original questions every semester; <strong>65% to 80%</strong> of questions are copied verbatim from assignment PDFs.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-black text-xs flex items-center justify-center">4</span>
                  <h3 className="text-sm font-bold text-gray-900">Phase 4: The 18-Minute Speedrun</h3>
                </div>
                <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                  At the exam terminal, click the answers entirely by shape and muscle memory before even reading the question. 
                  Finish in 18 minutes. For the remaining 42 minutes before minimum exit time, stare at the blank mouse pad with furrowed brows like you are mentally deriving backpropagation loss surfaces.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">5</span>
                  <h3 className="text-sm font-bold text-gray-900">Phase 5: The LinkedIn Renaissance</h3>
                </div>
                <p className="text-xs text-gray-600 pl-8 leading-relaxed">
                  Collect the Gold/Elite e-certificate, claim credit transfer at your college with a poker face, 
                  and post a 5-paragraph LinkedIn reflection tagging the Ministry of Education. The LARP is now complete.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: GOLDEN HEURISTICS */}
          {activeTab === 'heuristics' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>The Empirical Law of NPTEL Distractors:</strong> When intuition fails and you have never seen the concept in your life, these heuristics boast a statistically verified ~78% success rate.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 text-blue-600">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    The Longest Option Theorem
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Professors spend 3 extra clauses qualifying the correct answer so students cannot dispute it in answer-key grievance forums. The longest, most pedantic option is almost always correct.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 text-emerald-600">
                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                    &ldquo;All of the Above&rdquo; Supremacy
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    If &ldquo;All of the above&rdquo; is present as an option, the probability of it being correct exceeds 85%. NPTEL educators love educational summaries where all bullet points are true.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 text-purple-600">
                    <ChevronRight className="w-4 h-4 text-purple-500" />
                    The Numerical Clumping Rule
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    If the options are 2, 24, 25, and 120, the correct answer is either 24 or 25. Distractors are almost always clustered right next to the true calculated value.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 text-orange-600">
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                    MSQ (Multiple Select) Traps
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    In MSQs, if 3 options sound very positive and scholarly while 1 sounds bizarrely restrictive, select all 3 positive options. Check for question stem words like &ldquo;NOT&rdquo; or &ldquo;EXCEPT&rdquo;.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TCS iON CENTER PROTOCOL */}
          {activeTab === 'center' && (
            <div className="space-y-3.5 text-xs text-gray-700 animate-in fade-in duration-150">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  1. The Color Hall Ticket Intimidation
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Print the admit card in high-gloss color. Carry two blue ballpoint pens even though you will never touch paper because the TCS iON virtual keypad does all the input. 
                  Place your Aadhaar card with deliberate precision on the desk.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 text-slate-800">
                  <Clock className="w-4 h-4 text-blue-600" />
                  2. Waiting Lounge Demeanor
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Do not participate in desperate hallway panic reviews. Sit quietly in a corner looking serene, like you have published three IEEE papers on the subject. 
                  If someone asks you how to solve a numerical problem, reply: <em>&ldquo;It simplifies directly through Jensen&rsquo;s inequality.&rdquo;</em> Walk away.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 text-slate-800">
                  <Target className="w-4 h-4 text-purple-600" />
                  3. The Mandatory Waiting Hour Performance
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  You will finish your 50 questions in 20 minutes because Quizify 2 drilled the exact assignments into your subconscious. 
                  However, TCS iON does not let you leave before 60 minutes. Do NOT click submit early and nap on the keyboard. 
                  Keep clicking the review palette solemnly to look like you are cross-validating the gradient descent hyper-parameters.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LINKEDIN TEMPLATE */}
          {activeTab === 'linkedin' && (
            <div className="space-y-3 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-xl">
                <div>
                  <div className="font-bold text-blue-900">Pre-Formatted LinkedIn Victory Post</div>
                  <div className="text-[11px] text-blue-700">One-click copy to celebrate your glorious certificate with the world.</div>
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
        <div className="px-5 py-3 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-gray-500 font-medium">
            Quizify 2 • <span className="text-orange-600 font-bold">Made by Saksham Sooden</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-xs"
          >
            Acknowledge the LARP
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Top-Right Button that toggles the LARP guide modal
 */
export function LarpGuideButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs border bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/15 border-amber-400/60 hover:border-amber-500 text-amber-900 hover:text-orange-950 hover:shadow-amber-500/10"
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

      <LarpGuideModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
