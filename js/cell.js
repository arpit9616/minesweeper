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
		this.isExplored = false;

		this.mineColor = null;
		this.surroundingMineCount = -1;
	}

	placeBomb() {
		this.hasBomb = true;
		this.mineColor = "red";
	}

	setNeighbouringMineCount(count = -1) {
		this.surroundingMineCount = count;
	}

	contains(y, x) {
		return Boolean(x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
	}

	defuse() {
		this.isExplored = true;
		if (this.hasBomb) {
			this.mineColor = "green";
		}
	}

	explore() {
		this.isExplored = true;
	}

	display() {
		stroke(0);
		noFill();
		rect(this.y, this.x, this.size, this.size);
		if (this.isExplored) {
			if (this.hasBomb) {
				fill(this.mineColor);
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
