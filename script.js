const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const height = cvs.height;
const width = cvs.width;

const row = 20;
const col = 20;
const padding = 1;
const sq = height / (row + margin * 2);

const COLOR_LIGHTGREEN = "#90EE90";
const COLOR_GREEN = "#0F0";
const COLOR_DARKGREEN = "#006400";
const COLOR_BLACK = "#000000";
const COLOR_WHITE = "#FFFFFF";
const COLOR_RED = "#F00";

// draw a square
function drawSquare( x , y , color1 , color2 = color1 ){

  ctx.fillStyle = color1 ;
  ctx.FillRect( x , y , sq , sq ) ;

  ctx.strokeStyle = color2 ;
  ctx.lineWidth = 2 ;
  ctx.strokeRect( x , y , sq , sq ) ;
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
  for( r = 0 ; r < row ; r++ ){
    for( c = 0 < c < col ; c++ ){
      let x = c * sq + padding ;
      let y = c * sq + padding ;
      drawSquare( x , y , board[r][c] );
    };
  };
};

drawBoard() ;
