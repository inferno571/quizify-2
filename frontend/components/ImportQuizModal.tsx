"use client";
import React, { useState } from "react";
import { X, Code, FileText, Check, AlertCircle } from "lucide-react";
import { Quiz } from "../lib/types";
import { parseQuizJson, parseQuizFromText } from "../lib/localParser";

interface ImportQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuiz: (quiz: Quiz) => void;
}

export function ImportQuizModal({ isOpen, onClose, onSaveQuiz }: ImportQuizModalProps) {
  const [tab, setTab] = useState<"json" | "text">("json");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("HR Analytics");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<Quiz | null>(null);

  if (!isOpen) return null;

  const handleTestParse = () => {
    setError(null);
    try {
      if (!content.trim()) {
        throw new Error("Please enter some JSON or text content.");
      }
      let result: Quiz;
      if (tab === "json") {
        result = parseQuizJson(content, title.trim() || undefined);
      } else {
        result = parseQuizFromText(content, title.trim() || undefined);
      }
      if (subject.trim()) {
        result.subject = subject.trim();
      }
      setParsedPreview(result);
    } catch (err: any) {
      setError(err.message || "Failed to parse quiz content.");
      setParsedPreview(null);
    }
  };

  const handleSave = () => {
    try {
      let result = parsedPreview;
      if (!result) {
        if (tab === "json") {
          result = parseQuizJson(content, title.trim() || undefined);
        } else {
          result = parseQuizFromText(content, title.trim() || undefined);
        }
      }
      if (title.trim()) {
        result.title = title.trim();
      }
      if (subject.trim()) {
        result.subject = subject.trim();
      }
      onSaveQuiz(result);
      onClose();
      setContent("");
      setTitle("");
      setParsedPreview(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Could not save quiz.");
    }
  };

  const loadSample = () => {
    setError(null);
    if (tab === "json") {
      setTitle("Sample Python Basics Quiz");
      setContent(JSON.stringify({
        title: "Sample Python Basics Quiz",
        questions: [
          {
            question: "1. What is the output of print(2 ** 3)?",
            options: ["6", "8", "9", "5"],
            correctAnswer: "8",
            explanation: "2 ** 3 computes 2 raised to the power of 3, which equals 8."
          },
          {
            question: "2. Which of the following is an immutable data type in Python?",
            options: ["list", "set", "tuple", "dict"],
            correctAnswer: "tuple",
            explanation: "Tuples in Python cannot be modified once created, making them immutable."
          }
        ]
      }, null, 2));
    } else {
      setTitle("Sample Machine Learning Quiz");
      setContent(`1. Which loss function is best suited for binary classification with sigmoid output?
A. Mean Squared Error
B. Binary Cross-Entropy
C. Categorical Cross-Entropy
D. Hinge Loss
Answer: Binary Cross-Entropy
Explanation: Binary cross-entropy is the standard loss function for outputs squashed via sigmoid into [0, 1].

2. What does AdaGrad accumulate across training steps?
A. Exponentially smoothed gradients
B. Sum of past squared gradients
C. Raw momentum vectors
D. Second derivatives only
Answer: Sum of past squared gradients
Explanation: AdaGrad accumulates squared gradients indefinitely in the denominator.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#2c3e50] text-white flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/30">
                Quizify 3
              </span>

              <span className="text-[10px] text-gray-300">Made by Saksham Sooden</span>
            </div>
            <h3 className="text-lg font-bold">Add Quiz Locally (Offline / No API Key)</h3>
            <p className="text-xs text-gray-300">Save quizzes permanently to your local computer without needing Gemini</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-300 hover:text-white transition p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => { setTab("json"); setError(null); setParsedPreview(null); }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t border-t border-x cursor-pointer transition ${
              tab === "json" 
                ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-[#2980b9] dark:text-blue-400 -mb-[1px]" 
                : "border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Code className="w-4 h-4" /> Paste JSON
          </button>
          <button
            onClick={() => { setTab("text"); setError(null); setParsedPreview(null); }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t border-t border-x cursor-pointer transition ${
              tab === "text" 
                ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-[#2980b9] dark:text-blue-400 -mb-[1px]" 
                : "border-transparent text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" /> Paste Formatted Questions
          </button>

          <div className="ml-auto pb-2">
            <button
              onClick={loadSample}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Load Example
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. HR Analytics"
                  className="w-full text-sm p-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
                Quiz Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Week 1 Assignment 1"
                className="w-full text-sm p-2 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">
              {tab === "json" ? "Quiz JSON Content" : "Questions & Options Text"}
            </label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => { setContent(e.target.value); setParsedPreview(null); }}
              placeholder={
                tab === "json"
                  ? '{\n  "title": "My Quiz",\n  "questions": [\n    {\n      "question": "1. What is 2+2?",\n      "options": ["3", "4", "5"],\n      "correctAnswer": "4",\n      "explanation": "2+2 equals 4"\n    }\n  ]\n}'
                  : "1. What is the output of print(2**3)?\nA. 6\nB. 8\nC. 9\nAnswer: B\nExplanation: 2 cubed is 8"
              }
              className="w-full text-xs font-mono p-3 border border-gray-300 dark:border-slate-700 rounded focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-200"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {parsedPreview && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">
                  Valid Quiz! Detected {parsedPreview.questions.length} questions.
                </span>
              </div>
              <span className="text-gray-500 dark:text-slate-400 italic">Ready to save locally</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex justify-between items-center shrink-0">
          <button
            type="button"
            onClick={handleTestParse}
            className="px-4 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-800 transition"
          >
            Verify Format
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded text-xs font-semibold hover:bg-gray-200 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-[#2980b9] hover:bg-[#206796] text-white rounded text-xs font-bold transition shadow-sm"
            >
              Save Quiz Permanently
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
