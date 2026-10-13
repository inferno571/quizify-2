"use client";
import React, { useState, useEffect } from "react";
import {
  UserCircle,
  LogOut,
  Crown,
  CheckCircle,
  Sparkles,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import { PlayerNameModal } from "./PlayerNameModal";

const SAKSHAM_NAME = "Saksham Sooden";

function isSaksham(name: string): boolean {
  return name.trim().toLowerCase() === SAKSHAM_NAME.toLowerCase();
}

export function PlayerBadge() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateName = () => {
      const saved = typeof window !== "undefined" ? localStorage.getItem("quizify_player_name") : null;
      setPlayerName(saved);
    };

    updateName();

    const handleStorage = () => updateName();
    const handleCustomChange = (e: any) => {
      setPlayerName(e.detail || null);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("quizify_player_change", handleCustomChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("quizify_player_change", handleCustomChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("quizify_player_name");
    setPlayerName(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("quizify_player_change", { detail: null }));
  };

  const handleConfirmName = (name: string) => {
    setPlayerName(name);
    setShowModal(false);
    setShowDropdown(false);
  };

  if (!playerName) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer border border-gray-300 shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5 text-blue-600" />
          <span>Set Name / Login</span>
        </button>

        <PlayerNameModal
          isOpen={showModal}
          onConfirm={handleConfirmName}
          onCancel={() => setShowModal(false)}
        />
      </>
    );
  }

  const isSpecial = isSaksham(playerName);

  return (
    <>
      <div className="relative flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs transition cursor-pointer ${
            isSpecial
              ? "bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 border-2 border-yellow-400 text-amber-900 hover:shadow-md"
              : "bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100"
          }`}
          title="Click to switch player or logout"
        >
          {isSpecial ? (
            <Crown className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <UserCircle className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span className="max-w-[120px] truncate">{playerName}</span>
          {isSpecial && <CheckCircle className="w-3 h-3 text-amber-600" />}
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>

        {/* Quick 1-click logout button */}
        <button
          type="button"
          onClick={handleLogout}
          title="Log out / switch player"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition cursor-pointer border border-gray-200 text-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-64 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 mb-3">
                {isSpecial ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {playerName[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-black text-sm truncate ${
                      isSpecial
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500"
                        : "text-gray-800"
                    }`}
                  >
                    {playerName}
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 flex-wrap mt-0.5">
                    {isSpecial ? (
                      <>
                        <span className="inline-flex items-center gap-0.5 bg-yellow-100 text-yellow-800 px-1 py-0.2 rounded font-black text-[9px]">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified
                        </span>
                        <span className="inline-flex items-center gap-0.5 bg-purple-100 text-purple-800 px-1 py-0.2 rounded font-black text-[9px]">
                          <Sparkles className="w-2.5 h-2.5" /> Pro
                        </span>
                        <span className="bg-red-100 text-red-700 px-1 py-0.2 rounded font-black text-[9px]">
                          LVL 9000
                        </span>
                      </>
                    ) : (
                      "Active Player"
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdown(false);
                    setShowModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Switch Player Name
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <PlayerNameModal
        isOpen={showModal}
        onConfirm={handleConfirmName}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
