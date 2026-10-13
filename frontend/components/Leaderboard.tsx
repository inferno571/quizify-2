"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  CheckCircle,
  Shield,
  Sparkles,
  Loader2,
  Users,
  TrendingUp,
  Zap,
  Award,
  Flame,
  BadgeCheck,
} from "lucide-react";

interface LeaderboardEntry {
  name: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
}

interface LeaderboardProps {
  quizId: string;
  quizTitle: string;
  currentPlayerName: string | null;
  currentPlayerScore: number;
  totalQuestions: number;
}

const SAKSHAM_NAME = "Saksham Sooden";

function isSaksham(name: string): boolean {
  return name.trim().toLowerCase() === SAKSHAM_NAME.toLowerCase();
}

function getRankBadge(rank: number) {
  if (rank === 1)
    return { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-300", label: "🥇 1st" };
  if (rank === 2)
    return { icon: Medal, color: "text-gray-400", bg: "bg-gray-50", border: "border-gray-300", label: "🥈 2nd" };
  if (rank === 3)
    return { icon: Medal, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-300", label: "🥉 3rd" };
  return { icon: Award, color: "text-gray-500", bg: "bg-white", border: "border-gray-200", label: `#${rank}` };
}

function getScoreColor(pct: number): string {
  if (pct >= 90) return "text-emerald-600";
  if (pct >= 70) return "text-blue-600";
  if (pct >= 50) return "text-amber-600";
  return "text-rose-600";
}

export function Leaderboard({
  quizId,
  quizTitle,
  currentPlayerName,
  currentPlayerScore,
  totalQuestions,
}: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(
          `/api/leaderboard?quizId=${encodeURIComponent(quizId)}`
        );
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries || []);
        } else {
          setError("Failed to load leaderboard");
        }
      } catch {
        setError("Could not connect to leaderboard server");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
        <p className="text-sm font-medium">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-lg font-medium text-gray-700 mb-1">
          No Scores Yet
        </p>
        <p className="text-sm">
          Be the first to submit your score for this quiz!
        </p>
      </div>
    );
  }

  // Current player's rank
  const sortedEntries = [...entries].sort(
    (a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name)
  );
  const currentRank = currentPlayerName
    ? sortedEntries.findIndex(
        (e) => e.name.toLowerCase() === currentPlayerName.toLowerCase()
      ) + 1
    : 0;
  const currentPct = Math.round((currentPlayerScore / totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Current Player Summary Card */}
      {currentPlayerName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-5 shadow-sm border-2 ${
            isSaksham(currentPlayerName)
              ? "bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-yellow-400"
              : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                  isSaksham(currentPlayerName)
                    ? "bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 ring-4 ring-yellow-300/50"
                    : "bg-gradient-to-br from-blue-400 to-indigo-500 ring-2 ring-blue-200"
                }`}
              >
                {isSaksham(currentPlayerName) ? (
                  <Crown className="w-7 h-7 text-white" />
                ) : (
                  <span className="text-white font-black text-lg">
                    {currentPlayerName[0].toUpperCase()}
                  </span>
                )}
                {isSaksham(currentPlayerName) && (
                  <>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center ring-2 ring-white shadow">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white shadow">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-bold text-lg ${
                      isSaksham(currentPlayerName)
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500"
                        : "text-gray-800"
                    }`}
                  >
                    {currentPlayerName}
                  </span>

                  {isSaksham(currentPlayerName) && (
                    <>
                      <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        <BadgeCheck className="w-3 h-3" /> VERIFIED
                      </span>
                      <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3" /> QUIZIFY 2 PRO
                      </span>
                      <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        <Flame className="w-3 h-3" /> LVL 9000
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Rank #{currentRank || "–"} of {sortedEntries.length}
                  </span>
                  {isSaksham(currentPlayerName) && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                      👑 ULTRA ADMIN • SUPREME COMMANDER • CREATOR
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-black ${getScoreColor(currentPct)}`}>
                {currentPct}%
              </div>
              <div className="text-xs text-gray-500 font-semibold">
                {currentPlayerScore}/{totalQuestions}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-gray-800">Leaderboard</h3>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {sortedEntries.length} players
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium">{quizTitle}</span>
        </div>

        <div className="divide-y divide-gray-100">
          {sortedEntries.map((entry, idx) => {
            const rank = idx + 1;
            const badge = getRankBadge(rank);
            const BadgeIcon = badge.icon;
            const isCurrentPlayer =
              currentPlayerName &&
              entry.name.toLowerCase() === currentPlayerName.toLowerCase();
            const isAdmin = isSaksham(entry.name);

            return (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                  isAdmin
                    ? "bg-gradient-to-r from-yellow-50/70 via-amber-50/50 to-orange-50/30 hover:from-yellow-50 hover:via-amber-50 hover:to-orange-50"
                    : isCurrentPlayer
                    ? "bg-blue-50/50 hover:bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Rank */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${badge.bg} ${badge.border}`}
                >
                  {rank <= 3 ? (
                    <BadgeIcon className={`w-5 h-5 ${badge.color}`} />
                  ) : (
                    <span className="text-sm font-bold text-gray-500">
                      {rank}
                    </span>
                  )}
                </div>

                {/* Name & Badges */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-bold text-sm truncate ${
                        isAdmin
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500"
                          : isCurrentPlayer
                          ? "text-blue-700"
                          : "text-gray-800"
                      }`}
                    >
                      {entry.name}
                    </span>

                    {isCurrentPlayer && !isAdmin && (
                      <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                        YOU
                      </span>
                    )}

                    {isAdmin && (
                      <>
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-sm">
                          <BadgeCheck className="w-2.5 h-2.5" /> ✓ VERIFIED
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" /> PRO
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm">
                          <Zap className="w-2.5 h-2.5" /> LVL 9000
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-sm">
                          <Crown className="w-2.5 h-2.5" /> ULTRA ADMIN
                        </span>
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-sm">
                          <Shield className="w-2.5 h-2.5 inline" /> CREATOR
                        </span>
                        {isCurrentPlayer && (
                          <span className="text-[8px] font-bold bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-full">
                            👑 YOU
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                      Supreme Commander • Quizify 2 Creator • All-Time Legend
                      {" "}✨ 🏆 ✅ 🔥
                    </div>
                  )}
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <div
                    className={`text-lg font-black ${getScoreColor(entry.percentage)}`}
                  >
                    {entry.percentage}%
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {entry.score}/{entry.totalQuestions}
                  </div>
                </div>

                {/* Comparison indicator */}
                {isCurrentPlayer && !isAdmin && (
                  <div className="shrink-0">
                    <div className="w-2 h-8 rounded-full bg-blue-500" />
                  </div>
                )}
                {isAdmin && (
                  <div className="shrink-0">
                    <div className="w-2 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Score Comparison with other players */}
      {currentPlayerName && sortedEntries.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
        >
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Score Comparison
          </h3>

          <div className="space-y-3">
            {sortedEntries.map((entry, idx) => {
              const isCurrentPlayer =
                entry.name.toLowerCase() ===
                (currentPlayerName?.toLowerCase() || "");
              const isAdmin = isSaksham(entry.name);

              return (
                <div key={entry.name} className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold w-24 truncate ${
                      isAdmin
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500"
                        : isCurrentPlayer
                        ? "text-blue-700"
                        : "text-gray-600"
                    }`}
                  >
                    {entry.name}
                    {isAdmin && " 👑"}
                  </span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-full ${
                        isAdmin
                          ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500"
                          : isCurrentPlayer
                          ? "bg-gradient-to-r from-blue-400 to-blue-600"
                          : "bg-gradient-to-r from-gray-300 to-gray-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${entry.percentage}%` }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.1,
                        ease: "easeOut",
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700 mix-blend-darken">
                      {entry.percentage}%
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 w-12 text-right">
                    {entry.score}/{entry.totalQuestions}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
