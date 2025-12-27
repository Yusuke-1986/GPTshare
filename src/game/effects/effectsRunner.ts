// src/game/effects/effectsRunner.ts
import type { BattleEvent } from '../core/types'

export async function runEffects(
  events: BattleEvent[],
  ctx: EffectsContext
): Promise<void> {
  for (const e of events) {
    if (e.type === 'PlayerAttack') {
      if (e.result.isMax) ctx.flashWhite()
      await ctx.playerAttack(e.result.damage)
    }

    if (e.type === 'wait') {
      await new Promise(resolve => setTimeout(resolve, e.result.duration))
    }

    if (e.type === 'EnemyAttack') {
      if (e.result.isMax) ctx.flashWhite()
      await ctx.enemyAttack(e.result.damage)
    }
  }
}

export type EffectsContext = {
  flashWhite(): void
  playerAttack(damage: number): Promise<void>
  enemyAttack(damage: number): Promise<void>
}

