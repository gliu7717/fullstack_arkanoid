import {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const game = {
    grid: 60
    , ani: ''
  };
  const ball = {
    x: game.grid * 7
    , y: game.grid * 5
    , w: game.grid / 3
    , h: game.grid / 3
    , color: 'green'
    , dx: 5
    , dy: 5
  };
  const player = {
    x: game.grid * 7
    , y: game.grid * 8
    , w: game.grid * 2
    , h: game.grid / 2
    , color: 'red'
    , speed: 5
  };
  const keyz = {
    ArrowLeft: false
    , ArrowRight: false
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.style.background = 'black';
    contextRef.current = context;
    //document.body.prepend(canvas);
    canvas.setAttribute('width',game.grid*15);
    canvas.setAttribute('height',game.grid*10);
    canvas.style.border = '1px solid black';
    game.ani = requestAnimationFrame(draw);
    draw(context)
  },[])
  document.addEventListener('keydown',(e)=>{
    if(e.code in keyz){  keyz[e.code] = true;}
    console.log(keyz);
  })

  document.addEventListener('keyup',(e)=>{
    if(e.code in keyz){  keyz[e.code] = false;}
    console.log(keyz);
  })
  function movement(){
    if(keyz.ArrowLeft){player.x-= player.speed;}
    if(keyz.ArrowRight){player.x+= player.speed;}
  }

  function drawPlayer(ctx)
  {
    ctx.beginPath();
    ctx.rect(player.x,player.y,player.w,player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }

  function ballmove(canvas){
    if(ball.x > canvas.width || ball.x < 0  ){
      ball.dx *= -1;
    }
    if(ball.y > canvas.height || ball.y < 0 ){
      ball.dy *= -1;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
  function drawBall(ctx){
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.rect(ball.x,ball.y,ball.w,ball.h);
    ctx.stroke();
    ctx.closePath();    
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    let adj = ball.w/2;
    ctx.arc(ball.x+adj,ball.y+adj,ball.w/2,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();    
  }

  function collDetection(obj1, obj2) {
    const xAxis = (obj1.x < (obj2.x + obj2.w)) && ((obj1.x + obj1.w) > obj2.x);
    const yAxis = (obj1.y < (obj2.y + obj2.h)) && ((obj1.y + obj1.h) > obj2.y);
    const val = xAxis && yAxis;
    return val;
  }
  
  function draw(){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    movement();
    ballmove(canvas)
    drawPlayer(ctx);
    drawBall(ctx);
    if (collDetection(player, ball)) {
      ball.dy *= -1;
      let val1 = ball.x + (ball.w / 2) - player.x;
      let val2 = val1 - player.w / 2;
      let val3 = Math.ceil(val2 / (player.w / 10));
      ball.dx = val3;
      console.log(val1, val2, val3);
    };
    game.ani = requestAnimationFrame(draw);
  }

  const onMouseDown = ({nativeEvent}) => {
    let {x,y} = nativeEvent;
    nativeEvent.preventDefault();
  };
  const onMouseUp = ({nativeEvent}) => {
    let {x,y} = nativeEvent;
    
    nativeEvent.preventDefault();
  };
  const onMouseMove = ({nativeEvent}) => {
    let {x,y} = nativeEvent;
    const canvas = canvasRef.current;
    const val = x - canvas.offsetLeft;
    console.log(val)
    if(val > player.w && val < canvas.width){
      player.x = val - player.w;
      console.log(player.x);
    }
    nativeEvent.preventDefault();
  };

  const onMouseLeave = ({nativeEvent}) => {
    let {x,y} = nativeEvent;
    nativeEvent.preventDefault();
  };

  return (
    <div className="App">
      <canvas className="canvas-container"
        width={800}
        height={600}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
      </canvas>
    </div>
  );
}

export default App;
