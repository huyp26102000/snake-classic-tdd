import Cell from "./cell";
import GameOverError from "../utils/errors";
import _find from "lodash/find";
import _head from "lodash/head";
import _tail from "lodash/tail";

class Snake {
  constructor() {
    this.cells = [new Cell(9, 9)];
    this.direction = "east";
  }
  getHead() {
    return this.cells[this.cells.length - 1];
  }
  checkWall(head) {
    if (head.col < 0 || head.col > 19 || head.row < 0 || head.row > 19) {
      throw new GameOverError();
    }
  }
  makeHead(direct) {
    const curHead = this.getHead();
    if (direct == "east") {
      return new Cell(curHead.col + 1, curHead.row);
    } else if (direct == "west") {
      return new Cell(curHead.col - 1, curHead.row);
    } else if (direct == "north") {
      return new Cell(curHead.col, curHead.row - 1);
    } else if (direct == "south") {
      return new Cell(curHead.col, curHead.row + 1);
    }
  }
  move() {
    const newHead = this.makeHead(this.direction);
    this.checkWall(newHead);
    this.cells = [...this.cells.slice(1), newHead];
  }
  goEast = () => {
    if (this.direction === "west") {
      return;
    }
    this.direction = "east";
    this.move();
  };
  goWest = () => {
    if (this.direction === "east") {
      return;
    }
    this.direction = "west";
    this.move();
  };
  goNorth = () => {
    if (this.direction === "south") {
      return;
    }
    this.direction = "north";
    this.move();
  };
  goSouth = () => {
    if (this.direction === "north") {
      return;
    }
    this.direction = "south";
    this.move();
  };
  addNode = (cell) => {
    this.cells.push(cell);
  };
  getLength = () => this.cells.length;

  checkCellIsSnake({ col, row }) {
    return Boolean(_find(this.cells, { col, row }));
  }

  addNodes(nodes) {
    this.cells = [...this.cells, ...nodes];
  }
}

export default Snake;
