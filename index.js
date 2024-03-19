// const hitSound = new Audio('sounds/beep.wav');
// const over = new Audio('sounds/over.mp3');

const app = new PIXI.Application({
    transparent: true,
    resizeTo: window,
});
document.body.appendChild(app.view);

var bgPath = "images/bg_scene.jpg";
var marioPath = "images/mario.png";
var incomingObjects = "images/objects.png";

function bg(bgPath) {
    const bg = PIXI.Sprite.from(bgPath);
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    app.stage.addChild(bg);
}

function mario(marioPath) {
    const bunny = PIXI.Sprite.from("images/mario.png");
    bunny.scale.set(0.5);
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2 + 300;
    app.stage.addChild(bunny);

}

bg(bgPath);
mario(marioPath);





