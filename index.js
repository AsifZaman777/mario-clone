const jumpSound = new Audio("sounds/jump.wav");
const coinSound = new Audio("sounds/coin.wav");
const bombSound = new Audio("sounds/bomb.wav");
const gameOverSound = new Audio("sounds/gameover.wav");
const fun = new Audio("sounds/kudasai.mp3");

const app = new PIXI.Application({
    transparent: true,
    resizeTo: window,
});
document.body.appendChild(app.view);

//image paths
var bgPath = "images/bg_scene.jpg";
var marioPath = "images/mario.png";
var bombPath = "images/bomb.png";
var coinPath = "images/coin.png";

//visual components
let bgSprite;
let marioSprite;
let marioSpeed = 5;
let jumpForce = 15; 
let gravity = 0.5; 
let bombSpeed=5;
let jumping = false; 
let keys = {}; 

//logical components
let score = 0;
let life = 2;


function bg(bgPath) {
    bgSprite = PIXI.Sprite.from(bgPath);
    bgSprite.width = app.renderer.width;
    bgSprite.height = app.renderer.height;
    app.stage.addChild(bgSprite);
}

function coin(coinPath) {
    coinSprite = PIXI.Sprite.from(coinPath);
    if(app.renderer.width >= 1920){

    coinSprite.scale.set(0.5);
    coinSprite.anchor.set(0.5);
    coinSprite.x = app.renderer.width / 2 + Math.floor(Math.random() * 2000) + 1500 ;
    coinSprite.y = app.renderer.height / 2 - 210;
    }
    else{
    coinSprite.scale.set(0.3);
    coinSprite.anchor.set(0.5);
    coinSprite.x = app.renderer.width / 2 + 2000;
    coinSprite.y = app.renderer.height / 2 - 210;
    }

    app.stage.addChild(coinSprite);
}

function bomb(bombPath) {
    bombSprite = PIXI.Sprite.from(bombPath);
    if(app.renderer.width >= 1920){
        bombSprite.scale.set(0.2);
        bombSprite.anchor.set(0.5);
        bombSprite.x = app.renderer.width / 2 + Math.floor(Math.random() * 2000) + 1500;
        bombSprite.y = app.renderer.height / 2 + 150;
        }
        else{
        bombSprite.scale.set(0.1);
        bombSprite.y = app.renderer.height / 2 + 150;
        bombSprite.anchor.set(0.5);
        bombSprite.x = app.renderer.width / 2 + 2000;
        bombSprite.y = app.renderer.height / 2 + 115;
        }
  
    app.stage.addChild(bombSprite);
}

function mario(marioPath) {
    marioSprite = PIXI.Sprite.from(marioPath);
    if(app.renderer.width >= 1920){
    marioSprite.scale.set(0.5);
    marioSprite.anchor.set(0.5);
    marioSprite.x = app.renderer.width / 2 - 200;
    marioSprite.y = app.renderer.height / 2 + 80;
    app.stage.addChild(marioSprite);
    }
    else{
    marioSprite.scale.set(0.3);
    marioSprite.anchor.set(0.5);
    marioSprite.x = app.renderer.width / 2 - 200;
    marioSprite.y = app.renderer.height / 2 + 80;
    app.stage.addChild(marioSprite);
    }
   

    // Event listeners for keydown and keyup
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
}

bg(bgPath);
mario(marioPath);
coin(coinPath);
bomb(bombPath);

//keydown logic
function onKeyDown(event) {
    if (event.key === " ") {
        if (!jumping) {
            jumping = true;
            jumpSound.play();
        }
    }
    keys[event.key] = true;
}

//keup logic
function onKeyUp(event) {
    keys[event.key] = false;
}

function update() {
    // Smooth movement based on keys state
    if (keys["a"]) {
        marioSprite.x -= marioSpeed;
    }
    if (keys["d"]) {
        marioSprite.x += marioSpeed;
    }
    

    if (jumping) {
        marioSprite.y -= jumpForce;
        jumpForce -= gravity;
        if (marioSprite.y >= app.renderer.height / 2 + 80) {
            marioSprite.y = app.renderer.height / 2 + 80;
            jumping = false;
            jumpForce = 15;
        }
    }
}

// Game loop using PIXI ticker
app.ticker.add(() => {
    update();
});


//bomb movement to -x direction
app.ticker.add(() => {
    bombSprite.x -= bombSpeed;
    if (bombSprite.x+500 < 0) {
        bombSprite.x = app.renderer.width;
    }
});

//coin movement to -x direction
app.ticker.add(() => {
    coinSprite.x -= bombSpeed;
    if (coinSprite.x+500 < 0) {
        coinSprite.x = app.renderer.width;
    }
});


// score panel
function scorePanel() {
    const scorePanel = new PIXI.Graphics();
    scorePanel.beginFill(0x000000);
    scorePanel.drawRoundedRect(20, 20, 250, 100, 16);
    scorePanel.alpha = 0.3;
    scorePanel.lineStyle(4, 0x000000, 1);
    //border radius
   
    scorePanel.endFill();
    app.stage.addChild(scorePanel);

   //score text
    const scoreText = new PIXI.Text("Score: 0", { fill: "white",
    fontFamily: "\"Lucida Console\", Monaco, monospace",
    fontSize: 24});
    scoreText.x = 70;
    scoreText.y = 30;
    app.stage.addChild(scoreText);

    const lifeText = new PIXI.Text("Life:❤️❤️❤️", { fill: "white",
    fontFamily: "\"Lucida Console\", Monaco, monospace",
    fontSize: 24});
    lifeText.x = 70;
    lifeText.y = 70;

    app.stage.addChild(lifeText);

    //life counter
    const lifeCounter = () => {
        if(life==3)
        {
            life--;
        }
        else if(life==2)
        {
            lifeText.text = "Life:❤️❤️";
            life--;
        }
        else if(life==1)
        {
            lifeText.text = "Life:❤️";
            life--;
        }
        else if(life==0)
        {
            lifeText.text = "Life:💀";
            //control disable
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);

            //disable all sounds
            fun.pause();
            jumpSound.pause();
            coinSound.pause();
            bombSound.pause();
            gameOverSound.play();

            //game over text
            const gameOverText = new PIXI.Text("Game Over", { fill: "white",
            fontFamily: "\"Lucida Console\", Monaco, monospace",
            fontSize: 48});
            gameOverText.x = app.renderer.width / 2 - 100;
            gameOverText.y = app.renderer.height / 2 - 50;
            app.stage.addChild(gameOverText);

            


           
        }
    };


    //update score
    const updateScore = () => {
        score += 10;
        scoreText.text = "Score: " + score;
    };

    return {updateScore, lifeCounter}; 
}

const {updateScore, lifeCounter} = scorePanel();

//collision detection toggler for coin
let coinCollisionDetected = false;

const coinCollisionHandler = () => {
    if (marioSprite.x + marioSprite.width / 2 > coinSprite.x - coinSprite.width / 2 &&
        marioSprite.x - marioSprite.width / 2 < coinSprite.x + coinSprite.width / 2 &&
        marioSprite.y + marioSprite.height / 2 > coinSprite.y - coinSprite.height / 2 &&
        marioSprite.y - marioSprite.height / 2 < coinSprite.y + coinSprite.height / 2) {

        if (!coinCollisionDetected) {
            console.log("coin collision detected");
            coinCollisionDetected = true;
            updateScore(); 
            coinSound.play();
            coinSprite.x = app.renderer.width / 2 + Math.floor(Math.random() * 2000) + 1500 ;
        }
    } else {
        coinCollisionDetected = false;
    }
};

app.ticker.add(coinCollisionHandler);


//collision detection toggler for bomb
let collisionDetected = false;

const collisionHandler = () => {
    if (marioSprite.x + marioSprite.width / 2 > bombSprite.x - bombSprite.width / 2 &&
        marioSprite.x - marioSprite.width / 2 < bombSprite.x + bombSprite.width / 2 &&
        marioSprite.y + marioSprite.height / 2 > bombSprite.y - bombSprite.height / 2 &&
        marioSprite.y - marioSprite.height / 2 < bombSprite.y + bombSprite.height / 2) {

        if (!collisionDetected) {
            console.log("collision detected");
            collisionDetected = true;
            lifeCounter();
            bombSound.play(); 
            bombSprite.x = app.renderer.width / 2 + Math.floor(Math.random() * 2000) + 1500 ;
        }
    } else {
        collisionDetected = false;
    }
};

app.ticker.add(collisionHandler);




























 





