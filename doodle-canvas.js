// window.onload = function() {
// helloooo  

var myCanvas = document.getElementById('doodleJump');
var ctx = myCanvas.getContext('2d')
myCanvas
myCanvas.width = 500;
myCanvas.height=700;
  var currentGame;
  var theImage;
  // height: 700px;
  // width: 500px

  //MY PLAYER FUNCTION
  var chewy = function(x,y,width,height){
    var ctx = document.getElementById('doodleJump').getContext('2d');
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    var img = new Image();

  img.onload = function() {
    ctx.drawImage(img, x, y,width,height);
  };
  img.src = './images/Chewy.png';
    
  }
  //CALLING MY PLAYER FUNCION

chewy(220,643,50,50)
  // Chewy.prototype.drawChewy = function(){
  //   var that = this;
  //   theImage = new Image();
  //   theImage.src = that.img;
  //   theImage.onload = function(){
  //     ctx.drawImage(theImage, that.x, that.y,  that.width, that.height)
  //   }
  // }
 
  
  // chewy.prototype.move = function(whichArrow, jump) {
  //   ctx.clearRect(this.x, this.y, this.width, this.height);
    
  //   switch (whichKey){
  //     case 'ArrowLeft':
  //     this.x -=5;
  //     break;
  //     case 'ArrowRight':
  //     this.y +=5;
  //     break;
  //     case 'ArrowUp':
  //     this.y -=5;
  //     break;
  //     case 'ArrowDown':
  //     this.y +=5;

  //   }   
  //   ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
  // }
  
  


    