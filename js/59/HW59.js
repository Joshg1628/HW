'use strict';

function multiply(a, b) {
    return a * b;
}

console.log(multiply(2, 3));
console.log(multiply(4, 5));

function getMultiplier() {
    return function(a, b) {
        return a * b;
    };
}

const multiplier = getMultiplier();
console.log(multiplier(6, 7));
console.log(multiplier(8, 9));

function getBetterMultiplier(a) {
    return function(b) {
        return a * b;
    };
}

const multiplyByTwo = getBetterMultiplier(2);
console.log(multiplyByTwo(5));
console.log(multiplyByTwo(10));

const letters = ['a', 'b', 'C', 'D', 'E'];

function ourOwnEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false; // if its false by any of the elements will return false and exit right away
        }
    }
    return true;
}

console.log(ourOwnEvery(letters, function (letter) {
    return (letter === letter.toUpperCase()) ;
}));

console.log(ourOwnEvery(letters, function (letter) {
    return (letter === letter.toLowerCase());
}));

function isLowerCase(letter) {
    return (letter === letter.toLowerCase());
}
console.log(letters.every(isLowerCase)); // logs true

function ourOwnSome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true; // if its true by any of the elements will return true
        }
    }
    return false; 
}

console.log(ourOwnSome(letters, function (letter) {
    return (letter === letter.toLowerCase());
}));

console.log(ourOwnSome(letters, function (letter) {
    return (letter === letter.toUpperCase());
}));

console.log(letters.some(function (n){
    return (n === n.toUpperCase());
}));