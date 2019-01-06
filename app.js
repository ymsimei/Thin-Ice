// Initial Canvas Setup
canvas = document.querySelector("canvas")
context = canvas.getContext("2d")
gridSize = 32
canvas.height = 15 * gridSize
canvas.width = 19 * gridSize

//Set Label Variables
levelLabel = document.getElementById("levelLabel")

console.log(levelLabel)

//Setup Game Variables
level = 6
points = 0

startGame()

function startGame() {
  //Remove Start Button
  document.querySelector("h1").parentNode.removeChild(document.querySelector("h1"))

  //Add Keyboard Input
  document.addEventListener("keydown", handleInput)

  //Add Sprites
  loadLevel()
  setInterval(drawSprites, 1000/60)
}

function loadLevel() {
  levelGrid = {
    player: [],
    walls: [],
    ice: [],
    water: [],
    goal: [],
    blanks: []
  }
  levelData = levels[level.toString()]
  for (y=0;y<levelData.length;y++) {
    for (x=0;x<levelData[y].length;x++) {
      if (levelData[y][x] == "B") {
        levelGrid["walls"].push([x, y])
      } else if (levelData[y][x] == "I") {
        levelGrid["ice"].push([x, y])
      } else if (levelData[y][x] == "G") {
        levelGrid["goal"].push([x, y])
      } else if (levelData[y][x] == "P") {
        levelGrid["player"].push([x, y])
        levelGrid["ice"].push([x, y])
      } else {
        levelGrid["blanks"].push([x, y])
      }
    }
  }
  levelLabel.innerHTML = "Level: " + level
}

function handleInput() {
  //Check Legal Move
  if (event.keyCode >= 37 && event.keyCode <= 40) {
    //Movement
    switch(event.keyCode) {
      case 37:
        for (i=0;i<levelGrid["ice"].length;i++) {
          if ((levelGrid["ice"][i][0] == levelGrid["player"][0][0] - 1 && levelGrid["ice"][i][1] == levelGrid["player"][0][1]) || (levelGrid["goal"][0][0] == levelGrid["player"][0][0] - 1 && levelGrid["goal"][0][1] == levelGrid["player"][0][1] && levelGrid["ice"].length == 1)) {
            meltIce()
            levelGrid["player"][0][0] -= 1
            break
          }
        }
        break
      case 38:
        for (i=0;i<levelGrid["ice"].length;i++) {
          if ((levelGrid["ice"][i][0] == levelGrid["player"][0][0] && levelGrid["ice"][i][1] == levelGrid["player"][0][1] - 1) || (levelGrid["goal"][0][0] == levelGrid["player"][0][0] && levelGrid["goal"][0][1] == levelGrid["player"][0][1] - 1 && levelGrid["ice"].length == 1)) {
            meltIce()
            levelGrid["player"][0][1] -= 1
            break
          }
        }
        break
      case 39:
        for (i=0;i<levelGrid["ice"].length;i++) {
          if ((levelGrid["ice"][i][0] == levelGrid["player"][0][0] + 1 && levelGrid["ice"][i][1] == levelGrid["player"][0][1]) || (levelGrid["goal"][0][0] == levelGrid["player"][0][0] + 1 && levelGrid["goal"][0][1] == levelGrid["player"][0][1] && levelGrid["ice"].length == 1)) {
            meltIce()
            levelGrid["player"][0][0] += 1
            break
          }
        }
        break
      case 40:
        for (i=0;i<levelGrid["ice"].length;i++) {
          if ((levelGrid["ice"][i][0] == levelGrid["player"][0][0] && levelGrid["ice"][i][1] == levelGrid["player"][0][1] + 1) || (levelGrid["goal"][0][0] == levelGrid["player"][0][0] && levelGrid["goal"][0][1] == levelGrid["player"][0][1] + 1 && levelGrid["ice"].length == 1)) {
            meltIce()
            levelGrid["player"][0][1] += 1
            break
          }
        }
        break
    }
  }
  // Check Win
  if (levelGrid["goal"][0][0] == levelGrid["player"][0][0] && levelGrid["goal"][0][1] == levelGrid["player"][0][1] && levelGrid["ice"].length == 0) {
    if (level < Object.keys(levels).length - 1) {
      level += 1
      loadLevel()
    } else {
      level = 0
      loadLevel()
    }
  }
}

function meltIce() {
  for (i=0;i<levelGrid["ice"].length;i++) {
    if (levelGrid["ice"][i][0] == levelGrid["player"][0][0] && levelGrid["ice"][i][1] == levelGrid["player"][0][1]) {
      levelGrid["ice"].splice(i, 1)
      break
    }
  }
  levelGrid["water"].push([levelGrid["player"][0][0], levelGrid["player"][0][1]])
}

function drawSprites() {
  //Clear Board
  context.clearRect(0, 0, canvas.width, canvas.height)

  //Draw Sprites
  for (i=0;i<levelGrid["ice"].length;i++) {
    context.drawImage(iceSprite, 0, 0, gridSize, gridSize, levelGrid["ice"][i][0] * gridSize, levelGrid["ice"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["walls"].length;i++) {
    context.drawImage(wallSprite, 0, 0, gridSize, gridSize, levelGrid["walls"][i][0] * gridSize, levelGrid["walls"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["water"].length;i++) {
    context.drawImage(waterSprite, frame * 32, 0, gridSize, gridSize, levelGrid["water"][i][0] * gridSize, levelGrid["water"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["goal"].length;i++) {
    context.drawImage(goalSprite, 0, 0, gridSize, gridSize, levelGrid["goal"][i][0] * gridSize, levelGrid["goal"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["blanks"].length;i++) {
    context.drawImage(blankSprite, 0, 0, gridSize, gridSize, levelGrid["blanks"][i][0] * gridSize, levelGrid["blanks"][i][1] * gridSize, gridSize, gridSize)
  }
  context.drawImage(playerSprite, frame * 32, 0, gridSize, gridSize, levelGrid["player"][0][0] * gridSize, levelGrid["player"][0][1] * gridSize, gridSize, gridSize)

  //Update Frames
  if (frameCount == 5) {
    frame = (frame == 8) ? 1 : frame + 1
    frameCount = 0
  } else {
    frameCount += 1
  }
}
