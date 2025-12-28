<template>
  <canvas ref="canvas" class="game-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BattleScene } from '../game/scene/battleScene'
import { player, enemy } from '../game/character/character'
import { cmdwindow } from 'src/game/UIComponents/cmdwindow'
import { LOGICAL_WIDTH, LOGICAL_HEIGHT } from 'src/game/core/constants'
import { KeyActionMap } from 'src/game/core/keymap'
import { useRouter} from 'vue-router' 

const canvas = ref<HTMLCanvasElement | null>(null)
const router = useRouter()

let ctx: CanvasRenderingContext2D
let scene: BattleScene
let rafId = 0

const bgVideo = document.createElement('video')
bgVideo.src = '/videos/battle-bg.mp4'
bgVideo.loop = true
bgVideo.muted = true   // 自動再生のため必須
bgVideo.playsInline = true
bgVideo.autoplay = true



/* ===== resize処理 ===== */
function resize() {
  const c = canvas.value!
  const dpr = window.devicePixelRatio || 1

  const screenW = window.innerWidth
  const screenH = window.innerHeight

  // CSSサイズ（見た目）
  c.style.width = `${screenW}px`
  c.style.height = `${screenH}px`

  // 実ピクセル
  c.width = screenW * dpr
  c.height = screenH * dpr

  ctx.setTransform(1, 0, 0, 1, 0, 0)

  // DPR補正
  ctx.scale(dpr, dpr)

  // 論理スケール
  const scale = Math.min(
    screenW / LOGICAL_WIDTH,
    screenH / LOGICAL_HEIGHT
  )

  ctx.scale(scale, scale)
  
  // ★ 原点を画面中央に
  ctx.translate(
    LOGICAL_WIDTH / 2,
    LOGICAL_HEIGHT / 2
  )
}

/* ===== 描画ループ（描画のみ） ===== */
function render() {
  ctx.clearRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT)
  scene.draw(ctx)
  rafId = requestAnimationFrame(render)
}

onMounted(async () => {
  window.addEventListener('keydown', onKeyDown)
  ctx = canvas.value!.getContext('2d')!
  try {
    await bgVideo.play()
  } catch {
    //
  }
  

  // Scene生成（計算は別で回っている想定）
  scene = new BattleScene(
    [player, enemy], 
    cmdwindow, 
    bgVideo, 
    {
      onEscapeConfirmed: () => {
        void router.push('/')
      }
    }
  )

  resize()
  window.addEventListener('resize', resize)

  render()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})

function onKeyDown(e: KeyboardEvent) {
  if (e.repeat) return
  const action = KeyActionMap[e.key]
  // console.log(action, e.key)
  if (!action) return
  
  scene.handleInput(action)
}

</script>

<style scoped>
.game-canvas {
  position: fixed;
  inset: 0;
  background: black;
}
</style>
