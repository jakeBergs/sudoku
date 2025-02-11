import React from 'react';
import SudokuBoard from './SudokuBoard';
import TestComponent from './TestComponent';

const App: React.FC = () => {
    return (
        <div className='container flex flex-col justify-center items-center space-x-4'>
            <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
            <SudokuBoard />
            {/* <TestComponent /> */}
        </div>
    );
};

export default App;