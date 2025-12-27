<template>
  <div class="screen over">
    <h1>GAME OVER</h1>
    <button @click="retry">RETRY</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function retry() {
  void router.push('/')
}
</script>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  background: black;
  color: crimson;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  margin-top: 24px;
  padding: 12px 32px;
  font-size: 18px;
}
</style>
