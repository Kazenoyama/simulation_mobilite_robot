class Obstacle {

  constructor(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.beginAngle = 0;
    this.endAngle = 2 * Math.PI;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, this.beginAngle, this.endAngle);
    context.stroke();
    context.fillStyle = "grey";
    context.fill();
  }

  getX(){return this.centerX;}
  getY(){return this.centerY;}
  getRadius(){return this.radius;}
  getBeginAngle(){return this.beginAngle;}
  getEndAngle(){return this.endAngle;}

  /*
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    // Méthode pour dessiner l'obstacle sur le canvas
    draw(context) {
      context.fillStyle = 'black'; // Couleur de l'obstacle
      context.fillRect(this.x, this.y, this.width, this.height);

      context.beginPath();
      context.arc(this.x,this.y,100,0,2*Math.PI);
      context.stroke();
      context.fillStyle = "red";
      context.fill();
    }
  
    // Méthode pour détecter les collisions avec l'obstacle
    collidesWith(object) {
      return (
        object.x < this.x + this.width &&
        object.x + object.width > this.x &&
        object.y < this.y + this.height &&
        object.y + object.height > this.y
      );
    }

    getX(){return this.x;}
    getY(){return this.y;}
    getWidth(){return this.width;}
    getHeight(){return this.height;}
    */
  }
  