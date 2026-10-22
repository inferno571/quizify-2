import React, { useRef, useState } from 'react';
import { Quiz, QuizAttempt, SavedQuizProgress } from '../lib/types';
import { 
  FileText, 
  Loader2, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  FileUp, 
  PlusCircle, 
  Trash2, 
  Download, 
  Code,
  BookOpen,
  Folder,
  Layers,
  GraduationCap,
  Pause,
  Play,
  RotateCcw,
  Bookmark,
  Users
} from 'lucide-react';
import { QuizMode } from './LandingScreen';
import { ImportQuizModal } from './ImportQuizModal';
import { LarpGuideButton } from './LarpGuideModal';

interface DashboardScreenProps {
  quizzes: Quiz[];
  attempts: Record<string, QuizAttempt>;
  savedProgress?: Record<string, SavedQuizProgress>;
  onClearProgress?: (quizId: string) => void;
  onUpload: (files: File[], instructions?: string) => void;
  onGenerateFromMaterial: (files: File[], numQuestions: number, difficulty: string, instructions?: string) => void;
  isLoading: boolean;
  onTakeQuiz: (id: string) => void;
  onViewResults: (id: string) => void;
  onDeleteQuiz?: (id: string) => void;
  onSaveManualQuiz?: (quiz: Quiz) => void;
  mode: QuizMode;
  onBack: () => void;
}

export function DashboardScreen({ 
  quizzes, 
  attempts, 
  savedProgress,
  onClearProgress,
  onUpload, 
  onGenerateFromMaterial, 
  isLoading, 
  onTakeQuiz, 
  onViewResults, 
  onDeleteQuiz,
  onSaveManualQuiz,
  mode, 
  onBack 
}: DashboardScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [instructions, setInstructions] = useState("");
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Generation config (only used in 'generate' mode)
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');

  // Compute unique subjects
  const allSubjects = Array.from(new Set(quizzes.map(q => q.subject || "General"))).sort();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addFiles = (newFiles: File[]) => {
    setStagedFiles(prev => [...prev, ...newFiles]);
    
    // Generate previews
    newFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else if (file.name.endsWith('.json') || file.type === 'application/json') {
        setPreviews(prev => [...prev, "JSON_PLACEHOLDER"]);
      } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
        setPreviews(prev => [...prev, "TXT_PLACEHOLDER"]);
      } else {
        setPreviews(prev => [...prev, "PDF_PLACEHOLDER"]);
      }
    });
  };

  const removeFile = (index: number) => {
    setStagedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          files.push(new File([blob], `pasted_image_${Date.now()}_${i}.png`, { type: blob.type }));
        }
      }
    }

    if (files.length > 0) {
      addFiles(files);
    }
  };

  const handleGenerate = () => {
    if (stagedFiles.length > 0) {
      if (mode === 'generate') {
        onGenerateFromMaterial(stagedFiles, numQuestions, difficulty, instructions);
      } else {
        onUpload(stagedFiles, instructions);
      }
      setStagedFiles([]);
      setPreviews([]);
      setInstructions("");
    }
  };

  const exportQuizAsJson = (quiz: Quiz) => {
    const jsonStr = JSON.stringify(quiz, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.title.toLowerCase().replace(/[^a-z0-9_-]/g, "_")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isGenerate = mode === 'generate';
  const accentColor = isGenerate ? '#E67E22' : '#2980b9';
  const accentColorHover = isGenerate ? '#d35400' : '#2471a3';

  // Group quizzes by subject
  const subjectsToDisplay = selectedSubject === "all" ? allSubjects : [selectedSubject];

  const getSubjectColor = (subj: string) => {
    const lower = subj.toLowerCase();
    if (lower.includes('vision') || (lower.includes('cv') && lower.includes('ai'))) {
      return { bg: 'bg-teal-600', lightBg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300' };
    }
    if (lower.includes('2025')) {
      return { bg: 'bg-violet-600', lightBg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-300' };
    }
    if (lower.includes('hr') || lower.includes('analytics')) {
      return { bg: 'bg-emerald-500', lightBg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' };
    }
    if (lower.includes('genai') || lower.includes('generative')) {
      return { bg: 'bg-orange-500', lightBg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' };
    }
    if (lower.includes('nlp') || lower.includes('dlnlp')) {
      return { bg: 'bg-purple-600', lightBg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' };
    }
    if (lower.includes('deep') || lower.includes('learning')) {
      return { bg: 'bg-blue-600', lightBg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' };
    }
    return { bg: 'bg-indigo-600', lightBg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300' };
  };

  return (
    <div className="flex bg-white dark:bg-canvas min-h-[85vh] font-sans border-t border-[#dee2e6] dark:border-outline transition-colors">
      {/* Sidebar */}
      <div className="w-64 bg-[#f8f9fa] dark:bg-surface border-r border-[#dee2e6] dark:border-outline pt-4 hidden md:flex md:flex-col shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#2980b9] dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-surface-hover transition cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="h-px bg-[#dee2e6] dark:border-outline mx-4 mb-2" />
        
        <ul className="text-sm font-semibold text-[#495057] dark:text-neutral-300">
          <li className="px-6 py-3 bg-[#e9ecef] dark:bg-surface-muted border-l-4 text-[#2c3e50] dark:text-white flex items-center gap-2" style={{ borderColor: accentColor }}>
            {isGenerate ? <Brain className="w-4 h-4" /> : <FileUp className="w-4 h-4" />}
            {isGenerate ? 'AI Generation' : 'Upload Questions'}
          </li>
          <li 
            onClick={() => setIsImportModalOpen(true)}
            className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-surface-hover cursor-pointer text-[#2980b9] dark:text-blue-400 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add Quiz (Offline)
          </li>
        </ul>

        {/* Subjects in Sidebar */}
        <div className="mt-4 px-6 mb-2 flex items-center justify-between text-xs font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-wider">
          <span>Subjects</span>
          <span className="bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 px-1.5 py-0.5 rounded text-[10px]">{allSubjects.length}</span>
        </div>
        <ul className="text-xs font-semibold text-[#495057] dark:text-neutral-300 space-y-0.5">
          <li 
            onClick={() => setSelectedSubject("all")}
            className={`px-6 py-2.5 flex items-center justify-between cursor-pointer transition ${
              selectedSubject === "all" ? "bg-blue-50 dark:bg-blue-950/40 text-[#2980b9] dark:text-blue-400 border-l-4 border-[#2980b9]" : "hover:bg-gray-200 dark:hover:bg-surface-hover"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>All Subjects</span>
            </div>
            <span className="text-[10px] bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 px-1.5 py-0.5 rounded-full">{quizzes.length}</span>
          </li>
          {allSubjects.map((subj) => {
            const count = quizzes.filter(q => (q.subject || "General") === subj).length;
            const isSubjActive = selectedSubject === subj;
            const colors = getSubjectColor(subj);
            return (
              <li 
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-6 py-2.5 flex items-center justify-between cursor-pointer transition ${
                  isSubjActive ? `${colors.lightBg} dark:bg-neutral-800 ${colors.text} dark:text-white border-l-4 ${colors.border}` : "hover:bg-gray-200 dark:hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{subj}</span>
                </div>
                <span className="text-[10px] bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 px-1.5 py-0.5 rounded-full shrink-0">{count}</span>
              </li>
            );
          })}
        </ul>

        {/* Local Permanent Storage badge */}
        <div className="mt-auto m-4 mb-2 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded text-[11px] text-emerald-800 dark:text-emerald-300">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Permanent Local Storage
          </div>
          <p className="text-gray-600 dark:text-neutral-400 leading-tight">
            Quizzes are saved on disk in <code className="bg-emerald-100/70 dark:bg-emerald-900/50 px-1 py-0.5 rounded text-[10px]">quizzes/</code>. 100% offline ready.
          </p>
        </div>

        {/* Creator Branding Badge */}
        <div className="mx-4 mb-4 p-3 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-surface-muted dark:to-surface-muted border border-orange-200/80 dark:border-outline rounded text-[11px] text-orange-950 dark:text-orange-300 shadow-xs">
          <div className="font-extrabold flex items-center justify-between text-orange-800 dark:text-orange-400 mb-0.5">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Quizify 5 Pro Ultra
            </span>
            <span className="text-[9px] bg-orange-200/60 px-1.5 py-0.2 rounded font-bold">v5.0</span>
          </div>
          <p className="text-gray-600 text-[10px] leading-tight">
            Engineered by <span className="font-bold text-gray-800">Saksham Sooden</span>
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="app-background flex-1 p-4 sm:p-6 md:p-10 bg-canvas min-w-0 transition-colors" onPaste={handlePaste}>
        
        {/* Mode Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ 
              background: `linear-gradient(135deg, ${accentColor}, ${accentColorHover})` 
            }}>
              {isGenerate ? <Sparkles className="w-5 h-5 text-white" /> : <FileUp className="w-5 h-5 text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#2c3e50] dark:text-white">
                  {isGenerate ? 'Generate Quiz from Study Material' : 'Upload Questions & Solutions'}
                </h1>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200 uppercase tracking-wide">
                  Quizify 5 Pro Ultra
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-neutral-400">
                {isGenerate 
                  ? 'Quizify 5 Pro Ultra AI Engine • Made by Saksham Sooden'
                  : 'Quizify 5 Pro Ultra Direct Parser • Made by Saksham Sooden'}
              </p>
            </div>
          </div>


          <div className="flex items-center gap-2 flex-wrap">
            <LarpGuideButton />
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-2 bg-surface border border-[#2980b9] dark:border-blue-500 text-[#2980b9] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-surface-hover px-4 py-2 rounded text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add / Paste Quiz (Offline)
            </button>
          </div>
        </div>


        <p className="text-xs text-gray-500 mb-3 italic">
          Tip: You can paste images (Ctrl+V), or upload <strong>.json</strong> and <strong>.txt</strong> quiz files directly for instant offline parsing without an API key.
        </p>
         
        {/* Staged Files Preview */}
        {stagedFiles.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4 p-3 bg-surface border border-dashed border-outline rounded">
             {stagedFiles.map((file, idx) => (
               <div key={idx} className="relative group w-24 h-24 border rounded overflow-hidden bg-gray-50 flex flex-col justify-center items-center">
                 {previews[idx] === "PDF_PLACEHOLDER" && (
                   <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-500 font-bold p-1 text-center">
                     <FileText className="w-6 h-6 mb-1 text-red-500" />
                     PDF
                   </div>
                 )}
                 {previews[idx] === "JSON_PLACEHOLDER" && (
                   <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-emerald-600 font-bold p-1 text-center bg-emerald-50">
                     <Code className="w-6 h-6 mb-1 text-emerald-600" />
                     JSON (Offline)
                   </div>
                 )}
                 {previews[idx] === "TXT_PLACEHOLDER" && (
                   <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-blue-600 font-bold p-1 text-center bg-blue-50">
                     <FileText className="w-6 h-6 mb-1 text-blue-600" />
                     TXT (Offline)
                   </div>
                 )}
                 {!["PDF_PLACEHOLDER", "JSON_PLACEHOLDER", "TXT_PLACEHOLDER"].includes(previews[idx]) && (
                   <img src={previews[idx]} alt="preview" className="w-full h-full object-cover" />
                 )}
                 <button 
                   onClick={() => removeFile(idx)}
                   className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-[10px] rounded-bl opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition cursor-pointer"
                 >
                   &times;
                 </button>
                 <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] px-1 truncate">
                   {file.name}
                 </div>
               </div>
             ))}
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 hover:border-[#2980b9] hover:text-[#2980b9] transition cursor-pointer"
             >
               <span className="text-xl">+</span>
               <span className="text-[10px]">Add More</span>
             </button>
          </div>
        )}

        {/* Generation Config (only for 'generate' mode) */}
        {isGenerate && stagedFiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-gradient-to-r from-orange-50/60 to-amber-50/40 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200/60 dark:border-orange-900/40 rounded-lg">
            <div>
              <label className="block text-xs font-semibold text-[#2c3e50] dark:text-neutral-200 mb-1.5">Number of Questions</label>
              <input 
                type="number" 
                min={1} 
                max={50} 
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                className="w-full text-sm p-2.5 border border-[#dee2e6] dark:border-outline rounded bg-surface text-[#2c3e50] dark:text-white focus:outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2c3e50] dark:text-neutral-200 mb-1.5">Difficulty Level</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full text-sm p-2.5 border border-[#dee2e6] dark:border-outline rounded bg-surface text-[#2c3e50] dark:text-white focus:outline-none focus:border-orange-400 transition cursor-pointer"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="mixed">Mixed (All Levels)</option>
              </select>
            </div>
          </div>
        )}

        <textarea
          className="w-full text-sm p-3 mb-4 border border-[#dee2e6] dark:border-outline rounded bg-surface text-[#2c3e50] dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#2980b9] transition"
          placeholder={isGenerate 
            ? "Additional instructions (Optional) e.g., 'Focus on chapter 3 and include conceptual questions'" 
            : "Additional Prompt Instructions (Optional) e.g., 'Make sure to extract 10 questions only'"}
          rows={2}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <div className="flex items-center gap-4 mb-10">
           <input 
             type="file" 
             multiple 
             accept="application/pdf,image/*,.json,.txt,text/plain,application/json"
             className="hidden"
             ref={fileInputRef}
             onChange={handleFileChange}
           />
           {stagedFiles.length === 0 ? (
             <div className="flex items-center gap-3">
               <button 
                 className={`text-white px-5 py-2 text-sm font-semibold rounded-sm tracking-wide flex items-center gap-2 transition cursor-pointer ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
                 style={{ backgroundColor: '#2c3e50' }}
                 onClick={() => fileInputRef.current?.click()}
                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a252f')}
                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2c3e50')}
               >
                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                 {isLoading ? 'Processing...' : isGenerate ? 'Add Study Material' : 'Upload File (PDF / Img / JSON / TXT)'}
               </button>

               <button
                 type="button"
                 onClick={() => setIsImportModalOpen(true)}
                 className="bg-[#27ae60] hover:bg-[#219150] text-white px-4 py-2 text-sm font-semibold rounded-sm flex items-center gap-2 transition cursor-pointer"
               >
                 <PlusCircle className="w-4 h-4" />
                 Add Quiz Offline
               </button>
             </div>
           ) : (
             <button 
               className={`text-white px-6 py-2 text-sm font-bold rounded-sm tracking-wide flex items-center gap-2 shadow-sm transition cursor-pointer ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
               style={{ backgroundColor: accentColor }}
               onClick={handleGenerate}
               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentColorHover)}
               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
             >
               {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                 isGenerate ? <Sparkles className="w-4 h-4" /> : 
                 <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs" style={{ color: accentColor }}>!</div>
               }
               {isLoading 
                 ? (isGenerate ? 'Generating Quiz...' : 'Processing...') 
                 : (isGenerate ? `Generate ${numQuestions} Questions` : `Process Files (${stagedFiles.length})`)}
             </button>
           )}
           
           {stagedFiles.length > 0 && !isLoading && (
             <button 
               onClick={() => { setStagedFiles([]); setPreviews([]); }}
               className="text-gray-500 hover:text-red-500 text-sm font-medium transition cursor-pointer"
             >
               Clear All
             </button>
           )}
        </div>


        {/* Subjects Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between border-b border-[#dee2e6] pb-3 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-light text-foreground">
                My Quizzes
              </h2>
              <span className="bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full text-xs">
                {quizzes.length} Total
              </span>
            </div>
            
            <span className="text-xs text-gray-500 hidden sm:inline">
              Organized by Subject • Saved permanently
            </span>
          </div>

          {/* Subject Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedSubject("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedSubject === "all"
                  ? "bg-[#2c3e50] text-white shadow-sm"
                  : "bg-surface-muted text-muted hover:bg-surface-hover"
              }`}
            >
              All Subjects ({quizzes.length})
            </button>
            {allSubjects.map((subj) => {
              const subjCount = quizzes.filter(q => (q.subject || "General") === subj).length;
              const isCurrent = selectedSubject === subj;
              const colors = getSubjectColor(subj);
              return (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? `${colors.bg} text-white shadow-sm`
                      : `${colors.lightBg} ${colors.text} hover:opacity-80 border ${colors.border}`
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{subj}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isCurrent ? 'bg-white/30 text-white' : 'bg-black/10'}`}>
                    {subjCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Separate Subject Sections */}
        {quizzes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
             <p className="text-gray-500 text-sm mb-3">No quizzes have been created yet.</p>
             <button
               onClick={() => setIsImportModalOpen(true)}
               className="inline-flex items-center gap-2 px-4 py-2 bg-[#2980b9] text-white text-xs font-bold rounded hover:bg-[#206796] transition"
             >
               <PlusCircle className="w-4 h-4" />
               Create First Quiz
             </button>
          </div>
        ) : (
          <div className="space-y-10">
            {subjectsToDisplay.map((subjectName) => {
              const rawQuizzes = quizzes.filter(q => (q.subject || "General") === subjectName);
              if (rawQuizzes.length === 0) return null;

              const combinedQuizzes = rawQuizzes.filter(q => q.id.includes("combined") || q.title.toLowerCase().includes("combined"));
              const regularQuizzes = rawQuizzes.filter(q => !q.id.includes("combined") && !q.title.toLowerCase().includes("combined"));

              // Sort regular quizzes by assignment/week number (Pending & Incorrect review quizzes sit after regular weeks)
              const getNum = (str: string) => {
                if (str.toLowerCase().includes("pending")) return 999;
                if (str.toLowerCase().includes("incorrect")) return 1000;
                const m = str.match(/(\d+)/);
                return m ? parseInt(m[1], 10) : 0;
              };
              regularQuizzes.sort((a, b) => getNum(a.title) - getNum(b.title));


              const subjectQuizzes = [...combinedQuizzes, ...regularQuizzes];
              const primaryCombined = combinedQuizzes[0];

              const completedCount = subjectQuizzes.filter(q => !!attempts[q.id]).length;
              const colors = getSubjectColor(subjectName);

              return (
                <div key={subjectName} className="bg-surface border border-[#dee2e6] dark:border-outline rounded-lg shadow-xs overflow-hidden">
                  
                  {/* Subject Section Header */}
                  <div className="p-4 bg-gray-50 dark:bg-surface border-b border-[#dee2e6] dark:border-outline flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white ${colors.bg} shadow-xs`}>
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#2c3e50] dark:text-white flex items-center gap-2">
                          {subjectName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                          {subjectQuizzes.length} {subjectQuizzes.length === 1 ? 'assignment/test' : 'assignments & tests'} available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-surface-muted border border-gray-200 dark:border-outline rounded-full text-gray-700 dark:text-neutral-300">
                        Progress: {completedCount}/{subjectQuizzes.length} Completed
                      </span>
                    </div>
                  </div>

                  {/* Featured Hero Banner for Full Combined Grand Test if available */}
                  {primaryCombined && (() => {
                    const primaryCombinedProgress = savedProgress ? savedProgress[primaryCombined.id] : null;

                    return (
                    <div className="m-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shrink-0">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Full Combined Grand Test
                            </span>
                            <span className="text-xs text-indigo-200">
                              {primaryCombined.questions.length} Total Questions • All {regularQuizzes.length} Assignments Combined
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white tracking-wide">
                            {primaryCombined.title}
                          </h4>
                          <p className="text-xs text-gray-300">
                            Complete full-length examination covering the entire subject syllabus.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                        {primaryCombinedProgress ? (
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-2 hidden sm:block">
                              <div className="text-xs text-amber-300 font-bold flex items-center gap-1 justify-end">
                                <Pause className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Paused: Q{primaryCombinedProgress.currentPos + 1}/{primaryCombined.questions.length}
                              </div>
                              <div className="text-[10px] text-gray-300">
                                {Object.keys(primaryCombinedProgress.answers).length} answered
                              </div>
                            </div>
                            <button
                              onClick={() => onTakeQuiz(primaryCombined.id)}
                              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs rounded-lg shadow-md transition cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              Resume Full Test (Q{primaryCombinedProgress.currentPos + 1})
                            </button>
                            {attempts[primaryCombined.id] && (
                              <button
                                onClick={() => onViewResults(primaryCombined.id)}
                                className="px-3.5 py-2 bg-[#f39c12] hover:bg-[#d68910] text-white font-bold text-xs rounded transition cursor-pointer shadow-xs"
                              >
                                Results
                              </button>
                            )}
                            {onClearProgress && (
                              <button
                                onClick={() => {
                                  if (confirm(`Restart "${primaryCombined.title}" from Question 1? Current saved progress will be discarded.`)) {
                                    onClearProgress(primaryCombined.id);
                                  }
                                }}
                                title="Discard saved in-progress session and restart fresh"
                                className="p-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-red-300 rounded-lg text-xs font-semibold border border-white/20 transition cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ) : attempts[primaryCombined.id] ? (
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-2 hidden sm:block">
                              {attempts[primaryCombined.id].isTwoPlayer ? (
                                <>
                                  <div className="text-xs font-bold flex items-center gap-1 justify-end text-purple-300">
                                    <Users className="w-3.5 h-3.5 text-purple-400" />
                                    <span>{attempts[primaryCombined.id].player1Name || 'P1'}: {attempts[primaryCombined.id].player1Score ?? attempts[primaryCombined.id].score}</span>
                                    <span className="text-gray-400">•</span>
                                    <span>{attempts[primaryCombined.id].player2Name || 'P2'}: {attempts[primaryCombined.id].player2Score ?? 0}</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400">
                                    2-Player Co-op / Versus
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 justify-end">
                                    <CheckCircle className="w-3.5 h-3.5" /> Score: {attempts[primaryCombined.id].score}/{primaryCombined.questions.length}
                                  </div>
                                  <div className="text-[10px] text-gray-400">
                                    {Math.round((attempts[primaryCombined.id].score / primaryCombined.questions.length) * 100)}% Accuracy
                                  </div>
                                </>
                              )}
                            </div>

                            <button
                              onClick={() => onViewResults(primaryCombined.id)}
                              className="px-3.5 py-2 bg-[#f39c12] hover:bg-[#d68910] text-white font-bold text-xs rounded transition cursor-pointer shadow-xs"
                            >
                              Results
                            </button>
                            <button
                              onClick={() => onTakeQuiz(primaryCombined.id)}
                              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded border border-white/20 transition cursor-pointer"
                            >
                              Retake Full Test
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onTakeQuiz(primaryCombined.id)}
                            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-lg shadow-md hover:shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                          >
                            <Sparkles className="w-4 h-4 fill-slate-950" />
                            Attempt Full Combined Test
                          </button>
                        )}
                      </div>
                    </div>
                    );
                  })()}

                  {/* Quizzes Table for this Subject */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface border-b border-[#dee2e6] dark:border-outline text-[#6c757d] dark:text-neutral-400 text-xs uppercase tracking-wider font-semibold">
                          <th className="p-3 w-12 text-center">S.No.</th>
                          <th className="p-3">Assignment Title</th>
                          <th className="p-3 text-center">Date</th>
                          <th className="p-3 text-center">Questions</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-[#2c3e50] dark:text-neutral-200 divide-y divide-gray-100 dark:divide-neutral-800">
                        {subjectQuizzes.map((quiz, index) => {
                          const hasAttempt = !!attempts[quiz.id];
                          const attemptInfo = attempts[quiz.id];
                          const inProgress = savedProgress ? savedProgress[quiz.id] : null;
                          const isCombined = quiz.id.includes("combined") || quiz.title.toLowerCase().includes("combined");
                          const isPendingTest = quiz.id === "genai-pending" || quiz.title.toLowerCase() === "pending";

                          return (
                            <tr key={quiz.id} className={`transition ${
                              isCombined 
                                ? "bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/60 dark:hover:bg-amber-950/40 border-l-4 border-l-amber-500 font-medium" 
                                : isPendingTest
                                ? "bg-orange-50/50 dark:bg-orange-950/20 hover:bg-orange-100/60 dark:hover:bg-orange-950/40 border-l-4 border-l-orange-500 font-medium"
                                : inProgress
                                ? "bg-emerald-50/30 dark:bg-emerald-950/20 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
                                : "hover:bg-blue-50/40 dark:hover:bg-surface-hover"
                            }`}>
                              <td className="p-3 text-center text-gray-500 dark:text-neutral-400 text-xs font-medium">{index + 1}</td>
                              <td className="p-3 font-medium text-[#2980b9] dark:text-blue-400">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span>{quiz.title}</span>
                                  {isCombined && (
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs uppercase tracking-wider flex items-center gap-0.5">
                                      <Sparkles className="w-2.5 h-2.5" /> Full Combined
                                    </span>
                                  )}
                                  {isPendingTest && (
                                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-1">
                                      <Clock className="w-2.5 h-2.5" /> 71 Questions Pending
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-center text-xs text-gray-500">{quiz.date}</td>
                              <td className="p-3 text-center font-semibold text-xs">{quiz.questions.length}</td>
                              <td className="p-3 text-center">
                                {inProgress ? (
                                  <div className="inline-flex flex-col items-center gap-0.5">
                                    <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full font-bold text-xs shadow-2xs">
                                      <Pause className="w-3 h-3 text-amber-600 animate-pulse" />
                                      Paused (Q{inProgress.currentPos + 1})
                                      {inProgress.isTwoPlayer && (
                                        <span className="px-1 py-0.2 text-[8px] font-black bg-purple-200 text-purple-800 rounded">
                                          2P
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-medium">
                                      {Object.keys(inProgress.answers).length}/{quiz.questions.length} answered
                                    </span>
                                    {hasAttempt && (
                                      <span className="text-[9px] text-emerald-700 font-semibold">Prev: {attemptInfo.score}/{quiz.questions.length}</span>
                                    )}
                                  </div>
                                ) : hasAttempt ? (
                                  <div className="inline-flex flex-col items-center gap-0.5">
                                    <span className="inline-flex items-center gap-1 text-[#27ae60] font-semibold text-xs">
                                      <CheckCircle className="w-3.5 h-3.5" /> Submitted
                                      {attemptInfo.isTwoPlayer && (
                                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-purple-100 text-purple-700 border border-purple-200">
                                          2P
                                        </span>
                                      )}
                                    </span>
                                    {attemptInfo.isTwoPlayer ? (
                                      <span className="text-[10px] text-gray-600 font-medium">
                                        <span className="text-blue-600 font-bold">{attemptInfo.player1Name || 'P1'}: {attemptInfo.player1Score ?? attemptInfo.score}</span>
                                        <span className="text-gray-400"> vs </span>
                                        <span className="text-purple-600 font-bold">{attemptInfo.player2Name || 'P2'}: {attemptInfo.player2Score ?? 0}</span>
                                      </span>
                                    ) : (
                                      <span className="text-[11px] text-gray-500">
                                         ({attemptInfo.score}/{quiz.questions.length})
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[#e67e22] font-semibold text-xs">
                                    <Clock className="w-3.5 h-3.5" /> Pending
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                  {inProgress ? (
                                    <>
                                      <button 
                                        onClick={() => onTakeQuiz(quiz.id)}
                                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
                                        title={`Resume test from Question ${inProgress.currentPos + 1}`}
                                      >
                                        <Play className="w-3 h-3 fill-white" />
                                        Resume (Q{inProgress.currentPos + 1})
                                      </button>
                                      {hasAttempt && (
                                        <button 
                                          onClick={() => onViewResults(quiz.id)}
                                          className="text-xs bg-[#f39c12] hover:bg-[#d68910] text-white px-2 py-1 rounded font-semibold transition cursor-pointer"
                                        >
                                          Results
                                        </button>
                                      )}
                                      {onClearProgress && (
                                        <button
                                          onClick={() => {
                                            if (confirm(`Restart "${quiz.title}" from Question 1? Current saved progress will be discarded.`)) {
                                              onClearProgress(quiz.id);
                                            }
                                          }}
                                          title="Discard saved progress and start fresh"
                                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded transition cursor-pointer"
                                        >
                                          <RotateCcw className="w-3 h-3" />
                                        </button>
                                      )}
                                    </>
                                  ) : hasAttempt ? (
                                    <>
                                      <button 
                                        onClick={() => onViewResults(quiz.id)}
                                        className="text-xs bg-[#f39c12] hover:bg-[#d68910] text-white px-2.5 py-1 rounded font-semibold transition cursor-pointer"
                                      >
                                        Results
                                      </button>
                                      <button 
                                        onClick={() => onTakeQuiz(quiz.id)}
                                        className="text-xs bg-gray-100 dark:bg-surface-muted hover:bg-gray-200 dark:hover:bg-surface-hover text-[#2c3e50] dark:text-neutral-200 border border-gray-300 dark:border-outline px-2.5 py-1 rounded font-semibold transition cursor-pointer"
                                      >
                                        Retake
                                      </button>
                                    </>
                                  ) : isCombined ? (
                                    <button 
                                      onClick={() => onTakeQuiz(quiz.id)}
                                      className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black px-3.5 py-1.5 rounded transition cursor-pointer shadow-xs flex items-center gap-1 uppercase tracking-wide"
                                    >
                                      <Sparkles className="w-3 h-3 fill-slate-950" />
                                      Take Full Test
                                    </button>
                                  ) : isPendingTest ? (
                                    <button 
                                      onClick={() => onTakeQuiz(quiz.id)}
                                      className="text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-3.5 py-1.5 rounded transition cursor-pointer shadow-xs flex items-center gap-1"
                                    >
                                      <Play className="w-3 h-3 fill-white" />
                                      Start Pending Test
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => onTakeQuiz(quiz.id)}
                                      className="text-xs bg-[#2980b9] hover:bg-[#2471a3] text-white px-3.5 py-1 rounded font-semibold transition cursor-pointer shadow-xs"
                                    >
                                      Take Quiz
                                    </button>
                                  )}

                                  {/* Export JSON button */}
                                  <button
                                    title="Export Quiz as JSON"
                                    onClick={() => exportQuizAsJson(quiz)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded transition cursor-pointer"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete quiz button */}
                                  {onDeleteQuiz && (
                                    <button
                                      title="Delete Quiz"
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
                                          onDeleteQuiz(quiz.id);
                                        }
                                      }}
                                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Offline Import Modal */}
      <ImportQuizModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSaveQuiz={(quiz) => {
          if (onSaveManualQuiz) {
            onSaveManualQuiz(quiz);
          }
        }}
      />
    </div>
  );
}
