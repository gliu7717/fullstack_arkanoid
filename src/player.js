import { game } from "./game";
export const player = {
    x: game.grid * 7
    , y: game.grid * 8
    , w: game.grid * 1.5
    , h: game.grid / 4
    , color: 'red'
    , speed: 5
    , lives :5
    ,score : 0
  };

 export  function drawPlayer(ctx)
 {
   ctx.beginPath();
   ctx.rect(player.x,player.y,player.w,player.h);
   ctx.fillStyle = player.color;
   ctx.fill();
   ctx.closePath();
 }
