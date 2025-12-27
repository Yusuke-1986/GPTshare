// src/game/scene/sceneUtils.ts
import type { RenderCharacter } from '../render/renderModels'

export type UISpacePoint = {
  x: number
  y: number
}

/**
 * キャラクター基準点からUI座標を計算
 * @param c キャラクター（RenderCharacter）
 * @param offsetX キャラ中心からのUIオフセット
 * @param offsetY キャラ中心からのUIオフセット
 */
export function characterToUI(
  c: RenderCharacter,
  offsetX = 0,
  offsetY = 0
): UISpacePoint {
  return {
    x: c.x + offsetX + c.offsetX,
    y: c.y + offsetY + c.offsetY
  }
}
