'use client';

import { useTheme } from './ThemeProvider';
import { LarpSuccessfulButton } from './LarpGuideModal';
import { ItsOverButton } from './ItsOverButton';
import { useState } from 'react';
import { Sunrise } from 'lucide-react';

function ItBeganButton() {
  const encouragement = ['IT BEGAN', 'One step closer. Keep going!', 'Mistakes are how we grow.', 'Your comeback starts here.', 'You’ve got this.'];
  const [step, setStep] = useState(0);
  return <button type="button" onClick={() => setStep(value => (value + 1) % encouragement.length)}
    title="A little encouragement" className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
    <Sunrise size={15} aria-hidden="true" /><span aria-live="polite">{encouragement[step]}</span>
  </button>;
}

export function QuizReactionButton() {
  const { theme } = useTheme();
  if (theme === 'itbegan') return <ItBeganButton />;
  return theme === 'itsover' ? <ItsOverButton /> : <LarpSuccessfulButton />;
}
