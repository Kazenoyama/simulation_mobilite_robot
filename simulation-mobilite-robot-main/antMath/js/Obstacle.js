class Obstacle {
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
  }
  