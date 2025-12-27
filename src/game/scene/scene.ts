// src/game/scene/scene.ts
export type BaseScene = {
  player: {
    x: number
    y: number
    width: number
    height: number
  }
  enemy: {
    x: number
    y: number
    width: number
    height: number
  }
}

export function createScene(
  w: number,
  h: number
): BaseScene {
  return {
    player: {
      x: w * 0.75,
      y: h * 0.55,
      width: 200,
      height: 280
    },
    enemy: {
      x: w * 0.3,
      y: h * 0.45,
      width: 500,
      height: 500
    }
  }
}
