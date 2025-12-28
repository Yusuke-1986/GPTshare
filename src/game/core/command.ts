import { CreateObject } from '../core/objectModels'
import type { Vec2 } from '../core/types'
import type { BattleCommand } from '../core/types'

export class Commands extends CreateObject {
  constructor(
    position: Vec2,
    size: Vec2,
    image?: HTMLImageElement,
  ) {
    super(position, size, image)
    // this.position.x = 500
    // this.position.y = 150
  }

  override draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible || !this.image) return

    ctx.drawImage(
    this.image,
    this.position.x,
    this.position.y,
    this.size.x,
    this.size.y
    )
  }
}

export class CommandWindow extends CreateObject {
  commands: Commands[]
  selectedIndex = 0
  onRequestEscape?: () => void

  constructor(
    position: Vec2,
    size: Vec2,
    commands: Commands[],
    image?: HTMLImageElement
  ) {
    super(position, size, image)
    this.commands = commands

    // this.position.x = 550
    // this.position.y = 250
}

  handleInput(action: string) {
    if (!this.visible) return

    switch (action) {
      case 'Escape':
        this.onEscape()
        break
        
      case 'Attack':
        console.log(action)
        this.selectedIndex++
        break
    }
  }

  onSelect() {
    const command = this.commands[this.selectedIndex]
    console.log('SELECT:', command)
    // → BattleScene に通知してもOK
  }

  onEscape(){
    this.onRequestEscape?.()
  }

  override draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible || !this.image) return

    ctx.drawImage(
    this.image,
    this.position.x,
    this.position.y,
    this.size.x,
    this.size.y
    )

    for (const cmd of this.commands) {
        cmd.draw(ctx);
    }
  }
}