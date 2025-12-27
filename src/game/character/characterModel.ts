import { CreateObject } from '../core/objectModels'
import type { Vec2 } from '../core/types.js'

type CharacterState = 'idle' | 'attack' | 'damage' | 'dead'
type Direction = 'left' | 'right'

export class createCharacter extends CreateObject {
  name: string

  hp: number
  maxHp: number

  state: CharacterState = 'idle'
  direction: Direction = 'right'

  private stateTime = 0

  constructor(
    name: string,
    position: Vec2,
    size: Vec2,
    image: HTMLImageElement,
    maxHp: number
  ) {
    super(position, size, image)
    this.name = name
    this.hp = maxHp
    this.maxHp = maxHp
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

  /* ===== update ===== */

  override update(dt: number) {
    if (!this.visible) return

    this.stateTime += dt

    switch (this.state) {
      case 'idle':
        this.updateIdle(dt)
        break
      case 'attack':
        this.updateAttack(dt)
        break
      case 'damage':
        this.updateDamage(dt)
        break
      case 'dead':
        this.updateDead(dt)
        break
    }
  }

  /* ===== state updates ===== */

  private updateIdle(_dt: number) {
    // 何もしない（待機）
  }

  private updateAttack(_dt: number) {
    if (this.stateTime > 0.3) {
      this.changeState('idle')
    }
  }

  private updateDamage(_dt: number) {
    const shake = Math.sin(this.stateTime * 60) * 4
    this.center.x += shake

    if (this.stateTime > 0.2) {
      this.center.x -= shake
      this.changeState('idle')
    }
  }

  private updateDead(_dt: number) {
    this.visible = false
  }

  /* ===== actions ===== */

  attack() {
    if (this.state === 'dead') return
    this.changeState('attack')
  }

  takeDamage(amount: number) {
    if (this.state === 'dead') return

    this.hp -= amount

    if (this.hp <= 0) {
      this.hp = 0
      this.changeState('dead')
    } else {
      this.changeState('damage')
    }
  }

  /* ===== utils ===== */

  private changeState(state: CharacterState) {
    this.state = state
    this.stateTime = 0
  }

  isAlive(): boolean {
    return this.state !== 'dead'
  }
}