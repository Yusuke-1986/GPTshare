import type { createCharacter } from "../character/characterModel";
import type { CommandWindow } from "../core/command";
import { LOGICAL_WIDTH, LOGICAL_HEIGHT } from "../core/constants";
import type { BattleState } from "../core/types";
import { EscapeConfirmWindow } from "../UIComponents/confirmwindow";

export class BattleScene {
  private characters: createCharacter[] = []
  private window: CommandWindow
  private bgVideo: HTMLVideoElement
  private camera = new Camera()
  private mode: BattleState = "command"
  private onEscapeConfirmed?: (() => void) | undefined
  EscapeConfirmWindow: EscapeConfirmWindow

  constructor(
    characters: createCharacter[], 
    window: CommandWindow, 
    bgVideo: HTMLVideoElement, 
    callbacks?:{ onEscapeConfirmed?: () => void }
  ) {
    this.characters = characters
    this.window = window
    this.bgVideo = bgVideo

    this.onEscapeConfirmed = callbacks?.onEscapeConfirmed

    this.EscapeConfirmWindow = new EscapeConfirmWindow(
      {x:0 , y: 0},
      {x: 100, y: 100},
      undefined
    )
    this.EscapeConfirmWindow.visible = false

    this.EscapeConfirmWindow.onConfirm = (yes) => {
      if (yes) {
        this.onEscapeConfirmed?.()
      } else {
        this.closeEscapeConfirm()
      }
    }
  }

  update(dt: number) {
    for (const c of this.characters) {
      c.update(dt)
    }
  }

  handleInput(action: string) {
    console.log(action, this.mode)
    if (action === "escape"){
      this.showEscapeConfirm()
      // this.EscapeConfirmWindow.handleInput(action)
      return
    }

    if (action === "confirm" && this.EscapeConfirmWindow.selectedIndex=== 0){
      this.onEscapeConfirmed?.()
    }
    if (action === "confirm" && this.EscapeConfirmWindow.selectedIndex=== 1){
      this.closeEscapeConfirm()
    }

    if (this.EscapeConfirmWindow.visible == true) {
      this.EscapeConfirmWindow.handleInput(action)
      return
    }

    this.window.handleInput(action)
  }

  showEscapeConfirm() {
    this.mode = 'escape'
    this.EscapeConfirmWindow.visible = true
    this.EscapeConfirmWindow.selectedIndex = 0
  }

  closeEscapeConfirm() {
    this.mode = 'command'
    this.EscapeConfirmWindow.visible = false
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
    this.EscapeConfirmWindow.draw(ctx)
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
