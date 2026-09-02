let index = 1;
document.querySelector('#btn1').addEventListener('click', function () {
    createButton();

});

function createButton() {
    const newButton = document.createElement('button');
    newButton.textContent = `Button ${index}`;
    index++;
    newButton.addEventListener('click', createButton); // recursion.....
    document.body.appendChild(newButton);
}