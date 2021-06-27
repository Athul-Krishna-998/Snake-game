const canvas=document.getElementById("game");
const ctx=canvas.getContext('2d');

class SnakePart{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }
}
let speed=7;
let score=0;
const gulp=new Audio("Gulp-sound-effect.mp3");
const over=new Audio("mixkit-arcade-retro-game-over-213.wav");
let tileCount=20;
let tileSize=canvas.width/tileCount-2;
let headX=10;
let headY=10;
const snakeParts=[];
let tailLength=2;

let xVelocity=0;
let yVelocity=0;

let appleX=5;
let appleY=5;

function drawGame()
{
    changeSnakePosition();
    let result=isGameOver();
    if(result)
    {
        return;
    }
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    if(score>5)
    {
        speed=10;
    }
    if(score>10)
    {
        speed=15;
    }
    if(score>20)
    {
        speed=20;
    }
    setTimeout(drawGame,1000/speed);
}

function isGameOver()
{
    let gameOver=false;
    if(xVelocity==0 && yVelocity===0)
    {
        return false;
    }
    if(headX<0)
    {
        gameOver=true;
    }
    if(headX===tileCount)
    {
        gameOver=true;
    }
    if(headY<0)
    {
        gameOver=true;
    }
    if(headY===tileCount)
    {
        gameOver=true;
    }
    for(let i=0;i<snakeParts.length;i++)
    {
        let part=snakeParts[i];
        if(headX===part.x && headY===part.y)
        {
            gameOver=true; 
            break; 
        }
    }
    if(gameOver)
    {
        over.play();
        ctx.fillStyle='white';
        ctx.font='40px Verdana'
        ctx.fillText("GAME OVER!!",canvas.width/6.5,canvas.height/2) ; 
    }
    return gameOver;
}
function drawScore()
{
 ctx.fillStyle='white';
 ctx.font='10px Verdana'
 ctx.fillText("SCORE:"+score,canvas.width-50,10);
}

function clearScreen(){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function drawSnake()
{
    ctx.fillStyle='yellow';
    for(let i=0;i<snakeParts.length;i++)
    {
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    }
    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length>tailLength)
    {
        snakeParts.shift();
    }

    ctx.fillStyle='orange';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
}

function drawApple()
{
    ctx.fillStyle='red';
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize); 
}

function checkAppleCollision()
{
 if(appleX===headX && appleY===headY)
 {
     appleX=Math.floor(Math.random()*tileCount);
     appleY=Math.floor(Math.random()*tileCount);
     tailLength++;
     score++;
     gulp.play();
 }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event)
{ //UP ARROW KEY CODE 38 DOWN 40
    if(event.keyCode==38)
    {
        if(yVelocity==1)
        return;
        yVelocity=-1;
        xVelocity=0;
    }
    if(event.keyCode==40)
    {
        if(yVelocity==-1)
        return;
        yVelocity=1;
        xVelocity=0;
    }
    //LEFT 37
    if(event.keyCode==37)
    {
        if(xVelocity==1)
        return;
        yVelocity=0;
        xVelocity=-1;
    }
    //RIGHT 39
    if(event.keyCode==39)
    {
        if(xVelocity==-1)
        return;
        yVelocity=0;
        xVelocity=1;
    }
}

function changeSnakePosition()
{
 headX=headX+xVelocity;
 headY=headY+yVelocity;
}

drawGame();