export type RenderCharacter = {
  x: number
  y: number
  width: number
  height: number
  offsetX: number
  offsetY: number
  alpha?: number
}

export type RenderScene = {
  player: RenderCharacter
  enemy: RenderCharacter
}
