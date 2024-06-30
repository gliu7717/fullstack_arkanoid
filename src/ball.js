import { game } from "./game";
import { player } from "./player";

export const ball = {
    x: game.grid * 7
    , y: game.grid * 5
    , w: game.grid / 3
    , h: game.grid / 3
    , color: 'green'
    , dx: 0
    , dy: 0
 };

export function resetBall() {
    ball.dy = 0;
    ball.y = player.y - ball.h;
    ball.x = player.x + (player.w / 2);
    game.inplay = false;
  }

export function ballmove(canvas){
    if (ball.x > canvas.width || ball.x < 0) {
      ball.dx *= -1;
    }
    if (ball.y < 0) {
      ball.dy *= -1;
    }
    if (ball.y > canvas.height) {
      player.lives--;
      resetBall();
      if (player.lives < 0) {
        gameOver();
      }
    }
    if (ball.dy > -2 && ball.dy < 0) {
      ball.dy = -3;
    }
    if (ball.dy > 0 && ball.dy < 2) {
      ball.dy = 3;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
export function drawBall(ctx){
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.rect(ball.x,ball.y,ball.w,ball.h);
    //ctx.stroke();
    ctx.closePath();    
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    let adj = ball.w/2;
    ctx.arc(ball.x+adj,ball.y+adj,ball.w/2,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();    
  }

  function gameOver() {
    game.gameover = true;
    game.inplay = false;
    console.log('game over press to start again');
    cancelAnimationFrame(game.ani);
  }
