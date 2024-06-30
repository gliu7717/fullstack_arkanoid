export function createBrick(game, xPos, yPos, width, height) {
    let ranCol = '#' + Math.random().toString(16).substr(-6);
    game.bricks.push({
      x: xPos
      , y: yPos
      , w: width
      , h: height
      , c: ranCol
      , v: Math.floor(Math.random() * 50)
      , bonus: Math.floor(Math.random() * 3)
    });
}

export function drawBrick(ctx, brick)
{
    ctx.beginPath();
    ctx.fillStyle = brick.c;
    ctx.strokeStyle = 'white';
    //console.log(brick);
    ctx.rect(brick.x, brick.y, brick.w, brick.h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
