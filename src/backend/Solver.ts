import Board from './Board';
import Square from './Square';
import { loadByRow, strToBoard } from './Loader';

export interface grouping {
    [key: number]: Square[]
}

export const buildGrouping = (): grouping => ({
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

// const columns = buildGrouping();

// const rows = buildGrouping();

// const boxes = buildGrouping();

// // Initialize the board
// for (let i = 1; i <= Object.keys(rows).length; i++) {
//     for (let j = 1; j <= Object.keys(columns).length; j++) {
//         const sec_row = Math.ceil(i / 3); // 1, 2, 3
//         const sec_col = Math.floor((j - 1) / 3) * 3; // 0, 3, 6
//         const sec_val = sec_row + sec_col;
//         const cur_square = new Square(i, j, sec_val);
//         rows[i].push(cur_square);
//         columns[j].push(cur_square);
//         boxes[sec_val].push(cur_square);
//     }
// }

const board = new Board()

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


const str_board_0 =
    '0 6 3 4 0 0 8 2 7\n' +
    '0 4 0 0 2 8 3 0 0\n' +
    '8 9 0 0 0 3 0 0 0\n' +
    '4 0 7 8 0 0 0 0 6\n' +
    '1 3 9 6 0 0 0 0 0\n' +
    '0 0 0 1 0 0 9 5 4\n' +
    '6 0 8 0 7 0 0 9 0\n' +
    '9 0 0 0 0 4 6 1 3\n' +
    '0 0 4 0 5 6 0 7 0\n';


const str_board_1 =
    '0 0 0 0 0 1 0 6 9\n' +
    '8 3 6 0 0 0 0 5 1\n' +
    '0 0 0 7 0 0 0 0 0\n' +
    '0 0 2 0 8 0 0 0 3\n' +
    '4 9 0 0 0 0 0 0 5\n' +
    '1 0 0 0 9 0 0 0 0\n' +
    '0 8 0 0 5 4 2 7 0\n' +
    '0 0 5 2 0 0 0 3 0\n' +
    '0 0 0 0 0 0 0 0 0\n';

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

let arr_board = strToBoard(str_board_1);
loadByRow(arr_board, board.rows);

// console.log(rows[2][1])

// const getAdjacentSquares = (row: number, column: number, box: number): Square[] => {
//     return rows[row].concat(columns[column]).concat(boxes[box])
// }

const iterateOverGrouping = (grouping: grouping) => {
    let keys: string[] = Object.keys(grouping);
    let changeOcurred = false;
    // iterate through each section
    keys.forEach((key) => {
        const section = grouping[Number(key)];
        // iterate through all the squares in a section
        section.forEach((square: Square) => {
            // console.log(square.value);
            // if a square has a value, but it hasn't been applied to it's neighbors
            if (!square.valueApplied && square.value != null) {
                changeOcurred = true;
                // This next part can be where we apply a value
                const curValue = square.value;
                const adjacentValues = board.getAdjacentSquares(square.row, square.column, square.box)
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
            }
        })
    })
    return changeOcurred;
}

type ValuePositions = {
    [key: number]: number[];
};

// this does checks based on value positions in a grouping
const checkForLastRemainingValue = (grouping: grouping): boolean => {
    let keys: string[] = Object.keys(grouping);
    let changeOccurred = false;
    keys.forEach((key) => {
        const section = grouping[Number(key)];
        const valuePositions: ValuePositions = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        }
        // iterate through all the squares in a section
        // store the square index in each of it's possible values
        section.forEach((square: Square, index: number) => {
            square.possibleValues.forEach((value) => {
                valuePositions[value].push(index);
            })
        })
        Object.keys(valuePositions).forEach((val_str) => {
            const val = Number(val_str);
            const cnt = valuePositions[val].length;
            const index = valuePositions[val][0];
            section[index].hasValue();
            if (cnt === 0) {
                throw new Error('No possible values for a square');
            } else if (cnt === 1 && !section[index].hasValue()) {
                // console.log('found a value by elimination');
                changeOccurred = true;
                section[index].setValue(val);
            } else if (cnt === 2) {
                for (let vpi = val; vpi <= 9; vpi++) {
                    if (valuePositions[vpi].length === 2) {
                        const indecies1 = valuePositions[val];
                        const indecies2 = valuePositions[vpi];
                        if (indecies1[0] === indecies2[0] && indecies1[1] === indecies2[1]) {
                            // eliminate these two values (val and vpi) from the rest of the section exept for the two indecies
                            section.forEach((square: Square, ind: number) => {
                                if (indecies1.indexOf(ind) === -1 && (square.possibleValues.has(val) || square.possibleValues.has(vpi))) {
                                    console.log('eliminating values');
                                    changeOccurred = true;
                                    square.addCallback((sq: Square) => {
                                        sq.possibleValues.delete(val);
                                        sq.possibleValues.delete(vpi);
                                    });
                                }
                            })

                        }
                    }
                }
            }
        })
    })
    return changeOccurred;

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

const getGrouping = (sectionT: SectionType) => {
    switch (sectionT) {
        case SectionType.ROW:
            return board.rows;
        case SectionType.COLUMN:
            return board.columns;
        case SectionType.BOX:
            return board.boxes;
    }
}

let hasChange = true;
let curSectionType = SectionType.ROW;
try {
    while (hasChange) {
        hasChange = false;
        for (let gc = 0; gc < 3; gc++) {
            const curGrouping = getGrouping(curSectionType);
            console.log(curSectionType);
            hasChange = checkForLastRemainingValue(curGrouping) || hasChange;
            curSectionType = getNextSectionType(curSectionType);
        }
        hasChange = iterateOverGrouping(board.rows) || hasChange;
        hasChange = board.runCallbacks() || hasChange;
        console.log(hasChange)
    }

} catch (e) {
    board.printBoard();
    throw e;
}

// console.log(board.rows[8][6].possibleValues);
board.printBoard();