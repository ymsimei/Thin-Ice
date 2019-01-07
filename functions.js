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
  inventory = []
  levelGrid = {
    player: [],
    walls: [],
    ice: [],
    hardIce: [],
    water: [],
    goal: [],
    blanks: [],
    keys: []
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
      } else if (levelData[y][x] == "K") {
        levelGrid["keys"].push([x, y])
        levelGrid["ice"].push([x, y])
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

// function handleKeyboardInput(key) {
//   if (!event.keyCode) {
//     switch(key) {
//       case "left":
//         event.keyCode = 37
//         break
//       case "up":
//         event.keyCode = 38
//         break
//       case "right":
//         event.keyCode = 39
//         break
//       case "down":
//         event.keyCode = 40
//         break
//       default:
//         return
//     }
//   }
//   playerX = levelGrid["player"][0][0]
//   playerY = levelGrid["player"][0][1]
//   spaces = []
//   if (levelGrid["ice"].length == 1) {
//     spaces = levelGrid["ice"].concat(levelGrid["goal"]).concat(levelGrid["hardIce"])
//   } else {
//     spaces = levelGrid["ice"].concat(levelGrid["hardIce"])
//   }
//   //Movement
//   switch(event.keyCode) {
//     case 37:
//       if (searchForArray(spaces, [playerX - 1, playerY]) >= 0) {
//         meltIce()
//         levelGrid["player"][0][0] -= 1
//         break
//       }
//       break
//     case 38:
//       if (searchForArray(spaces, [playerX, playerY - 1]) >= 0) {
//         meltIce()
//         levelGrid["player"][0][1] -= 1
//         break
//       }
//       break
//     case 39:
//       if (searchForArray(spaces, [playerX + 1, playerY]) >= 0) {
//         meltIce()
//         levelGrid["player"][0][0] += 1
//         break
//       }
//       break
//     case 40:
//       if (searchForArray(spaces, [playerX, playerY + 1]) >= 0) {
//         meltIce()
//         levelGrid["player"][0][1] += 1
//         break
//       }
//       break
//     default:
//       return
//   }
//   // Check Win
//   if (searchForArray(levelGrid["goal"], [playerX, playerY]) && levelGrid["ice"].length == 0) {
//     if (level < Object.keys(levels).length - 1) {
//       level += 1
//       loadLevel()
//     } else {
//       level = 0
//       loadLevel()
//     }
//   }
// }

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
    default:
      document.addEventListener("keydown", handleKeyboardInput)
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
          // document.addEventListener("keydown", handleKeyboardInput)
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
          // document.addEventListener("keydown", handleKeyboardInput)
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
          // document.addEventListener("keydown", handleKeyboardInput)
        }
      }, 1000/60)
      break
    case "down":
      var animate = setInterval(function() {
        levelGrid["player"][0][1] += 0.1
        if (count == 11) {
          clearInterval(animate)
          levelGrid["player"][0][1] = Math.floor(levelGrid["player"][0][1])
          // document.addEventListener("keydown", handleKeyboardInput)
        }
        count += 1
      }, 1000/60)
      break
  }
  setTimeout(function() {document.addEventListener("keydown", handleKeyboardInput)}, 100);
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
