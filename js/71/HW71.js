// practicing prototype

const vehicleFunctions = {
    go(speed) {
        this.speed = speed;
        console.log(`${this.color} vehicle is going at ${this.speed} mph`);
    },
    print() {
        console.log(`This is a ${this.color} vehicle`);
    }
};
function createVehicle(color) {
    const vehicle = Object.create(vehicleFunctions);
    vehicle.color = color;
    return vehicle;
}

const myVehicle = createVehicle('red');
myVehicle.go(60);

const planeFunctions = {
    go(speed) { // creating our own go() method
        this.speed = speed;
        console.log(`${this.color} plane is flying at ${this.speed} mph`); // we override the go method for planes, so prototype's go is not used
    },
};

function createPlane(color) {
   const p = createVehicle(color);
   Object.assign(p, planeFunctions);
   return p;
}

const myPlane = createPlane('blue');
myPlane.go(500); // we used vehicleFunctions for plane as well
myPlane.print();


function createCar(color) {
    const v = Object.create(vehicleFunctions); // create an empty object with vehicleFunctions as its prototype which has in it it all the funcs from vehicleFunctions
    v.color = color; // on this line what happens is we are adding a color property to the object v, which will be used by the methods inherited from vehicleFunctions
    return v;
}

const v2 = createCar('green'); 
v2.go(80);
v2.print();


const planeProto = Object.create(vehicleFunctions); // create a prototype from vehicleFunctions for planes to inherit from, creates an empty object 
planeProto.go = function(speed) {
    this.speed = speed;
    console.log(`${this.color} plane is flying at ${this.speed} mph`);
};

function createPlane2(color) {
    const p = Object.create(planeProto); // this obj's prototype wil have all the methods from vehicleFunctions as its prototype, and the go method overridden for planes
    p.color = color;
    return p;
}
const myPlane2 = createPlane2('white');
myPlane2.go(600);
myPlane2.print();
