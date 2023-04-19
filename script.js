//Display / UI

import { createBoard } from "./minesweeper.js";

//1. Populate a board with tiles/mines
//2. Left click on tiles
//a.reveal tiles
//3. Right click on tiles
//a.mark tiles
//4. Check for win/lose

// console.log(createBoard(2, 2))
const board = createBoard(2, 2)
const boardElement = document.querySelector('.board')