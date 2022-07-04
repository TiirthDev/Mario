import platform from "../img/platform.png";
import platformSmallTall from "../img/platformSmallTall.png";
import hills from "../img/hills.png";
import background from "../img/background.png";
import end from "../img/endflag.png";

import spriteRunLeft from "../img/spriteRunLeft.png";
import spriteRunRight from "../img/spriteRunRight.png";
import spriteStandRight from "../img/spriteStandRight.png";
import spriteStandLeft from "../img/spriteStandLeft.png";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;

// class of player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.speed = 10;
        this.width = 66;
        this.height = 150;
        this.image = createImage(spriteStandRight);
        this.frames = 0;
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66,
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 340,
                width: 127.875,
            },
        };
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177;
    }

    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.frames++;
        if (this.frames > 28) {
            this.frames = 0;
        }

        this.draw();
        // adding velocity to position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // checking not going out of bound (gravity) - thats why physics is useful but i still hate it
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        }
    }
}

//class platform
class Platform {
    constructor({ x, y, image }) {
        (this.position = {
            x,
            y,
        }),
        (this.image = image);
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

//class generic Object
class genericObject {
    constructor({ x, y, image }) {
        (this.position = {
            x,
            y,
        }),
        (this.image = image);
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);

// const for sprite
let player = new Player();
let platforms = [];
let genericObjects = [];

//keys
const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
};

let scrollOffset = 0;

//init
function init() {
    platformImage = createImage(platform);
    player = new Player();

    platforms = [
        new Platform({
            x: platformImage.width * 4 +
                297 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 6 +
                696 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 7 +
                896 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 7 +
                1185 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 9 +
                1196 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 10 +
                1196 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 10 +
                1485 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 11 +
                1496 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 170,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 11 +
                1785 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 170,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 12 +
                1785 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 200,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 13 +
                1785 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage,
        }),
        new Platform({
            x: platformImage.width * 16 +
                1985 +
                platformImage.width -
                platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage,
        }),
        new Platform({ x: -1, y: 570, image: platformImage }),
        new Platform({ x: platformImage.width - 3, y: 570, image: platformImage }),
        new Platform({
            x: platformImage.width * 2 - 2 + 100,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 3 + 300,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 4 + 300 - 2,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 5 + 700 - 2,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 6 + 700 - 4,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 8 + 1200 - 4,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 9 + 1200 - 6,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 15 + 1750 - 6,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 18 + 1980 - 4,
            y: 570,
            image: platformImage,
        }),
        new Platform({
            x: platformImage.width * 19 + 1980 - 6,
            y: 420,
            image: createImage(end),
        }),
    ];
    (genericObjects = [
        new genericObject({ x: -1, y: -1, image: createImage(background) }),
        new genericObject({ x: -1, y: 230, image: createImage(hills) }),
    ]),
    (player.velocity.x = 0);

    scrollOffset = 0;
}

// endless loop (like in doctor strange 1 climax )
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    genericObjects.forEach((genericObject) => {
        genericObject.draw();
    });
    platforms.forEach((platform) => {
        platform.draw();
    });
    player.update();

    //player movement
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if (
        keys.left.pressed &&
        player.position.x > 100 &&
        keys.left.pressed &&
        player.position.x >= 0
    ) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        //platform movement
        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach((platform) => {
                platform.position.x -= player.speed;
            });
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66;
            });
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5;
            platforms.forEach((platform) => {
                platform.position.x += player.speed;
            });
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66;
            });
        }

        //win and lose
        if (scrollOffset > platformImage.width * 19 + 1550 - 4) {
            alert("GG! YOU WON");
            init();
        }

        if (player.position.y > canvas.height) {
            window.alert("YOU LOST");
            init();
        }
    }

    //collision detection for platform
    platforms.forEach((platform) => {
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    });
}

init();
animate();

let isJumping = false;
// keydown event listener
addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
        case 87:
            if (!isJumping) {
                player.velocity.y -= 15;
                isJumping = true;
            }
            break;
    }
});

//keyup event listener
addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        case 87:
            isJumping = false;
            break;
    }
});