//Display / UI

import {
    TILE_STATUSES, createBoard, markTile,
    revealTile,
    checkWin,
    checkLose,
} from "./minesweeper.js";

const BOARD_SIZE = 10;
let numberOfMines = 15;

// const difficulty = document.getElementById('difficulty')
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')


let board = createBoard(BOARD_SIZE, numberOfMines)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)

            checkGameEnd()
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

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = 'You Win'
        messageText.style.color = 'green'
        messageText.style.fontSize = '2rem'
        messageText.style.marginBottom = '3px'
        messageText.style.marginTop = '0'
    }
    if (lose) {
        messageText.textContent = 'You Lose'
        messageText.style.color = 'red'
        messageText.style.fontSize = '2rem'
        messageText.style.marginBottom = '3px'
        messageText.style.marginTop = '0'
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}

//1. Populate a board with tiles/mines--------
//2. Left click on tiles--------
//a.reveal tiles
//3. Right click on tiles---------
//a.mark tiles
//4. Check for win/lose

const retryBtn = document.querySelector('.btn')
retryBtn.addEventListener('click', () => window.location.reload())



// difficulty.addEventListener('input', (e) => {
//     const inputValue = +difficulty.value
//     if (inputValue === 1) { numberOfMines = 10 }
//     else if (inputValue === 2) {
//         numberOfMines = 20;
//     } else {
//         numberOfMines = 30;
//     }
//     resetGame()
//     console.log(numberOfMines)
// })

// function resetGame() {
//     boardElement.innerHTML = '';
//     board = createBoard(BOARD_SIZE, numberOfMines);
//     board.forEach(row => {
//         row.forEach(tile => {
//             boardElement.append(tile.element)
//             tile.element.addEventListener('click', () => {
//                 revealTile(board, tile)

//                 checkGameEnd()
//             })
//             tile.element.addEventListener('contextmenu', (e) => {
//                 e.preventDefault()
//                 markTile(tile)
//                 listMinesLeft()
//             })
//         })
//     })

//     listMinesLeft()
// }