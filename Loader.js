"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadByRow = exports.strToBoard = void 0;
var strToBoard = function (strBoard) {
    var rows_strs = strBoard.split('\n');
    var board = rows_strs.map(function (row) {
        return row.split(' ').map(Number);
    });
    return board;
};
exports.strToBoard = strToBoard;
var loadByRow = function (board, rows) {
    for (var i = 1; i <= 9; i++) {
        for (var j = 1; j <= 9; j++) {
            var square = rows[i][j - 1];
            var val = board[i - 1][j - 1];
            if (val !== 0) {
                square.value = val;
                square.possibleValues = new Set([]);
            }
        }
    }
};
exports.loadByRow = loadByRow;
