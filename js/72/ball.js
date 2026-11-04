const theCanvas = document.querySelector('#theCanvas'); // selector for the canvas element
const ballColorPicker = document.querySelector('#ball-color'); // selector for the ball color input

const ballSizePicker = document.querySelector('#ball-size'); // selector for the ball size input

const addBallButton = document.querySelector('#add-ball'); // selector for the add ball button
addBallButton.addEventListener('click', createBall); // add event listener to create a new ball when the button is clicked

const ballArray = []; // array to store all the balls
const context = theCanvas.getContext('2d'); // get the 2D drawing context for the canvas

function sizeCanvas() { // function to set the canvas size to the window size, changes when window size is changed
  theCanvas.width = window.innerWidth;
  theCanvas.height = window.innerHeight;
}
sizeCanvas(); // set the initial canvas size
window.addEventListener('resize', sizeCanvas);

function createBall() {
  const radius = parseInt(ballSizePicker.value);
  ballArray.push({
    x: radius + 1,
    y: radius + 1,
    dx: 1,
    dy: 2,
    radius,
    color: ballColorPicker.value
  });
}

setInterval(() => {
  context.clearRect(0, 0, theCanvas.width, theCanvas.height); // clear once per frame

  ballArray.forEach(ball => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x < ball.radius + 1 || ball.x >= window.innerWidth - (ball.radius + 1)) {
      ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius + 1 || ball.y >= window.innerHeight - (ball.radius + 1)) {
      ball.dy = -ball.dy;
    }

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
  });
}, 1);
