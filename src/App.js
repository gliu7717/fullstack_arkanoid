import {useEffect, useRef, useState} from 'react';
import './App.css';
import { game } from './game';
import { ball, 
         ballmove,
         drawBall,
         resetBall } from './ball';
import { player, 
         drawPlayer} from './player';
import { createBrick, 
         drawBrick } from './brick';
import { drawBonus } from './bonus';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
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
    outputStartGame(context,canvas)
    draw(context)
  },[])

  function gameWinner() {
    game.gameover = true;
    game.inplay = false;
    console.log('You WON');
    cancelAnimationFrame(game.ani);
  }
  
  function outputStartGame(ctx,canvas) {
    let output = "Click to Start Game";
    ctx.font = Math.floor(game.grid * 0.7) + 'px serif';
    if(canvas.width < 900){
      ctx.font = '20px serif';
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = 'yellow';
    ctx.fillText(output, canvas.width / 2, canvas.height / 2);
  }

  function startGame(canvas){
    game.inplay = false;
    player.x = game.grid * 7;
    player.y = canvas.height - game.grid * 2;
    player.w = game.grid * 1.5;
    player.h = game.grid /4;
    player.lives = 5;
    player.score = 0;
    game.bonus = [];
    resetBall();
    let buffer = 10;
    let width = game.grid;
    let height = game.grid / 2;
    let totalAcross = Math.floor((canvas.width - game.grid) / (width + buffer));
    let xPos = game.grid / 2;
    let yPos = 0;
    console.log(totalAcross);
    let yy = 0;
    for (let i = 0; i < game.num; i++) {
      if (i % totalAcross == 0) {
        yy++;
        yPos += height + buffer;
        xPos = game.grid / 2;
      }
      if(yy < 5){
        createBrick(game, xPos, yPos, width, height);
      }
      xPos += width + buffer;
    }
  }
  
  document.addEventListener('keydown',(e)=>{
    if(e.code in keyz){  keyz[e.code] = true;}
    if (e.code == 'ArrowUp' && !game.inplay) {
      game.inplay = true;
      ball.dx = 2;
      ball.dy = 2;
    } 
  })
  document.addEventListener('keyup',(e)=>{
    if(e.code in keyz){  keyz[e.code] = false;}
  })

  function movement(canvas){
    if (keyz.ArrowLeft) {
      player.x -= player.speed;
      if(player.x< 0)
        player.x = 0
    }
    if (keyz.ArrowRight) {
      player.x += player.speed;
      if(player.x > canvas.width -canvas.offsetLeft)
        player.x = canvas.width -canvas.offsetLeft
      console.log(player.x, canvas.width, canvas.offsetLeft)
    }
    if(!game.inplay){
      ball.x = player.x + player.w/2;
    }
  }
  
  function printInfo(ctx,canvas)
  {
    let output1 = player.lives == 1 ? 'Life Left' : 'Lives Left';
    let output = `${output1} : ${player.lives} Score : ${player.score}`;
    ctx.font = Math.floor(game.grid * 0.7) + 'px serif';
    if (game.gameover) {
      ctx.font = '24px serif';
      output = `Score ${player.score} GAME OVER Click to Start Again`;
    }  
    if(canvas.width < 900){
      ctx.font = '20px serif';
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(output, canvas.width / 2, canvas.height - 20);
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
    movement(canvas);
    ballmove(canvas)
    drawPlayer(ctx);
    drawBall(ctx);
    //drawBricks(ctx);
    game.bonus.forEach((prize, index) => {
      prize.y += 5;
      drawBonus(ctx,prize);
      if (collDetection(prize, player)) {
        player.score += prize.points;
        let temp = game.bonus.splice(index, 1);
        //console.log(temp);
      }
      if (prize.y > canvas.height) {
        let temp = game.bonus.splice(index, 1);
        //console.log(temp);
      }
    })
    game.bricks.forEach((brick, index) => {
      drawBrick(ctx, brick)
      if (collDetection(brick, ball)) {
        let rem = game.bricks.splice(index, 1);
        player.score += brick.v;
        //ball.dy++;
        if (ball.dy > -10 && ball.dy < 10) {
          ball.dy--;
        }
        ball.dy *= -1;
        if (brick.bonus == 1) {
          game.bonus.push({
            x: brick.x
            , y: brick.y
            , h: brick.h
            , w: brick.w
            , points: Math.ceil(Math.random() * 100) + 50
            , color: 'white'
            , alt: 'black'
            , counter: 10
          })
        }
        if (game.bricks.length == 0) {
          gameWinner();
        }
      }
    })

    if (collDetection(player, ball)) {
      ball.dy *= -1;
      let val1 = ball.x + (ball.w / 2) - player.x;
      let val2 = val1 - player.w / 2;
      let val3 = Math.ceil(val2 / (player.w / 10));
      ball.dx = val3;
      //console.log(val1, val2, val3);
    };

    printInfo(ctx,canvas)
    if (!game.gameover) {
      game.ani = requestAnimationFrame(draw);
    }
  }

  const onMouseDown = ({nativeEvent}) => {
    let {x,y} = nativeEvent;
    const canvas = canvasRef.current;
    if (game.gameover) {
      game.gameover = false;
      startGame(canvas);
      game.ani = requestAnimationFrame(draw);
    }
    else if (!game.inplay) {
      game.inplay = true;
      ball.dx = 5;
      ball.dy = -5;
    }
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
    //console.log(val)
    if (val > player.w && val < canvas.width) {
      player.x = val - player.w;
      if (!game.inplay) {
        ball.x = val - (player.w / 2);
      }
      //console.log(player.x);
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
