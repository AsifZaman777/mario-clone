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
let marioSpeed = 5; // Speed of Mario's movement
let jumpForce = 10; // Force of Mario's jump
let gravity = 0.5; // Gravity effect
let jumping = false; // Flag to indicate whether Mario is jumping
let keys = {}; // Object to store the state of keys

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
    bombSprite.x = app.renderer.width / 2 + 200;
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

// Event listener for keydown event
function onKeyDown(event) {
    if (event.key === " ") {
        if (!jumping) {
            jumping = true;
        }
    }
    keys[event.key] = true;
}

// Event listener for keyup event
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
    
    // Jumping behavior
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

bg(bgPath);
mario(marioPath);
coin(coinPath);
bomb(bombPath);
