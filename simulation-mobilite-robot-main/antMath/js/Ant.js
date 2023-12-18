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

        this.randomDirection = Math.floor(Math.random() * 2);
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
    Ant.prototype.follow = function (Ant,end,start) {

        
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
              //console.log("Collision avec fourmi sans couleur");
              this.setSpeed(Ant,objet,end,start);
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
        console.log("followN");
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

        if (dx < 0) {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (-90 + angl) + 'deg) ';
        }
        else {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + ((-90 - angl) * (-1)) + 'deg) ';
        }
        this.move(this.x + this.speedX, this.y + this.speedY);
    };

    //follow the end of the path (for the first ant only)
    Ant.prototype.followEnd = function (Ant, ob,end,start) {
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
              //console.log("Collision avec fourmi");
              this.setSpeed(Ant,objet,end,start);

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

    Ant.prototype.leader = function(Ant,ob,end,start){
        var dx = -(this.x - end.x);
        var dy = -(this.y - end.y);
        
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
              //console.log("Collision avec fourmi");
              //this.obstacleAura(Ant,objet,end,start);
              //this.setSpeed(Ant,objet,end,start);
              this.obstacleAura(Ant,objet,end,start);

            }
        }

        if (dx < 0) {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (-90 + angl) + 'deg) ';
        }
        else {
            this.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + ((-90 - angl) * (-1)) + 'deg) ';
        }
        this.move(this.x + this.speedX, this.y + this.speedY);
    }

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

    Ant.prototype.getEntryPoint = function(point){
        for(var i=0; i < point.length; i++){
            if(this.getDistanceBetweenPoints(this.x,this.y,point[i].x,point[i].y) <= 5000){
                return {point: point[i], index: i}};
            }
    }

    Ant.prototype.getExitPoint = function(point,end){
        for(var i=0; i < point.length; i++){
            if(this.getDistanceBetweenPoints(end.x,end.y,point[i].x,point[i].y) <= 5000){
                return {point: point[i], index: i}};
            }
    }
    
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

    Ant.prototype.setSpeed = function(Ant, objet,end){

        //this.setSpeed3(objet,end);
        this.setSpeed2(Ant,objet,end);


    }

    /*

    Ant.prototype.setSpeed3 = function(objet,end){
        var sp = 0.5;
        var speed = {x:0,y:0};

                                                    //End of the path right down corner
        if(end.x > objet.centerX && end.y > objet.centerY){
            if(this.x < objet.centerX && this.y < objet.centerY){speed = {x:-sp,y:-sp};}                //Up left
            if(this.x < objet.centerX && this.y > objet.centerY){speed = {x:-sp,y:sp};}                 //Down left
            if(this.x > objet.centerX && this.y > objet.centerY){speed = {x:sp,y:sp};}                  //Down right
            if(this.x >= objet.centerX && this.y < objet.centerY){speed = {x:sp,y:-sp};}                 //Up right
            //Seems to work
        }

                                                    //End of the path right up corner
        
        if(end.x > objet.centerX && end.y < objet.centerY){
            if(this.x < objet.centerX && this.y < objet.centerY){speed = {x:-sp,y:-sp};}                //Up left
            if(this.x < objet.centerX && this.y > objet.centerY){speed = {x:-sp,y:sp};}                 //Down left
            if(this.x > objet.centerX && this.y > objet.centerY){speed = {x:sp,y:sp};}                 //Down right
            if(this.x > objet.centerX && this.y < objet.centerY){speed = {x:sp,y:-sp};}                 //Up right
        }

                                                    //End of the path left up corner
        
        if(end.x < objet.centerX && end.y < objet.centerY){
            if(this.x < objet.centerX && this.y < objet.centerY){speed = {x:-sp,y:-sp};}                //Up left
            if(this.x < objet.centerX && this.y > objet.centerY){speed = {x:sp,y:sp};}                 //Down left
            if(this.x > objet.centerX && this.y > objet.centerY){speed = {x:sp,y:sp};}                 //Down right
            if(this.x > objet.centerX && this.y < objet.centerY){speed = {x:sp,y:-sp};}                 //Up right
        }
        

                                                    //End of the path left down corner
        if(end.x < objet.centerX && end.y > objet.centerY){
            if(this.x < objet.centerX && this.y < objet.centerY){speed = {x:-sp,y:-sp};}                //Up left
            if(this.x < objet.centerX && this.y > objet.centerY){speed = {x:-sp,y:sp};}                 //Down left
            if(this.x > objet.centerX && this.y > objet.centerY){speed = {x:sp,y:sp};}                 //Down right
            if(this.x > objet.centerX && this.y < objet.centerY){speed = {x:sp,y:-sp};}                 //Up right
        }   





        this.speedX = speed.x;
        this.speedY = speed.y;
        
    }*/

    Ant.prototype.setSpeed2 = function(Ant, objet,end,special){
        console.log("setSpeed2");
        var speed = {x:0,y:0};
        var sp = 0.5;

        var centerX = objet.centerX;
        var centerY = objet.centerY;
        var radius = objet.radius;
        

        //Get the distance between 4 different point of the obstacle and the end
        
        var toEnd = {up:this.getDistanceBetweenPoints(centerX,centerY-radius,end.x,end.y),
            down:this.getDistanceBetweenPoints(centerX,centerY+radius,end.x,end.y),
            left:this.getDistanceBetweenPoints(centerX - radius,centerY,end.x,end.y),
            right:this.getDistanceBetweenPoints(centerX+radius,centerY,end.x,end.y)};

        var toAnt = {
            up:this.getDistanceBetweenPoints(centerX,centerY-radius,this.x,this.y),
            down:this.getDistanceBetweenPoints(centerX,centerY+radius,this.x,this.y),
            left:this.getDistanceBetweenPoints(centerX-radius,centerY,this.x,this.y),
            right:this.getDistanceBetweenPoints(centerX+radius,centerY,this.x,this.y)
        }

        //for each quadron of the circle, we create a path to the end 
        //Top left of the circle
        if(this.x < centerX && this.y < centerY){
            console.log("Top left");

            //End of the path right up corner
            if(end.x > centerX && end.y < centerY){
                console.log("End right up corner");
                speed = {x:-sp,y:-sp};}
            //End of the path left down corner
            else if(end.x < centerX && end.y > centerY){
                console.log("End left down corner");
                speed = {x:-sp,y:-sp};}

            //Special end    
            else if(toAnt.up <= toAnt.left && toEnd.right <= toEnd.down ){
                console.log("The ant is closer to the top and the end is closer to the right"); 
                speed = {x:-sp,y:-sp};}

            else if(toAnt.left < toAnt.up && toEnd.down < toEnd.right){
                console.log("The ant is closer to the left and the end is closer to the bottom");
                speed = {x:-sp,y:sp};}

            /*
            else if(end.x < centerX && end.y < centerY){
                console.log("End left up corner");
                speed = {x:-sp,y:-sp};}*/

            else{
                console.log("else")
                speed = {x:-sp,y:-sp};
            }

        }
        

        //Top right of the circle
        else if(this.x >= centerX && this.y < centerY){
            console.log("Top right");

            //End of the path right down corner
            if(end.x > centerX && end.y > centerY){
                console.log("End right down corner");
                speed = {x:sp,y:-sp};}

            //End of the path left up corner    
            else if(end.x < centerX && end.y < centerY){
                console.log("End left up corner");
                speed = {x:sp,y:-sp};}

            
            else if(toAnt.right <= toAnt.up && toEnd.down <= toEnd.left ){
                console.log("The ant is closer to the right and the end is closer to the bottom");
                speed = {x:sp,y:sp};}

            else if(toAnt.up <= toAnt.right && toEnd.left <= toEnd.down){
                console.log("The ant is closer to the top and the end is closer to the left");
                speed = {x:-sp,y:-sp};}

            else{
                console.log("else")
                speed = {x:sp,y:-sp};
            }

        }

        //Bottom right of the circle
        else if(this.x > centerX && this.y > centerY){
            console.log("Bottom right");

            //End of the path left down corner
            if(end.x < centerX && end.y > centerY){
                console.log("End left down corner");
                speed = {x:sp,y:sp};}

            //End of the path right up corner
            else if(end.x > centerX && end.y < centerY){
                console.log("End right up corner");
                speed = {x:sp,y:sp};}

            else if(toAnt.down <= toAnt.right && toEnd.left <= toEnd.up ){
                console.log("The ant is closer to the bottom and the end is closer to the left");
                speed = {x:sp,y:sp};}

            else if(toAnt.right < toAnt.down && toEnd.up < toEnd.left){
                console.log("The ant is closer to the right and the end is closer to the top");
                speed = {x:-sp,y:sp};}
        
            else{
                console.log("else")
                speed = {x:sp,y:sp};
            }

        }

        //Bottom left of the circle
        else if(this.x < centerX && this.y > centerY){
            console.log("Bottom left");

            //End of the path left up corner
            if(end.x < centerX && end.y < centerY){
                console.log("End left up corner");
                speed = {x:-sp,y:sp};}
            
            //End of the path right down corner
            else if(end.x > centerX && end.y > centerY){
                console.log("End right down corner");
                speed = {x:-sp,y:sp};}

            else if(toAnt.left <= toAnt.down && toEnd.up <= toEnd.right ){
                console.log("The ant is closer to the left and the end is closer to the top");
                speed = {x:-sp,y:-sp};}

            else if(toAnt.down < toAnt.left && toEnd.right < toEnd.up){
                console.log("The ant is closer to the bottom and the end is closer to the right");
                speed = {x:sp,y:sp};}

            else{
                console.log("else")
                speed = {x:-sp,y:sp};
            }
        }
        

        this.speedX = speed.x;
        this.speedY = speed.y;
    };

    Ant.prototype.obstacleAura = function(Ant, obj, end, start){
        var point = this.getPointCircle(obj);
        var entryPoint = this.getEntryPoint(point);
        var exitPoint = this.getExitPoint(point,end);
        var compteurPlus = true;

        if(entryPoint.index && entryPoint.index < point.length/2 && exitPoint.index >= point.length/2){}


        if(compteurPlus){
            if(entryPoint.index == point.length-1){
                entryPoint.index = -1;
            }
            this.followN(point[entryPoint.index+1].x,point[entryPoint.index+1].y,ob);
        }
        else{
            if(entryPoint.index == 0){
                entryPoint.index = point.length;
            }
            this.followN(point[entryPoint.index-1].x,point[entryPoint.index-1].y,ob);
        }

    }

    return Ant;
}());
