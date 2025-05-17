const DIFFICULTY_LEVELS = {
  easy: { pairs: 6, timeout: 1000 },
  medium: { pairs: 8, timeout: 800 },
  hard: { pairs: 12, timeout: 600 },
};

console.log(Object.values(DIFFICULTY_LEVELS));
