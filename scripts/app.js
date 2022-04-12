function init() {

  //grid container
  const grid = document.querySelector('#grid')

  const width = 20
  const cellCount = width * width
  const cells = []
  // Creating grid function
  function createGrid(){
    
    for (let i = 0; i < cellCount; i++){
    
      const cell = document.createElement('div')

      cell.id = i

      grid.appendChild(cell)

      cells.push(cell)

    }

  }

  // Apple variables
  const appleClass = 'apple'
  let applePosition = -1

  // Adding the apple to the board 
  function addApple(){
    
    if ( applePosition !== -1){
      cells[applePosition].classList.remove(appleClass)
    }
    
    applePosition = Math.floor(Math.random() * cells.length)

    cells[applePosition].classList.add(appleClass)

  }
  // // Removing the apple from the board

  // Snake variable
  const snakeClass = 'snake'
  let snakeDirection = 1
  let snakeSpeed = 500
  const snake = [2,1,0]
  snake.push( 0 )
  let newSnake = -1

  // Moves snake
  function moveSnake(){
    //console.log('move')
    let restartGame = false
    

    //console.log( snake[0] )
    cells[snake[0]].classList.remove(snakeClass)
    //cells[snake[0]].classList.remove(snakeClass)

    // check if snake is moving off grid

    if (snakeDirection === 1 && snake[0] % width === (width - 1) ){
      restartGame = true
      console.log('snake went off right')
    } else if (snakeDirection === 3 && snake[0] % width === 0) {
      restartGame = true
      console.log('snake went off left')
    } else if (snakeDirection === 2 && snake[0] >= 380) {
      restartGame = true
      console.log('snake went off bottom')
    } else if (snakeDirection === 4 && snake[0] <= 19) {
      restartGame = true
      console.log('snake went off top')
    }
    
    
    //find new position
    if ( restartGame === false ){
      //console.log('updating position')
      if (snakeDirection === 1){
        // const tail = snake.pop()
        // cells[tail].classList.remove(snakeClass)
        // snake.unshift(snake[0]) 
        snake[0] ++
        // cells[snake[0]].classList.add(snakeClass)
      
        // change this to shift to add a new cell at the front and pop at the bacj, will still be ++

      } else if (snakeDirection === 3) {
        // const tail = snake.pop()
        // cells[tail].classList.remove(snakeClass)
        // snake.unshift(snake[0]) 
        snake[0] --
        // cells[snake[0]].classList.add(snakeClass)
      } else if (snakeDirection === 4) {
        snake[0] -= width
      } else if (snakeDirection === 2) {
        snake[0] += width
      } else {
        console.log('Invalid Direction')
      }
      
      cells[snake[0]].classList.add(snakeClass)
      //cells[snake[0]].classList.add(snakeClass) use something similiar to remove old snake position
    } else {
      gameOver()

    }


    //snake eats apple
    // console.log(applePosition)
    // console.log(snake[0])

    if ( applePosition === snake[0]){
      speedUp()
      grow()
      addApple()
    }
    


  }

  //Snake direction 
  function changeSnakeDirection(event){
    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40  

    //console.log(snake[0] % width)
    if (key === right){
      snakeDirection = 1
    } else if (key === left) {
      snakeDirection = 3
    } else if (key === up) {
      snakeDirection = 4
    } else if (key === down) {
      snakeDirection = 2
    } else {
      console.log('Invalid Key')
    }
    
  }  

  function gameOver(){
    console.log('game over')
    clearInterval(myInterval)
    //window.alert('Game over')

  }
  //Speeding up if apple is eaten
  function speedUp(){
    console.log('speed up')
    clearInterval(myInterval)
    snakeSpeed = snakeSpeed * 0.9
    myInterval = setInterval(moveSnake, snakeSpeed)

  }


  //Growing if apple is eaten
  function grow(){
    console.log('grow')
  
    if (snakeDirection === 1){
      newSnake = snake[0] - 1
      console.log(newSnake)
    } else if (snakeDirection === 3) {
      newSnake = snake[0] + 1
    } else if (snakeDirection === 4) {
      newSnake = snake[0] -= width
    } else if (snakeDirection === 2) {
      newSnake = snake[0] += width
    } else {
      console.log('Invalid Direction')
    }
    snake.push( newSnake )
    

    console.log( snake.length )
    console.log( snake[(snake.length) - 1 ] )
    cells[snake[ snake.length - 1 ]].classList.add(snakeClass) //Removing tth


  }




  // SNAKE MOVES CHANGED 33 32 31, Length 

  
  createGrid()

  //place apple and snake on screen
  cells[snake[0]].classList.add(snakeClass)
  // cells[snake[0]].classList.add(snakeClass)

  addApple()

  var myInterval = setInterval(moveSnake, snakeSpeed)

  document.addEventListener('keydown', changeSnakeDirection)

}
window.addEventListener('DOMContentLoaded', init)