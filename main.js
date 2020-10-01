let BALL_DEFAULT_POSITION_X = 300;
let BALL_DEFAULT_POSITION_Y = 100;
let RADIUS = 20;
let SPEED = 2;
let MAPWIDTH = document.getElementById("canvas").offsetWidth;
let MAPHEIGHT = document.getElementById("canvas").offsetHeight;
let CTX = document.getElementById("canvas").getContext("2d");

let BAR_DEFAULT_WIDTH = 130;
let BAR_DEFAULT_HEIGHT = 15;
let BAR_DEFAULT_SPEED = 40;


let Ball = function () {
    this.radius = RADIUS;
    this.speedX = SPEED;
    this.speedY = SPEED;
    this.cx = BALL_DEFAULT_POSITION_X;
    this.cy = BALL_DEFAULT_POSITION_Y;

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
    this.moveBall = function () {
        this.cx += this.speedX;
        this.cy += this.speedY;
        this.left = this.cx - this.radius;
        this.top = this.cy - this.radius;
        this.right = this.cx + this.radius;
        this.bottom = this.cy + this.radius;
    };

    this.checkCollision = function (bar) {

        let isTouchBar =  ((this.bottom>=bar.getY() && this.top < bar.getY()+bar.height)&&(this.right>bar.getX()&&this.left<(bar.getX()+bar.width)));
        let isLeft = this.left <= 0;
        let isRight = this.right >= MAPWIDTH;
        let isTop = this.top <= 0;
        let isBot = this.bottom >= MAPHEIGHT;
        if (isLeft|| isRight) {
            this.speedX = -this.speedX;
        }
        if (isTop || isTouchBar ) {

            this.speedY = -this.speedY;
        }
        if (isTouchBar) {
            bar.score++;
            document.getElementById('diem').innerHTML=bar.score;
            // console.log(bar.score);
        }
        if (isBot){
            alert("GAME OVER");
            bar.score = 0;
            this.cx = BALL_DEFAULT_POSITION_X;
            this.cy = BALL_DEFAULT_POSITION_Y;
        }
    }
};
let Bar = function () {
    this.score = 0;
    this.x = MAPWIDTH/2 + BAR_DEFAULT_WIDTH;
    this.y = MAPHEIGHT*0.85;
    this.width = BAR_DEFAULT_WIDTH;
    this.height = BAR_DEFAULT_HEIGHT;
    this.drawBar = function (ctx) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.moveRight = function () {
        if (this.x < MAPWIDTH - this.width) {
            this.x += BAR_DEFAULT_SPEED;
        }
        this.drawBar(CTX);
    };
    this.moveLeft = function () {
        if (this.x >= 0) {
            this.x -= BAR_DEFAULT_SPEED;
        }
        this.drawBar(CTX);
    };
    this.getX = function () {
        return this.x;
    };
    this.getY= function () {
        return this.y;
    }
};

let ball = new Ball();
let bar = new Bar();

function moveBar(event) {
    switch (event.keyCode) {
        case 37: {
            bar.moveLeft();
            break;
        }
        case 39: {
            bar.moveRight();
            break;
        }

    }
}
function run() {
    window.addEventListener('keydown',moveBar);
}
function draw() {
    CTX.clearRect(0,0,MAPWIDTH,MAPHEIGHT);
    ball.draw(CTX);
    bar.drawBar(CTX);
}


function update() {
    ball.moveBall();
    ball.checkCollision(bar);
    draw();
}
window.onload = function () {
    let interval = 8;
    run();
    ball = new Ball();
    setInterval("update()",interval);
};
document.getElementById();

