'use strict';
// Exercise 60 - Game of Life
/*  THE RULES FROM WIKIPEDIA - Conway's Game of Life
    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.    */

var gBoard;
var gGameInterval;
const LIFE = '😎';
var genNum = 0;
var elGenNum;
var gSize = 50;

function init() {
  elGenNum = document.querySelector('.gen-num');
  gBoard = runGeneration(gBoard);
}

function toggleGame(elBtn) {
  if (gGameInterval) {
    clearInterval(gGameInterval);
    gGameInterval = null;
    elBtn.innerText = 'Start-Again';
  } else {
    gGameInterval = setInterval(runGameOfLife, 1000);
    gBoard = null;
    elBtn.innerText = 'Stop';
  }
}

function runGameOfLife() {
  gBoard = runGeneration(gBoard);
  renderBoard();
  elGenNum.innerText = '' + ++genNum;
}

function runGeneration(board) {
  if (!board) return getRandomBoard(gSize, gSize);
  var newGen = getEmptyMat(gSize, gSize);
  for (var i = 0; i < gSize; i++) {
    for (var j = 0; j < gSize; j++) {
      var currCell = board[i][j];
      var neighbours = countNeighbours(i, j); // counting number of neighbours the currCell have
      if (currCell === '' && neighbours === 3) newGen[i][j] = LIFE;
      else if (currCell === LIFE) {
        if (neighbours === 3 || neighbours === 2) newGen[i][j] = LIFE;
      }
    }
  }
  return newGen;
}

function renderBoard() {
  var strHtml = '';
  for (var i = 0; i < gSize; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < gSize; j++) {
      var cell = gBoard[i][j];
      var className = cell ? 'occupied' : '';
      strHtml += `<td class="${className}">${cell}</td>`;
    }
    strHtml += '</tr>';
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHtml;
}

function countNeighbours(i, j) {
  var count = 0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      var nY = y + i;
      var nX = x + j;
      if (x === j && y === i) continue;
      if (nY >= 0 && nY < gSize && nX >= 0 && nX < gSize) {
        if (gBoard[nY][nX] === LIFE) count++;
      }
    }
  }
  return count;
}
function getRandomBoard(cols, rows) {
  var mat = [];
  for (var i = 0; i < cols; i++) {
    mat.push([]);
    for (var j = 0; j < rows; j++) {
      mat[i][j] = Math.random() > 0.35 ? '' : LIFE;
    }
  }
  return mat;
}
function getEmptyMat(cols, rows) {
  var mat = [];
  for (var i = 0; i < cols; i++) {
    mat.push([]);
    for (var j = 0; j < rows; j++) {
      mat[i][j] = '';
    }
  }
  return mat;
}
