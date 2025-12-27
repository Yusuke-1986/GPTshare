import { CreateObject } from "../core/objectModels"

export class EscapeConfirmWindow extends CreateObject {
  selectedIndex = 0
  options = ['Yes', 'No']

  onConfirm?: (yes: boolean) => void

  handleInput(key: string) {
    if (!this.visible) return

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      this.selectedIndex = 0
    }
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      this.selectedIndex = 1
    }

    if (key === 'Enter') {
      this.onConfirm?.(this.selectedIndex === 0)
    }

    if (key === 'Escape') {
      this.onConfirm?.(false)
    }
  }

  override draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible) return

    ctx.fillStyle = 'rgba(0,0,0,0.8)'
    ctx.fillRect(
      this.position.x - this.size.x / 2,
      this.position.y - this.size.y / 2,
      this.size.x,
      this.size.y
    )

    ctx.fillStyle = 'white'
    ctx.font = '14px sans-serif'

    this.options.forEach((opt, i) => {
      const prefix = i === this.selectedIndex ? '▶ ' : '  '
      ctx.fillText(
        prefix + opt,
        this.position.x - 30 + i * 60,
        this.position.y + 10
      )
    })
  }
}
