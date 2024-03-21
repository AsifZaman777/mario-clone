const app = new PIXI.Application({
    transparent: true,
    resizeTo: window,
});
document.body.appendChild(app.view);

var bgPath = "images/bg_scene.jpg";
var marioPath = "images/mario.png";
var bombPath = "images/bomb.png";
var coinPath = "images/coin.png";

let bgSprite;
let marioSprite;
let marioSpeed = 5;
let jumpForce = 10; 
let gravity = 0.5; 
let bombSpeed=5;
let jumping = false; 
let keys = {}; 

function bg(bgPath) {
    bgSprite = PIXI.Sprite.from(bgPath);
    bgSprite.width = app.renderer.width;
    bgSprite.height = app.renderer.height;
    app.stage.addChild(bgSprite);
}

function coin(coinPath) {
    coinSprite = PIXI.Sprite.from(coinPath);
    coinSprite.scale.set(0.5);
    coinSprite.anchor.set(0.5);
    coinSprite.x = app.renderer.width / 2 + 100;
    coinSprite.y = app.renderer.height / 2 - 100;
    app.stage.addChild(coinSprite);
}

function bomb(bombPath) {
    bombSprite = PIXI.Sprite.from(bombPath);
    bombSprite.scale.set(0.2);
    bombSprite.anchor.set(0.5);
    bombSprite.x = app.renderer.width / 2 + 2000;
    bombSprite.y = app.renderer.height / 2 + 150;
    app.stage.addChild(bombSprite);
}

function mario(marioPath) {
    marioSprite = PIXI.Sprite.from(marioPath);
    marioSprite.scale.set(0.5);
    marioSprite.anchor.set(0.5);
    marioSprite.x = app.renderer.width / 2 - 200;
    marioSprite.y = app.renderer.height / 2 + 100;
    app.stage.addChild(marioSprite);

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
        if (marioSprite.y >= app.renderer.height / 2 + 100) {
            marioSprite.y = app.renderer.height / 2 + 100;
            jumping = false;
            jumpForce = 10;
        }
    }
}

// Game loop using PIXI ticker
app.ticker.add(() => {
    update();
});


const bombSprites = [];
const totalBombs = 3;

function createBomb() {
  const texture = PIXI.Texture.from("images/bomb.png");
  const bombSprite = new PIXI.Sprite(texture);
  bombSprite.scale.set(0.2);
  app.stage.addChild(bombSprite);  

  // Set initial position of bomb
  bombSprite.x = app.renderer.width / 2 + 2000;
  bombSprite.y = app.renderer.height/2 + 110 ; // Start from above the screen

  // Add bombSprite to the array
  bombSprites.push(bombSprite);

  //delay between the bombs
  bombSprite.delay = Math.random() * 2000;
  bombSprite.elapsedTime = 0;
}

// Create bombs
for (let i = 0; i < totalBombs; i++) {
  createBomb();
}

app.ticker.add((delta) => {

    bombSprites.forEach((bombSprite) => {
        bombSprite.elapsedTime += delta;

        if (bombSprite.elapsedTime >= bombSprite.delay) {
            bombSprite.x -= (bombSpeed * delta) / 1; 
            
            // Border logic
            if (bombSprite.x < -100) {
                setTimeout(() => {
                    bombSprite.x = app.renderer.width+100;
                }
                ,Math.random() * 1000); 
               
            }
        }
    });

});



//add ticker to move bomb
function bombMove(bombSpeed) {
   app.ticker.add(() => {
    bombSprite.x -= bombSpeed;
    if (bombSprite.x < -100) {
        bombSprite.x = app.renderer.width;
    }
});
}
bombMove(bombSpeed);





 





