import { AdventureSession, ParentSetup, StoryLevel, LearningPlan } from '../types/quest';

const SESSION_STORAGE_KEY = 'kiki_active_session';

export function saveActiveSession(session: AdventureSession): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn('Failed to save session to storage:', err);
  }
}

export function loadActiveSession(): AdventureSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdventureSession;
  } catch (err) {
    console.warn('Failed to parse active session:', err);
    return null;
  }
}

export function createInitialSession(setup: ParentSetup, levels: StoryLevel[], plan?: LearningPlan): AdventureSession {
  return {
    id: `kiki-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    setup,
    learningPlan: plan,
    currentLevelIndex: 0,
    levels,
    currentChapterIndex: 0,
    chapters: levels,
    starsEarned: 0,
    interactions: [],
    status: 'welcome' // starts with KIKI welcome screen
  };
}

export function clearActiveSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear session:', err);
  }
}

