export function drawBonus(ctx,obj) {
    if (obj.counter < 0) {
      if (obj.color == 'black') {
        obj.color = 'white';
        obj.alt = 'black';
        obj.counter = 10;
      }
      else {
        obj.color = 'black';
        obj.alt = 'white';
        obj.counter = 10;
      }
    }
    console.log(obj.counter);
    obj.counter--;
    ctx.beginPath();
    ctx.strokeStyle = obj.color;
    ctx.rect(obj.x, obj.y, obj.w, obj.h);
    ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = obj.alt;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = obj.color;
    ctx.font = '14px serif';
    ctx.textAlign = 'center';
    ctx.fillText(obj.points, obj.x + obj.w / 2, obj.y + obj.h / 2);
    ctx.closePath();
  }      
