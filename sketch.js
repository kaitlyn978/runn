var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running,player_collided;
var ground, invisibleGround, groundImage;

var bg;
var stump,stump_img;
var star,star_img;
var obstaclesGroup,starGroup;
var score;

function preload(){
  player_running=loadAnimation("player1.png","player2.png","player3.png","player4.png","player5.png","player6.png","player7.png","player8.png")
  bg=loadImage("images/bg.jpg");
  star_img=loadImage("images/star.png");
  stump_img=loadImage("images/stump.png");
}

function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  
  player.addAnimation("running", player_running);
  //player.addAnimation("collided", player_collided);
  //trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup=new Group();
  starGroup=new Group();
  score=0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && player.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END){
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    //change the trex animation
    //player.changeAnimation("collided",player_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    star = createSprite(600,120,40,10);
    star.y = Math.round(random(80,120));
  star.addImage(star_img);
    star.scale = 0.5;
    star.velocityX = -3;
    
     //assign lifetime to the variable
    star.lifetime = 200;
    
    //adjust the depth
    star.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    starGroup.add(star);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var stump = createSprite(600,165,10,40);
    //obstacle.debug = true;
    stump.velocityX = -(6 + 3*score/100);
    stump = Math.round(random(0,400));
    //generate random obstacles
    stump.addImage("herdle",stump_img);
    
    //assign scale and lifetime to the obstacle           
    stump.scale = 0.5;
    stump.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(stump);
  }
}

function reset(){
  
  obstaclesGroup.destroyEach();
  starGroup.destroyEach();
  
  //player.changeAnimation("running",player_running);
  
 
  
  score = 0;
  
}