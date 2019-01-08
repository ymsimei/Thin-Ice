function startGame() {
  //Remove Start Button
  startBtn.parentNode.removeChild(startBtn)
  levelLabel.style.opacity = 1
  iceLabel.style.opacity = 1
  solvedLabel.style.opacity = 1
  resetButton.style.opacity = 1
  scoreLabel.style.opacity = 1

  //Add Inputs
  document.addEventListener("keydown", handleKeyboardInput)

  //Add Sprites
  loadLevel()
  setInterval(gameLoop, 1000/30)

  //Start Music
  // theme.play()
}

function gameLoop() {
  drawSprites()
  totalFrames += 1
}

function loadLevel() {
  inventory = 0
  levelGrid = {
    player: [],
    walls: [],
    ice: [],
    hardIce: [],
    water: [],
    goal: [],
    blanks: [],
    keys: [],
    doors: []
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
      } else if (levelData[y][x] == "D") {
        levelGrid["doors"].push([x, y])
      } else if (levelData[y][x] == "K") {
        levelGrid["keys"].push([x, y])
      } else if (levelData[y][x] == "P") {
        levelGrid["player"].push([x, y])
        levelGrid["ice"].push([x, y])
      } else {
        levelGrid["blanks"].push([x, y])
      }
    }
  }
  levelLabel.innerHTML = "LEVEL: " + level
  solvedLabel.innerHTML = "SOLVED: " + (level - 1)
}

function handleKeyboardInput(key) {
  document.removeEventListener("keydown", handleKeyboardInput)
  event.keyCode = key
  direction = event.keyCode
  switch (direction) {
    case 37:
      direction = "left"
      break
    case 38:
      direction = "up"
      break
    case 39:
      direction = "right"
      break
    case 40:
      direction = "down"
      break
  }
  tile = checkTile(direction)
  switch (tile) {
    case "ice":
      meltIce()
      movePlayer(direction)
      addScore(1)
      break
    case "hardIce":
      meltIce()
      movePlayer(direction)
      addScore(1)
      break
    case "goal":
      meltIce()
      if (level < Object.keys(levels).length - 1) {
        level += 1
      } else {
        level = 0
      }
      loadLevel()
      addScore(10)
      document.addEventListener("keydown", handleKeyboardInput)
      break
    case "keys":
      meltIce()
      takeKey(direction)
      movePlayer(direction)
      addScore(1)
      break
    case "doors":
      if (inventory > 0) {
        inventory -= 1
        switch (direction) {
          case "left":
            doorIndex = searchForArray(levelGrid["doors"], [levelGrid["player"][0][0] - 1, levelGrid["player"][0][1]])
            levelGrid["doors"].splice(doorIndex, 1)
            levelGrid["ice"].push([levelGrid["player"][0][0] - 1, levelGrid["player"][0][1]])
            document.addEventListener("keydown", handleKeyboardInput)
            break
          case "right":
            doorIndex = searchForArray(levelGrid["doors"], [levelGrid["player"][0][0] + 1, levelGrid["player"][0][1]])
            levelGrid["doors"].splice(doorIndex, 1)
            levelGrid["ice"].push([levelGrid["player"][0][0] + 1, levelGrid["player"][0][1]])
            document.addEventListener("keydown", handleKeyboardInput)
            break
          case "up":
            doorIndex = searchForArray(levelGrid["doors"], [levelGrid["player"][0][0], levelGrid["player"][0][1] - 1])
            levelGrid["doors"].splice(doorIndex, 1)
            levelGrid["ice"].push([levelGrid["player"][0][0], levelGrid["player"][0][1] - 1])
            document.addEventListener("keydown", handleKeyboardInput)
            break
          case "down":
            doorIndex = searchForArray(levelGrid["doors"], [levelGrid["player"][0][0], levelGrid["player"][0][1] + 1])
            levelGrid["doors"].splice(doorIndex, 1)
            levelGrid["ice"].push([levelGrid["player"][0][0], levelGrid["player"][0][1] + 1])
            document.addEventListener("keydown", handleKeyboardInput)
            break
        }
        break
      }
      document.addEventListener("keydown", handleKeyboardInput)
      break
    default:
      document.addEventListener("keydown", handleKeyboardInput)
  }
}

function takeKey(direction) {
  inventory += 1
  switch (direction) {
    case "left":
      p = searchForArray(levelGrid["keys"], [levelGrid["player"][0][0] - 1, levelGrid["player"][0][1]])
      levelGrid["keys"].splice(p, 1)
      levelGrid["ice"].push([levelGrid["player"][0][0] - 1, levelGrid["player"][0][1]])
      break
    case "right":
      p = searchForArray(levelGrid["keys"], [levelGrid["player"][0][0] + 1, levelGrid["player"][0][1]])
      levelGrid["keys"].splice(p, 1)
      levelGrid["ice"].push([levelGrid["player"][0][0] + 1, levelGrid["player"][0][1]])
      break
    case "up":
      p = searchForArray(levelGrid["keys"], [levelGrid["player"][0][0], levelGrid["player"][0][1] - 1])
      levelGrid["keys"].splice(p, 1)
      levelGrid["ice"].push([levelGrid["player"][0][0], levelGrid["player"][0][1] - 1])
      break
    case "down":
      p = searchForArray(levelGrid["keys"], [levelGrid["player"][0][0], levelGrid["player"][0][1] + 1])
      levelGrid["keys"].splice(p, 1)
      levelGrid["ice"].push([levelGrid["player"][0][0], levelGrid["player"][0][1] + 1])
      break
  }
}

function addScore(number) {
  score += number
  scoreLabel.innerHTML = "SCORE: " + score
}

function movePlayer(direction) {
  count = 0
  switch (direction) {
    case "left":
      var animate = setInterval(function() {
        count += 1
        levelGrid["player"][0][0] -= 0.1
        if (count == 11) {
          clearInterval(animate)
          levelGrid["player"][0][0] = Math.ceil(levelGrid["player"][0][0])
        }
      }, 1000/60)
      break
    case "right":
      var animate = setInterval(function() {
        count += 1
        levelGrid["player"][0][0] += 0.1
        if (count == 11) {
          clearInterval(animate)
          levelGrid["player"][0][0] = Math.floor(levelGrid["player"][0][0])
        }
      }, 1000/60)
      break
    case "up":
      var animate = setInterval(function() {
        count += 1
        levelGrid["player"][0][1] -= 0.1
        if (count == 11) {
          clearInterval(animate)
          levelGrid["player"][0][1] = Math.ceil(levelGrid["player"][0][1])
        }
      }, 1000/60)
      break
    case "down":
      var animate = setInterval(function() {
        levelGrid["player"][0][1] += 0.1
        if (count == 11) {
          clearInterval(animate)
          levelGrid["player"][0][1] = Math.floor(levelGrid["player"][0][1])
        }
        count += 1
      }, 1000/60)
      break
  }
  setTimeout(finishedMove(direction), 100);
}

function finishedMove(direction) {
  document.addEventListener("keydown", handleKeyboardInput)
}

function checkTile(direction) {
  switch (direction) {
    case "left":
      for (var key in levelGrid) {
        if (searchForArray(levelGrid[key], [levelGrid["player"][0][0] - 1, levelGrid["player"][0][1]]) >= 0) {
          return key
        }
      }
      break
    case "right":
      for (var key in levelGrid) {
        if (searchForArray(levelGrid[key], [levelGrid["player"][0][0] + 1, levelGrid["player"][0][1]]) >= 0) {
          return key
        }
      }
      break
    case "up":
      for (var key in levelGrid) {
        if (searchForArray(levelGrid[key], [levelGrid["player"][0][0], levelGrid["player"][0][1] - 1]) >= 0) {
          return key
        }
      }
      break
    case "down":
      for (var key in levelGrid) {
        if (searchForArray(levelGrid[key], [levelGrid["player"][0][0], levelGrid["player"][0][1] + 1]) >= 0) {
          return key
        }
      }
      break
  }
}

function meltIce() {
  n = searchForArray(levelGrid["ice"], [levelGrid["player"][0][0], levelGrid["player"][0][1]])
  if (n >= 0) {
    levelGrid["ice"].splice(n, 1)
    levelGrid["water"].push([levelGrid["player"][0][0], levelGrid["player"][0][1]])
  }
  n = searchForArray(levelGrid["hardIce"], [levelGrid["player"][0][0], levelGrid["player"][0][1]])
  if (n >= 0) {
    levelGrid["hardIce"].splice(n, 1)
    levelGrid["ice"].push([levelGrid["player"][0][0], levelGrid["player"][0][1]])
  }
}

function drawSprites() {
  //Clear Board
  context.clearRect(0, 0, canvas.width, canvas.height)

  //Draw Sprites
  for (i=0;i<levelGrid["blanks"].length;i++) {
    context.drawImage(blankSprite, 0, 0, 24, 24, levelGrid["blanks"][i][0] * gridSize, levelGrid["blanks"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["walls"].length;i++) {
    context.drawImage(wallSprite, 0, 0, 24, 24, levelGrid["walls"][i][0] * gridSize, levelGrid["walls"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["ice"].length;i++) {
    context.drawImage(iceSprite, 0, 0, 24, 24, levelGrid["ice"][i][0] * gridSize, levelGrid["ice"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["goal"].length;i++) {
    context.drawImage(goalSprite, 0, 0, 24, 24, levelGrid["goal"][i][0] * gridSize, levelGrid["goal"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["hardIce"].length;i++) {
    context.drawImage(hardIceSprite, 0, 0, 24, 24, levelGrid["hardIce"][i][0] * gridSize, levelGrid["hardIce"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["water"].length;i++) {
    context.drawImage(waterSprite, (totalFrames % 37) * 24, 0, 24, 24, levelGrid["water"][i][0] * gridSize, levelGrid["water"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["doors"].length;i++) {
    context.drawImage(doorSprite, 0, 0, 24, 24, levelGrid["doors"][i][0] * gridSize, levelGrid["doors"][i][1] * gridSize, gridSize, gridSize)
  }
  for (i=0;i<levelGrid["keys"].length;i++) {
    context.drawImage(keySprite, (totalFrames % 16) * 24, 0, 24, 24, levelGrid["keys"][i][0] * gridSize, levelGrid["keys"][i][1] * gridSize, gridSize, gridSize)
  }
  context.drawImage(playerSprite, (totalFrames % 7) * 24, 0, 24, 24, levelGrid["player"][0][0] * gridSize, levelGrid["player"][0][1] * gridSize, gridSize, gridSize)
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
