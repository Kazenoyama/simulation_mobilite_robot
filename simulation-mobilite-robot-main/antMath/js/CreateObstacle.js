var CreateObstacle = /**@class */ function(){

    var canvas = document.getElementById("playGround");
    var ctx = canvas.getContext("2d");
    var createObstacle = document.getElementById("createBox");
    var removeObstacleButton = document.getElementById("removeBox");

    var listeObstacle = [];
    var listeColision = [];
    var length = 0;


    // Initialisation Bool
    var isDrawing = false;
    var isCollisionEnabled = false;
  
    // Set canvas dimensions to match the viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 
    /////////////////////////////////////////////////////
    // Button handle

    //Remove an obstacle
    removeObstacleButton.addEventListener("click", function () {
        if(length != 0){
        length = length-1;
        clearCanvas(listeObstacle[length].x, listeObstacle[length].y, listeObstacle[length].width, listeObstacle[length].height);
        listeColision.splice(length,1);
        listeObstacle.splice(length,1);
        }
        else{
            listeObstacle = [];
            listeColision = [];
            length = 0;
        }

    });

    // Toggle collision detection
    createObstacle.addEventListener("click", function () {
    isCollisionEnabled = true;
    });
    //////////////////////////////////////////////////

  // Function to detect collision with a rectangle
  function detectCollision(rect, x, y) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );  
  }


  // Create an obstacle when the button is clicked
  createObstacle.addEventListener("click", function () {
    var min = 100;
    var max = 500;
    var randomX = Math.floor(Math.random() * (max - min + 1)) + min;
    var randomY = Math.floor(Math.random() * (max - min + 1)) + min;
    var randomW = Math.floor(Math.random() * (max - min + 1)) + min;
    var randomH = Math.floor(Math.random() * (max - min + 1)) + min;
    obstacle = {
      x: randomX,
      y: randomY,
      width: randomW,
      height: randomH,
    };

    listeObstacle.push(obstacle);
    length = length+1;
    listeColision.push(detectCollision(obstacle,obstacle.x,obstacle.y));

    drawObstacle();
  });


  function drawObstacle() {
    if (obstacle) {
      ctx.fillStyle = "grey"; // Set the obstacle color
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  }

  function clearCanvas(x,y,w,h) {
    ctx.clearRect(x,y,w,h);
  }

}