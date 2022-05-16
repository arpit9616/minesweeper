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
