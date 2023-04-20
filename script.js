//Display / UI

import { TILE_STATUSES, createBoard, markTile } from "./minesweeper.js";

const BOARD_SIZE = 10;
const numberOfMines = 10;


// console.log(createBoard(2, 2))
const board = createBoard(BOARD_SIZE, numberOfMines)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')

// console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {

        })
        tile.element.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})

boardElement.style.setProperty('--size', BOARD_SIZE)
minesLeftText.textContent = numberOfMines

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    minesLeftText.textContent = numberOfMines - markedTilesCount
}

//1. Populate a board with tiles/mines--------
//2. Left click on tiles--------
  //a.reveal tiles
//3. Right click on tiles---------
  //a.mark tiles
//4. Check for win/lose