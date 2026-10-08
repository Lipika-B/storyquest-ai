import { QuestSession, ParentSetup, StoryChapter } from '../types/quest';

const SESSION_STORAGE_KEY = 'storyquest_active_session';

export function saveActiveSession(session: QuestSession): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn('Failed to save session to storage:', err);
  }
}

export function loadActiveSession(): QuestSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuestSession;
  } catch (err) {
    console.warn('Failed to parse active session:', err);
    return null;
  }
}

export function createInitialSession(setup: ParentSetup, chapters: StoryChapter[]): QuestSession {
  return {
    id: `quest-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    setup,
    currentChapterIndex: 0,
    chapters,
    starsEarned: 0,
    interactions: [],
    status: 'story'
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
