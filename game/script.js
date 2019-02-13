var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/ground.png";
pipeUp.src = "img/bk-up.png";
pipeBottom.src = "img/bk-down.png";


//звук 
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src= "audio/score.mp3";
var pipe = [];


pipe[0] = {
	x: cvs.width,
	y: 0
}

var score = 0;
 // отступ между 
 var gap = 90;
 //позиция птички
 var xPos = 10;
 var yPos = 150;
 var grav = 2;

 // при нажатии на кнопку 

 document.addEventListener("keydown",moveUp);

 function moveUp(){
 	yPos -= 25;
 	fly.play();
 }

function draw(){
	ctx.drawImage(bg,0,0);
	for ( var i =0; i < pipe.length; i++){
	ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
	ctx.drawImage(pipeBottom,pipe[i].x, pipe[i].y + pipeUp.height + gap);
	pipe[i].x--;

	if (pipe[i].x ==125){
		pipe.push({
			x: cvs.width,
			y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
		});
	}
	//столкновение
	if (xPos + bird.width >= pipe[i].x // левый край колонны
		&& xPos <= pipe[i].x +pipeUp.width // правый край колонны
		&& (yPos <= pipe[i].y + pipeUp.height // внутренность колонны
			|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)//низ колонны
			|| yPos + bird.height >= cvs.height - fg.height){ 
		location.reload();
	}
	if ( pipe[i].x==5){
		score++;	
		score_audio.play();
	}
	}
	
	ctx.drawImage(fg,0, cvs.height - fg.height);
	ctx.drawImage(bird,xPos,yPos);
	yPos += grav;
	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: "+ score, 10, cvs.height -20);
	//перерисовка 
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;