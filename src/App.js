import React, { useEffect, useState } from "react";
import "./App.css";
import Cell from "./entities/cell";
import Gui from "./entities/gui";
import Snake from "./entities/snake";
import ReactInterval from 'react-interval';

const snake = new Snake();
snake.addNode(new Cell(10, 9));
snake.addNode(new Cell(11, 9));
snake.addNode(new Cell(12, 9));
snake.addNode(new Cell(13, 9));
snake.addNode(new Cell(14, 9));

function App() {
  const gui = new Gui();

  const [guiText, setGuiText] = useState(Gui.display(snake));
  function move(direction = "") {
    switch (direction) {
      case "north":
        snake.goNorth();
        break;
      case "south":
        snake.goSouth();
        break;
      case "east":
        snake.goEast();
        break;
      case "west":
        snake.goWest();
        break;
      default:
        snake.move();
    }

    setGuiText(Gui.display(snake));
  }
  useEffect(() => {
    setInterval(() => {
      move();
    }, 500);
  }, []);
  return (
    <div className="App">
      <pre>{guiText}</pre>
      <button
        onClick={() => {
          move("north");
        }}
      >
        Top
      </button>
      <br />
      <button
        onClick={() => {
          move("west");
        }}
      >
        Left
      </button>
      <button
        onClick={() => {
          move("east");
        }}
      >
        Right
      </button>
      <br />
      <button
        onClick={() => {
          move("south");
        }}
      >
        Down
      </button>
      <br />
      <button
        onClick={() => {
          move();
        }}
      >
        move
      </button>
    </div>
  );
}

export default App;
