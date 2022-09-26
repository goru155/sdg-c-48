var bg,bgImg;
var shooter,shooterImgL,shooterImgR, shooter_shootingR,shooter_shootingL,shooter_diedL,shooter_diedR;
var zombie_imgR,zombie_imgL,zombieL,zombieR,zombieGrpL,zombieGrpR;
var bulletsRimg,bulletsLimg,bulletL,bulletR,bulletGrpL,bulletGrpR;
var topwall,rightwall,bottomwall,leftwall;
var dieSound,winSound,zomDSound;
var score=0;
var life,life_img;

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

  dieSound=loadSound("assets/lose.mp3");
  winSound=loadSound("assets/win.mp3");
  zomDSound=loadSound("assets/explosion.mp3");

  life_img=loadImage("assets/heart_1.png")

  bgImg = loadImage("assets/bg.jpeg");

}

function setup() {

  createCanvas(1536,753);  

//creating the player sprite
  shooter = createSprite(768,376.5, 30, 10);
  shooter.addImage(shooterImgL);
  shooter.scale = 0.3
  shooter.setCollider("rectangle",0,0,250,460);

  life=createSprite(1470,85,20,20);
  life.addImage(life_img);
  life.scale=0.15;

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
  bulletGrpR=new Group();
  zombieGrpR=new Group();

  zombieR=createSprite(1530,random(150,550),50,50);
  zombieR.addImage(zombie_imgR);
  zombieR.scale=0.12;
  zombieR.velocityX=-2;
  zombieR.lifetime=400;
  zombieGrpR.add(zombieR);

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
  zombieL.debug=true
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
  text("to win the game get score = 69",30,145);
  textSize(25);
  text("SCORE: "+ score,1380,50);
  text("LIFE :",1380,90);

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

if(bulletGrpL.isTouching(zombieGrpL)||bulletGrpR.isTouching(zombieGrpL)){
for(var i=0;i<zombieGrpL.length;i++){ 
  if(bulletGrpL.isTouching(zombieGrpL[i])||bulletGrpR.isTouching(zombieGrpL[i])){ 
  zombieGrpL[i].destroy(); 
  bulletGrpL.destroyEach();
  bulletGrpR.destroyEach(); 
  score+=1;
  }
}
}

if(zombieGrpR.isTouching(bulletGrpR)||bulletGrpL.isTouching(zombieGrpR)){
for(var i=0;i<zombieGrpR.length;i++){ 
  if(bulletGrpR.isTouching(zombieGrpR[i])||bulletGrpL.isTouching(zombieGrpR[i])){ 
  zombieGrpR[i].destroy(); 
  bulletGrpR.destroyEach();
  bulletGrpL.destroyEach();
  score+=1; 
  }
}
}

if(score===69){
winSound.play();
}

ffa()
gameEnd()

drawSprites();

}

function ffa(){
  if(frameCount%250===0){
    zombieR=createSprite(1530,random(100,650),50,50);
    zombieR.addImage(zombie_imgR);
    zombieR.scale=0.12;
    zombieR.velocityX=-2;
    zombieR.lifetime=750;
    zombieGrpR.add(zombieR);
  }

  if(frameCount%250===0){
    zombieL=createSprite(10,random(100,650),50,50);
    zombieL.addImage(zombie_imgL);
    zombieL.scale=0.12;
    zombieL.velocityX=2;
    zombieL.lifetime=750;
    zombieGrpL.add(zombieL);
  }

  if(keyWentDown("r")){
    bulletR=createSprite(shooter.x,shooter.y,50,50);
    bulletR.addImage(bulletsRimg);
    bulletR.velocityX=100;
    bulletR.scale=0.2;
    bulletGrpR.add(bulletR);
    shooter.addImage(shooter_shootingR);
  }else if(keyWentUp("r")){
    shooter.addImage(shooterImgR);
  }

  if(keyWentDown("f")){
    bulletL=createSprite(shooter.x,shooter.y,50,50);
    bulletL.addImage(bulletsLimg);
    bulletL.velocityX=-100;
    bulletL.scale=0.2;
    bulletGrpL.add(bulletL);
    shooter.addImage(shooter_shootingL);
  }else if(keyWentUp("f")){
    shooter.addImage(shooterImgL);
  }
}

function gameEnd(){
 
  if(zombieGrpR.isTouching(shooter)||zombieGrpL.isTouching(shooter)){
    for(var i = 0;i < zombieGrpL.length; i++){
      dieSound.play();
      shooter.destroy();
      life.destroy();
      zombieGrpL[i].destroyEach();
    }

    for(var i = 0;i < zombieGrpR.length; i++){
      dieSound.play();
      shooter.destroy();
      life.destroy();
      zombieGrpR[i].destroyeach();
    }
  }
}