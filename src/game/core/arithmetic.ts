// src/game/core/arithmetic.ts
export function rand05to10(): number {
  return (Math.floor(Math.random() * 6) + 5) / 10
}

export function clampMin(value: number, min: number): number {
  return Math.max(min, value)
}
