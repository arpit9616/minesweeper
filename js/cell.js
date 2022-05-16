/**
 * cell.js - contains 'Cell' class definition
 */

class Cell {

	constructor(i, j, boxSize) {

		this.i = i;
		this.j = j;
		this.size = boxSize;

		this.y = this.i * this.size;
		this.x = this.j * this.size;

		this.hasBomb = false;
		this.isRevealed = false;

		this.surroundingMineCount = -1;
	}

	placeBomb() {
		this.hasBomb = true;
	}

	setNeighbouringMineCount(count = -1) {
		this.surroundingMineCount = count;
	}

	display() {
		stroke(0);
		noFill();
		rect(this.y, this.x, this.size, this.size);
		if (this.isRevealed) {
			if (this.hasBomb) {
				fill("red");
				rect(this.y, this.x, this.size, this.size);
			} else {
				fill(203);
				rect(this.y, this.x, this.size, this.size);
				if (this.surroundingMineCount > 0) {
					textAlign(CENTER);
					fill(0);
					text(this.surroundingMineCount, this.y + this.size * 0.5, this.x + this.size * 0.6);

				}
			}
		}
	}

}
