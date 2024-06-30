import {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const game = {grid:60,ani:''};
  const player = {x:game.grid*7,y:game.grid*8,w:game.grid*2,h:game.grid/2,color:'red',speed:5};
  const keyz = {ArrowLeft:false,ArrowRight:false};
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
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
  
  function draw(){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);
    movement();
    ctx.beginPath();
    ctx.rect(player.x,player.y,player.w,player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
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
