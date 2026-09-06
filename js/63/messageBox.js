const height = 170;
const width = 240;
let topOffset = -height / 2;
let leftOffset = -width / 2;

let nextZindex = 1;

export default function (msg, buttons = ['OK'], callback) { // added button and callback params
  console.log(msg);

  const div = document.createElement('div');

  const msgDiv = document.createElement('div');
  msgDiv.innerText = msg;
  msgDiv.style.overflow = 'auto';
  msgDiv.style.height = '6.5em';
  div.appendChild(msgDiv);

  div.style.backgroundColor = 'lightcyan';
  div.style.border = '1px solid black';
  div.style.padding = '1em';
  div.style.boxSizing = 'border-box';
  div.style.height = `${height}px`; // '8.5em';
  div.style.width = `${width}px`; //'15em';

  div.style.position = 'absolute';
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.marginTop = `${topOffset}px`; // '-4.25em';
  div.style.marginLeft = `${leftOffset}px`; // '-7.5em';

  const buttonDiv = document.createElement('div'); // create ok button container
  buttonDiv.style.position = 'absolute';
  buttonDiv.style.width = '100%';
  buttonDiv.style.bottom = '1em';
  buttonDiv.style.textAlign = 'center';
  buttonDiv.style.left = '0';
  buttons.forEach(text => {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', () => {
      div.remove(); // when clicked it removes itself from the DOM (any button created here)
      if (callback) callback(text);
    });
    buttonDiv.appendChild(button);
  });
  div.appendChild(buttonDiv);

  document.body.appendChild(div);

  topOffset += 10; // helps the next message box not overlap exactly (sets off by 10px vertically)
  leftOffset += 10;

  if (topOffset + height + (window.innerHeight / 2) > window.innerHeight) {
    topOffset -= window.innerHeight - height;
  }

  if (leftOffset + width + (window.innerWidth / 2) > window.innerWidth) {
    leftOffset -= window.innerWidth - width;
  }

  div.addEventListener('click', () => {
    div.style.zIndex = nextZindex++; // bring this message box to the front when clicked
  });
}
