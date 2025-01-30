import Solver from "../backend/Solver";
import Loader from "../backend/Loader";

const str_board =
    '0 3 0 6 0 7 0 1 5\n' +
    '0 1 0 5 9 0 6 0 0\n' +
    '5 6 0 3 0 0 0 7 4\n' +
    '0 7 0 0 6 0 1 2 0\n' +
    '8 0 1 0 2 0 5 6 0\n' +
    '0 9 2 7 1 5 0 0 0\n' +
    '0 0 0 2 3 9 0 5 6\n' +
    '4 0 6 0 0 0 0 0 2\n' +
    '0 0 3 0 0 0 0 8 0\n';

const str_board_hard_142 =
    '6 9 0 2 0 0 7 0 0\n' +
    '0 3 0 0 5 4 6 0 0\n' +
    '0 0 0 0 0 0 0 9 3\n' +
    '5 0 0 0 0 0 0 2 0\n' +
    '0 1 0 0 8 0 0 6 0\n' +
    '0 8 0 0 0 0 0 0 1\n' +
    '8 5 0 0 0 0 0 0 0\n' +
    '0 0 7 6 9 0 0 3 0\n' +
    '0 0 9 0 0 5 0 7 4\n';


const str_board_0 =
    '0 6 3 4 0 0 8 2 7\n' +
    '0 4 0 0 2 8 3 0 0\n' +
    '8 9 0 0 0 3 0 0 0\n' +
    '4 0 7 8 0 0 0 0 6\n' +
    '1 3 9 6 0 0 0 0 0\n' +
    '0 0 0 1 0 0 9 5 4\n' +
    '6 0 8 0 7 0 0 9 0\n' +
    '9 0 0 0 0 4 6 1 3\n' +
    '0 0 4 0 5 6 0 7 0\n';


const str_board_1 =
    '0 0 0 0 0 1 0 6 9\n' +
    '8 3 6 0 0 0 0 5 1\n' +
    '0 0 0 7 0 0 0 0 0\n' +
    '0 0 2 0 8 0 0 0 3\n' +
    '4 9 0 0 0 0 0 0 5\n' +
    '1 0 0 0 9 0 0 0 0\n' +
    '0 8 0 0 5 4 2 7 0\n' +
    '0 0 5 2 0 0 0 3 0\n' +
    '0 0 0 0 0 0 0 0 0\n';

const solver = new Solver();
const loader = new Loader(str_board);
loader.loadByRow(solver.board.rows);

solver.solveUntilFail();

solver.board.printBoard();