const cvs = document.getElementById("breakOut");
const ctx = cvs.getContext("2d");
// ctx.lineWidth = 10;
const Width_Of_Paddle = 20;
const Height_Of_Paddle = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const RADIUS_Of_Ball = 12;
const BACKGROUND = new Image;
BACKGROUND.src = "./color1.jpg";

let upArrow = false;
let downArrow = false;
let upKey=false;
let downKey=false;

let LIFE = 3;
let SCORE = 0;
let SCORE_COUNT = 10;
let GAME_LEVEL = 1;
let MAX_LEVEL = 5;
let GAME_OVER = false;
const paddlel = {
    x: cvs.width - 1080,
    y: cvs.height / 2 - Height_Of_Paddle / 2,
    width: Width_Of_Paddle,
    height: Height_Of_Paddle,
    dy: 5
}
const paddler = {
    x: cvs.width - 40,
    y: cvs.height / 2,
    width: Width_Of_Paddle,
    height: Height_Of_Paddle,
    dy: 5
}

function Paddle_Draw1() {
    ctx.fillStyle = "red";
    ctx.fillRect(paddlel.x, paddlel.y, paddlel.width, paddlel.height);

    ctx.strokeStyle = "white";
    ctx.strokeRect(paddlel.x, paddlel.y, paddlel.width, paddlel.height);
}
function Paddle_Draw2() {
    ctx.fillStyle = "red";
    ctx.fillRect(paddler.x, paddler.y, paddler.width, paddler.height);

    ctx.strokeStyle = "white";
    ctx.strokeRect(paddler.x, paddler.y, paddler.width, paddler.height);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        upArrow = true;
    } else if (event.key === "ArrowDown") {
        downArrow = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") {
        upArrow = false;
    } else if (event.key === "ArrowDown") {
        downArrow = false;
    }
});

function Paddler_Move() {
    if (downArrow && paddler.y + paddler.height < cvs.height-5) {
        paddler.y += paddler.dy;
    } else if (upArrow && paddler.y > 5) {
        paddler.y -= paddler.dy;
    }
}


//paddle l

document.addEventListener("keydown", function (event) {
    if (event.key === 'a' || event.key === 'A' ) {
        upKey = true;
    } else if (event.key === "z" || event.key === "Z") {
        downKey = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === 'a' || event.key === 'A' ) {
        upKey = false;
    } else if (event.key === 'z' || event.key === 'Z' ) {
        downKey = false;
    }
});

function Paddlel_Move() {
    if (downKey && paddlel.y + paddlel.height < cvs.height-5) {
        paddlel.y += paddlel.dy;
    } else if (upKey && paddlel.y > 5) {
        paddlel.y -= paddlel.dy;
    }
}















const ball = {
    x: cvs.width - 1000,
    y: paddlel.y - RADIUS_Of_Ball,
    radius: RADIUS_Of_Ball,
    speed: 4,
    dx: -3,
    dy: 3 * (Math.random() * 2 - 1)
}

function Ball_Draw() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "lightgreen";
    ctx.fill();

    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.closePath();

}

// Ball_Draw();
function Ball_Move() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function Ball_With_Wall_Collision() {
    if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > cvs.height) {
        
        ball.dy = -ball.dy;
    }
}
// Ball_Move();
// Ball_With_Wall_Collision();
function Ball_Reset() {
    ball.x = cvs.width / 2;
    ball.y = paddle.y - RADIUS_Of_Ball;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}



function Ball_With_Paddler_Collision() {
    if (ball.x < paddler.x + paddler.width && ball.x > paddler.x && ball.y < paddler.y + paddler.height && ball.y > paddler.y) {

        let collidePoint = ball.x - (paddler.x + paddler.width / 2);

        collidePoint = collidePoint / (paddler.width / 2);

        let angle = collidePoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}




function Ball_With_Paddlel_Collision() {
    if (ball.x < paddlel.x + paddlel.width && ball.x > paddlel.x && ball.y < paddlel.y + paddlel.height && ball.y > paddlel.y) {

        let collidePoint = ball.x - (paddlel.x + paddlel.width / 2);

        collidePoint = collidePoint / (paddlel.width / 2);

        let angle = collidePoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}








function Draw() {
    Paddle_Draw1();
    Paddle_Draw2();
    Ball_Draw();
}


function update() {
    Paddler_Move();
    Paddlel_Move();
    Ball_Move();
    Ball_With_Wall_Collision();
    Ball_With_Paddler_Collision();
    Ball_With_Paddlel_Collision();
    

}

function loop() {
    ctx.drawImage(BACKGROUND, 0, 0, 1200, 1000);

    Draw();

    update();
    if (true) {
        requestAnimationFrame(loop);
    }
}
loop();
requestAnimationFrame(loop);
