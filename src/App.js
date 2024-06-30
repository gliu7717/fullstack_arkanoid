import {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    const game = {grid:40};
    document.body.prepend(canvas);
    canvas.setAttribute('width',game.grid*15);
    canvas.setAttribute('height',game.grid*10);
    canvas.style.border = '1px solid black';
  },[])

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
