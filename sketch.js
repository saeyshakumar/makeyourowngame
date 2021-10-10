var dog, dogImg
var birdGroup, birdImg
var foodGroup
var score = 0, life = 2
var START = 0
var PLAY = 1
var END = 2
var gameState = START

function preload(){
    bird1Img = loadAnimation("bird1.png", "bird2.png")
    bird2Img = loadAnimation("bird3.png", "bird4.png")
    bird3Img = loadAnimation("bird5.png", "bird6.png")
    dogImg = loadAnimation("dog1.png", "dog2.png", "dog3.png", "dog4.png", "dog5.png", "dog6.png", "dog7.png", "dog8.png", "dog9.png")
    food1Img = loadImage("food1.png")
    food2Img = loadImage("food2.png")
    food3Img = loadImage("food3.png")
    back3Img = loadImage("back3.jpg")
    playbtnImg = loadImage("playbutton.png")
    back2Img = loadImage("back2.jpg")
    restartImg = loadImage("restart.png")
    gameoverImg = loadImage("gameover.png")
    startdogImg  = loadImage("dog5.png")
}
function setup(){
   createCanvas(windowWidth, windowHeight)
   back1 = createSprite(windowWidth/2, windowHeight/2)
   back1.addImage(back3Img)
   playbtn = createSprite(windowWidth/2, windowHeight/2+60)
   playbtn.addImage(playbtnImg)
   playbtn.scale = 0.6
   back2 = createSprite(windowWidth/2, windowHeight/2)
   back2.addImage(back2Img)
   back2.visible = false
   restart = createSprite(windowWidth/2, windowHeight/2+90)
   restart.addImage(restartImg)
   restart.scale = 0.5
   restart.visible = false
   gameover = createSprite(windowWidth/2, windowHeight/2 - 50)
   gameover.addImage(gameoverImg)
    gameover.visible = false
   dog = createSprite(windowWidth/2, windowHeight-220)
   dog.addAnimation("dog1", dogImg)
   dog.visible = false
   startDog = createSprite(windowWidth/3 -200, height/2 + 150)
   startDog.addImage(startdogImg)
   startDog.scale = 2
   foodGroup = new Group();
   birdGroup = new Group();
}

function draw(){
background(90)
drawSprites();
fill ("yellow")
textSize (20)
text ("Score: "+ score, width - 300, 150)
text ("Lives: "+ life, width - 300, 180)
if(gameState === START){
    restart.visible = false
    if(mousePressedOver(playbtn)){
    gameState = PLAY
    }
}
    if(gameState === PLAY){
    back1.visible = false
    playbtn.visible = false
    startDog.visible = false
    back2.visible = true
    dog.visible = true
    dog.x  = mouseX
    if(dog.x < 250 ){
        dog.x = 250
    }
    if(dog.x > windowWidth -250){
        dog.x = windowWidth-250 
    }
    spawnBirds();
    spawnFood();
    }
    if(dog.isTouching(foodGroup)){
        foodGroup.get(food).remove()
        score = score + 2
    }
    if(dog.isTouching(birdGroup)){
        life = life - 1
      birdGroup.get(bird).remove()
      gameState = END
    }
    else if(gameState === END){
        foodGroup.destroyEach()
        birdGroup.destroyEach()
        dog.destroy()
        if(life >= 1){
            retsart = createSprite(windowWidth/2, windowHeight/2 +90)
            restart.addImage(restartImg)
            restart.scale = 0.5
            restart.visible = true
            textSize(20)
            fill("cyan")
            text ("Try again . . .", windowWidth/2 -50, windowHeight/2 + 250)
            if(mousePressedOver(restart)){
                reset();
            }
        }
        else{
            restart.visible = false
            textSize(30)
            fill("yellow")
            stroke("red")
            strokeWeight(3)
            text("Sorry! You lose", windowWidth/2 -50, windowHeight/2)
        }
    }
    if(score === 30 && gameState === PLAY){
        gameState = START
        score = 0
        life = 2   
    }
}

function spawnBirds(){
    if(frameCount % 70 === 0){
     bird = createSprite(random(width - 250, 250),10,20,20) 
    bird.velocityY = 5
    var select_bird = Math.round(random(1,3))  
    if(select_bird === 1){
        bird.addAnimation("bird1", bird1Img)
    }
    if(select_bird === 2){
        bird.addAnimation("bird2", bird2Img)
    }
    if(select_bird === 3){
        bird.addAnimation("bird3", bird3Img)
    }
    bird.scale = 0.6
    bird.lifetime = 800
    birdGroup.add(bird)
    }
}

function spawnFood(){
    if(frameCount % 70 === 0){
         food = createSprite(random(width - 250, 250),10,20,20) 
        food.velocityY = 7
        var select_food = Math.round(random(1,3))  
        if(select_food === 1){
            food.addImage("food1", food1Img)
        }
        if(select_food === 2){
            food.addImage("food2", food2Img)
        }
        if(select_food === 3){
            food.addImage("food3", food3Img)
        }
        food.scale = 0.6
        food.lifetime = 800
        foodGroup.add(food)
        }
}

function reset(){
    gameState  = PLAY
    back2 = createSprite(windowWidth/2, windowHeight/2)
    back2.addImage(back2Img)
    dog = createSprite(windowWidth/2, windowHeight-220)
   dog.addAnimation("dog1", dogImg)
   dog.x = mouseX
}