var DrawingApp = /** @class */ (function () {
    //parameters of the main canvas
    
    function DrawingApp() {
        var _this = this;
        this.clickX = new Array();  //Stock the position X when clicking with the mouse
        this.clickY = new Array();  //Stock the position Y when clicking with the mouse
        this.clickDrag = [];        //Stock the position (X,Y) when dragging with the mouse
        this.listeObjet = [];
        this.releaseX;
        this.releaseY;

        //Handler event
        this.clearEventHandler = function () {   //Reset the canvas and all point save in variables X,Y,Drag
            _this.clearCanvas();
        };

        this.releaseEventHandler = function () {
            console.log("releaseEventHandler");
            _this.paint = false;
            _this.redraw();
            
        };

        this.cancelEventHandler = function () {
            _this.paint = false;
        };

        
        //when pressed
        this.pressEventHandler = function (e) {
            console.log("pressEventHandler");
            _this.paint = true;
                var mouseX = e.changedTouches ?
                    e.changedTouches[0].pageX :
                    e.pageX;
                var mouseY = e.changedTouches ?
                    e.changedTouches[0].pageY :
                    e.pageY;
                mouseX -= _this.canvas.offsetLeft;
                mouseY -= _this.canvas.offsetTop;

                _this.paint = true;
                _this.addClick(mouseX, mouseY, false);
                _this.redraw();
        };

        //when dragged
        this.dragEventHandler = function (e) {
            console.log("dragEventHandler");
            if (draw) {
                
                var mouseX = e.changedTouches ?
                    e.changedTouches[0].pageX :
                    e.pageX;
                var mouseY = e.changedTouches ?
                    e.changedTouches[0].pageY :
                    e.pageY;
                mouseX -= _this.canvas.offsetLeft;
                mouseY -= _this.canvas.offsetTop;

                 //Test collision
                 
                 for (var objet of objets) {
                    var distance = Math.sqrt(Math.pow(mouseX - objet.centerX, 2) + Math.pow(mouseY - objet.centerY, 2));
                    if (
                        distance < objet.radius
                    ) {
                      console.log("Collision avec un objet");
                      _this.clearCanvas(objets);
                    }
                }
                
                
                 //Fin test collision

                if (_this.paint) {
                    _this.addClick(mouseX, mouseY, true);
                    _this.redraw();
                }
                e.preventDefault();
            }
        };
        
        var canvas = document.getElementById("playGround");
        
        canvas.width = document.getElementById("playPanel").offsetWidth;
        canvas.height = document.getElementById("playPanel").offsetHeight;
        //canvas.style.width = document.getElementById("playPanel").offsetWidth;
        //canvas.style.height = document.getElementById("playPanel").offsetHeight;

        //Multiple object
        var h = canvas.height;
        var w = canvas.width; 
        var objets = [];
        for(var i = 0; i < 10; i++){
            var obstacle = new Obstacle(Math.random() * w, Math.random() * h, 75);
            objets.push({centerX : obstacle.centerX, centerY : obstacle.centerY, radius : obstacle.radius});
            obstacle.draw(document.getElementById("playGround").getContext("2d"));
        }
        //End multiple object
    
        
        var context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#EE5A24';
        
        context.lineWidth = 4;

        this.canvas = canvas;
        this.context = context;
        this.redraw();
        this.createUserEvents();

        this.getObjets = function(){
            console.log("getObjets");
            return objets;
        }
    }
    //create events
    DrawingApp.prototype.createUserEvents = function () {
        console.log("createUserEvents");
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        //canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
    
    };
    //refresh
    DrawingApp.prototype.redraw = function () {
        var clickX = this.clickX;
        var context = this.context;
        var clickDrag = this.clickDrag;
        var clickY = this.clickY;
        for (var i_1 = 0; i_1 < clickX.length; ++i_1) {
            context.beginPath();
            if (clickDrag[i_1] && i_1) {
                context.moveTo(clickX[i_1 - 1], clickY[i_1 - 1]);
            }
            else {
                context.moveTo(clickX[i_1] - 1, clickY[i_1]);
            }
            context.lineTo(clickX[i_1], clickY[i_1]);
            context.stroke();
        }
        context.closePath();
    };
    //add a point
    DrawingApp.prototype.addClick = function (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    };
    DrawingApp.prototype.clearCanvas = function (objets) {
        console.log("ok");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        for(var i = 0; i < objets.length; i++){
            var obstacle = new Obstacle(objets[i].centerX, objets[i].centerY, objets[i].radius);
            obstacle.draw(document.getElementById("playGround").getContext("2d"));
        }
    };
    //remove the current first point of the draw
    DrawingApp.prototype.removeFirstOne = function () {
        if (this.clickX.length > 1) {
            this.clickX = this.clickX.slice(1);
            this.clickY = this.clickY.slice(1);
        }
        else {
            this.clickX = new Array();
            this.clickY = new Array();
        }
    };

    return DrawingApp;
}());
