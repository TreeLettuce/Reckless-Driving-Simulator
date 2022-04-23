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
  mytupi = loadFont('font/mytupiBOLD.ttf');
  menu = loadImage('images/menu.png');
  ggscreen = loadImage('images/gg.png');
  movingRoad = loadImage('images/road.png')
  traffic01 = loadImage('images/traffic01.png');
  traffic02 = loadImage('images/traffic02.png');
  traffic03 = loadImage('images/traffic03.png');
  traffic04 = loadImage('images/traffic04.png');
  traffic05 = loadImage('images/traffic05.png');
  traffic06 = loadImage('images/traffic06.png');
  traffic07 = loadImage('images/traffic07.png');
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
    car.position.y = car.position.y - 10;
    car.changeAnimation('turnL');
  } else if (keyDown('s')) {
    car.position.y = car.position.y + 10;
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

  push();
  textFont(mytupi);
  textSize(20);
  fill(255, 255, 255);
  text("SCORE: " + score, 30, 50);
  pop();

  car.debug = mouseIsPressed;
  wallTop.debug = mouseIsPressed;
  wallBottom.debug = mouseIsPressed;

}

function trafficSpawn() {
  //traffic1
  if (frameCount % 600 === 60) {
    var traffic1 = createSprite(1500, 170, 0, 0);
    traffic1.setCollider('rectangle', 0, 0, 220, 90);
    traffic1.addImage(traffic01);
    traffic1.lifetime = 200;
    trafficGroup.add(traffic1);
    traffic1.velocity.x = -(10 + 3 * score / 100);
}
  //traffic2
  if (frameCount % 1000 === 120) {
    var traffic2 = createSprite(1900, 325, 0, 0)
    traffic2.setCollider('rectangle', 0, -1, 215, 90);
    traffic2.addImage(traffic02);
    traffic2.lifetime = 200;
    trafficGroup.add(traffic2);
    traffic2.velocity.x = -(10 + 3 * score / 100);
}
  //traffic3
  if (frameCount % 500 === 1000) {
    var traffic3 = createSprite(1500, 785, 0, 0)
    traffic3.setCollider('rectangle', 0, -1, 215, 90);
    traffic3.addImage(traffic03);
    traffic3.lifetime = 200;
    trafficGroup.add(traffic3);
    traffic3.velocity.x = -(10 + 3 * score / 100);
}
  //traffic4
  if (frameCount % 500 === 90) {
    var traffic4 = createSprite(1500, 630, 0, 0)
    traffic4.setCollider('rectangle', 0, 0, 267, 125);
    traffic4.addImage(traffic04);
    traffic4.lifetime = 200;
    trafficGroup.add(traffic4);
    traffic4.velocity.x = -(10 + 3 * score / 100);
}
  //traffic5
  if (frameCount % 400 === 30) {
    var traffic5 = createSprite(1500, 630, 0, 0)
    traffic5.setCollider('rectangle', 0, 0, 267, 125);
    traffic5.addImage(traffic05);
    traffic5.lifetime = 200;
    trafficGroup.add(traffic5);
    traffic5.velocity.x = -(10 + 4 * score / 100);
}
  //traffic6
  if (frameCount % 1100 === 200) {
    var traffic6 = createSprite(1500, 480, 0, 0)
    traffic6.setCollider('rectangle', 0, 0, 267, 125);
    traffic6.addImage(traffic06);
    traffic6.lifetime = 200;
    trafficGroup.add(traffic6);
    traffic6.velocity.x = -(10 + 4 * score / 100);
}
  //traffic7
  if (frameCount % 770 === 110) {
    var traffic7 = createSprite(1400, 478, 0, 0)
    traffic7.setCollider('rectangle', 0, 0, 325, 135);
    traffic7.debug = mouseIsPressed;
    traffic7.addImage(traffic07);
    traffic7.lifetime = 200;
    trafficGroup.add(traffic7);
    traffic7.velocity.x = -(10 + 2 * score / 100);
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
