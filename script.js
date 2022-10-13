var bite = new Audio ('assets/music/caida2.wav')
var ost = new Audio ('assets/music/TakeOnMe.mp3')

var snake = {
  pos: [{  x: 10, y: 10,}],
  direction: 'left', //left, right, up, down
  updateSnake: function () {
    switch (this.direction) {
      case 'left':
        // if (this.x === 1) {
        //   this.x = 20
        // } else {
        //   this.x--
        // }
        this.pos.unshift({
          x: this.pos[0].x === 1 ? 20 : this.pos[0].x - 1,
          y: this.pos[0].y
        })
        break
      case 'right':
        this.pos.unshift({
          x: this.pos[0].x === 20 ? 1 : this.pos[0].x + 1,
          y: this.pos[0].y
        })
        break
      case 'up':
        this.pos.unshift({
          x: this.pos[0].x,
          y: this.pos[0].y === 1 ? 20 : this.pos[0].y - 1
        })
        break
      case 'down':
        this.pos.unshift({
          x: this.pos[0].x,
          y: this.pos[0].y === 20 ? 1 : this.pos[0].y + 1
        })
        break
    }
    if (game.grow) {
      game.grow = false
    } else {
      this.pos.pop()
    }
  }
}

var food = {
  x: 5,
  y:5,
  update: function () {
    this.x = Math.ceil(Math.random() * game.width),
    this.y = Math.ceil(Math.random() * game.height)
  }
}

var game = {
  width: 20,
  height: 20,
  speed: 500,
  grow: false,
  drawBoard: function () {
    snake.pos.forEach(function(pos) {
      var snakeCell = document.querySelector(`.row${pos.y} .col${pos.x}`)
      snakeCell.classList.add('snake')
    })
  
    var foodCell = document.querySelector(`.row${food.y} .col${food.x}`)
    foodCell.classList.add('food')
  },
  removeSnake: function () {
    var snakeCells = document.querySelectorAll('.snake')
    snakeCells.forEach(function (elem) {
      elem.classList.remove('snake')
    })
  },
  removeFood: function () {
    var foodCell = document.querySelector('.food')
    foodCell.classList.remove('food')
  },
  checkFood: function () {
    if ( snake.pos[0].x === food.x && snake.pos[0].y === food.y ) {
      bite.play()
      this.removeFood()
      food.update()
      this.grow = true
      this.speed /= 1.2
      clearInterval(this.timerId)
      this.timerId = setInterval(play, game.speed)
    }
  },
  checkGameOver () {
    var head = snake.pos[0]
    for ( var i = 1; i < snake.pos.length; i++ ) {
      if ( head.x === snake.pos[i].x && head.y === snake.pos[i].y ) {
        alert('Game Over')
        clearInterval(this.timerId)
      }
    }
  },
  start: function () {
    window.addEventListener('keydown', function(e) {
      switch(e.code) {
        case 'ArrowLeft':
          snake.direction = 'left'
          break
        case 'ArrowRight':
          snake.direction = 'right'
          break
        case 'ArrowUp':
          snake.direction = 'up'
          break
        case 'ArrowDown':
          snake.direction = 'down'
          break
      }
    })

    ost.volume = 0.1

    bite.volume = 0.2
    this.timerId = setInterval(play, game.speed)
  }
}



function play() {
  game.removeSnake()
  snake.updateSnake()
  game.checkGameOver()
  game.checkFood()
  game.drawBoard()
}

game.drawBoard()

game.start()
ost.play()


