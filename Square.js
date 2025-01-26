"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Square = /** @class */ (function () {
    function Square(row, column, box) {
        this.row = row;
        this.column = column;
        this.box = box;
        this.possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.callbackQueue = [];
        this.valueApplied = false;
    }
    Square.prototype.setValue = function (value) {
        this.value = value;
    };
    Square.prototype.addCallback = function (callback) {
        this.callbackQueue.push(callback);
    };
    Square.prototype.runCallbacks = function () {
        var _this = this;
        this.callbackQueue.forEach(function (callback) { return callback(_this); });
    };
    Square.prototype.checkValue = function () {
        var numPossibleValues = this.possibleValues.size;
        if (numPossibleValues === 1) {
            this.value = this.possibleValues.values().next().value;
            return true;
        }
        else if (numPossibleValues === 0) {
            throw new Error('No possible values. ' + this.toString());
        }
        return false;
    };
    Square.prototype.toString = function () {
        return 'row: ' +
            this.row +
            ', column: ' +
            this.column +
            ', box: ' +
            this.box;
    };
    return Square;
}());
exports.default = Square;
