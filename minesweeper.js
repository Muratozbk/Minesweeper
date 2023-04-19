// Logic 

const TILE_STATUS = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
}

export function createBoard(boardSize, numberOfMines) {
    const board = []
    for (let x = 0; x < boardSize; x++) {
        const row = []
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUS.HIDDEN;

            const tile = {
                element,
                x,
                y,
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}