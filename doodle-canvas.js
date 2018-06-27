window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  function startGame() {
    myGameArea.myObstacles = [];
    myGameArea.start();
    player = new Component(
      50,
      50,
      "./images/Chewy.png",
      myGameArea.canvas.width / 2 - 15,
      myGameArea.canvas.height - 100,
      "player"
    );
  }
  var lines = 0;
  var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
      this.canvas.width = 500;
      this.canvas.height = 500;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    backgroud: function() {},
    myObstacles: [],
    frames: 0,
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
      cancelAnimationFrame(this.reqAnimation);
      this.gameOver();
    },
    gameOver: function() {
      this.clear();
    }
  };
  function Component(width, height, image, x, y, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.gravity = 0.1;
    this.x = x;
    this.y = y;
    
    // if (this.type == "player") {
      this.image = new Image();
  //  } 
    this.update = function() {
      ctx = myGameArea.context;
      if (this.type == "player") {
        this.image.src = "images/Chewy.png";
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.image.src = "images/platform.png";
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    };
    this.left = function() {
      return this.x;
    };
    this.right = function() {
      return this.x + this.width;
    };
    this.top = function() {
      return this.y;
    };
    this.bottom = function() {
      return this.y + this.height;
    };
    this.crashWith = function(obstacle) {
      return !(
        player.bottom() < obstacle.top() ||
        player.top() > obstacle.bottom() ||
        player.right() < obstacle.left() ||
        player.left() > obstacle.right()
      );
    };
  }
  function updateGameArea() {
    for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
      if (player.crashWith(myGameArea.myObstacles[i])) {
        myGameArea.stop();
        return;
      }
    }
    myGameArea.clear();
    myGameArea.backgroud();
    drawObstacles();
    myGameArea.frames += 1;
    for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
      myGameArea.myObstacles[i].y += 1;
      myGameArea.myObstacles[i].update();
    }
    player.update();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }
  function drawObstacles() {
    if (myGameArea.frames % 110 === 0) {
      minWidth = (myGameArea.canvas.width - 5) * 0.09;
      maxWidth = (myGameArea.canvas.width - 5) * 0.2;
      width = minWidth + Math.floor(Math.random() * ((maxWidth-20) - minWidth));
      posX =
        40 + Math.floor(Math.random() * (myGameArea.canvas.width - 80 - width));
      myGameArea.myObstacles.push(new Component(width, 20, "images/platform.png", posX, 0));
    }
    
  }
  document.onkeydown = function(e) {
    if (e.keyCode == 39 && player.x < myGameArea.canvas.width - player.width) {
      player.x += 30;
    }
    if (e.keyCode == 37 && player.x > 55) {
      player.x -= 30;
    }
    if (e.keyCode == 38 && player.x > 55) {
      player.y -= 30;
    }
  };
};
  
  


    