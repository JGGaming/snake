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
