// core/keymap.ts
import type { BattleCommand } from './types'

export const KeyActionMap: Record<string, BattleCommand | undefined> = {
  a: 'Attack',
  A: 'Attack',
  Escape: 'Escape',
}
