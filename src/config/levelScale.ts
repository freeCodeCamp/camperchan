/**
 * This config is an automatically-generated scale for mapping experience
 * point values to level values.
 */
const levelScale: Array<number> = [];

let points = 0;

for (let level = 0; level <= 1000; level = level + 1) {
  const pointsForLevel = level * 100;
  points = points + pointsForLevel;
  levelScale[level] = points;
}

export { levelScale };
