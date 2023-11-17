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
    Ant.prototype.follow = function (Ant,end) {

        
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
                distance <= objet.radius 
            ) {
              console.log("Collision avec fourmi sans couleur");
              var colCoord = {x: this.x, y: this.y};
              this.setSpeed(Ant,objet,end,colCoord);
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
        /*
        var positionX = this.getPositionWithoutPx(this.img.style.left);
        var positionY = this.getPositionWithoutPx(this.img.style.top);
        for (var objet of ob) {
            distance = Math.sqrt(Math.pow(positionX - objet.centerX, 2) + Math.pow(positionY - objet.centerY, 2));
            if (
                distance < objet.radius 
            ) {
              console.log("Collision avec fourmi de tete");
              this.setSpeed(Ant,objet);
            }
        }*/
        
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
    Ant.prototype.followEnd = function (Ant, ob,end) {
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
                distance <= objet.radius 
            ) {
              console.log("Collision avec fourmi");
              this.setSpeed(Ant,objet,end);

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

    Ant.prototype.getAngle = function(Ant,objet,end){
        const angleRadians = Math.atan2(end.y - objet.centerY, end.x - objet.centerX) - Math.atan2(Ant.y - objet.centerY, Ant.x - objet.centerX);
        const angleDegrees = (angleRadians * 180) / Math.PI;
        return angleDegrees;
    };
    
    /*To follow the right path i need to know which part of the circle is better to arrive faster at the destination. For that we just need to know from which point we can have a straight line
    to the finish and then we can decide if we turn clockwise or counter clockwise on the circle.

    To DO : function to know the disctance from one point of the circle to the finish
    Adjust the speed of a ant : + if we need to go down, - if we need to go up
    Bug who need to be fiexd : We can go up and down but when we go right to left,
    we go throught the obstacle.*/ 

    Ant.prototype.getDistanceBetweenPoints= function(latitude1, longitude1, latitude2, longitude2) {
        let theta = longitude1 - longitude2;
        let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
            Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
            Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
        );
        return distance;}

    Ant.prototype.setSpeedY = function(Ant, objet,end){
        var speed;
        /*
        //Get the distance between 4 different point of the obstacle and the end 
        var distanceSommet = this.getDistanceBetweenPoints(objet.x,objet.y+objet.radius,end.x,end.y);       //Get the distance between the top of the circle and the end
        var distanceCoteDroit = this.getDistanceBetweenPoints(objet.x+objet.radius,objet.y,end.x,end.y);    //Get the distance between the right of the circle and the end
        var distanceBas = this.getDistanceBetweenPoints(objet.x,objet.y-objet.radius,end.x,end.y);          //Get the distance between the bottom of the circle and the end
        var distanceCoteGauche = this.getDistanceBetweenPoints(objet.x-objet.radius,objet.y,end.x,end.y);   //Get the distance between the left of the circle and the end

        var distanceSommetAnt = this.getDistanceBetweenPoints(objet.x,objet.y+objet.radius,Ant.x,Ant.y);       //Get the distance between the top of the circle and the end
        var distanceCoteDroitAnt = this.getDistanceBetweenPoints(objet.x+objet.radius,objet.y,Ant.x,Ant.y);    //Get the distance between the right of the circle and the end
        var distanceBasAnt = this.getDistanceBetweenPoints(objet.x,objet.y-objet.radius,Ant.x,Ant.y);          //Get the distance between the bottom of the circle and the end
        var distanceCoteGaucheAnt = this.getDistanceBetweenPoints(objet.x-objet.radius,objet.y,Ant.x,Ant.y);   //Get the distance between the left of the circle and the end

        var centerX = objet.centerX;
        var centerY = objet.centerY;
        var radius = objet.radius;

        //Version simple
        //left of the circle
        //console.log("this.x : ",this.x, "this.y : ",this.y ,"Ant.x : ",Ant.x," Ant.y : ",Ant.y," objet.x : ",objet.centerX," objet.y : ",objet.centerY," objet.radius : ",objet.radius," end.x : ",end.x," end.y : ",end.y);
        if(this.x < centerX){
            //Top left of the circle
            if(this.y >= centerY){
                 //Going to the top right
                 if(end.x > centerX && end.y > centerY){speed = -0.5;}
                 //Going to the bottom right / bottom left
                 else{speed = 0.5};
                 //Need to know in which direction we need to go
            } 
            //bottom left of the circle   
            else{
                //Going bottom right
                if(this.x > centerX && this.y < centerY){speed = -0.5;}
                //All other direction
                else{speed = -0.5;}
            }

        }
        //right of the circle
        else{
            //Top right of the circle
            if(Ant.y > centerY){
                //Going to the top left
                if(this.x < centerX && this.y > centerY){speed = -0.5;}
                //
                else{speed = -0.5};
                //Need to know in which direction we need to go
           } 
           //bottom right of the circle   
           else{
               //Going bottom right
               if(this.x < centerX && this.y < centerY){speed = 0.5;}
               //All other direction
               else{speed = 0.5;}
           }
        }*/

        
        if (Ant.y < this.y+objet.radius*2){
            speed = -0.5;
        }
        else{speed = 0.5;}
        
        return speed;
        
    };

    Ant.prototype.setSpeedX = function(Ant, sY, objet){
        var speed;
        //If we need to go up
        if(sY<0){
            //If we go left to right
            if(Ant.x < this.x){
                if(Ant.x < objet.centerX && Ant.y <= objet.centerY){speed = -0.5;}
                else{speed = 0.5;}
            }
            //if we go rigth to left
            else{
                if(Ant.x > objet.centerX && Ant.y <= objet.centerY){speed = 0.5;}
                else{speed = -0.5;}
            }   
        }
        //If we need to go down
        else{
             //If we go left to right
             if(Ant.x < this.x){
                if(Ant.x < objet.centerX && Ant.y >= objet.centerY){speed = -0.5;}
                else{speed = 0.5;}
            }
            //if we go rigth to left
            else{
                if(Ant.x > objet.centerX && Ant.y >= objet.centerY){speed = 0.5;}
                else{speed = -0.5;}
            }
        }
        return speed;
    };

    Ant.prototype.setSpeed = function(Ant, objet,end){
        //console.log(end);

        //Wants to know if we need to go up or down:
        //this.speedY = this.setSpeedY(Ant, objet,end);

        this.speedY = this.setSpeed2(Ant, objet,end);
        //this.speedX = this.setSpeedX(Ant, this.speedY, objet);

        //this.setSpeed2(Ant,objet,end);


    }

    Ant.prototype.setSpeed2 = function(Ant, objet,end){
        console.log("setSpeed2");
        var speed;

        //Get the distance between 4 different point of the obstacle and the end 
        var distanceSommet = this.getDistanceBetweenPoints(objet.x,objet.y+objet.radius,end.x,end.y);       //Get the distance between the top of the circle and the end
        var distanceCoteDroit = this.getDistanceBetweenPoints(objet.x+objet.radius,objet.y,end.x,end.y);    //Get the distance between the right of the circle and the end
        var distanceBas = this.getDistanceBetweenPoints(objet.x,objet.y-objet.radius,end.x,end.y);          //Get the distance between the bottom of the circle and the end
        var distanceCoteGauche = this.getDistanceBetweenPoints(objet.x-objet.radius,objet.y,end.x,end.y);   //Get the distance between the left of the circle and the end

        var distanceSommetAnt = this.getDistanceBetweenPoints(objet.x,objet.y+objet.radius,this.x,this.y);       //Get the distance between the top of the circle and the ant
        var distanceCoteDroitAnt = this.getDistanceBetweenPoints(objet.x+objet.radius,objet.y,this.x,this.y);    //Get the distance between the right of the circle and the ant
        var distanceBasAnt = this.getDistanceBetweenPoints(objet.x,objet.y-objet.radius,this.x,this.y);          //Get the distance between the bottom of the circle and the ant
        var distanceCoteGaucheAnt = this.getDistanceBetweenPoints(objet.x-objet.radius,objet.y,this.x,this.y);   //Get the distance between the left of the circle and the ant

        var centerX = objet.centerX;
        var centerY = objet.centerY;
        console.log(this.x,this.y);
        console.log(centerX,centerY);

        //this is the Ant we use
        //Ant is the Ant we want to follow
        //end is the end of the path

        //for each quadron of the circle, we create a path to the end 
        //Top left of the circle
        if(this.x <= centerX && this.y <= centerY){
            console.log("Top left");
            if(end.x >= centerX && end.y <= centerY){
                console.log("Going to the top right");
                speed = -0.5;}
            if(distanceSommetAnt <= distanceCoteGaucheAnt && distanceCoteDroit <= distanceBas){
                console.log("Going to the bottom right up");
                speed = -0.5;
            }
            else{
                console.log("Going to the bottom left or right down");
                speed = 0.5;
            }


        }

        //Top right of the circle
        if(this.x > centerX && this.y < centerY){
            console.log("Top right");
            if(end.x > centerX && end.y > centerY){
                console.log("Going to the bottom right");
                speed = 0.5;}

            if(distanceCoteDroitAnt <= distanceSommetAnt && distanceBas <= distanceCoteGauche){
                console.log("Going to the bottom left down");
                speed = 0.5;
            }
            else{
                console.log("Going to the top left or bottom left up");
                speed = -0.5;
            }
        }

        //Bottom right of the circle
        if(this.x >= centerX && this.y >= centerY){
            console.log("Bottom right");
            if(end.x < centerX && end.y > centerY){
                console.log("Going to the bottom left");
                speed = 0.5;}

            if(distanceBasAnt <= distanceCoteDroitAnt && distanceCoteGauche <= distanceSommet){
                console.log("Going to the top left down");
                speed = 0.5;
            }

            else{
                console.log("Going to the top right or top left up");
                speed = -0.5;
            }
        }

        //Bottom left of the circle
        if(this.x < centerX && this.y > centerY){
            console.log("Bottom left");
            if(end.x <= centerX && end.y <= centerY){
                console.log("Going to the top left");
                speed = -0.5;}

            if(distanceCoteGaucheAnt <= distanceBasAnt && distanceSommet <= distanceCoteDroit){
                console.log("Going to the top right up");
                speed = -0.5;
            }
            else{
                console.log("Going to the bottom right or top right down");
                speed = 0.5;
            }
        }

        return speed;

    };

    return Ant;
}());
