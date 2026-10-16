'use client';

import { useTheme } from './ThemeProvider';
import { LarpSuccessfulButton } from './LarpGuideModal';
import { ItsOverButton } from './ItsOverButton';

export function QuizReactionButton() {
  const { theme } = useTheme();
  return theme === 'itsover' ? <ItsOverButton /> : <LarpSuccessfulButton />;
}
