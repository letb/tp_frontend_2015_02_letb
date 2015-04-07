
console.log("i'm canvas");

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

canvas = document.getElementById('canvas');
context = canvas.getContext("2d");

function relMouseCoords(event) {
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  }
  while (currentElement = currentElement.offsetParent);

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  return {x: canvasX, y: canvasY};
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

// Mouse Down Event
$('#canvas').mousedown(function(e) {
  var coord = this.relMouseCoords(e);
  var canvasX = coord.x;
  var canvasY = coord.y;
  paint = true;
  addClick(canvasX, canvasY);
  redraw();
});

// Mouse Move Event
$('#canvas').mousemove(function(e) {
  var coord = this.relMouseCoords(e);
  var canvasX = coord.x;
  var canvasY = coord.y;
  if(paint) {
    addClick(canvasX, canvasY, true);
    redraw();
  }
});

// Mouse Up Event - marker is off the paper
$('#canvas').mouseup(function(e) {
  if (paint) {
    paint = false;
  }
});

// Mouse Leave Event - marker goes off the paper
$('canvas').mouseleave(function(e) {
  if (paint) {
    paint = false;
  }
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
paint = false;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
};

function redraw() {
  // Reset canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var i = 0; i <= clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();  
  };
};