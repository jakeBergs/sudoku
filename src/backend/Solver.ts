import Board from "./Board";
import Square from "./Square";
import { grouping, ValuePositions, SectionType } from "../shared/types";


class Solver {
    board: Board;
    curGrouping: grouping;
    curSectionType: SectionType;
    changeOccurred: boolean;

    constructor() {
        this.board = new Board()
        this.curGrouping = this.board.rows;
        this.curSectionType = SectionType.ROW;
        this.changeOccurred = true; // initialize to true to enter the while loop
    }

    cycleSectionType = () => {
        switch (this.curSectionType) {
            case SectionType.ROW:
                this.curSectionType = SectionType.COLUMN;
            case SectionType.COLUMN:
                this.curSectionType = SectionType.BOX;
            case SectionType.BOX:
                this.curSectionType = SectionType.ROW;
        }
    }

    getGrouping = () => {
        switch (this.curSectionType) {
            case SectionType.ROW:
                this.curGrouping = this.board.rows;
            case SectionType.COLUMN:
                this.curGrouping = this.board.columns;
            case SectionType.BOX:
                this.curGrouping = this.board.boxes;
        }
    }

    runAlgos = () => {
        for (let gc = 0; gc < 3; gc++) {
            this.getGrouping();
            this.checkForLastRemainingValue();
            this.cycleSectionType();
        }
        this.iterateOverGrouping();
    }

    solveUntilFail = () => {
        try {
            while (this.changeOccurred) {
                this.changeOccurred = false;
                this.runAlgos();
                this.board.runCallbacks();
            }
        } catch (e) {
            this.board.printBoard();
            throw e;
        }
    }

    iterateOverGrouping = () => {
        let keys: string[] = Object.keys(this.curGrouping);
        // iterate through each section
        keys.forEach((key) => {
            const section = this.curGrouping[Number(key)];
            // iterate through all the squares in a section
            section.forEach((square: Square) => {
                // console.log(square.value);
                // if a square has a value, but it hasn't been applied to it's neighbors
                if (!square.valueApplied && square.value != null) {
                    this.changeOccurred = true;
                    // This next part can be where we apply a value
                    const curValue = square.value;
                    const adjacentValues = this.board.getAdjacentSquares(square.row, square.column, square.box)
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
    }

    checkForLastRemainingValue = () => {
        let keys: string[] = Object.keys(this.curGrouping);
        keys.forEach((key) => {
            const section = this.curGrouping[Number(key)];
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
                    this.changeOccurred = true;
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
                                        this.changeOccurred = true;
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
    }
}

export default Solver;