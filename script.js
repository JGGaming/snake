const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const height = cvs.height;
const width = cvs.width;

const row = 20;
const col = 20;
const padding = 1;
const sq = height / (row + padding * 2);

const COLOR_LIGHTGREEN = "#90EE90";
const COLOR_GREEN = "#32CD32";
const COLOR_DARKGREEN = "#006400";
const COLOR_BLACK = "#000000";
const COLOR_WHITE = "#FFFFFF";
const COLOR_RED = "#F00";
const COLOR_ORANGE = "#fcba03";

// draw a square
function drawSquare( x , y , height , width , color1 , color2 = color1 ){

  ctx.fillStyle = color1 ;
  ctx.fillRect( x , y , height , width ) ;

  ctx.strokeStyle = color2 ;
  ctx.lineWidth = 2 ;
  ctx.strokeRect( x , y , height , width ) ;
};

// create the game board
let board = [];
for( r = 0 ; r < row ; r++ ){
  board[r] = [];
  for ( c = 0 ; c < col ; c++ ){
    // create checkerboard pattern
    board[r][c] = ( ( c + r ) % 2 === 0 ) ? COLOR_LIGHTGREEN : ( (c + r) % 2 === 1) ? COLOR_GREEN : console.log("error with colors");
  };
};

// draw game checkerboard
function drawBoard (){
  // draws green background
  drawSquare( 0 , 0 , height , width , COLOR_DARKGREEN );

  // draws border around board
  drawSquare( sq - 4 , sq - 4 , sq * row + 8 , sq * row + 8 , COLOR_BLACK );

  // draws checkered patterened board
  for( r = 0 ; r < row ; r++ ){
    for( c = 0 ; c < col ; c++ ){
      let x = c * sq + padding * sq ;
      let y = r * sq + padding * sq ;
      drawSquare( x , y , sq , sq , board[r][c] );
    };
  };
};

drawBoard() ;

// create the snake
let snake = [] ;
snake[0] = {
  x : Math.floor(( col * sq ) / 2) + padding ,
  y : Math.floor(( row * sq ) / 2) + padding ,

};

// create food

let food = {
  x : Math.floor( Math.random() * row + padding ) * sq,
  y : Math.floor( Math.random() * col + padding ) * sq
};

// create the score

let score = 0 ;

// draw the snake
function drawSnake(){
  for( let i = 0 ; i < snake.length ; i++ ){
    ctx.fillStyle = ( i == 0 ) ? COLOR_ORANGE : COLOR_WHITE ;
    ctx.fillRect( snake[i].x , snake[i].y , sq , sq ) ;

    ctx.strokeStyle = COLOR_BLACK ;
    ctx.strokeRect( snake[i].x , snake[i].y , sq , sq )
  };
};

drawSnake();
