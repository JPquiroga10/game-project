// window.onload = function() {
// helloooo  
var myCanvas = document.getElementById('theCanvas');
  var ctx = myCanvas.getContext('2d');
  var currentGame;
  var theImage;
  
  
  
  var Doodler = function(){
    this.x = 240;
    this.y = 600;
    this.width = 50;
    this.height = 85;
    this.img = 'images/doodler.png';   
          
  }
  
  Doodler.prototype.drawDoodler = function(){
    var that = this;
    theImage = new Image();
    theImage.src = that.img;
    theImage.onload = function(){
      ctx.drawImage(theImage, that.x, that.y,  that.width, that.height)
    }
  }
 
    
  
  Doodler.prototype.move = function() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    
    switch (whichKey){
      case 'ArrowLeft':
      this.x -=5;
      break;
      case 'ArrowRight':
      this.y +=5;
      break;
      case 'ArrowUp':
      this.y -=5;
      break;
      case 'ArrowDown':
      this.y +=5;

    }   
    ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
  }
  


    