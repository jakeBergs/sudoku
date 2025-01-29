// We need to load the initialized sudoku board with assigned values it starts off with
import { grouping } from './Solver'

export const strToBoard = (strBoard: string): number[][] => {
    const rows_strs = strBoard.split('\n');
    const board = rows_strs.map(row => {
        return row.split(' ').map(Number);
    });
    return board;
}

export const loadByRow = (board: number[][], rows: grouping): void => {
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            const square = rows[i][j - 1];
            const val = board[i - 1][j - 1];
            if (val !== 0) {
                square.setValue(val);
            }
        }
    }
}