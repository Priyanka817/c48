var path, boy, leftBoundary, rightBoundary;
var pathImg, boyImg;
var i;
var coinGroup
var opsticleGroup
var gameState = "play"
var score=0
function preload() {
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("jake1.png", "jake2.png", "jake3.png", "jake4.PNG", "jake5.png");
  coinImage = loadImage("coins.png")
  opsticleImage = loadImage("opsticals.png")
  boyEnd=loadAnimation("jake1.png")
  restartImg=loadImage('restart.png')
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  // Moving background
  path = createSprite(width / 2, height / 2);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 5;
  coinGroup = new Group()
  opsticleGroup = new Group()
  //creating boy running
  boy = createSprite(width / 2, height - 100, 30, 30);
  boy.addAnimation("end",boyEnd)
  boy.addAnimation("JakeRunning", boyImg);
boy.changeAnimation('JakeRunning')
  // create left Boundary
  //coin=createSprite(0,0,100,800);
  //leftBoundary.visible = false;
restart=createSprite(width/2+50,height/2+100)
restart.addImage(restartImg)
restart.scale=0.3
restart.visible=false
  //create right Boundary
  //rightBoundary=createSprite(410,0,100,800);
  //rightBoundary.visible = false;
}

function draw() {
  background(0);

  drawSprites();
  if (gameState === "play") {
    path.velocityY = (4 + 3*score/100);

    // boy moving on Xaxis with mouse
    boy.x = World.mouseX;

    
    //boy.collide(leftBoundary);
    //boy.collide(rightBoundary);

    //code to reset the background
    if(path.y > height ){
      path.y = height/2;
    }
    spawncoin()
    spawnopsticle()
    
    if(coinGroup.isTouching(boy)){
      coinGroup[0].destroy()
      score=score+1
    }
    if(opsticleGroup.isTouching(boy)){
      gameState="end"
    }

  }

else if(gameState==="end"){
  textSize(50)
  text("Game Over!!",width/2-100,height/2)
  path.velocityY=0
  opsticleGroup.setVelocityYEach(0)
  coinGroup.setVelocityYEach(0)
  boy.changeAnimation("end",boyEnd)
  restart.visible=true

  if(mousePressedOver(restart)){
    reset()
  }
}
  edges = createEdgeSprites();
    boy.collide(edges[3]);
   
    textSize(25)
    fill(255)
    text("score: "+score,width-200,200)

}

function reset(){
  gameState = "play";
  
  restart.visible = false;
  
  opsticleGroup.destroyEach();
  coinGroup.destroyEach();
  
  boy.changeAnimation("JakeRunning",boyImg);
  
 
  
  score = 0;
  
}


function spawncoin() {
  if (frameCount % 120 === 0) {
    var coin = createSprite(width / 2, 0, 40, 10)
    coin.x = Math.round(random(100, width - 100))
    coin.addImage(coinImage)
    coin.scale = 0.2
    coin.velocityY = 3
    coin.lifetime = 500
    //coin.depth=trex.depth
    //trex.depth=trex.depth+1
    coinGroup.add(coin)
  }
}

function spawnopsticle() {
  if (frameCount % 180 === 0) {
    var opsticle = createSprite(width / 2, 0, 40, 10)
    opsticle.x = Math.round(random(100, width - 100))
    opsticle.addImage(opsticleImage)
    opsticle.scale = 0.3
    opsticle.velocityY = (4 + 3*score/100)
    opsticle.lifetime = 500
    opsticleGroup.add(opsticle)
  }
}

