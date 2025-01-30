import Square from '../backend/Square';

export interface grouping {
    [key: number]: Square[]
}

export type ValuePositions = {
    [key: number]: number[];
};

export enum SectionType {
    ROW,
    COLUMN,
    BOX
}