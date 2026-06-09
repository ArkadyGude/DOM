import goblinImage from "../img/goblin.png";

export default class Game {
  constructor(fieldSize = 4) {
    this.fieldSize = fieldSize;
    this.container = document.getElementById("game-container");
    this.cells = [];
    this.currentPosition = null;
    this.goblin = null;

    this.createField();
    this.placeGoblinRandomly();
    this.startMoving();
  }

  createField() {
    for (let i = 0; i < this.fieldSize * this.fieldSize; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.container.appendChild(cell);
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

    this.cells[randomIndex].appendChild(this.goblin);
    this.currentPosition = randomIndex;
  }

  startMoving() {
    setInterval(() => {
      this.placeGoblinRandomly();
    }, 1000);
  }
}
