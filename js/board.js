/**
 * board.js - contains 'Board' class definition
 */

class Board {

	constructor(rows = 10, cols = 10, boxSize = 20) {

		this.board = null;

		this.rows = parseInt(rows);
		this.cols = parseInt(cols);
		this.boxSize = parseInt(boxSize);

		this.minMines = 1;	// fixed
		this.maxMines = 10;	// can be overwritten

		this.#initBoard();
	}

	#initBoard() {
		this.board = new Array(this.rows);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.cols);
		}
		const mineOccurances = this.#getMineOccurances();
		this.#populateBoard(mineOccurances);
	}

	#populateBoard(mineOccurances = []) {
		let num = 0;
		// Initialize cells and place mines
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.board[i][j] = new Cell(i, j, this.boxSize);
				if (mineOccurances.includes(num)) {
					this.board[i][j].placeBomb();
				}
				num++;
			}
		}
		// Calculate surrounding mine count
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.#countNearbyMines(this.board[i][j]);
			}
		}
	}

	#countNearbyMines(cell) {
		if (cell.hasBomb) {
			return;
		}
		let count = 0;
		for (let h = -1; h <= 1; h++) {
			for (let k = -1; k <= 1; k++) {
				const [_i, _j] = [cell.i + h, cell.j + k];
				if (_i >= 0 && _i < this.rows && _j >= 0 && _j < this.cols && this.board[_i][_j].hasBomb) {
					count++;
				}
			}
		}
		cell.setNeighbouringMineCount(count);
	}

	#getMineOccurances() {
		const occurances = [];
		while (occurances.length != this.maxMines) {
			const num = Math.floor(Math.random() * ((this.rows * this.cols) - 1));
			if (!occurances.includes(num)) {
				occurances.push(num);
			}
		}
		return occurances;
	}

	setMaxMines(num = 10) {
		if (typeof num == "number" && num >= this.minMines && num <= this.rows * this.cols) {
			this.maxMines = parseInt(num);
			this.#initBoard();
		}
	}

	print() {
		console.log(this.board)
	}


}
