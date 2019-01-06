//Initial Setup
canvas = document.querySelector("canvas")
context = canvas.getContext("2d")
gridSize = 30
canvas.height = 15 * gridSize
canvas.width = 19 * gridSize

//Board Setup
// level = 1
// grid = {}
// setupBoard()

//Load Sprites
player = new Image()
player.src = "assets/player.png"
context.drawImage(player, 10, 10)

// setInterval(renderGrid(), 1000)
// document.addEventListener("keydown", handleInput)
//
// function setupBoard() {
//   grid = {
//     player: [],
//     walls: [],
//     ice: [],
//     water: [],
//     goal: [],
//     blanks: []
//   }
//   levelData = levels[level.toString()]
//   for (y=0;y<levelData.length;y++) {
//     for (x=0;x<levelData[y].length;x++) {
//       if (levelData[y][x] == "B") {
//         grid["walls"].push([x, y])
//       } else if (levelData[y][x] == "I") {
//         grid["ice"].push([x, y])
//       } else if (levelData[y][x] == "G") {
//         grid["goal"].push([x, y])
//       } else if (levelData[y][x] == "P") {
//         grid["player"].push([x, y])
//       } else {
//         grid["blanks"].push([x, y])
//       }
//     }
//   }
// }
//
// function handleInput(event) {
  // //Movement
  // switch(event.keyCode) {
  //   case 37:
  //     grid["water"].push([grid["player"][0][0], grid["player"][0][1]]);
  //     grid["player"][0][0] -= 1;
  //     break;
  //   case 38:
  //     grid["water"].push([grid["player"][0][0], grid["player"][0][1]]);
  //     grid["player"][0][1] -= 1;
  //     break;
  //   case 39:
  //     grid["water"].push([grid["player"][0][0], grid["player"][0][1]]);
  //     grid["player"][0][0] += 1;
  //     break;
  //   case 40:
  //     grid["water"].push([grid["player"][0][0], grid["player"][0][1]]);
  //     grid["player"][0][1] += 1;
  //     break;
  // }
// }
//
// function renderGrid() {
//   //Fill Blanks
//   context.fillStyle = "black";
//   for (i=0; i<grid["blanks"].length; i++) {
//     context.fillRect(grid["blanks"][i][0] * gridSize, grid["blanks"][i][1] * gridSize, gridSize, gridSize);
//   }
//
//   //Fill Walls
//   context.fillStyle = "blue";
//   for (i=0; i<grid["walls"].length; i++) {
//     context.fillRect(grid["walls"][i][0] * gridSize, grid["walls"][i][1] * gridSize, gridSize, gridSize);
//   }
//
//   //Fill Ice Tiles
//   context.fillStyle = "red";
  // for (i=0; i<grid["ice"].length; i++) {
  //   context.fillRect(grid["ice"][i][0] * gridSize, grid["ice"][i][1] * gridSize, gridSize, gridSize);
  // }
//
//   //Fill Water Tiles
//   context.fillStyle = "brown";
//   for (i=0; i<grid["water"].length; i++) {
//     context.fillRect(grid["water"][i][0] * gridSize, grid["water"][i][1] * gridSize, gridSize, gridSize);
//   }
//
//   Fill Player
//   context.drawImage(player, grid["player"][0][0] * gridSize, grid["player"][0][1] * gridSize)
//
//   //Fill Goal
//   context.fillStyle = "pink";
//   context.fillRect(grid["goal"][0][0] * gridSize, grid["goal"][0][1] * gridSize, gridSize, gridSize);
// }
