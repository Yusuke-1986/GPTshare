<template>
  <canvas ref="canvas" class="game-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BattleScene } from '../game/scene/battleScene'
import { player, enemy } from '../game/character/character'
import { cmdwindow } from 'src/game/UIComponents/cmdwindow'
import { LOGICAL_WIDTH, LOGICAL_HEIGHT } from 'src/game/core/constants'

const canvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D
let scene: BattleScene

const bgVideo = document.createElement('video')
bgVideo.src = '/videos/battle-bg.mp4'
bgVideo.loop = true
bgVideo.muted = true   // 自動再生のため必須
bgVideo.playsInline = true
bgVideo.autoplay = true

bgVideo.play()

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
  requestAnimationFrame(render)
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  ctx = canvas.value!.getContext('2d')!

  // Scene生成（計算は別で回っている想定）
  scene = new BattleScene([player, enemy], cmdwindow, bgVideo)

  resize()
  window.addEventListener('resize', resize)

  render()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  window.removeEventListener('keydown', onKeyDown)
})

function onKeyDown(e: KeyboardEvent) {
  scene.handleInput(e.key)
}

</script>

<style scoped>
.game-canvas {
  position: fixed;
  inset: 0;
  background: black;
}
</style>
