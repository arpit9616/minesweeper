/**
 * sketch.js - containing 'setup' and 'draw' funtions for
 *              p5.js along with other bootstraping variables
 */

let gameBoard = null;

function setup() {
	// Initialize the game board
	gameBoard = new Board(10, 10, 48);
	gameBoard.setMaxMines(10);

	// Initialize the canvas
	createCanvas(gameBoard.rows * gameBoard.boxSize + 1, gameBoard.cols * gameBoard.boxSize + 1);
	background(247);
}

function draw() {
	background(247);
	for (let i = 0; i < gameBoard.rows; i++) {
		for (let j = 0; j < gameBoard.cols; j++) {
			gameBoard.board[i][j].display();
		}
	}
}

function mousePressed() {
	if (!gameBoard || gameBoard.gameOver) {
		return;
	}
	const i = parseInt(mouseX / gameBoard.boxSize), j = parseInt(mouseY / gameBoard.boxSize);
	if (i < 0 || j < 0 || i >= gameBoard.rows || j >= gameBoard.cols) {
		return;
	}
	const cell = gameBoard.board[i][j];
	if (cell.contains(mouseX, mouseY)) {
		cell.explore();

		// Game over logic, player lost
		if (cell.hasBomb) {
			gameBoard.endGame();
			return;
		}

		// Empty cell board explore logic
		if (cell.surroundingMineCount == 0) {
			gameBoard.autoExplore(i, j);
		}

		// Game over logic, player won
		if (gameBoard.getUnexploredCellCount() == gameBoard.maxMines) {
			gameBoard.revealBoard();
			return;
		}

	}
}
