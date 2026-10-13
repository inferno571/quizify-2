"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { LandingScreen, QuizMode } from '../../components/LandingScreen';

export default function HomePage() {
  const router = useRouter();

  const handleSelectMode = (mode: QuizMode) => {
    router.push(`/dashboard?mode=${mode}`);
  };

  return <LandingScreen onSelectMode={handleSelectMode} />;
}
