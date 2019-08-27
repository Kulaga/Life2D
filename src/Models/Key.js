class Key {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this._separator = ","
    }

    toString() {
        return this.rowNum.toString() + this._separator + this.colNum.toString();
    }
}

export default Key;