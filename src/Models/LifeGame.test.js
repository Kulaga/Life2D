import CellState from "./CellState";
import LifeGame from "./LifeGame";
import * as _ from 'underscore';
import Cell from "./Cell";

test("empty board should lead to end of game", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result).toStrictEqual(null);
})

test("get neighbors inside board should be correct", () => {
    const sut = new LifeGame(4, 4);

    const result = sut.getNeighborsIndexes(1, 1);

    expect([...result].sort()).toEqual([
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(0, 2),
        new Cell(1, 0),
        new Cell(1, 2),
        new Cell(2, 0),
        new Cell(2, 1),
        new Cell(2, 2),
    ]);
})

test("neighbors are located on torus", () => {
    const sut = new LifeGame(3, 3);

    const result = sut.getNeighborsIndexes(0, 0);

    expect(result.sort()).toEqual([
        new Cell(2, 2),
        new Cell(2, 0),
        new Cell(2, 1),
        new Cell(0, 2),
        new Cell(0, 1),
        new Cell(1, 2),
        new Cell(1, 0),
        new Cell(1, 1),
    ]);
})

test("neighbors are located on torus", () => {
    const sut = new LifeGame(3, 3);

    const result = sut.getNeighborsIndexes(2, 2);

    expect(result.sort()).toEqual([
        new Cell(1, 1),
        new Cell(1, 2),
        new Cell(1, 0),
        new Cell(2, 1),
        new Cell(2, 0),
        new Cell(0, 1),
        new Cell(0, 2),
        new Cell(0, 0),
    ]);
})

test("cell should dead because of overpopulation case 1", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[1][1]).toBe(CellState.Dead);
    expect(result[1][2]).toBe(CellState.Dead);
})

test("random cell should dead because of overpopulation case 2", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Alive, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[1][1]).toBe(CellState.Dead);
    expect(result[1][2]).toBe(CellState.Dead);
})

test("random cell should dead because of overpopulation case 3", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Alive, CellState.Alive, CellState.Dead, CellState.Alive],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Alive, CellState.Dead, CellState.Dead, CellState.Alive]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[0][0]).toBe(CellState.Dead);
    expect(result[3][0]).toBe(CellState.Dead);
})

test("cell should dead because of underpopulation", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Alive, CellState.Alive],
        [CellState.Dead, CellState.Alive, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[2][1]).toBe(CellState.Dead);
})

test("cell should contain life if there are three live neighbours case 1", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[1][1]).toBe(CellState.Alive);
})

test("cell should contain life if there are three live neighbours case 1", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Alive, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Alive, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Alive, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result[2][1]).toBe(CellState.Alive);
    expect(result[2][3]).toBe(CellState.Alive);
})

test("game should stop if next iteration didnt change", () => {
    const sut = new LifeGame(4, 4);
    const currentState = [
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead, CellState.Dead]
    ]

    const result = sut.getNextIteration(currentState);

    expect(result).toBeNull();
})
