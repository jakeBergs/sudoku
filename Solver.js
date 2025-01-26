"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square_1 = require("./Square");
var Loader_1 = require("./Loader");
var buildGrouping = function () { return ({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
}); };
var columns = buildGrouping();
var rows = buildGrouping();
var boxes = buildGrouping();
// Initialize the board
for (var i = 1; i <= Object.keys(rows).length; i++) {
    for (var j = 1; j <= Object.keys(columns).length; j++) {
        var sec_row = Math.ceil(i / 3); // 1, 2, 3
        var sec_col = Math.floor((j - 1) / 3) * 3; // 0, 3, 6
        var sec_val = sec_row + sec_col;
        var cur_square = new Square_1.default(i, j, sec_val);
        rows[i].push(cur_square);
        columns[j].push(cur_square);
        boxes[sec_val].push(cur_square);
    }
}
var str_board = '0 3 0 6 0 7 0 1 5\n' +
    '0 1 0 5 9 0 6 0 0\n' +
    '5 6 0 3 0 0 0 7 4\n' +
    '0 7 0 0 6 0 1 2 0\n' +
    '8 0 1 0 2 0 5 6 0\n' +
    '0 9 2 7 1 5 0 0 0\n' +
    '0 0 0 2 3 9 0 5 6\n' +
    '4 0 6 0 0 0 0 0 2\n' +
    '0 0 3 0 0 0 0 8 0\n';
var str_board_hard_142 = '6 9 0 2 0 0 7 0 0\n' +
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
var board = (0, Loader_1.strToBoard)(str_board);
(0, Loader_1.loadByRow)(board, rows);
// console.log(rows[2][1])
var getAdjacentSquares = function (row, column, box) {
    return rows[row].concat(columns[column]).concat(boxes[box]);
};
var iterateOverGrouping = function (grouping) {
    var keys = Object.keys(grouping);
    var changeOcurred = false;
    // iterate through each section
    keys.forEach(function (key) {
        var section = grouping[Number(key)];
        // iterate through all the squares in a section
        section.forEach(function (square) {
            console.log(square.value);
            // if a square has a value, but it hasn't been applied to
            if (!square.valueApplied && square.value != null) {
                changeOcurred = true;
                var curValue_1 = square.value;
                var adjacentValues = getAdjacentSquares(square.row, square.column, square.box); // rows[square.row].concat(columns[square.column]).concat(boxes[square.box]);
                adjacentValues.forEach(function (adjSquare) {
                    if (adjSquare.value == null) {
                        adjSquare.addCallback(function (sq) {
                            if (sq.possibleValues.has(curValue_1)) {
                                sq.possibleValues.delete(curValue_1);
                            }
                        });
                    }
                });
                square.valueApplied = true;
            }
            else if (square.value == null) {
                square.runCallbacks();
                if (square.checkValue()) {
                    changeOcurred = true;
                }
            }
        });
    });
    return changeOcurred;
};
var SectionType;
(function (SectionType) {
    SectionType[SectionType["ROW"] = 0] = "ROW";
    SectionType[SectionType["COLUMN"] = 1] = "COLUMN";
    SectionType[SectionType["BOX"] = 2] = "BOX";
})(SectionType || (SectionType = {}));
var getNextSectionType = function (sectionT) {
    switch (sectionT) {
        case SectionType.ROW:
            return SectionType.COLUMN;
        case SectionType.COLUMN:
            return SectionType.BOX;
        case SectionType.BOX:
            return SectionType.ROW;
    }
};
var printBoard = function (rows) {
    var keys = Object.keys(rows);
    var boardStr = '';
    keys.forEach(function (key) {
        var row = rows[Number(key)];
        var rowStr = '';
        row.forEach(function (square) {
            if (square.value == null) {
                rowStr += '0 ';
            }
            else {
                rowStr += square.value + ' ';
            }
        });
        boardStr += rowStr + '\n';
    });
    console.log(boardStr);
};
var getGrouping = function (sectionT) {
    switch (sectionT) {
        case SectionType.ROW:
            return rows;
        case SectionType.COLUMN:
            return columns;
        case SectionType.BOX:
            return boxes;
    }
};
var hasChange = true;
var curSectionType = SectionType.ROW;
try {
    while (hasChange) {
        hasChange = false;
        var curGrouping = getGrouping(curSectionType);
        hasChange = iterateOverGrouping(curGrouping);
        curSectionType = getNextSectionType(curSectionType);
    }
}
catch (e) {
    printBoard(rows);
    throw e;
}
printBoard(rows);
