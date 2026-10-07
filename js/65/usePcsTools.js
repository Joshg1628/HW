import $ from "./pcsTools.js";
const potus = $('#potus'); // wrapped with our custom pcsTools wrapper ($)
potus.css('color', 'orange');
potus.click(() => console.log('potus was clicked'));
potus.on('mouseenter', () => potus.css('backgroundColor', 'blue'));
potus.on('mouseleave', () => potus.css('backgroundColor', 'white'));

//potus.css('fontFamily', 'cursive');
console.log(potus.css('fontFamily'));

potus.css('position', 'absolute');
potus.css('bottom', 0);


$('h1').css('fontSize', '3em');


potus.hide();  // hides css through 'display: none'
setTimeout(function () {
  potus.show();  // show in inline-block which overrides 'none'
}, 2000);

$('h1').sparkle(6000, 400);

// testing setOrGetText
console.log(potus.setOrGetText());
potus.setOrGetText('Testing 123');
console.log(potus.setOrGetText());


