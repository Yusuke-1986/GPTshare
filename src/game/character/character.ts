import { createCharacter } from "./characterModel";
import settings from "./characterSettings.json";

function loadImage(src: string): HTMLImageElement {
  const img = new Image()
  img.src = src
  return img
}
const playerSetting = settings.player_1
const enemySetting = settings.enemy_1

const player = new createCharacter(
  playerSetting.name,
  playerSetting.position,
  playerSetting.size,
  loadImage(playerSetting.image),
  playerSetting.hp
)

const enemy = new createCharacter(
  enemySetting.name,
  enemySetting.position,
  enemySetting.size,
  loadImage(enemySetting.image),
  enemySetting.hp
)

/*
function setPosition(pos: Vec2, charType: "player" | "enemy"){
  if(charType === "player") return { x: pos.x + LOGICAL_WIDTH / 2, y: pos.y + LOGICAL_HEIGHT / 2 }
  if(charType === "enemy") return { x: pos.x - LOGICAL_WIDTH / 2, y: pos.y + LOGICAL_HEIGHT / 2 }
  else return pos
}
*/
export { player, enemy }

