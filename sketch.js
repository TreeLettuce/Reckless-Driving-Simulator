var car;
var movingRoad;
var wallTop;
var wallBottom;
var x1 = 0;
var x2;
var scrollSpeed = 12;
let gameState = 'title';

function preload() {
  mytupi = loadFont('font/mytupiBOLD.ttf');
  menu = loadImage('images/menu.png');
  ggscreen = loadImage('images/gg.png');
  movingRoad = loadImage('images/road.png')
}

function setup() {
  createCanvas(1280, 960);
  frameRate(144);
  x2 = width;

//car sprite
  car = createSprite(width / 2, height / 2);
  car.addAnimation('driving', 'images/car001.png', 'images/car002.png');
  car.addAnimation('turnL', 'images/carL001.png', 'images/carL002.png');
  car.addAnimation('turnR', 'images/carR001.png', 'images/carR002.png');
  car.setCollider('rectangle', -513, -5, 225, 100);

//invis top wall sprite
  wallTop = createSprite(0, 0, 1280, 70);
  wallTop.addAnimation('normal', 'images/inviswall01.png');
  wallTop.setCollider('rectangle', 640, 35, 1280, 70);

//invis bottom wall sprite
  wallBottom = createSprite(0, 0, 1280, 70);
  wallBottom.addAnimation('normal', 'images/inviswall02.png');
  wallBottom.setCollider('rectangle', 640, 925, 1280, 70);
}

function draw() {
  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'game':
      gameStage();
      break;
    case 'gameover':
      gameOver();
      break;
  }
}

function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === 'x' || key === 'x' ) {
      gameState = 'game';
    }
  } else if (gameState === 'gameover') {
    if (key === 'x' || key === 'x' ) {
      gameState = 'game'
    }
  }
}

function titleScreen() {
  background(220);
  image(menu, 0, 0, 0, 0);
  textAlign(CENTER);
  textSize(55);
  textFont(mytupi);
  stroke(0);
  strokeWeight(6);
  fill(255, 255, 255);
  text('PRESS "X" TO START GAME', width / 2, height / 2.35);
}

function gameStage() {
  roadMoving();

//movement + turning animation
  if (keyDown('w')) {
    car.position.y = car.position.y - 8.5;
    car.changeAnimation('turnL');
  } else if (keyDown('s')) {
    car.position.y = car.position.y + 8.5;
    car.changeAnimation('turnR');
  } else {
    car.changeAnimation('driving')
  }

//draws all sprites
  drawSprites();

//side barrier death
  if(car.overlap(wallTop))
    die();
  if(car.overlap(wallBottom))
    die();

  car.debug = mouseIsPressed;
  wallTop.debug = mouseIsPressed;
  wallBottom.debug = mouseIsPressed;
}

function gameOver() {
  background(200);
  image(ggscreen, 0, 0, 0, 0)
  textAlign(CENTER);
  textSize(55);
  textFont(mytupi);
  stroke(0);
  strokeWeight(6);
  fill(255, 10, 10);
}

//infinitely scrolling background
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

function die() {
  gameState = 'gameover'
}
