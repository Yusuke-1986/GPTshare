import type { RouteRecordRaw } from 'vue-router'

import StartPage from 'pages/StartPage.vue'
import GameMain from 'pages/GameMain.vue'
import GameOver from 'pages/GameOver.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'start', component: StartPage },
  { path: '/game', name: 'game', component: GameMain },
  { path: '/gameover', name: 'gameover', component: GameOver }
]

export default routes
