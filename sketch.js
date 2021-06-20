var PLAY = 1;
var END =0;
var gameState = PLAY;
var score = 0;



function preload(){
    bgImage = loadImage ("pitch.png");
    hpImage = loadImage ("harrypotter.png");
    bludgerImage = loadImage ("bludger.png");
    snitchImage = loadImage ("snitch.png");

    gameoverImage = loadImage ("gameover.png");
    restartImage = loadImage ("restart.png");

    overSound = loadSound ("over.wav");
    bonusSound = loadSound ("bonus.wav");
    startSound = loadSound ("start.wav");
}

function setup(){
    createCanvas (1200,800);
    bg = createSprite (600,400,1200,800);
    bg.addImage (bgImage);
    bg.velocityX = -2;

    hp = createSprite (90,350,20,20);
    hp.addImage (hpImage);
    hp.scale = 0.4;

    invisibleground = createSprite (600,550,1200,20);
    invisibleground.visible = false;


    bludgersGroup = new Group ();
    snitchesGroup = new Group ();
    gameover = createSprite (550, 400);
    gameover.addImage (gameoverImage);
    gameover.scale = 0.3;

    restart = createSprite (550, 500);
    restart.addImage (restartImage);
    restart.scale = 0.3;
}

function draw(){
    background(0);

    if (gameState === PLAY){
        if (bg.x < 520){
            bg.x = 600
         }
        gameover.visible = false
        restart.visible = false
         
         if(keyDown("space")){
            hp.velocityY=-10;
        }
        hp.velocityY=hp.velocityY+0.5

        if (snitchesGroup.isTouching (hp)){

            score = score +1;
            snitchesGroup.destroyEach();
            bonusSound.play();
        }
        spawnbludger();
        spawnsnitch();
       

        if (bludgersGroup.isTouching (hp)){
            gameState = END;
            overSound.play();
        }
    }
   else if (gameState === END){

    gameover.visible = true
    restart.visible = true
    
     bg.velocityX = 0
     hp.destroy();

     bludgersGroup.destroyEach ();
     snitchesGroup.destroyEach ();


     if (mousePressedOver(restart)){
        reset()
    }
   }


    hp.collide(invisibleground);

    
    
    drawSprites();
    textSize (28);
    fill (255)
    text ("SCORE = "  + score, 1000, 100)
}


function reset (){
    startSound.play();
    gameState = PLAY;
    score = 0;
    hp = createSprite (90,350,20,20);
    hp.addImage (hpImage);
    hp.scale = 0.4;
    bg.velocityX = -2;
    if (bg.x < 520){
        bg.x = 600
     }

}

function spawnbludger(){
    if(frameCount%70==0){
    bludger = createSprite (1000,700,10,10);
    bludger.addImage(bludgerImage);
    bludger.velocityX = -4
    bludger.scale = 0.3
    bludger.y = random (300,700)
    
    bludgersGroup.add (bludger)
    }
}

function spawnsnitch(){
    if(frameCount%170==0){
    snitch = createSprite (1100,600,5,5);
    snitch.addImage(snitchImage);
    snitch.velocityX = -6
    snitch.scale = 0.2
    snitch.y = random (300,400);

    snitchesGroup.add (snitch)
    }
}