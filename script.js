const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

const height = cvs.height;
const width = cvs.width;

const row = 20;
const col = 20;
const margin = 1;
const sq = height / (row + margin * 2);

const COLOR_LIGHTGREEN = "#90EE90";
const COLOR_GREEN = "#0F0";
const COLOR_DARKGREEN = "#006400";
const COLOR_BLACK = "#000000";
const COLOR_WHITE = "#FFFFFF";
const COLOR_RED = "#F00";

function drawSquare( x , y , color1 , color2 ){

  ctx.fillStyle = color1 ;
  ctx.FillRect( x , y , sq , sq ) ;

  ctx.strokeStyle = color2 ;
  ctx.lineWidth = 2 ;
  ctx.strokeRect( x , y , sq , sq ) ; 
};
