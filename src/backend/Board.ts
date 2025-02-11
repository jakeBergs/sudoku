import Square from './Square';
import { grouping } from '../shared/types'

class Board {
    rows: grouping;
    columns: grouping;
    boxes: grouping;

    constructor() {
        this.rows = this.buildGrouping();
        this.columns = this.buildGrouping();
        this.boxes = this.buildGrouping();

        this.initializeBoard();
    }

    private initializeBoard = () => {
        for (let i = 1; i <= Object.keys(this.rows).length; i++) {
            for (let j = 1; j <= Object.keys(this.columns).length; j++) {
                const sec_row = Math.ceil(i / 3); // 1, 2, 3
                const sec_col = Math.floor((j - 1) / 3) * 3; // 0, 3, 6
                const sec_val = sec_row + sec_col;
                const cur_square = new Square(i, j, sec_val);
                this.rows[i].push(cur_square);
                this.columns[j].push(cur_square);
                this.boxes[sec_val].push(cur_square);
            }
        }
    }

    private buildGrouping = (): grouping => ({
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

    getAdjacentSquares = (row: number, column: number, box: number): Square[] => {
        return this.rows[row].concat(this.columns[column]).concat(this.boxes[box])
    }

    private boardToStr = (): string => {
        let keys = Object.keys(this.rows);
        let boardStr = '';
        keys.forEach((key) => {
            let row = this.rows[Number(key)];
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
        return boardStr;
    }

    printBoard = () => {
        let boardStr = this.boardToStr();
        console.log(boardStr);
    }

    alertBoard = () => {
        let boardStr = this.boardToStr();
        alert(boardStr);
    }

    iterateOverAllSquares = (callback: (square: Square) => void) => {
        let keys = Object.keys(this.rows);
        keys.forEach((key) => {
            let row = this.rows[Number(key)];
            row.forEach((square) => {
                callback(square);
            })
        })
    }

    runCallbacks = (): boolean => {
        let changeOccurred = false;
        this.iterateOverAllSquares((square: Square) => {
            if (square.value == null) {
                square.runCallbacks();
                if (square.checkValue()) {
                    changeOccurred = true;
                }
            }
        })
        return changeOccurred;
    }
}

export default Board