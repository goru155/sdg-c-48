var bg,bgImg;
var shooter,zombie;
var shooterImgL,shooterImgR, shooter_shootingR,shooter_shootingL,shooter_diedL,shooter_diedR;
var zombie_imgR,zombie_imgL;
var bullet,bulletsRimg;

function preload(){
  
  shooterImgL = loadImage("assets/shooter_0.png");
  shooterImgR = loadImage("assets/shooter_1.png");
  shooter_shootingL = loadImage("assets/shooter_2.png");
  shooter_shootingR = loadImage("assets/shooter_3.png");
  shooter_diedL = loadImage("assets/shooter_4.png");
  shooter_diedR = loadImage("assets/shooter_5.png");

  zombie_imgR=loadImage("assets/zombieR.png");
  zombie_imgL=loadImage("assets/zombieL.png");

  bulletsRimg=loadImage("assets/bulletR.png");

  bgImg = loadImage("assets/bg.jpeg");

}

function setup() {

  createCanvas(1536,753);  

//creating the player sprite
shooter = createSprite(768,376.5, 50, 50);
 shooter.addImage(shooterImgL);
   shooter.scale = 0.3
   shooter.setCollider("rectangle",0,0,300,300);

   bullet=createSprite(730,350,50,50);
   bullet.addImage(bulletsRimg);
   bullet.velocityX=3;


}

function draw() {
  background(bgImg); 
  textSize(15);
  fill("white");
  text("controls of the game",30,20);
  text("       W  ",30,40);
  text(" A    S    D",30,60);
  text("to move the player",30,80);
  text("F to shoot the left zombies",30,100);
  text("R to shoot the right zombies",30,120);

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

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("r")){
  shooter.addImage(shooterImgR)
}

if(keyWentDown("f")){
  shooter.addImage(shooter_shootingL)
}
else 
if(keyWentUp("f")){
  shooter.addImage(shooterImgL)
}

zombieR();
zombieL();
shootingR();

drawSprites();

}

function zombieR(){
  if(frameCount%150===0){
    var zombie=createSprite(1530,random(150,550),50,50);
    zombie.addImage(zombie_imgR);
    zombie.scale=0.12;
    zombie.velocityX=-2;
    zombie.lifetime=375;
  }


}

function zombieL(){
  if(frameCount%150===0){
    var zombie=createSprite(10,random(200,550),50,50);
    zombie.addImage(zombie_imgL);
    zombie.scale=0.12;
    zombie.velocityX=2;
    zombie.lifetime=375;
  }
}

function shootingR(){
  if(keyWentDown("r")){
    var bulletR=createSprite(730,350,50,50);
    bullet.addImage(bulletsRimg);
    bullet.velocityX=3;
    shooter.addImage(shooter_shootingR);
  }else if(keyWentUp("r")){
    shooter.addImage(shooterImgR);
  }
}
