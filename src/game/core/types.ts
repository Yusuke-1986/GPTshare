// src/game/core/types.ts
export type BattleState = 'command' | 'escape' | 'animating' | 'end'

export type BattleCommand =
  | 'Attack'
  | 'Magic'
  | 'Special'
  | 'Item'
  | 'Escape'

export type DamageResult = {
  damage: number
  isMax: boolean
}

export type WaitTime = {
    duration: number
}

export type BattleEvent =
  | { type: 'PlayerAttack'; result: DamageResult }
  | { type: 'wait' ; result: WaitTime }
  | { type: 'EnemyAttack'; result: DamageResult }
  | { type: 'BattleEnd'; winner: 'player' | 'enemy' }
  | { type: 'Escape'; result: ""}

export type Vec2 = { x: number; y: number }

