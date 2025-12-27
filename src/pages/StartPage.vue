<template>
  <div class="start-root">
    <!-- 背景動画 -->
    <video
      class="bg-video"
      src="/videos/start-bg.mp4"
      autoplay
      muted
      loop
      playsinline
    />

    <!-- 上に載せるUI -->
    <div class="overlay">
      <h1 class="title">GAME TITLE</h1>
      <button @click="startGame">START</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame() {
  void router.push('/game')
}
</script>

<style scoped>
.start-root {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 背景動画 */
.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* UIレイヤー */
.overlay {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-shadow: 0 4px 20px rgba(0,0,0,0.6);
}

.title {
  font-size: 48px;
  margin-bottom: 32px;
}

button {
  padding: 14px 40px;
  font-size: 18px;
}
</style>
