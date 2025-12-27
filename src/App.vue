<template>
  <router-view v-slot="{ Component }">
    <transition
      mode="out-in"
      @enter="onEnter"
      @leave="onLeave"
    >
      <component :is="Component" class="page" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import gsap from 'gsap'

function onEnter(el: Element, done: () => void) {
  gsap.fromTo(
    el,
    {
      rotationX: 20,
      rotationY: -70,
      xPercent: -10,
      yPercent: 10,
      transformOrigin: 'right bottom',
      opacity: 0
    },
    {
      rotationX: 0,
      rotationY: 0,
      xPercent: 0,
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      onComplete: done
    }
  )
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    rotationX: -10,
    rotationY: 70,
    xPercent: 20,
    yPercent: -20,
    transformOrigin: 'right bottom',
    opacity: 0,
    duration: 0.9,
    ease: 'expo.in',
    onComplete: done
  })
}
</script>

<style>
.page {
  width: 100vw;
  height: 100vh;
  backface-visibility: hidden;
}

#q-app {
  perspective: 1600px;
  background: black;
}
</style>
