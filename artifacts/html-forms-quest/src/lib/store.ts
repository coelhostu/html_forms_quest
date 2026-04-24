import { useState, useEffect } from 'react';

type GameState = {
  unlockedLevels: number[];
  stars: Record<number, number>;
  scores: Record<number, number>;
  totalScore: number;
  soundEnabled: boolean;
};

const DEFAULT_STATE: GameState = {
  unlockedLevels: [1],
  stars: {},
  scores: {},
  totalScore: 0,
  soundEnabled: true,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const stored = localStorage.getItem('html-forms-quest-progress');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('html-forms-quest-progress', JSON.stringify(state));
  }, [state]);

  const completeLevel = (levelId: number, stars: number, score: number) => {
    setState(prev => {
      const newStars = { ...prev.stars, [levelId]: Math.max(prev.stars[levelId] || 0, stars) };
      const newScores = { ...prev.scores, [levelId]: Math.max(prev.scores[levelId] || 0, score) };
      
      const nextLevel = levelId + 1;
      const newUnlocked = prev.unlockedLevels.includes(nextLevel) 
        ? prev.unlockedLevels 
        : [...prev.unlockedLevels, nextLevel];

      const totalScore = Object.values(newScores).reduce((a, b) => a + b, 0);

      return {
        ...prev,
        stars: newStars,
        scores: newScores,
        unlockedLevels: newUnlocked,
        totalScore,
      };
    });
  };

  const toggleSound = () => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const resetProgress = () => {
    setState({ ...DEFAULT_STATE, soundEnabled: state.soundEnabled });
  };

  return { state, completeLevel, toggleSound, resetProgress };
}
