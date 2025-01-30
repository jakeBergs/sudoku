import Square from '../Square';

const square = new Square(1, 2, 3);

describe('Square is initialized correctly', () => {
    it('should have correct columns', () => {
        expect(square.row).toBe(1);
        expect(square.column).toBe(2);
        expect(square.box).toBe(3);
    });
});