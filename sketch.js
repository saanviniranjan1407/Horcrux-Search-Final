const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "PLAY";
var life = 3;

var backgroundImage;
var voldemortImage, voldemort;
var dementorImage, dementor;
var harry, harryImage;
var stone, diary, ring, locket, cup, diadem, nagini;
var stoneImage, diaryImage, ringImage, locketImage, cupImage, diademImage, naginiImage;
var revivingPotionImage;
var hpBackgrund, hpHorcrux;
var life1, life2, life3;
var lifeImage;
var stoneCounter = 0;
var diaryCounter = 0;
var ringCounter = 0
var locketCounter = 0;
var cupCounter = 0;
var diademCounter = 0;
var naginiCounter = 0;

var score = 0;

function preload(){
  backgroundImage = loadImage('images/Castle2.gif');
  voldemortImage = loadImage('images/Voldemort2.png');
  dementorImage = loadImage('images/Dementor.gif');
  harryImage = loadImage('images/HarryPotter.png');
  stoneImage = loadImage('images/PhilosophersStone.png');
  diaryImage = loadImage('images/Tomriddediary2.png');
  ringImage = loadImage('images/slytherinring2.png');
  locketImage = loadImage('images/Slytherinslocket.png');
  cupImage = loadImage('images/Hufflepuffscup.png');
  diademImage = loadImage('images/Ravenclawsdiadem2.png');
  naginiImage = loadImage('images/Nagini2.png');
  revivingPotionImage = loadImage('images/RevivingPotion.png');
  hpBackground = loadSound('images/fantasy.mp3');
  hpHorcrux = loadSound('images/horcrux.mp3');
  lifeImage = loadImage('images/RevivingPotion.png')
}

function setup() {
  createCanvas(1350,650);
  rectMode(CENTER);
  engine = Engine.create();
  world = engine.world;

  voldemort = createSprite(50,315,10,10);
  voldemort.addImage(voldemortImage);
  voldemort.scale = 0.6;

  life1 = createSprite(30,620,10,10);
  life1.addImage(lifeImage);
  life1.scale = 0.1;

  life2 = createSprite(80,620,10,10);
  life2.addImage(lifeImage);
  life2.scale = 0.1;

  life3 = createSprite(130,620,10,10);
  life3.addImage(lifeImage);
  life3.scale = 0.1;

  hpBackground.loop();

  //harry = new Harry(450,325,300,150);

  harry = createSprite(450,325,300,150);
  harry.addImage(harryImage);
  harry.scale = 0.5;
  harry.setCollider("rectangle", 0, 0, 500, 200);

  dementorGroup1 = new Group();
  dementorGroup2 = new Group();
  stoneGroup = new Group();
  diaryGroup = new Group();
  ringGroup = new Group();
  locketGroup = new Group();
  cupGroup = new Group(); 
  diademGroup = new Group();
  naginiGroup = new Group();
}

function draw() {
  Engine.update(engine); 

  rectMode(CENTER);
  background(backgroundImage);

  textSize(40);
  text("Score: " + score, 675, 50);

  if(gameState === "PLAY"){
    harry.y = mouseY;
    //harry.x = mouseX;
    
    harry.display();

    for (var i = 0; i < dementorGroup1.length; i++){
      if (dementorGroup1.get(i).isTouching(harry)){
        dementorGroup1.get(i).destroy(); 
        life = life - 1 ; 
      } 
    }

    for (var i = 0; i < dementorGroup2.length; i++){
      if (dementorGroup2.get(i).isTouching(harry)){
        dementorGroup2.get(i).destroy(); 
        life = life - 1 ; 
      } 
    }

    if(life === 2){
      life3.visible = false;
    }

    if(life === 1){
      life2.visible = false;
    }

    if(life === 0){
      life1.visible = false;
      gameState = "END";
    }

    if(harry.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      stoneCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(diaryGroup)){
      diaryGroup.destroyEach();
      diaryCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(ringGroup)){
      ringGroup.destroyEach();
      ringCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(locketGroup)){
      locketGroup.destroyEach();
      locketCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(cupGroup)){
      cupGroup.destroyEach();
      cupCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(diademGroup)){
      diademGroup.destroyEach();
      diademCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(harry.isTouching(naginiGroup)){
      naginiGroup.destroyEach();
      naginiCounter = 1;
      score = score + 1;
      hpHorcrux.play();
    }

    if(score === 7){
      background(0);
      textSize(50);
      text("You Win!!", 600, 325);
      dementorGroup1.destroyEach();
      dementorGroup2.destroyEach();
      harry.visible = false;
      voldemort.visible = false;
      stoneGroup.destroyEach();
      diaryGroup.destroyEach();
      ringGroup.destroyEach();
      locketGroup.destroyEach();
      cupGroup.destroyEach();
      diademGroup.destroyEach();
      naginiGroup.destroyEach();
    }
  }

  if(gameState === "END"){
    background(0);
    text("You Lose!!", 600, 325);
    dementorGroup1.destroyEach();
    dementorGroup2.destroyEach();
    harry.visible = false;
    voldemort.visible = false;
    stoneGroup.destroyEach();
    diaryGroup.destroyEach();
    ringGroup.destroyEach();
    locketGroup.destroyEach();
    cupGroup.destroyEach();
    diademGroup.destroyEach();
    naginiGroup.destroyEach();
  }

  drawSprites(); 

  Dementor1();
  Dementor2();
  PhylosophersStone();
  Diary();
  Ring();
  SlytherinLocket();
  HufflepuffsCup();
  RavenclawsDiadem();
  Nagini();
}

function Dementor1(){
  if(frameCount % 200 === 0){
    dementor = createSprite(1350,50,10,10);
    dementor.addImage(dementorImage);
    dementor.scale = 0.5;
    dementor.setCollider("rectangle", 0, 0, 60, 80);
    dementor.velocityX = -(2 + score / 1);
    dementor.y = Math.round(random(20,325));
    dementor.lifetime = 550;
    
    dementorGroup1.add(dementor);    
  }  
}

function Dementor2(){
  if(frameCount % 300 === 0){
    dementor = createSprite(1350,300,10,10);
    dementor.addImage(dementorImage);
    dementor.scale = 0.5;
    dementor.setCollider("rectangle", 0, 0, 60, 80);
    dementor.velocityX = -(2 + score / 1);
    dementor.y = Math.round(random(325,630));
    dementor.lifetime = 550;
    
    dementorGroup2.add(dementor);    
  }  
}

function PhylosophersStone(){
  if(stoneCounter === 0){
    if(frameCount % 1200 === 0){
      stone = createSprite(1350,50,10,10);
      stone.addImage(stoneImage);
      stone.scale = 0.15;
      stone.velocityX = -(2 + score / 20);
      stone.y = Math.round(random(20,600));
      stone.lifetime = 550;
    
      stoneGroup.add(stone);    
    }  
  } 
}

function Diary(){
  if(diaryCounter === 0){
    if(frameCount % 2500 === 0){
      diary = createSprite(1350,50,10,10);
      diary.addImage(diaryImage);
      diary.scale = 0.3;
      diary.velocityX = -(2 + score / 20);
      diary.y = Math.round(random(20,600));
      diary.lifetime = 550;
      
      diaryGroup.add(diary);    
    }
  }  
}

function Ring(){
  if(ringCounter === 0){
    if(frameCount % 3800 === 0){
      ring = createSprite(1350,50,10,10);
      ring.addImage(ringImage);
      ring.scale = 0.2;
      ring.velocityX = -(2 + score / 20);
      ring.y = Math.round(random(20,600));
      ring.lifetime = 550;
      
      ringGroup.add(ring);    
    }  
  }
}

function SlytherinLocket(){
  if(locketCounter === 0){
    if(frameCount %  5100 === 0){
      locket = createSprite(1350,50,10,10);
      locket.addImage(locketImage);
      locket.scale = 0.2;
      locket.velocityX = -(2 + score / 20);
      locket.y = Math.round(random(20,600));
      locket.lifetime = 550;
      
      locketGroup.add(locket);    
    }  
  }
}

function HufflepuffsCup(){
  if(cupCounter === 0){
    if(frameCount % 6500 === 0){
      cup = createSprite(1350,50,10,10);
      cup.addImage(cupImage);
      cup.scale = 0.1;
      cup.velocityX = -(2 + score / 20);
      cup.y = Math.round(random(20,600));
      cup.lifetime = 550;
      
      cupGroup.add(cup);    
    }  
  }  
}

function RavenclawsDiadem(){
  if(diademCounter === 0){
    if(frameCount % 7800 === 0){
      diadem = createSprite(1350,50,10,10);
      diadem.addImage(diademImage);
      diadem.scale = 0.2;
      diadem.velocityX = -(2 + score / 20);
      diadem.y = Math.round(random(20,600));
      diadem.lifetime = 550;
      
      diademGroup.add(diadem);    
    }  
  }  
}

function Nagini(){
  if(naginiCounter === 0){
    if(frameCount % 8900 === 0){
      nagini = createSprite(1350,50,10,10);
      nagini.addImage(naginiImage);
      nagini.scale = 0.2;
      nagini.velocityX = -(2 + score / 20);
      nagini.y = Math.round(random(20,600));
      nagini.lifetime = 550;
      
      naginiGroup.add(nagini);    
    }
  } 
}