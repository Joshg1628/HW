// JavaScript for Mr. Potato Head Game, dragging practice
let offset;
let grabbedpart = null;
let partZIndex = 1;

const savedPieces = JSON.parse(localStorage.getItem('potatoPieces')) ?? [];
const music = new Audio('spud-bounce.mp3');

const select = document.getElementById('music-select');
const toggle = document.getElementById('music-toggle');
music.loop = true;
music.volume = 0.5;

window.addEventListener('mousedown', e => {
    if (e.target.classList.contains('part')) {
        e.preventDefault();
        console.log('mouse down', e); // for debuuging
        grabbedpart = e.target;
        grabbedpart.style.zIndex = partZIndex++;
        // getBoundingClientRect probably better then offset
        offset = { x: e.offsetX, y: e.offsetY };

        window.addEventListener('mousemove', handleMouseMove);

        window.addEventListener('mouseup', handleMouseUp);
    }
});


function handleMouseMove(e) {
    console.log('mouse move', e); // e captures the mouse event, CAN be used to track the mouse position


    grabbedpart.style.position = 'absolute';
    grabbedpart.style.top = `${e.clientY - offset.y}px`; // set the top position of the dragged element
    grabbedpart.style.left = `${e.clientX - offset.x}px`;

}

function handleMouseUp(e) {
    console.log('mouse up');

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    grabbedpart = null;
    offset = null;
    savePieces(); // saves the current positions of the pieces to localStorage of teh browser

}

function savePieces() {
    const pieces = [];

    document.querySelectorAll('.part').forEach(part => {
        if (part.style.position === 'absolute') {   // means that piece was dragged
            pieces.push({
                src: part.getAttribute('src'), // the source of the pic
                top: part.style.top,
                left: part.style.left,
                zIndex: part.style.zIndex // save what pice is on top of what
            });
        }
    });

    localStorage.setItem('potatoPieces', JSON.stringify(pieces));
}



select.addEventListener('change', () => { // choosing Song from the list options for songs
    music.src = select.value;
    music.play();
    toggle.textContent = 'Pause';
});

toggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggle.textContent = 'Pause';
    } else {
        music.pause();
        toggle.textContent = 'Play';
    }
});

savedPieces.forEach(saved => {
    const part = document.querySelector(`img[src="${saved.src}"]`); // if the part exists in the DOM
    part.style.position = 'absolute';
    part.style.top = saved.top;
    part.style.left = saved.left;
    part.style.zIndex = saved.zIndex;
    
});

document.getElementById('reset-pieces').addEventListener('click', () => {
    localStorage.removeItem('potatoPieces');
    location.reload(); // reload te page to position pices correctly
});