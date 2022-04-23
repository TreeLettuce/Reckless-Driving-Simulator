var car;
var movingRoad;
var wallTop;
var wallBottom;
var traffic1;
var trafficGroup;
var x1 = 0;
var x2;
var scrollSpeed = 12;
let gameState = 'title';

function preload() {
  traffic01 = loadImage('images/traffic01.png');
  mytupi = loadFont('font/mytupiBOLD.ttf');
  menu = loadImage('images/menu.png');
  ggscreen = loadImage('images/gg.png');
  movingRoad = loadImage('images/road.png')
}

function setup() {
  createCanvas(1280, 960);
  frameRate(60);
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

  trafficGroup = new Group();
  score = 0
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
    if (key === 'x' || key === 'x') {
      gameState = 'game';
      car.position.x = 680
      car.position.y = 483
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
  if (car.overlap(wallTop))
    die();
  if (car.overlap(wallBottom))
    die();

  for (var i = 0; i < trafficGroup.length; i++)
    if (trafficGroup[i].position.x < car.position.x - width / 0.5) {
      trafficGroup[i].remove()
    }
  if (car.overlap(trafficGroup)) {
    die();
  }
  trafficSpawn();

  car.debug = mouseIsPressed;
  wallTop.debug = mouseIsPressed;
  wallBottom.debug = mouseIsPressed;

}

function trafficSpawn() {
  if (frameCount % 500 === 55) {
    var traffic1 = createSprite(1500, 170, 100, 100);
    traffic1.setCollider('rectangle', 0, 0, 220, 90);
    traffic1.addImage(traffic01);
    traffic1.lifetime = 200;
    trafficGroup.add(traffic1);
    traffic1.velocity.x = -(10 + 3 * score / 100);
  }
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
  text('PRESS "X" TO RESTART', width / 2, height / 1.5);
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
