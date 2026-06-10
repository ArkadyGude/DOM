import Game from "./app";

describe("Game", () => {
  let container;
  let gameInstance;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "game-container";
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    if (gameInstance && typeof gameInstance.destroy === "function") {
      gameInstance.destroy();
    }
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  test("должен создать игровое поле 4x4 и поместить гоблина", () => {
    gameInstance = new Game();
    const cells = document.querySelectorAll(".cell");
    expect(cells.length).toBe(16);
    const goblin = document.querySelector(".goblin");
    expect(goblin).toBeTruthy();
    expect(goblin.tagName).toBe("IMG");
    const parentCell = goblin.closest(".cell");
    expect(parentCell).toBeTruthy();
  });

  test("гоблин перемещается в другую ячейку при вызове таймера", () => {
    gameInstance = new Game();
    const goblin = document.querySelector(".goblin");
    const initialParent = goblin.parentElement;

    jest.advanceTimersByTime(1000);

    const newParent = goblin.parentElement;
    expect(newParent).not.toBe(initialParent);
  });
});
