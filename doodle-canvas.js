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
      this.canvas.width = 570;
      this.canvas.height = 700;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    backgroud: function() {},
    myObstacles: [],
    frames: 60,
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

  // CONTSTRUCTOR FUNCTION TO DRAW OBJECTS (chewy,platform) 
  function Component(width, height, image, x, y, type) {
    this.width = width;
    this.height = height;
    this.type = type;
    this.gravity = 1;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;
    this.vy = 2,
    this.speedY = 0;
    this.speedX = 0;
    
    
    
    
    this.image = new Image();
    this.update = function() {
      ctx = myGameArea.context;
      if (this.type == "player") {
        this.image.src = "images/Chewy.png";
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.image.src = "images/platform.png";
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        
      
      
    };
    this.left = function() {
      return this.x;
    };
    this.right = function() {
      return this.x + this.width -35;
    };
    this.top = function() {
      return this.y;
    };
    this.bottom = function() {
      return this.y + this.height -5;
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
        startGame();
        return;
      }
    }
    myGameArea.clear();
    myGameArea.backgroud();
    drawObstacles();
    myGameArea.frames += 4;
    for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
      myGameArea.myObstacles[i].y += 1;
      myGameArea.myObstacles[i].update();
    }
    player.update();
    player.newPos();
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);

  
  }

  // FUNCTION THAT DRAWS new platforms
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
    if (e.keyCode == 39 && player.x < myGameArea.canvas.width -60 ) {
      player.x += 10;
    }
    if (e.keyCode == 37 && player.x > 0) {
      player.x -= 10;
    }
    if (e.keyCode == 38 ) {
      player.y -= 170;
    }
  };
};
  
  


    