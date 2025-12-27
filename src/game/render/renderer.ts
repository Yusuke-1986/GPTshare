// src/game/render/renderer.ts

import type { RenderScene } from './renderModels'

type RenderAssets = {
  bg: HTMLImageElement
  player: HTMLImageElement
  enemy: HTMLImageElement
}

export class Renderer {
  private ctx: CanvasRenderingContext2D
  private assets: RenderAssets

  constructor(
    ctx: CanvasRenderingContext2D,
    assets: RenderAssets
  ) {
    this.ctx = ctx
    this.assets = assets
  }

  render(scene: RenderScene): void {
    const { ctx } = this

    // 背景
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(
      this.assets.bg,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    )

    // 敵
    this.drawCharacter(this.assets.enemy, scene.enemy)

    // プレイヤー
    this.drawCharacter(this.assets.player, scene.player)
  }

  private drawCharacter(
    img: HTMLImageElement,
    c: RenderScene['player']
  ): void {
    const { ctx } = this

    ctx.save()
    ctx.globalAlpha = c.alpha ?? 1

    ctx.drawImage(
      img,
      c.x - c.width / 2 + c.offsetX,
      c.y - c.height / 2 + c.offsetY,
      c.width,
      c.height
    )

    ctx.restore()
  }
}
