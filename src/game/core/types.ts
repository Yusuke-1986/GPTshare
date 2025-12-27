// src/game/core/types.ts
export type BattleState = 'command' | 'animating' | 'end'

export type BattleCommand =
  | 'Attack'
  | 'Magic'
  | 'Special'
  | 'Item'

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

export type Vec2 = { x: number; y: number }
