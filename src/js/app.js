import goblinImage from "../img/goblin.png";

const MOVE_INTERVAL = 1000;

export default class Game {
  constructor(fieldSize = 4) {
    this.fieldSize = fieldSize;
    this.container = document.getElementById("game-container");

    if (!this.container) {
      throw new Error("Элемент #game-container не найден в DOM");
    }

    this.cells = [];
    this.currentPosition = null;
    this.goblin = null;
    this.intervalId = null;

    this.createField();
    this.placeGoblinRandomly();
    this.startMoving();
  }

  createField() {
    for (let i = 0; i < this.fieldSize * this.fieldSize; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  placeGoblinRandomly() {
    if (!this.goblin) {
      this.goblin = document.createElement("img");
      this.goblin.src = goblinImage;
      this.goblin.classList.add("goblin");
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.cells.length);
    } while (randomIndex === this.currentPosition && this.cells.length > 1);

    this.cells[randomIndex].append(this.goblin);
    this.currentPosition = randomIndex;
  }

  startMoving() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.placeGoblinRandomly();
    }, MOVE_INTERVAL);
  }

  stopMoving() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  destroy() {
    this.stopMoving();
    if (this.goblin) {
      this.goblin.remove();
      this.goblin = null;
    }
    this.cells.forEach((cell) => cell.remove());
    this.cells = [];
    this.currentPosition = null;
  }
}
