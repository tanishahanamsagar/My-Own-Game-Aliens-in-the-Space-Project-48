const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg_img;
var Eship, Eshipimg;
var Aship, Ashipimg;
var Bplanet, BplanetImg;
var Rplanet, RplanetImg;
var comets, cometsImg;
var shootingstars, shootingstarsImg;
var spacebgmusic;
var shootsound;
var beam, beamImg;
var Ebeam, EbeamImg
var invisiblebg;
var EdestroyImg, AdestroyImg;
var gameOverImg, restartImg;
var gameOver, restart;
var bg2, bg2Img;

var score = 0;

function preload() {
    bg_img = loadImage("assets/z2.jpeg");
    Eshipimg = loadImage("assets/z10.png");
    Ashipimg = loadImage("assets/z8.png");

    BplanetImg = loadImage("assets/z5.png");
    RplanetImg = loadImage("assets/z7.png")
    shootingstarsImg = loadImage("assets/z6.png");
    cometsImg = loadImage("assets/z4.png");
    spacebgmusic = loadSound("assets/spacebg.mps");
    shootsound = loadSound("assets/shoot sound.mps")
    beamImg = loadImage("assets/z12.png");
    EbeamImg = loadImage("assets/z11.png");
    EdestroyImg = loadImage("assets/z9.png");
    AdestroyImg = loadImage("assets/z13.png");
    gameOverImg = loadImage("assets/z14.png");
    restartImg = loadImage("assets/z15.png");


}

function setup() {
    createCanvas(windowWidth, windowHeight);

    spacebgmusic.play();





    engine = Engine.create();
    world = engine.world;

    invisibleGround = createSprite(0, 10, 300, 10000);
    invisibleGround.visible = false;

    invisibleGround2 = createSprite(1450, 90, 400, 10000);
    invisibleGround2.visible = false;



    Eship = createSprite(695, 690, 70, 70);
    Eship.addImage(Eshipimg);
    Eship.debug = false;
    Eship.setCollider("rectangle", 0, 0, 250, 500)
    Eship.scale = 0.8;

    Aship = createSprite(700, 130, 50, 50);
    Aship.addImage(Ashipimg);

    Aship.scale = 0.9;
    Aship.velocityX = 3;
    Aship.velocityX = -3;
    Aship.debug = false;
    Aship.setCollider("rectangle", 0, 0, 500, 200)


    Bplanet = createSprite(60, 100, 50, 50);
    Bplanet.addImage(BplanetImg);
    Bplanet.scale = 0.7;

    Rplanet = createSprite(1280, 700, 50, 50);
    Rplanet.addImage(RplanetImg);
    Rplanet.scale = 0.6;


    shootingstars = createSprite(1340, 140, 50, 50);
    shootingstars.addImage(shootingstarsImg);
    shootingstars.scale = 1.2;

    comets = createSprite(30, 680, 50, 50);
    comets.addImage(cometsImg);
    comets.scale = 2;

    Edestroy = createSprite(0, 0, 0, 0)
    Edestroy.addImage(EdestroyImg);
    Edestroy.scale = 2;
    Edestroy.visible = false;

    gameOver = createSprite(670, 320);
    gameOver.addImage(gameOverImg);




    gameOver.scale = 1;


    gameOver.visible = false;


    shoot1Group = new Group();
    shoot2Group = new Group();
    Engine.run(engine);

}


function draw() {
    rectMode(CENTER);


    background(bg_img);
    shoot1();

    if (keyIsDown(LEFT_ARROW)) {
        Eship.velocityX -= 5;

    }

    if (keyIsDown(RIGHT_ARROW)) {
        Eship.velocityX += 5;

    }


    if (keyDown("space")) {
        shoot2();
    }

    if (Aship.collide(invisibleGround)) {
        Aship.velocityX = 3;
    }
    if (Aship.collide(invisibleGround2)) {
        Aship.velocityX = -3;
    }

    if (Eship.collide(invisibleGround)) {
        Eship.velocityX = 3;
    }
    if (Eship.collide(invisibleGround2)) {
        Eship.velocityX = -3;
    }

    if (shoot1Group.isTouching(Eship)) {
        Eship.addImage(EdestroyImg);
        Eship.velocityX = 0;
        shoot2Group.destroyEach()
    }
    if (shoot2Group.isTouching(Aship)) {
        Aship.addImage(AdestroyImg);
        Aship.velocityX = 0;
        score++
        shoot1Group.destroyEach()
    }

    if (shoot1Group.isTouching(Eship)) {
        gameOver.visible = true


        shoot1Group.setVelocityYEach(0);
    }
    if (shoot2Group.isTouching(Aship)) {
        gameOver.visible = true

        shoot2Group.setVelocityYEach(0);
    }
    drawSprites();
    text("Score: " + score, 1300, 50);
    fill(255);
    text("SPACE KEY TO SHOOT", 50, 170);
    text("LEFT AND RIGHT ARROW KEY TO MOVE", 50, 150)

}

function shoot1() {
    if (frameCount % 40 === 0) {
        beam = createSprite(0, 0, 80, 80);
        beam.x = Aship.x;
        beam.y = Aship.y;
        beam.addImage(beamImg);
        beam.scale = 1.2;
        beam.velocityY = 3;
        shoot1Group.add(beam);
        beam.debug = false;
        beam.setCollider("rectangle", 0, 0, 10, 150)

    }
}

function shoot2() {
    if (frameCount % 60 === 0) {
        Ebeam = createSprite(100, 200, 80, 80);
        Ebeam.x = Eship.x;
        Ebeam.y = Eship.y;
        Ebeam.addImage(EbeamImg);
        Ebeam.scale = 1;
        shootsound.play();
        shootsound.setVolume(0.5);
        shoot2Group.add(Ebeam);
        Ebeam.velocityY = -3;
    }
}

function Ashiprandom() {
    if (frameCount % 60 === 0) {
        Aship.randomposition
        Ebeam.scale = 2;
        Ebeam.velocityY = -3;
    }
}