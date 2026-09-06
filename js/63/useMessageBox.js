import showMessage from "./messageBox.js";

showMessage('it works!');


const msgInput = document.querySelector('#msg');

document.querySelector('#showMessage').addEventListener('submit', (e) => {
  e.preventDefault();
  showMessage(msgInput.value);
});
showMessage('Is this enough homework?', ['Yes', 'No', 'Maybe'],
  userschoice => console.log('You clicked ' + userschoice));
