$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var canW = $("#canvas")[0].width;
	var canH = $("#canvas")[0].height;
	var ctx = canvas.getContext("2d");
	var oneSnakeSize = 15;
	var snakeArray;
	var direction;
	var food;
	
	
	
	
	
	init();
	function init(){
		direction = "right";
		createSnake(5);
		createFood();
		if(typeof gameLoop != "undefined") clearInterval(gameLoop);
		gameLoop = setInterval(paint,80);
		
	}
	
	function createFood(){
		food = {
		x:Math.round(Math.random()*(canW-oneSnakeSize)/oneSnakeSize),
		y:Math.round(Math.random()*(canH-oneSnakeSize)/oneSnakeSize)
		};
		//alert(food.x+" "+food.y);
	}
	
	function createSnake(baseSnakeLength){
		snakeArray = [];
		for(var i=baseSnakeLength-1;i>=0;i--){
			snakeArray.push({x:i,y:0});
		}
	}
	
	function checkCollision(x,y,tab){
		for(var i=0;i<tab.length;i++){
			if(tab[i].x==x && tab[i].y==y){
			//alert(i+" "+x+" "+y);
			return true;
			}
		}
		return false;
	}
	
	function paint(){
		var headX = snakeArray[0].x;
		var headY = snakeArray[0].y;
		var tail;
		
		if(headX==food.x && headY==food.y)
		{
			tail= {x:headX,y:headY};
			createFood();
		} else {
			tail=snakeArray.pop();
		}
		if(direction == "right") {
		headX++;
		tail.x=headX;
		tail.y=headY;
		}
		else if(direction == "left"){
		headX--;
		tail.x=headX;
		tail.y=headY;
		}
		else if(direction == "up"){
		headY--;
		tail.y=headY;
		tail.x=headX;
		}
		else if(direction == "down"){
		headY++;
		tail.y=headY;
		tail.x=headX;
		}
		
		
		
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,canW,canH);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0,0,canW,canH);
	
		for(var i=0;i<snakeArray.length;i++){
			var s = snakeArray[i];
			paintCell(s.x,s.y);
		}
		
		if(checkCollision(headX,headY,snakeArray) || headX == -1 || headY == -1 || headX*oneSnakeSize == canW || headY*oneSnakeSize == canH){
			init();
			return;
		}
		
		snakeArray.unshift(tail);
		paintCell(food.x,food.y);
	}
	
	function paintCell(x,y){
		ctx.fillStyle = "blue";
		ctx.fillRect(x*oneSnakeSize,y*oneSnakeSize,oneSnakeSize,oneSnakeSize);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*oneSnakeSize,y*oneSnakeSize,oneSnakeSize,oneSnakeSize);
	}
	
	
	$(document).keydown(function(e){
		var key=e.which;
		if(key=="37" && direction!="right"){
		direction="left";}
		else if(key=="38" && direction!="down"){
		direction="up";}
		else if(key=="39" && direction!="left"){
		direction="right";}
		else if(key=="40" && direction!="up"){
		direction="down";}
	});
	
});