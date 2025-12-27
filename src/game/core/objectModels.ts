import type { Vec2 } from '../core/types.js'

export class CreateObject {
  center: Vec2      // 中心位置
  position: Vec2
  size: Vec2          // 幅・高さ
  image?: HTMLImageElement | undefined
  visible = true

  constructor(
    position:Vec2,
    size: Vec2,
    image?: HTMLImageElement
  ) {
    this.position = position
    this.size = size
    this.center = { x: size.x / 2, y: size.y / 2 }
    this.image = image
  }

  update(_dt: number | null) {}

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible || !this.image) return

    ctx.drawImage(
      this.image,
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    )
  }
}
