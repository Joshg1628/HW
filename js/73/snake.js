const theCanvas = document.querySelector('#theCanvas');

const context = theCanvas.getContext('2d');

const SNAKE_SIZE = 64;

function sizeCanvas() {
  theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE); // this will 
  theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const snakeHead = document.createElement('img');
const snakeBody = document.createElement('img');
const snakeTail = document.createElement('img');
const apple = document.createElement('img');
let x = -SNAKE_SIZE;
let y = 0;
let direction = 'ArrowRight'; // default direction is right
let score = 0;
let intervalIncrease = 5000; // initial interval for drawing the apple
let timeUntilApple = intervalIncrease; // time remaining until the next apple appears
let appleArray = []; // array to store all the apples on the canvas




snakeHead.src = 'snakeHead.png';
snakeBody.src = 'snakeBody.png';
snakeTail.src = 'snakeTail.png';
apple.src = 'apple.png';

const sounds = {
  gameOver: new Audio('gameOver.wav'),
  eat: new Audio('eat.wav'),
  grow: new Audio('grow.wav')
};

class apples {
  constructor() {
    this.x = Math.floor(Math.random() * (theCanvas.width / SNAKE_SIZE)) * SNAKE_SIZE; // random x position aligned to the grid
    this.y = Math.floor(Math.random() * (theCanvas.height / SNAKE_SIZE)) * SNAKE_SIZE; // random y position aligned to the grid
  }

  draw() {
    context.drawImage(apple, this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
  }
}




snakeHead.onload = () => {
  setInterval(() => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height); // clear the canvas before drawing the new position of the snake head
    timeUntilApple -= 500;
    if (timeUntilApple <= 0) {
      appleArray.push(new apples()); // a NEW apple at a new random spot
      intervalIncrease = Math.max(2000, intervalIncrease - 50); // this sets interval to the next apple appearance time, but never less than 2000ms
      timeUntilApple = intervalIncrease; // reset the countdown for the next apple appearance
    }
    appleArray.forEach(apple => apple.draw());

    if (appleArray.some(apple => apple.x === x && apple.y === y)) {
      score++;
      sounds.eat.play();
      appleArray = appleArray.filter(apple => apple.x !== x || apple.y !== y);
    }
    switch (direction) { // listen for the direction of the snake head and move it accordingly
      case 'ArrowUp':
        y -= SNAKE_SIZE;
        break;
      case 'ArrowDown':
        y += SNAKE_SIZE;
        break;
      case 'ArrowLeft':
        x -= SNAKE_SIZE;
        break;
      case 'ArrowRight':
        x += SNAKE_SIZE;
        break;
    }


    // the head image faces right, so rotate it to face the current direction
    const angles = { ArrowRight: 0, ArrowDown: Math.PI / 2, ArrowLeft: Math.PI, ArrowUp: -Math.PI / 2 };
    context.save(); // 
    context.translate(x + SNAKE_SIZE / 2, y + SNAKE_SIZE / 2); // move to the center of the head's tile
    context.rotate(angles[direction]);
    context.drawImage(snakeHead, -SNAKE_SIZE / 2, -SNAKE_SIZE / 2, SNAKE_SIZE, SNAKE_SIZE);
    context.drawImage(snakeTail, -SNAKE_SIZE * 1.5, -SNAKE_SIZE / 2, SNAKE_SIZE, SNAKE_SIZE); // draw the body image at the same position as the head
    context.restore();



    context.fillStyle = 'green';
    context.font = '32px Cursive'; //  
    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText); // measuring the width of the score text.
    context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 36);
    // intervalIncrease = -20; // decrease the interval for drawing the apple
    // 


    if (x < 0 || x >= theCanvas.width || y < 0 || y >= theCanvas.height) { // if we hit the wall, game over



      sounds.gameOver.play(); // play the game over sound
      x = -SNAKE_SIZE;
      y = 0;
      direction = 'ArrowRight';
      score = 0;
      appleArray = []; // clear all apples when the game is over
    }
  }, 500);

};




window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      direction = e.key;
      break;
    default:
      console.log(`${e.key} not processed`); // log error to console for debugging
  }
});


