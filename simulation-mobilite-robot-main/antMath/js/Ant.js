var Ant = /** @class */ (function () {
    //ant constructor
    function Ant(link, x, y) {
        //image, speed, pos, distance
        this.img = document.createElement('img');
        this.speedX = 0;
        this.speedY = 0;
        this.distance = 0;
        this.img.src = link;
        this.img.style.position = 'absolute';
        this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%)';
        this.img.style.width = x + 'px';
        this.img.style.height = y + 'px';
        //this.spX = 0;
        //this.spY = 0.5;
    }
    //teleport the ant to x and y, update distance and coordonates
    Ant.prototype.move = function (x, y) {
        this.img.style.left = x + 'px';
        this.img.style.top = y + 'px';

        //console.log(this.img.style.left, this.img.style.top)
        this.x = x;
        this.y = y;
        this.distance += Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
    };
    //follow the given ant at with spacingAnt as distance
    Ant.prototype.follow = function (Ant) {
        
        var dx = Ant.x - this.x;
        var dy = Ant.y - this.y;
        if (Math.abs(dx) < spacingAnt && Math.abs(dy) < spacingAnt) {
            this.speedX = 0;
            this.speedY = 0;
        }
        else if (Math.max(Math.abs(dx), Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
        }
        else {
            this.speedX = dx;
            this.speedY = dy;
        }
        var angl = Math.atan(dy / dx) * 180 / Math.PI;

        var positionX = this.getPositionWithoutPx(this.img.style.left);
        var positionY = this.getPositionWithoutPx(this.img.style.top);
        for (var objet of ob) {
            distance = Math.sqrt(Math.pow(positionX - objet.centerX, 2) + Math.pow(positionY - objet.centerY, 2));
            if (
                distance < objet.radius 
            ) {
              console.log("Collision avec fourmi sans couleur");
              this.setSpeed(Ant,objet);
            }
        }

        if (dx < 0) {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (-90 + angl) + 'deg) ';
        }
        else {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + ((-90 - angl) * (-1)) + 'deg) ';
        }
        this.move(this.x + this.speedX, this.y + this.speedY);
    };

    //follow the path by giving points one by one
    Ant.prototype.followN = function (x, y, ob) {
        var dx = x - this.x;
        var dy = y - this.y;
        //console.log(x,y)
        //console.log(this.x,this.y)
        if (Math.max(Math.abs(dx), Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
        }
        else {
            this.speedX = dx;
            this.speedY = dy;
        }
        var angl = Math.atan(dy / dx) * 180 / Math.PI;

        //Test collision avec les obstacles (fourmi de tête)
        
        var positionX = this.getPositionWithoutPx(this.img.style.left);
        var positionY = this.getPositionWithoutPx(this.img.style.top);
        for (var objet of ob) {
            distance = Math.sqrt(Math.pow(positionX - objet.centerX, 2) + Math.pow(positionY - objet.centerY, 2));
            if (
                distance < objet.radius 
            ) {
              console.log("Collision avec fourmi de tete");
              this.speedX = 0;
              this.speedY = 0.5;
              /*
              var point = this.getPointCircle(objet);
              for(p in point){
                  this.followN(p.x, p.y, ob);
              }
              */
            }
        }
        
       //End test collision

        if (dx < 0) {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (-90 + angl) + 'deg) ';
        }
        else {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + ((-90 - angl) * (-1)) + 'deg) ';
        }
        this.move(this.x + this.speedX, this.y + this.speedY);
    };

    //follow the end of the path (for the first ant only)
    Ant.prototype.followEnd = function (Ant, ob) {
        var dx = Ant.x - this.x;
        var dy = Ant.y - this.y;
        //console.log(this.getPositionWithoutPx(this.img.style.left), this.getPositionWithoutPx(this.img.style.top));
        var positionX = this.getPositionWithoutPx(this.img.style.left);
        var positionY = this.getPositionWithoutPx(this.img.style.top);
        //  console.log(dx, dy)
        if (Math.max(Math.abs(dx), Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx), Math.abs(dy)) * speedAnt;
        }
        else {
            this.speedX = dx;
            this.speedY = dy;
        }
        var angl = Math.atan(dy / dx) * 180 / Math.PI;

        var positionX = this.getPositionWithoutPx(this.img.style.left);
        var positionY = this.getPositionWithoutPx(this.img.style.top);
        for (var objet of ob) {
            distance = Math.sqrt(Math.pow(positionX - objet.centerX, 2) + Math.pow(positionY - objet.centerY, 2));
            if (
                distance < objet.radius 
            ) {
              console.log("Collision avec fourmi");
              this.setSpeed(Ant,objet);

            }
        }
        if (dx < 0) {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (-90 + angl) + 'deg) ';
        }
        else {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + ((-90 - angl) * (-1)) + 'deg) ';
        }

        if (dx < 5 && dx > -5 && dy < 5 && dy > -5) {
            this.move(Ant.x, Ant.y);
        }
        else {
            this.move(this.x + this.speedX, this.y + this.speedY);
        }
        
    };

    //Rajout de fonction

    Ant.prototype.getPositionWithoutPx = function (pxCoord) {return parseInt(pxCoord,10);};

    Ant.prototype.getPointCircle = function(objet){
        var point = [];
        for(var angle =0; angle < 360; angle+=2){   
            var angleInRadians = angle * (Math.PI / 180);
            // Calculate the coordinates of the point on the perimeter
            var x = objet.centerX + objet.radius * Math.cos(angleInRadians);
            var y = objet.centerY + objet.radius * Math.sin(angleInRadians);
            point.push({x: x, y: y});
        }
        return point;
    };
    
    /*To follow the right path i need to know which part of the circle is better to arrive faster at the destination. For that we just need to know from which point we can have a straight line
    to the finish and then we can decide if we turn clockwise or counter clockwise on the circle.

    To DO : function to know the disctance from one point of the circle to the finish
    Adjust the speed of a ant : + if we need to go down, - if we need to go up*/ 

    Ant.prototype.setSpeedY = function(Ant, objet){
        var speed;
        if (Ant.y < this.y){
            speed = -0.5;
        }
        else{speed = 0.5}
        
        return speed;
        
    };

    Ant.prototype.setSpeed = function(Ant, objet){

        //Wants to know if we need to go up or down:
        this.speedY = this.setSpeedY(Ant, objet);
        this.speedX = 0;

        if(this.speedY < 0){
                this.speedX = -0.5;
            
        }

    }

    return Ant;
}());
