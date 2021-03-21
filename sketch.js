var backImage,backgr;
var ship, ship_sailing;
var ground,ground_img;

var ammoGroup, ammoImage;
var navyGroup, obstacle_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0;
var attempts=3;

function preload(){
  backImage = loadImage("ocean.png");
  ship_sailing = loadAnimation("Pirate.ship.png");
  ammoImage = loadImage("ammo.png");
  navy_img = loadImage("Navy.ship.png"); 
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  ship = createSprite(100,340,20,50);
  ship.addAnimation("sailing",ship_sailing);
  ship.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  ammoGroup = new Group();
  navyGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(ammoGroup.isTouching(ship)){
      ammoGroup.destroyEach();
      ammo.scale += 0.05
      score = score + 5;
    }
  
    if(keyDown("space") ) {
      ship.velocityY = -12;
    }
    ship.velocityY = ship.velocityY + 0.8;
  
    ship.collide(ground);
    spawnammo();
    spawnnavy();  
 
    if(navyGroup.isTouching(ship)){ 
        gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    ship.visible = false;
    
    ammoGroup.destroyEach();
    navyGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300,220);
  }
}

function spawnammo() {
  //write code here to spawn the ammo
  if (frameCount % 80 === 0) {
    var ammo = createSprite(600,250,40,10);
    ammo.y = random(120,200);    
    ammo.addImage(ammoImage);
    ammo.scale = 0.05;
    ammo.velocityX= -4; 
    
    ammo.lifetime = 300;
    ship.depth = ammo.depth + 1;
    ammoGroup.add(ammo);
  }
}

function spawnnavy() {
  //write code here to spawn the navy ship
  if(frameCount % 300 === 0) {
    var navy = createSprite(800,350,10,40);
    navy.velocityX=-(4 + 2*score/100); 
    navy.addImage(navy_img);
    
    navy.scale = 0.2;
    navy.lifetime = 300;
    navyGroup.add(navy);
  }
}