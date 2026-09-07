function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {

  element.style[property] = value;
}

function getCss(element, property) {

  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) { // attach an event listener to the element, and callback custom function
  element.addEventListener(eventType, callback);
}

function click(element, callback) { // our own click handler` function
  on(element, 'click', callback);
}



export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property); // if only one argument is passed, get the CSS property value (getComputedStyle)
      } else { // if two arguments are passed, set the CSS property value
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback), // this arrow func attaches an event listener to the element
    click: callback => click(element, callback),

    // hW64
    hide: function () {
      setCss(element, 'display', 'none');
    },

    //
    show: function () {
      setCss(element, 'display', 'inline-block'); // will make the element visible again through inline-block which overrides 'none'
    },
    sparkle: function (duration, speed) {
      if (speed === undefined) {
        speed = 500;
      }
      if (speed < 200) {
        speed = 200; // cant flash too fast
      }

      var colors = ['red', 'orange', 'gold', 'green', 'blue', 'purple'];
      var original = getCss(element, 'color'); // store the original color to restore it later
      var i = 0; // index

      var timer = setInterval(function () {
        setCss(element, 'color', colors[i % colors.length]); // sets the color to the next color in the array (modulo)
        i++; // equivalent to i++
      }, speed);

      setTimeout(function () { // stop the effect after the specified duration
        clearInterval(timer);
        setCss(element, 'color', original); // back to orig color
      }, duration);;
    }
  };
}

