var car;
var movingRoad;

var x1 = 0
var x2;
var scrollSpeed = 12

function preload() {

  mytupi = loadFont('font/mytupiBOLD.ttf');
  menu = loadImage('images/menu.png');
  movingRoad = loadImage('images/road.png')
}

function setup() {
  createCanvas(1280, 960);
  x2 = width;

  car = createSprite(width/2, height/2);
  car.addAnimation('driving', 'images/car001.png', 'images/car002.png');
  car.addAnimation('turnL', 'images/carL001.png', 'images/carL002.png');
  car.addAnimation('turnR', 'images/carR001.png', 'images/carR002.png');
}

function draw() {
  background(220);
  roadMoving();

  if(keyDown('w')) {
  car.position.y = car.position.y - 8.5;
    car.changeAnimation('turnL');
} else if(keyDown('s')){
    car.position.y = car.position.y + 8.5;
      car.changeAnimation('turnR');
}
  else {
    car.changeAnimation('driving')
  }

  drawSprites();
}

function roadMoving() {

  image(movingRoad, x1, 0, width + 12, height);
  image(movingRoad, x2, 0, width + 12, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
}
