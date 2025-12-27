# Quasar App (my-game)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# Quasar Game Project

Quasar（Vue 3 + Vite）をベースにした  
**ブラウザで動作するゲームを作成し、最終的に Electron でパッケージ化する** プロジェクト。

---

## 🎯 方針・コンセプト

- **最初は完全に Web（ブラウザ）として作る**
- ゲームロジックは Vue / Quasar から分離
- Electron は「最後に包むだけ」
- FPS 固定（60fps）で安定した挙動を目指す

---

## 🧱 技術スタック

- Quasar v2
- Vue 3（Composition API + `<script setup>`）
- Vite
- TypeScript
- Canvas API
- requestAnimationFrame（固定 timestep）
- 将来：Electron

---

## 📁 ディレクトリ構成（現時点）

src/
├─ pages/
│ └─ GameMain.vue # ゲームのエントリーポイント
├─ router/
│ ├─ index.ts # 最小構成の router
│ └─ routes.ts # '/' → GameMain
├─ css/
│ └─ app.scss # 空でもOK（Quasar前提）

yaml
コードをコピーする

※ Quasar App では router 完全削除は非推奨のため、  
**1画面のみの最小 router 構成**を採用している。

---

## ▶ 起動方法（ブラウザ）

```bash
quasar dev
🕹 ゲーム構成の考え方
Vue / Quasar
→ Canvas を「置く」だけ

ゲームロジック
→ Canvas + 純 TypeScript

状態更新と描画を明確に分離

⏱ FPS 固定ループ（60fps）
requestAnimationFrame を使用

内部で fixed timestep を実装

更新処理は常に 16.666ms 単位で実行

採用理由
PC 性能差に強い

Electron でも挙動が変わらない

入力・物理・判定を載せやすい

🖼 Canvas 描画
画面いっぱいの <canvas> を使用

リサイズ時に canvas サイズを再計算

描画は毎フレーム、更新は固定FPS

🧭 ルーティング方針
画面遷移は行わない

/ に常にゲーム画面を表示

Layout は使用しない

ts
コードをコピーする
// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'
import GameMain from 'pages/GameMain.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: GameMain
  }
]

export default routes
🧹 キャッシュについて
.quasar/ フォルダは自動生成物のため、
構成変更時は削除して問題ない。

bash
コードをコピーする
# Windows (PowerShell)
Remove-Item -Recurse -Force .quasar