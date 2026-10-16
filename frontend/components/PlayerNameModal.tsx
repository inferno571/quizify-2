"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UserCircle,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Crown,
  Sparkles,
  Star,
  Check,
  Zap,
} from "lucide-react";

interface PlayerNameModalProps {
  isOpen: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export const SAKSHAM_NAME = "Saksham Sooden";

export function isSaksham(name: string): boolean {
  return name.trim().toLowerCase() === SAKSHAM_NAME.toLowerCase();
}

export function PlayerNameModal({
  isOpen,
  onConfirm,
  onCancel,
}: PlayerNameModalProps) {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameStatus, setNameStatus] = useState<"available" | "existing" | null>(null);
  const [registering, setRegistering] = useState(false);

  // Load saved name on mount
  useEffect(() => {
    if (isOpen) {
      const saved = typeof window !== "undefined" ? localStorage.getItem("quizify_player_name") : null;
      if (saved) {
        setName(saved);
        setNameStatus("existing");
      }
    }
  }, [isOpen]);

  // Debounced check to show helpful hint
  useEffect(() => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setNameStatus(null);
      setError(null);
      return;
    }

    if (isSaksham(trimmed)) {
      setNameStatus("existing");
      setChecking(false);
      setError(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setChecking(true);
      setError(null);
      try {
        const savedName = localStorage.getItem("quizify_player_name");
        if (savedName && savedName.toLowerCase() === trimmed.toLowerCase()) {
          setNameStatus("existing");
          setChecking(false);
          return;
        }

        const res = await fetch(
          `/api/leaderboard?action=check-name&name=${encodeURIComponent(trimmed)}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.available) {
            setNameStatus("available");
          } else {
            setNameStatus("existing");
          }
        } else {
          setNameStatus("available");
        }
      } catch {
        setNameStatus("available");
      } finally {
        setChecking(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [name]);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setError("Please enter a name with at least 2 characters.");
      return;
    }

    setRegistering(true);
    setError(null);

    try {
      // 1. If it's Saksham Sooden (creator / ultra admin)
      if (isSaksham(trimmed)) {
        try {
          await fetch("/api/leaderboard", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({ action: "register", name: SAKSHAM_NAME }),
          });
        } catch {
          // Ignore registration error
        }
        localStorage.setItem("quizify_player_name", SAKSHAM_NAME);
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("quizify_player_change", { detail: SAKSHAM_NAME }));
        onConfirm(SAKSHAM_NAME);
        return;
      }

      // 2. Check if already the active user on this browser
      const savedName = localStorage.getItem("quizify_player_name");
      if (savedName && savedName.toLowerCase() === trimmed.toLowerCase()) {
        onConfirm(trimmed);
        return;
      }

      // 3. Register or verify with DB
      try {
        const checkRes = await fetch(
          `/api/leaderboard?action=check-name&name=${encodeURIComponent(trimmed)}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (checkRes.ok) {
          const checkData = await checkRes.json();
          // If name is taken in DB and not previously saved on this device
          if (checkData.taken) {
            // Check if user is returning or taken
            // If they want to continue as this existing user, allow it
            setNameStatus("existing");
          } else {
            // Register new unique player
            await fetch("/api/leaderboard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
              },
              body: JSON.stringify({ action: "register", name: trimmed }),
            });
          }
        }
      } catch (err) {
        console.warn("Leaderboard check skipped:", err);
      }

      // Successfully proceed!
      localStorage.setItem("quizify_player_name", trimmed);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("quizify_player_change", { detail: trimmed }));
      onConfirm(trimmed);
    } catch (err: any) {
      // Offline fallback: allow playing
      localStorage.setItem("quizify_player_name", trimmed);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("quizify_player_change", { detail: trimmed }));
      onConfirm(trimmed);
    } finally {
      setRegistering(false);
    }
  };

  const isSpecial = isSaksham(name);
  const canSubmit = name.trim().length >= 2 && !registering;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
            isSpecial
              ? "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-400 dark:from-amber-950/80 dark:via-yellow-950/60 dark:to-orange-950/80 dark:border-yellow-500/80"
              : "bg-white border border-gray-200 dark:bg-slate-900 dark:border-slate-800"
          }`}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Golden shimmer effect for Saksham */}
          {isSpecial && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-2xl animate-pulse" />
              <div
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-amber-300/30 to-transparent rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          )}

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="text-center mb-6">
              {isSpecial ? (
                <>
                  <div className="relative inline-block mb-3">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-yellow-300/50">
                      <Crown className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 dark:from-yellow-400 dark:via-amber-300 dark:to-orange-400 mb-1">
                    👑 Ultra Admin Detected 👑
                  </h2>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mt-2">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-current" /> Level 9000
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Quizify 3 Pro
                    </span>

                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 font-semibold">
                    Welcome back, Supreme Commander Saksham ✨
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <UserCircle className="w-10 h-10 text-gray-400 dark:text-slate-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    Enter Your Name
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Choose your player name to compete on the live leaderboard
                  </p>
                </>
              )}
            </div>

            {/* Name Input */}
            <div className="mb-5">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canSubmit) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Your display name..."
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all outline-none ${
                    isSpecial
                      ? "bg-yellow-100/60 dark:bg-amber-950/60 border-2 border-yellow-400 dark:border-yellow-500/80 text-amber-900 dark:text-amber-200 placeholder-amber-400 dark:placeholder-amber-600 focus:ring-2 focus:ring-yellow-400/50 shadow-inner"
                      : error
                      ? "bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 placeholder-red-300 dark:placeholder-red-600 focus:ring-2 focus:ring-red-400/50"
                      : "bg-gray-50 dark:bg-slate-950 border-2 border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20"
                  }`}
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {checking && (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                  )}
                  {!checking && name.trim().length >= 2 && (
                    <CheckCircle
                      className={`w-5 h-5 ${
                        isSpecial ? "text-yellow-500" : "text-emerald-500"
                      }`}
                    />
                  )}
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
                </p>
              )}

              {isSpecial && !error && (
                <p className="text-xs font-semibold text-amber-700 mt-2 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" /> All Ultra Admin privileges activated. Press Enter to proceed!
                </p>
              )}

              {!isSpecial && !checking && nameStatus === "available" && name.trim().length >= 2 && !error && (
                <p className="text-xs font-medium mt-2 flex items-center gap-1 text-emerald-600">
                  <Check className="w-3.5 h-3.5 shrink-0" /> Name available! You will be registered on the leaderboard.
                </p>
              )}

              {!isSpecial && !checking && nameStatus === "existing" && name.trim().length >= 2 && !error && (
                <p className="text-xs font-medium mt-2 flex items-center gap-1 text-blue-600">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Welcome back! Continuing as this player.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSpecial
                    ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:brightness-105"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:brightness-105"
                }`}
              >
                {registering ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : isSpecial ? (
                  <>
                    <Crown className="w-4 h-4" />
                    <span>Ascend to Greatness</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{nameStatus === "existing" ? "Continue" : "Start Quiz"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
