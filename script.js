const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const height = cvs.height;
const width = cvs.width;

const row = 20 ;
const col = 20 ;
const marquee = Math.floor( row / 6 );
const padding = 1 ;

const sq = Math.floor( width / ( col + padding * 2 ) );

const COLOR_LIGHTGREEN = "#90EE90" ;
const COLOR_GREEN = "#32CD32" ;
const COLOR_DARKGREEN = "#006400" ;
const COLOR_RED = "#F00" ;
const COLOR_ORANGE = "#fcba03" ;
const COLOR_YELLOW = "#FFFF00" ;
const COLOR_LIGHTBLUE = "#87CEFA" ;
const COLOR_BLACK = "#000000" ;
const COLOR_WHITE = "#FFFFFF" ;
const COLOR_LIGHTGRAY = "#DCDCDC" ;
const COLOR_GRAY = "#C0C0C0" ;
const COLOR_DARKGRAY = "#808080" ;

let gameOver = false ;
let cooldown = false ;

// draw a square
function drawSquare( x , y , width , height , color1 , color2 = color1 ){

  ctx.fillStyle = color1 ;
  ctx.fillRect( x , y , width , height ) ;

  ctx.strokeStyle = color2 ;
  ctx.lineWidth = 2 ;
  ctx.strokeRect( x , y , width , height ) ;
};

//

// create the game board
let board = [];
for( r = 0 ; r < row ; r++ ){
  board[r] = [];
  for ( c = 0 ; c < col ; c++ ){
    // create checkerboard pattern
    board[r][c] = ( ( c + r ) % 2 === 0 ) ? COLOR_LIGHTGRAY : ( (c + r) % 2 === 1) ? COLOR_GRAY : console.log("error with colors");
  };
};

// draw game checkerboard
function drawBoard (){

  // draws the marquee
  drawSquare( 0 , 0 , width , marquee * sq , COLOR_BLACK ) ;

  // draws background
  drawSquare( 0 , 0 + marquee * sq , width , height , COLOR_DARKGRAY );

  // draws border around board
  drawSquare( sq - 4 , ( sq - 4 ) + marquee * sq , sq * row + 8 , sq * row + 8 , COLOR_BLACK );

  // draws checkered patterened board
  for( r = 0 ; r < row ; r++ ){
    for( c = 0 ; c < col ; c++ ){
      let x = ( c + padding ) * sq ;
      let y = ( r + padding + marquee ) * sq ;
      drawSquare( x , y , sq , sq , board[r][c] );
    };
  };
};

// create the snake
let snake = [] ;
snake[0] = {
  x : ( Math.floor(( col ) / 2) + padding ) * sq ,
  y : ( Math.floor(( row ) / 2) + padding + marquee) * sq ,

};

// create food

let food = {
  x : ( Math.floor( Math.random() * col ) + padding ) * sq,
  y : ( Math.floor( Math.random() * row ) + padding + marquee ) * sq
};



// create the score

let score = 0 ;

// draw the snake
function drawSnake(){

  for( let i = 0 ; i < snake.length ; i++ ){
    ctx.fillStyle = COLOR_RED ;
    ctx.fillRect( snake[i].x , snake[i].y , sq , sq ) ;

    if( i == 0 ){

      let factorX ;
      let factorY ;
      if ( d == "LEFT"){
        ctx.fillStyle = COLOR_BLACK ;
        ctx.fillRect( snake[i].x + sq /5 * 3 , snake[i].y + sq / 5 * 1 , sq / 5 , sq / 5 )
        ctx.fillRect( snake[i].x + sq /5 * 3 , snake[i].y + sq / 5 * 3 , sq / 5 , sq / 5 )
      } else if ( d == "UP"){
        ctx.fillStyle = COLOR_BLACK ;
        ctx.fillRect( snake[i].x + sq /5 * 1 , snake[i].y + sq / 5 * 3 , sq / 5 , sq / 5 )
        ctx.fillRect( snake[i].x + sq /5 * 3 , snake[i].y + sq / 5 * 3 , sq / 5 , sq / 5 )
      } else if ( d == "RIGHT"){
        ctx.fillStyle = COLOR_BLACK ;
        ctx.fillRect( snake[i].x + sq /5 * 1 , snake[i].y + sq / 5 * 1 , sq / 5 , sq / 5 )
        ctx.fillRect( snake[i].x + sq /5 * 1 , snake[i].y + sq / 5 * 3 , sq / 5 , sq / 5 )
      } else if ( d == "DOWN"){
        ctx.fillStyle = COLOR_BLACK ;
        ctx.fillRect( snake[i].x + sq /5 * 1 , snake[i].y + sq / 5 * 1 , sq / 5 , sq / 5 )
        ctx.fillRect( snake[i].x + sq /5 * 3 , snake[i].y + sq / 5 * 1 , sq / 5 , sq / 5 )
      };
    };

    ctx.strokeStyle = COLOR_YELLOW ;
    ctx.strokeRect( snake[i].x , snake[i].y , sq , sq )
  };

  // old head position
  let snakeX = snake[0].x ;
  let snakeY = snake[0].y ;

  // which direction
  if ( d == "LEFT"){
    snakeX -= sq ;
  } else if ( d == "UP"){
    snakeY -= sq ;
  } else if ( d == "RIGHT"){
    snakeX += sq ;
  } else if ( d == "DOWN"){
    snakeY += sq ;
  };

  // the snake eats food
  if( snakeX == food.x && snakeY == food.y){
    score++

    food.x = ( Math.floor( Math.random() * col ) + padding ) * sq,
    food.y = ( Math.floor( Math.random() * row ) + padding + marquee ) * sq
  } else {
    // remove the tail
    snake.pop() ;
  };

  // add new head
  let newHead = {
    x : snakeX ,
    y : snakeY
  };

  // gameover
  if ( snakeX < sq || snakeX > col * sq || snakeY < ( marquee + padding ) * sq || snakeY > ( marquee + row ) * sq || collision( newHead , snake ) ){
    gameOver = true ;
    clearInterval(game) ;
  };

  // add new head to snake array

  snake.unshift(newHead) ;

  // refresh button press
  cooldown = false ;
};

// draw the food
function drawFood( obj , array ){
  for( let i = 0 ; i < array.length ; i++ ){
    if( obj.x == array[i].x && obj.y == array[i].y ){
      food.x = ( Math.floor( Math.random() * col ) + padding ) * sq,
      food.y = ( Math.floor( Math.random() * row ) + padding + marquee ) * sq

      drawFood( obj , array ) ;
    } else {
      drawSquare( food.x , food.y , sq , sq , COLOR_BLACK , COLOR_WHITE );
    };
  };
};

// draw the score
function drawScore(){
  let textSize = marquee * sq / 4 * 2 ;
  ctx.fillStyle = COLOR_WHITE ;
  ctx.font = textSize + "px Fantasy" ;
  ctx.textBaseline = "middle";
  ctx.fillText("SCORE : " + score , sq , marquee * sq / 2 ) ;
};

// control the snake
let d ;

document.addEventListener( "keydown" , direction );

function direction(event){
  if( gameOver != true && cooldown != true ){
    let key = event.keyCode ;

    if( key === 37 && d != "RIGHT" ){
      d = "LEFT" ;
    } else if( key === 38 && d != "DOWN" ){
      d = "UP" ;
    } else if( key === 39 && d != "LEFT" ){
      d = "RIGHT" ;
    } else if( key === 40 && d != "UP" ){
      d = "DOWN" ;
    };

    cooldown = true ;
  };
};

// check collision function
function collision( head , array ){
  for( let i = 0 ; i < array.length ; i++ ){
    if( head.x == array[i].x && head.y == array[i].y ){
      return true ;
    };
  };
  return false ;
};

// draw everything
function drawGame(){
  drawBoard();
  drawFood( food , snake );
  drawSnake();
  drawScore() ;

};

let game = setInterval( drawGame , 100 ) ;
