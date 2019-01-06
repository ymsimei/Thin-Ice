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
    hardIce: [],
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
      } else if (levelData[y][x] == "H") {
        levelGrid["hardIce"].push([x, y])
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
  playerX = levelGrid["player"][0][0]
  playerY = levelGrid["player"][0][1]
  spaces = []
  spaces = levelGrid["ice"].concat(levelGrid["goal"]).concat(levelGrid["hardIce"])
  //Movement
  switch(event.keyCode) {
    case 37:
      if (searchForArray(spaces, [playerX - 1, playerY]) >= 0) {
        meltIce()
        levelGrid["player"][0][0] -= 1
        break
      }
      break
    case 38:
      if (searchForArray(spaces, [playerX, playerY - 1]) >= 0) {
        meltIce()
        levelGrid["player"][0][1] -= 1
        break
      }
      break
    case 39:
      if (searchForArray(spaces, [playerX + 1, playerY]) >= 0) {
        meltIce()
        levelGrid["player"][0][0] += 1
        break
      }
      break
    case 40:
      if (searchForArray(spaces, [playerX, playerY + 1]) >= 0) {
        meltIce()
        levelGrid["player"][0][1] += 1
        break
      }
      break
    default:
      return
  }
  // Check Win
  if (searchForArray(levelGrid["goal"], [playerX, playerY]) && levelGrid["ice"].length == 0) {
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
  n = searchForArray(levelGrid["ice"], [playerX, playerY])
  if (n >= 0) {
    console.log("melted")
    levelGrid["ice"].splice(n, 1)
    levelGrid["water"].push([playerX, playerY])
  }
  n = searchForArray(levelGrid["hardIce"], [playerX, playerY])
  if (n >= 0) {
    console.log("thawed")
    levelGrid["hardIce"].splice(n, 1)
    levelGrid["ice"].push([playerX, playerY])
  }
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
  for (i=0;i<levelGrid["hardIce"].length;i++) {
    context.drawImage(hardIceSprite, 0, 0, gridSize, gridSize, levelGrid["hardIce"][i][0] * gridSize, levelGrid["hardIce"][i][1] * gridSize, gridSize, gridSize)
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
  if (frameCount == 3) {
    frame = (frame == 8) ? 1 : frame + 1
    frameCount = 0
  } else {
    frameCount += 1
  }
}

function searchForArray(haystack, needle){
  var i, j, current;
  for(i = 0; i < haystack.length; ++i){
    if(needle.length === haystack[i].length){
      current = haystack[i];
      for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if(j === needle.length)
        return i;
    }
  }
  return -1;
}
