var bg,bgImg,shooter;
var shooterImgL,shooterImgR, shooter_shootingR,shooter_shootingL,shooter_diedL,shooter_diedR;
var zombie_imgR,zombie_imgL,zombieL,zombieR,zombieGrpL;
var bulletsRimg,bulletsLimg,bulletL,bulletR,bulletGrpL;
var topwall,rightwall,bottomwall,leftwall;
var dieSound,winSound;
var score=0;

function preload(){
  
  shooterImgL = loadImage("assets/shooter_0.png");
  shooterImgR = loadImage("assets/shooter_1.png");
  shooter_shootingR = loadImage("assets/shooter_2.png");
  shooter_shootingL = loadImage("assets/shooter_3.png");
  shooter_diedL = loadImage("assets/shooter_4.png");
  shooter_diedR = loadImage("assets/shooter_5.png");

  zombie_imgR=loadImage("assets/ZombieR2.png");
  zombie_imgL=loadImage("assets/ZombieL1.png");

  bulletsRimg=loadImage("assets/BulletR2.png");
  bulletsLimg=loadImage("assets/BulletL1.png");

  dieSound=loadSound("assets/explosion.mp3");

  bgImg = loadImage("assets/bg.jpeg");

}

function setup() {

  createCanvas(1536,753);  

//creating the player sprite
  shooter = createSprite(768,376.5, 50, 50);
  shooter.addImage(shooterImgL);
  shooter.scale = 0.3
  shooter.setCollider("rectangle",0,0,300,300);

  topwall= createSprite(768,5,1536,10);
  rightwall=createSprite(1531,376.5,10,753);
  bottomwall=createSprite(768,748,1536,10);
  leftwall=createSprite(5,376.5,10,753);
  topwall.shapeColor="black";
  rightwall.shapeColor="black";
  bottomwall.shapeColor="black";
  leftwall.shapeColor="black";

  bulletGrpL=new Group();
  zombieGrpL=new Group();

  zombieR=createSprite(1530,random(150,550),50,50);
  zombieR.addImage(zombie_imgR);
  zombieR.scale=0.12;
  zombieR.velocityX=-2;
  zombieR.lifetime=400;

  bulletR=createSprite(shooter.x,shooter.y,50,50);
  bulletR.addImage(bulletsRimg);
  bulletR.velocityX=100;
  bulletR.scale=0.2;

  bulletL=createSprite(shooter.x,shooter.y,50,50);
  bulletL.addImage(bulletsLimg);
  bulletL.velocityX=-100;
  bulletL.scale=0.2;

  zombieL=createSprite(10,random(200,550),50,50);
  zombieL.addImage(zombie_imgL);
  zombieL.scale=0.12;
  zombieL.velocityX=2;
  zombieL.lifetime=400;
  zombieGrpL.add(zombieL);
  
}

function draw() {
  background(bgImg); 
  textSize(15);
  fill("white");
  text("controls of the game",35,25);
  text("       W  ",30,45);
  text(" A    S    D",30,65);
  text("to move the player",30,85);
  text("F to shoot the left zombies",30,105);
  text("R to shoot the right zombies",30,125);
  textSize(25);
  text("SCORE: "+ score,1380,50);

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("w")){
  shooter.y = shooter.y-30
}

if(keyDown("s")){
  shooter.y = shooter.y+30
}

if(keyDown("a")){
  shooter.x = shooter.x-30
  shooter.addImage(shooterImgL)
}

if(keyDown("d")){
  shooter.x = shooter.x+30
  shooter.addImage(shooterImgR)
}

if(shooter.isTouching(topwall)||shooter.isTouching(rightwall)||shooter.isTouching(leftwall)||shooter.isTouching(bottomwall)){
  shooter.x=768;
  shooter.y=376.5;
}
if(zombieGrpL.isTouching(bulletGrpL)){
for(var i=0;i<zombieGrpL.length;i++){ 
  if(zombieGrpL[i].isTouching(bulletGrpL)){ 
  zombieGrpL[i].destroyEach(); 
  bulletGrpL.destroyEach(); 
  }
}
}

ffa()

drawSprites();

}

function ffa(){
  if(frameCount%150===0){
    zombieR=createSprite(1530,random(150,550),50,50);
    zombieR.addImage(zombie_imgR);
    zombieR.scale=0.12;
    zombieR.velocityX=-2;
    zombieR.lifetime=400;
  }

  if(frameCount%150===0){
    zombieL=createSprite(10,random(200,550),50,50);
    zombieL.addImage(zombie_imgL);
    zombieL.scale=0.12;
    zombieL.velocityX=2;
    zombieL.lifetime=400;
    zombieGrpL.add(zombieL);
  }

  if(keyWentDown("r")){
    bulletR=createSprite(shooter.x,shooter.y,50,50);
    bulletR.addImage(bulletsRimg);
    bulletR.velocityX=100;
    bulletR.scale=0.2;
    shooter.addImage(shooter_shootingR);
  }else if(keyWentUp("r")){
    shooter.addImage(shooterImgR);
  }

  if(keyWentDown("f")){
    bulletL=createSprite(shooter.x,shooter.y,50,50);
    bulletL.addImage(bulletsLimg);
    bulletL.velocityX=-100;
    bulletL.scale=0.2;
    shooter.addImage(shooter_shootingL);
  }else if(keyWentUp("f")){
    shooter.addImage(shooterImgL);
  }
}
