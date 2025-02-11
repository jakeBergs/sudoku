import React, { useState } from "react";
import Solver from "../../backend/Solver";
import Loader from "../../backend/Loader";

const SudokuBoard: React.FC = () => {
    const getBlankBoard = () => Array(9)
        .fill(null)
        .map(() => Array(9).fill(""));

    const [board, setBoard] = useState<string[][]>(
        getBlankBoard()
    );

    const handleChange = (row: number, col: number, value: string) => {
        if (/^[1-9]?$/.test(value)) {
            const newBoard = board.map((r, i) =>
                r.map((c, j) => (i === row && j === col ? value : c))
            );
            setBoard(newBoard);
        }
    };

    const handleSubmit = () => {
        console.log("Submitted Board:", board);
        const solver = new Solver();
        const loader = new Loader();
        loader.loadFromMatrix(board.map((row) => row.map(Number)));
        loader.loadByRow(solver.board.rows);
        solver.solveUntilFail();
        solver.board.alertBoard();
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-9 gap-1 border border-black w-max">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            id={`${rowIndex}-${colIndex}`}
                            type="text"
                            value={cell}
                            maxLength={1}
                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                            autoComplete="off"
                            className={`w-10 h-10 text-center border border-gray-400
                                ${rowIndex % 3 === 0 ? 'border-t-3' : ''}
                                ${colIndex % 3 === 0 ? 'border-l-3' : ''}
                                ${(rowIndex + 1) % 3 === 0 ? 'border-b-3' : ''}
                                ${(colIndex + 1) % 3 === 0 ? 'border-r-3' : ''}
                            `}
                        />
                    ))
                )}
            </div>
            <button onClick={() => { setBoard(getBlankBoard) }} className="mt-4 p-2 m-2 w-26 bg-red-500 text-white rounded">
                Clear Board
            </button>
            <button
                onClick={handleSubmit}
                className="mt-4 p-2 m-2 w-20 bg-blue-500 text-white rounded"
            >
                Solve
            </button>

        </div>
    );
};

export default SudokuBoard;
