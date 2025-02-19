// We need to load the initialized sudoku board with assigned values it starts off with
import { grouping } from '../shared/types';

class Loader {
    simpleBoard: number[][];

    constructor() {
        this.simpleBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    }

    loadFromString = (strBoard: string): void => {
        this.simpleBoard = this.strToBoard(strBoard);
    }

    loadFromMatrix = (simpleBoard: number[][]): void => {
        this.simpleBoard = simpleBoard;
    }

    strToBoard = (strBoard: string): number[][] => {
        const rows_strs = strBoard.split('\n');
        const board = rows_strs.map(row => {
            return row.split(' ').map(Number);
        });
        return board;
    }

    loadByRow = (rows: grouping): void => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                const square = rows[i][j - 1];
                const val = this.simpleBoard[i - 1][j - 1];
                if (val !== 0) {
                    square.setValue(val);
                }
            }
        }
    }
}

export default Loader; 