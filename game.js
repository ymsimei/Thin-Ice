//Initial Setup
canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
gridSize = 25;
level = 1;

//Board Setup
setupBoard();

function setupBoard() {
  grid = levels[level.toString()];
  player = [];
  blocks = [];
  tilesUp = [];
  tilesDown = [];
  for (y=0;y<grid.length;y++) {
    for (x=0;x<grid[y].length;x++) {
      console.log(grid[y][x]);
      if (grid[y][x] == "B") {
        blocks.push([x, y]);
      } else if (grid[y][x] == "T") {
        tilesUp.push([x, y]);
      } else if (grid[y][x] == "P") {
        player.push(x);
        player.push(y);
      }
    }
  }
  renderGrid();
}

function handleInput(event) {
  //Movement
  switch(event.keyCode) {
    case 37:
      for (i=0; i<blocks.length; i++) {
        if (player[0] - 1 == blocks[i][0] && player[1] == blocks[i][1]) {
          return;
        }
      }
      player[0] -= 1;
      break;
    case 38:
      for (i=0; i<blocks.length; i++) {
        if (player[0] == blocks[i][0] && player[1] - 1 == blocks[i][1]) {
          return;
        }
      }
      player[1] -= 1;
      break;
    case 39:
      for (i=0; i<blocks.length; i++) {
        if (player[0] + 1 == blocks[i][0] && player[1] == blocks[i][1]) {
          return;
        }
      }
      player[0] += 1;
      break;
    case 40:
      for (i=0; i<blocks.length; i++) {
        if (player[0] == blocks[i][0] && player[1] + 1 == blocks[i][1]) {
          return;
        }
      }
      player[1] += 1;
      break;
    default:
      return;
  }
  //Tile Detection
  for (i=0; i<tilesUp.length; i++) {
    if (player[0] == tilesUp[i][0] && player[1] == tilesUp[i][1]) {
      tile = tilesUp[i];
      tilesUp.splice(tile, 1);
      tilesDown.push(tile, 1);
    }
  }
  console.log(tilesUp);
  //Check Win Condition
  if (tilesUp == 0) {
    level += 1;
    setupBoard();
  }
  //Render Grid
  renderGrid();
}

function renderGrid() {
  //Fill Background
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Fill Blocks
  context.fillStyle = "blue";
  for (i=0; i<blocks.length; i++) {
    context.fillRect(blocks[i][0] * gridSize, blocks[i][1] * gridSize, gridSize, gridSize);
  }

  //Fill Up Tiles
  context.fillStyle = "red";
  for (i=0; i<tilesUp.length; i++) {
    context.fillRect((tilesUp[i][0] * gridSize) + 2, (tilesUp[i][1] * gridSize) + 2, gridSize - 4, gridSize - 4);
  }

  //Fill Down Tiles
  context.fillStyle = "green";
  for (i=0; i<tilesDown.length; i++) {
    context.fillRect((tilesDown[i][0] * gridSize) + 2, (tilesDown[i][1] * gridSize) + 2, gridSize - 4, gridSize - 4);
  }

  //Fill Player
  context.fillStyle = "yellow";
  context.fillRect((player[0] * gridSize) + 5, (player[1] * gridSize) + 5, gridSize - 10, gridSize - 10);
}

renderGrid();
document.addEventListener("keydown", handleInput);
