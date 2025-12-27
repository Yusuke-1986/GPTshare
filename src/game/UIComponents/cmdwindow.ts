import { CommandWindow, Commands } from "../core/command";

function loadImage(src: string): HTMLImageElement {
  const img = new Image()
  img.src = src
  return img
}

const attack = new Commands(
    {x: 250, y: 10},
    {x: 130, y: 25},
    loadImage("/images/attack.png")
);

const guard = new Commands(
    {x: 250, y: 35},
    {x: 130, y: 25},
    loadImage("/images/guard.png")
);

const magic = new Commands(
    {x: 250, y: 60},
    {x: 130, y: 25},
    loadImage("/images/magic.png")
);

const item = new Commands(
    {x: 250, y: 85},
    {x: 130, y: 25},
    loadImage("/images/item.png")
);

const escape = new Commands(
    {x: 250, y: 110},
    {x: 130, y: 25},
    loadImage("/images/escape.png")
);

export const cmdwindow = new CommandWindow(
    {x:230 , y: -50},
    { x: 170, y: 260 },
    [attack, guard, magic, item, escape],
    loadImage("/images/cmdframe.png")
);
