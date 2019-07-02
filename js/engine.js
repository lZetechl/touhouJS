/***********/
/* Vector */
/***********/

class Vector {
    constructor(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

/************/
/* Movement */
/************/

function move(entity,vector){
    if (vector.dx != 0) {
        entity.x = entity.x + (entity.speed * vector.dx);
    }
    if (vector.dy != 0) {
        entity.y = entity.y + (entity.speed * vector.dy);
    }
}

function teleport(entity,x,y){
    entity.x = x;
    entity.y = y;
}

/*************/
/* Collision */
/*************/

function collisionBetween(entityA,entityB,hitBoxSizeMultiplicator){
    if((Math.pow((entityA.x-entityB.x),2) + Math.pow((entityA.y-entityB.y),2) <= Math.pow((entityA.hitBoxSize+entityB.hitBoxSize*hitBoxSizeMultiplicator),2))){
        return true;
    }else{
        return false;
    }
}

/************/
/* Controls */
/************/

document.addEventListener('keydown',press);
document.addEventListener('keyup',release);
document.addEventListener('click',mouseClick);

var allInputs = [];
var playerInputs = [];
var mouseArea;
var mouseCursor = [];

function updateInputs(){
    return [playerInputs,mouseCursor];
}

function getAllInputs(){
    return allInputs;
}

function clearAllInputs(){
    allInputs = [];
}

// Keyboard inputs
function setInputs(gameInputs){
    playerInputs = gameInputs;
}

function press(e){
    playerInputs.forEach(function(playerInput){
        if(playerInput[0] == e.keyCode){
            playerInput[1] = true;
        }
    })
    allInputs.push(e.keyCode);
}

function release(e){
    playerInputs.forEach(function(playerInput){
        if(playerInput[0] == e.keyCode){
            playerInput[1] = false;
        }
    })
    var inputToRemove = allInputs.indexOf(e.keyCode);
    allInputs.splice(inputToRemove,1);
}

// Mouse cursor
function setMouse(cursor,canvas){
    mouseCursor = cursor;
    mouseArea = canvas;
}

function mouseClick(e) {
    var cursorPosition = getCursorPosition(e);
    mouseCursor.splice(0,2);
    mouseCursor.push(cursorPosition.x);
    mouseCursor.push(cursorPosition.y);
}

function getCursorPosition(e) {
    var zoneClicked = mouseArea.boundingClientRect;
    return {
        x: e.clientX - zoneClicked.left,
        y: e.clientY - zoneClicked.top
    };
}

/**********/
/* Sound */
/**********/

function playSFX(name,speedUpRate,volume){
    var sfx = new Audio("assets/sounds/se/"+name+".mp3");
    sfx.playbackRate = speedUpRate;
    sfx.volume = volume;
    sfx.play();
}

function getVolume(sound){
    return sound.volume;
}

function setVolume(sound,value){
    sound.volume = value;
}

async function playBgm(sound,volume) {
    try {
        sound.volume = volume;
        await sound.play();
    } catch(err) {}
}

async function pauseBgm(sound){
    try {
        await sound.pause();
    } catch(err) {}
}

async function stopBgm(sound){
    try {
        await sound.pause();
        sound.currentTime = 0;
    } catch(err) {}
}

/*********/
/* Image */
/*********/
class ImageCustom{
    constructor(source,x,y,dx,dy){
        this.source = source;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
}

/*************/
/* Parallaxe */
/*************/

class Parallaxe extends ImageCustom{
    constructor(canvas,source,x,y,dx,dy,speed){
        super(source,x,y,dx,dy)
        this.canvas = canvas;
        this.speed = speed;
        this.initialY = this.y-(this.dy*2)+1; 

        this.img1 = new ImageCustom(source,x,y,dx,dy);
        this.img2 = new ImageCustom(source,x,y-dy,dx,dy);
        this.img3 = new ImageCustom(source,x,y+dy,dx,dy);
        this.img4 = new ImageCustom(source,x,y+dy*2,dx,dy);
    }

    scrollVerticalDown(){
        this.img1.y += this.speed;
        this.img2.y += this.speed;
        this.img3.y += this.speed;
        this.img4.y += this.speed;
        if(this.img1.y > this.y+this.dy*2){
            this.img1.y = this.initialY;
        }
        if(this.img2.y > this.y+this.dy*2){
            this.img2.y = this.initialY;
        }
        if(this.img3.y > this.y+this.dy*2){
            this.img3.y = this.initialY;
        }
        if(this.img4.y > this.y+this.dy*2){
            this.img4.y = this.initialY;
        }
    }

    render(){
        this.canvas.drawImage(this.source,this.img1.x,this.img1.y);
        this.canvas.drawImage(this.source,this.img2.x,this.img2.y);
        this.canvas.drawImage(this.source,this.img3.x,this.img3.y);
        this.canvas.drawImage(this.source,this.img4.x,this.img4.y);
    }
}

/**********/
/* Canvas */
/**********/

class Canvas{
    constructor(gameCanvas){
        this.boundingClientRect = gameCanvas.getBoundingClientRect()
        this.ctx = gameCanvas.getContext("2d");
        this.width = gameCanvas.width;
        this.height = gameCanvas.height;
    }
    
    clearCanvas(){
        this.ctx.clearRect(0,0,this.width,this.height);
    }
    
    drawRect(color,x,y,dx,dy){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,dx,dy);
    }
    
    drawCircle(color,x, y,radius){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 360);
        this.ctx.fill();
    }
    
    drawImage(source, x, y){
        this.ctx.drawImage(source,x,y);
    }
    
    writeText(color,fontSize,text, x, y){
        this.ctx.fillStyle = color;
        this.ctx.font = fontSize+"px Arial";
        this.ctx.fillText(text,x,y);
    }
    
    leftAlignText(){
        this.ctx.textAlign = 'left';
    }

    centerText(){
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle';
    }

    rightAlignText(){
        this.ctx.textAlign = 'right';
    }
}

/*******/
/* HUD */
/*******/

class HUD {
    constructor(canvasUsed){
        this.canvasUsed = canvasUsed;
        this.backgroundColor = "#FFFFFF";
        this.allData = [];
    }

    setBackgroundColor(color){
        this.backgroundColor = color;
    }
    
    addData(id,content,color,fontSize,alignment,x,y){
        var data = [id,content,color,fontSize,alignment,x,y];
        this.allData.push(data);
    }

    frameData(id,color,thickness){
        var currentHud = this;
        currentHud.allData.forEach(function(data){
            var indiceToFrame = data.indexOf(id);
            if(currentHud.allData[indiceToFrame][4] == "left"){
                currentHud.canvasUsed.drawRect(color,currentHud.allData[indiceToFrame][5]-currentHud.allData[indiceToFrame][1],currentHud.allData[indiceToFrame][6]-currentHud.allData[indiceToFrame][1],currentHud.allData[indiceToFrame][1]*currentHud.allData[indiceToFrame][2].length,thickness);
                currentHud.canvasUsed.drawRect(color,currentHud.allData[indiceToFrame][5]-currentHud.allData[indiceToFrame][1],currentHud.allData[indiceToFrame][6]-currentHud.allData[indiceToFrame][1],thickness,currentHud.allData[indiceToFrame][1]);
                currentHud.canvasUsed.drawRect(color,currentHud.allData[indiceToFrame][5],currentHud.allData[indiceToFrame][6]+currentHud.allData[indiceToFrame][1],currentHud.allData[indiceToFrame][1]*currentHud.allData[indiceToFrame][2].length,thickness);
                currentHud.canvasUsed.drawRect(color,currentHud.allData[indiceToFrame][5]+currentHud.allData[indiceToFrame][1]*currentHud.allData[indiceToFrame][2].length,thickness,currentHud.allData[indiceToFrame][6],thickness,currentHud.allData[indiceToFrame][1]);
            }else if(currentHud.allData[indiceToFrame][4] == "center"){

            }else if(currentHud.allData[indiceToFrame][4] == "right"){

            }
        })
    }

    displayData(){
        this.canvasUsed.drawRect(this.backgroundColor,0,0,this.canvasUsed.width,this.canvasUsed.height);
        for(var i = 0; i < this.allData.length; i++){
            this.canvasUsed.ctx.textAlign = this.allData[i][4];
            this.canvasUsed.writeText(this.allData[i][2],this.allData[i][3],this.allData[i][1],this.allData[i][5],this.allData[i][6]);
        }
    }

    removeData(id){
        var indiceToRemove = this.allData.length-1;
        this.allData.forEach(function(data){
            indiceToRemove = data.indexOf(id);
        })
        var dataToRemove = this.allData.indexOf(indiceToRemove);
        this.allData.splice(dataToRemove,1);
    }

    eraseDisplay(){
        this.canvasUsed.drawRect(this.backgroundColor,0,0,this.canvasUsed.width,this.canvasUsed.height);
    }
}

/********/
/* Json */
/********/

var jsonObject;

function setJsonReader(id){
    document.getElementById(id).value = '';
    document.getElementById(id).addEventListener('change', onChange);
}

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    jsonObject = JSON.parse(event.target.result);
}