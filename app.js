// Initial Canvas Setup
canvas = document.querySelector("canvas")
context = canvas.getContext("2d")
gridSize = 32
canvas.height = 15 * gridSize
canvas.width = 19 * gridSize

//Set Label Variables
levelLabel = document.getElementById("levelLabel")

//Setup Game Variables
level = 7
points = 0

startGame()
