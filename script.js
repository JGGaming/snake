const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const height = cvs.height;
const width = cvs.width;

const row = 20 ;
const col = 20 ;
const marquee = row / 6 ;
const padding = 1 ;

const sq = width / ( col + padding * 2 );

const COLOR_LIGHTGREEN = "#90EE90" ;
const COLOR_GREEN = "#32CD32" ;
const COLOR_DARKGREEN = "#006400" ;
const COLOR_BLACK = "#000000" ;
const COLOR_WHITE = "#FFFFFF" ;
const COLOR_LIGHTGRAY = "#DCDCDC" ;
const COLOR_GRAY = "#C0C0C0" ;
const COLOR_DARKGRAY = "#808080" ;
const COLOR_RED = "#F00" ;
const COLOR_ORANGE = "#fcba03" ;
const COLOR_LIGHTBLUE = "#87CEFA" ;

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
  x : Math.floor(( col * sq ) / 2) + padding * sq ,
  y : Math.floor(( row * sq ) / 2) + padding * sq + marquee * sq ,

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
    ctx.fillStyle = COLOR_WHITE ;
    ctx.fillRect( snake[i].x , snake[i].y , sq , sq ) ;

    ctx.strokeStyle = COLOR_RED ;
    ctx.strokeRect( snake[i].x , snake[i].y , sq , sq )
  };
};

// draw the food
function drawFood(){
  drawSquare( food.x , food.y , sq , sq , COLOR_RED , COLOR_WHITE );
};

// draw the score
function drawScore(){
  let textSize = marquee * sq / 3 * 2
  ctx.fillStyle = COLOR_WHITE ;
  ctx.font = textSize + "px Fantasy" ;
  ctx.textBaseline = "middle";
  ctx.fillText("SCORE : " + score , sq , marquee * sq / 2 ) ;
};

// draw everything
function drawGame(){
  drawBoard();
  drawFood();
  drawSnake();
  drawScore();
};

drawGame() ;
