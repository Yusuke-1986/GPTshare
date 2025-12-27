import type { createCharacter } from "../character/characterModel";
import { CommandWindow } from "../core/command";
import { LOGICAL_WIDTH, LOGICAL_HEIGHT } from "../core/constants";

export class BattleScene {
  private characters: createCharacter[] = []
  private window: CommandWindow
  private bgVideo: HTMLVideoElement
  private camera = new Camera()

  constructor(characters: createCharacter[], window: CommandWindow, bgVideo: HTMLVideoElement) {
    this.characters = characters
    this.window = window
    this.bgVideo = bgVideo
  }

  update(dt: number) {
    for (const c of this.characters) {
      c.update(dt)
    }
  }

  handleInput(key: string) {
    this.window.handleInput(key)
  }

  draw(ctx: CanvasRenderingContext2D) {
    // --- 背景（カメラ外） ---
    ctx.drawImage(
      this.bgVideo,
      -LOGICAL_WIDTH / 2,
      -LOGICAL_HEIGHT / 2,
      LOGICAL_WIDTH,
      LOGICAL_HEIGHT
    )

    ctx.save()

    this.camera.apply(ctx)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(-5, -5, 10, 10) // ワールド原点

    for (const c of this.characters) {
      c.draw(ctx)
    }

    ctx.restore()

    this.window.draw(ctx)
  }
}

export class GameTicker {
  private lastTime = performance.now()
  private scene: BattleScene

  constructor(scene: BattleScene) {
    this.scene = scene
  }

  start() {
    const tick = (now: number) => {
      const dt = (now - this.lastTime) / 1000
      this.lastTime = now

      this.scene.update(dt)

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }
}

export class Camera {
  x = 0
  y = 0

  apply(ctx: CanvasRenderingContext2D) {
    ctx.translate(
      -this.x,  // LOGICAL_WIDTH / 2
      -this.y   // LOGICAL_HEIGHT / 2
    )
  }
}
