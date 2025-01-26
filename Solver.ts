import Square from './Square';
import { loadByRow, strToBoard } from './Loader';

export interface grouping {
    [key: number]: Square[]
}

const buildGrouping = (): grouping => ({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
})

const columns = buildGrouping();

const rows = buildGrouping();

const boxes = buildGrouping();

// Initialize the board
for (let i = 1; i <= Object.keys(rows).length; i++) {
    for (let j = 1; j <= Object.keys(columns).length; j++) {
        const sec_row = Math.ceil(i / 3); // 1, 2, 3
        const sec_col = Math.floor((j - 1) / 3) * 3; // 0, 3, 6
        const sec_val = sec_row + sec_col;
        const cur_square = new Square(i, j, sec_val);
        rows[i].push(cur_square);
        columns[j].push(cur_square);
        boxes[sec_val].push(cur_square);
    }
}

const str_board =
    '0 3 0 6 0 7 0 1 5\n' +
    '0 1 0 5 9 0 6 0 0\n' +
    '5 6 0 3 0 0 0 7 4\n' +
    '0 7 0 0 6 0 1 2 0\n' +
    '8 0 1 0 2 0 5 6 0\n' +
    '0 9 2 7 1 5 0 0 0\n' +
    '0 0 0 2 3 9 0 5 6\n' +
    '4 0 6 0 0 0 0 0 2\n' +
    '0 0 3 0 0 0 0 8 0\n';

const str_board_hard_142 =
    '6 9 0 2 0 0 7 0 0\n' +
    '0 3 0 0 5 4 6 0 0\n' +
    '0 0 0 0 0 0 0 9 3\n' +
    '5 0 0 0 0 0 0 2 0\n' +
    '0 1 0 0 8 0 0 6 0\n' +
    '0 8 0 0 0 0 0 0 1\n' +
    '8 5 0 0 0 0 0 0 0\n' +
    '0 0 7 6 9 0 0 3 0\n' +
    '0 0 9 0 0 5 0 7 4\n';


// const str_board =
//     '0 6 3 4 0 0 8 2 7\n' +
//     '0 4 0 0 2 8 3 0 0\n' +
//     '8 9 0 0 0 3 0 0 0\n' +
//     '4 0 7 8 0 0 0 0 6\n' +
//     '1 3 9 6 0 0 0 0 0\n' +
//     '0 0 0 1 0 0 9 5 4\n' +
//     '6 0 8 0 7 0 0 9 0\n' +
//     '9 0 0 0 0 4 6 1 3\n' +
//     '0 0 4 0 5 6 0 7 0\n';

// chat gpt board, unsolvable
// const str_board =
//     "0 6 0 0 7 0 0 1 3\n" +
//     "3 0 0 6 0 0 0 0 0\n" +
//     "0 0 1 0 0 9 0 8 0\n" +
//     "0 0 7 0 5 0 0 0 2\n" +
//     "5 0 0 0 0 0 0 0 6\n" +
//     "2 0 0 0 6 0 9 0 0\n" +
//     "0 8 0 9 0 0 1 0 0\n" +
//     "0 0 0 0 0 4 0 0 8\n" +
//     "9 2 0 0 3 0 0 6 0\n";

let board = strToBoard(str_board);
loadByRow(board, rows);

// console.log(rows[2][1])

const getAdjacentSquares = (row: number, column: number, box: number): Square[] => {
    return rows[row].concat(columns[column]).concat(boxes[box])
}

const iterateOverGrouping = (grouping: grouping) => {
    let keys: string[] = Object.keys(grouping);
    let changeOcurred = false;
    // iterate through each section
    keys.forEach((key) => {
        const section = grouping[Number(key)];
        // iterate through all the squares in a section
        section.forEach((square: Square) => {
            console.log(square.value);
            // if a square has a value, but it hasn't been applied to it's neighbors
            if (!square.valueApplied && square.value != null) {
                changeOcurred = true;
                const curValue = square.value;
                const adjacentValues = getAdjacentSquares(square.row, square.column, square.box) // rows[square.row].concat(columns[square.column]).concat(boxes[square.box]);
                adjacentValues.forEach((adjSquare) => {
                    if (adjSquare.value == null) {
                        adjSquare.addCallback((sq: Square) => {
                            if (sq.possibleValues.has(curValue)) {
                                sq.possibleValues.delete(curValue);
                            }
                        })
                    }
                });
                square.valueApplied = true;
            } else if (square.value == null) {
                square.runCallbacks();
                if (square.checkValue()) {
                    changeOcurred = true;
                }
            }
        })
    })
    return changeOcurred;
}

const checkForLastRemainingValue = (grouping: grouping) => {
    let keys: string[] = Object.keys(grouping);
    keys.forEach((key) => {
        const section = grouping[Number(key)];
        const valuePositions = {
            1: [],

        }
        section.forEach((square: Square, index: number) => {
        })
    })

}


enum SectionType {
    ROW,
    COLUMN,
    BOX
}

const getNextSectionType = (sectionT: SectionType) => {
    switch (sectionT) {
        case SectionType.ROW:
            return SectionType.COLUMN;
        case SectionType.COLUMN:
            return SectionType.BOX;
        case SectionType.BOX:
            return SectionType.ROW;
    }
}

const printBoard = (rows: grouping) => {
    let keys = Object.keys(rows);
    let boardStr = '';
    keys.forEach((key) => {
        let row = rows[Number(key)];
        let rowStr = '';
        row.forEach((square) => {
            if (square.value == null) {
                rowStr += '0 ';
            } else {
                rowStr += square.value + ' ';
            }
        })
        boardStr += rowStr + '\n';
    })
    console.log(boardStr);
}

const getGrouping = (sectionT: SectionType) => {
    switch (sectionT) {
        case SectionType.ROW:
            return rows;
        case SectionType.COLUMN:
            return columns;
        case SectionType.BOX:
            return boxes;
    }
}

let hasChange = true;
let curSectionType = SectionType.ROW;
try {
    while (hasChange) {
        hasChange = false;
        const curGrouping = getGrouping(curSectionType);
        hasChange = iterateOverGrouping(curGrouping);
        curSectionType = getNextSectionType(curSectionType);
    }

} catch (e) {
    printBoard(rows);
    throw e;
}

printBoard(rows);