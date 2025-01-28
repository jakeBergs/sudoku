
type SquareCallback = (square: Square) => void;

class Square {
    row: number;
    column: number;
    box: number;

    value?: number;
    valueApplied: boolean;
    possibleValues: Set<number>;
    callbackQueue: SquareCallback[];

    constructor(
        row: number,
        column: number,
        box: number,
    ) {
        this.row = row;
        this.column = column;
        this.box = box;
        this.possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.callbackQueue = [];
        this.valueApplied = false;
    }

    setValue(value: number) {
        if (this.value == null) {
            this.value = value;
            this.possibleValues = new Set([value]);
        }
    }

    hasValue() {
        return this.value != null;
    }

    addCallback(callback: SquareCallback) {
        this.callbackQueue.push(callback);
    }

    runCallbacks() {
        this.callbackQueue.forEach((callback: SquareCallback) => callback(this));
        this.callbackQueue = [];
    }

    checkValue() {
        const numPossibleValues = this.possibleValues.size;
        if (numPossibleValues === 1) {
            this.value = this.possibleValues.values().next().value;
            return true
        } else if (numPossibleValues === 0) {
            throw new Error('No possible values. ' + this.toString());
        }
        return false;
    }

    toString() {
        return 'row: ' +
            this.row +
            ', column: ' +
            this.column +
            ', box: ' +
            this.box;
    }
}

export default Square;