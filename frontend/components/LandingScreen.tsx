import React from 'react';
import { BookOpen, FileUp, Sparkles, Brain, Upload, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export type QuizMode = 'generate' | 'upload';

interface LandingScreenProps {
  onSelectMode: (mode: QuizMode) => void;
}

export function LandingScreen({ onSelectMode }: LandingScreenProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-gradient-to-tl from-blue-200/30 to-indigo-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-100/20 to-pink-100/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Hero Title */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20 backdrop-blur-sm border border-orange-200/50 dark:border-orange-500/30 rounded-full px-4 py-1.5 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">Quizify 3 • Made by Saksham Sooden</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#2c3e50] dark:text-white tracking-tight mb-3">
          Welcome to <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Quizify 3</span>
        </h1>

        <p className="text-gray-500 dark:text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Crafted with care by <span className="font-semibold text-gray-700 dark:text-slate-200">Saksham Sooden</span>. Choose your path — generate questions from study material or practice instantly.
        </p>
      </motion.div>

      {/* Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl w-full">
        
        {/* Option 1: Generate from Study Material */}
        <motion.button
          className="group relative bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 rounded-2xl p-8 text-left cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-300/60 dark:hover:border-orange-500/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
          onClick={() => onSelectMode('generate')}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-shadow duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              Generate from Study Material
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-5">
              Upload your notes, textbooks, or slides and let AI create customized quiz questions with configurable difficulty and count.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> AI Generated
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Configurable
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-orange-500 dark:text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all">
              <span>Get Started</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </motion.button>

        {/* Option 2: Upload Questions File */}
        <motion.button
          className="group relative bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 rounded-2xl p-8 text-left cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/60 dark:hover:border-blue-500/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          onClick={() => onSelectMode('upload')}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              <FileUp className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-[#2c3e50] dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Upload Questions & Solutions
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-5">
              Already have a question paper? Upload a PDF or image file containing questions with answers and start practicing instantly.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full">
                <Upload className="w-3 h-3" /> Direct Upload
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-green-100/80 dark:bg-emerald-900/40 text-green-600 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                <BookOpen className="w-3 h-3" /> Instant
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
              <span>Get Started</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Creator Attribution */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 border border-gray-200/70 dark:border-slate-800 rounded-full px-4 py-1.5 shadow-sm">
          <span className="font-bold text-[#2c3e50] dark:text-slate-200">Quizify 3</span>
          <span>•</span>
          <span className="text-orange-600 dark:text-orange-400 font-semibold">Made by Saksham Sooden</span>
        </div>

      </motion.div>
    </div>
  );
}
